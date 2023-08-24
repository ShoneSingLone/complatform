import { ICON_STRATEGE } from "@/components/JsonSchemaEditor/SchemaEditor";
import { stateUI, defCol, xI, xU } from "@/ventose/ui";
import { ITEM_OPTIONS_VDOM } from "./common.options";

export const colParamsName = () =>
	defCol({
		prop: "name",
		label: xI("参数名称")
	});
export const colRemark = (options = {}) =>
	defCol(
		xU.merge(
			{
				prop: "desc",
				label: xI("备注")
			},
			options
		)
	);
export const colRequired = () =>
	defCol({
		prop: "required",
		label: xI("是否必须"),
		width: "100px",
		renderCell: ({ record }) => {
			const vDom = ITEM_OPTIONS_VDOM.required(record.required || "0");
			return vDom;
		}
	});
export const colExample = defCol({
	prop: "example",
	width: "100px",
	label: xI("示例")
});
export const colType = defCol({
	prop: "type",
	label: xI("参数类型"),
	width: "100px",
	renderCell: ({ record }) => {
		const { type } = record;
		let label = ITEM_OPTIONS_VDOM.interfaceBodyFormType(type);
		if (!label) {
			const vDomIcon = ICON_STRATEGE[type] && ICON_STRATEGE[type]();
			let labelType = (
				<div class="mr10 cell-width">
					{vDomIcon}
					<span class="mr10">{type}</span>
				</div>
			);

			return labelType;
		}
	}
});

export const colValue = defCol({
	prop: "value",
	label: xI("参数值")
});
