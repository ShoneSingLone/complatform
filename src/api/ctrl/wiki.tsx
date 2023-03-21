import { ajax } from "@/api/ajax";

export const wiki = {
	action(data) {
		return ajax({
			method: "post",
			url: "/api/wiki/action",
			data
		});
	}
};
