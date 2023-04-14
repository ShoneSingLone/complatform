import { ajax } from "@/api/ajax";

export const god = {
	say(data) {
		return ajax({
			method: "post",
			url: "/api/god/say",
			data
		});
	},
	delete(_id) {
		return this.say({
			action: "delete",
			_id
		});
	},
	menu(payload) {
		return this.say({
			action: "menu",
			payload
		});
	},
	resetMenuOrder(payload) {
		return this.say({
			action: "resetMenuOrder",
			payload
		});
	}
};
