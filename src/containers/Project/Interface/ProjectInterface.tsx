import { defineComponent, ref } from "vue";
import { Methods_App, State_App } from "../../../state/State_App";
import { API } from "../../../api";
import { Cpt_url } from "../../../router/router";
import { useProjectBasicProperties } from "../../../compositions";
import "./interface.scss";
import { InterfaceSider } from "./InterfaceSider";
import { _ } from "@ventose/ui";

export const ProjectInterface = defineComponent({
	components: {
		InterfaceSider
	},
	setup() {
		return {
			State_App,
			Cpt_url,
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
	mounted() {
		const { category_id, interface_id } = this.Cpt_url.query;
		if (!category_id && !interface_id) {
			this.Cpt_url.go("/project/interface/all", this.Cpt_url.query)
		} else if (interface_id && !category_id) {
			this.Cpt_url.go("/project/interface/all", _.omit(this.Cpt_url.query, ['interface_id']))
		} else if (!interface_id && category_id) {
			this.Cpt_url.go("/project/interface/category", _.omit(this.Cpt_url.query))
		} else if (interface_id && category_id) {
			this.Cpt_url.go("/project/interface/detail", _.omit(this.Cpt_url.query))
		}
	},
	computed: {},
	render() {
		return (
			<aLayout id="ViewProjectInterface">
				<aLayoutSider
					width={300}
					class="flex vertical height100"
				>
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
