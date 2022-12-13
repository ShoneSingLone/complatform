import { reactive, watch, computed } from "vue";
import { lStorage, setCSSVariables, UI, xU, State_UI } from "@ventose/ui";
import { Cpt_url } from "./../router/router";
import { API } from "./../api";

const { $t } = State_UI;

const LOADING_STATUS = 0;
const GUEST_STATUS = 1;
const MEMBER_STATUS = 2;

let _State_App = {
	isFooterFold: false,
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
	news: {
		newsData: {
			list: [],
			total: 0
		},
		curpage: 1
	},
	groupList: [],
	currGroup: {
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
}

_State_App = reactive(
	xU.merge(_State_App, lStorage.State_App)
);

_State_App.urlHash = window.location.hash;

export const Methods_App = {
	toggleFooterFold() {
		_State_App.isFooterFold = !_State_App.isFooterFold;
	},
	setMenu(menu) {
		/* notice！！_.merge 空数组不会替换*/
		_State_App.menu = Object.assign({}, _State_App.menu, menu);
	},
	setUser(user) {
		_State_App.user = Object.assign({}, _State_App.user, user);
	},
	setNews(news) {
		_State_App.news = Object.assign({}, _State_App.news, news);
	},
	setBreadcrumb(breadcrumb) {
		Methods_App.setUser({ breadcrumb });
	},
	async checkLoginState() {
		if (_State_App.user.isLogin) {
			return true;
		}
		try {
			const { data, response } = await API.user.getUserStatus();
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
			return _State_App.user.isLogin;
		}
	},
	async fetchGroupList() {
		const { data: groupList } = await API.group.getMyGroupList();
		_State_App.groupList = groupList;
	},
	/**
	 * 如果group是对象，直接赋值，
	 * 如果是Id(可能不是数字),则需要request
	 * @param group_id
	 * @returns {Promise<void>}
	 */
	async setCurrGroup(group_id) {
		if (!xU.isInput(group_id)) {
			_State_App.currGroup = {};
		}

		if (_State_App.currGroup._id === group_id) {
			return;
		}
		const { data: currGroup } = await API.group.getMyGroupBy(group_id);
		_State_App.currGroup = currGroup;
		Methods_App.setUser({
			role: group_id.role,
			field: {
				name: currGroup.custom_field1.name,
				enable: currGroup.custom_field1.enable
			}
		});
	},
	async setCurrProject(project_id) {
		if (!xU.isInput(project_id)) {
			_State_App.currProject = {};
		}
		if (_State_App.currProject._id === project_id) {
			return;
		}
		project_id = project_id || Cpt_url.value.query.project_id;
		if (project_id) {
			let { data } = await API.project.getProjectById(Number(project_id));
			_State_App.currProject = data;
		}
	},
	async fetchNewsData(typeid, type, page, limit, selectValue) {
		try {
			const { data } = await API.news.getLogList({
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
					list: xU.sortBy(data.list, (a, b) => {
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
		_State_App.user.studyTip++;
	},
	async finishStudy() {
		Methods_App.setUser({
			study: true,
			studyTip: 0
		});
	},
	async logoutActions() {
		try {
			const { data } = await API.user.logoutActions();
			Methods_App.setUser({
				isLogin: false,
				loginState: GUEST_STATUS,
				userName: null,
				uid: null,
				role: "",
				type: ""
			});
			if (data === "ok") {
				Cpt_url.value.go("/login");
				UI.notification.success($t("退出成功! ").label);
			}
		} catch (error) {
			console.error(error);
		}
	},
	async fetchInterfaceListMenu() { },
	async fetchProjectList(groupId) {
		if (!groupId) return;
		groupId = Number(groupId);
		const { data } = await API.project.list(groupId);
		_State_App.projectList = data.list;
		console.log("State_App.projectList", _State_App.projectList);
	},
	getProject() {
	},
	async changeMenuItem() { },
	async loginActions() { },
	async loginLdapActions() { },
	async fetchGroupMemberList(groupId) {
		const { data: member } = await API.group.getMemberListBy(groupId);
		_State_App.currGroup.member = member;
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
	},
	async fetchInterfaceList() {
	},
	async addProject() {
	},
	async delProject() {
	},
	async changeUpdateModal() {
	},
	checkProjectName() {
	},
	loginTypeAction() {
	}
};

/* 有关全局的状态，变动 */

watch(
	_State_App,
	xU.debounce(function () {
		lStorage.State_App = _State_App;
	}),
	100
);

watch(
	() => Cpt_url.value.query.group_id,
	xU.debounce(async (group_id) => {
		await Methods_App.setCurrGroup(group_id);
	}),
	100
);

watch(
	() => Cpt_url.value.query.project_id,
	xU.debounce(async (project_id) => {
		await Methods_App.setCurrProject(project_id);
	}),
	100
);





window.addEventListener(
	"hashchange",
	xU.debounce(function () {
		_State_App.urlHash = window.location.hash;
	}, 60)
);

export { _State_App as State_App }