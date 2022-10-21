import { ajax } from "ysrc/api/ajax";

export const project = {
	addFollow(data) {
		return ajax({
			method: "post",
			url: "/api/follow/add",
			data
		});
	},
	delFollow(projectid) {
		return ajax({
			method: "post",
			url: "/api/follow/del",
			data: {
				projectid
			}
		});
	},
	addProject(data) {
		return ajax({
			method: "post",
			url: "/api/project/add",
			data
		});
	},
	/* {
			group_id: 0,
			page: 1,
			limit: 10
		} */
	list(groupId) {
		return ajax({
			method: "get",
			url: "/api/project/list",
			params: {
				group_id: Number(groupId)
			}
		});
	}
};
