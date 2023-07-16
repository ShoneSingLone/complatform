import { ajax } from "@/api/ajax";

export const wiki = {
	action(data) {
		return ajax({
			method: "post",
			url: "/api/wiki/action",
			params: { wiki_action: data.action },
			data
		});
	},
	upsertOne(data) {
		return ajax({
			method: "post",
			url: "/api/wiki/upsertOne",
			data
		});
	},
	detail(_id) {
		return ajax({
			method: "get",
			url: "/api/wiki/detail",
			params: { _id }
		});
	},
	delete(_id) {
		return ajax({
			method: "delete",
			url: "/api/wiki/delete",
			params: { _id }
		});
	},
	menu(params) {
		return ajax({
			method: "get",
			url: "/api/wiki/menu",
			params
		});
	},
	resetMenuOrder(data) {
		return ajax({
			method: "post",
			url: "/api/wiki/reset_menu_order",
			data
		});
	}
};
