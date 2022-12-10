import { defineComponent } from "vue";
import { State_App } from "../../../state/State_App";
import { Cpt_url } from "../../../router/router";
import "./interface.scss";
import { ProjectInterfaceLeftSider } from "./ProjectInterfaceLeftSider";
import { xU } from "@ventose/ui";
import { State_Project, Methods_Interface } from "./State_Project";

export const ProjectInterface = defineComponent({
	components: {
		ProjectInterfaceLeftSider
	},
	setup() {
		return {
			State_App,
			State_Interface: State_Project,
			Cpt_url
		};
	},
	data() {
		return {
			state: {},
		};
	},
	created() {
		Methods_Interface.resetURL();
	},
	methods: {},
	render() {
		return (
			<section
				id="ViewProjectInterface"
				v-loading={this.State_Interface.isLoading}>
				<ProjectInterfaceLeftSider />
				<main class="flex flex1 padding10" style="width:1px;">
					<RouterView class="flex flex1 width100 height100 vertical padding10" />
				</main>
			</section>
		);
	}
});
