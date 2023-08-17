import { defineComponent } from "vue";
import { Methods_App } from "@/state/State_App";
import {
	defItem,
	EVENT_TYPE,
	UI,
	State_UI,
	AllWasWell,
	validateForm,
	pickValueFrom,
	$t
} from "@ventose/ui";
import { FormRules, newRule } from "@/utils/common.FormRules";
import { API } from "@/api";
import { Cpt_url } from "@/router/router";
import { stylesLoginFormIcon } from "@/utils/variable";
import { types } from "sass";
import Error = types.Error;

const formItemStyle = {
	marginBottom: ".16rem"
};

const changeHeight = {
	height: ".42rem"
};

export default defineComponent({
	props: {
		form: {
			type: Object
		},
		history: {
			type: Object
		},
		regActions: {
			type: Function
		}
	},
	setup() {
		return {
			Cpt_url,
			Methods_App
		};
	},
	data() {
		const vm = this;
		return {
			configsForm: {
				userName: defItem({
					value: "",
					size: "large",
					/* render的时候重新获取 */
					placeholder: () => $t("用户名").label,
					rules: [
						FormRules.required($t("请输入用户名!").label[EVENT_TYPE.blur])
					],
					slots: {
						prefix: () => (
							<xIcon icon="UserOutlined" style={stylesLoginFormIcon.icon} />
						)
					}
				}),
				email: defItem({
					value: "",
					size: "large",
					/* render的时候重新获取 */
					placeholder: () => $t("Email").label,
					rules: [
						FormRules.required($t("请输入Email!").label[EVENT_TYPE.blur]),
						FormRules.email()
					],
					slots: {
						prefix: () => (
							<xIcon icon="MailOutlined" style={stylesLoginFormIcon.icon} />
						)
					}
				}),
				password: defItem({
					value: "",
					isPassword: true,
					size: "large",
					/* render的时候重新获取 */
					placeholder: () => $t("密码").label,
					rules: [
						FormRules.required(
							() => $t("请输入密码").label,
							[EVENT_TYPE.update]
						)
					],
					onValidateFail: thisConfigs => {
						console.log(thisConfigs.itemTips);
					},
					slots: {
						prefix: () => (
							<xIcon icon="LockOutlined" style={stylesLoginFormIcon.icon} />
						)
					}
				}),
				confirm: defItem({
					value: "",
					isPassword: true,
					size: "large",
					/* render的时候重新获取 */
					placeholder: () => $t("请再次输入密码!").label,
					rules: [
						FormRules.required($t("请再次输入密码!").label, [EVENT_TYPE.blur]),
						newRule({
							validator: async confirm => {
								if (vm.configsForm.password.value !== confirm) {
									return $t("两次输入的密码不一致!").label;
								}
								return "";
							},
							trigger: [EVENT_TYPE.update]
						})
					],
					slots: {
						prefix: () => (
							<xIcon icon="LockOutlined" style={stylesLoginFormIcon.icon} />
						)
					}
				})
			},
			configsSubmit: {
				size: "large",
				type: "primary",
				class: "login-button flex center login-form-button",
				text: () => $t("注册").label,
				async onClick() {
					try {
						const validateResults = await validateForm(vm.$refs.form);
						if (AllWasWell(validateResults)) {
							const res = await API.user.regActions(
								pickValueFrom(vm.configsForm)
							);
							UI.notification.success($t('"注册成功"').label);

							Cpt_url.value.go("/group");
						} else {
							throw new Error("未通过验证");
						}
					} catch (e) {
						console.error(e);
					}
				}
			}
		};
	},
	methods: {},
	render({ configsSubmit, configsForm }) {
		return (
			<>
				<form ref="form">
					{/* <!-- 用户名 --> */}
					<xItem configs={configsForm.userName} autocomplete="userName" />
					<xGap t="20" />
					<xItem configs={configsForm.email} autocomplete="email" />
					<xGap t="20" />
					{/* <!-- 密码 --> */}
					<xItem
						configs={configsForm.password}
						autocomplete="current-password"
					/>
					<xGap t="20" />
					{/* <!-- 确认密码 --> */}
					<xItem
						configs={configsForm.confirm}
						autocomplete="current-password"
					/>
					<xGap t="20" />
					<div class="item-wrapper">
						<xButton configs={configsSubmit} />
					</div>
				</form>
			</>
		);
	}
});
