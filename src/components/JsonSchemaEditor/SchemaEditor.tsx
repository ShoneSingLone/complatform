import {
	
	components,
	defItem,
	pickValueFrom,
	itemsInvalid,
	xU,
	xI
} from "@/ventose/ui";
import { FormRules } from "@/utils/common.FormRules";
import { defineComponent, h, inject } from "vue";
import { ITEM_OPTIONS } from "@/utils/common.options";
import { SubformObject, objectNeedProps } from "./SubformObject";
import { SubformString, stringNeedProps } from "./SubformString";
import { SubformNumber, numberNeedProps } from "./SubformNumber";
import { SubformArray, arrayNeedProps } from "./SubformArray";
import { SubformBoolean, booleanNeedProps } from "./SubformBoolean";

const { xIcon } = components;

export const SPE = ".properties.";
export const ICON_STRATEGE = {
	object: () => h(xIcon, { icon: "type_object" }),
	array: () => h(xIcon, { icon: "type_array" }),
	string: () => h(xIcon, { icon: "type_string" }),
	number: () => h(xIcon, { icon: "type_number" }),
	boolean: () => h(xIcon, { icon: "type_boolean" }),
	integer: () => h(xIcon, { icon: "type_int" })
};

export const SchemaEditor = defineComponent({
	emits: ["nodeSync"],
	setup() {
		/* JsonSchemaMonaco instance */
		const jsmVM = inject("jsmVM");
		return {
			jsmVM
		};
	},
	data(vm) {
		return {
			dataXItem: {
				key: defItem({
					/* 在编辑的时候不需要变化，但是在同步的时候需要提交【newKey，oldKey】，oldKey用于定位原属性位置 */
					defaultValue: "",
					label: xI("对象访问路径"),
					readonly: true
				}),
				title: defItem({
					defaultValue: "",
					label: xI("字段名"),
					rules: [FormRules.required()]
				}),
				description: defItem({
					defaultValue: "",
					label: xI("描述"),
					isTextarea: true
				}),
				required: defItem({
					defaultValue: "0",
					label: xI("是否必须"),
					itemType: "RadioGroup",
					options: ITEM_OPTIONS.required
				}),
				type: defItem({
					value: "object",
					label: xI("类型"),
					itemType: "RadioGroup",
					options: [
						"object",
						"string",
						"number",
						"array",
						"boolean",
						"integer"
					].map(type => ({
						label: (
							<span class="mr10" title={type}>
								{ICON_STRATEGE[type]()}
							</span>
						),
						value: type
					}))
				}),
				enum: defItem({
					defaultValue: "",
					label: xI("枚举"),
					isTextarea: true,
					placeholder: xI("一行一个值，不需要符号分隔"),
					disabled: true
				}),
				enumDesc: defItem({
					defaultValue: "",
					isTextarea: true,
					label: xI("枚举描述")
				}),
				/* object */
				minProperties: defItem({
					defaultValue: "",
					label: xI("最小元素个数"),
					isNumber: true
				}),
				maxProperties: defItem({
					defaultValue: "",
					label: xI("最大元素个数"),
					isNumber: true
				}),
				/* string */
				default: defItem({
					defaultValue: "",
					label: xI("默认值")
				}),
				minLength: defItem({
					defaultValue: "",
					label: xI("最小字符数"),
					isNumber: true
				}),
				maxLength: defItem({
					defaultValue: "",
					label: xI("最大字符数"),
					isNumber: true
				}),
				pattern: defItem({
					defaultValue: "",
					placeholder: xI("new RegExp(xxxxxxx)适用"),
					label: xI("正则表达式")
				}),
				format: defItem({
					defaultValue: "",
					label: xI("格式"),
					itemType: "Select",
					options: [
						"date",
						"date-time",
						"email",
						"hostname",
						"ipv4",
						"ipv6",
						"uri"
					].map(label => ({ label, value: label })),
					clearable: true
				}),
				/* number */
				minimum: defItem({
					defaultValue: "",
					label: xI("最小值"),
					isNumber: true
				}),
				maximum: defItem({
					defaultValue: "",
					label: xI("最大值"),
					isNumber: true
				}),
				exclusiveMinimum: defItem({
					defaultValue: false,
					itemType: "Checkbox",
					label: xI("不包含最小值")
				}),
				exclusiveMaximum: defItem({
					defaultValue: false,
					itemType: "Checkbox",
					label: xI("不包含最大值")
				}),
				/* array */
				minItems: defItem({
					defaultValue: "",
					label: xI("最小元素个数"),
					isNumber: true
				}),
				maxItems: defItem({
					defaultValue: "",
					label: xI("最大元素个数"),
					isNumber: true
				}),
				uniqueItems: defItem({
					defaultValue: false,
					itemType: "Checkbox",
					label: xI("元素不可重复")
				}),
				booleanDefault: defItem({
					defaultValue: "",
					itemType: "Select",
					clearable: true,
					label: xI("默认值"),
					options: ITEM_OPTIONS.YesOrNo
				})
			}
		};
	},
	methods: {
		async syncToJsonTree() {
			const baseProps = ["key", "title", "description", "required", "type"];
			const SUB_PROPS_STRATEGY = {
				object: objectNeedProps,
				string: stringNeedProps,
				number: numberNeedProps,
				array: arrayNeedProps,
				boolean: booleanNeedProps,
				integer: numberNeedProps
			};

			const { type, title } = this.currentNode;
			const currentTypeNeedProps = baseProps.concat(SUB_PROPS_STRATEGY[type]);
			const targetValues = xU.pick(this.currentNode, currentTypeNeedProps);
			/* 需要记录出示的Node 的 Key ，才能在同步的时候找到原始的值 */

			if (!(await itemsInvalid())) {
				const oldkey = String(this.currentNode.key);
				/* key：对象的访问路径，纯代码角度，用于定位和替换 */
				const newKey = (() => {
					const array = oldkey.split(SPE);
					array[array.length - 1] = title;
					return array.join(SPE);
				})();
				/* root添加属性 */

				if (type === "object") {
					delete targetValues.children;
				}

				/* 非root */
				this.$emit("nodeSync", oldkey, {
					...targetValues,
					key: newKey
				});
			}
		}
	},
	computed: {
		currentNode: {
			get() {
				return this.jsmVM.currentNode;
			},
			set(currentNode) {
				if (currentNode.key !== this.jsmVM.currentNode.key) {
					return;
				} else {
					this.jsmVM.currentNode = xU.merge(
						{},
						this.jsmVM.currentNode,
						currentNode
					);
				}
			}
		}
	},
	render(vm) {
		if (!vm.currentNode) {
			return null;
		}

		return (
			<div class="SchemaEditor flex vertical flex1">
				<div class="SchemaEditor_button ">
					<xButton onClick={vm.syncToJsonTree} type="primary">
						{xI("同步到 JSON 树")}
					</xButton>
				</div>
				<xForm
					class="flex vertical flex1 overflow-auto"
					labelStyle={{ "min-width": "120px", width: "unset" }}>
					<xItem configs={this.dataXItem.key} v-model={vm.currentNode.key} />
					<xGap t="10" />
					<xItem
						configs={this.dataXItem.title}
						v-model={vm.currentNode.title}
					/>
					<xGap t="10" />
					<xItem
						configs={this.dataXItem.description}
						v-model={vm.currentNode.description}
					/>
					<xGap t="10" />
					<xItem
						configs={this.dataXItem.required}
						v-model={vm.currentNode.required}
					/>
					<xGap t="10" />
					<xItem configs={this.dataXItem.type} v-model={vm.currentNode.type} />
					{vm.currentNode.type === "object" && (
						<SubformObject configs={this.dataXItem} data={vm.currentNode} />
					)}
					{vm.currentNode.type === "string" && (
						<SubformString configs={this.dataXItem} data={vm.currentNode} />
					)}
					{vm.currentNode.type === "number" && (
						<SubformNumber configs={this.dataXItem} data={vm.currentNode} />
					)}
					{vm.currentNode.type === "array" && (
						<SubformArray configs={this.dataXItem} data={vm.currentNode} />
					)}
					{vm.currentNode.type === "boolean" && (
						<SubformBoolean configs={this.dataXItem} data={vm.currentNode} />
					)}
					{vm.currentNode.type === "integer" && (
						<SubformNumber
							configs={this.dataXItem}
							data={vm.currentNode}
							integer
						/>
					)}
				</xForm>
			</div>
		);
	}
});
