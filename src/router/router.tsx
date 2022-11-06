// progress bar
import { setDocumentTitle, State_UI, _ } from "@ventose/ui";
import { createRouter, createWebHashHistory } from "vue-router";
import { Methods_App, State_App } from "@/state/State_App";
import NotFound from "../components/NotFound.vue";

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

export const ProjectChildren = [
	{
		name: "ProjectInterface",
		label: "接口",
		path: "/project/interface",
		component: NotFound
	},
	{
		name: "ProjectActivity",
		label: "动态",
		path: "/project/activity",
		component: NotFound
	},
	{
		name: "ProjectData",
		label: "数据管理",
		path: "/project/data",
		component: NotFound
	},
	{
		name: "ProjectMembers",
		label: "成员管理",
		path: "/project/members",
		component: NotFound
	},
	{
		name: "ProjectSetting",
		label: "设置",
		path: "/project/setting",
		component: NotFound
	}
];

export const routes = [
	{
		path: "/dev",
		name: "home",
		component: () => import("@/containers/Dev.vue")
	},
	{
		path: `/login`,
		name: "login",
		component: () => import("@/containers/Login/LoginContainer"),
		meta: {
			title: $t("用户登录").label
		}
	},
	{
		path: `/group`,
		name: "GroupView",
		component: () => import("@/containers/Group/Group.vue")
	},
	{
		path: `/project`,
		name: "ProjectView",
		component: () => import("@/containers/Project/Project.vue"),
		children: ProjectChildren
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
