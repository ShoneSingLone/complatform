import { defineComponent, ref, watch } from "vue";
import {
	$,
	_,
	UI,
	State_UI,
	defCol,
	defineXVirTableConfigs
} from "@ventose/ui";
import { DialogAddCategory } from "./DialogAddCategory";
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
		const {
			isLoading,
			filterParams,
			configs_interfaceTable,
			fnUpdateListForShow
		} = useInterfaceTableConfigs(true);

		return {
			isLoading,
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
			handler(allInterface) {
				debugger;
				this.isLoading = true;
				this.fnUpdateListForShow();
			}
		}
	},
	methods: {},
	data() {
		return {};
	},
	render() {
		return (
			<xView class="flex height100 padding20 vertical InterfaceAll-view">
				<div class="Operation mb10">
					<aCard>
						<aButton>{JSON.stringify(this.Cpt)}</aButton>
					</aCard>
				</div>
				<div
					class="elevation-1 padding20 flex1"
					style={{ height: "100px" }}
					v-loading={this.isLoading}>
					<xVirTable
						configs={this.configs_interfaceTable}
						class="flex1 width100 "
					/>
				</div>
			</xView>
		);
	}
});
