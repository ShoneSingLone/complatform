import { reactive, watch } from "vue";
import { xU, defCol, defXVirTableConfigs, xI } from "@/ventose/ui";
import { API } from "@/api";
import { ITEM_OPTIONS, ITEM_OPTIONS_VDOM } from "@/utils/common.options";
import { cptRouter } from "@/router/router";
import { stateApp } from "@/state/app";

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

const _stateProjectTestcase = defautlValue();

export const stateProjectTestcase = reactive(_stateProjectTestcase);

export const Methods_ProjectTestcase = {
	setExpand: xU.debounce(function () {
		const { pathname, query } = cptRouter.value;
		if (!pathname.includes("/project/testcase")) {
			return;
		}

		if ("/project/testcase/detail" === pathname) {
			stateProjectTestcase.expandedKeys = [Number(query.category_id)];
		} else {
			stateProjectTestcase.expandedKeys = [];
		}
	}, 500),
	resetURL: xU.debounce(function () {
		const { pathname, query } = cptRouter.value;
		if (!pathname.includes("/project/testcase")) {
			return;
		}

		const { category_id, interface_id } = query;
		const fnStrategyMap = {
			"/project/testcase/all": () => {
				cptRouter.value.go(
					"/project/testcase/all",
					xU.pick(cptRouter.value.query, ["group_id", "project_id"])
				);
			},
			"/project/testcase/category": () => {
				if (!category_id) {
					fnStrategyMap["/project/testcase/all"]();
				}
			},
			"/project/testcase/detail": () => {
				if (!interface_id) {
					fnStrategyMap["/project/testcase/all"]();
				}
			}
		};

		const fn = fnStrategyMap[pathname];
		if (fn) {
			fn();
		} else {
			fnStrategyMap["/project/testcase/all"]();
		}
	}, 100),
	async updateTestcaseMenuList() {
		/* 必然是有当前project的id */
		const projectId = Number(cptRouter.value?.query?.project_id);
		if (!projectId) {
			console.error("miss project_id in url");
			return;
		}
		const { data } = await API.testcase.getListBy(projectId);
		if (data) {
			/* @ts-ignore */
			const allCategory = data.map(category => {
				const list = xU.map(category.caseList, i => {
					return {
						...i,
						/*  */
						title: i.casename,
						menuType: "interface",
						categoryName: category.name,
						categoryId: category._id
					};
				});
				return {
					...category,
					list,
					isCategory: true,
					categoryName: category.name,
					categoryId: category._id,
					menuType: "category",
					title: category.name,
					/* 下拉选项 */
					value: category._id,
					label: category.name
				};
			});

			stateProjectTestcase.allCategory = allCategory;
			stateProjectTestcase.allInterface = xU.reduce(
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
				stateProjectTestcase.allInterface,
				(allTags, i) => {
					return allTags.concat(i.tag);
				},
				[]
			);
			stateProjectTestcase.allTags = xU.uniqBy(_allTags);
			return stateProjectTestcase.allCategory;
		}
	}
};

