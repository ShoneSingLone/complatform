import LoginWrap from "./LoginWrap";
import { defineComponent } from "vue";

export const LoginContainer = defineComponent({
	computed: {
		styleLogo() {
			return {
				width: "100px",
				height: "100px"
			};
		}
	},
	render() {
		return (
			<div class="g-body login-body flex1 " style="overflow:auto">
				<div class="m-bg">
					<div class="m-bg-mask m-bg-mask0" />
					<div class="m-bg-mask m-bg-mask1" />
					<div class="m-bg-mask m-bg-mask2" />
					<div class="m-bg-mask m-bg-mask3" />
				</div>
				<div class="login-register-container">
					<div class="flex vertical center middle">
						<div class="middle flex center">
							<div class="login-logo">
								<xIcon icon="yapi_logo" class="yapi_logo" />
							</div>
						</div>
						<LoginWrap />
					</div>
				</div>
			</div>
		);
	}
});
