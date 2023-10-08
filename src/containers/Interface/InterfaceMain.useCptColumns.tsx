export function useCptColumns() {
	const cpt_columns = computed(() => {
		const checkbox = {
			prop: "checkbox",
			key: "checkbox",
			title: xI("checkbox"),
			width: 48,
			fixed: true,
			headerCellRenderer(_props) {
				const isChecked =
					cptInterfaceRowData.value.length > 0 &&
					vm.selected.size === cptInterfaceRowData.value.length;

				const isIndeterminate =
					vm.selected.size > 0 &&
					vm.selected.size < cptInterfaceRowData.value.length;

				return (
					<div class="flex center width100">
						<el-checkbox
							indeterminate={isIndeterminate}
							model-value={isChecked}
							onChange={() => {
								if (vm.selected.size < cptInterfaceRowData.value.length) {
									vm.selected = new Set(
										xU.map(cptInterfaceRowData.value, i => i._id)
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
			prop: "catid",
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
			prop: "title",
			key: "title",
			title: xI("接口名称"),
			width: 300,
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
			},
			cellRenderer({ cellData, rowData }) {
				return (
					<a
						href={aHashLink("/project", {
							...cptRouter.value.query,
							interface_type: INTERFACE,
							interface_id: rowData._id
						})}>
						{cellData}
					</a>
				);
			}
		};

		const method = {
			prop: "method",
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
			prop: "path",
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
			prop: "status",
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
			prop: "isProxy",
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

		const maintainer = {
			prop: "tag",
			key: "tag",
			title: xI("维护人"),
			width: 150,
			minWidth: 150,
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
			cellRenderer: ({ rowData }) => (
				<div class="flex center width100">{rowData.uid}</div>
			)
		};
		const tag = {
			prop: "tag",
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
			return [
				checkbox,
				catid,
				title,
				method,
				path,
				status,
				maintainer,
				isProxy,
				tag
			];
		}

		if (cptRouter.value.query.interface_type === CATEGORY) {
			return [checkbox, title, method, path, status, maintainer, isProxy, tag];
		}

		return [];
	});
}
