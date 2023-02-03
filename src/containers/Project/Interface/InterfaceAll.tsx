import { defineComponent } from "vue";

import { State_Project, useInterfaceTableConfigs } from "./State_Project";
import { $t, xU } from "@/devui/ui";
import { openDialogInterfaceProxyModify, openDialogInterfaceStatusModify } from "./DialogModifyInterface.Helper";

export const InterfaceAll = defineComponent({
	setup() {
		const { filterParams, configs_interfaceTable, fnUpdateListForShow } = useInterfaceTableConfigs(true);
		return {
			State_Project,
			filterParams,
			configs_interfaceTable,
			fnUpdateListForShow
		};
	},
	computed: {
		disabled() {
			return !this.configs_interfaceTable.selected.length
		}
	},
	watch: {
		"State_Project.allInterface": {
			immediate: true,
			handler() {
				this.fnUpdateListForShow();
			}
		},
		filterParams: {
			deep: true,
			handler() {
				this.State_Project.isLoading = true;
				this.configs_interfaceTable.selected = [];
				this.fnUpdateListForShow();
			}
		}
	},
	methods: {},
	data() {
		const vm = this;
		return {
			btnChangeStatus: {
				text: $t("变更状态").label,
				disabled() {
					return vm.disabled;
				},
				async onClick() {
					openDialogInterfaceStatusModify({
						selected: vm.configs_interfaceTable.selected,
					})
				}
			},
			btnChangeProxy: {
				text: $t("变更代理").label,
				disabled() {
					return vm.disabled;
				},
				async onClick() {
					openDialogInterfaceProxyModify({
						selected: vm.configs_interfaceTable.selected,
					})
				}
			},
		};
	},
	render() {
		const vm = this;
		return (
			<xView class="Interface-view">
				<div class="Operation mb10">
					<xButton class="mr4" configs={vm.btnChangeStatus} />
					<xButton class="mr4" configs={vm.btnChangeProxy} />
					<xButton class="mr4">{vm.$t("添加Tag").label}</xButton>
					<xButton class="mr4">{vm.$t("移除Tag").label}</xButton>
				</div>
				<div class="elevation-1 padding20 flex1" style={{ height: "100px" }}>
					<xVirTable
						configs={this.configs_interfaceTable}
						class="flex1 width100 "
					/>
				</div>
			</xView>
		);
	}
});
