import json5 from "json5";
import { defineComponent, markRaw } from "vue";
import { stateApp } from "@/state/app";
import "./JsonSchemaMonaco.less";
import {
	xU,
	$,
	compositionAPI,
	defCol,
	defDataGridOption,
	setDataGridInfo,
	xI
} from "@/ventose/ui";
import { ICON_STRATEGE, SchemaEditor, SPE } from "./SchemaEditor";
import { diff } from "jsondiffpatch";
import { API } from "../../api/index";
import generateSchema from "generate-schema";
import { MonacoEditor } from "../MonacoEditor/MonacoEditor";
import {
	colParamsName,
	colRemark,
	colRequired,
	colType,
	colValue
} from "@/utils/common.columns";
const { usefnObserveDomResize } = compositionAPI;

function makeProps(pre, prop) {
	return [pre, prop].join(SPE);
}

function transJsonTree(item, prop, key) {
	if (prop === 0) {
		return {
			...item,
			/* antdv tree 需要的属性 */
			key,
			title: "root",
			children: xU.map(item.properties, (item, prop) =>
				transJsonTree(item, prop, makeProps(key, prop))
			)
		};
	} else {
		return {
			...item,
			/* antdv tree 需要的属性 */
			key,
			title: prop,
			children: xU.map(item.properties, (item, prop) =>
				transJsonTree(item, prop, makeProps(key, prop))
			)
		};
	}
}

const PopoverContent = defineComponent(
	markRaw({
		template: `<ul>
		<li>1. Tree  <xIcon icon="arrow_right"/> Lowcode  <xIcon icon="arrow_right"/> JSON </li>
		<li>2. <ElTag color="green"><xIcon icon="arrow_right"/> </ElTag>{{xI("左侧的编辑会直接作用于右侧")}}</li>
		<li>3. <ElTag color="red"><xIcon icon="arrow_left"/> </ElTag>{{xI("右侧的编辑需要手工同步到左侧")}}，{{xI("依次点击")}}<xButton type="primary">{{xI("同步到左侧")}}</xButton></li>
		<li>4. {{xI("编辑中会有冗余信息，同步到左侧的JSON Tree 之后会Tree Shaking")}} </li>
		<li>5. {{xI("点击")}} <ElTag color="green">root</ElTag>{{xI("查看全部JSON内容,并且可以全量修改")}}</li>
		<li>6. {{xI("普通JSON对象可以转为schema格式")}} <xButton type="primary">{{xI("JSON 转 schema")}}</xButton></li>
	  </ul>`
	})
);

