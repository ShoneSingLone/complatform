import { HTTP_METHOD } from "./variable";
import { xU } from "@ventose/ui";

export const ITEM_OPTIONS = {
	httpMethod: xU.map(HTTP_METHOD, (item, prop) => ({
		label: prop,
		value: prop,
		color: item.color
	})),
	interfaceBodyType: [
		{ label: "form", value: "form", isForm: true },
		{ label: "json", value: "json" },
		{ label: "file", value: "file" },
		{ label: "raw", value: "raw" }
	],
	interfaceBodyFormType: [
		{ label: "text", value: "text" },
		{ label: "file", value: "file" }
	],
	httpProtocol: [
		{ label: "http://", value: "http://" },
		{ label: "https://", value: "https://" }
	],
	interfaceStatus: [
		{ label: "已完成", value: "done" },
		{ label: "未完成", value: "undone" }
	],
	status: [
		{ label: "开通", value: "ACTIVATED" },
		{ label: "未开通", value: "NONACTIVATED" }
	],
	YesOrNo: [
		{ label: "是", value: true },
		{ label: "否", value: false }
	],
	required: [
		{ label: "必需", value: "1", color: "red" },
		{ label: "非必需", value: "0" }
	],
	statusFn(action) {
		if (action === "all") {
			return [{ label: "所有状态", value: "" }].concat(this.status);
		}
		return this.status;
	}
};

/*状态显示样式统一处理*/
export const ITEM_OPTIONS_VDOM = {
	required(cell) {
		if (!xU.isInput(cell)) return null;
		const i = xU.find(ITEM_OPTIONS.required, {
			value: String(cell).toLocaleUpperCase()
		});
		/*@ts-ignore*/
		return <aTag color={i.color}>{i.label}</aTag>;
	},
	httpMethod(cell) {
		if (!xU.isInput(cell)) return null;
		const i = xU.find(ITEM_OPTIONS.httpMethod, {
			value: String(cell).toLocaleUpperCase()
		});
		/*@ts-ignore*/
		return <aTag color={i.color}>{i.label}</aTag>;
	},
	status: status => {
		if (!xU.isInput(status)) return null;
		const item = xU.find(ITEM_OPTIONS.interfaceStatus, {
			value: status
		});
		/*@ts-ignore*/
		return <span class={"tag-status " + item.value}>{item.label}</span>;
	},
	tags: tags => {
		if (!xU.isInput(tags)) return null;
		if (typeof tags === "string") {
			tags = tags.split(",");
		}
		return xU.map(tags, i => (
			/*@ts-ignore*/
			<aTag color="blue">{i}</aTag>
		));
	}
};
