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
		<xGap t="20" />
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
	itemsInvalid,
	AllWasWell,
	lStorage,
	State_UI,
	pickValueFrom
} from "@ventose/ui";
import { FormRules } from "@/utils/common.FormRules";
import { API } from "@/api";
import { Cpt_url } from "../../router/router";
import { Methods_App } from "../../state/State_App";
import { stylesLoginFormIcon } from "@/utils/variable";

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
				email: defItem({
					value: lStorage.email || "",
					size: "large",
					/* render的时候重新获取 */
					placeholder: () => $t("Email").label,
					onAfterEmitItemValue(val) {
						lStorage.email = val;
					},
					rules: [FormRules.required("", [EVENT_TYPE.blur]), FormRules.email()],
					slots: {
						prefix: () => (
							<xIcon icon="UserOutlined" style={stylesLoginFormIcon.icon} />
						)
					}
				}),
				password: defItem({
					value: lStorage.password || "",
					isPassword: true,
					size: "large",
					/* render的时候重新获取 */
					placeholder: () => $t("密码").label,
					onAfterEmitItemValue(val) {
						lStorage.password = val;
					},
					rules: [
						FormRules.required($t("请输入密码").label, [EVENT_TYPE.blur])
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
				text: () => $t("登录").label,
				onClick: vm.login
			}
		};
	},
	methods: {
		async login() {
			const vm = this;
			try {
				if (!(await itemsInvalid(vm.$el))) {
					const formData = pickValueFrom(vm.configsForm);
					const res = await API.user.loginActions(formData);
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
