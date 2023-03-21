import { reactive, watch } from "vue";
import { xU, State_UI, defCol, defXVirTableConfigs } from "@ventose/ui";
import { API } from "@/api/index";
import { ITEM_OPTIONS, ITEM_OPTIONS_VDOM } from "@/utils/common.options";
import { Cpt_url } from "@/router/router";
import { State_App } from "@/state/State_App";

const { $t } = State_UI;
const defautlValue = () => ({
	treeData: [],
	isLoading: false,
	allWiki: [],
	currentWiki: {},
	/* 左侧 树 展开 */
	expandedKeys: []
});

export function resetStateWiki() {
	xU.map(defautlValue(), (value, prop) => {
		State_Wiki[prop] = value;
	});
	return State_Wiki;
}

const _State_Wiki = defautlValue();

export const State_Wiki = reactive(_State_Wiki);

export const Methods_Wiki = {
	async setCurrentWiki(_id) {
		const { data } = await API.wiki.action({
			action: "detail",
			_id
		});
		State_Wiki.currentWiki = data;
	},
	async updateWikiMenuList() {
		const { data } = await API.wiki.action({
			action: "list"
		});
		State_Wiki.treeData = data.list;
	}
};
