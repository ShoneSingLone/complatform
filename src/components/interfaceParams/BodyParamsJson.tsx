import { defineComponent } from "vue";
import { State_App } from "../../state/State_App";
import {
	JsonSchemaEditor,
	string2JsonSchema
} from "../JsonSchemaEditor/JsonSchemaEditor";
import { JsonSchemaMonaco } from "../JsonSchemaEditor/JsonSchemaMonaco";

export const BodyParamsJson = defineComponent({
	components: { JsonSchemaEditor },
	props: ["reqBodyOther", "reqBodyIsJsonSchema"],
	setup() {
		return {
			State_App
		};
	},
	watch: {},
	computed: {},
	methods: {},
	data(vm) {
		return {
			isReqBodyUseSchema: false,
			jsonData: {}
		};
	},
	render() {
		return (
			<div style="height:600px" class="flex vertical">
				<JsonSchemaMonaco v-model:schemaString={this.reqBodyOther} />
			</div>
		);
	}
});
