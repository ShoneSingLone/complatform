import { ajax } from "@/api/ajax";
import qs from "qs";

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
	getProjectById(id) {
		return ajax({
			method: "get",
			url: "/api/project/get",
			params: { id }
		});
	},
	copyProjectMsg(data) {
		return ajax({
			method: "post",
			url: "/api/project/copy",
			data
		});
	},
	fetchInterfaceList(params) {
		return ajax({
			method: "get",
			url: "/api/interface/list",
			params,
			paramsSerializer: params => {
				return qs.stringify(params, { indices: false });
			}
		});
	},
	/* { group_id: 0, page: 1, limit: 10 } */
	list(groupId) {
		return ajax({
			method: "get",
			url: "/api/project/list",
			params: {
				group_id: Number(groupId)
			}
		});
	},
	addInterface(data) {
		return ajax({
			method: "post",
			url: "/api/interface/add",
			data
		});
	},
	addInterfaceCategory(data) {
		return ajax({
			method: "post",
			url: "/api/interface/add_cat",
			data
		});
	},
	updateInterfaceCategory(data) {
		return ajax({
			method: "post",
			url: "/api/interface/up_cat",
			data
		});
	},
	fetchInterfaceListMenu(project_id) {
		return ajax({
			method: "get",
			url: "/api/interface/list_menu",
			params: {
				project_id: Number(project_id)
			}
		});
	}
};
