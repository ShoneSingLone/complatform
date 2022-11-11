import { defineComponent } from "vue";
import { Methods_App, State_App } from "../../../state/State_App";
import { API } from "../../../api";
import { Cpt_url } from "../../../router/router";
import { useProjectBasicProperties } from "../../../compositions";

export const ProjectInterface = defineComponent({
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
			styleContent: {
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
	methods: {},
	computed: {},
	render() {
		return (
			<aLayout id="ViewProjectInterface">
				<aLayoutSider width={300} class="flex vertical height100">
					asdfasf
				</aLayoutSider>
				<aLayout>
					<aLayoutContent
						data-app-position="Group-layout-content"
						style={this.StyleContent}>
						<h1>content</h1>
					</aLayoutContent>
				</aLayout>
			</aLayout>
		);
	}
});
