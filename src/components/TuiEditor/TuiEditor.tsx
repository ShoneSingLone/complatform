//@ts-nocheck
import { $, xU } from "@/ventose/ui";
import { defineAsyncComponent, defineComponent } from "vue";
import { PreprocessHTML, MkitTheme } from "@/components/Mkit/MkitTheme";
import { API } from "@/api";
import { stateApp } from "@/state/app";
import "./TuiEditor.less";

export const TuiEditor = defineAsyncComponent(async () => {
	const { pathname, origin } = window.location;
	const toastui = await xU.asyncGlobalJS(
		"toastui",
		`${origin}${pathname}assets/libs/toastui-editor-all.js`
	);
	const { Editor } = toastui;

	const customHTMLRenderer = {
		image: (node, context) => {
			const { title, destination, firstChild } = node;
			const { literal } = firstChild || {};
			const { skipChildren } = context;
			skipChildren();
			const src = (() => {
				const [_, id] = String(destination).match(/^_id:(\d+)/) || [];
				if (id) {
					return `${stateApp.BASE_URL}/api/resource/get?id=${id}`;
				} else {
					return destination;
				}
			})();
			return {
				type: "openTag",
				tagName: "img",
				selfClose: true,
				attributes: {
					title,
					alt: literal,
					src
				}
			};
		}
	};

	return defineComponent({
		props: ["modelValue", "isReadonly"],
		emits: ["update:modelValue"],
		data() {
			return {
				visible: false,
				imgIndex: 0,
				imgList: [],
				imgSrc: "",
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
		},
		mounted() {
			this.init();
		},
		watch: {
			readonly: {
				immediate: true,
				async handler() {
					this.setHtml && this.setHtml();
				}
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
					} else {
					}
					this.vmTuiEditor.setMarkdown(mdString);
					this.setHtml();
				} catch (error) {
					if ("return" !== error?.message) {
						console.error(error);
					}
				} finally {
				}
			},
			setHtml() {
				try {
					if (!this.vmTuiEditor) {
						return;
					}
					if (!this.isReadonly) {
						return;
					}
					let html = this.vmTuiEditor.getHTML();
					html = new PreprocessHTML(html).html;
					setTimeout(() => {
						$(this.$refs.viewer).html(html);
					}, 64);
				} catch (error) {
					console.error(error);
				} finally {
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
						html: ""
					});
				}
				$(this.raw$selector).removeClass("flash infinite").hide();
			},
			//初始化方法
			async init() {
				let vm = this;
				await xU.ensureValueDone(() => vm.$refs.container);
				try {
					(() => {
						vm.vmTuiEditor = new Editor({
							customHTMLRenderer,
							el: vm.$refs.container,
							// initialEditType: "wysiwyg",
							initialEditType: "markdown",
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
									/*     var reader = new FileReader();
                                            reader.onload = function (_a) {
                                                var target2 = _a.target;
                                                return callback(target2.result);
                                            };
                                            reader.readAsDataURL(blob); */
									/* 上传服务器，返回id */
									let formData = new FormData();
									formData.append("file", blob);
									formData.append("useFor", "wiki");
									/* todo process loading  */
									const { data } = await API.resource.upload(formData);
									callback(`_id:${data._id}`);
								}
							}
						});
						/* vmTuiEditor初始化 */
						vm.vmTuiEditorDone = true;
						vm.emitModelValueDebounce = xU.debounce(vm.emitModelValue, 1000);
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
				}
			}
		},
		render(vm) {
			return (
				<>
					{vm.readonly && (
						<div
							v-xTips={vm.configsPopoverChangeTheme}
							onClick={vm.handleClick}
							ref="viewer"
							class="toastui-editor-contents flex1 border-radius box-shadow padding20"
							style="height:300px;width:100%;z-index:1;padding:var(--app-padding);"></div>
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
