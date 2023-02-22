import { defineComponent } from "vue";
import { State_App } from "@/state/State_App";
import { Cpt_url } from "../../../router/router";
import "./interface.scss";
import { ProjectTestCaseLeftSider } from "./ProjectTestCaseLeftSider";
import { xU } from "@ventose/ui";
import {
	State_Project,
	Methods_Project
} from "@/containers/Project/State_Project";

export const ProjectTestCase = defineComponent({
	components: {
		ProjectInterfaceLeftSider: ProjectTestCaseLeftSider
	},
	setup() {
		return {
			State_App,
			State_Project: State_Project,
			Cpt_url
		};
	},
	data() {
		return {
			state: {}
		};
	},
	created() {
		Methods_Project.resetURL();
	},
	methods: {},
	render() {
		return (
			<section
				id="ViewProjectInterface"
				v-loading={this.State_Project.isLoading}>
				<ProjectTestCaseLeftSider />
				<main class="flex flex1 padding10" style="width:1px;">
					<RouterView class="flex flex1 width100 height100 vertical padding10" />
				</main>
			</section>
		);
	}
});
