import { defCol, defItem, defXVirTableConfigs, xU } from "@ventose/ui";
import { State_Project } from "src/containers/Project/Interface/State_Project";
import { Cpt_url } from "src/router/router";
import { ITEM_OPTIONS, ITEM_OPTIONS_VDOM } from "src/utils/common.options";
import { defineComponent } from "vue";

function newFormData() {
	return {
		key: xU.genId("bodyFormParams"),
		name: "",
		type: "text",
		required: "1",
		desc: "",
		example: ""
	};
}

export const BodyParamsForm = defineComponent({
	props: ["params"],
	watch: {
		"params.req_body_form": {
			immediate: true,
			handler(formDataArray) {
				this.resetDataForm(formDataArray);
			}
		}
	},
	methods: {
		addRow() {
			const formDataArray = xU.cloneDeep(this.configs_table.dataSource);
			formDataArray.unshift(newFormData());
			this.configs_table.dataSource = formDataArray;
		},
		deleteRow(index) {
			const formDataArray = xU.cloneDeep(this.configs_table.dataSource);
			formDataArray.splice(index, 1);
			this.configs_table.dataSource = formDataArray;
		},
		setTableValue(key, prop, val) {
			debugger;
			const recordIndex = xU.findIndex(this.configs_table.dataSource, { key });
			if (~recordIndex) {
				this.configs_table.dataSource[recordIndex][prop] = val;
			}
		},
		resetDataForm(newFormDataArray) {
			this.configs_table.dataSource = xU.map(newFormDataArray, i => {
				i.key = xU.genId("key");
				return i;
			});
		}
	},
	data(vm) {
		return {
			configsItem: {
				...defItem({
					prop: "name",
					itemWrapperClass: "input-width100",
					onAfterValueEmit: (val, { xItemVm }) => {
						vm.setTableValue(xItemVm.$attrs.recordKey, "name", val);
					}
				})
			},
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
						label: vm.$t("名称").label,
						prop: "name",
						renderCell: ({ record }) => {
							/* @ts-ignore */
							return (
								<xItem
									recordKey={record.key}
									configs={vm.configsItem.name}
									v-model={record.name}
								/>
							);
						}
					})
				}
			})
		};
	},
	render() {
		return (
			<>
				<pre>
					<code> {JSON.stringify(this.configs_table.dataSource, null, 2)}</code>
				</pre>
				<div style={{ height: "300px" }}>
					<xVirTable configs={this.configs_table} class="flex1 width100 " />
				</div>
				<aButton class="width100" type="dashed" onClick={this.addRow}>
					<xIcon icon="add" />
				</aButton>
			</>
		);
	}
});
