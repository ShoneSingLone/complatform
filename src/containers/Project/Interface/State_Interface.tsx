import { computed, reactive } from "vue";
import { _, State_UI } from "@ventose/ui";
import { API } from "../../../api";
import { Cpt_currProject } from "../../../state/State_App";
import { ALL } from "../../../utils/variable";

const DefaultMenu = [
	{
		_id: ALL,
		title: State_UI.$t("全部接口").label
	}
];

const defautlValue = () => ({
	list: [],
	filterText: "",
	allInterface: [],
	allTags: [],
	allCategory: []
});

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
			/* @ts-ignore */
			const allCategory = data.map(i => ({
				...i,
				isCategory: true,
				title: i.name,
				value: i._id,
				label: i.name
			}));
			State_Interface.allCategory = allCategory;
			State_Interface.allInterface = _.reduce(
				allCategory,
				(dataSource, i) => {
					if (_.isArrayFill(i.list)) {
						dataSource = dataSource.concat(i.list);
					}
					return dataSource;
				},
				[]
			);
			const _allTags = _.reduce(
				State_Interface.allInterface,
				(allTags, i) => {
					return allTags.concat(i.tag);
				},
				[]
			);
			State_Interface.allTags = _.uniqBy(_allTags);
			return State_Interface.allCategory;
		}
	}
};

export const Cpt_interfaceMenuForShow = computed(() => {
	let menulListFilted = _.cloneDeep(State_Interface.allCategory);
	if (!_.isArrayFill(menulListFilted)) {
		return DefaultMenu;
	}
	menulListFilted = DefaultMenu.concat(menulListFilted);
	if (State_Interface.filterText) {
		const reg = new RegExp(State_Interface.filterText, "i");
		menulListFilted = _.filter(menulListFilted, category => {
			if (category._id === ALL) {
				return true;
			}
			/* 处理分类：name */
			let isOk = reg.test(category.name);
			if (isOk) {
				return true;
			}
			/* 处理分类：desc */
			isOk = reg.test(category.desc);
			if (isOk) {
				return true;
			}
			if (_.isArrayFill(category.list)) {
				/* 过滤符合条件的接口 */
				category.list = _.filter(category.list, i => {
					let isOk = reg.test(i.title);
					if (isOk) {
						return true;
					}
					isOk = reg.test(i.path);
					if (isOk) {
						return true;
					}
					return false;
				});
				/* 有符合条件的接口，category予以展示 */
				if (_.isArrayFill(category.list)) {
					return true;
				}
			}

			return false;
		});
	}

	const _interfaceListForShow = _.map(menulListFilted, category => {
		/* category 使用的是name */
		if (category.name) {
			category.title = category.name;
			category.isCategory = true;
			category.list = _.map(category.list, i => {
				return {
					...i,
					categoryName: category.title,
					categoryId: category._id
				};
			});
		}
		return category;
	});

	return _interfaceListForShow;
});
