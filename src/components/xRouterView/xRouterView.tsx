import { defineComponent, inject, provide } from "vue";
import { routes, Cpt_url } from "../../router/router";
import { _ } from "@ventose/ui";
import { NotFound } from "../../components/NotFound";

export const xRouterView = defineComponent({
	name: "xRouterView",
	setup() {
		let ViewLength: any = inject("ViewLength");
		if (typeof ViewLength != "number") {
			ViewLength = 2;
		}
		provide("ViewLength", ViewLength + 1);

		return {
			ViewLength
		};
	},
	data() {
		return {
			Cpt_url
		};
	},
	computed: {
		component() {
			const pathname = this.Cpt_url.pathname;
			const getComponent = pathArray => {
				if (pathArray.length > this.ViewLength) {
					pathArray.pop();
					return getComponent(pathArray);
				}
				if (pathArray.length == this.ViewLength) {
					const route = _.find(routes, { path: pathArray.join("/") });
					if (route) {
						return route.component;
					}
					console.error(pathname);
				}
			};

			const component = getComponent(pathname.split("/"));
			return component ? component : NotFound;
		}
	},
	render() {
		const ComponentTag = this.component;
		return <ComponentTag pathname={this.Cpt_url.pathname} />;
	}
});
