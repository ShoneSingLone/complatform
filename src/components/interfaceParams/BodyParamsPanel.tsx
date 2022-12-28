import { defItem, UI, xU } from "@ventose/ui";
import { ITEM_OPTIONS } from "src/utils/common.options";
import { defineComponent } from "vue";
import { BodyParamsForm } from "./BodyParamsForm";
import { BodyParamsJson } from "./BodyParamsJson";
import { BodyParamsRaw } from "./BodyParamsRaw";
import { DialogBulkValues } from "./DialogBulkValues";

export const BodyParamsPanel = defineComponent({
	/* req_body_type */
	props: ["reqBodyType", "reqBodyForm", "reqBodyOther", "reqBodyIsJsonSchema"],
	emits: ["update:reqBodyForm", "update:reqBodyType"],
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
				formValues: this.reqBodyForm,
				onOk: req_body_form => {
					this.$emit("update:reqBodyForm", req_body_form);
				}
			});
		}
	},
	computed: {
		bodyType: {
			get() {
				return this.reqBodyType;
			},
			set(type) {
				this.$emit("update:reqBodyType", type);
			}
		}
	},
	render() {
		return (
			<aCard>
				{{
					extra: () => {
						if (
							xU.find(ITEM_OPTIONS.interfaceBodyType, {
								value: this.reqBodyType
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
								<xItem v-model={this.bodyType} configs={this.configsBodyType} />
							</>
						);
					},
					default: () => {
						return (
							<>
								{this.reqBodyType == "form" ? (
									<BodyParamsForm reqBodyForm={this.reqBodyForm} />
								) : null}
								{this.reqBodyType == "json" ? (
									<BodyParamsJson
										reqBodyIsJsonSchema={this.reqBodyIsJsonSchema}
										reqBodyOther={this.reqBodyOther}
									/>
								) : null}
								{this.reqBodyType == "file" ? "开发中......" : null}
								{this.reqBodyType == "raw" ? (
									<BodyParamsRaw reqBodyOther={this.reqBodyOther} />
								) : null}
							</>
						);
					}
				}}
			</aCard>
		);
	}
});
