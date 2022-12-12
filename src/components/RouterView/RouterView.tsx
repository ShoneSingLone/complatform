import { defineComponent, inject, provide, h, markRaw } from "vue";
import { routes, Cpt_url } from "../../router/router";
import { State_UI, xU } from "@ventose/ui";
import { ViewNotFound } from "../ViewNotFound";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css";

NProgress.configure({
	showSpinner: false
});

export const makeAhref = (url: string) => {
	console.log(State_UI.assetsPath);

	return `#${url}`;
};

export const RouterView = defineComponent({
	name: "RouterView",
	setup() {
		let ViewLength: any = inject("ViewLength");
		if (typeof ViewLength != "number") {
			ViewLength = 2;
		}
		provide("ViewLength", ViewLength + 1);
		return {
			Cpt_url,
			ViewLength
		};
	},
	data() {
		return {
			currentComponent: ""
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
	watch: {
		"Cpt_url.pathname": {
			immediate: true,
			async handler(pathname) {
				this.currentComponent = markRaw(
					await this.getComponent(pathname.split("/"))
				);
			}
		}
	},
	methods: {
		async getComponent(pathArray) {
			if (pathArray.length > this.ViewLength) {
				pathArray.pop();
				return await this.getComponent(pathArray);
			}
			if (pathArray.length == this.ViewLength) {
				const route = xU.find(routes, { path: pathArray.join("/") });
				if (route && route.component) {
					if (xU.isFunction(route.component)) {
						const modules = await route.component();
						/* 缓存 */
						if (route.componentName) {
							route.component = modules[route.componentName];
						} else {
							/* 可能导出多个变量，最好提供componentName */
							route.component = xU.getObjectFirstKeyValue(modules);
						}
					}
					return route.component;
				}
			}
			return ViewNotFound;
		}
	},
	computed: {
		vDomView() {
			if (!this.currentComponent) {
				return <aSpin spinning={true} />;
			} else {
				return h(this.currentComponent, { pathname: this.Cpt_url.pathname });
			}
		}
	},
	render() {
		return this.vDomView;
	}
});
