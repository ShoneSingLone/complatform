import { isItemInvalid, AllWasWell, pickValueFrom, UI, $t } from "@ventose/ui";
import { defItem, xU, setValueTo } from "@ventose/ui";
import { defineComponent } from "vue";
import { API } from "../../../api";
import { State_App } from "@/state/State_App";
import { ITEM_OPTIONS } from "@/utils/common.options";
import { Methods_ProjectInterface } from "@/containers/Project/Interface/State_ProjectInterface";

export const DialogInterfaceStatusModify = defineComponent({
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
		return { State_App };
	},
	data() {
		return {
			dataXItem: {
				status: defItem({
					label: $t("状态").label,
					value: ITEM_OPTIONS.interfaceStatus[0].value,
					options: ITEM_OPTIONS.interfaceStatus,
					itemType: "Select"
				})
			}
		};
	},
	mounted() {
		this.propOptions.vm = this;
		this.initForm();
	},
	computed: {
		category() {
			if (this.propOptions.category) {
				return this.propOptions.category;
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
			const { selected } = this.propOptions;
			if (!(await isItemInvalid())) {
				const { status } = pickValueFrom(this.dataXItem);
				try {
					const res = await Promise.all(
						xU.map(selected, id => API.project.updateInterface({ id, status }))
					);
					Methods_ProjectInterface.updateInterfaceMenuList();
					this.propOptions.$close();
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
				<div class="x-dialog-boddy-wrapper ">
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
						onCancel: this.propOptions.$close,
						onOk: this.onOk
					}}
				/>
			</>
		);
	}
});
