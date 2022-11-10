// progress bar
import { setDocumentTitle, State_UI, _ } from "@ventose/ui";
import { createRouter, createWebHashHistory } from "vue-router";
import { Methods_App, State_App } from "@/state/State_App";
import NotFound from "../components/NotFound.vue";
import LoginContainer from "@/containers/Login/LoginContainer";
import Group from "@/containers/Group/Group.vue";
import Project from "../containers/Project/Project.vue";
import { ProjectInterface } from "../containers/Project/Interface/ProjectInterface";
import { computed } from "vue";

const { $t } = State_UI;

export const NewRoute = (name, component, options = {}) =>
	_.merge(
		{
			name,
			path: `/${name}`,
			component
		},
		options
	);

export const routeNames = {
	login: "login",
	404: "404"
};

const toPath = name => `/${name}`;

export const routes = [
	{
		path: `/login`,
		name: "login",
		component: LoginContainer,
		meta: {
			title: $t("用户登录").label
		}
	},
	{
		path: `/group`,
		name: "GroupView",
		component: Group
	},
	{
		path: `/project`,
		name: "ProjectView",
		component: Project
	},
	{
		label: "接口",
		path: "/project/interface",
		component: ProjectInterface
	},
	{
		label: "动态",
		path: "/project/activity",
		component: NotFound
	},
	{
		label: "数据管理",
		path: "/project/data",
		component: NotFound
	},
	{
		label: "成员管理",
		path: "/project/members",
		component: NotFound
	},
	{
		label: "设置",
		path: "/project/setting",
		component: NotFound
	},
	/* 404兜底 */
	{
		path: "/:pathMatch(.*)*",
		name: "404",
		component: NotFound
	},
	{
		path: "/",
		name: "home",
		redirect: to => {
			return { path: "/group" };
		}
	}
];

export const ProjectChildren = routes.filter(route => {
	const res = route.path.match(/^\/project(.*)/);
	return res && res[1];
});

export const router = createRouter({
	history: createWebHashHistory(),
	routes
});

// no redirect allowList

router.beforeEach(async (to, from) => {
	try {
		if (!(await Methods_App.checkLoginState())) {
			if (["/login"].includes(to.path)) {
				return true;
			}
			router.push({ path: "/login" });
			return false;
		}

		if (State_App.user.isLogin) {
			if (["/login"].includes(to.path)) {
				setTimeout(() => {
					router.push({ path: "/" });
				}, 300);
				return false;
			}
		}

		return true;
	} catch (error) {
		console.error(error);
		return false;
	} finally {
		if (to?.meta?.title) {
			setDocumentTitle(to.meta.title);
		} else {
			setDocumentTitle("YApi-高效、易用、功能强大的可视化接口管理平台");
		}
	}
});

router.afterEach(() => {});

type type_url = {
	go: (path: string, query?: object) => null;
	refresh: (query: object) => null;
};

export const Cpt_url: type_url = computed(() => {
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
		if (await Methods_App.checkLoginState()) {
			/*但是，非登陆页面则跳转到主页*/
			if (["/login"].includes(url.pathname)) {
				href = "/";
			}
		} else {
			href = "/login";
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
