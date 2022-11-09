import {reactive, watch, computed} from "vue";
import {lStorage, setCSSVariables, UI, _, State_UI} from "@ventose/ui";
import {router} from "./../router/router";
import {API} from "./../api";

const {$t} = State_UI;

const LOADING_STATUS = 0;
const GUEST_STATUS = 1;
const MEMBER_STATUS = 2;

export const State_App = reactive(
    lStorage.State_App || {
        urlHash: window.location.hash,
        user: {
            isLogin: false,
            canRegister: true,
            isLDAP: false,
            userName: null,
            uid: null,
            email: "",
            loginState: LOADING_STATUS,
            loginWrapActiveKey: "1",
            role: "",
            type: "",
            breadcrumb: [],
            studyTip: 0,
            study: false,
            imageUrl: ""
        },
        projectList: [],
        project: {
            currPage: "",
            userInfo: "",
            tableLoading: ""
        },
        news: {
            newsData: {
                list: [],
                total: 0
            },
            curpage: 1
        },
        groupList: [],
        currGroup: {
            group_name: "",
            group_desc: "",
            custom_field1: {
                name: "",
                enable: false
            }
        },
        group: {
            field: {
                name: "",
                enable: false
            },
            member: [],
            role: ""
        }
    }
);

State_App.urlHash = window.location.hash;

export const Methods_App = {
    setMenu(menu) {
        /* notice！！_.merge 空数组不会替换*/
        State_App.menu = Object.assign({}, State_App.menu, menu);
    },
    setUser(user) {
        State_App.user = Object.assign({}, State_App.user, user);
    },
    setNews(news) {
        State_App.news = Object.assign({}, State_App.news, news);
    },
    setBreadcrumb(breadcrumb) {
        Methods_App.setUser({breadcrumb});
    },
    async checkLoginState() {
        if (State_App.user.isLogin) {
            return true;
        }
        try {
            const {data, response} = await API.user.getUserStatus();
            Methods_App.setUser({
                isLogin: response.data.errcode == 0,
                isLDAP: response.data.ladp,
                canRegister: response.data.canRegister,
                role: data ? data.role : null,
                loginState: response.data.errcode == 0 ? MEMBER_STATUS : GUEST_STATUS,
                userName: data ? data.username : null,
                uid: data ? data._id : null,
                type: data ? data.type : null,
                study: data ? data.study : false
            });
        } catch (error) {
            console.error(error);
        } finally {
            return State_App.user.isLogin;
        }
    },
    async fetchGroupList() {
        const {data: groupList} = await API.group.getMyGroupList();
        State_App.groupList = groupList;
    },
    /**
     * 如果group是对象，直接赋值，
     * 如果是Id(可能不是数字),则需要request
     * @param group
     * @returns {Promise<void>}
     */
    async setCurrGroup(group) {
        let groupId;
        if (!_.isPlainObject(group)) {
            groupId = parseInt(group);
            if (!_.isNumber(groupId)) {
                throw new Error("miss groupId");
            }
        } else {
            groupId = group._id;
        }
        const {data} = await API.group.getMyGroupBy(groupId);
        group = data;
        State_App.currGroup = _.merge({}, State_App.currGroup, group);
        Methods_App.setUser({
            role: group.role,
            field: {
                name: group.custom_field1.name,
                enable: group.custom_field1.enable
            }
        });
    },
    async fetchNewsData(typeid, type, page, limit, selectValue) {
        try {
            const {data} = await API.news.getLogList({
                typeid,
                type,
                page,
                limit,
                selectValue
            });
            Methods_App.setNews({
                curpage: 1,
                newsData: {
                    total: data.total,
                    list: _.sortBy(data.list, (a, b) => {
                        if (a && b) {
                            return b.add_time - a.add_time;
                        }
                        return false;
                    })
                }
            });
        } catch (error) {
            console.error(error);
        }
    },
    async changeStudyTip() {
        State_App.user.studyTip++;
    },
    async finishStudy() {
        Methods_App.setUser({
            study: true,
            studyTip: 0
        });
    },
    async logoutActions() {
        try {
            const {data} = await API.user.logoutActions();
            Methods_App.setUser({
                isLogin: false,
                loginState: GUEST_STATUS,
                userName: null,
                uid: null,
                role: "",
                type: ""
            });
            if (data === "ok") {
                router.push({path: "/login"});
                UI.notification.success("退出成功! ");
            }
        } catch (error) {
            console.error(error);
        }
    },
    async fetchInterfaceListMenu() {
    },
    async fetchProjectList(groupId) {
        if (!groupId) return;
        groupId = Number(groupId);
        const {data} = await API.project.list(groupId);
        State_App.projectList = data.list;
        console.log("State_App.projectList", State_App.projectList);
    },
    getProject() {
        debugger;
    },
    async changeMenuItem() {
    },
    async loginActions() {
    },
    async loginLdapActions() {
    },
    async fetchGroupMemberList(groupId) {
        const {data: member} = await API.group.getMemberListBy(groupId);
        State_App.group.member = member;
        return member;
    },
    async addMember(data) {
        return API.group.addMember(data);
    },
    async delMember(data) {
        return API.group.delMember(data);
    },
    async changeMemberRole(data) {
        return API.group.changeMemberRole(data);
    },
    async fetchMoreNews() {
        debugger;
    },
    async fetchInterfaceList() {
        debugger;
    },

    async setGroupList() {
        debugger;
    },
    async addProject() {
        debugger;
    },
    async delProject() {
        debugger;
    },
    async changeUpdateModal() {
        debugger;
    },
    checkProjectName() {
        debugger;
    },
    loginTypeAction() {
        debugger;
    }
};

watch(
    State_App,
    _.debounce(function () {
        lStorage.State_App = State_App;
    }),
    1000
);

window.addEventListener(
    "hashchange",
    _.debounce(function () {
        State_App.urlHash = window.location.hash;
    }, 300)
);

type type_url = {
    go: (path: string, query?: object) => null;
    refresh: (query: object) => null;
};

export const Cpt_url: type_url = computed(() => {

    const urlHash = State_App.urlHash || "/";
    const {origin} = location;

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
            onlyModifyQuery(_.merge({}, _query))
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
    const {pathname, search} = _url;
    return `${pathname}${search}`;
}

function modifyPathname(path, _query = {}) {
    window.location.hash = transToUrl(path, _query);
}

/***
 * query 会直接替换
 * @param _query
 */
function onlyModifyQuery(_query) {
    window.location.hash = transToUrl(location.hash, _query);
}
