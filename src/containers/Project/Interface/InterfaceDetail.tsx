import { defineComponent, ref, watch } from "vue";
import { $, xU, UI } from "@ventose/ui";
import { DialogUpsertCategory } from "./DialogUpsertCategory";
import { usefnObserveDomResize } from "../../../compositions/useDomResize";
import { API } from "../../../api";
import { Cpt_currProject } from "../../../state/State_App";
import { ALL } from "../../../utils/variable";
import { Methods_Interface, State_Project } from "./State_Project";

export const InterfaceDetail = defineComponent({
	setup() {
		return { State_Interface: State_Project };
	},
	data(vm) {
		return {
			activeKey: "1"
		}
	},
	render() {
		return <xView>
			<a-card class="width100">
				{{
					title() {
						return <div>基本信息</div>
					},
					default() {
						return <>
							<p>card content</p>
							<p>card content</p>
							<p>card content</p>
						</>
					}
				}}
			</a-card>
		</xView>
	}
});
