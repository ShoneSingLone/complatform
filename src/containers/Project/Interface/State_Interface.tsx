import { reactive } from "vue";
import { _ } from "@ventose/ui";
import { API } from "../../../api";
import { Cpt_currProject } from "../../../state/State_App";

const defautlValue = () => ({ list: [] });

export function resetStateInterface() {
	_.map(defautlValue(), (value, prop) => {
		State_Interface[prop] = value;
	});
	return State_Interface;
}

const _State_Interface = defautlValue();

export const State_Interface = reactive(_State_Interface);

export const Methods_Interface = {
	async updateInterfaceMenuList() {
		const { data } = await API.project.fetchInterfaceListMenu(
			Cpt_currProject.value._id
		);
		if (data) {
			State_Interface.list = data;
		}
	}
};
