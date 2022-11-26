import { defineComponent, ref, watch } from "vue";
import { $, _, UI, State_UI, defCol } from "@ventose/ui";
import { DialogAddCategory } from "./DialogAddCategory";
import { usefnObserveDomResize } from "../../../compositions/useDomResize";
import { API } from "../../../api";
import { Cpt_currProject } from "../../../state/State_App";
import { ALL } from "../../../utils/variable";
import {
	Cpt_interfaceMenuForShow,
	Methods_Interface,
	State_Interface
} from "./State_Interface";
const { $t } = State_UI;

export const InterfaceAll = defineComponent({
	setup() {
		return {
			State_Interface
		};
	},
	computed: {},
	watch: {
		"State_Interface.allInterface": {
			immediate: true,
			handler(allInterface) {
				this.configs_allInterface.dataSource = _.isArrayFill(allInterface)
					? allInterface
					: [];
			}
		}
	},
	data() {
		const vm = this;
		return {
			records: {},
			configs_allInterface: {
				rowHeight: 72,
				dataSource: [],
				columns: {
					...defCol({ label: "接口名称", prop: "title" }),
					...defCol({ label: "接口路径", prop: "path" }),
					...defCol({ label: "接口分类", prop: "catid" }),
					...defCol({ label: "状态", prop: "status" }),
					...defCol({ label: "tag", prop: "tag" })
				}
			}
		};
	},
	render() {
		return (
			<xView class="flex height100 padding20" class="InterfaceAll-view">
				<xVirTable configs={this.configs_allInterface} class="flex1 width100" />
			</xView>
		);
	}
});
