import { defineComponent } from "vue";
import { Cpt_url } from "../router/router";

export const NotFound = defineComponent({
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
	render() {
		return (
			<aResult
				status="404"
				title="404"
				subTitle={this.pathname}
				class="flex1"
				v-slot={{
					extra: () => (
						<aButton type="primary" onClick={this.goHome}>
							{this.$t("BackHome").label}
						</aButton>
					)
				}}></aResult>
		);
	}
});
