import "./Login.scss";
import LoginForm from "./LoginForm.vue";
import RegForm from "./RegForm.vue";
import { defineComponent } from "vue";
import { State_App } from "ysrc/state/State_App";

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
		return { State_App: State_App };
	},
	render() {
		/** show only login when register is disabled */
		return (
			<aTabs
				defaultActiveKey={State_App.user.loginWrapActiveKey}
				class="login-form"
				tabBarStyle={{ border: "none" }}>
				<aTabPane tab="登录" key="1">
					<LoginForm />
				</aTabPane>
				<aTabPane tab={"注册"} key="2">
					{State_App.user.canRegister ? (
						<RegForm />
					) : (
						<div style={{ minHeight: 200 }}>管理员已禁止注册，请联系管理员</div>
					)}
				</aTabPane>
			</aTabs>
		);
	}
});
