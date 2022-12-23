import {
	compileVNode,
	defCol,
	defItem,
	defXVirTableConfigs,
	UI,
	xU
} from "@ventose/ui";
import { ITEM_OPTIONS } from "src/utils/common.options";
import { defineComponent, markRaw } from "vue";
import { DialogBulkValues } from "./DialogBulkValues";
import { diff } from "jsondiffpatch";


function newFormData([name, value] = ["", ""]) {
	return {
		_id: xU.genId("query_params"),
		name: "",
		required: "1",
		example: "",
		desc: "",
	};
}

const STRATEGY_CELL_ITEM_CONFIGS = {
	name: {},
	required: {
		itemType: "Select",
		options: ITEM_OPTIONS.required
	},
	example: {},
	desc: {}
};

const BODY_PARAM_PROP_ARRAY = Object.keys(STRATEGY_CELL_ITEM_CONFIGS);

/* virTable 的 renderCell 缓存标识 ,关键是唯一，具体是啥无所谓，所以这里不用过分考虑顺序*/
const [ID_NAME, ID_TYPE, ID_REQUIRED, ID_RECORD, ID_DESC, ID_OPERATIONS] = [
	...BODY_PARAM_PROP_ARRAY,
	"ID_OPERATIONS"
].map(xU.genId);

export const QueryParamsForm = defineComponent({
	props: ["reqQuery"],
	emits: ["update:reqQuery"],
	watch: {
		"reqQuery": {
			immediate: true,
			handler(formDataArray) {
				const res = diff(this.configs_table.dataSource, formDataArray)
				debugger;
				this.resetDataForm(formDataArray);
			}
		}
	},
	methods: {
		openBulkValuesDialog() {
			UI.dialog.component({
				title: this.$t("批量添加参数").label,
				component: DialogBulkValues,
				formValues: xU.map(this.configs_table.dataSource, i => {
					return {
						key: i.name,
						value: i.value
					}
				}),
				onOk: (formDataArray: any) => {
					this.configs_table.dataSource = xU.map(formDataArray, newFormData);
				}
			});
		},
		addRow() {
			this.configs_table.dataSource.unshift(newFormData());
			this.syncFormDataFromConfigs();
		},
		deleteRow(_id) {
			const index = xU.findIndex(this.configs_table.dataSource, { _id });
			if (~index) {
				this.configs_table.dataSource.splice(index, 1);
				this.syncFormDataFromConfigs();
			}
		},
		syncFormDataFromConfigs() {
			xU.each(this.configs_table.dataSource, rowData => {
				xU.each(BODY_PARAM_PROP_ARRAY, prop => {
					if (rowData[`configs_${prop}`]) {
						rowData[prop] = rowData[`configs_${prop}`].value;
					}
				});
			});
			// this.$emit("update:reqQuery", this.configs_table.dataSource);
		},
		resetDataForm(newFormDataArray) {
			this.resetDataForm.origin = newFormDataArray;
			this.configs_table.dataSource = [...newFormDataArray];
		},
		getDataForm() {

		}
	},
	data(vm) {
		return {
			configs_table: defXVirTableConfigs({
				rowHeight: 36,
				dataSource: [],
				customClass: tableId =>
					[
						`#${tableId} .input-width100{width:100%;}`,
						`#${tableId} div[role=tr] div[role=th][data-prop=operations]{justify-content:center;}`,
						`#${tableId} div[role=tr] div[role=td][data-prop=operations]{justify-content:center;color:red;}`
					].join("\n"),
				dataSourceFilter(dataSource) {
					return xU.map(dataSource, rowRecord => {
						xU.each(STRATEGY_CELL_ITEM_CONFIGS, (options, prop) => {
							if (!rowRecord[`configs_${prop}`]) {
								rowRecord[`configs_${prop}`] = markRaw(defItem.item(
									xU.merge(
										{
											value: rowRecord[prop],
											itemWrapperClass: "input-width100",
											onAfterValueEmit(val) {

											}
										},
										options
									)
								))
							}
						});
						return rowRecord;
					});
				},
				columns: {
					...defCol({
						label: vm.$t("名称").label,
						prop: "name",
						renderCell: ({ record }) =>
							compileVNode(
								`<xItem :configs="record.configs_name" />`,
								{ record },
								`${ID_NAME}${record._id}`
							)

					}),
					...defCol({
						label: vm.$t("必需").label,
						prop: "required",
						width: "110px",
						renderCell: ({ record }) =>
							compileVNode(
								`<xItem :configs="record.configs_required" />`,
								{ record },
								`${ID_REQUIRED}${record._id}`
							)
					}),
					...defCol({
						label: vm.$t("示例").label,
						prop: "example",
						renderCell: ({ record }) =>
							compileVNode(
								`<xItem :configs="record.configs_example" />`,
								{ record },
								`${ID_RECORD}${record._id}`
							)
					}),
					...defCol({
						label: vm.$t("备注").label,
						prop: "desc",
						renderCell: ({ record }) =>
							compileVNode(
								`<xItem :configs="record.configs_desc" />`,
								{ record },
								`${ID_DESC}${record._id}`
							)
					}),
					...defCol({
						label: vm.$t("操作").label,
						prop: "operations",
						width: "40px",
						renderHeader: () => null,
						renderCell: ({ record }) =>
							compileVNode(
								`<xIcon icon="delete" class="pointer" @Click="deleteRow(record._id)" />`,
								{
									record,
									deleteRow: vm.deleteRow
								},
								`${ID_OPERATIONS}${record._id}`
							)
					})
				}
			})
		};
	},
	render() {
		debugger;
		return (
			<>
				<div class="flex middle">
					<aButton class="mb10" onClick={this.addRow}>
						添加一行
					</aButton>
					<xGap f="1" />
					<a class="mb10 mr10" onClick={this.openBulkValuesDialog}>
						批量添加
					</a>
				</div>
				<div style={{ height: "300px" }}>
					<xVirTable configs={this.configs_table} class="flex1 width100 " />
				</div>
			</>
		);
	}
});
