import { ajax } from "@/api/ajax";

export const group = {
	delMember(data) {
		return ajax({
			method: "post",
			url: "/api/group/del_member",
			data
		});
	},
	deleteGroup(data) {
		return ajax({
			method: "post",
			url: "/api/group/del",
			data
		});
	},
	addMember(data) {
		return ajax({
			method: "post",
			url: "/api/group/add_member",
			data
		});
	},
	changeMemberRole(data) {
		return ajax({
			method: "post",
			url: "/api/group/change_member_role",
			data
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
	mine() {
		return ajax({
			method: "get",
			url: "/api/group/mine"
		});
	},
	getMyGroupBy(groupId) {
		let id;
		try {
			id = Number(groupId);
		} catch (error) {
			return;
		}
		return ajax({
			method: "get",
			url: "/api/group/get",
			params: {
				id
			}
		});
	},
	getMemberListBy(groupId) {
		return ajax({
			method: "get",
			url: "/api/group/get_member_list",
			params: {
				id: Number(groupId)
			}
		});
	}
};
