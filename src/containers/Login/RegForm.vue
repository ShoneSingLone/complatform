<template>
	<form>
		<!-- 用户名 -->
		<xItem
			v-model="data.userName"
			:configs="configsForm.userName"
			autocomplete="userName" />
		<xGap t="20" />
		<xItem
			v-model="data.email"
			:configs="configsForm.email"
			autocomplete="email" />
		<xGap t="20" />
		<!-- 密码 -->
		<xItem
			v-model="data.password"
			:configs="configsForm.password"
			autocomplete="current-password" />
		<xGap t="20" />
		<!-- 确认密码 -->
		<xItem
			v-model="data.confirm"
			:configs="configsForm.confirm"
			autocomplete="current-password" />
		<div class="item-wrapper">
			<xButton :configs="configsSubmit" />
		</div>
	</form>
</template>

<script lang="jsx">
import { defineComponent } from "vue";
import { Methods_App } from "@/state/State_App";
import {
	defItem,
	EVENT_TYPE,
	UI,
	State_UI,
	AllWasWell,
	validateForm,
	FormRules
} from "@ventose/ui";
import { API } from "@/api";
import { router } from "@/router/router";

const { $t } = State_UI;

const formItemStyle = {
	marginBottom: ".16rem"
};

const changeHeight = {
	height: ".42rem"
};

const styles = {
	icon: {
		color: "rgba(0, 0, 0, 0.25)",
		width: "16px",
		height: "16px"
	}
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
			Methods_App
		};
	},
	data() {
		const vm = this;
		return {
			data: {
				userName: "",
				email: "",
				password: "",
				confirm: "",
				verifyCode: ""
			},
			configsForm: {
				...defItem({
					prop: "userName",
					size: "large",
					/* render的时候重新获取 */
					placeholder: () => $t("用户名").label,
					rules: [
						FormRules.required(
							() => $t("请输入用户名!").label,
							[EVENT_TYPE.blur]
						)
					],
					slots: {
						prefix: () => <xIcon icon="UserOutlined" style={styles.icon} />
					}
				}),
				...defItem({
					prop: "email",
					size: "large",
					/* render的时候重新获取 */
					placeholder: () => $t("Email").label,
					rules: [
						FormRules.required(
							() => $t("请输入Email!").label,
							[EVENT_TYPE.blur]
						),
						FormRules.email()
					],
					slots: {
						prefix: () => <MailOutlined style={styles.icon} />
					}
				}),
				...defItem({
					prop: "password",
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
					onValidateFial: thisConfigs => {
						console.log(thisConfigs.itemTips);
					},
					slots: {
						prefix: () => <xIcon icon="LockOutlined" style={styles.icon} />
					}
				}),
				...defItem({
					prop: "confirm",
					isPassword: true,
					size: "large",
					/* render的时候重新获取 */
					placeholder: () => $t("请再次输入密码!").label,
					rules: [
						FormRules.required(
							() => $t("请再次输入密码!").label,
							[EVENT_TYPE.blur]
						),
						FormRules.custom({
							msg: () => $t("两次输入的密码不一致!").label,
							validator: async confirm =>
								vm.configsForm.password.value !== confirm,
							trigger: [EVENT_TYPE.update]
						})
					],
					slots: {
						prefix: () => <LockOutlined style={styles.icon} />
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
						const validateResults = await validateForm(vm.configsForm);
						if (AllWasWell(validateResults)) {
							const res = await API.user.regActions(vm.data);
							UI.notification.success("注册成功");
							router.push({ path: "/group" });
						} else {
							throw new Error("未通过验证");
						}
					} catch (e) {
						debugger;
						console.error(e);
					}
				}
			}
		};
	},
	methods: {}
});
</script>

<style></style>
