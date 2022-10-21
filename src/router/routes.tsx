import NotFound from "@ventose/views/system/NotFound.vue";
import { _ } from "@ventose/ui";
const { genId } = _;

export const routeNames = {
	shell: "shell",
	404: "404"
};
export const toPath = name => `/${name}`;

export const NewRoute = (name, component, options = {}) =>
	_.merge({ name, path: `/${name}`, component }, options);

export const routes = [NewRoute(routeNames[404], NotFound)];

function Menu(id, label, icon = "mail", children = []) {
	return {
		id,
		label,
		icon,
		children: children
	};
}

export const menuTree = [];

const MODULES_DEFAULT_ROUTES = import.meta.glob("../views/modules/**/*");
_.doNothing("MODULES_DEFAULT_ROUTES", MODULES_DEFAULT_ROUTES);

/**
 * 按约定规则由源码文件夹生成的routes
 * TODO:subView & 嵌套
 */

export const ALL_DEFAULT_ROUTES = _.reduce(
	MODULES_DEFAULT_ROUTES,
	(targetRoutes, component, path) => {
		const originUrl = path.replace("../views/modules/", "");
		const pathArray = originUrl.split("/");
		const filePath = _.last(pathArray);
		const matchRes = filePath.match(/^View(.*)\.(vue|jsx|tsx)$/);
		if (matchRes) {
			const fileName = matchRes[1];
			if (!fileName) alert(originUrl);
			pathArray[pathArray.length - 1] = fileName;
			const kebabCase = pathArray.map(_.kebabCase);
			const route = {
				name: `${kebabCase.join(".").replaceAll("-", "_")}`,
				path: `/${kebabCase.join("/").replaceAll("-", "_")}`,
				component: async () => {
					const module = await component();
					return module.default;
				}
			};
			targetRoutes.push(route);
		}
		return targetRoutes;
	},
	[]
);
export const MENUS_ALL_DEFAULT_ROUTES = ALL_DEFAULT_ROUTES.map(i => {
	const menuInfo = {
		id: i.name,
		name: i.name,
		label: i.name,
		icon: null
	};
	_.doNothing("menuInfo", menuInfo);
	return menuInfo;
});
