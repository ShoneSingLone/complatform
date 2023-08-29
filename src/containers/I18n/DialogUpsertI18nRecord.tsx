import {
	itemsInvalid,
	pickValueFrom,
	xU,
	defItem,
	xI,
	VNodeCollection,
	setValueTo
} from "@/ventose/ui";
import { defineComponent } from "vue";
import { API } from "@/api";
import { stateApp } from "@/state/app";
import { FormRules } from "@/utils/common.FormRules";
import { cptRouter } from "@/router/router";
import { stateI18n } from "./State_i18n";
import { ITEM_OPTIONS } from "@/utils/common.options";

export const DialogUpsertI18nRecord = defineComponent({
	props: {
		/* Dialog 默认传入参数 */
		propOptions: {
			type: Object,
			default() {
				return { __elId: false };
			}
		}
	},
	setup() {
		return { stateApp, cptRouter };
	},
	data() {
		const vm = this;
		const idTipsMarkdown = `\`\`\`js
//${xI(`作为Key值`)}
xI("Key值")
\`\`\``;
		return {
			dataXItem: {
				key: defItem({
					value: "",
					label: xI("key"),
					labelVNodeRender: VNodeCollection.labelTips(
						<Mkit md={idTipsMarkdown} />
					),
					rules: [FormRules.required()]
				}),
				desc: defItem({
					value: "",
					label: xI("描述"),
					isTextarea: true,
					rules: [FormRules.required()]
				}),
				isRectified: defItem({
					value: false,
					label: xI("是否已校正"),
					itemType: "Switch",
					options: ITEM_OPTIONS.trueOrFalse,
					rules: [FormRules.required()]
				}),
				valueArray: defItem({
					value: "",
					label: xI("国际化信息"),
					labelVNodeRender: VNodeCollection.labelTips(
						xI(`以数组的形式["语言","language"]`)
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
			if (this.propOptions?.record?.valueArray) {
				setValueTo(this.dataXItem, this.propOptions?.record);
			}
		},
		async onOk() {
			if (!(await itemsInvalid())) {
				try {
					const { data } = await API.god.upsertOneI18nRecord({
						...this.propOptions?.record,
						...pickValueFrom(this.dataXItem)
					});
					if (data?.msg?._id) {
						xU.message.success("添加记录成功");
					} else {
						xU.message.success("修改记录成功");
					}
					stateI18n._$updateList({});
					this.propOptions.$close();
				} catch (error) {
					xU.message.error("添加失败");
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
						onCancel: this.propOptions.$close,
						onOk: this.onOk
					}}
				/>
			</>
		);
	}
});
