import "./Breadcrumb.scss";

import { defineComponent } from "vue";
import { xU } from "@/ventose/ui";
import { stateApp } from "@/state/app";
import { cptRouter, routes } from "@/router/router";

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
					cptRouter.value.pathname,
					this.stateApp.currGroup,
					this.stateApp.currProject
				],
				(item, index) => {
					if (!item) {
						return null;
					}

					const target = (() => {
						const _target = {
							key: index,
							label: ""
						};

						const { group_name, name } = item || {};
						_target.label = group_name || name;

						if (_target.label) {
							return _target;
						}

						if (0 === index) {
							const route = xU.find(
								routes,
								route => route.path === cptRouter.value.pathname
							);

							if (route?.meta?.title) {
								_target.label = route?.meta?.title;
							}
							return _target;
						}

						return {};
					})();

					if (target.label) {
						return (
							<ElBreadcrumbItem key={target.key}>
								{target.label}
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
