import { xU } from "@ventose/ui";
import { defineComponent } from "vue";
import { JsonSchemaMonaco } from "../components/JsonSchemaEditor/JsonSchemaMonaco";

/* 
1.接收apimethod 默认打开
*/
export const ResponsePanel = defineComponent({
	props: ["params"],

	render() {
		return <JsonSchemaMonaco value={this.params.res_body || ""} />;
	}
});
