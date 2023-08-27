import { defineComponent } from "vue";
import { Cpt_url } from "@/router/router";
import { stateInterface, useInterfaceTableConfigs } from "@/state/interface";
import { xI } from "@/ventose/ui";
import {
	openDialogInterfaceStatusModify,
	openDialogInterfaceProxyModify
} from "./DialogModifyInterface.Helper";

export const InterfaceCategory = defineComponent({
	setup() {
		const { filterParams, configs_interfaceTable, fnUpdateListForShow } =
			useInterfaceTableConfigs();

		return {
			State_Project: stateInterface,
			Cpt_url,
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
	watch: {
		"State_Project.allInterface": {
			immediate: true,
			handler() {
				this.fnUpdateListForShow();
			}
		},
		filterParams: {
			deep: true,
			handler(allInterface) {
				this.State_Project.isLoading = true;
				this.configs_interfaceTable.selected = [];
				this.fnUpdateListForShow();
				setTimeout(() => {
					this.State_Project.isLoading = false;
				}, 10 * 1000);
			}
		},
		"Cpt_url.query.category_id": {
			immediate: true,
			handler(catid) {
				this.filterParams.catid = [Number(catid)];
			}
		}
	},
	render(vm) {
		return (
			<xView class="Interface-view">
				<div class="Operation mb10">
					<xButton class="mr4" configs={vm.btnChangeStatus} />
					<xButton class="mr4" configs={vm.btnChangeProxy} />
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
