import { defineComponent, markRaw, provide, reactive } from "vue";
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
			key,
			title: "root",
			children: xU.map(item.properties, (item, prop) =>
				transJsonTree(item, prop, makeProps(key, prop))
			),
			item
		};
	} else {
		return {
			key,
			title: prop,
			children: xU.map(item.properties, (item, prop) =>
				transJsonTree(item, prop, makeProps(key, prop))
			),
			item
		};
	}
}

const PopoverContent = defineComponent(
	markRaw({
		template: `<a-alert type="info">
		<template #icon><smile-outlined /></template>
		<template #message>
		  <ul>
			<li>tree<aTag>=></aTag>lowcode <aTag>=></aTag>JSON </li>
			<li><aTag color="green">=></aTag>{{$t("左侧的编辑会直接作用于右侧").label}}</li>
			<li><aTag color="red"><=</aTag>{{$t("右侧的编辑需要手工同步到左侧").label}}</li>
			<li>{{$t("编辑中会有冗余信息，同步到左侧的json tree 之后会Tree shaking").label}} </li>
			<li><aTag color="green">root</aTag>{{$t("点击root可以查看全部JSON schema 内容,并且可以全量修改JSON").label}}</li>
		  </ul>
		</template>
	  </a-alert>
	  `
	})
);

export const JsonSchemaMonaco = defineComponent({
	props: ["schemaString"],
	setup() {
		return {
			State_App
		};
	},
	watch: {
		currentNode: {
			immediate: true,
			deep: true,
			handler(currentNode) {
				debugger;
				if (currentNode) {
					this.jsonSchemaString = JSON.stringify(currentNode, null, 2);
				} else {
					this.jsonSchemaString = "";
				}
			}
		},
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
		setCurrentNode(node) {
			this.currentNode = node ? xU.cloneDeep(node) : false;
		},
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
			console.log("updateTree");
			this.isTreeLoading = true;
			this.updateTreeDebounce();
		},
		updateTreeDebounce: xU.debounce(function () {
			this.jsonTree = xU.map([this.jsonSchema], (item, prop) => {
				return transJsonTree(item, prop, "");
			});
			this.isTreeLoading = false;
		}, 0),
		handleTreeClick({ item, title }) {
			if (title === "root") {
				this.setCurrentNode();
				this.jsonSchemaString = JSON.stringify(this.jsonSchema, null, 2);
			} else {
				this.setCurrentNode(item);
				this.jsonSchemaString = JSON.stringify(item, null, 2);
			}
		},
		handleNodeSync(newNode, oldNode) {
			console.log("handleNodeSync");
			if (!newNode.key) {
				return;
			}
			xU.MutatingProps(this.jsonSchema, oldNode.key, "never", true);
			xU.MutatingProps(this.jsonSchema, newNode.key, newNode);
			this.handleTreeClick(newNode);
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
		monacoJsonToSchema() {},
		syncMonacoString() {
			/* 是单个节点 */
			if (this.currentNode) {
				try {
					const node = JSON.parse(this.jsonSchemaString);
					this.setCurrentNode(node);
				} catch (error) {
					UI.message.error(this.$t("同步失败").label);
				}
			} else {
				/* 全量 */
				this.updateJsonSchema(this.jsonSchemaString);
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
			currentNode: false,
			helpTips: {
				content: PopoverContent,
				width: "500px"
			},
			isShowRaw: false,
			jsonSchema: {},
			jsonSchemaString: "",
			expandedKeys: [],
			selectedKeys: [],
			jsonTree: [],
			isTreeLoading: false
		};
	},
	computed: {
		vDomBtns() {
			return (
				<div class="JsonSchemaMonaco-monaco-panel_button flex middle">
					<aButton onClick={this.syncMonacoString}>
						{" "}
						{this.$t("同步到左侧").label}{" "}
					</aButton>
					<xGap l="10" />
					{!this.currentNode && (
						<aButton onClick={this.monacoJsonToSchema}>
							{" "}
							{this.$t("JSON 转 schema").label}{" "}
						</aButton>
					)}
				</div>
			);
		}
	},
	render(vm) {
		return (
			<div class="JsonSchemaMonaco flex">
				<div class="left-json-tree">
					{" "}
					{this.isTreeLoading ? (
						<aSpin spinning={true} class="flex middle height100 width100" />
					) : (
						<div>
							<span class="padding10" v-uiPopover={vm.helpTips}>
								<xIcon icon="question" class="mr10" />
								{vm.$t(`说明`).label}
							</span>

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

										const vDomIcon =
											ICON_STRATEGE[type] && ICON_STRATEGE[type]();

										return (
											<span class="flex middle">
												<span
													class="pointer flex1"
													onClick={() => vm.handleTreeClick(dataRef)}>
													<span class="mr10">{vDomIcon}</span>
													<span>{title}</span>
													<xGap f="1" />
												</span>
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
											</span>
										);
									}
								}}
							</aTree>
						</div>
					)}
				</div>
				{this.currentNode ? (
					<SchemaEditor onNodeSync={this.handleNodeSync} />
				) : null}
				<div
					class="JsonSchemaMonaco-monaco-panel flex1"
					style={{ width: "1px" }}>
					{JSON.stringify(this.currentNode)}
					<MonacoEditor
						v-model:code={this.jsonSchemaString}
						language="json"
					/>{" "}
					{vm.vDomBtns}{" "}
				</div>
			</div>
		);
	}
});
