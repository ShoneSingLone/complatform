import { xU } from "@ventose/ui";
import { HTTP_METHOD } from "src/utils/variable";
import { defineComponent } from "vue";

export const RequestArgsPanel = defineComponent({
	props: ["params"],
	/*
	 */
	emits: ["update:params"],
	data() {
		return {
			reqArgs: "1",
			privateParams: {}
		};
	},
	watch: {
		params() {
			this.privateParams = xU.cloneDeep(this.params);
		}
	},
	computed: {
		httpMethod() {
			return this.privateParams.method || "GET";
		},
		bodyCollapsible() {
			return HTTP_METHOD[this.httpMethod].request_body ? "" : "disabled";
		}
	},
	render() {
		return (
			<aCollapse v-model:activeKey={this.reqArgs}>
				<aCollapsePanel key="header" header="header">
					<p>asdfasfsafsf</p>
				</aCollapsePanel>
				<aCollapsePanel key="query" header="query">
					<p>asdfasfsafsf</p>
				</aCollapsePanel>
				<aCollapsePanel
					key="body"
					header="body"
					collapsible={this.bodyCollapsible}>
					<p>asdfasfsafsf</p>
				</aCollapsePanel>
			</aCollapse>
		);
	}
});
