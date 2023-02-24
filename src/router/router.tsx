import { ViewGroup } from "../containers/Group/ViewGroup";
import { computed, ComputedRef } from "vue";
import { setDocumentTitle, State_UI, xU } from "@ventose/ui";
import { ViewNotFound } from "../components/ViewNotFound";
import { Methods_App, State_App } from "../state/State_App";

const { $t } = State_UI;
/* const LazyComponent = (componentName, componentPath) => ({
	componentName: componentName,
	component: () => import(componentPath)
}); */

export const routes = [
	{
		path: `/login`,
		componentName: "LoginContainer",
		component: () => import("../containers/Login/LoginContainer"),
		meta: {
			title: $t("用户登录").label
		}
	},
	{
		path: `/group`,
		componentName: "ViewGroup",
		component: ViewGroup,
		meta: {
			title: $t("分组").label
		}
	},
	{
		path: `/project`,
		componentName: "ViewProject",
		component: () => import("../containers/Project/ViewProject"),
		meta: {
			title: $t("项目").label
		}
	},
	{
		label: $t("接口").label,
		path: "/project/interface",
		componentName: "ProjectInterface",
		component: () => import("../containers/Project/Interface/ProjectInterface"),
		meta: {
			title: $t("接口").label
		}
	},
	{
		label: $t("接口-全部").label,
		path: "/project/interface/all",
		componentName: "InterfaceAll",
		component: () => import("../containers/Project/Interface/InterfaceAll")
	},
	{
		label: $t("接口-分类").label,
		path: "/project/interface/category",
		componentName: "InterfaceCategory",
		component: () => import("../containers/Project/Interface/InterfaceCategory")
	},
	{
		label: $t("接口-详情").label,
		path: "/project/interface/detail",
		componentName: "InterfaceDetail",
		component: () => import("../containers/Project/Interface/InterfaceDetail")
	},
	{
		label: $t("测试集").label,
		path: "/project/testcase",
		componentName: "ProjectTestcase",
		component: () => import("../containers/Project/TestCase/ProjectTestcase"),
		meta: {
			title: $t("测试集").label
		}
	},
	{
		label: $t("测试集-全部").label,
		path: "/project/testcase/all",
		componentName: "ProjectTestcaseAll",
		component: () => import("../containers/Project/TestCase/ProjectTestcaseAll")
	},
	{
		label: $t("测试集-分类").label,
		path: "/project/testcase/category",
		componentName: "ProjectTestcaseAll",
		component: () => import("../containers/Project/TestCase/ProjectTestcaseAll")
	},
	{
		label: $t("测试集-详情").label,
		path: "/project/testcase/detail",
		componentName: "ProjectTestcaseAll",
		component: () => import("../containers/Project/TestCase/ProjectTestcaseAll")
	},
	{
		label: $t("动态").label,
		path: "/project/activity",
		component: ViewNotFound,
		meta: {
			title: $t("动态").label
		}
	},
	{
		label: $t("数据管理").label,
		path: "/project/data",
		component: ViewNotFound,
		meta: {
			title: $t("数据管理").label
		}
	},
	{
		label: $t("成员管理").label,
		path: "/project/members",
		component: ViewNotFound,
		meta: {
			title: $t("成员管理").label
		}
	},
	{
		label: $t("设置").label,
		path: "/project/setting",
		component: ViewNotFound,
		meta: {
			title: $t("设置").label
		}
	},
	{
		/* 404兜底 在NotFound里面处理其他的访问逻辑，比如"/"的重定向*/
		path: "/:pathMatch(.*)*",
		component: ViewNotFound,
		meta: {
			title: $t("NotFound").label
		}
	}
];

export const ProjectChildren = routes.filter(route => {
	const res = route.path.split("/");
	if (res.length === 3 && res[1] === "project") {
		return true;
	} else {
		return false;
	}
});

type type_url = {
	go: (path: string, query?: object) => null;
	refresh: (query: object) => null;
};

export const Cpt_url: ComputedRef<type_url> = computed(() => {
	const urlHash = State_App.urlHash || "/";
	const { origin } = location;

	let _url = {};

	try {
		_url = new URL(urlHash.replace("#", ""), origin);
	} catch (e) {
		xU(urlHash, origin);
		console.error(e);
	}

	let query = {};

	for (var pair of _url.searchParams.entries()) {
		query[pair[0]] = pair[1];
	}

	query = new Proxy(query, {
		get(obj, prop) {
			return obj[prop];
		},
		set(_query, prop, val) {
			_query[prop] = val;
			onlyModifyQuery(xU.merge({}, _query));
			return true;
		}
	});

	const _Cpt_url = new Proxy(_url, {
		get(obj, prop) {
			if (prop === "query") {
				return query;
			}
			if (prop === "go") {
				return modifyPathname;
			}
			if (prop === "refresh") {
				return onlyModifyQuery;
			}
			return _url[prop];
		},
		set(obj, prop, val) {
			if (prop === "path") return true;
		}
	});

	return _Cpt_url;
});

/***
 *  pathname search
 * @param urlLike
 * @param query
 */
function transToUrl(urlLike: string, query: any) {
	const _url = new URL(String(urlLike).replace("#", ""), location.origin);
	_url.search = new URLSearchParams(query).toString();
	const { pathname, search } = _url;
	return {
		href: `${pathname}${search}`,
		url: _url
	};
}

async function setLocationHash(href: string, url: URL) {
	try {
		/*如果已登录*/
		if (!(await Methods_App.checkLoginState())) {
			return;
		}
		/*但是，非登陆页面则跳转到主页*/
		if (["/login"].includes(url.pathname)) {
			href = "/";
		}
		const route = xU.find(routes, { path: url.pathname });
		const label = route.label || route?.meta?.title;
		if (label) {
			setDocumentTitle(label);
		} else {
			setDocumentTitle("YApi-高效、易用、功能强大的可视化接口管理平台");
		}
	} catch (error) {
		console.error(error);
	} finally {
		window.location.hash = href;
	}
}

function modifyPathname(path, _query = {}) {
	const { href, url } = transToUrl(path, _query);
	setLocationHash(href, url);
}

/***
 * query 会直接替换
 * @param _query
 */
function onlyModifyQuery(_query) {
	const { href, url } = transToUrl(location.hash, _query);
	setLocationHash(href, url);
}
