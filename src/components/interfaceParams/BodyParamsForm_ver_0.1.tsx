import { defCol, defItem, defXVirTableConfigs, xU } from "@ventose/ui";
import { State_Project } from "@/containers/Project/Interface/State_Project";
import { Cpt_url } from "@/router/router";
import { ITEM_OPTIONS, ITEM_OPTIONS_VDOM } from "@/utils/common.options";
import { defineComponent } from "vue";

/* bug:性能问题 */

function newFormData() {
	return {
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
			const formDataArray = xU.cloneDeep(this.params.req_body_form);
			formDataArray.unshift(newFormData());
			this.params.req_body_form = formDataArray;
		},
		deleteRow(index) {
			const formDataArray = xU.cloneDeep(this.params.req_body_form);
			formDataArray.splice(index, 1);
			this.params.req_body_form = formDataArray;
		},
		setTableValue(rowIndex, prop, val) {
			this.configs_table.dataSource[rowIndex][prop] = val;
		},
		resetDataForm(newFormDataArray) {
			this.dataForm = xU.reduce(
				newFormDataArray,
				(dataForm, rowItem, rowIndex) => {
					dataForm[rowIndex] = {
						id: xU.genId("bodyFormParams"),
						name: defItem.item({
							rowIndex,
							prop: "name",
							itemWrapperClass: "input-width100",
							value: rowItem.name,
							onAfterValueEmit: val => {
								this.setTableValue(rowIndex, "name", val);
							}
						}),
						type: defItem.item({
							rowIndex,
							prop: "type",
							itemType: "Select",
							itemWrapperClass: "input-width100",
							options: ITEM_OPTIONS.interfaceBodyFormType,
							value: rowItem.type,
							onAfterValueEmit: val => {
								this.setTableValue(rowIndex, "type", val);
							}
						}),
						required: defItem.item({
							rowIndex,
							prop: "required",
							itemType: "Select",
							itemWrapperClass: "input-width100",
							options: ITEM_OPTIONS.required,
							value: rowItem.required,
							onAfterValueEmit: val => {
								this.setTableValue(rowIndex, "required", val);
							}
						}),
						example: defItem.item({
							rowIndex,
							prop: "example",
							itemWrapperClass: "input-width100",
							value: rowItem.example,
							onAfterValueEmit: val => {
								this.setTableValue(rowIndex, "example", val);
							}
						}),
						desc: defItem.item({
							rowIndex,
							prop: "desc",
							itemWrapperClass: "input-width100",
							value: rowItem.desc,
							onAfterValueEmit: val => {
								this.setTableValue(rowIndex, "desc", val);
							}
						})
					};
					return dataForm;
				},
				{}
			);
			this.configs_table.dataSource = newFormDataArray;
		}
	},
	data(vm) {
		return {
			dataForm: {},
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
						renderCell: ({ index }) => (
							<xItem
								key={vm.dataForm[index].id}
								configs={vm.dataForm[index].name}
							/>
						)
					}),
					...defCol({
						label: vm.$t("类型").label,
						prop: "type",
						width: "100px",
						renderCell: ({ index }) => (
							<xItem
								key={vm.dataForm[index].id}
								configs={vm.dataForm[index].type}
							/>
						)
					}),
					...defCol({
						label: vm.$t("必需").label,
						prop: "required",
						width: "110px",
						renderCell: ({ index }) => (
							<xItem
								key={vm.dataForm[index].id}
								configs={vm.dataForm[index].required}
							/>
						)
					}),
					...defCol({
						label: vm.$t("示例").label,
						prop: "example",
						renderCell: ({ index }) => (
							<xItem
								key={vm.dataForm[index].id}
								configs={vm.dataForm[index].example}
							/>
						)
					}),
					...defCol({
						label: vm.$t("备注").label,
						prop: "desc",
						renderCell: ({ index }) => (
							<xItem
								key={vm.dataForm[index].id}
								configs={vm.dataForm[index].desc}
							/>
						)
					}),
					...defCol({
						label: vm.$t("操作").label,
						prop: "operations",
						width: "40px",
						renderHeader: () => null,
						renderCell: ({ index }) => (
							<xIcon
								icon="delete"
								class="pointer"
								onClick={() => vm.deleteRow(index)}
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
