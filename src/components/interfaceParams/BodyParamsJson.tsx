import { defineComponent } from "vue";
import { State_App } from "../../state/State_App";
import { JsonSchemaMonaco } from "../JsonSchemaEditor/JsonSchemaMonaco";

export const BodyParamsJson = defineComponent({
	props: ["reqBodyOther", "reqBodyIsJsonSchema"],
	emits: ["update:reqBodyOther"],
	setup() {
		return {
			State_App
		};
	},
	watch: {},
	computed: {
		schemaString: {
			get() {
				return this.reqBodyOther;
			},
			set(val) {
				this.$emit("update:reqBodyOther", val);
			}
		}
	},
	methods: {},
	data(vm) {
		return {
			isReqBodyUseSchema: false,
			jsonData: {}
		};
	},
	render() {
		return (
			<div style="height:300px" class="flex vertical">
				{/* {JSON.stringify(this.schemaString)} */}
				<JsonSchemaMonaco v-model:schemaString={this.schemaString} />
			</div>
		);
	}
});
