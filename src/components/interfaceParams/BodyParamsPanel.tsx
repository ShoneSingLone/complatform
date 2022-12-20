import { defItem, UI, xU } from "@ventose/ui";
import { ITEM_OPTIONS } from "src/utils/common.options";
import { defineComponent } from "vue";
import { BodyParamsForm } from "./BodyParamsForm";
import { BodyParamsJson } from "./BodyParamsJson";
import { BodyParamsRaw } from "./BodyParamsRaw";
import { DialogBulkValues } from "./DialogBulkValues";

export const BodyParamsPanel = defineComponent({
	/* req_body_type */
	props: ["params"],
	data(vm) {
		return {
			configsBodyType: defItem.item({
				prop: "configsBodyType",
				itemType: "RadioGroup",
				options: ITEM_OPTIONS.interfaceBodyType
			})
		};
	},
	methods: {
		openBulkValuesDialog() {
			UI.dialog.component({
				title: this.$t("批量添加参数").label,
				component: DialogBulkValues,
				formValues: this.params.req_body_form,
				onOk: async req_body_form => {
					this.params.req_body_form = req_body_form;
				}
			});
		}
	},
	render() {
		return (
			<aCard>
				{{
					extra: () => {
						if (
							xU.find(ITEM_OPTIONS.interfaceBodyType, {
								value: this.params.req_body_type
							})?.isForm
						) {
							return <a onClick={this.openBulkValuesDialog}>批量添加</a>;
						}
						return null;
					},
					title: () => {
						/* 类型选择 */
						return (
							<>
								<xItem
									v-model={this.params.req_body_type}
									configs={this.configsBodyType}
								/>
							</>
						);
					},
					default: () => {
						return (
							<>
								{this.params.req_body_type == "form" ? (
									<BodyParamsForm params={this.params} />
								) : null}
								{this.params.req_body_type == "json" ? "开发中......" : null}
								{this.params.req_body_type == "file" ? "开发中......" : null}
								{this.params.req_body_type == "raw" ? (
									<BodyParamsRaw params={this.params} />
								) : null}
							</>
						);
					}
				}}
			</aCard>
		);
	}
});
