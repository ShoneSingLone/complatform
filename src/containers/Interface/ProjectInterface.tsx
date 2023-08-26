import { defineComponent } from "vue";
import { stateApp } from "@/state/app";
import { Cpt_url } from "@/router/router";
import { ProjectInterfaceLeftSider } from "./ProjectInterfaceLeftSider";
import {
	stateInterface,
	Methods_ProjectInterface
} from "@/state/interface";

export const ProjectInterface = defineComponent({
	components: {
		ProjectInterfaceLeftSider
	},
	setup() {
		return {
			stateApp,
			State_Project: stateInterface,
			Cpt_url
		};
	},
	data() {
		return {
			state: {}
		};
	},
	created() {
		Methods_ProjectInterface.resetURL();
	},
	methods: {},
	render() {
		return (
			<section
				id="ViewProjectInterface"
				v-xloading={this.State_Project.isLoading}>
				<ProjectInterfaceLeftSider />
				<main class="flex flex1 padding10" style="width:1px;">
					<RouterView class="flex flex1 width100 height100 vertical padding10" />
				</main>
			</section>
		);
	}
});
