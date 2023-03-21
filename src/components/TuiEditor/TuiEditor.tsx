//@ts-nocheck
import { $, xU } from "@ventose/ui";
import { defineAsyncComponent, defineComponent } from "vue";
import { asyncGetTuiEditor } from "./LoadTuiEditorLibs";

export const TuiEditor = defineAsyncComponent(
	() =>
		new Promise(async resolve => {
			const TuiEditor = await asyncGetTuiEditor();
			resolve(
				defineComponent({
					props: ["modelValue"],
					emits: ["update:modelValue"],
					data() {
						return {
							isLoading: false,
							id: xU.genId("TuiEditor"),
							raw$md: ""
						};
					},
					mounted() {
						this.once();
					},
					watch: {
						"modelValue.md": {
							immediate: true,
							async handler(mdString) {
								await xU.ensureValueDone(() => this.raw$editor);
								this.raw$editor.setMarkdown(mdString);
							}
						}
					},
					methods: {
						async sync() {
							await xU.ensureValueDone(() => this.syncDebounce);
							$(this.raw$selector).show().addClass("flash infinite");
							this.syncDebounce();
						},
						//初始化方法
						async once() {
							let vm = this;
							await xU.ensureValueDone(() => vm.$refs.container);
							(() => {
								vm.raw$editor = new TuiEditor({
									el: vm.$refs.container,
									initialEditType: "wysiwyg",
									previewStyle: "vertical",
									initialValue: vm.raw$md || "",
									height: "auto",
									hooks: {
										/* EventEmitter.prototype.emit  */
										change: vm.sync,
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

							(() => {
								vm.syncDebounce = xU.debounce(async function () {
									const mdString = vm.raw$editor.getMarkdown();
									if (vm.modelValue.md !== mdString) {
										vm.$emit("update:modelValue", {
											md: mdString,
											html: vm.raw$editor.getHTML()
										});
										vm.raw$md = mdString;
									}
									$(this.raw$selector).removeClass("flash infinite").hide();
								}, 1000);
							})();
						}
					},
					render(vm) {
						if (vm.$attrs.readonly) {
							return (
								<div
									v-html={vm.modelValue.html}
									class="toastui-editor-contents"></div>
							);
						}
						return (
							<div
								v-loading={vm.isLoading}
								id={vm.id}
								ref="container"
								class="flex1"
								style="height:300px;width:100%;z-index:1;"
							/>
						);
					}
				})
			);
		})
);
