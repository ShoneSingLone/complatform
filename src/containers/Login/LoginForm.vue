<template>
	<form>
		<!-- 用户名 -->
		<xItem
			:configs="configsForm.email"
			autocomplete="email"
			@keypress.enter="login" />
		<xGap t="20" />
		<!-- 密码 -->
		<xItem
			:configs="configsForm.password"
			autocomplete="current-password"
			@keypress.enter="login" />
		<div class="item-wrapper">
			<xButton :configs="configsSubmit" />
		</div>
	</form>
</template>

<script lang="jsx">
import "./Login.scss";
import { defineComponent } from "vue";
import {
	xU,
	UI,
	defItem,
	EVENT_TYPE,
	validateForm,
	AllWasWell,
	lStorage,
	State_UI,
	FormRules,
	pickValueFrom
} from "@ventose/ui";
import { API } from "@/api";
import { Cpt_url } from "../../router/router";
import { Methods_App } from "../../state/State_App";

const { $t } = State_UI;

const formItemStyle = {
	marginBottom: ".16rem"
};

const changeHeight = {
	height: ".42rem"
};

export default defineComponent({
	props: {
		form: { type: Object },
		history: { type: Object },
		isLDAP: { type: Boolean }
	},
	setup() {
		return {
			Cpt_url,
			Methods_App
		};
	},
	data(vm) {
		return {
			loginType: "ldap",
			configsForm: {
				...defItem({
					value: lStorage.email || "",
					prop: "email",
					size: "large",
					/* render的时候重新获取 */
					placeholder: () => $t("Email").label,
					onChange() {
						lStorage.email = vm.data.email;
					},
					rules: [
						FormRules.required(
							() => $t("请输入Email!").label,
							[EVENT_TYPE.blur]
						),
						FormRules.email()
					]
				}),
				...defItem({
					value: lStorage.password || "",
					prop: "password",
					isPassword: true,
					size: "large",
					/* render的时候重新获取 */
					placeholder: () => $t("密码").label,
					onChange() {
						lStorage.password = vm.data.password;
					},

					rules: [
						FormRules.required(() => $t("请输入密码").label, [EVENT_TYPE.blur])
					]
				})
			},
			configsSubmit: {
				size: "large",
				type: "primary",
				class: "login-button flex center login-form-button",
				text: () => $t("登录").label,
				onClick: vm.login
			}
		};
	},
	methods: {
		async login() {
			const vm = this;
			try {
				const validateResults = await validateForm(vm.configsForm);
				if (AllWasWell(validateResults)) {
					const formData = pickValueFrom(vm.configsForm);
					await API.user.loginActions(formData);
					UI.notification.success("登录成功! ");
					Cpt_url.value.go("/group");
				} else {
					throw new Error("未通过验证");
				}
			} catch (e) {
				console.error(e);
			}
		}
	}
});
</script>

<style></style>
