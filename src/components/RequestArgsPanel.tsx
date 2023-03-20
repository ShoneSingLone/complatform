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
			pparams: null
		};
	},
	watch: {
		pparams(params) {
			this.$emit("update:params", params);
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
		// return JSON.stringify(this.params)

		// if (!this.params) {
		// 	return <aSpin spinning={true} class="flex middle height100 width100" />;
		// }

		const bodyHeader = (() => {
			if (this.params?.req_body_type == "form") {
				return `${BODY} ${this.params?.req_body_type} ${this.params?.req_body_form.length}`;
			}

			return `${BODY} ${this.params?.req_body_type}`;
		})();

		return (
			<aCollapse v-model:activeKey={this.collapseActive}>
				<aCollapsePanel
					key="header"
					header={`header ${this.params?.req_headers.length}`}>
					<HeaderParamsPanel
						reqHeaders={this.params?.req_headers}
						onUpdate:reqHeaders={req_headers =>
							this.$emit(
								"update:params",
								xU.merge({}, this.params, { req_headers })
							)
						}
					/>
				</aCollapsePanel>
				<aCollapsePanel
					key={QUERY}
					header={`${QUERY} ${this.params?.req_query.length}`}>
					<QueryParamsPanel
						reqQuery={this.params?.req_query}
						onUpdate:reqQuery={req_query =>
							this.$emit(
								"update:params",
								xU.merge({}, this.params, { req_query })
							)
						}
					/>
				</aCollapsePanel>
				<aCollapsePanel
					key={BODY}
					header={bodyHeader}
					collapsible={this.bodyCollapsible}>
					<BodyParamsPanel
						params={this.params || {}}
						onUpdate:params={params =>
							this.$emit("update:params", xU.merge({}, this.params, params))
						}
					/>
				</aCollapsePanel>
			</aCollapse>
		);
	}
});
