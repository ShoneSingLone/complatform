import { ajax } from "@/api/ajax";

export const resource = {
	upload(data) {
		return ajax({
			method: "post",
			url: "/api/resource/single_upload",
			headers: { "Content-Type": "multipart/form-data" },
			data
		});
	}
};
