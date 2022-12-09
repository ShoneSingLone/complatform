import { defineComponent } from "vue";
import { State_App } from "../../../state/State_App";
import { Cpt_url } from "../../../router/router";
import "./interface.scss";
import { ProjectInterfaceLeftSider } from "./ProjectInterfaceLeftSider";
import { xU } from "@ventose/ui";
import { State_Interface, Methods_Interface } from "./State_Interface";

export const ProjectInterface = defineComponent({
	components: {
		ProjectInterfaceLeftSider
	},
	setup() {
		return {
			State_App,
			State_Interface,
			Cpt_url
		};
	},
	data() {
		return {
			state: {},
			styleLayout: {
				marginLeft: "24px",
				marginTop: "24px"
			}
		};
	},
	created() {
		Methods_Interface.resetURL();
	},
	methods: {},
	render() {
		return (
			<aLayout
				id="ViewProjectInterface"
				v-loading={this.State_Interface.isLoading}>
				<aLayoutSider width={300} class="flex vertical height100">
					<ProjectInterfaceLeftSider />
				</aLayoutSider>
				<aLayout>
					<aLayoutContent
						data-app-position="Group-layout-content"
						style={this.styleLayout}>
						<xRouterView />
					</aLayoutContent>
				</aLayout>
			</aLayout>
		);
	}
});
