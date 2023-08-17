import {
	isItemInvalid,
	AllWasWell,
	pickValueFrom,
	UI,
	defItem,
	xU,
	$t,
	VNodeCollection,
	setValueTo
} from "@ventose/ui";
import { defineComponent } from "vue";
import { API } from "@/api";
import { State_App } from "@/state/State_App";
import { FormRules } from "@/utils/common.FormRules";
import { Cpt_url } from "@/router/router";
import { stateI18n } from "./State_i18n";
import { ITEM_OPTIONS } from "@/utils/common.options";

export const DialogUpsertI18nRecord = defineComponent({
	props: {
		/* Dialog 默认传入参数 */
		propDialogOptions: {
			type: Object,
			default() {
				return { __elId: false };
			}
		}
	},
	setup() {
		return { State_App, Cpt_url };
	},
	data() {
		const vm = this;
		const idTipsMarkdown = `\`\`\`js
//${$t(`作为Key值`).label}
$t("Key值").label
\`\`\``;
		return {
			dataXItem: {
				key: defItem({
					value: "",
					label: $t("key").label,
					labelVNodeRender: VNodeCollection.labelTips(
						<Mkit md={idTipsMarkdown} />
					),
					rules: [FormRules.required()]
				}),
				desc: defItem({
					value: "",
					label: $t("描述").label,
					isTextarea: true,
					rules: [FormRules.required()]
				}),
				isRectified: defItem({
					value: false,
					label: $t("是否已校正").label,
					itemType: "Switch",
					options: ITEM_OPTIONS.trueOrFalse,
					rules: [FormRules.required()]
				}),
				valueArray: defItem({
					value: "",
					label: $t("国际化信息").label,
					labelVNodeRender: VNodeCollection.labelTips(
						$t(`以数组的形式["语言","language"]`).label
					),
					rules: [FormRules.required(), FormRules.stringIsArrayJson()],
					itemType: defineComponent({
						props: [
							"properties",
							"slots",
							"listeners",
							"propsWillDeleteFromConfigs"
						],
						computed: {
							_valueArray: {
								get() {
									return this.properties.value || ``;
								},
								set(modelValue) {
									this.listeners["onEmitItemValue"](modelValue);
								}
							}
						},
						render() {
							return (
								<div style={"height:300px"}>
									<MonacoEditor
										v-model:code={this._valueArray}
										language="json"
									/>
								</div>
							);
						}
					})
				})
			}
		};
	},
	mounted() {
		this.initForm();
	},
	methods: {
		initForm() {
			if (this.propDialogOptions?.record?.valueArray) {
				setValueTo(this.dataXItem, this.propDialogOptions?.record);
			}
		},
		async onOk() {
			if (!(await isItemInvalid())) {
				try {
					const { data } = await API.god.upsertOneI18nRecord({
						...this.propDialogOptions?.record,
						...pickValueFrom(this.dataXItem)
					});
					if (data?.msg?._id) {
						UI.message.success("添加记录成功");
					} else {
						UI.message.success("修改记录成功");
					}
					stateI18n._$updateList({});
					this.propDialogOptions.closeDialog();
				} catch (error) {
					UI.message.error("添加失败");
				}
			}
		}
	},
	render() {
		return (
			<>
				<div class="x-dialog-boddy-wrapper">
					<xGap t="10" />
					<xForm
						class="flex vertical"
						labelStyle={{ "min-width": "120px", width: "unset" }}>
						{xU.map(this.dataXItem, (configs, prop) => {
							return (
								<>
									<xGap t="10" />
									<xItem configs={configs} />
								</>
							);
						})}
					</xForm>
					<xGap t="10" />
				</div>
				<xDialogFooter
					configs={{
						onCancel: this.propDialogOptions.closeDialog,
						onOk: this.onOk
					}}
				/>
			</>
		);
	}
});
