import "./Breadcrumb.scss";

import { defineComponent } from "vue";
import { xU } from "@ventose/ui";
import { State_App } from "../../state/State_App";
import { Cpt_url } from "../../router/router";

export const BreadcrumbNavigation = defineComponent({
	setup() {
		return {
			Cpt_url,
			State_App
		};
	},
	computed: {
		breadcrumbItems() {
			return xU.map(
				[this.State_App.currGroup, this.State_App.currProject],
				(item, index) => {
					if (!item) {
						return null;
					}
					if (this.Cpt_url.pathname === "/group") {
						return null;
					}
					return (
						<aBreadcrumbItem key={index}>
							{item.group_name || item.name}
						</aBreadcrumbItem>
					);
				}
			);
		}
	},
	render() {
		return (
			<div class="breadcrumb-container">
				<aBreadcrumb>{this.breadcrumbItems}</aBreadcrumb>
			</div>
		);
	}
});
