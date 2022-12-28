import {
	xU,
	defItem,
	setValueTo,
	components,
	pickValueFrom,
	FormRules,
	AllWasWell,
	validateForm
} from "@ventose/ui";
import { defineComponent, h, inject, markRaw } from "vue";
import { ITEM_OPTIONS } from "src/utils/common.options";
import { diff } from "jsondiffpatch";

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
				...defItem({ value: "", prop: "key", label: "key", readonly: true }),
				...defItem({
					value: "",
					prop: "title",
					label: vm.$t("字段名").label,
					onAfterValueEmit(val) {
						const array = String(vm.dataXItem.key.value).split(SPE);
						array[array.length - 1] = val;
						vm.dataXItem.key.value = array.join(SPE);
					},
					rules: [FormRules.required()]
				}),
				...defItem({
					value: "",
					prop: "description",
					label: vm.$t("描述").label,
					isTextarea: true
				}),
				...defItem({
					value: false,
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
				/* object */
				...defItem({
					value: "",
					prop: "minProperties",
					label: vm.$t("最小元素个数").label,
					isNumber: true
				}),
				...defItem({
					value: "",
					prop: "maxProperties",
					label: vm.$t("最大元素个数").label,
					isNumber: true
				}),
				/* string */
				...defItem({
					value: "",
					prop: "default",
					label: vm.$t("默认值").label
				}),
				...defItem({
					value: "",
					prop: "minLength",
					label: vm.$t("最小字符数").label,
					isNumber: true
				}),
				...defItem({
					value: "",
					prop: "maxLength",
					label: vm.$t("最大字符数").label,
					isNumber: true
				}),
				...defItem({
					value: "",
					prop: "pattern",
					placeholder: vm.$t("new RegExp(xxxxxxx)适用").label,
					label: vm.$t("正则表达式").label
				}),
				...defItem({
					value: "",
					prop: "enum",
					label: vm.$t("枚举").label,
					isTextarea: true,
					placeholder: vm.$t("一行一个值，不需要符号分隔").label,
					disabled: true
				}),
				...defItem({
					value: "",
					prop: "enumDesc",
					label: vm.$t("默认值").label
				}),
				...defItem({
					value: "",
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
				})
			}
		};
	},

	watch: {
		currentNode: {
			deep: true,
			handler(currentNode) {
				if (!currentNode) {
					return;
				}
				this.dataXItem.title.onAfterValueEmit(currentNode.title);
			}
		},
		dataXItemValues(values) {
			const newNode = xU.merge({}, this.oldNode, values);
			const res = diff(this.oldNode, newNode);
			console.log("diff", JSON.stringify(res, null, 2));
			this.currentNode = newNode;
		}
	},
	methods: {
		async submit() {
			const validateResults = await validateForm(this.dataXItem);
			if (AllWasWell(validateResults)) {
				const values = this.dataXItemValues;
				this.$emit(
					"nodeSync",
					xU.merge({}, this.oldNode, values),
					this.oldNode
				);
				this.oldNode.key = values.key;
			}
		},
		vDomSubForm() {
			const vm = this;
			/* default minLength maxLength pattern enum enumDesc format */
			const FORM_STRATEGY = {
				object: () => {
					return (
						<>
							<xGap t="10" />
							<div class="flex middle">
								<xItem configs={vm.dataXItem.minProperties} class="flex1" />
								<xGap t="10" />
								<xItem configs={vm.dataXItem.maxProperties} class="flex1" />
							</div>
						</>
					);
				},
				string: () => (
					<>
						<xGap t="10" /> <xItem configs={vm.dataXItem.default} />
						<xGap t="10" />
						<div class="flex middle">
							<xItem configs={vm.dataXItem.minLength} class="flex1" />
							<xGap t="10" />
							<xItem configs={vm.dataXItem.maxLength} class="flex1" />
						</div>
						<xGap t="10" /> <xItem configs={vm.dataXItem.pattern} />
						<xGap t="10" />{" "}
						<xItem configs={vm.dataXItem.enum}>
							{/* 勾选之后才会显示enum备注 */}
							{{
								afterControll: (
									<aCheckbox
										class="ml10"
										checked={!vm.dataXItem.enum.disabled}
										onUpdate:checked={val =>
											(vm.dataXItem.enum.disabled = !val)
										}
									/>
								)
							}}
						</xItem>
						{vm.dataXItem.enum.disabled ? null : (
							<>
								<xGap t="10" /> <xItem configs={vm.dataXItem.enumDesc} />
							</>
						)}
						<xGap t="10" /> <xItem configs={vm.dataXItem.format} />
					</>
				)
			};
			const fn = FORM_STRATEGY[vm.dataXItem.type.value];
			return fn ? fn() : null;
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
		},
		dataXItemValues() {
			return pickValueFrom(this.dataXItem);
		}
	},
	render(vm) {
		if (!vm.currentNode) {
			return null;
		}
		return (
			<div className="SchemaEditor flex vertical flex1">
				<xForm
					class="flex vertical"
					labelStyle={{ "min-width": "120px", width: "unset" }}>
					<xGap t="10" />{" "}
					<xItem configs={this.dataXItem.key} v-model={vm.currentNode.key} />
					<xGap t="10" />{" "}
					<xItem
						configs={this.dataXItem.title}
						v-model={vm.currentNode.title}
					/>
					<xGap t="10" />{" "}
					<xItem
						configs={this.dataXItem.description}
						v-model={vm.currentNode.description}
					/>
					<xGap t="10" />{" "}
					<xItem
						configs={this.dataXItem.required}
						v-model={vm.currentNode.required}
					/>
					<xGap t="10" />{" "}
					<xItem configs={this.dataXItem.type} v-model={vm.currentNode.type} />
					{vm.vDomSubForm()}
				</xForm>
				<div class="SchemaEditor_button ">
					<aButton onClick={vm.submit} type="primary">
						{vm.$t("同步到左侧").label}
					</aButton>
				</div>
			</div>
		);
	}
});
