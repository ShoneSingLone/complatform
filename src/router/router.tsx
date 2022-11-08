// progress bar
import { setDocumentTitle, State_UI, _ } from "@ventose/ui";
import { createRouter, createWebHashHistory } from "vue-router";
import { Methods_App, State_App } from "@/state/State_App";
import NotFound from "../components/NotFound.vue";
import LoginContainer from "@/containers/Login/LoginContainer";
import Group from "@/containers/Group/Group.vue";
import Project from "@/containers/Project/Project.vue";

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
		path: "interface",
		component: NotFound
	},
	{
		name: "ProjectActivity",
		label: "动态",
		path: "activity",
		component: NotFound
	},
	{
		name: "ProjectData",
		label: "数据管理",
		path: "data",
		component: NotFound
	},
	{
		name: "ProjectMembers",
		label: "成员管理",
		path: "members",
		component: NotFound
	},
	{
		name: "ProjectSetting",
		label: "设置",
		path: "setting",
		component: NotFound
	}
];

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
		path: `/group/:groupId`,
		name: "ViewGroupId",
		component: Group
	},
	{
		path: `/project/:projectId`,
		name: "ProjectView",
		component: Project,
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
