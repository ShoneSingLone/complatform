import { defineComponent } from "vue";
import { State_App } from "../../../state/State_App";
import { Cpt_url } from "../../../router/router";
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
		this.handlerURL();
	},
	computed: {},
	methods: {
		handlerURL() {
			const { pathname, query } = this.Cpt_url;
			const { category_id, interface_id } = query;

			const fnStrategyMap = {
				"/project/interface/all": () => {
					this.Cpt_url.go(
						"/project/interface/all",
						_.pick(this.Cpt_url.query, ["group_id", "project_id"])
					);
				},
				"/project/interface/category": () => {
					if (!category_id) {
						fnStrategyMap["/project/interface/all"]();
					}
				},
				"/project/interface/detail": () => {
					if (!interface_id) {
						fnStrategyMap["/project/interface/all"];
					}
				}
			};

			const fn = fnStrategyMap[pathname];
			fn && fn();
		}
	},
	render() {
		return (
			<aLayout id="ViewProjectInterface">
				<aLayoutSider width={300} class="flex vertical height100">
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
