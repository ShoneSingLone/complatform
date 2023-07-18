import { ajax } from "@/api/ajax";

export const user = {
	getUserStatus() {
		return ajax({
			method: "get",
			url: "/api/user/status"
		});
	},
	searchUser(params) {
		return ajax({
			method: "get",
			url: "/api/user/search",
			params
		});
	},
	uploadAvatar(data) {
		return ajax({
			method: "post",
			url: "/api/user/upload_avatar",
			data
		});
	},
	loginActions(data) {
		return ajax({
			method: "post",
			url: "/api/user/login",
			data
		});
	},
	logoutActions() {
		return ajax({
			method: "get",
			url: "/api/user/logout"
		});
	},
	regActions(data) {
		return ajax({
			method: "post",
			url: "/api/user/reg",
			data
		});
	}
};
