import { computed, watch } from "vue";
import { xU, xScope, xI } from "@/ventose/ui";
import { API } from "@/api/index";
import { cptRouter } from "@/router/router";
import { ALL } from "@/utils/variable";

const DefaultInterfaceMenu = [
	{
		_id: ALL,
		title: xI("全部接口"),
		menuType: ALL,
		list: []
	}
];

const defautlStateInterface = () => ({
	isLoading: false,
	list: [],
	filterText: "",
	interface_id: ALL,
	currInterface: null,
	allInterface: [],
	allTags: [],
	allCategory: [],
	/* 左侧 树 展开 */
	expandedKeys: [],
	/********************** methods ******************/
	_setExpand: xU.debounce(function () {
		if (cptRouter.value.query.category_id) {
			stateInterface.expandedKeys = [Number(cptRouter.value.query.category_id)];
		} else {
			stateInterface.expandedKeys = [];
		}
	}, 500),
	_resetURL: xU.debounce(function () {
		/* TODO: */
	}, 100),
	async _updateInterfaceMenuList() {
		/* required project_id */
		const projectId = Number(cptRouter.value?.query?.project_id);
		if (!projectId) {
			console.error("miss project_id in url");
			return;
		}
		const { data } = await API.project.fetchInterfaceListMenu(projectId);
		if (data) {
			/* @ts-ignore */
			const allCategory = data.map(category => {
				const children = xU.map(category.list, i => {
					return {
						...i,
						menuType: "interface",
						categoryName: category.title,
						categoryId: i.catid
					};
				});
				return {
					...category,
					children,
					isCategory: true,
					categoryName: category.title,
					categoryId: category._id,
					menuType: "category",
					title: category.name,
					/* 下拉选项 */
					value: category._id,
					label: category.name
				};
			});

			stateInterface.allCategory = allCategory;
			stateInterface.allInterface = xU.reduce(
				allCategory,
				(dataSource, i) => {
					if (xU.isArrayFill(i.list)) {
						dataSource = dataSource.concat(i.list);
					}
					return dataSource;
				},
				[]
			);
			const _allTags = xU.reduce(
				stateInterface.allInterface,
				(allTags, i) => {
					return allTags.concat(i.tag);
				},
				[]
			);
			stateInterface.allTags = xU.uniqBy(_allTags);

			stateInterface._setExpand();
			return stateInterface.allCategory;
		}
	}
});

const _stateInterface = defautlStateInterface();
type t_stateInterface = typeof _stateInterface;

export var stateInterface = xScope<t_stateInterface>(
	_stateInterface,
	defautlStateInterface
);

export const cpt_treeData = computed(() => {
	return DefaultInterfaceMenu.concat(stateInterface.allCategory);
});

watch(
	[cptRouter.value.pathname, cptRouter.value.query?.category_id],
	stateInterface._setExpand
);
