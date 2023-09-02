import { computed, reactive, watch } from "vue";
import { xU, xI, xScope, lStorage } from "@/ventose/ui";
import { cptRouter } from "@/router/router";
import { API } from "@/api";

const LOADING_STATUS = 0;
const GUEST_STATUS = 1;
const MEMBER_STATUS = 2;
/**
 * 1.定义一个返回state默认值的函数defaultStateApp；
 * 2.生成一个私有变量
 * 3.获取state type typeof
 * 4.xScope 处理私有state，获得响应变量、不响应方法的export变量 *
 */
function defaultStateApp() {
	return {
		BASE_URL: window.__BASE_URL || window.location.origin,
		expandedKeys: {
			group: []
		},
		menu: {},
		globalSize: "",
		isFooterFold: false,
		urlHash: window.location.hash,
		user: {
			add_time: "",
			email: "",
			role: "",
			study: false,
			type: "",
			up_time: "",
			username: "",
			_id: "",
			isLogin: false,
			canRegister: true,
			isLDAP: false,
			userName: null,
			uid: null,
			loginState: LOADING_STATUS,
			loginWrapActiveKey: "1",
			breadcrumb: [],
			studyTip: 0,
			imageUrl: ""
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
			_id: "",
			role: "",
			group_name: "",
			group_desc: "",
			custom_field1: {
				name: "",
				enable: false
			}
		},
		projectList: [],
		currProject: {
			currPage: "",
			userInfo: "",
			tableLoading: ""
		},
		/* ************************methods************************ */
		_toggleFooterFold() {
			stateApp.isFooterFold = !stateApp.isFooterFold;
		},
		_setMenu(menu) {
			/* notice！！_.merge 空数组不会替换*/
			stateApp.menu = Object.assign({}, stateApp.menu, menu);
		},
		_setUser(user) {
			stateApp.user = xU.merge({}, stateApp.user, user);
		},
		_setNews(news) {
			stateApp.news = Object.assign({}, stateApp.news, news);
		},
		_setBreadcrumb(breadcrumb) {
			stateApp._setUser({ breadcrumb });
		},
		async _refreshUserInfo() {
			try {
				const res = await API.user.getUserStatus();
				const data = res;
				if (data) {
					stateApp._setUser({
						...data,
						isLogin: !!data._id,
						isLDAP: data.ladp,
						canRegister: data.canRegister,
						role: data ? data.role : null,
						loginState: !!data._id ? MEMBER_STATUS : GUEST_STATUS,
						userName: data ? data.username : null,
						uid: data ? data._id : null,
						type: data ? data.type : null,
						study: data ? data.study : false
					});
				} else {
					throw new Error("refreshUserInfo error");
				}
			} catch (error) {
				xU(error);
			}
		},
		async _checkLoginState() {
			if (stateApp.user.role && stateApp.user.isLogin) {
				return true;
			}
			await stateApp._refreshUserInfo();
			return stateApp.user.isLogin;
		},
		async _fetchGroupList() {
			try {
				const { data: groupList } = await API.group.mine();
				stateApp.groupList = groupList;
			} catch (error) {}
		},
		/**
		 * 如果group是对象，直接赋值，
		 * 如果是Id(可能不是数字),则需要request
		 * @param group_id
		 * @returns {Promise<void>}
		 */
		async _setCurrGroup(group_id) {
			try {
				if (!xU.isInput(group_id)) {
					stateApp.currGroup = {};
				}

				if (stateApp.currGroup._id === group_id) {
					return;
				}
				const { data: currGroup } = await API.group.getMyGroupBy(group_id);
				stateApp.currGroup = currGroup;
				await stateApp._fetchProjectList(currGroup._id);
			} catch (error) {
				xU(error);
			}
		},
		async _setCurrProject(project_id, options = {}) {
			try {
				let isEnforce = options.isEnforce || false;

				if (!xU.isInput(project_id)) {
					stateApp.currProject = {};
				}
				if (!isEnforce && stateApp.currProject._id === project_id) {
					return;
				}
				let { data } = await API.project.getProjectById(Number(project_id));
				stateApp.currProject = data;
			} catch (error) {
				xU(error);
			}
		},
		async _fetchNewsData({ id, type, page = 1, size = 10, selectValue = "" }) {
			try {
				const { data } = await API.news.getLogList({
					typeid: id,
					type,
					page,
					limit: size,
					selectValue
				});
				stateApp._setNews({
					curpage: 1,
					newsData: {
						total: data.total,
						list: xU.sortBy(data.list, (a, b) => {
							if (a && b) {
								return b.add_time - a.add_time;
							}
							return false;
						})
					}
				});
			} catch (error) {
				xU(error);
			}
		},
		async _changeStudyTip() {
			stateApp.user.studyTip++;
		},
		async _finishStudy() {
			stateApp._setUser({
				study: true,
				studyTip: 0
			});
		},
		async _logoutActions() {
			try {
				const { data } = await API.user.logoutActions();
				if (data === "ok") {
					lStorage["x_token"] = "";
					stateApp._setUser({
						isLogin: false,
						loginState: GUEST_STATUS,
						userName: null,
						uid: null,
						role: "",
						type: ""
					});
					cptRouter.value.go("/login");
					xU.notification.success(xI("退出成功! "));
				}
			} catch (error) {
				xU(error);
			}
		},
		async _fetchInterfaceListMenu() {},
		async _fetchProjectList(groupId) {
			try {
				if (!groupId) return;
				groupId = Number(groupId);
				const res = await API.project.list(groupId);
				const { data } = res || {};
				stateApp.projectList = data.list;
				// xU("stateApp.projectList", stateApp.projectList);
			} catch (error) {
				xU(error);
			}
		},
		_getProject() {},
		async _changeMenuItem() {},
		async _loginActions() {},
		async _loginLdapActions() {},
		async _fetchGroupMemberList(groupId) {
			const { data: member } = await API.group.getMemberListBy(groupId);
			stateApp.currGroup.member = member;
			return member;
		},
		async _addMember(data) {
			return API.group.addMember(data);
		},
		async _delMember(data) {
			return API.group.delMember(data);
		},
		async _changeMemberRole(data) {
			return API.group.changeMemberRole(data);
		},
		async _fetchMoreNews() {},
		async _fetchInterfaceList() {},
		async _addProject() {},
		async _delProject() {},
		async _changeUpdateModal() {},
		_checkProjectName() {},
		_loginTypeAction() {}
	};
}
var _stateApp = defaultStateApp();
type t_stateApp = typeof _stateApp;
export var stateApp = xScope<t_stateApp>(_stateApp);

/* 有关全局的状态，变动 */
watch(
	() => cptRouter.value.query.group_id,
	xU.debounce(async group_id => {
		await stateApp._setCurrGroup(group_id);
	}),
	{ immediate: true }
);

watch(
	() => cptRouter.value.query.project_id,
	xU.debounce(async project_id => {
		await stateApp._setCurrProject(project_id);
	}),
	{ immediate: true }
);

window.addEventListener(
	"hashchange",
	xU.debounce(function () {
		stateApp.urlHash = window.location.hash;
	}, 60)
);

const cptAvatarUrl = computed(() => {
	if (stateApp.user.imageUrl) {
		return stateApp.user.imageUrl;
	} else {
		return `${stateApp.BASE_URL}/api/user/avatar?uid=${stateApp.user.uid}`;
	}
});
export { cptAvatarUrl };
