//@ts-nocheck
import { State_UI, xU } from "@ventose/ui";
import { defineComponent, defineAsyncComponent } from "vue";
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
						code(value) {
							if (value !== this.raw$Value) {
								this.raw$editor.setValue(value);
							}
						}
					},
					methods: {
						//初始化方法
						async init() {
							let vm = this;
							vm.$refs.container.innerHTML = "";
							this.raw$editor = monaco.editor.create(this.$refs.container, {
								value: this.code || "",
								language: this.language || "javascript",
								minimap: { enabled: false },
								fontSize: 12,
								readOnly: this.readOnly || false,
								// 超出编辑器大小的使用fixed属性显示
								fixedOverflowWidgets: true,
								theme: this.theme || theme[3],
								automaticLayout: true
							});
							this.raw$editor.addCommand(
								monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS,
								() => {
									//自动格式化代码
									this.raw$editor.trigger("", "editor.action.formatDocument");
								}
							);
							this.raw$editor.addCommand(monaco.KeyCode.F9, () => {
								xU.launchFullscreen(this.$refs.container);
							});
							this.raw$editor.onDidChangeModelContent(this.syncData);
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
