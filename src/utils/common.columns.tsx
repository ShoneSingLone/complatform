import { ICON_STRATEGE } from "@/components/JsonSchemaEditor/SchemaEditor";
import { State_UI, defCol, $t, xU } from "@ventose/ui";
import { ITEM_OPTIONS_VDOM } from "./common.options";

export const colParamsName = () =>
	defCol({
		prop: "name",
		label: $t("参数名称").label
	});
export const colRemark = (options = {}) =>
	defCol(
		xU.merge(
			{
				prop: "desc",
				label: $t("备注").label
			},
			options
		)
	);
export const colRequired = () =>
	defCol({
		prop: "required",
		label: $t("是否必须").label,
		width: "100px",
		renderCell: ({ record }) => {
			const vDom = ITEM_OPTIONS_VDOM.required(record.required || "0");
			return vDom;
		}
	});
export const colExample = defCol({
	prop: "example",
	label: $t("示例").label
});
export const colType = defCol({
	prop: "type",
	label: $t("参数类型").label,
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
	label: $t("参数值").label
});
