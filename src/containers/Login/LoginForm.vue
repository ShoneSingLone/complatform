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

<script lang="tsx">
import "./Login.scss";
import { defineComponent } from "vue";
import {
	xU,
	xI,
	defItem,
	EVENT_TYPE,
	itemsInvalid,
	lStorage,
	stateUI,
	pickValueFrom
} from "@/ventose/ui";
import { FormRules } from "@/utils/common.FormRules";
import { API } from "@/api";
import { cptRouter } from "@/router/router";
import { stylesLoginFormIcon } from "@/utils/variable";

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
			cptRouter
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
					placeholder: () => xI("Email"),
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
					placeholder: () => xI("密码"),
					onAfterEmitItemValue(val) {
						lStorage.password = val;
					},
					rules: [FormRules.required(xI("请输入密码"), [EVENT_TYPE.blur])],
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
				text: () => xI("登录"),
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
					xU.notification.success("登录成功! ");
					cptRouter.value.go("/group");
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
