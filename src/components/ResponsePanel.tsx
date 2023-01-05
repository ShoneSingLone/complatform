import { xU } from "@ventose/ui";
import { defineComponent } from "vue";
import { JsonSchemaMonaco } from "../components/JsonSchemaEditor/JsonSchemaMonaco";

/* 
1.接收apimethod 默认打开
*/
export const ResponsePanel = defineComponent({
	props: ["body"],
	emits: ["update:body"],
	data() {
		return {};
	},
	computed: {
		resBody: {
			get() {
				return this.body || `{}`;
			},
			set(val) {
				this.$emit("update:body", val);
			}
		}
	},
	render() {
		return (
			<div style="height:400px;">
				<JsonSchemaMonaco v-model:schemaString={this.resBody} />
			</div>
		);
	}
});
