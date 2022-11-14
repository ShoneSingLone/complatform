import { defineComponent } from "vue";
import { _, defItem, State_UI, FormRules } from "@ventose/ui";
import { xItemUAC } from "@/components/xItemRender/xItemUAC";

const { $t } = State_UI;

export const DialogEditGroup = defineComponent({
	props: {
		/* Dialog 默认传入参数 */
		options: {
			type: Object,
			default() {
				return { __elId: false };
			}
		}
	},
	computed: {
		row() {
			return this.options?.row || {};
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
					itemType: xItemUAC,
					prop: "owner_uids",
					value: "",
					label: $t("组长").label,
					placeholder: "请输入分组描述",
					rules: [FormRules.required()]
				})
			}
		};
	},
	mounted() {
		this.options.vm = this;
	}
});
