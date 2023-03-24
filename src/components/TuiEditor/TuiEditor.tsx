//@ts-nocheck
import { $, xU } from "@ventose/ui";
import { defineAsyncComponent, defineComponent } from "vue";
import { asyncGetTuiEditor } from "./LoadTuiEditorLibs";

import {
	leftArrow,
	rightArrow,
	PreprocessHTML,
	MkitTheme
} from "@/components/Mkit/MkitTheme";
import "./TuiEditor.less";

export const TuiEditor = defineAsyncComponent(
	() =>
		new Promise(async resolve => {
			const TuiEditor = await asyncGetTuiEditor();
			resolve(
				defineComponent({
					props: ["modelValue", "isReadonly"],
					emits: ["update:modelValue"],
					data() {
						return {
							html: "",
							visible: false,
							imgSrc: "",
							isLoading: false,
							id: xU.genId("TuiEditor"),
							raw$md: "",
							raw$editorDone: false,
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
					mounted() {
						this.init();
					},
					watch: {
						readonly() {
							this.setHtmlDebounce && this.setHtmlDebounce();
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
								if (!this.raw$editor) {
									throw new Error("return");
								}
								/* mdString可以为"",但是在editor初始化之后才有赋值的必要 */
								if (!mdString && !this.raw$editor) {
									throw new Error("return");
								}
								const _mdString = this.raw$editor.getMarkdown();
								if (_mdString === mdString) {
									throw new Error("return");
								}
								this.isLoading = true;
								this.raw$editor.setMarkdown(mdString);
								this.setHtmlDebounce();
							} catch (error) {
								this.isLoading = false;
							}
						},
						setHtml() {
							try {
								if (!this.raw$editor) {
									return;
								}
								let html = this.raw$editor.getHTML();
								this.html = new PreprocessHTML(html).html;
							} catch (error) {
								console.error(error);
							} finally {
								this.isLoading = false;
							}
						},
						/*  */
						setVisible(visible: any) {
							this.visible = visible;
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
								this.$rawImgIndex = index;
								this.imgSrc = img.src;
								this.setVisible(true);
								this.ifHasMulImageAddArrow(imgList);
							}
						},
						ifHasMulImageAddArrow(imgList) {
							if (imgList.length > 1) {
								this.$rawImgList = imgList;
								setTimeout(() => {
									this.destoryListener();
									this.$previewer = $(".ant-image-preview-body");
									this.$previewer.on(
										"click",
										"[class^=ant-image-preview-switch-]",
										this.handleClickPreviewSwitch
									);
									this.$previewer.append(leftArrow);
									this.$previewer.append(rightArrow);
								}, 500);
							}
						},
						handleClickPreviewSwitch({ currentTarget }) {
							const { length } = this.$rawImgList;
							if ($(currentTarget).hasClass("right")) {
								this.$rawImgIndex = (this.$rawImgIndex + 1) % length;
							} else {
								this.$rawImgIndex = (this.$rawImgIndex - 1 + length) % length;
							}
							const imgSrc = $(this.$rawImgList[this.$rawImgIndex]).attr("src");
							$(".ant-image-preview-img").attr("src", imgSrc);
						},
						handleClick(event: { target: any }) {
							const { target } = event;
							const $ele = $(target).parents(
								".ant-image[data-ant-image-index]"
							);
							if ($ele && $ele.length) {
								this.showImg(Number($ele.attr("data-ant-image-index")));
							}
						},
						/*  */
						async emitModelValue() {
							const vm = this;
							$(this.raw$selector).show().addClass("flash infinite");
							const mdString = vm.raw$editor.getMarkdown();
							if (vm.modelValue.md !== mdString) {
								vm.$emit("update:modelValue", {
									md: mdString,
									html: vm.raw$editor.getHTML()
								});
							}
							vm.isLoading = false;
							$(this.raw$selector).removeClass("flash infinite").hide();
						},
						//初始化方法
						async init() {
							let vm = this;
							vm.isLoading = true;
							await xU.ensureValueDone(() => vm.$refs.container);
							try {
								(() => {
									vm.raw$editor = new TuiEditor({
										el: vm.$refs.container,
										initialEditType: "wysiwyg",
										previewStyle: "vertical",
										initialValue: vm.modelValue?.md || "",
										height: "300px",
										hooks: {
											/* EventEmitter.prototype.emit  */
											change: _ => {
												vm.emitModelValueDebounce &&
													vm.emitModelValueDebounce();
											},
											addImageBlobHook: (blob, callback) => {
												vm.isLoading = true;
												var reader = new FileReader();
												reader.onload = function (_a) {
													var target2 = _a.target;
													vm.isLoading = false;
													return callback(target2.result);
												};
												reader.readAsDataURL(blob);
											}
										}
									});
									vm.emitModelValueDebounce = xU.debounce(
										vm.emitModelValue,
										1000
									);
									vm.setHtmlDebounce = xU.debounce(vm.setHtml, 1600);
									const className = `sync_${vm._.uid}`;
									vm.raw$selector = `.${className}`;
									vm.raw$editor.insertToolbarItem(
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
								vm.isLoading = false;
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
									<a-image
										src={vm.imgSrc}
										preview={{
											visible: vm.visible,
											onVisibleChange: vm.setVisible
										}}
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
				})
			);
		})
);
