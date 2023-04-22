//@ts-nocheck
import { xU } from "@ventose/ui";
import { defineAsyncComponent, defineComponent } from "vue";
import { asyncGetMonaco } from "./LoadMonacoLibs";

const theme = ["vs", "vs-dark", "hc-black", "hc-light"];

export const MonacoEditor = defineAsyncComponent(
	() =>
		new Promise(async resolve => {
			const monaco = await asyncGetMonaco();
			resolve(
				defineComponent({
					props: ["code", "language", "theme", "readOnly"],
					emits: ["update:code"],
					data() {
						return {
							id: xU.genId("MonacoEditor")
						};
					},
					mounted() {
						this.init();
					},
					watch: {
						code: {
							immediate: true,
							handler(value) {
								if (!this.raw$editor) {
									return;
								}

								if (this.readOnly) {
									this.formatDocument && this.formatDocument(this.readOnly);
								}

								if (value !== this.raw$Value) {
									this.raw$editor.setValue(value);
								}
							}
						}
					},
					methods: {
						//初始化方法
						async init() {
							let vm = this;

							vm.$refs.container.innerHTML = "";
							vm.raw$editor = monaco.editor.create(vm.$refs.container, {
								value: vm.code || "",
								language: vm.language || "javascript",
								minimap: { enabled: false },
								fontSize: 12,
								readOnly: vm.readOnly || false,
								// 超出编辑器大小的使用fixed属性显示
								fixedOverflowWidgets: true,
								theme: vm.theme || theme[3],
								automaticLayout: true
							});

							vm.formatDocument = xU.debounce(function (readOnly) {
								/* readOnly不能直接格式化，操作表现为无效 */
								if (readOnly) {
									vm.raw$editor.updateOptions({ readOnly: false });
								}
								//自动格式化代码
								vm.raw$editor.trigger("", "editor.action.formatDocument");
								setTimeout(() => {
									if (readOnly) {
										vm.raw$editor.updateOptions({ readOnly: true });
									}
								}, 500);
							}, 600);

							vm.formatDocument(vm.readOnly);

							vm.raw$editor.addCommand(
								monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS,
								vm.formatDocument
							);
							vm.raw$editor.addCommand(monaco.KeyCode.F9, () => {
								xU.launchFullscreen(vm.$refs.container);
							});
							vm.raw$editor.onDidChangeModelContent(vm.syncData);
						},
						syncData() {
							const newCode = this.raw$editor.getValue();
							if (newCode !== this.code) {
								this.raw$Value = newCode;
								this.$emit("update:code", newCode);
							}
						}
					},
					render() {
						return (
							<div
								id={this.id}
								ref="container"
								class="flex1"
								style="height:100%;width:100%"
							/>
						);
					}
				})
			);
		})
);
