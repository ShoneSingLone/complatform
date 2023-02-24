import { defineComponent } from "vue";
import { Cpt_url } from "@/router/router";
export const ProjectTestcaseAll = defineComponent({
	setup() {
		return {
			Cpt_url
		};
	},
	render() {
		return <h1>{this.Cpt_url.pathname}</h1>;
	}
});
