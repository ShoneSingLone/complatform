import { computed, reactive, watch } from "vue";
import { xU, State_UI, setDocumentTitle } from "@ventose/ui";
import { API } from "@/api/index";
import { Cpt_url } from "@/router/router";
import { sortTreeByOrder } from "@/utils/common";

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
		State_Wiki.isLoading = false;
		/*  */
	}, 1000),
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
		} else if (item) {
			State_Wiki.currentWiki = item;
			Methods_Wiki.setExpandedKeys(item._id);
			return;
		} else {
			const { data } = await API.wiki.action({
				action: "detail",
				_id
			});
			if (data) {
				State_Wiki.currentWiki = data;
				Methods_Wiki.setExpandedKeys(_id);
			}
		}
	},
	async updateWikiMenuList(payload) {
		const { data } = await API.wiki.menu(payload);
		const { list, orderArray } = data;
		State_Wiki.treeData = buildTree(list, orderArray);
	}
};

watch(
	() => State_Wiki?.currentWiki?.title,
	() => {
		setDocumentTitle(`文档-${State_Wiki.currentWiki?.title}`);
	}
);
watch(
	() => Cpt_url.value.query.wiki_id,
	_id => {
		if (_id) {
			Methods_Wiki.setCurrentWiki(_id);
		}
	},
	{ immediate: true }
);

export function buildTree(dataArray, orderArray) {
	console.time("buildTree");
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

	let tree = xU.filter(State_Wiki.allWiki, item => item.p_id === 0);
	if (xU.isArrayFill(orderArray)) {
		tree = sortTreeByOrder(tree, orderArray);
	}
	console.timeEnd("buildTree");
	return tree;
}