export const JsonSchemaMonaco = defineComponent({
	props: ["schemaString", "readOnly"],
	emits: ["update:schemaString"],
	setup() {
		const { fnObserveDomResize, fnUnobserveDomResize } =
			usefnObserveDomResize();
		return {
			stateApp,
			fnObserveDomResize,
			fnUnobserveDomResize
		};
	},
	computed: {
		syncLabel() {
			if (this.currentNode) {
				return xI("同步到编辑器");
			} else {
				return xI("同步到 JSON 树");
			}
		},
		isShowSchemaEditor() {
			if (this.currentNode) {
				if (this.onlyOneEditor) {
					return this.currentEditor === "SchemaEditor";
				} else {
					return true;
				}
			} else {
				return false;
			}
		},
		isShowMonacoEditor() {
			if (!this.currentNode) {
				return true;
			}

			if (this.onlyOneEditor) {
				return this.currentEditor === "MonacoEditor";
			} else {
				return true;
			}
		}
	},
	watch: {
		currentNode: {
			deep: true,
			async handler() {
				await xU.ensureValueDone(() => this.setSchemaStringDebounce);
				this.setSchemaStringDebounce();
			}
		},
		schemaString: {
			immediate: true,
			handler(schemaString) {
				this.updateSchemaJsonBy(schemaString);
			}
		},
		schemaJson: {
			immediate: true,
			handler() {
				this.updateTableDataSource();
				this.updateTree();
			}
		}
	},
	mounted() {
		this.init();
		this.fnObserveDomResize(this.$refs.JsonSchemaMonaco, () => {
			const width = $(this.$refs.JsonSchemaMonaco).width();
			const onlyOneEditor = width < 800;
			if (onlyOneEditor !== this.onlyOneEditor) {
				this.onlyOneEditor = onlyOneEditor;
			}
		});
	},
	beforeUnmount() {
		this.fnUnobserveDomResize(this.$refs.JsonSchemaMonaco);
	},
	methods: {
		renderReadOnly(vm) {
			return (
				<div class="JsonSchemaMonaco flex x-card" ref="JsonSchemaMonaco">
					<div class="left-json-tree_readonly" style="width:100%">
						<xDataGrid configs={vm.tableConfigs} />
					</div>
				</div>
			);

			return (
				<div class="JsonSchemaMonaco flex x-card" ref="JsonSchemaMonaco">
					<div class="left-json-tree_readonly" style="width:100%">
						{/* 在有数据之后才能展开全部 */}
						{this.isTreeLoading ? (
							<div v-xloading="true" class="flex middle height100 width100" />
						) : (
							<div class="flex middle height100 vertical">
								<ElTree
									class="JsonSchemaMonaco-json-tree flex1 overflow-auto width100"
									show-line
									defaultExpandAll
									treeData={vm.jsonTree}>
									{{
										title({ dataRef }) {
											const { title, type, key, description } = dataRef;
											const vDomIcon =
												ICON_STRATEGE[type] && ICON_STRATEGE[type]();

											let labelType = (
												<div class="mr10 cell-width">
													{vDomIcon}
													<span class="mr10">{type}</span>
												</div>
											);
											let labelDescription = (
												<div class="mr10 cell-width">
													<span class="mr10">{description}</span>
												</div>
											);

											if (title == "root") {
												labelType = (
													<div class="mr10 cell-width">{xI("类型")}</div>
												);
												labelDescription = (
													<div class="mr10 cell-width">{xI("备注")}</div>
												);
											}

											return (
												<div class="flex middle  title-wrapper">
													<div
														class="title ellipsis pointer flex1 flex middle "
														v-xTips={{ onlyEllipsis: true }}
														onClick={() => vm.handleTreeClick(dataRef)}>
														<span>{title}</span>
														<xGap f="1" />
														{labelType}
														{labelDescription}
													</div>
													<xGap r="10" />
												</div>
											);
										}
									}}
								</ElTree>
							</div>
						)}
					</div>
				</div>
			);
		},
		toggleEditor() {
			if (this.currentEditor === "SchemaEditor") {
				this.currentEditor = "MonacoEditor";
			} else {
				this.currentEditor = "SchemaEditor";
			}
		},
		setSchemaString() {
			let jsonSchemaString = JSON.stringify(this.schemaJson, null, 2);
			if (this.currentNode) {
				jsonSchemaString = JSON.stringify(this.currentNode, null, 2);
			}
			if (this.jsonSchemaString !== jsonSchemaString) {
				this.jsonSchemaString = jsonSchemaString;
			}
		},
		init() {
			const vm = this;
			vm.raw$Node4Diff = {};
			vm.setSchemaStringDebounce = xU.debounce(function () {
				/* 因为currentNode变动，更新Monaco的字符串，不可以在内部修改currentNode触发循环更新 */
				const node = xU.cloneDeep(vm.currentNode);
				if (node) {
					const isDifferent = diff(vm.raw$Node4Diff, node);
					if (isDifferent) {
						vm.raw$Node4Diff = node;
						vm.setSchemaString(node);
					}
				} else {
					vm.setSchemaString();
				}
			}, 600);
			vm.setSchemaStringDebounce();

			vm.updateTreeDebounce = xU.debounce(function () {
				vm.jsonTree = xU.map([vm.schemaJson], (item, prop) => {
					return transJsonTree(item, prop, "");
				});
				vm.isTreeLoading = false;
			}, 32);
		},
		updateSchemaJsonBy(schemaString) {
			let schemaJson = this.schemaJson;
			try {
				schemaJson = JSON.parse(schemaString);
				this.$emit("update:schemaString", schemaString);
			} catch (error) {
				console.error(error);
				xU.message.error(xI("数据有误"));
			} finally {
				this.schemaJson = schemaJson;
			}
		},
		async updateTableDataSource() {
			const { properties } = this.schemaJson;
			setDataGridInfo(this.tableConfigs, {
				data: xU.map(properties, (item, name) => {
					return {
						name,
						...item
					};
				})
			});
		},
		async updateTree() {
			xU("updateTree");
			this.isTreeLoading = true;
			await xU.ensureValueDone(() => this.updateTreeDebounce);
			this.updateTreeDebounce();
		},
		handleTreeClick(item) {
			this.isMockPreview = false;
			if (item && item.title !== "root") {
				this.setCurrentNode(item);
			} else {
				this.setCurrentNode(false);
			}
		},
		handleNodeSync(oldKey, node) {
			if (!node.key || !oldKey) {
				return;
			}
			xU.MutatingProps(this.schemaJson, oldKey, "never", true);
			xU.MutatingProps(this.schemaJson, node.key, node);
			this.$emit("update:schemaString", JSON.stringify(this.schemaJson));
			this.updateTree();
			this.handleTreeClick(node);
		},
		addProp(item) {
			this.handleTreeClick({
				key: [item.key, ""].join(SPE),
				title: "",
				type: "object"
			});
		},
		deleteProp(item) {
			xU.MutatingProps(this.schemaJson, item.key, "never", true);
			this.handleTreeClick();
		},
		syncMonacoString() {
			/* 是单个节点 */
			if (this.currentNode) {
				try {
					const node = JSON.parse(this.jsonSchemaString);
					/* TODO: 校验node是否合法*/
					this.setCurrentNode(node);
				} catch (error) {
					xU.message.error(xI("同步失败"));
				}
			} else {
				/* 全量 */
				this.updateSchemaJsonBy(this.jsonSchemaString);
			}
		},
		setCurrentNode(node) {
			if (node) {
				const currentNode = xU.cloneDeep(node);
				delete currentNode.children;
				this.currentNode = currentNode;
			} else {
				this.currentNode = false;
			}
			this.setSchemaStringDebounce();
		},
		monacoJsonToSchema() {
			try {
				const res = generateSchema.json(json5.parse(this.jsonSchemaString));
				this.jsonSchemaString = JSON.stringify(res, null, 2);
			} catch (error) {
				xU.message.error(xI("JSON 转 schema 解析出错"));
			}
		},
		async previewMock() {
			try {
				let schema = JSON.parse(this.jsonSchemaString);
				/* TODO: 没啥作用*/
				const { data } = await API.project.interfaceSchema2json({
					schema: schema.properties
				});
				if (data) {
					this.jsonSchemaString = JSON.stringify(data, null, 2);
				} else {
					throw new Error();
				}
			} catch (error) {
				xU.message.error(xI("预览 Mock 结果出错"));
			}
		}
	},
	provide() {
		const vm = this;
		return {
			jsmVM: vm
		};
	},
	data(vm) {
		return {
			tableConfigs: defDataGridOption({
				isHidePagination: true,
				dataSource: [],
				columns: {
					...colRequired(),
					...colParamsName(),
					...colType,
					...colValue,
					...colRemark({ prop: "description" }),
					...defCol({
						prop: "others",
						label: xI("其他信息"),
						renderCell: ({ record }) => {
							const vDom = [];
							const newInfo = (label, value) => (
								<div>
									<span style="font-weight: 700;">{label}：</span>
									{value}
								</div>
							);
							if (record.enum) {
								vDom.push(newInfo(xI("枚举"), record.enum.join(",")));
							}
							if (record.maximum) {
								vDom.push(newInfo(xI("最大值"), record.maximum));
							}
							if (record.minimum) {
								vDom.push(newInfo(xI("最小值"), record.minimum));
							}
							if (record.format) {
								vDom.push(newInfo(xI("format"), record.format));
							}
							return <div class="flex vertical">{vDom}</div>;
						}
					})
				}
			}),
			currentEditor: "MonacoEditor",
			onlyOneEditor: false,
			isMockPreview: false,
			currentNode: false,
			helpTips: {
				content: PopoverContent,
				width: "500px"
			},
			isShowRaw: false,
			schemaJson: {},
			jsonSchemaString: "",
			expandedKeys: [],
			selectedKeys: [],
			jsonTree: [],
			isTreeLoading: false,
			configsPreviewMock: {
				itemType: "Checkbox",
				slots: {
					default() {
						return xI("Mock预览");
					}
				}
			}
		};
	},
	render(vm) {
		if (this.readOnly) {
			return this.renderReadOnly(vm);
		}
		return (
			<div class="JsonSchemaMonaco flex x-card" ref="JsonSchemaMonaco">
				<div class="left-json-tree">
					{this.isTreeLoading ? (
						<div v-xloading="true" class="flex middle height100 width100" />
					) : (
						<div class="flex middle height100 vertical">
							<div class="padding10 flex middle width100">
								{/* 宽度不够时，只显示一个 */}
								{this.onlyOneEditor ? (
									<>
										<xButton
											type={
												this.currentEditor === "SchemaEditor"
													? "primary"
													: "text"
											}
											onClick={vm.toggleEditor}>
											<xIcon icon="column2" />
										</xButton>
										<xButton
											type={
												this.currentEditor === "MonacoEditor"
													? "primary"
													: "text"
											}
											onClick={vm.toggleEditor}>
											<xIcon icon="column3" />
										</xButton>
									</>
								) : null}
								<xGap f="1" />
								<span v-xTips={vm.helpTips} class="flex middle pointer">
									<xIcon icon="question" />
									<span class="ml10">{xI("说明")}</span>
								</span>
							</div>
							<ElTree
								class="JsonSchemaMonaco-json-tree flex1 overflow-auto width100"
								show-line
								defaultExpandAll
								treeData={vm.jsonTree}>
								{{
									title({ dataRef }) {
										const { title, type, key } = dataRef;
										const isShowAdd = !type || type === "object";
										const isShowDelete = !!key;
										const vDomIcon =
											ICON_STRATEGE[type] && ICON_STRATEGE[type]();

										return (
											<div class="flex middle  title-wrapper">
												<div
													class="title ellipsis pointer flex1 flex middle "
													v-xTips={{ onlyEllipsis: true }}
													onClick={() => vm.handleTreeClick(dataRef)}>
													<span class="mr10">{vDomIcon}</span>
													<span>{title}</span>
													<xGap f="1" />
												</div>
												{isShowAdd ? (
													<xIcon
														icon="add"
														onClick={() => vm.addProp(dataRef)}
													/>
												) : null}
												{isShowDelete ? (
													<xIcon
														icon="delete"
														onClick={() => vm.deleteProp(dataRef)}
													/>
												) : null}
												<xGap r="10" />
											</div>
										);
									}
								}}
							</ElTree>
						</div>
					)}
				</div>
				{this.isShowSchemaEditor ? (
					<SchemaEditor onNodeSync={this.handleNodeSync} />
				) : null}
				{this.isShowMonacoEditor ? (
					<div
						class="JsonSchemaMonaco-monaco-panel flex1 flex vertical"
						style={{ width: "1px" }}>
						<div class="JsonSchemaMonaco-monaco-panel_button flex middle">
							<xButton
								onClick={this.syncMonacoString}
								type="primary"
								disabled={this.isMockPreview}>
								{this.syncLabel}
							</xButton>
							<xGap l="10" />
							{!this.currentNode && (
								<xButton
									onClick={this.monacoJsonToSchema}
									type="primary"
									disabled={this.isMockPreview}>
									{xI("JSON 转 schema")}
								</xButton>
							)}
							<xGap l="10" />
							{!this.currentNode && (
								<xItem
									configs={vm.configsPreviewMock}
									modelValue={this.isMockPreview}
									onUpdate:modelValue={val => {
										if (vm.isMockPreview === val) {
											return;
										}
										vm.isMockPreview = val;
										if (val) {
											vm.previewMock();
										} else {
											vm.setSchemaStringDebounce();
										}
									}}
								/>
							)}
						</div>
						<MonacoEditor
							class="flex1"
							v-model:code={this.jsonSchemaString}
							language="json"
						/>
					</div>
				) : null}
			</div>
		);
	}
});
