import { defineComponent } from "vue";
import { stateApp } from "@/state/app";
import { ProjectTestcaseLeftSider } from "./ProjectTestcaseLeftSider";
import {
	State_ProjectTestcase,
	Methods_ProjectTestcase
} from "@/containers/Project/Testcase/State_ProjectTestcase";
import { API } from "@/api/index";
import { Cpt_url } from "@/router/router";

export const ProjectTestcase = defineComponent({
	components: {
		ProjectInterfaceLeftSider: ProjectTestcaseLeftSider
	},
	setup() {
		return {
			stateApp,
			State_ProjectTestcase,
			Cpt_url
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
				v-xloading={this.State_ProjectTestcase.isLoading}>
				<ProjectTestcaseLeftSider />
				<main class="flex flex1 padding10" style="width:1px;height:100%">
					<RouterView class="flex flex1 width100 height100 vertical padding10" />
				</main>
			</section>
		);
	}
});
