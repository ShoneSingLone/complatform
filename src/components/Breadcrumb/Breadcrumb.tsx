import "./Breadcrumb.scss";

import { defineComponent } from "vue";
import { xI, xU } from "@/ventose/ui";
import { stateApp } from "@/state/app";
import { aHashLink, cptRouter, routes } from "@/router/router";

export const BreadcrumbNavigation = defineComponent({
	setup() {
		return {
			cptRouter,
			stateApp
		};
	},
	computed: {
		breadcrumbItems() {
			return xU.map(
				[
					{
						label: stateApp.currGroup.group_name,
						id: cptRouter.value.query.group_id
					},
					{
						label: stateApp.currProject.name,
						id: cptRouter.value.query.project_id,
						url: aHashLink("/project", {
							group_id: cptRouter.value.query.group_id,
							project_id: cptRouter.value.query.project_id
						})
					}
				],
				(item, index) => {
					if (item.id) {
						return (
							<ElBreadcrumbItem key={item.label}>
								{item.url ? <a href={item.url}>{item.label}</a> : item.url}
							</ElBreadcrumbItem>
						);
					}

					return null;
				}
			);
		}
	},
	render() {
		return (
			<div class="breadcrumb-container">
				<ElBreadcrumb>{this.breadcrumbItems}</ElBreadcrumb>
			</div>
		);
	}
});
