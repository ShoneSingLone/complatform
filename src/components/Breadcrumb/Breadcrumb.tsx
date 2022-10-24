import "./Breadcrumb.scss";

import { defineComponent } from "vue";
import { State_App } from "@/state/State_App";
import { _ } from "@ventose/ui";

export const BreadcrumbNavigation = defineComponent({
	setup() {
		return {
			State_App
		};
	},
	computed: {
		breadcrumbItems() {
			return _.map(this.State_App.user.breadcrumb, (item, index) => {
				if (item.href) {
					return (
						<aBreadcrumbItem key={index}>
							<RouterLink to={item.href}>{item.name}</RouterLink>
						</aBreadcrumbItem>
					);
				} else {
					return <aBreadcrumbItem key={index}>{item.name}</aBreadcrumbItem>;
				}
			});
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
