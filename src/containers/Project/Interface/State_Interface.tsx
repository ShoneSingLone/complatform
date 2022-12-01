import { computed, reactive, ref } from "vue";
import {
	$,
	_,
	UI,
	State_UI,
	defCol,
	defineXVirTableConfigs
} from "@ventose/ui";
import { API } from "../../../api";
import { Cpt_currProject } from "../../../state/State_App";
import { ALL } from "../../../utils/variable";
import { ITEM_OPTIONS, ITEM_OPTIONS_VDOM } from "../../../utils/common.options";
const { $t } = State_UI;

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
	allCategory: [],
	/* 左侧 树 展开 */
	expandedKeys: []
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

export function useInterfaceTableConfigs(isAll = false) {
	const isLoading = ref(false);
	const filterParams = reactive({
		name: "",
		path: "",
		catid: [],
		status: "",
		tag: []
	});

	const configs_interfaceTable = reactive(
		defineXVirTableConfigs({
			rowHeight: 72,
			dataSource: [],
			selectedConfigs: {
				prop: "_id"
			},
			columns: {
				...(() => {
					if (isAll) {
						return defCol({
							label: "接口分类",
							prop: "catid",
							renderHeader({ label }) {
								return (
									<div class="flex">
										<span class="flex1">
											<span>{label}</span>
											{_.isArrayFill(filterParams.catid) ? (
												<aTag class="ml10">{filterParams.catid.length}</aTag>
											) : null}
										</span>
										<aPopover placement="bottomRight" trigger="click">
											{{
												default() {
													return <xIcon icon="iconFilter" class="pointer" />;
												},
												content() {
													return (
														<div style="padding: 8px">
															<aSelect
																allowClear
																mode="multiple"
																style="min-width: 400px"
																v-model:value={filterParams.catid}
																class="select">
																{_.map(State_Interface.allCategory, i => {
																	return (
																		<aSelectOption value={i.value}>
																			<span class={"tag-status " + i.value}>
																				{i.label}
																			</span>
																		</aSelectOption>
																	);
																})}
															</aSelect>
														</div>
													);
												}
											}}
										</aPopover>
									</div>
								);
							},
							renderCell({ cell }) {
								const item = _.find(State_Interface.allCategory, {
									value: cell
								});
								return item ? (
									<span class={"ml10 tag-status " + item.value}>
										{item.label}
									</span>
								) : null;
							}
						});
					}
					return {};
				})(),
				...defCol({
					label: "接口名称",
					prop: "title",
					renderHeader({ label }) {
						return (
							<div class="flex">
								<span class="flex1">
									<span>{label}</span>
									{_.isInput(filterParams.title) ? (
										<aTag color="cyan" class="ml10">
											{filterParams.title}
										</aTag>
									) : null}
								</span>
								<aPopover placement="bottomRight" trigger="click">
									{{
										default() {
											return <xIcon icon="iconFilter" class="pointer" />;
										},
										content() {
											return (
												<div style="padding: 8px">
													<aTextarea
														auto-size={{ minRows: 3, maxRows: 5 }}
														placeholder={$t("接口名称").label}
														v-model:value={filterParams.title}
														allowClear
														style="width: 400px"
													/>
												</div>
											);
										}
									}}
								</aPopover>
							</div>
						);
					},
					renderCell({ records, cell, index }) {
						return <a>{cell}</a>;
					}
				}),
				...defCol({
					label: "请求方法",
					prop: "method",
					width: "100px",
					minWidth: "100px",
					renderCell({ cell }) {
						return (
							<div class="flex end width100">
								{ITEM_OPTIONS_VDOM.httpMethod(cell)}
							</div>
						);
					}
				}),
				...defCol({
					label: "接口路径",
					prop: "path",
					renderHeader({ label }) {
						return (
							<div class="flex">
								<span class="flex1">
									<span>{label}</span>
									{_.isInput(filterParams.path) ? (
										<aTag color="cyan" class="ml10">
											{filterParams.path}
										</aTag>
									) : null}
								</span>
								<aPopover placement="bottomRight" trigger="click">
									{{
										default() {
											return <xIcon icon="iconFilter" class="pointer" />;
										},
										content() {
											return (
												<div style="padding: 8px">
													<aTextarea
														auto-size={{ minRows: 3, maxRows: 5 }}
														placeholder={$t("接口路径").label}
														v-model:value={filterParams.path}
														allowClear
														style="min-width: 400px"
													/>
												</div>
											);
										}
									}}
								</aPopover>
							</div>
						);
					},
					renderCell({ cell }) {
						return (
							<p
								class="ellipsis"
								v-uiPopover={{ onlyEllipsis: true }}
								key={cell}>
								{" "}
								{cell}
							</p>
						);
					}
				}),
				...defCol({
					label: "状态",
					prop: "status",
					width: "160px",
					renderHeader({ label }) {
						const item = _.find(ITEM_OPTIONS.interfaceStatus, {
							value: filterParams.status
						});

						return (
							<div class="flex">
								<span class="flex1">
									<span>{label}</span>
									{item ? (
										<span class={"ml10 tag-status " + item.value}>
											{item.label}
										</span>
									) : null}
								</span>
								<aPopover placement="bottomRight" trigger="click">
									{{
										default() {
											return <xIcon icon="iconFilter" class="pointer" />;
										},
										content() {
											return (
												<div style="padding: 8px">
													<aSelect
														allowClear
														style="min-width: 100px"
														v-model:value={filterParams.status}
														class="select">
														{_.map(ITEM_OPTIONS.interfaceStatus, i => {
															return (
																<aSelectOption value={i.value}>
																	<span class={"tag-status " + i.value}>
																		{i.label}
																	</span>
																</aSelectOption>
															);
														})}
													</aSelect>
												</div>
											);
										}
									}}
								</aPopover>
							</div>
						);
					},
					renderCell({ cell }) {
						const item = _.find(ITEM_OPTIONS.interfaceStatus, {
							value: cell
						});
						return item ? (
							<span class={"ml10 tag-status " + item.value}>{item.label}</span>
						) : null;
					}
				}),
				...defCol({
					label: "tag",
					prop: "tag",
					renderHeader({ label }) {
						return (
							<div class="flex">
								<span class="flex1">
									<span>{label}</span>
									{_.isArrayFill(filterParams.tag) ? (
										<aTag class="ml10">{filterParams.tag.length}</aTag>
									) : null}
								</span>
								<aPopover placement="bottomRight" trigger="click">
									{{
										default() {
											return <xIcon icon="iconFilter" class="pointer" />;
										},
										content() {
											return (
												<div style="padding: 8px">
													<aSelect
														allowClear
														mode="multiple"
														style="width: 400px"
														v-model:value={filterParams.tag}
														class="select">
														{_.map(State_Interface.allTags, i => {
															return (
																<aSelectOption value={i}>{i}</aSelectOption>
															);
														})}
													</aSelect>
												</div>
											);
										}
									}}
								</aPopover>
							</div>
						);
					},
					renderCell({ cell }) {
						return (
							<>
								{_.map(cell, i => (
									<aTag color="blue">{i}</aTag>
								))}
							</>
						);
					}
				})
			}
		})
	);

	const fnUpdateListForShow = _.debounce(function () {
		const { allInterface } = State_Interface;
		let interfaceForShow = _.isArrayFill(allInterface) ? allInterface : [];
		let paramKeys = Object.keys(filterParams);
		let prop = paramKeys.pop();
		while (prop) {
			const search = filterParams[prop];
			if (_.isInput(search)) {
				console.log("interfaceForShow.length", interfaceForShow.length);
				interfaceForShow = _.filter(interfaceForShow, i => {
					if (prop == "status") {
						return i.status === search;
					} else if (prop == "catid") {
						return search.includes(i.catid);
					} else if (prop == "tag") {
						return _.some(i.tag, tag => search.includes(tag));
					} else {
						return new RegExp(search, "i").test(i[prop]);
					}
				});
				console.log("interfaceForShow.length", interfaceForShow.length);
			}
			prop = paramKeys.pop();
		}
		configs_interfaceTable.dataSource = _.sortBy(interfaceForShow, [
			"catid",
			"title",
			"method",
			"path",
			"status",
			"tag"
		]);
		isLoading.value = false;
	}, 500);

	return {
		isLoading,
		filterParams,
		configs_interfaceTable,
		fnUpdateListForShow
	};
}
