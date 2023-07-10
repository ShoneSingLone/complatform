import "./Login.scss";
import LoginForm from "./LoginForm.vue";
import RegForm from "./RegForm";
import { defineComponent } from "vue";
import { State_App } from "@/state/State_App";
import { types } from "sass";
import Boolean = types.Boolean;
import { useElementSize } from "@vueuse/core";

export default defineComponent({
	components: {
		LoginForm
	},
	props: {
		form: {
			type: Object
		},
		canRegister: {
			type: Boolean
		}
	},
	setup() {
		const { height } = useElementSize();
		return { State_App: State_App };
	},
	render() {
		/** show only login when register is disabled */
		return (
			<div class="login-register-form">
				<h2 class="login-title">YAPI</h2>
				<ElTabs v-model={State_App.user.loginWrapActiveKey}>
					<ElTabPane label="登录" name="1">
						<LoginForm />
					</ElTabPane>
					<ElTabPane label="注册" name="2">
						{State_App.user.canRegister ? (
							<RegForm />
						) : (
							<div style={{ minHeight: 200 }}>
								管理员已禁止注册，请联系管理员
							</div>
						)}
					</ElTabPane>
				</ElTabs>
			</div>
		);
	}
});
