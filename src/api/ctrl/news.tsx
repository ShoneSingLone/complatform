import { ajax } from "@/api/ajax";

export const news = {
	getLogList({ typeid, type, page, limit, selectValue }) {
		return ajax({
			method: "get",
			url: "/api/log/list",
			params: {
				typeid: typeid,
				type: type,
				page: page,
				limit: limit ? limit : 10,
				selectValue
			}
		});
	}
};
