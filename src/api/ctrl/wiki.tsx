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
	upsertOne(params) {
		return this.action({
			action: "upsertOne",
			data: params
		});
	},
	delete(_id) {
		return this.action({
			action: "delete",
			_id
		});
	},
	menu(payload) {
		return this.action({
			action: "menu",
			payload
		});
	},
	resetMenuOrder(payload) {
		return this.action({
			action: "resetMenuOrder",
			payload
		});
	}
};
