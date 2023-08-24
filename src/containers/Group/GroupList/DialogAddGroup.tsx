import { defineComponent } from "vue";
import { xU, defItem, stateUI, pickValueFrom } from "@/ventose/ui";
import { FormRules } from "@/utils/common.FormRules";
import { ItemUAC } from "../../../components/ItemRender/ItemUAC";

const { xI } = stateUI;

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
					label: xI("分组名"),
					placeholder: xI("请输入分组名称"),
					rules: [FormRules.required()]
				}),
				newGroupDesc: defItem({
					isTextarea: true,
					value: "",
					label: xI("简介"),
					placeholder: "请输入分组描述",
					rules: [FormRules.required()]
				}),
				owner_uids: defItem({
					itemType: ItemUAC,
					value: [],
					label: xI("组长"),
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
								$close: this.propOptions.$close
							});
						}
					}}
				/>
			</>
		);
	}
});
