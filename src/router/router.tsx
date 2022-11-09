// progress bar
import {setDocumentTitle, State_UI, _} from "@ventose/ui";
import {createRouter, createWebHashHistory} from "vue-router";
import {Methods_App, State_App} from "@/state/State_App";
import NotFound from "../components/NotFound.vue";
import LoginContainer from "@/containers/Login/LoginContainer";
import Group from "@/containers/Group/Group.vue";
import Project from "../containers/Project/Project.vue";
import {ProjectInterface} from "../containers/Project/Interface/ProjectInterface";

const {$t} = State_UI;

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
            return {path: "/group"};
        }
    }
];

export const ProjectChildren = routes.filter(route => {
    const res = route.path.match(/^\/project(.*)/);
    return res && res[1]
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
            router.push({path: "/login"});
            return false;
        }

        if (State_App.user.isLogin) {
            if (["/login"].includes(to.path)) {
                setTimeout(() => {
                    router.push({path: "/"});
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

router.afterEach(() => {
});