watch(
	() => {
		const { pathname, query } = cptRouter.value;
		return pathname + query.category_id;
	},
	() => {
		Methods_ProjectTestcase.setExpand();
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
												<ElTag class="ml10">{filterParams.catid.length}</ElTag>
											) : null}
										</span>
										<ElPopover placement="bottomRight" trigger="click">
											{{
												default() {
													return <xIcon icon="icon_filter" class="pointer" />;
												},
												content() {
													return (
														<div style="padding: 8px">
															<ElSelect
																clearable
																mode="multiple"
																style="min-width: 400px"
																v-model:value={filterParams.catid}
																class="select">
																{xU.map(stateProjectTestcase.allCategory, i => {
																	return (
																		<aSelectOption value={i.value}>
																			<span class={"tag-status " + i.value}>
																				{i.label}
																			</span>
																		</aSelectOption>
																	);
																})}
															</ElSelect>
														</div>
													);
												}
											}}
										</ElPopover>
									</div>
								);
							},
							renderCell({ cell }) {
								const item = xU.find(stateProjectTestcase.allCategory, {
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
										<ElTag color="cyan" class="ml10">
											{filterParams.title}
										</ElTag>
									) : null}
								</span>
								<ElPopover placement="bottomRight" trigger="click">
									{{
										default() {
											return <xIcon icon="icon_filter" class="pointer" />;
										},
										content() {
											return (
												<div style="padding: 8px">
													<aTextarea
														auto-size={{ minRows: 3, maxRows: 5 }}
														placeholder={xI("用例名称")}
														v-model:value={filterParams.title}
														clearable
														style="width: 400px"
													/>
												</div>
											);
										}
									}}
								</ElPopover>
							</div>
						);
					},
					renderCell({ record, cell, index }) {
						return (
							<a
								onClick={() => {
									cptRouter.value.go("/project/testcase/detail", {
										...cptRouter.value.query,
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
										<ElTag color="cyan" class="ml10">
											{filterParams.path}
										</ElTag>
									) : null}
								</span>
								<ElPopover placement="bottomRight" trigger="click">
									{{
										default() {
											return <xIcon icon="icon_filter" class="pointer" />;
										},
										content() {
											return (
												<div style="padding: 8px">
													<aTextarea
														auto-size={{ minRows: 3, maxRows: 5 }}
														placeholder={xI("接口路径")}
														v-model:value={filterParams.path}
														clearable
														style="min-width: 400px"
													/>
												</div>
											);
										}
									}}
								</ElPopover>
							</div>
						);
					},
					renderCell({ cell }) {
						return (
							<p class="ellipsis" v-xTips={{ onlyEllipsis: true }} key={cell}>
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
								<ElPopover placement="bottomRight" trigger="click">
									{{
										default() {
											return <xIcon icon="icon_filter" class="pointer" />;
										},
										content() {
											return (
												<div style="padding: 8px">
													<ElSelect
														clearable
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
													</ElSelect>
												</div>
											);
										}
									}}
								</ElPopover>
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
										<ElTag class="ml10">{filterParams.witchEnv.length}</ElTag>
									) : null}
								</span>
								<ElPopover placement="bottomRight" trigger="click">
									{{
										default() {
											return <xIcon icon="icon_filter" class="pointer" />;
										},
										content() {
											return (
												<div style="padding: 8px">
													<ElSelect
														clearable
														mode="multiple"
														style="width: 400px"
														v-model:value={filterParams.witchEnv}
														class="select">
														<aSelectOption value="unset">
															{xI("未设置")}
														</aSelectOption>
														{xU.map(stateApp.currProject.env, i => {
															return (
																<aSelectOption value={i._id}>
																	{i.name}
																</aSelectOption>
															);
														})}
													</ElSelect>
												</div>
											);
										}
									}}
								</ElPopover>
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
								const envArray = stateApp.currProject.env;
								let env = xU.find(envArray, { _id: witchEnv });
								if (env) {
									return <ElTag color="cyan">{env.name}</ElTag>;
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
										<ElTag class="ml10">{filterParams.tag.length}</ElTag>
									) : null}
								</span>
								<ElPopover placement="bottomRight" trigger="click">
									{{
										default() {
											return <xIcon icon="icon_filter" class="pointer" />;
										},
										content() {
											return (
												<div style="padding: 8px">
													<ElSelect
														clearable
														mode="multiple"
														style="width: 400px"
														v-model:value={filterParams.tag}
														class="select">
														{xU.map(stateProjectTestcase.allTags, i => {
															return (
																<aSelectOption value={i}>{i}</aSelectOption>
															);
														})}
													</ElSelect>
												</div>
											);
										}
									}}
								</ElPopover>
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
		const { allInterface } = stateProjectTestcase;
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
						if (search.includes("unset")) {
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
			stateProjectTestcase.isLoading = false;
		}, 100);
	}, 500);

	return {
		filterParams,
		configs_interfaceTable,
		fnUpdateListForShow
	};
}
