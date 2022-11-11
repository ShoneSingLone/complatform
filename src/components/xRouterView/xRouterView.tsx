import { defineComponent, inject, provide, h } from "vue";
import { routes, Cpt_url } from "../../router/router";
import { _ } from "@ventose/ui";
import { ViewNotFound } from "../ViewNotFound";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css";

NProgress.configure({
	showSpinner: false
});

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
	beforeUpdate() {
		NProgress.start();
		console.time("update");
	},
	updated() {
		NProgress.done();
		console.timeEnd("update");
	},
	methods: {
		getComponent(pathArray) {
			if (pathArray.length > this.ViewLength) {
				pathArray.pop();
				return this.getComponent(pathArray);
			}

			if (pathArray.length == this.ViewLength) {
				const route = _.find(routes, { path: pathArray.join("/") });
				if (route) {
					return route.component;
				}
			}

			return ViewNotFound;
		}
	},
	computed: {
		component() {
			return this.getComponent(this.Cpt_url.pathname.split("/"));
		},
		vDomView() {
			return h(this.component, { pathname: this.Cpt_url.pathname });
		}
	},
	render() {
		return this.vDomView;
	}
});
