import { computed, defineComponent } from "vue";
import { xI, xScope, xU } from "@/ventose/ui";
import { stateInterface } from "@/state/interface";
import { useColHeader } from "./Interface.helper";
import { ITEM_OPTIONS, ITEM_OPTIONS_VDOM } from "@/utils/common.options";
import { stateApp } from "@/state/app";
import {
	dialogInterfaceProxyModify,
	dialogInterfaceStatusModify
} from "./DialogModifyInterface.Helper";
import { cptRouter } from "@/router/router";
import { ALL, CATEGORY } from "@/utils/variable";

function titleStyle(isLink: boolean) {
	return {
		color: isLink ? "var(--app-link)" : ""
	};
}

export const InterfaceMain = defineComponent({
	setup(props) {
		var vm = {
			selected: new Set(),
			/* 条件变动触发数据过滤，confirm之后变化 */
			filter: {
				catid: [],
				method: [],
				status: [],
				witchEnv: [],
				tag: [],
				path: "",
				title: ""
			},
			/* 记录条件 */
			conditions: {
				catid: [],
				method: [],
				status: [],
				witchEnv: [],
				tag: [],
				path: "",
				title: ""
			},
			$btnChangeStatus: {
				text: xI("变更状态"),
				disabled: () => vm.selected.size === 0,
				async onClick() {
					dialogInterfaceStatusModify({
						selected: Array.from(vm.selected)
					});
				}
			},
			$btnChangeProxy: {
				text: xI("变更代理"),
				disabled: () => vm.selected.size === 0,
				async onClick() {
					dialogInterfaceProxyModify({
						selected: Array.from(vm.selected)
					});
				}
			},
			_onFilter({ ref, prop }) {
				vm.filter[prop] = vm.conditions[prop];
				ref.value.hide();
			},
			_onReset({ ref, prop }) {
				vm.conditions[prop] = [];
				vm._onFilter({ ref, prop });
			}
		};
		vm = xScope(vm);

		const cpt_columns = computed(() => {
			const checkbox = {
				dataKey: "checkbox",
				key: "checkbox",
				title: xI("checkbox"),
				width: 48,
				fixed: true,
				headerCellRenderer(_props) {
					const isChecked =
						stateInterface.allInterface.length > 0 &&
						vm.selected.size === stateInterface.allInterface.length;

					const isIndeterminate =
						vm.selected.size > 0 &&
						vm.selected.size < stateInterface.allInterface.length;

					return (
						<div class="flex center width100">
							<el-checkbox
								indeterminate={isIndeterminate}
								model-value={isChecked}
								onChange={() => {
									if (vm.selected.size < stateInterface.allInterface.length) {
										vm.selected = new Set(
											xU.map(stateInterface.allInterface, i => i._id)
										);
									} else {
										vm.selected = new Set();
									}
								}}
							/>
						</div>
					);
				},
				cellRenderer: ({ rowData }) => {
					const isChecked = vm.selected.has(rowData._id);
					return (
						<div class="flex center width100">
							<el-checkbox
								model-value={isChecked}
								onChange={value => {
									if (value) {
										vm.selected.add(rowData._id);
									} else {
										vm.selected.delete(rowData._id);
									}
								}}
							/>
						</div>
					);
				}
			};

			const catid = {
				dataKey: "catid",
				key: "catid",
				title: xI("接口分类"),
				width: 150,
				headerCellRenderer(_props) {
					const { vDom } = useColHeader({
						title: _props.column.title,
						prop: "catid",
						style: titleStyle(vm.filter.catid.length > 0),
						controller: (
							<el-checkbox-group v-model={vm.conditions.catid}>
								{xU.map(stateInterface.allCategory, i => {
									return (
										<div>
											<el-checkbox label={i._id}>{i.name}</el-checkbox>
										</div>
									);
								})}
							</el-checkbox-group>
						),
						onFilter: vm._onFilter,
						onReset: vm._onReset
					});
					return vDom;
				},
				cellRenderer: ({ cellData }) =>
					xU.cellValToLabel(stateInterface.allCategory, {
						value: cellData
					})
			};

			const title = {
				dataKey: "title",
				key: "title",
				title: xI("接口名称"),
				width: 150,
				headerCellRenderer(_props) {
					const { vDom } = useColHeader({
						title: _props.column.title,
						prop: "title",
						style: titleStyle(String(vm.filter.title).length > 0),
						controller: (
							<el-input v-model={vm.conditions.title} rows={3} clearable />
						),
						onFilter: vm._onFilter,
						onReset: vm._onReset
					});
					return vDom;
				}
			};

			const method = {
				dataKey: "method",
				key: "method",
				title: xI("请求方法"),
				width: 100,
				headerCellRenderer(_props) {
					const { vDom } = useColHeader({
						title: _props.column.title,
						prop: "method",
						style: titleStyle(vm.filter.method.length > 0),
						controller: (
							<el-checkbox-group v-model={vm.conditions.method}>
								{xU.map(ITEM_OPTIONS.httpMethod, i => {
									return (
										<div>
											<el-checkbox label={i.value}>{i.label}</el-checkbox>
										</div>
									);
								})}
							</el-checkbox-group>
						),
						onFilter: vm._onFilter,
						onReset: vm._onReset
					});
					return vDom;
				},
				cellRenderer: ({ cellData }) => (
					<div class="flex center width100">
						{ITEM_OPTIONS_VDOM.httpMethod(cellData)}
					</div>
				)
			};

			const path = {
				dataKey: "path",
				key: "path",
				title: xI("接口路径"),
				width: 250,
				minWidth: 250,
				headerCellRenderer(_props) {
					const { vDom } = useColHeader({
						title: _props.column.title,
						prop: "path",
						style: titleStyle(String(vm.filter.path).length > 0),
						controller: (
							<el-input v-model={vm.conditions.path} rows={3} clearable />
						),
						onFilter: vm._onFilter,
						onReset: vm._onReset
					});
					return vDom;
				}
			};

			const status = {
				dataKey: "status",
				key: "status",
				title: xI("状态"),
				width: 150,
				headerCellRenderer(_props) {
					const { vDom } = useColHeader({
						title: _props.column.title,
						prop: "status",
						style: titleStyle(vm.filter.status.length > 0),
						width: 200,
						controller: (
							<el-checkbox-group v-model={vm.conditions.status}>
								{xU.map(ITEM_OPTIONS.interfaceStatus, i => {
									return (
										<div>
											<el-checkbox label={i.value}>{i.label}</el-checkbox>
										</div>
									);
								})}
							</el-checkbox-group>
						),
						onFilter: vm._onFilter,
						onReset: vm._onReset
					});
					return vDom;
				},
				cellRenderer: ({ cellData }) => (
					<div class="flex center width100">
						{ITEM_OPTIONS_VDOM.status(cellData)}
					</div>
				)
			};

			const isProxy = {
				dataKey: "isProxy",
				key: "isProxy",
				title: xI("转发"),
				width: 150,
				headerCellRenderer(_props) {
					const { vDom } = useColHeader({
						title: _props.column.title,
						prop: "witchEnv",
						style: titleStyle(vm.filter.witchEnv.length > 0),
						width: 350,
						controller: (
							<el-checkbox-group v-model={vm.conditions.witchEnv}>
								<div>
									<el-checkbox label="unset">
										<el-tag>{xI("未设置")}</el-tag>
									</el-checkbox>
								</div>
								{xU.map(stateApp.currProject.env, i => {
									return (
										<div>
											<el-checkbox label={i._id}>
												<el-tag>{i.name}</el-tag>
												<span class="ml8">{i.domain}</span>
											</el-checkbox>
										</div>
									);
								})}
							</el-checkbox-group>
						),
						onFilter: vm._onFilter,
						onReset: vm._onReset
					});
					return vDom;
				},
				cellRenderer: params => {
					const { cellData: isProxy, rowData: record } = params;
					if (isProxy) {
						const { witchEnv } = record;
						if (!witchEnv) {
							return "任意";
						}
						if (witchEnv) {
							const envArray = stateApp.currProject.env;
							let env = xU.find(envArray, { _id: witchEnv });
							if (env) {
								return (
									<div class="flex center width100">
										<el-tag>{env.name}</el-tag>
									</div>
								);
							}
						} else {
							return "--";
						}
					}
					return "";
				}
			};

			const tag = {
				dataKey: "tag",
				key: "tag",
				title: xI("Tags"),
				width: 250,
				minWidth: 250,
				headerCellRenderer(_props) {
					const { vDom } = useColHeader({
						title: _props.column.title,
						prop: "tag",
						style: titleStyle(vm.filter.tag.length > 0),
						width: 450,
						controller: (
							<el-checkbox-group v-model={vm.conditions.tag}>
								{xU.map(stateInterface.allTags, i => {
									return (
										<div>
											<el-checkbox label={i} />
										</div>
									);
								})}
							</el-checkbox-group>
						),
						onFilter: vm._onFilter,
						onReset: vm._onReset
					});
					return vDom;
				},
				cellRenderer: ({ cellData }) => (
					<div class="flex center width100">
						{ITEM_OPTIONS_VDOM.tags(cellData)}
					</div>
				)
			};

			if (cptRouter.value.query.interface_type === ALL) {
				return [checkbox, catid, title, method, path, status, isProxy, tag];
			}

			if (cptRouter.value.query.interface_type === CATEGORY) {
				return [checkbox, title, method, path, status, isProxy, tag];
			}

			return [];
		});

		const cptInterfaceRowData = computed(() => {
			const { allInterface } = stateInterface;
			let interfaceForShow = xU.isArrayFill(allInterface) ? allInterface : [];
			let paramKeys = Object.keys(vm.filter);
			let prop = paramKeys.pop();
			while (prop) {
				const search = vm.filter[prop];
				if (xU.isInput(search)) {
					interfaceForShow = xU.filter(interfaceForShow, i => {
						if (prop == "status") {
							return search.includes(i.status);
						} else if (prop == "catid") {
							return search.includes(i.catid);
						} else if (prop == "method") {
							return search.includes(i.method);
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
			return interfaceForShow;
		});

		return function () {
			return (
				<div class="interface-list">
					<div class="Operation mb10 flex end middle">
						<xButton class="mr4" configs={vm.$btnChangeStatus} />
						<xButton class="mr4" configs={vm.$btnChangeProxy} />
						<xButton class="mr4">{xI("添加Tag")}</xButton>
						<xButton class="mr4">{xI("移除Tag")}</xButton>
					</div>
					<div class="flex1 el-card">
						<el-auto-resizer
							v-slots={{
								default({ width, height }) {
									return (
										<el-table-v2
											width={width}
											height={height}
											columns={cpt_columns.value}
											data={cptInterfaceRowData.value}
											fixed
										/>
									);
								}
							}}
						/>
					</div>
				</div>
			);
		};
	}
});
