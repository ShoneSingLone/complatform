import { defineComponent, ref } from "vue";
import { Methods_App, State_App } from "../../../state/State_App";
import { API } from "../../../api";
import { Cpt_url } from "../../../router/router";
import { useProjectBasicProperties } from "../../../compositions";
import "./interface.scss";
import { InterfaceSider } from "./InterfaceSider";

export const ProjectInterface = defineComponent({
	components: {
		InterfaceSider
	},
	setup() {
		const { Cpt_currGroupId, Cpt_currProjectId } = useProjectBasicProperties();
		return {
			State_App,
			Cpt_url,
			Cpt_currGroupId,
			Cpt_currProjectId
		};
	},
	data() {
		return {
			state: {},
			s: {
				height: "100%",
				margin: "0 24px 0 16px",
				overflow: "initial",
				backgroundColor: "#fff"
			},
			styleLayout: {
				marginLeft: "24px",
				marginTop: "24px"
			}
		};
	},
	computed: {},
	render() {
		return (
			<aLayout id="ViewProjectInterface">
				<aLayoutSider
					width={300}
					class="flex vertical height100"
					ref="__$$sider">
					<InterfaceSider />
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
