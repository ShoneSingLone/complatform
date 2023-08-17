import { validateForm, AllWasWell, pickValueFrom, UI, $t } from "@ventose/ui";
import { defItem, xU, setValueTo } from "@ventose/ui";
import { defineComponent } from "vue";
import { API } from "../../../api";
import { State_App } from "@/state/State_App";
import { ITEM_OPTIONS } from "@/utils/common.options";
import { EnvSelectRender } from "./DialogModifyInterface.Helper";
import { Methods_ProjectInterface } from "@/containers/Project/Interface/State_ProjectInterface";

export const DialogInterfaceProxyModify = defineComponent({
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
	watch: {
		"State_App.currProject": {
			immediate: true,
			deep: true,
			handler(currProject) {
				const { env: envArray } = currProject;
				this.dataXItem.witchEnv.setOptions(envArray);
			}
		}
	},
	data(vm) {
		return {
			dataXItem: {
				isProxy: defItem({
					value: false,
					label: vm.$t("是否开启转发").label,
					options: ITEM_OPTIONS.trueOrFalse,
					itemType: "Switch"
				}),
				witchEnv: defItem({
					isShow() {
						return vm.dataXItem.isProxy.value;
					},
					label: vm.$t("转发环境").label,
					value: "",
					options: [],
					setOptions(envArray) {
						this.options = xU.map(envArray, i => {
							return {
								value: i._id,
								label: `${i.name} ${i.domain}`
							};
						});
					},
					itemType: EnvSelectRender
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
			const validateResults = await validateForm();
			const { selected } = this.propDialogOptions;
			if (AllWasWell(validateResults)) {
				const { isProxy, witchEnv } = pickValueFrom(this.dataXItem);
				try {
					const res = await Promise.all(
						xU.map(selected, id =>
							API.project.updateInterface({ id, witchEnv, isProxy })
						)
					);
					Methods_ProjectInterface.updateInterfaceMenuList();
					this.propDialogOptions.closeDialog();
					UI.message.success(this.$t("修改_成功", { title: "代理" }).label);
				} catch (error) {
					UI.message.error(this.$t("修改_失败", { title: "代理" }).label);
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
						class="flex"
						labelStyle={{ "min-width": "120px", width: "unset" }}>
						<xItem configs={this.dataXItem.isProxy} />
						<xGap t="10" />
						<xItem configs={this.dataXItem.witchEnv} class="flex1" />
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
