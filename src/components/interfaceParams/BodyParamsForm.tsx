import {
	compileVNode,
	defCol,
	defItem,
	defXVirTableConfigs,
	xU
} from "@/ventose/ui";
import { State_Project } from "@/containers/Project/Interface/State_Project";
import { Cpt_url } from "@/router/router";
import { ITEM_OPTIONS, ITEM_OPTIONS_VDOM } from "@/utils/common.options";
import { defineComponent } from "vue";

function newFormData() {
	return {
		_id: xU.genId("body_params"),
		name: "",
		type: "text",
		required: "1",
		desc: "",
		example: ""
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

export const BodyParamsForm = defineComponent({
	props: ["reqBodyForm"],
	watch: {
		reqBodyForm: {
			immediate: true,
			handler(reqBodyForm) {
				this.resetDataForm(reqBodyForm);
			}
		}
	},
	methods: {
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
						`#${tableId} div[role=td] .el-tag{margin:auto;}`,
						`#${tableId} div[role=tr] div[role=th][data-prop=operations]{justify-content:center;}`,
						`#${tableId} div[role=tr] div[role=td][data-prop=operations]{justify-content:center;color:red;}`
					].join("\n"),
				columns: {
					...defCol({
						label: vm.xI("名称"),
						prop: "name",
						renderEditor: ({ record }) => (
							<ElInput v-model:value={record.name} />
						)
					}),
					...defCol({
						label: vm.xI("类型"),
						prop: "type",
						width: "110px",
						renderCell: ({ record }) =>
							ITEM_OPTIONS_VDOM.interfaceBodyFormType(record.type),
						renderEditor: ({ record }) => (
							<ElSelect
								options={ITEM_OPTIONS.interfaceBodyFormType}
								v-model:value={record.type}
							/>
						)
					}),
					...defCol({
						label: vm.xI("必需"),
						prop: "required",
						width: "110px",
						renderCell: ({ record }) =>
							ITEM_OPTIONS_VDOM.required(record.required),
						renderEditor: ({ record }) => (
							<ElSelect
								options={ITEM_OPTIONS.required}
								v-model:value={record.required}
							/>
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
				<xButton class="width100 mb10" type="dashed" onClick={this.addRow}>
					<xIcon icon="add" />
					{/* {JSON.stringify(this.configs_table.dataSource, null, 2)} */}
				</xButton>
				<div style={{ height: "300px" }}>
					<xVirTable configs={this.configs_table} class="flex1 width100 " />
				</div>
			</>
		);
	}
});
