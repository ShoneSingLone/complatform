import {
	setValueTo,
	itemsInvalid,
	pickValueFrom,
	xU,
	defFormConfigs,
	xI,
	EVENT_TYPE
} from "@/ventose/ui";
import { FormRules, newRule } from "@/utils/common.FormRules";
import { defineComponent } from "vue";
import { API } from "@/api";
import { stateApp } from "@/state/app";
import { stateInterface } from "@/state/interface";

export const DialogUpdatePwd = defineComponent({
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
		return { stateApp };
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
						FormRules.required(xI("请再次输入密码!")),
						newRule({
							validator: async confirm => {
								if (vm.dataXItem.password.value !== confirm) {
									return xI("两次输入的密码不一致!");
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
			if (!(await itemsInvalid())) {
				const { name, desc } = pickValueFrom(this.dataXItem);
				const project_id = this.stateApp.currProject._id;
				try {
					if (this.category) {
						await this.updateOldCategory({ name, desc, project_id });
					} else {
						await this.insertNewCategory({ name, desc, project_id });
					}
					stateInterface._updateInterfaceMenuList();
					this.propOptions.$close();
				} catch (error) {
					if (this.category) {
						xU.message.error(xI("修改_失败", { title: "分类" }));
					} else {
						xU.message.error(xI("添加_失败", { title: "分类" }));
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
				xU.message.success(xI("添加_成功", { title: "分类" }));
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
				xU.message.success(xI("修改_成功", { title: "分类" }));
			} else {
				throw new Error("");
			}
		}
	},
	render() {
		return (
			<>
				<div class="x-dialog-boddy-wrapper ">
					<xGap t />
					<xForm
						class="flex vertical"
						labelStyle={{ "min-width": "120px", width: "unset" }}>
						{xU.map(this.dataXItem, (configs, prop) => {
							return (
								<>
									<xGap t />
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
