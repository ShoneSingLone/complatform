import { ajax } from "@/api/ajax";

export const testcase = {
	getListBy(project_id) {
		return ajax({
			method: "get",
			url: "/api/col/list",
			params: { project_id }
		});
	}
};
