import {
	validateForm,
	AllWasWell,
	pickValueFrom,
	UI,
	defItem,
	xU,
	$t,
	VNodeCollection
} from "@ventose/ui";
import { defineComponent } from "vue";
import { API } from "@/api";
import { State_App } from "@/state/State_App";
import { FormRules } from "@/utils/common.FormRules";
import { Cpt_url } from "@/router/router";
import { stateI18n } from "./State_i18n";

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
$t("此处为Key").label
\`\`\``;
		return {
			dataXItem: {
				...defItem({
					value: "",
					prop: "key",
					label: $t("ID").label,
					labelVNodeRender: VNodeCollection.labelTips(
						<Mkit md={idTipsMarkdown} />
					),
					rules: [FormRules.required()]
				}),
				...defItem({
					value: "",
					prop: "desc",
					label: $t("描述").label,
					isTextarea: true,
					rules: [FormRules.required()]
				}),
				...defItem({
					value: "",
					prop: "valueArray",
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
									this.listeners["onUpdate:value"](modelValue);
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
	computed: {},
	mounted() {
		this.propDialogOptions.vm = this;
	},
	methods: {
		async onOk() {
			const validateResults = await validateForm(this.dataXItem);
			if (AllWasWell(validateResults)) {
				try {
					const { data } = await API.god.upsertOneI18nRecord(
						pickValueFrom(this.dataXItem)
					);
					if (data?.msg?._id) {
						UI.message.success("添加记录成功");
						stateI18n._$updateList({});
						this.propDialogOptions.closeDialog();
					}
				} catch (error) {
					UI.message.error("添加失败");
				}
			}
		}
	},
	render() {
		return (
			<>
				<div class="x-dialog-boddy-wrapper flex1 height100">
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
