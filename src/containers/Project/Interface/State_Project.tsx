import { computed, reactive, ref, watch } from "vue";
import { $, xU, UI, State_UI, defCol, defXVirTableConfigs } from "@ventose/ui";
import { API } from "../../../api";
import { ITEM_OPTIONS, ITEM_OPTIONS_VDOM } from "../../../utils/common.options";
import { Cpt_url } from "../../../router/router";
import { State_App } from "@/state/State_App";

const { $t } = State_UI;
const defautlValue = () => ({
	isLoading: false,
	list: [],
	filterText: "",
	allInterface: [],
	allTags: [],
	allCategory: [],
	/* 左侧 树 展开 */
	expandedKeys: []
});

export function resetStateInterface() {
	xU.map(defautlValue(), (value, prop) => {
		State_Project[prop] = value;
	});
	return State_Project;
}

const _State_Project = defautlValue();

export const State_Project = reactive(_State_Project);

export const Methods_Project = {
	setExpand: xU.debounce(function () {
		const { pathname, query } = Cpt_url.value;
		if ("/project/interface/detail" === pathname) {
			State_Project.expandedKeys = [Number(query.category_id)];
		} else {
			State_Project.expandedKeys = [];
		}
	}, 500),
	resetURL: xU.debounce(function () {
		const { pathname, query } = Cpt_url.value;
		const { category_id, interface_id } = query;
		const fnStrategyMap = {
			"/project/interface/all": () => {
				Cpt_url.value.go(
					"/project/interface/all",
					xU.pick(Cpt_url.value.query, ["group_id", "project_id"])
				);
			},
			"/project/interface/category": () => {
				if (!category_id) {
					fnStrategyMap["/project/interface/all"]();
				}
			},
			"/project/interface/detail": () => {
				if (!interface_id) {
					fnStrategyMap["/project/interface/all"]();
				}
			}
		};

		const fn = fnStrategyMap[pathname];
		if (fn) {
			fn();
		} else {
			fnStrategyMap["/project/interface/all"]();
		}
	}, 100),
	async updateInterfaceMenuList() {
		/* 必然是有当前project的id */
		const projectId = Number(Cpt_url.value?.query?.project_id);
		if (!projectId) {
			debugger;
			console.error("miss project_id in url");
			return;
		}
		const { data } = await API.project.fetchInterfaceListMenu(projectId);
		if (data) {
			/* @ts-ignore */
			const allCategory = data.map(category => {
				const list = xU.map(category.list, i => {
					return {
						...i,
						menuType: "interface",
						categoryName: category.title,
						categoryId: category._id
					};
				});
				return {
					...category,
					list,
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

			State_Project.allCategory = allCategory;
			State_Project.allInterface = xU.reduce(
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
				State_Project.allInterface,
				(allTags, i) => {
					return allTags.concat(i.tag);
				},
				[]
			);
			State_Project.allTags = xU.uniqBy(_allTags);
			return State_Project.allCategory;
		}
	}
};

watch(
	() => {
		const { pathname, query } = Cpt_url.value;
		return pathname + query.category_id;
	},
	() => {
		Methods_Project.setExpand();
	}
);

/*interfaceAll 与 interfaceCategory 同用的列表*/
export function useInterfaceTableConfigs(isAll = false) {
	const filterParams = reactive({
		name: "",
		path: "",
		catid: [],
		status: "",
		tag: [],
		witchEnv: []
	});

	const configs_interfaceTable = reactive(
		defXVirTableConfigs({
			rowHeight: 120,
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
											{xU.isArrayFill(filterParams.catid) ? (
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
																{xU.map(State_Project.allCategory, i => {
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
								const item = xU.find(State_Project.allCategory, {
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
									{xU.isInput(filterParams.title) ? (
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
					renderCell({ record, cell, index }) {
						return (
							<a
								onClick={() => {
									Cpt_url.value.go("/project/interface/detail", {
										...Cpt_url.value.query,
										category_id: record.categoryId,
										interface_id: record._id
									});
								}}>
								{cell}
							</a>
						);
					}
				}),
				...defCol({
					label: "请求方法",
					prop: "method",
					width: "100px",
					minWidth: "100px",
					renderCell({ cell }) {
						return (
							<div class="flex center width100">
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
									{xU.isInput(filterParams.path) ? (
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
						const textLabel = filterParams.status
							? ITEM_OPTIONS_VDOM.status(filterParams.status)
							: label;
						return (
							<div class="flex">
								<span class="flex1">{textLabel}</span>
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
														{xU.map(ITEM_OPTIONS.interfaceStatus, i => {
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
						return (
							<div class="flex center width100">
								{ITEM_OPTIONS_VDOM.status(cell)}
							</div>
						);
					}
				}),
				...defCol({
					label: "转发",
					prop: "isProxy",
					width: "150px",
					renderHeader({ label }) {
						return (
							<div class="flex">
								<span class="flex1">
									<span>{label}</span>
									{xU.isArrayFill(filterParams.witchEnv) ? (
										<aTag class="ml10">{filterParams.witchEnv.length}</aTag>
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
														v-model:value={filterParams.witchEnv}
														class="select">
														<aSelectOption value="unset">{$t('未设置').label}</aSelectOption>
														{xU.map(State_App.currProject.env, i => {
															return (
																<aSelectOption value={i._id}>{i.name}</aSelectOption>
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
					renderCell({ cell: isProxy, record }) {
						if (isProxy) {
							const { witchEnv } = record;
							if (!witchEnv) {
								return "任意";
							}
							if (witchEnv) {
								const envArray = State_App.currProject.env;
								let env = xU.find(envArray, { _id: witchEnv });
								if (env) {
									return (<aTag color="cyan">{env.name}</aTag>);
								}
							} else {
								return "--";
							}
						}
						return "";
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
									{xU.isArrayFill(filterParams.tag) ? (
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
														{xU.map(State_Project.allTags, i => {
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
						return <>{ITEM_OPTIONS_VDOM.tags(cell)}</>;
					}
				})
			}
		})
	);

	const fnUpdateListForShow = xU.debounce(function fnUpdateListForShow() {
		const { allInterface } = State_Project;
		let interfaceForShow = xU.isArrayFill(allInterface) ? allInterface : [];
		let paramKeys = Object.keys(filterParams);
		let prop = paramKeys.pop();
		while (prop) {
			const search = filterParams[prop];
			if (xU.isInput(search)) {
				xU("interfaceForShow.length old", interfaceForShow.length);
				interfaceForShow = xU.filter(interfaceForShow, i => {
					if (prop == "status") {
						return i.status === search;
					} else if (prop == "catid") {
						return search.includes(i.catid);
					} else if (prop == "tag") {
						return xU.some(i.tag, tag => search.includes(tag));
					} else if (prop == "witchEnv") {
						if (search.includes('unset')) {
							if (!i.witchEnv) {
								return true;
							}
						}
						if (!i.isProxy) {
							return false;
						}
						return search.includes(i.witchEnv);
					} else {
						return new RegExp(search, "i").test(i[prop]);
					}
				});
				xU("interfaceForShow.length new", interfaceForShow.length);
			}
			prop = paramKeys.pop();
		}
		configs_interfaceTable.dataSource = interfaceForShow;

		setTimeout(() => {
			State_Project.isLoading = false;
		}, 100);
	}, 500);

	return {
		filterParams,
		configs_interfaceTable,
		fnUpdateListForShow
	};
}
