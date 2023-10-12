import { xI, xU } from "@/ventose/ui";
import { ARTICLE, FOLDER, HTTP_METHOD } from "./variable";

export const ITEM_OPTIONS = {
	httpMethod: xU.map(HTTP_METHOD, (item, prop) => ({
		label: prop,
		value: prop,
		color: item.color,
		type: item.type
	})),
	interfaceBodyType: [
		{ label: "备份", value: "backup" },
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
		{ label: "未完成", value: "undone" },
		{ label: "已完成", value: "done" }
	],
	status: [
		{ label: "开通", value: "ACTIVATED" },
		{ label: "未开通", value: "NONACTIVATED" }
	],
	YesOrNo: [
		{ label: "是", value: "true" },
		{ label: "否", value: "false" }
	],
	wikiType: [
		{ label: xI("文件夹"), value: FOLDER },
		{ label: xI("文档"), value: ARTICLE }
	],
	trueOrFalse: [
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
	interfaceBodyFormType(cell) {
		if (!xU.isInput(cell)) return null;
		const i = xU.find(ITEM_OPTIONS.interfaceBodyFormType, {
			value: cell
		});

		if (!i) {
			return null;
		}
		/*@ts-ignore*/
		return <ElTag>{i?.label}</ElTag>;
	},
	required(cell) {
		if (!xU.isInput(cell)) return null;
		const i = xU.find(ITEM_OPTIONS.required, {
			value: String(cell).toLocaleUpperCase()
		});
		/*@ts-ignore*/
		return <ElTag color={i.color}>{i.label}</ElTag>;
	},
	httpMethod(cell) {
		if (!xU.isInput(cell)) return null;
		const i = xU.find(ITEM_OPTIONS.httpMethod, {
			value: String(cell).toLocaleUpperCase()
		});
		/*@ts-ignore*/
		return (
			<div class="flex end width100">
				<ElTag type={i.type}>{i.label}</ElTag>
			</div>
		);
	},
	status: status => {
		if (!xU.isInput(status)) return null;
		const item = xU.find(ITEM_OPTIONS.interfaceStatus, {
			value: status
		});
		/*@ts-ignore*/
		return <span class={"tag-status " + item.value}>{item.label}</span>;
	},
	trueOrFalse: trueOrFalse => {
		if (!xU.isInput(trueOrFalse)) return null;
		const item = xU.find(ITEM_OPTIONS.trueOrFalse, {
			value: trueOrFalse
		});

		if (item.label === ITEM_OPTIONS.trueOrFalse[0].label) {
			return <ElTag type="success">{item.label}</ElTag>;
		} else {
			return <ElTag type="danger">{item.label}</ElTag>;
		}
	},
	tags: tags => {
		if (!xU.isInput(tags)) return null;
		if (typeof tags === "string") {
			tags = tags.split(",");
		}
		return xU.map(tags, i => (
			/*@ts-ignore*/
			<ElTag effect="plain" round class="mr4">
				{i}
			</ElTag>
		));
	}
};
