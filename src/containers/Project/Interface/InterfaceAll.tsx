import { defineComponent, ref, watch } from "vue";
import {
	$,
	xU,
	UI,
	State_UI,
	defCol,
	defXVirTableConfigs
} from "@ventose/ui";
import { DialogUpsertCategory } from "./DialogUpsertCategory";
import { usefnObserveDomResize } from "../../../compositions/useDomResize";
import { API } from "../../../api";
import { Cpt_currProject } from "../../../state/State_App";
import { ALL } from "../../../utils/variable";
import {
	Methods_Interface,
	State_Interface,
	useInterfaceTableConfigs
} from "./State_Interface";

export const InterfaceAll = defineComponent({
	setup() {
		const { filterParams, configs_interfaceTable, fnUpdateListForShow } =
			useInterfaceTableConfigs(true);
		return {
			State_Interface,
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
			<xView class="flex height100 padding20 vertical InterfaceAll-view">
				<div class="Operation mb10">
					<aCard>
						<xButton>{vm.$t("变更状态").label}</xButton>
						<xButton>{vm.$t("添加Tag").label}</xButton>
						<xButton>{vm.$t("开启代理").label}</xButton>
						<xButton>{vm.$t("转发环境").label}</xButton>
					</aCard>
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
