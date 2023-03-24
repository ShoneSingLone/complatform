import {
	compileVNode,
	defCol,
	defItem,
	defXVirTableConfigs,
	xU
} from "@ventose/ui";
import { State_Project } from "@/containers/Project/Interface/State_Project";
import { Cpt_url } from "@/router/router";
import { ITEM_OPTIONS, ITEM_OPTIONS_VDOM } from "@/utils/common.options";
import { defineComponent } from "vue";
import { MonacoEditor } from "../MonacoEditor/MonacoEditor";

function newFormData() {
	return {
		_id: xU.genId("body_params"),
		name: "",
		type: "text",
		required: "1",
		desc: "",
		example: ""
	};
}

const STRATEGY_CELL_ITEM_CONFIGS = {
	name: {},
	type: {
		itemType: "Select",
		options: ITEM_OPTIONS.interfaceBodyFormType
	},
	required: {
		itemType: "Select",
		options: ITEM_OPTIONS.required
	},
	example: {},
	desc: {}
};
const BODY_PARAM_PROP_ARRAY = Object.keys(STRATEGY_CELL_ITEM_CONFIGS);

/* virTable 的 renderCell 缓存标识 ,关键是唯一，具体是啥无所谓，所以这里不用过分考虑顺序*/
const [ID_NAME, ID_TYPE, ID_REQUIRED, ID_RECORD, ID_DESC, ID_OPERATIONS] = [
	...BODY_PARAM_PROP_ARRAY,
	"ID_OPERATIONS"
].map(xU.genId);

export const BodyParamsRaw = defineComponent({
	props: ["reqBodyOther"],
	watch: {
		reqBodyOther: {
			immediate: true,
			handler(bodyText) {
				this.resetDataForm(bodyText);
			}
		}
	},
	methods: {
		resetDataForm(bodyText) {
			this.bodyText = bodyText;
		}
	},
	data(vm) {
		return {
			bodyText: ""
		};
	},
	render() {
		return (
			<>
				<div style={{ height: "300px" }}>
					<MonacoEditor v-model:code={this.bodyText} language="json" />
				</div>
			</>
		);
	}
});
