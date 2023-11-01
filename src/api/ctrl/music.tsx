import { ajax } from "@/api/ajax";

export const music = {
	ls(data) {
		return ajax({
			method: "post",
			url: "/api/resource/ls",
			data
		});
	},
	status(data) {
		return ajax({
			method: "post",
			url: "/api/resource/status",
			data
		});
	}
};
