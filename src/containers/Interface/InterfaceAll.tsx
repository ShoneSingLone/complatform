import { defineComponent } from "vue";

import {
	stateInterface,
	useInterfaceTableConfigs
} from "@/state/interface";
import { xI, xU } from "@/ventose/ui";
import {
	openDialogInterfaceProxyModify,
	openDialogInterfaceStatusModify
} from "./DialogModifyInterface.Helper";

export const InterfaceAll = defineComponent({
	setup() {
		const { filterParams, configs_interfaceTable, fnUpdateListForShow } =
			useInterfaceTableConfigs(true);
		return {
			State_Project: stateInterface,
			filterParams,
			configs_interfaceTable,
			fnUpdateListForShow
		};
	},
	computed: {
		disabled() {
			return !this.configs_interfaceTable.selected.length;
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
	data(vm) {
		return {
			btnChangeStatus: {
				text: xI("变更状态"),
				disabled() {
					return vm.disabled;
				},
				async onClick() {
					openDialogInterfaceStatusModify({
						selected: vm.configs_interfaceTable.selected
					});
				}
			},
			btnChangeProxy: {
				text: xI("变更代理"),
				disabled() {
					return vm.disabled;
				},
				async onClick() {
					openDialogInterfaceProxyModify({
						selected: vm.configs_interfaceTable.selected
					});
				}
			}
		};
	},
	render(vm) {
		return (
			<xView class="Interface-view">
				<div class="Operation mb10">
					<xButton class="mr4" configs={vm.btnChangeStatus} />
					<xButton class="mr4" configs={vm.btnChangeProxy} />
					<xButton class="mr4">{xI("添加Tag")}</xButton>
					<xButton class="mr4">{xI("移除Tag")}</xButton>
				</div>
				<div class="elevation-1 flex1" style={{ height: "100px" }}>
					<xVirTable
						configs={this.configs_interfaceTable}
						class="flex1 width100 "
					/>
				</div>
			</xView>
		);
	}
});
