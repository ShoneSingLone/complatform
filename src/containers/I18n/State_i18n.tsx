import { markRaw, onMounted, onUnmounted } from "vue";
import { xU, newReactiveState } from "@/ventose/ui";
import { API } from "@/api";

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
			stateI18n.currentI18n = item;
			Methods_Wiki.setExpandedKeys(item._id);
			return;
		} else {
			const { data } = await API.wiki.action({
				action: "detail",
				_id
			});
			if (data) {
				stateI18n.currentI18n = data;
				Methods_Wiki.setExpandedKeys(_id);
			}
		}
	}
});

export const stateI18n = newReactiveState({
	isLoading: false,
	i18nRecordArray: [],
	allRecords: {},
	currentI18n: {},
	/* 左侧 树 展开 */
	expandedKeys: [],
	async _$updateList(payload = {}) {
		const { data } = await API.god.i18nRecords();
		stateI18n.i18nRecordArray = data;
	},
	/* 详情 */
	async _$updateCurrent(_id: number) {
		const { data } = await API.god.i18nRecordById(_id);
		stateI18n.currentI18n = data;
	},
	/* 详情 */
	async _$deleteI18nRecords(records: any[]) {
		await API.god.deleteI18nRecords(records);
	}
});

export const useStateI18n = () => {
	onMounted(() => stateI18n._$resetSelf());
	onUnmounted(() => stateI18n._$null());
	return stateI18n;
};
