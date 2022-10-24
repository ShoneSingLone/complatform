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
