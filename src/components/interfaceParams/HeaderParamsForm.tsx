import {
	compileVNode,
	defCol,
	defItem,
	defXVirTableConfigs,
	UI,
	xU
} from "@/ventose/ui";
import { State_Project } from "@/containers/Project/Interface/State_Project";
import { Cpt_url } from "@/router/router";
import { ITEM_OPTIONS, ITEM_OPTIONS_VDOM } from "@/utils/common.options";
import { defineComponent, markRaw, reactive } from "vue";
import { DialogBulkValues } from "./DialogBulkValues";
import { HTTP_REQUEST_HEADER } from "../../utils/variable";

function newFormData([name, value] = ["", ""]) {
	return {
		_id: xU.genId("req_header_item"),
		name,
		value,
		example: "",
		required: "1",
		desc: ""
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
	watch: {
		reqHeaders: {
			immediate: true,
			handler(formDataArray) {
				this.resetDataForm(formDataArray);
			}
		}
	},
	methods: {
		openBulkValuesDialog() {
			UI.dialog.component({
				title: this.xI("批量添加参数"),
				component: DialogBulkValues,
				formValues: xU.map(this.configs_table.dataSource, i => {
					return {
						key: i.name,
						value: i.value
					};
				}),
				onOk: (formDataArray: any) => {
					this.configs_table.dataSource = xU.map(formDataArray, newFormData);
				}
			});
		},
		addRow() {
			this.configs_table.dataSource.unshift(newFormData());
		},
		deleteRow(_id) {
			const index = xU.findIndex(this.configs_table.dataSource, { _id });
			if (~index) {
				this.configs_table.dataSource.splice(index, 1);
			}
		},
		resetDataForm(newFormDataArray) {
			this.configs_table.dataSource = newFormDataArray;
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
				columns: {
					...defCol({
						label: vm.xI("名称"),
						prop: "name",
						renderEditor: ({ record }) => (
							<aAutoComplete
								options={HTTP_REQUEST_HEADER.map(label => ({
									label,
									value: label
								}))}
								v-model:value={record.name}
							/>
						)
					}),
					...defCol({
						label: vm.xI("参数值"),
						prop: "value",
						renderEditor: ({ record }) => (
							<ElInput v-model:value={record.value} />
						)
					}),
					...defCol({
						label: vm.xI("示例"),
						prop: "example",
						renderEditor: ({ record }) => (
							<ElInput v-model:value={record.example} />
						)
					}),
					...defCol({
						label: vm.xI("备注"),
						prop: "desc",
						renderEditor: ({ record }) => (
							<ElInput v-model:value={record.desc} />
						)
					}),
					...defCol({
						label: vm.xI("操作"),
						prop: "operations",
						width: "40px",
						renderHeader: () => null,
						renderCell: ({ record }) => (
							<xIcon
								icon="delete"
								class="pointer"
								onClick={() => vm.deleteRow(record._id)}
							/>
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
					<xButton class="mb10" onClick={this.addRow}>
						添加一行
					</xButton>
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
