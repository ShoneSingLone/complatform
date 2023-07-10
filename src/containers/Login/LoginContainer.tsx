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
				<div class="main-one login-container">
					<div class="container">
						<aRow type="flex" justify="center">
							<ElCol xs={20} sm={16} md={12} lg={8} class="container-login">
								<ElCard class="card-login">
									<h2 class="login-title">YAPI</h2>
									<div class="login-logo elevation-12">
										<xIcon icon="yapi_logo" style={this.styleLogo} />
									</div>
									<LoginWrap />
								</ElCard>
							</ElCol>
						</aRow>
					</div>
				</div>
			</div>
		);
	}
});
