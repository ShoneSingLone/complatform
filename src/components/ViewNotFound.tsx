import { defineComponent } from "vue";
import { Cpt_url } from "@/router/router";

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
			<ElResult icon="error" title="404" subTitle={this.pathname} class="flex1">
				{{
					extra: () => (
						<xButton type="primary" onClick={this.goHome}>
							{xI("BackHome")}
						</xButton>
					)
				}}
			</ElResult>
		);
	}
});
