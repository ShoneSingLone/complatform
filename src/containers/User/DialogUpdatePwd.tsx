import {
	defItem,
	xU,
	setValueTo,
	isItemInvalid,
	AllWasWell,
	pickValueFrom,
	UI,
	defFormConfigs,
	$t,
	EVENT_TYPE
} from "@ventose/ui";
import { FormRules, newRule } from "@/utils/common.FormRules";
import { defineComponent } from "vue";
import { API } from "@/api";
import { State_App } from "@/state/State_App";
import { Methods_ProjectInterface } from "@/containers/Project/Interface/State_ProjectInterface";

export const DialogUpdatePwd = defineComponent({
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
		const vm = this;
		return {
			dataXItem: defFormConfigs([
				{
					value: "",
					prop: "old_password",
					label: "当前密码",
					placeholder: "当前密码",
					isPassword: true,
					rules: [FormRules.required("请输入当前密码!")]
				},
				{
					value: "",
					prop: "password",
					label: "新密码",
					placeholder: "新密码",
					isPassword: true,
					rules: [FormRules.required("请输入新密码!")]
				},
				{
					value: "",
					prop: "verify_pass",
					label: "确认新密码",
					placeholder: "确认新密码",
					isPassword: true,
					rules: [
						FormRules.required($t("请再次输入密码!").label),
						newRule({
							validator: async confirm => {
								if (vm.dataXItem.password.value !== confirm) {
									return $t("两次输入的密码不一致!").label;
								}
								return "";
							},
							trigger: [EVENT_TYPE.update]
						})
					]
				}
			])
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
			if (!(await isItemInvalid())) {
				const { name, desc } = pickValueFrom(this.dataXItem);
				const project_id = this.State_App.currProject._id;
				try {
					if (this.category) {
						await this.updateOldCategory({ name, desc, project_id });
					} else {
						await this.insertNewCategory({ name, desc, project_id });
					}
					Methods_ProjectInterface.updateInterfaceMenuList();
					this.propDialogOptions.closeDialog();
				} catch (error) {
					if (this.category) {
						UI.message.error(this.$t("修改_失败", { title: "分类" }).label);
					} else {
						UI.message.error(this.$t("添加_失败", { title: "分类" }).label);
					}
				}
			}
		},
		async insertNewCategory({ name, desc, project_id }) {
			const res = await API.project.addInterfaceCategory({
				project_id,
				name,
				desc
			});
			if (res) {
				UI.message.success(this.$t("添加_成功", { title: "分类" }).label);
			} else {
				throw new Error("");
			}
		},
		async updateOldCategory({ name, desc, project_id }) {
			const res = await API.project.updateInterfaceCategory({
				project_id,
				catid: this.category._id,
				name,
				desc
			});
			if (res) {
				UI.message.success(this.$t("修改_成功", { title: "分类" }).label);
			} else {
				throw new Error("");
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
						onCancel: this.propDialogOptions.closeDialog,
						onOk: this.onOk
					}}
				/>
			</>
		);
	}
});
