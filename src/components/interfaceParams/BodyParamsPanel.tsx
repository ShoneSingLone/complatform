import { defItem, UI, xU } from "@/ventose/ui";
import { ITEM_OPTIONS } from "@/utils/common.options";
import { defineComponent } from "vue";
import { BodyParamsForm } from "./BodyParamsForm";
import { BodyParamsJson } from "./BodyParamsJson";
import { BodyParamsRaw } from "./BodyParamsRaw";
import { DialogBulkValues } from "./DialogBulkValues";

export const BodyParamsPanel = defineComponent({
	/* req_body_type */
	props: ["params"],
	emits: ["update:params"],
	data(vm) {
		return {
			configsBodyType: defItem({
				prop: "configsBodyType",
				itemType: "RadioGroup",
				options: ITEM_OPTIONS.interfaceBodyType
			})
		};
	},
	methods: {
		openBulkValuesDialog() {
			UI.dialog.component({
				title: this.xI("批量添加参数"),
				component: DialogBulkValues,
				formValues: this.params.req_body_form,
				onOk: req_body_form => {
					this.params.req_body_form = req_body_form;
				}
			});
		}
	},
	computed: {
		bodyType: {
			get() {
				return this.params.req_body_type;
			},
			set(type) {
				this.params.req_body_type = type;
			}
		}
	},
	render() {
		return (
			<ElCard>
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
								{/* {JSON.stringify(this.params.req_body_other)} */}
								{this.params.req_body_type == "form" ? (
									<BodyParamsForm reqBodyForm={this.params.req_body_form} />
								) : null}
								{this.params.req_body_type == "json" ? (
									<BodyParamsJson
										reqBodyIsJsonSchema={this.params.req_body_is_json_schema}
										v-model:reqBodyOther={this.params.req_body_other}
									/>
								) : null}
								{this.params.req_body_type == "file" ? "开发中......" : null}
								{this.params.req_body_type == "raw" ? (
									<BodyParamsRaw
										v-model:reqBodyOther={this.params.req_body_other}
									/>
								) : null}
							</>
						);
					}
				}}
			</ElCard>
		);
	}
});
