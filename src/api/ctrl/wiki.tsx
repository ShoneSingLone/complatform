import { ajax } from "@/api/ajax";

export const wiki = {
	menu() {
		return this.action({
			action: "menu"
		});
	},
	action(data) {
		return ajax({
			method: "post",
			url: "/api/wiki/action",
			data
		});
	}
};
