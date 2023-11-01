import { computed, ComputedRef } from "vue";
import { ALL, GROUP, PRIVATE, PROJECT } from "@/utils/variable";
import { setDocumentTitle, xI, xU } from "@/ventose/ui";
import { ViewNotFound } from "@/components/ViewNotFound";
import { stateApp } from "@/state/app";

/* const LazyComponent = (componentName, componentPath) => ({
	componentName: componentName,
	component: () => import(componentPath)
}); */

const wiki = (tag, title) => ({
	path: `/wiki_${tag}`,
	componentName: "ViewWiki",
	component: () => import("@/containers/Wiki/ViewWiki.js"),
	meta: {
		title
	}
});

/* 配合 RouterView  通过find方法找到对应的component，不需要嵌套，用path表明父子关系 */

export const routes = [
	{
		path: `/login`,
		componentName: "LoginContainer",
		component: () => import("@/containers/Login/LoginContainer.js"),
		meta: {
			title: xI("用户登录")
		}
	},
	{
		path: `/user_profile`,
		componentName: "ViewUserProfile",
		component: () => import("@/containers/User/ViewUserProfile.js"),
		meta: {
			title: xI("用户")
		}
	},
	{
		path: `/group`,
		componentName: "ViewGroup",
		component: () => import("@/containers/Group/ViewGroup.js"),
		meta: {
			title: xI("分组")
		}
	},
	wiki(ALL, "文档-All"),
	wiki(GROUP, "文档-Group"),
	wiki(PROJECT, "文档-Project"),
	wiki(PRIVATE, "文档-Private"),
	{
		path: `/xI`,
		componentName: "ViewI18n",
		component: () => import("@/containers/I18n/ViewI18n.js"),
		meta: {
			title: xI("国际化")
		}
	},
	{
		path: `/project`,
		componentName: "ViewProject",
		component: () => import("@/containers/Project/ViewProject.js"),
		meta: {
			title: xI("项目")
		}
	},
	{
		label: xI("接口"),
		path: "/interface",
		componentName: "ViewInterface",
		component: () => import("@/containers/Interface/ViewInterface.js"),
		meta: {
			title: xI("接口")
		}
	},
	{
		label: xI("Music"),
		path: "/music",
		componentName: "default",
		component: () => import("@/music/views/ViewMusic/Layout/LayoutMusic.vue"),
		meta: {
			title: xI("Music")
		}
	},
	{
		name: "new",
		path: "/music/new",
		componentName: "default",
		component: () =>
			import("@/music/views/ViewMusic/PlayList/FindNew/FindNewLayout.vue")
	},
	{
		name: "playlist",
		path: "/music/playlist",
		componentName: "default",
		component: () =>
			import("@/music/views/ViewMusic/PlayList/Current/CurrentLayout.vue")
	},
	{
		name: "broswer",
		path: "/music/broswer",
		componentName: "default",
		component: () =>
			import("@/music/views/ViewMusic/PlayList/Broswer/FindNewLayout.vue")
	},
	/* {
		name: "singer",
		path: "/music/singer",
		componentName: "default",
		component: () => import("@/music/views/ViewMusic/PlayListSinger.vue")
	}, */
	/* {
		name: "private",
		path: "/music/private",
		componentName: "default",
		component: () =>
			import("@/music/views/ViewMusic/PlayList/Private/PrivateLayout.vue")
	}, */
	{
		name: "cached",
		path: "/music/cached",
		componentName: "default",
		component: () =>
			import("@/music/views/ViewMusic/PlayList/Cached/CachedLayout.vue")
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

type t_router = {
	go: (path: string, query?: object) => null;
	refresh: (query: object) => null;
	query: {
		user_id?: string;
		group_id?: string;
		group_tab?: string;
		project_id?: string;
		project_tab?: string;
		project_setting_tab?: string;
		interface_type?: string;
		interface_id?: string;
		/*详情里预览 、编辑、运行*/
		interface_detail_type?: string;
		category_id?: string;
		wiki_id?: string;
	};
} & URL;

export const cptRouter = computed(() => {
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

			/* 如果为undefined则删除 */
			if (val == undefined) {
				delete _query[prop];
			}
			onlyModifyQuery(xU.merge({}, _query));
			return true;
		}
	});

	const _cptRouter = new Proxy(_url, {
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

	return _cptRouter as t_router;
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
		const route: any = xU.find(routes, { path: url.pathname });
		if (route) {
			const label = route.label || route?.meta?.title;
			if (label) {
				setDocumentTitle(label);
			} else {
				setDocumentTitle("YApi-高效、易用、功能强大的可视化接口管理平台");
			}
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
	return !!cptRouter.value.query.user_id;
});
