import { defineComponent } from "vue";
import { State_App } from "@/state/State_App";
import { Cpt_url } from "../../../router/router";
import { ProjectInterfaceLeftSider } from "./ProjectInterfaceLeftSider";
import {
	State_ProjectInterface,
	Methods_ProjectInterface
} from "@/containers/Project/Interface/State_ProjectInterface";

export const ProjectInterface = defineComponent({
	components: {
		ProjectInterfaceLeftSider
	},
	setup() {
		return {
			State_App,
			State_Project: State_ProjectInterface,
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
