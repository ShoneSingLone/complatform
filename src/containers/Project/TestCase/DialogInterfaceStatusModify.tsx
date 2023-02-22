import { validateForm, AllWasWell, pickValueFrom, UI, $t } from "@ventose/ui";
import { defItem, xU, FormRules, setValueTo } from "@ventose/ui";
import { defineComponent } from "vue";
import { API } from "../../../api";
import { State_App } from "@/state/State_App";
import { Methods_Project } from "./State_Project";
import { ITEM_OPTIONS } from "@/utils/common.options";

export const DialogInterfaceStatusModify = defineComponent({
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
		return { State_App };
	},
	data() {
		return {
			dataXItem: {
				...defItem({
					prop: "status",
					label: $t("状态").label,
					value: ITEM_OPTIONS.interfaceStatus[0].value,
					options: ITEM_OPTIONS.interfaceStatus,
					itemType: "Select"
				})
			}
		};
	},
	mounted() {
		this.propDialogOptions.vm = this;
		this.initForm();
	},
	computed: {
		category() {
			if (this.propDialogOptions.category) {
				return this.propDialogOptions.category;
			} else {
				return false;
			}
		}
	},
	methods: {
		initForm() {
			if (this.category) {
				setValueTo(this.dataXItem, this.category);
			}
		},
		async onOk() {
			const validateResults = await validateForm(this.dataXItem);
			const { selected } = this.propDialogOptions;
			if (AllWasWell(validateResults)) {
				const { status } = pickValueFrom(this.dataXItem);
				try {
					const res = await Promise.all(
						xU.map(selected, id => API.project.updateInterface({ id, status }))
					);
					Methods_Project.updateInterfaceMenuList();
					this.propDialogOptions.closeDialog();
					UI.message.success(this.$t("修改_成功", { title: "状态" }).label);
				} catch (error) {
					UI.message.error(this.$t("修改_失败", { title: "状态" }).label);
				}
			}
		}
	},
	render() {
		return (
			<>
				<div class="g-row flex1 height100 ">
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
					<xGap b="38" />
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
