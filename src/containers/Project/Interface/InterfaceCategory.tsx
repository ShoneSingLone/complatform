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
	State_Project,
	useInterfaceTableConfigs
} from "./State_Project";
import { ITEM_OPTIONS, ITEM_OPTIONS_VDOM } from "../../../utils/common.options";
import { Cpt_url } from "./../../../router/router";
const { $t } = State_UI;

export const InterfaceCategory = defineComponent({
	setup() {
		const { filterParams, configs_interfaceTable, fnUpdateListForShow } =
			useInterfaceTableConfigs();

		return {
			State_Interface: State_Project,
			Cpt_url,
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
			handler(allInterface) {
				this.State_Interface.isLoading = true;
				this.configs_interfaceTable.selected = [];
				this.fnUpdateListForShow();
				setTimeout(() => {
					this.State_Interface.isLoading = false;
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
	render() {
		return (
			<xView class="InterfaceCategory-view">
				<div class="Operation mb10">
					<aCard>
						<aButton>{JSON.stringify(this.Cpt)}</aButton>
						{this.configs_interfaceTable.selected}
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
