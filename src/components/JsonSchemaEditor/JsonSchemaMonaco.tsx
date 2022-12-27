import { defineComponent, h } from "vue";
import generateSchema from "generate-schema";
import { State_App } from "../../state/State_App";
import "./JsonSchemaMonaco.less"
import { xU, defItem, setValueTo, components, pickValueFrom } from "@ventose/ui";
import { ITEM_OPTIONS } from "src/utils/common.options";

const { xIcon } = components;
const SPE = ".properties.";

const ICON_STRATEGE = {
	object: () => h(xIcon, { icon: "type_object" }),
	array: () => h(xIcon, { icon: "type_array" }),
	string: () => h(xIcon, { icon: "type_string" }),
	number: () => h(xIcon, { icon: "type_number" }),
	boolean: () => h(xIcon, { icon: "type_boolean" }),
	integer: () => h(xIcon, { icon: "type_int" }),
}

function makeProps(pre, prop) {
	return [pre, prop].filter(i => !!i).join(SPE)
}

function transJsonTree(item, prop, key) {
	if (prop === 0) {
		return {
			...item,
			key,
			title: "root",
			children: xU.map(item.properties, (item, prop) => transJsonTree(item, prop, makeProps(key, prop)))
		}
	} else {
		return {
			...item,
			key,
			title: prop,
			children: xU.map(item.properties, (item, prop) => transJsonTree(item, prop, makeProps(key, prop)))
		}
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
				let jsonSchema = {}
				try {
					jsonSchema = JSON.parse(schemaString);
				} catch (error) {

				} finally {
					this.jsonSchema = jsonSchema;
				}
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
			handler() {

			}
		},

	},
	methods: {
		updateTree() {
			this.isTreeLoading = true;
			this.updateTreeDebounce()
		},
		updateTreeDebounce: xU.debounce(function () {
			this.jsonTree = xU.map([this.jsonSchema], (item, prop) => transJsonTree(item, prop, ""));
			this.isTreeLoading = false;
		}, 300),
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
			const deleteOldProp = true;
			xU.MutatingProps(this.jsonSchema.properties, oldNode.key, "never", deleteOldProp);
			xU.MutatingProps(this.jsonSchema.properties, newNode.key, newNode);
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
		return <div class="JsonSchemaMonaco flex">
			<div class="left-json-tree">
				{this.isTreeLoading ? null :
					<aTree
						class="JsonSchemaMonaco-json-tree"
						show-line
						defaultExpandAll
						treeData={vm.jsonTree} >
						{{

							title({ dataRef }) {
								const { title, type, key } = dataRef;
								const isShowAdd = key && type === 'object';
								const isShowDelete = !!key


								return <span class="flex middle">
									<span class="pointer flex1" onClick={() => vm.handleTreeClick(dataRef)}>
										<span class="mr10">{ICON_STRATEGE[type]()}</span>
										<span>{title}</span>
										<xGap f="1" />
									</span>
									{isShowAdd ? <xIcon icon="add" /> : null}
									{isShowDelete ? <xIcon icon="delete" /> : null}
									<xGap r="10" />
								</span>
							},
						}}
					</aTree>
				}

			</div>
			<SchemaEditor
				node={this.currentNode}
				onNodeChange={this.handleNodeChange}
				onNodeSync={this.handleNodeSync}
			/>
			<div class="JsonSchemaMonaco-monaco-panel flex1" style={{ width: "1px" }}>
				<MonacoEditor code={this.jsonSchemaString} language="json" />
				<aButton class="JsonSchemaMonaco-monaco-panel_button">{vm.$t("同步到左侧").label}</aButton>
			</div>
		</div >
	}
});


const SchemaEditor = defineComponent({
	props: ["node"],
	emits: ["nodeChange", "nodeSync"],
	data(vm) {
		return {
			dataXItem: {
				...defItem({
					value: "",
					prop: "key",
					label: "key",
					readonly: true
				}),
				...defItem({
					value: "",
					prop: "title",
					label: "prop",
					onAfterValueEmit(val) {
						const array = String(vm.dataXItem.key.value).split(SPE);
						array[array.length - 1] = val;
						vm.dataXItem.key.value = array.join(SPE);
					}
				}),
				...defItem({
					value: false,
					prop: "required",
					label: "required",
					itemType: "Switch",
					options: ITEM_OPTIONS.required
				}),
				...defItem({
					value: "object",
					prop: "type",
					label: "type",
					itemType: "RadioGroup",
					options: ["object", "string", "number", "array", "boolean", "integer"].map(type => ({
						label: (<span class="mr10" title={type}>{ICON_STRATEGE[type]()}</span>),
						value: type
					}))
				}),
			}
		}
	},
	watch: {
		node(node) {
			this.oldNode = node || {};
			const { title, type, required, key } = node;
			setValueTo(this.dataXItem, {
				key,
				title,
				type,
				required: !!required
			})
		},
		dataXItemValues(values) {
			this.$emit("nodeChange", xU.merge({}, this.oldNode, values), this.oldNode)
		}
	},
	methods: {
		submit() {
			const values = this.dataXItemValues;
			this.$emit("nodeSync", xU.merge({}, this.oldNode, values), this.oldNode)
			this.oldNode.key = values.key
		}
	},
	computed: {
		dataXItemValues() {
			return pickValueFrom(this.dataXItem)
		}
	},
	render(vm) {
		if (!vm.node) {
			return null;
		}
		return (
			<div className="flex vertical flex1">
				<xForm class="flex vertical" labelStyle={{ "min-width": "120px", width: "unset" }}>
					<xGap t="10" /> <xItem configs={this.dataXItem.key} />
					<xGap t="10" /> <xItem configs={this.dataXItem.title} />
					<xGap t="10" /> <xItem configs={this.dataXItem.required} />
					<xGap t="10" /> <xItem configs={this.dataXItem.type} />
				</xForm>
				<div class="padding10">
					<aButton onClick={vm.submit} type="primary">{vm.$t("同步到左侧").label}</aButton>
				</div>
			</div>
		);
	}
})
