import { defineComponent, ref, watch } from "vue";
import { $, _, UI } from "@ventose/ui";
import { DialogAddCategory } from "./DialogAddCategory";
import { usefnObserveDomResize } from "../../../compositions/useDomResize";
import { API } from "../../../api";
import { Cpt_currProject } from "../../../state/State_App";
import { ALL } from "../../../utils/variable";
import { Methods_Interface, State_Interface } from "./State_Interface";

export const InterfaceDetail = defineComponent({
	render() {
		return <h1>InterfaceDetail</h1>;
	}
});
