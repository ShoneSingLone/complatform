import { xU } from "@ventose/ui";
import { defineComponent } from "vue";
import { JsonSchemaMonaco } from "../components/JsonSchemaEditor/JsonSchemaMonaco";

/* 
1.接收apimethod 默认打开
*/
export const ResponsePanel = defineComponent({
	props: ["params"],
	data() {
		return {};
	},
	computed: {
		resBody: {
			get() {
				return (
					this.params.res_body ||
					`{
	/** *info* **/ 
	"id": 1 //appId
}`
				);
			},
			set(val) {
				this.params.res_body = val;
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
