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
	__v_skip: true,
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
		privateParams(privateParams) {
			this.$emit("update:params", privateParams);
		},
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
		if (!this.privateParams.req_headers) {
			return <aSpin spinning={true} class="flex middle height100 width100" />;
		}

		const bodyHeader = (() => {
			if (this.privateParams.req_body_type == "form") {
				return `${BODY} ${this.privateParams.req_body_type} ${this.privateParams.req_body_form.length}`;
			}

			return `${BODY} ${this.privateParams.req_body_type}`;
		})();

		return (
			<aCollapse v-model:activeKey={this.collapseActive}>
				<aCollapsePanel
					key="header"
					header={`header ${this.privateParams.req_headers.length}`}>
					<HeaderParamsPanel
						v-model:reqHeaders={this.privateParams.req_headers}
					/>
				</aCollapsePanel>
				<aCollapsePanel
					key={QUERY}
					header={`${QUERY} ${this.privateParams.req_query.length}`}>
					<QueryParamsPanel v-model:reqQuery={this.privateParams.req_query} />
				</aCollapsePanel>
				<aCollapsePanel
					key={BODY}
					header={bodyHeader}
					collapsible={this.bodyCollapsible}>
					<BodyParamsPanel v-model:params={this.privateParams} />
				</aCollapsePanel>
			</aCollapse>
		);
	}
});
