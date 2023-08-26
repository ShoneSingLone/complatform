import { computed, reactive, watch } from "vue";
import { xU, xI } from "@/ventose/ui";
import { Cpt_url } from "@/router/router";
import { API } from "@/api";

const LOADING_STATUS = 0;
const GUEST_STATUS = 1;
const MEMBER_STATUS = 2;

let _stateApp = {
	expandedKeys: {
		group: []
	},
	menu: {},
	globalSize: "",
	baseURL: window.location.origin,
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
	}
};

_stateApp = reactive(xU.merge(_stateApp, { baseURL: window.__BASE_URL }));
_stateApp.urlHash = window.location.hash;

export const Methods_App = {
	toggleFooterFold() {
		_stateApp.isFooterFold = !_stateApp.isFooterFold;
	},
	setMenu(menu) {
		/* notice！！_.merge 空数组不会替换*/
		_stateApp.menu = Object.assign({}, _stateApp.menu, menu);
	},
	setUser(user) {
		_stateApp.user = xU.merge({}, _stateApp.user, user);
	},
	setNews(news) {
		_stateApp.news = Object.assign({}, _stateApp.news, news);
	},
	setBreadcrumb(breadcrumb) {
		Methods_App.setUser({ breadcrumb });
	},
	async refreshUserInfo() {
		try {
			const { data } = await API.user.getUserStatus();
			if (data) {
				Methods_App.setUser({
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
	async checkLoginState() {
		if (_stateApp.user.role && _stateApp.user.isLogin) {
			return true;
		}
		await Methods_App.refreshUserInfo();
		return _stateApp.user.isLogin;
	},
	async fetchGroupList() {
		const { data: groupList } = await API.group.mine();
		_stateApp.groupList = groupList;
	},
	/**
	 * 如果group是对象，直接赋值，
	 * 如果是Id(可能不是数字),则需要request
	 * @param group_id
	 * @returns {Promise<void>}
	 */
	async setCurrGroup(group_id) {
		try {
			if (!xU.isInput(group_id)) {
				_stateApp.currGroup = {};
			}

			if (_stateApp.currGroup._id === group_id) {
				return;
			}
			const { data: currGroup } = await API.group.getMyGroupBy(group_id);
			_stateApp.currGroup = currGroup;
			await Methods_App.fetchProjectList(currGroup._id);
		} catch (error) {
			xU(error);
		}
	},
	async setCurrProject(project_id, options = {}) {
		try {
			let isEnforce = options.isEnforce || false;

			if (!xU.isInput(project_id)) {
				_stateApp.currProject = {};
			}
			if (!isEnforce && _stateApp.currProject._id === project_id) {
				return;
			}
			let { data } = await API.project.getProjectById(Number(project_id));
			_stateApp.currProject = data;
		} catch (error) {
			xU(error);
		}
	},
	async fetchNewsData({ id, type, page = 1, size = 10, selectValue = "" }) {
		try {
			const { data } = await API.news.getLogList({
				typeid: id,
				type,
				page,
				limit: size,
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
			xU(error);
		}
	},
	async changeStudyTip() {
		_stateApp.user.studyTip++;
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
				xU.notification.success(xI("退出成功! "));
			}
		} catch (error) {
			xU(error);
		}
	},
	async fetchInterfaceListMenu() {},
	async fetchProjectList(groupId) {
		try {
			if (!groupId) return;
			groupId = Number(groupId);
			const res = await API.project.list(groupId);
			const { data } = res || {};
			_stateApp.projectList = data.list;
			// xU("stateApp.projectList", _stateApp.projectList);
		} catch (error) {
			xU(error);
		}
	},
	getProject() {},
	async changeMenuItem() {},
	async loginActions() {},
	async loginLdapActions() {},
	async fetchGroupMemberList(groupId) {
		const { data: member } = await API.group.getMemberListBy(groupId);
		_stateApp.currGroup.member = member;
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
	async fetchMoreNews() {},
	async fetchInterfaceList() {},
	async addProject() {},
	async delProject() {},
	async changeUpdateModal() {},
	checkProjectName() {},
	loginTypeAction() {}
};

/* 有关全局的状态，变动 */

watch(
	() => Cpt_url.value.query.group_id,
	xU.debounce(async group_id => {
		await Methods_App.setCurrGroup(group_id);
	}),
	{ immediate: true }
);

watch(
	() => Cpt_url.value.query.project_id,
	xU.debounce(async project_id => {
		await Methods_App.setCurrProject(project_id);
	}),
	{ immediate: true }
);

window.addEventListener(
	"hashchange",
	xU.debounce(function () {
		_stateApp.urlHash = window.location.hash;
	}, 60)
);

const Cpt_avatarUrl = computed(() => {
	if (_stateApp.user.imageUrl) {
		return _stateApp.user.imageUrl;
	} else {
		return `${_stateApp.baseURL}/api/user/avatar?uid=${_stateApp.user.uid}`;
	}
});

export { _stateApp as stateApp, Cpt_avatarUrl };
