import { defineComponent } from "vue";
import { cptRouter } from "@/router/router";
export const ProjectTestcaseAll = defineComponent({
	setup() {
		return {
			cptRouter
		};
	},
	render() {
		return <h1>{this.cptRouter.pathname}</h1>;
	}
});
