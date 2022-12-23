import { xU } from "@ventose/ui";
import { BODY, GET, HTTP_METHOD, QUERY } from "src/utils/variable";
import { defineComponent } from "vue";
import { BodyParamsPanel } from "./interfaceParams/BodyParamsPanel";
import { HeaderParamsPanel } from "./interfaceParams/HeaderParamsPanel";
import { QueryParamsPanel } from "./interfaceParams/QueryParamsPanel";

/* 
1.接收apimethod 默认打开
*/
export const RequestArgsPanel = defineComponent({
	props: ["params", "apiMethod"],
	/* */
	emits: ["update:params"],
	data() {
		return {
			collapseActive: QUERY,
			privateHttpMethod: GET,
			privateParams: {}
		};
	},
	watch: {
		params() {
			this.privateParams = xU.cloneDeep(this.params);
		},
		apiMethod: {
			immediate: true,
			handler(apiMethod) {
				this.privateHttpMethod = apiMethod || GET;
				this.collapseActive = HTTP_METHOD[this.privateHttpMethod].default_tab;
			}
		}
	},
	computed: {
		bodyCollapsible() {
			/* 与编辑的 接口路径下的apiMethod */
			return HTTP_METHOD[this.privateHttpMethod].request_body ? "" : "disabled";
		}
	},
	render() {
		return (
			<aCollapse v-model:activeKey={this.collapseActive}>
				<aCollapsePanel key="header" header="header">
					<HeaderParamsPanel v-model:reqHeaders={this.privateParams.req_headers} />
				</aCollapsePanel>
				<aCollapsePanel key={QUERY} header={QUERY}>
					<QueryParamsPanel v-model:reqQuery={this.privateParams.req_query} />
				</aCollapsePanel>
				<aCollapsePanel
					key={BODY}
					header={BODY}
					collapsible={this.bodyCollapsible}>
					<BodyParamsPanel
						v-model:reqBodyType={this.privateParams.req_body_type}
						v-model:reqBodyIsJsonSchema={this.privateParams.req_body_is_json_schema}
						v-model:reqBodyForm={this.privateParams.req_body_form}
						v-model:reqBodyOther={this.privateParams.req_body_other}
					/>
				</aCollapsePanel>
			</aCollapse>
		);
	}
});
