//@ts-nocheck
import { xU } from "@ventose/ui";
import { defineComponent, defineAsyncComponent } from "vue";
import { asyncGetTuiEditor } from "./LoadTuiEditorLibs";

export const TuiEditor = defineAsyncComponent(
	() =>
		new Promise(async resolve => {
			const TuiEditor = await asyncGetTuiEditor();
			resolve(
				defineComponent({
					props: ["md"],
					emits: ["update:md"],
					data() {
						return {
							isLoading: false,
							id: xU.genId("TuiEditor"),
							raw$Value: ""
						};
					},
					mounted() {
						this.init();
					},
					watch: {
						md: {
							immediate: true,
							async handler(value) {
								await xU.ensureValueDone(() => this.raw$editor);
								if (value !== this.raw$Value) {
									this.raw$editor.setMarkdown(value);
								}
							}
						}
					},
					methods: {
						//初始化方法
						async init() {
							let vm = this;
							vm.$refs.container.innerHTML = "";
							this.raw$editor = new TuiEditor({
								el: vm.$refs.container,
								initialEditType: "wysiwyg",
								previewStyle: "vertical",
								height: "auto",
								initialValue: this.raw$Value || "",
								hooks: {
									/* EventEmitter.prototype.emit  */
									change: editorType => {
										const mdString = vm.raw$editor.getMarkdown();
										if (vm.raw$Value !== mdString) {
											vm.raw$Value = mdString;
											vm.$emit("update:md", mdString);
										}
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
						}
					},
					render(vm) {
						return (
							<div v-loading={vm.isLoading}>
								<div
									id={vm.id}
									ref="container"
									class="flex1"
									style="height:300px;width:100%;"
								/>
							</div>
						);
					}
				})
			);
		})
);
