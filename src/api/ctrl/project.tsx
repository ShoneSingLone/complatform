import { ajax } from "@/api/ajax";
import { xU } from "@/ventose/ui";
import qs from "qs";

export const project = {
	interfaceSchema2json(data) {
		return ajax({
			method: "post",
			url: "/api/interface/schema2json",
			data
		});
	},
	updateProxyEnv(data) {
		return ajax({
			method: "post",
			url: "/api/project/up_env",
			data
		});
	},
	updateTags(data) {
		return ajax({
			method: "post",
			url: "/api/project/up_tag",
			data
		});
	},
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
	list(group_id) {
		return ajax({
			method: "get",
			url: "/api/project/list",
			params: { group_id }
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
	updateInterface(data) {
		return ajax({
			method: "post",
			url: "/api/interface/up",
			data
		});
	},
	deleteCategoryById(id) {
		return ajax({
			method: "post",
			url: "/api/interface/del_cat",
			data: { catid: id }
		});
	},
	deleteInterfaceById(id) {
		return ajax({
			method: "post",
			url: "/api/interface/del",
			data: { id }
		});
	},
	updateInterfaceCategory(data) {
		return ajax({
			method: "post",
			url: "/api/interface/up_cat",
			data
		});
	},
	switchManyCategoryOrder(data) {
		return ajax({
			method: "post",
			url: "/api/interface/up_cat_index",
			data
		});
	},
	switchManyInterfaceOrder(data) {
		return ajax({
			method: "post",
			url: "/api/interface/up_index",
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
	},
	fetchInterfaceDetail(interfaceId) {
		return ajax({
			method: "get",
			url: "/api/interface/get",
			params: {
				id: Number(interfaceId)
			}
		});
	}
};
