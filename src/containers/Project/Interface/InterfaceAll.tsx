import { defineComponent } from "vue";

import {
	State_Project,
	useInterfaceTableConfigs
} from "./State_Project";

export const InterfaceAll = defineComponent({
	setup() {
		const { filterParams, configs_interfaceTable, fnUpdateListForShow } =
			useInterfaceTableConfigs(true);
		return {
			State_Interface: State_Project,
			filterParams,
			configs_interfaceTable,
			fnUpdateListForShow
		};
	},
	computed: {},
	watch: {
		"State_Interface.allInterface": {
			immediate: true,
			handler() {
				this.fnUpdateListForShow();
			}
		},
		filterParams: {
			deep: true,
			handler() {
				this.State_Interface.isLoading = true;
				this.configs_interfaceTable.selected = [];
				this.fnUpdateListForShow();
			}
		}
	},
	methods: {},
	data() {
		return {};
	},
	render() {
		const vm = this;
		return (
			<xView class="InterfaceAll-view">
				<div class="Operation mb10">
					<xButton>{vm.$t("变更状态").label}</xButton>
					<xButton>{vm.$t("添加Tag").label}</xButton>
					<xButton>{vm.$t("代理变更").label}</xButton>
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
