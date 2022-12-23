import {
	compileVNode,
	defCol,
	defItem,
	defXVirTableConfigs,
	UI,
	xU
} from "@ventose/ui";
import { State_Project } from "src/containers/Project/Interface/State_Project";
import { Cpt_url } from "src/router/router";
import { ITEM_OPTIONS, ITEM_OPTIONS_VDOM } from "src/utils/common.options";
import { defineComponent, markRaw, reactive } from "vue";
import { DialogBulkValues } from "./DialogBulkValues";

function newFormData([name, value] = ["", ""]) {
	return {
		_id: xU.genId("req_header_item"),
		name,
		value,
		example: "",
		required: "1",
		desc: "",
	};
}

const STRATEGY_CELL_ITEM_CONFIGS = {
	name: {},
	value: {},
	example: {},
	desc: {}
};
const BODY_PARAM_PROP_ARRAY = Object.keys(STRATEGY_CELL_ITEM_CONFIGS);

/* virTable 的 renderCell 缓存标识 ,关键是唯一，具体是啥无所谓，所以这里不用过分考虑顺序*/
const [ID_NAME, ID_TYPE, ID_REQUIRED, ID_RECORD, ID_DESC, ID_OPERATIONS] = [
	...BODY_PARAM_PROP_ARRAY,
	"ID_OPERATIONS"
].map(xU.genId);

export const HeaderParamsForm = defineComponent({
	props: ["reqHeaders"],
	emits: ["update:reqHeaders"],
	watch: {
		"reqHeaders": {
			immediate: true,
			handler(formDataArray) {
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
			this.syncFormDataFromConfigs();
			this.configs_table.dataSource.unshift(newFormData());
		},
		deleteRow(_id) {
			const index = xU.findIndex(this.configs_table.dataSource, { _id });
			if (~index) {
				this.syncFormDataFromConfigs();
				this.configs_table.dataSource.splice(index, 1);
			}
		},
		syncFormDataFromConfigs() {
			xU.each(this.configs_table.dataSource, rowData => {
				xU.each(BODY_PARAM_PROP_ARRAY, prop => {
					rowData[prop] = rowData[`configs_${prop}`].value;
				});
			});
			debugger;
			this.$emit("update:reqHeaders", this.configs_table.dataSource);
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
						renderCell: ({ record }) => compileVNode(
							`<xItem :configs="record.configs_name" />`,
							{ record },
							`${ID_NAME}${record._id}`
						)

					}),
					...defCol({
						label: vm.$t("参数值").label,
						prop: "value",
						renderCell: ({ record }) =>
							compileVNode(
								`<xItem :configs="record.configs_value" />`,
								{ record },
								`${ID_RECORD}${record._id}`
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
