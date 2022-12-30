import {
	AllWasWell,
	components,
	defItem,
	FormRules,
	pickValueFrom,
	validateForm,
	xU
} from "@ventose/ui";
import { defineComponent, h, inject } from "vue";
import { ITEM_OPTIONS } from "src/utils/common.options";
import { SubformObject } from "./SubformObject";
import { SubformString } from "./SubformString";
import { SubformNumber } from "./SubformNumber";
import { SubformArray } from "./SubformArray";
import { SubformBoolean } from "./SubformBoolean";

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
				...defItem({
					/* 在编辑的时候不需要变化，但是在同步的时候需要提交【newKey，oldKey】，oldKey用于定位原属性位置 */
					defaultValue: "",
					prop: "key",
					label: vm.$t("对象访问路径").label,
					readonly: true
				}),
				...defItem({
					defaultValue: "",
					prop: "title",
					label: vm.$t("字段名").label,
					rules: [FormRules.required()]
				}),
				...defItem({
					defaultValue: "",
					prop: "description",
					label: vm.$t("描述").label,
					isTextarea: true
				}),
				...defItem({
					defaultValue: "0",
					prop: "required",
					label: vm.$t("是否必须").label,
					itemType: "RadioGroup",
					options: ITEM_OPTIONS.required
				}),
				...defItem({
					value: "object",
					prop: "type",
					label: vm.$t("类型").label,
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
				...defItem({
					defaultValue: "",
					prop: "enum",
					label: vm.$t("枚举").label,
					isTextarea: true,
					placeholder: vm.$t("一行一个值，不需要符号分隔").label,
					disabled: true
				}),
				...defItem({
					defaultValue: "",
					prop: "enumDesc",
					isTextarea: true,
					label: vm.$t("枚举描述").label
				}),
				/* object */
				...defItem({
					defaultValue: "",
					prop: "minProperties",
					label: vm.$t("最小元素个数").label,
					isNumber: true
				}),
				...defItem({
					defaultValue: "",
					prop: "maxProperties",
					label: vm.$t("最大元素个数").label,
					isNumber: true
				}),
				/* string */
				...defItem({
					defaultValue: "",
					prop: "default",
					label: vm.$t("默认值").label
				}),
				...defItem({
					defaultValue: "",
					prop: "minLength",
					label: vm.$t("最小字符数").label,
					isNumber: true
				}),
				...defItem({
					defaultValue: "",
					prop: "maxLength",
					label: vm.$t("最大字符数").label,
					isNumber: true
				}),
				...defItem({
					defaultValue: "",
					prop: "pattern",
					placeholder: vm.$t("new RegExp(xxxxxxx)适用").label,
					label: vm.$t("正则表达式").label
				}),
				...defItem({
					defaultValue: "",
					prop: "format",
					label: vm.$t("格式").label,
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
					allowClear: true
				}),
				/* number */
				...defItem({
					defaultValue: "",
					prop: "minimum",
					label: vm.$t("最小值").label,
					isNumber: true
				}),
				...defItem({
					defaultValue: "",
					prop: "maximum",
					label: vm.$t("最大值").label,
					isNumber: true
				}),
				...defItem({
					defaultValue: false,
					itemType: "Checkbox",
					prop: "exclusiveMinimum",
					label: vm.$t("不包含最小值").label,
				}),
				...defItem({
					defaultValue: false,
					itemType: "Checkbox",
					prop: "exclusiveMaximum",
					label: vm.$t("不包含最大值").label,
				}),
				/* array */
				...defItem({
					defaultValue: "",
					prop: "minItems",
					label: vm.$t("最小元素个数").label,
					isNumber: true
				}),
				...defItem({
					defaultValue: "",
					prop: "maxItems",
					label: vm.$t("最大元素个数").label,
					isNumber: true
				}),
				...defItem({
					defaultValue: false,
					itemType: "Checkbox",
					prop: "uniqueItems",
					label: vm.$t("元素不可重复").label,
				}),
				...defItem({
					defaultValue: "",
					itemType: "Select",
					allowClear: true,
					prop: "booleanDefault",
					label: vm.$t("默认值").label,
					options: ITEM_OPTIONS.YesOrNo
				}),
			}
		};
	},
	methods: {
		async syncToJsonTree() {
			/* 需要记录出示的Node 的 Key ，才能在同步的时候找到原始的值 */
			const validateResults = await validateForm(this.dataXItem);
			if (AllWasWell(validateResults)) {

				const oldkey = String(this.currentNode.key);
				const newKey = (() => {
					const array = oldkey.split(SPE);
					array[array.length - 1] = this.currentNode.title;
					return array.join(SPE);
				})();
				/* root添加属性 */

				/* 非root */

				this.$emit("nodeSync", oldkey, {
					...this.currentNode,
					key: newKey
				});
			}
		},
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
			<div className="SchemaEditor flex vertical flex1">
				<div class="SchemaEditor_button ">
					<aButton onClick={vm.syncToJsonTree} type="primary">
						{vm.$t("同步到左侧").label}
					</aButton>
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
					{vm.currentNode.type === "object" && <SubformObject configs={this.dataXItem} data={vm.currentNode} />}
					{vm.currentNode.type === "string" && <SubformString configs={this.dataXItem} data={vm.currentNode} />}
					{vm.currentNode.type === "number" && <SubformNumber configs={this.dataXItem} data={vm.currentNode} />}
					{vm.currentNode.type === "array" && <SubformArray configs={this.dataXItem} data={vm.currentNode} />}
					{vm.currentNode.type === "boolean" && <SubformBoolean configs={this.dataXItem} data={vm.currentNode} />}
					{vm.currentNode.type === "integer" && <SubformNumber configs={this.dataXItem} data={vm.currentNode} integer />}
				</xForm>
			</div>
		);
	}
});
