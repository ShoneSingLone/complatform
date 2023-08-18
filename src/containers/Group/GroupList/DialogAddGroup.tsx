import { defineComponent } from "vue";
import { xU, defItem, State_UI, pickValueFrom } from "@ventose/ui";
import { FormRules } from "@/utils/common.FormRules";
import { ItemUAC } from "../../../components/ItemRender/ItemUAC";

const { $t } = State_UI;

export const DialogAddGroup = defineComponent({
	props: {
		/* Dialog 默认传入参数 */
		propOptions: {
			type: Object,
			default() {
				return { __elId: false };
			}
		}
	},
	data() {
		const vm = this;
		return {
			formItems: {
				newGroupName: defItem({
					value: "",
					label: $t("分组名").label,
					placeholder: $t("请输入分组名称").label,
					rules: [FormRules.required()]
				}),
				newGroupDesc: defItem({
					isTextarea: true,
					value: "",
					label: $t("简介").label,
					placeholder: "请输入分组描述",
					rules: [FormRules.required()]
				}),
				owner_uids: defItem({
					itemType: ItemUAC,
					value: [],
					label: $t("组长").label,
					placeholder: "请输入分组描述",
					rules: [FormRules.required()]
				})
			},
			styleLabel: { "min-width": "120px", width: "unset" }
		};
	},
	mounted() {
		this.propOptions.vm = this;
	},
	computed: {
		vDomFormItems() {
			return xU.map(this.formItems, (item, prop) => {
				return (
					<>
						<xGap t="10" />
						<xItem configs={item} />
					</>
				);
			});
		}
	},
	render() {
		return (
			<>
				<div class="x-dialog-boddy-wrapper">
					{/* {JSON.stringify(pickValueFrom(this.formItems))} */}
					<xForm class="flex vertical" labelStyle={this.styleLabel}>
						{this.vDomFormItems}
					</xForm>
				</div>
				<xDialogFooter
					configs={{
						onCancel: this.propOptions.$close,
						onOk: () => {
							this.propOptions.onOk({
								formItems: this.formItems,
								closeDialog: this.propOptions.$close
							});
						}
					}}
				/>
			</>
		);
	}
});
