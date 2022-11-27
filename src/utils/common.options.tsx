import { HTTP_METHOD } from "./variable";
import { _ } from "@ventose/ui";

export const ITEM_OPTIONS = {
	httpMethod: _.map(HTTP_METHOD, (item, prop) => ({
		label: prop,
		value: prop
	})),
	interfaceStatus: [
		{ label: "已完成", value: "done" },
		{ label: "未完成", value: "undone" }
	],
	status: [
		{ label: "开通", value: "ACTIVATED" },
		{ label: "未开通", value: "NONACTIVATED" }
	],
	statusFn(action) {
		if (action === "all") {
			return [{ label: "所有状态", value: "" }].concat(this.status);
		}
		return this.status;
	}
};
