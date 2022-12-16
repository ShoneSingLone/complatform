import { xU } from "@ventose/ui";
import { BODY, GET, HTTP_METHOD, QUERY } from "src/utils/variable";
import { defineComponent } from "vue";
import { BodyParamsPanel } from "./interfaceParams/BodyParamsPanel";

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
					<p>asdfasfsafsf</p>
				</aCollapsePanel>
				<aCollapsePanel key={QUERY} header={QUERY}>
					<aButton
						size="small"
						type="primary"
						onClick={() => this.addParams("req_query")}>
						添加Query参数
					</aButton>

					<div
						className="bulk-import"
						onClick={() => this.showBulk("req_query")}>
						批量添加
					</div>
				</aCollapsePanel>
				<aCollapsePanel
					key={BODY}
					header={BODY}
					collapsible={this.bodyCollapsible}>
					<BodyParamsPanel params={this.params} />
				</aCollapsePanel>
			</aCollapse>
		);
	}
});
