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
	allWiki: {},
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
	setExpandedKeys: xU.debounce(async _id => {
		const expandedKeys = new Set(State_Wiki.expandedKeys);
		let currentWiki = State_Wiki.allWiki[_id];
		while (currentWiki) {
			expandedKeys.add(currentWiki._id);
			if (currentWiki.p_id !== 0) {
				currentWiki = State_Wiki.allWiki[currentWiki.p_id];
			} else {
				currentWiki = null;
			}
		}
		State_Wiki.expandedKeys = [...expandedKeys];
		/*  */
	}, 100),
	/**
	 * 
	 * 如果提供item，则不需要查，直接赋值
	 * @param {any} _id 
	 * @param {*} [item] 
	 * @returns 
	 */
	async setCurrentWiki(_id, item?: any) {
		if (!xU.isInput(_id)) {
			return;
		}
		if (item) {
			State_Wiki.currentWiki = item;
			Methods_Wiki.setExpandedKeys(item._id);
			return;
		}
		const { data } = await API.wiki.action({
			action: "detail",
			_id
		});
		if (data) {
			State_Wiki.currentWiki = data;
			Methods_Wiki.setExpandedKeys(_id);
		}
	},
	async updateWikiMenuList() {
		const { data } = await API.wiki.menu();
		State_Wiki.treeData = buildTree(data.list);
	}
};

function buildTree(dataArray) {
	/* findChildren */
	State_Wiki.allWiki = xU.reduce(
		dataArray,
		(target, i) => {
			target[i._id] = i;
			return target;
		},
		{}
	);

	xU.each(State_Wiki.allWiki, function (item) {
		if (!item) return;

		const parent = State_Wiki.allWiki[item.p_id];
		if (parent) {
			if (!xU.isArray(parent.children)) {
				parent.children = [];
			}
			parent.children.push(item);
		}
	});
	const tree = xU.filter(State_Wiki.allWiki, item => item.p_id === 0);
	return tree;
}
