import { computed, getCurrentInstance, reactive, watch } from "vue";
import { xU, stateUI, setDocumentTitle, xScope } from "@/ventose/ui";
import { API } from "@/api/index";
import { cptRouter } from "@/router/router";
import { sortTreeByOrder } from "@/utils/common";
import { GROUP, PROJECT } from "@/utils/variable";

const defautlValue = ({ ctx }: any = {}) => {
	const belongType = (() => {
		if (ctx?.$props?.belongType) {
			/* 以组价形式引入 */
			return ctx.$props.belongType;
		} else {
			/* 以route-view 形式引入 */
			const [_, belong_type] =
				String(cptRouter.value.pathname).match(/\/wiki_(.*)/) || [];
			if (belong_type) {
				return belong_type;
			} else {
				return "";
			}
		}
	})();

	return {
		treeData: [],
		isLoading: false,
		allWiki: {},
		currentWiki: {},
		/* 左侧 树 展开 */
		expandedKeys: [],
		belongType
	};
};

const _stateWiki = defautlValue();
type t_stateWiki = typeof _stateWiki;
export var stateWiki = xScope<t_stateWiki>(_stateWiki);

export const Methods_Wiki = {
	clickWiki(query) {
		/*vm.cptRouter.go("/wiki", { wiki_id: item.data._id });*/
		const { query: oldQuery, refresh } = cptRouter.value;

		refresh(xU.merge({}, oldQuery, query));
	},
	setExpandedKeys: xU.debounce(async _id => {
		const expandedKeys = new Set(stateWiki.expandedKeys);
		let currentWiki = stateWiki.allWiki[_id];
		while (currentWiki) {
			expandedKeys.add(currentWiki._id);
			if (currentWiki.p_id !== 0) {
				currentWiki = stateWiki.allWiki[currentWiki.p_id];
			} else {
				currentWiki = null;
			}
		}
		stateWiki.expandedKeys = [...expandedKeys];
		stateWiki.isLoading = false;
		/*  */
	}, 1000),
	/**
	 *
	 * 如果提供item，则不需要查，直接赋值
	 * @param {any} _id
	 * @param {*} [item]
	 * @returns
	 */
	async setCurrentWiki(_id?: any, item?: any) {
		try {
			xU.loading(true);
			if (!xU.isInput(_id)) {
				_id = cptRouter.value.query.wiki_id;
				if (!_id) {
					_id = stateWiki.treeData?.[0]?._id;
					if (!_id) {
						return;
					} else {
						Methods_Wiki.clickWiki({ wiki_id: _id });
						return;
					}
				}
			}
		} catch (e) {
			console.error(e);
		} finally {
			xU.loading();
		}
		try {
			xU.loading(true);
			if (item) {
				stateWiki.currentWiki = item;
				Methods_Wiki.setExpandedKeys(item._id);
				return;
			} else {
				const { data } = await API.wiki.detail(_id);
				if (data) {
					stateWiki.currentWiki = data;
					Methods_Wiki.setExpandedKeys(_id);
				} else {
					stateWiki.currentWiki = {};
				}
			}
		} catch (error) {
			console.error(error);
		} finally {
			xU.loading();
		}
	},
	async updateWikiMenuList() {
		const { group_id, project_id } = cptRouter.value.query || {};

		let belong_id;
		if (stateWiki.belongType === GROUP) {
			belong_id = group_id;
		}
		if (stateWiki.belongType === PROJECT) {
			belong_id = project_id;
		}

		const { data } = await API.wiki.menu({
			belong_type: stateWiki.belongType,
			belong_id
		});
		const { list, orderArray } = data;
		stateWiki.treeData = buildTree(list, orderArray);
		Methods_Wiki.setCurrentWiki();
	}
};

watch(
	() => stateWiki?.currentWiki?.title,
	() => {
		setDocumentTitle(`文档-${stateWiki.currentWiki?.title}`);
	}
);
watch(
	() => cptRouter.value.query.wiki_id,
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
	stateWiki.allWiki = xU.reduce(
		dataArray,
		(target, i) => {
			target[i._id] = i;
			return target;
		},
		{}
	);

	xU.each(stateWiki.allWiki, function (item) {
		if (!item) return;
		const parent = stateWiki.allWiki[item.p_id];
		if (parent) {
			if (!xU.isArray(parent.children)) {
				parent.children = [];
			}
			parent.children.push(item);
		}
	});

	let tree = xU.filter(stateWiki.allWiki, item => item.p_id === 0);
	if (xU.isArrayFill(orderArray)) {
		tree = sortTreeByOrder(tree, orderArray);
	}
	console.timeEnd("buildTree");
	return tree;
}
