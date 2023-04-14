import { markRaw, reactive, watch } from "vue";
import { xU, State_UI, setDocumentTitle } from "@ventose/ui";
import { API } from "@/api/index";
import { Cpt_url } from "@/router/router";
import { sortTreeByOrder } from "@/utils/common";
import { buildTree } from "../Wiki/State_Wiki";

const methods = markRaw({
	setExpandedKeys: xU.debounce(async _id => {
		const expandedKeys = new Set(stateI18n.expandedKeys);
		let currentWiki = stateI18n.allRecords[_id];
		while (currentWiki) {
			expandedKeys.add(currentWiki._id);
			if (currentWiki.p_id !== 0) {
				currentWiki = stateI18n.allRecords[currentWiki.p_id];
			} else {
				currentWiki = null;
			}
		}
		stateI18n.expandedKeys = [...expandedKeys];
		stateI18n.isLoading = false;
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
			stateI18n.currentWiki = item;
			Methods_Wiki.setExpandedKeys(item._id);
			return;
		} else {
			const { data } = await API.wiki.action({
				action: "detail",
				_id
			});
			if (data) {
				stateI18n.currentWiki = data;
				Methods_Wiki.setExpandedKeys(_id);
			}
		}
	}
});

export const stateI18n = reactive(
	newReactiveState({
		isLoading: false,
		treeData: [],
		allRecords: {},
		currentWiki: {},
		/* 左侧 树 展开 */
		expandedKeys: [],
		async _$updateList(payload) {
			const { data } = await API.wiki.menu(payload);
			const { list, orderArray } = data;
			stateI18n.treeData = buildTree(list, orderArray);
		}
	})
);

type t_ReactiveState = {
	/* 重置state，除了_$开通的函数 */
	_$resetSelf: Function;
};

/**
 * state 状态管理，state尽量使用原始类型
 * methods以 _$ 开头
 * @param stateAndMethods
 * @returns
 */
function newReactiveState<T>(stateAndMethods: T): T & t_ReactiveState {
	/* 记录默认的初始值 */
	/* @ts-ignore */
	const __defaultValues = {};

	xU.each(stateAndMethods as any, (value: any, prop: string) => {
		if (value) {
			const valueType = typeof value;
			let isFunction = valueType == "function";
			if (isFunction) {
				isFunction = /^_\$/.test(prop);
				if (isFunction) {
					stateAndMethods[prop] = markRaw(value);
					return;
				}
			}
		}
		try {
			/* 所有非function prop:state中尽量使用原始类型数据*/
			/* @ts-ignore */
			__defaultValues[prop] = xU.cloneDeep(value);
		} catch (error) {
			console.error(error);
		}
	});

	/* @ts-ignore */
	stateAndMethods.__defaultValues = markRaw(__defaultValues);
	/* @ts-ignore */
	stateAndMethods._$resetSelf = markRaw(function () {
		/* @ts-ignore */
		xU.map(stateAndMethods.__defaultValues, (value, prop) => {
			stateAndMethods[prop] = value;
		});
	});

	/* @ts-ignore */
	return stateAndMethods;
}
