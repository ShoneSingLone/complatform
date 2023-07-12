//@ts-nocheck
import { $, xU } from "@ventose/ui";
import { defineAsyncComponent, defineComponent } from "vue";
import {
	leftArrow,
	rightArrow,
	PreprocessHTML,
	MkitTheme
} from "@/components/Mkit/MkitTheme";
import { API } from "@/api";
import { State_App } from "@/state/State_App";
import "./TuiEditor.less";

export const TuiEditor = defineAsyncComponent(async () => {
	const toastui = await xU.asyncGlobalJS(
		"toastui",
		`${State_App.baseURL}/assets/libs/toastui-editor-all.js`
	);
	const { Editor } = toastui;
	return defineComponent({
		props: ["modelValue", "isReadonly"],
		emits: ["update:modelValue"],
		data() {
			return {
				html: "",
				visible: false,
				imgIndex: 0,
				imgList: [],
				imgSrc: "",
				isLoading: true,
				id: xU.genId("TuiEditor"),
				raw$md: "",
				vmTuiEditorDone: false,
				configsPopoverChangeTheme: {
					trigger: "rightClick",
					content: MkitTheme,
					openAtPoint: true
				}
			};
		},
		computed: {
			readonly() {
				if (xU.isBoolean(this.isReadonly)) {
					return this.isReadonly;
				} else {
					if (this.$attrs.readonly) {
						return true;
					}
				}
				return false;
			}
		},
		created() {
			const vm = this;
			vm.setLoadingFalse = xU.debounce(function () {
				vm.isLoading = false;
			}, 1000);
		},
		mounted() {
			this.init();
		},
		watch: {
			readonly() {
				this.setHtmlDebounce && this.setHtmlDebounce();
			},
			/* 初始化完成后再调用一次渲染 */
			vmTuiEditorDone: {
				async handler() {
					this.setMd(this.modelValue.md);
				}
			},
			"modelValue.md": {
				immediate: true,
				async handler(mdString) {
					this.setMd(mdString);
				}
			}
		},
		methods: {
			setLoading(isLoading) {
				if (isLoading) {
					this.isLoading = true;
				} else if (this.setLoadingFalse) {
					this.setLoadingFalse();
				} else {
					this.isLoading = false;
				}
			},
			setMd(mdString) {
				try {
					if (!this.vmTuiEditor) {
						throw new Error("return");
					}
					/* mdString可以为"",但是在editor初始化之后才有赋值的必要 */
					if (!mdString && !this.vmTuiEditor) {
						throw new Error("return");
					}
					const _mdString = this.vmTuiEditor.getMarkdown();
					if (_mdString === mdString) {
						throw new Error("return");
					}
					this.vmTuiEditor.setMarkdown(mdString);
					this.setHtmlDebounce();
				} catch (error) {}
			},
			setHtml() {
				try {
					if (!this.vmTuiEditor) {
						return;
					}
					let html = this.vmTuiEditor.getHTML();
					this.html = new PreprocessHTML(html).html;
				} catch (error) {
					console.error(error);
				} finally {
					this.setLoading();
				}
			},
			destoryListener() {
				if (this.$previewer) {
					this.$previewer.off("click");
					this.$previewer = null;
				}
			},
			showImg(index: number) {
				const $md = $(this.$refs.viewer);
				const imgList = $md.find("img");
				const img = imgList[index];
				if (img) {
					this.imgIndex = index;
					this.imgList = xU.map(imgList, img => img.src);
					this.imgSrc = this.imgList[this.imgIndex];
					this.$nextTick(() => {
						$(this.$refs.imgViewer.$el).find("img").click();
					});
				}
			},
			handleClick(event: { target: any }) {
				/* 点击任意一个地方，但是只有图片有效 */
				const { target } = event;
				let $ele = (() => {
					/* 点击的是Img */
					if (target.classList.contains("x-tui-image")) {
						return $(target);
					}
					if (target.classList.contains("x-tui-image-img")) {
						return $(target).parents(".x-tui-image[data-x-tui-image-index]");
					}
					return false;
				})();

				if ($ele) {
					/* 图片出现的下标 */
					this.showImg(Number($ele.attr("data-x-tui-image-index")));
				}
			},
			/*  */
			async emitModelValue() {
				const vm = this;
				$(this.raw$selector).show().addClass("flash infinite");
				const mdString = vm.vmTuiEditor.getMarkdown();
				if (vm.modelValue.md !== mdString) {
					vm.$emit("update:modelValue", {
						md: mdString,
						html: vm.vmTuiEditor.getHTML()
					});
				}
				vm.setLoading();
				$(this.raw$selector).removeClass("flash infinite").hide();
			},
			//初始化方法
			async init() {
				let vm = this;
				vm.setLoading(true);
				await xU.ensureValueDone(() => vm.$refs.container);
				try {
					(() => {
						vm.vmTuiEditor = new Editor({
							el: vm.$refs.container,
							initialEditType: "wysiwyg",
							previewStyle: "vertical",
							initialValue: "",
							height: "300px",
							hooks: {
								/* EventEmitter.prototype.emit  */
								change: _ => {
									vm.emitModelValueDebounce && vm.emitModelValueDebounce();
								},
								addImageBlobHook: async (blob, callback) => {
									/* base64 字符串 */
									/* vm.setLoading(true);
											var reader = new FileReader();
											reader.onload = function (_a) {
												var target2 = _a.target;
												vm.setLoading();
												return callback(target2.result);
											};
											reader.readAsDataURL(blob); */
									/* 上传服务器，返回id */
									let formData = new FormData();
									formData.append("file", blob);
									formData.append("useFor", "wiki");
									const { data } = await API.resource.upload(formData);
									callback(`yapi_res://${data._id}`);
								}
							}
						});
						/* vmTuiEditor初始化 */
						vm.vmTuiEditorDone = true;
						vm.emitModelValueDebounce = xU.debounce(vm.emitModelValue, 1000);
						vm.setHtmlDebounce = xU.debounce(vm.setHtml, 1600);
						const className = `sync_${vm._.uid}`;
						vm.raw$selector = `.${className}`;
						vm.vmTuiEditor.insertToolbarItem(
							{ groupIndex: 4, itemIndex: 2 },
							{
								name: "sync",
								text: "Sync...",
								id: "toastuiEditorToolbarIconsSync",
								className: `toastui-editor-toolbar-icons animated ${className}`,
								style: { backgroundImage: "none" }
							}
						);
					})();
				} catch (error) {
					console.error(error);
				} finally {
					vm.setLoading();
				}

				(() => {
					vm.setMdDebounce = xU.debounce(vm.setMd, 1000);
				})();
			}
		},
		render(vm) {
			return (
				<>
					{vm.readonly && (
						<div
							v-uiPopover={vm.configsPopoverChangeTheme}
							v-loading={vm.isLoading}
							v-html={vm.html}
							onClick={vm.handleClick}
							ref="viewer"
							class="toastui-editor-contents flex1 border-radius elevation-1 padding20"
							style="height:300px;width:100%;z-index:1;padding:20px;"></div>
					)}
					<div class="display-none">
						<ElImage
							ref="imgViewer"
							src={vm.imgSrc}
							previewSrcList={vm.imgList}
							initialIndex={vm.imgIndex}
							hide-on-click-modal
							fit="scale-down"
							previewTeleported={true}
						/>
					</div>
					<div
						v-loading={vm.isLoading}
						id={vm.id}
						ref="container"
						class={{ flex1: true, "display-none": vm.readonly }}
						style="height:300px;width:100%;z-index:1;"
					/>
				</>
			);
		}
	});
});
