import json5 from "json5";
import { defineComponent, markRaw } from "vue";
import { State_App } from "../../state/State_App";
import "./JsonSchemaMonaco.less";
import { UI, xU, $ } from "@ventose/ui";
import { ICON_STRATEGE, SchemaEditor, SPE } from "./SchemaEditor";
import { diff } from "jsondiffpatch";
import { API } from "../../api/index";
import generateSchema from "generate-schema";
import { usefnObserveDomResize } from "../../compositions/useDomResize";

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
		<li>2. <aTag color="green"><xIcon icon="arrow_right"/> </aTag>{{$t("左侧的编辑会直接作用于右侧").label}}</li>
		<li>3. <aTag color="red"><xIcon icon="arrow_left"/> </aTag>{{$t("右侧的编辑需要手工同步到左侧").label}}，{{$t("依次点击").label}}<aButton type="primary">{{$t("同步到左侧").label}}</aButton></li>
		<li>4. {{$t("编辑中会有冗余信息，同步到左侧的JSON Tree 之后会Tree Shaking").label}} </li>
		<li>5. {{$t("点击").label}} <aTag color="green">root</aTag>{{$t("查看全部JSON内容,并且可以全量修改").label}}</li>
		<li>6. {{$t("普通JSON对象可以转为schema格式").label}} <aButton type="primary">{{$t("JSON 转 schema").label}}</aButton></li>
	  </ul>`
	})
);

export const JsonSchemaMonaco = defineComponent({
	props: ["schemaString"],
	setup() {
		const { fnObserveDomResize, fnUnobserveDomResize } =
			usefnObserveDomResize();
		return {
			State_App,
			fnObserveDomResize,
			fnUnobserveDomResize
		};
	},
	computed: {
		syncLabel() {
			if (this.currentNode) {
				return this.$t("同步到编辑器").label;
			} else {
				return this.$t("同步到 JSON 树").label;
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
			} catch (error) {
				UI.message.error(this.$t("数据有误").label);
			} finally {
				this.schemaJson = schemaJson;
			}
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
					UI.message.error(this.$t("同步失败").label);
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
				UI.message.error(this.$t("JSON 转 schema 解析出错").label);
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
				UI.message.error(this.$t("预览 Mock 结果出错").label);
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
						return vm.$t("Mock预览").label;
					}
				}
			}
		};
	},
	render(vm) {
		return (
			<div class="JsonSchemaMonaco flex x-card" ref="JsonSchemaMonaco">
				<div class="left-json-tree">
					{this.isTreeLoading ? (
						<aSpin spinning={true} class="flex middle height100 width100" />
					) : (
						<div class="flex middle height100 vertical">
							<div class="padding10 flex middle width100">
								{/* 宽度不够时，只显示一个 */}
								{this.onlyOneEditor ? (
									<>
										<aButton
											type={
												this.currentEditor === "SchemaEditor"
													? "primary"
													: "text"
											}
											onClick={vm.toggleEditor}>
											<xIcon icon="column2" />
										</aButton>
										<aButton
											type={
												this.currentEditor === "MonacoEditor"
													? "primary"
													: "text"
											}
											onClick={vm.toggleEditor}>
											<xIcon icon="column3" />
										</aButton>
									</>
								) : null}
								<xGap f="1" />
								<span v-uiPopover={vm.helpTips} class="flex middle pointer">
									<xIcon icon="question" />
									<span className="ml10">{vm.$t("说明").label}</span>
								</span>
							</div>
							<aTree
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
													v-uiPopover={{ onlyEllipsis: true }}
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
							</aTree>
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
							<aButton
								onClick={this.syncMonacoString}
								type="primary"
								disabled={this.isMockPreview}>
								{this.syncLabel}
							</aButton>
							<xGap l="10" />
							{!this.currentNode && (
								<aButton
									onClick={this.monacoJsonToSchema}
									type="primary"
									disabled={this.isMockPreview}>
									{this.$t("JSON 转 schema").label}
								</aButton>
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
