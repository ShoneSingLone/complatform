import { defineComponent } from "vue";
import { Cpt_url } from "../router/router";

export const ViewNotFound = defineComponent({
	props: ["pathname"],
	setup() {
		return {
			Cpt_url
		};
	},
	methods: {
		goHome() {
			this.Cpt_url.go("/group");
		}
	},
	mounted() {
		if (this.Cpt_url.pathname === "/") {
			this.goHome();
		}
	},
	data(vm) {
		return {};
	},
	render() {
		return (
			<aResult status="404" title="404" subTitle={this.pathname} class="flex1">
				{{
					extra: () => (
						<ElButton type="primary" onClick={this.goHome}>
							{this.$t("BackHome").label}
						</ElButton>
					)
				}}
			</aResult>
		);
	}
});
