import { defineComponent } from "vue";
import { State_App } from "../../state/State_App";
import { JsonSchemaEditor, string2JsonSchema } from "../JsonSchemaEditor/JsonSchemaEditor";

export const BodyParamsJson = defineComponent({
	components: { JsonSchemaEditor },
	props: ["reqBodyOther", "reqBodyIsJsonSchema"],
	setup() {
		return {
			State_App
		};
	},
	watch: {
		reqBodyOther: {
			immediate: true,
			deep: true,
			handler(reqBodyOther) {
				this.jsonData = string2JsonSchema(reqBodyOther);
				this.jsonDataString = JSON.stringify(this.jsonData)
			}
		},
		reqBodyIsJsonSchema: {
			immediate: true,
			deep: true,
			handler(reqBodyIsJsonSchema) {
				this.isReqBodyUseSchema = reqBodyIsJsonSchema;
			}
		}
	},
	computed: {
		vDomUseJson5Switch() {
			let disabled, vDomTips;
			/* 当前项目的body【能不能】使用schema */
			if (this.State_App.currProject.is_json5) {
				/* 当前【body】 使不使用 schema */
			} else {
				vDomTips = <xIcon icon="question" v-uiPopover={{ content: "项目 -> 设置 开启 json5" }} class="mr10" />
				disabled = "disabled";
			}
			return (
				<div class="flex middle">
					<span class="mr10">JSON-SCHEMA:</span>
					{vDomTips}
					<aSwitch
						v-model:checked={this.isReqBodyUseSchema}
						checkedChildren="开"
						unCheckedChildren="关"
						disabled={disabled}
						style="margin-bottom: 5px"
					/>
				</div>
			);
		},
		vDomEditor() {
			if (this.isReqBodyUseSchema) {
				return <JsonSchemaEditor value={this.jsonData} class="flex1" />
			} else {
				return <MonacoEditor code={this.params.req_body_other} language="json" />;
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
			<div style="height:600px" class="flex vertical">
				{this.vDomUseJson5Switch}
				<div class="flex flex1 horizon height100">
					{this.vDomEditor}
				</div>
			</div>
		);
	}
});
