import { defineComponent } from "vue";
import { xU, defItem, State_UI, FormRules } from "@ventose/ui";
import { ItemUAC } from "../../../components/ItemRender/ItemUAC";

const { $t } = State_UI;

export const DialogAddGroup = defineComponent({
	props: {
		/* Dialog 默认传入参数 */
		propDialogOptions: {
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
				...defItem({
					prop: "newGroupName",
					value: "",
					label: $t("分组名").label,
					placeholder: $t("请输入分组名称").label,
					rules: [FormRules.required()]
				}),
				...defItem({
					isTextarea: true,
					prop: "newGroupDesc",
					value: "",
					label: $t("简介").label,
					placeholder: "请输入分组描述",
					rules: [FormRules.required()]
				}),
				...defItem({
					itemType: ItemUAC,
					prop: "owner_uids",
					value: "",
					label: $t("组长").label,
					placeholder: "请输入分组描述",
					rules: [FormRules.required()]
				})
			},
			styleLabel: { "min-width": "120px", width: "unset" }
		};
	},
	mounted() {
		this.propDialogOptions.vm = this;
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
					<xForm class="flex vertical" labelStyle={this.styleLabel}>
						{this.vDomFormItems}
					</xForm>
				</div>
				<xDialogFooter
					configs={{
						onCancel: this.propDialogOptions.closeDialog,
						onOk: () => {
							this.propDialogOptions.onOk({
								formItems: this.formItems,
								closeDialog: this.propDialogOptions.closeDialog
							});
						}
					}}
				/>
			</>
		);
	}
});
