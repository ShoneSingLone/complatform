import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css";
import { defineComponent, h, inject, markRaw, provide } from "vue";
import { cptRouter, routes } from "@/router/router";
import { stateUI, xU } from "@/ventose/ui";
import { ViewNotFound } from "@/components/ViewNotFound";

NProgress.configure({
	showSpinner: false
});

export const makeAhref = (url: string) => {
	console.log(stateUI.assetsPath);
	return `#${url}`;
};

export const RouterView = defineComponent({
	name: "RouterView",
	props: ["guards"],
	setup() {
		let ViewLength: any = inject("ViewLength");
		if (typeof ViewLength != "number") {
			ViewLength = 2;
		}
		provide("ViewLength", ViewLength + 1);
		return {
			cptRouter,
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
	},
	updated() {
		NProgress.done();
	},
	watch: {
		"cptRouter.pathname": {
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
			const getView = () => {
				if (!this.currentComponent) {
					return <div v-xloading={true} class="flex middle" />;
				} else {
					return h(this.currentComponent, {
						pathname: this.cptRouter.pathname
					});
				}
			};

			if (xU.isFunction(this.guards)) {
				return this.guards(getView());
			} else {
				return getView();
			}
		}
	},
	render() {
		return this.vDomView;
	}
});
