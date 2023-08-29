import { defineComponent } from "vue";
import { stateApp } from "@/state/app";
import { ProjectTestcaseLeftSider } from "./ProjectTestcaseLeftSider";
import {
	stateProjectTestcase,
	Methods_ProjectTestcase
} from "@/state/projectTestcase";
import { API } from "@/api/index";
import { cptRouter } from "@/router/router";

export const ProjectTestcase = defineComponent({
	components: {
		InterfaceLeftSider: ProjectTestcaseLeftSider
	},
	setup() {
		return {
			stateApp,
			stateProjectTestcase,
			cptRouter
		};
	},
	data() {
		return {
			state: {}
		};
	},
	created() {
		Methods_ProjectTestcase.resetURL();
	},
	methods: {},
	render() {
		return (
			<section
				id="ViewProjectTestcase"
				v-xloading={this.stateProjectTestcase.isLoading}>
				<ProjectTestcaseLeftSider />
				<main class="flex flex1 padding10" style="width:1px;height:100%">
					<RouterView class="flex flex1 width100 height100 vertical padding10" />
				</main>
			</section>
		);
	}
});
