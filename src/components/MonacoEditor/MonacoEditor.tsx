import { xU } from "@ventose/ui";
import * as monaco from "monaco-editor";
import { defineComponent } from "vue";

const theme = ["vs", "vs-dark", "hc-black", "hc-light"];

export const MonacoEditor = defineComponent({
	props: ["code", "language", "theme"],
	emits: ["update:code"],
	data() {
		return { id: xU.genId("MonacoEditor") };
	},
	mounted() {
		this.init();
	},
	methods: {
		//初始化方法
		init() {
			let vm = this;
			vm.$refs.container.innerHTML = "";
			this.raw$editor = monaco.editor.create(this.$refs.container, {
				value: this.code || "",
				language: this.language || "javascript",
				minimap: {
					enabled: true
				},
				fontSize: 12,
				// 超出编辑器大小的使用fixed属性显示
				fixedOverflowWidgets: true,
				theme: this.theme || theme[1]
			});
			this.raw$editor.onDidChangeModelContent(() => {
				const newCode = this.raw$editor.getValue();
				if (newCode !== this.code) {
					vm.$emit("update:code", newCode);
				}
			});
		}
	},
	render() {
		return (
			<>
				<div id={this.id} ref="container" style="height:100%;width:100%" />
			</>
		);
	}
});
