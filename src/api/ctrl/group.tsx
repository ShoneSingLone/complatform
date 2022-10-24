import { ajax } from "@/api/ajax";

export const group = {
	getMyGroup() {
		return ajax({
			method: "get",
			url: "/api/group/get_mygroup"
		});
	},
	addGroup(data) {
		return ajax({
			method: "post",
			url: "/api/group/add",
			data
		});
	},
	updateGroup(data) {
		return ajax({
			method: "post",
			url: "/api/group/up",
			data
		});
	},
	getMyGroupList() {
		return ajax({
			method: "get",
			url: "/api/group/list"
		});
	},
	getMyGroupBy(groupId) {
		return ajax({
			method: "get",
			url: "/api/group/get",
			params: {
				id: groupId
			}
		});
	},
	getMemberListBy(groupId) {
		return ajax({
			method: "get",
			url: "/api/group/get_member_list",
			params: {
				id: groupId
			}
		});
	}
};
