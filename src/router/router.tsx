import { computed, ComputedRef } from "vue";
import { setDocumentTitle, State_UI, _ } from "@ventose/ui";
import { ViewNotFound } from "../components/ViewNotFound";
import { ViewGroup } from "../containers/Group/Group";
import { ViewProject } from "../containers/Project/ViewProject";
import { ProjectInterface } from "../containers/Project/Interface/ProjectInterface";
import { Methods_App, State_App } from "../state/State_App";
import { LoginContainer } from "../containers/Login/LoginContainer";

const { $t } = State_UI;

export const routes = [
	{
		path: `/login`,
		component: LoginContainer,
		meta: {
			title: $t("用户登录").label
		}
	},
	{
		path: `/group`,
		component: ViewGroup,
		meta: {
			title: $t("分组").label
		}
	},
	{
		path: `/project`,
		component: ViewProject,
		meta: {
			title: $t("项目").label
		}
	},
	{
		label: $t("接口").label,
		path: "/project/interface",
		component: ProjectInterface,
		meta: {
			title: $t("接口").label
		}
	},
	{
		label: $t("自动化测试").label,
		path: "/project/test_case",
		component: ProjectInterface,
		meta: {
			title: $t("接口").label
		}
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
		/* 404兜底 */
		path: "/:pathMatch(.*)*",
		component: ViewNotFound,
		meta: {
			title: $t("NotFound").label
		}
	}
];

export const ProjectChildren = routes.filter(route => {
	const res = route.path.match(/^\/project(.*)/);
	return res && res[1];
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
		console.log(urlHash, origin);
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
			onlyModifyQuery(_.merge({}, _query));
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
		const route = _.find(routes, { path: url.pathname });
		if (route?.meta?.title) {
			setDocumentTitle(route.meta.title);
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
