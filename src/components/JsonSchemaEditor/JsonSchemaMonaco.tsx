import { defineComponent } from "vue";
import { State_App } from "../../state/State_App";
import "./JsonSchemaMonaco.less";
import { UI, xU } from "@ventose/ui";
import { ICON_STRATEGE, SPE, SchemaEditor } from "./SchemaEditor";

function makeProps(pre, prop) {
	return [pre, prop].join(SPE);
}

function transJsonTree(item, prop, key) {
	if (prop === 0) {
		return {
			...item,
			key,
			title: "root",
			children: xU.map(item.properties, (item, prop) =>
				transJsonTree(item, prop, makeProps(key, prop))
			)
		};
	} else {
		return {
			...item,
			key,
			title: prop,
			children: xU.map(item.properties, (item, prop) =>
				transJsonTree(item, prop, makeProps(key, prop))
			)
		};
	}
}

export const JsonSchemaMonaco = defineComponent({
	props: ["schemaString"],
	setup() {
		return {
			State_App
		};
	},
	watch: {
		schemaString: {
			immediate: true,
			deep: true,
			handler(schemaString) {
				this.updateJsonSchema(schemaString);
			}
		},
		jsonSchema: {
			immediate: true,
			deep: true,
			handler() {
				if (this.jsonSchema) {
					this.updateTree();
				}
			}
		},
		jsonSchemaString: {
			immediate: true,
			deep: true,
			handler() {}
		}
	},
	methods: {
		updateJsonSchema(schemaString) {
			let jsonSchema = {};
			try {
				jsonSchema = JSON.parse(schemaString);
			} catch (error) {
				UI.message.error(this.$t("数据有误").label);
			} finally {
				this.jsonSchema = jsonSchema;
			}
		},
		updateTree() {
			this.isTreeLoading = true;
			this.updateTreeDebounce();
		},
		updateTreeDebounce: xU.debounce(function () {
			this.jsonTree = xU.map([this.jsonSchema], (item, prop) =>
				transJsonTree(item, prop, "")
			);
			this.isTreeLoading = false;
		}, 0),
		handleTreeClick(item) {
			if (!item.key) {
				this.currentNode = false;
				this.jsonSchemaString = JSON.stringify(this.jsonSchema, null, 2);
			} else {
				this.currentNode = item;
				this.jsonSchemaString = JSON.stringify(item, null, 2);
			}
		},
		handleNodeChange(newNode) {
			if (!newNode.key) {
				return;
			}
			this.jsonSchemaString = JSON.stringify(newNode, null, 2);
		},
		handleNodeSync(newNode, oldNode) {
			if (!newNode.key) {
				return;
			}
			xU.MutatingProps(this.jsonSchema, oldNode.key, "never", true);
			xU.MutatingProps(this.jsonSchema, newNode.key, newNode);
		},
		addProp(item) {
			this.handleTreeClick({
				key: [item.key, ""].join(SPE),
				title: "",
				type: "object"
			});
		},
		deleteProp(item) {
			xU.MutatingProps(this.jsonSchema, item.key, "never", true);
			this.handleTreeClick({});
		},
		syncJsonString() {
			/* 是单个节点 */
			if (this.currentNode) {
				try {
					const node = JSON.parse(this.jsonSchemaString);
					this.currentNode = node;
				} catch (error) {
					UI.message.error(this.$t("同步失败").label);
				}
			} else {
				/* 全量 */
				this.updateJsonSchema(this.jsonSchemaString);
			}
		}
	},
	data(vm) {
		return {
			isShowRaw: false,
			jsonSchema: {},
			jsonSchemaString: "",
			expandedKeys: [],
			selectedKeys: [],
			jsonTree: [],
			currentNode: false,
			isTreeLoading: false
		};
	},
	render(vm) {
		return (
			<div class="JsonSchemaMonaco flex">
				<div class="left-json-tree">
					{this.isTreeLoading ? (
						<aSpin spinning={true} class="flex middle height100 width100" />
					) : (
						<aTree
							class="JsonSchemaMonaco-json-tree"
							show-line
							defaultExpandAll
							treeData={vm.jsonTree}>
							{{
								title({ dataRef }) {
									const { title, type, key } = dataRef;
									const isShowAdd = type === "object";
									const isShowDelete = !!key;

									return (
										<span class="flex middle">
											<span
												class="pointer flex1"
												onClick={() => vm.handleTreeClick(dataRef)}>
												<span class="mr10">{ICON_STRATEGE[type]()}</span>
												<span>{title}</span>
												<xGap f="1" />
											</span>
											{isShowAdd ? (
												<xIcon icon="add" onClick={() => vm.addProp(dataRef)} />
											) : null}
											{isShowDelete ? (
												<xIcon
													icon="delete"
													onClick={() => vm.deleteProp(dataRef)}
												/>
											) : null}
											<xGap r="10" />
										</span>
									);
								}
							}}
						</aTree>
					)}
				</div>
				<SchemaEditor
					node={this.currentNode}
					onNodeChange={this.handleNodeChange}
					onNodeSync={this.handleNodeSync}
				/>
				<div
					class="JsonSchemaMonaco-monaco-panel flex1"
					style={{ width: "1px" }}>
					<MonacoEditor v-model:code={this.jsonSchemaString} language="json" />
					<aButton
						class="JsonSchemaMonaco-monaco-panel_button"
						onClick={vm.syncJsonString}>
						{vm.$t("同步到左侧").label}
					</aButton>
				</div>
			</div>
		);
	}
});
