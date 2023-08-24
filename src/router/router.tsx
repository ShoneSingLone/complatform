import { computed, ComputedRef } from "vue";
import { ViewGroup } from "../containers/Group/ViewGroup";
import { setDocumentTitle, xI, xU } from "@/ventose/ui";
import { ViewNotFound } from "../components/ViewNotFound";
import { Methods_App, stateApp } from "@/state/app";
import { PRIVATE } from "@/utils/variable";

/* const LazyComponent = (componentName, componentPath) => ({
	componentName: componentName,
	component: () => import(componentPath)
}); */

const wiki = (tag, title) => ({
	path: `/wiki_${tag}`,
	componentName: "ViewWiki",
	component: () => import("../containers/Wiki/ViewWiki.js"),
	meta: {
		title
	}
});

export const routes = [
	{
		path: `/login`,
		componentName: "LoginContainer",
		component: () => import("../containers/Login/LoginContainer.js"),
		meta: {
			title: xI("用户登录")
		}
	},
	{
		path: `/user_profile`,
		componentName: "ViewUserProfile",
		component: () => import("../containers/User/ViewUserProfile.js"),
		meta: {
			title: xI("用户")
		}
	},
	{
		path: `/group`,
		componentName: "ViewGroup",
		component: ViewGroup,
		meta: {
			title: xI("分组")
		}
	},
	wiki("all", "文档-所有人可见"),
	wiki("group", "文档-分组"),
	wiki("project", "项目文档"),
	wiki(PRIVATE, "个人文档"),
	{
		path: `/xI`,
		componentName: "ViewI18n",
		component: () => import("../containers/I18n/ViewI18n.js"),
		meta: {
			title: xI("国际化")
		}
	},
	{
		path: `/project`,
		componentName: "ViewProject",
		component: () => import("../containers/Project/ViewProject.js"),
		meta: {
			title: xI("项目")
		}
	},
	{
		label: xI("接口"),
		path: "/project/interface",
		componentName: "ProjectInterface",
		component: () =>
			import("../containers/Project/Interface/ProjectInterface.js"),
		meta: {
			title: xI("接口")
		}
	},
	{
		label: xI("接口-全部"),
		path: "/project/interface/all",
		componentName: "InterfaceAll",
		component: () => import("../containers/Project/Interface/InterfaceAll.js")
	},
	{
		label: xI("接口-分类"),
		path: "/project/interface/category",
		componentName: "InterfaceCategory",
		component: () =>
			import("../containers/Project/Interface/InterfaceCategory.js")
	},
	{
		label: xI("接口-详情"),
		path: "/project/interface/detail",
		componentName: "InterfaceDetail",
		component: () =>
			import("../containers/Project/Interface/InterfaceDetail.js")
	},
	{
		label: xI("测试集"),
		path: "/project/testcase",
		componentName: "ProjectTestcase",
		component: () =>
			import("../containers/Project/TestCase/ProjectTestcase.js"),
		meta: {
			title: xI("测试集")
		}
	},
	{
		label: xI("测试集-全部"),
		path: "/project/testcase/all",
		componentName: "ProjectTestcaseAll",
		component: () =>
			import("../containers/Project/TestCase/ProjectTestcaseAll.js")
	},
	{
		label: xI("测试集-分类"),
		path: "/project/testcase/category",
		componentName: "ProjectTestcaseAll",
		component: () =>
			import("../containers/Project/TestCase/ProjectTestcaseAll.js")
	},
	{
		label: xI("测试集-详情"),
		path: "/project/testcase/detail",
		componentName: "ProjectTestcaseAll",
		component: () =>
			import("../containers/Project/TestCase/ProjectTestcaseAll.js")
	},
	{
		label: xI("动态"),
		path: "/project/activity",
		component: ViewNotFound,
		meta: {
			title: xI("动态")
		}
	},
	{
		label: xI("数据管理"),
		path: "/project/data",
		component: ViewNotFound,
		meta: {
			title: xI("数据管理")
		}
	},
	{
		label: xI("成员管理"),
		path: "/project/members",
		component: ViewNotFound,
		meta: {
			title: xI("成员管理")
		}
	},
	{
		label: xI("设置"),
		path: "/project/setting",
		component: () => import("../containers/Project/Setting/ProjectSetting.js"),
		meta: {
			title: xI("设置")
		}
	},
	{
		/* 404兜底 在NotFound里面处理其他的访问逻辑，比如"/"的重定向*/
		path: "/:pathMatch(.*)*",
		component: ViewNotFound,
		meta: {
			title: xI("NotFound")
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
	query: () => object;
};

export const Cpt_url: ComputedRef<type_url> = computed(() => {
	const urlHash = stateApp.urlHash || "/";
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
export function transToUrl(urlLike: string, query: any) {
	const _url = new URL(String(urlLike).replace("#", ""), location.origin);
	_url.search = new URLSearchParams(query).toString();
	const { pathname, search } = _url;
	return {
		href: `${pathname}${search}`,
		url: _url
	};
}

export function aHashLink(urlLike: string, query: any = {}) {
	const { url } = transToUrl(urlLike, query);
	const targetUrl = new URL(location.href, location.origin);
	targetUrl.hash = url.href.replace(url.origin, "");
	return targetUrl.href;
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

export const cpt_isPersonalWikiView = computed(() => {
	return !!Cpt_url.value.query.user_id;
});
