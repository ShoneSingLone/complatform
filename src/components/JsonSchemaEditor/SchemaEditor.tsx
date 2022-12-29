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
				...defItem({
					defaultValue: "",
					prop: "key",
					label: vm.$t("对象访问路径").label,
					readonly: true
				}),
				...defItem({
					defaultValue: "",
					prop: "title",
					label: vm.$t("字段名").label,
					onAfterValueEmit(val) {
						const array = String(vm.currentNode.key).split(SPE);
						array[array.length - 1] = val;
						vm.currentNode.key = array.join(SPE);
					},
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
					prop: "enum",
					label: vm.$t("枚举").label,
					isTextarea: true,
					placeholder: vm.$t("一行一个值，不需要符号分隔").label,
					disabled: true
				}),
				...defItem({
					defaultValue: "",
					prop: "enumDesc",
					label: vm.$t("默认值").label
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
				const res = diff(this.oldNode, currentNode);
				console.log("diff", JSON.stringify(res, null, 2));
				console.log(
					"currentNode",
					this.currentNode.key,
					"\n",
					JSON.stringify(currentNode, null, 2)
				);
				this.dataXItem.title.onAfterValueEmit(currentNode.title);
			}
		}
	},
	methods: {
		async submit() {
			const validateResults = await validateForm(this.dataXItem);
			if (AllWasWell(validateResults)) {
				const values = this.currentNode;
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
								<xItem
									configs={vm.dataXItem.minProperties}
									v-model={vm.currentNode.minProperties}
									class="flex1"
								/>
								<xGap t="10" />
								<xItem
									configs={vm.dataXItem.maxProperties}
									v-model={vm.currentNode.maxProperties}
									class="flex1"
								/>
							</div>
						</>
					);
				},
				string: () => (
					<>
						<xGap t="10" />
						<xItem
							configs={vm.dataXItem.default}
							v-model={vm.currentNode.default}
						/>
						<xGap t="10" />
						<div class="flex middle">
							<xItem
								configs={vm.dataXItem.minLength}
								v-model={vm.currentNode.minLength}
								class="flex1"
							/>
							<xGap t="10" />
							<xItem
								configs={vm.dataXItem.maxLength}
								v-model={vm.currentNode.maxLength}
								class="flex1"
							/>
						</div>
						<xGap t="10" />
						<xItem
							configs={vm.dataXItem.pattern}
							v-model={vm.currentNode.pattern}
						/>
						<xGap t="10" />
						<xItem configs={vm.dataXItem.enum} v-model={vm.currentNode.enum}>
							{/* 勾选之后才会显示enum备注 */}
							{{
								afterControll: () => (
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
								<xGap t="10" />
								<xItem
									configs={vm.dataXItem.enumDesc}
									v-model={vm.currentNode.enumDesc}
								/>
							</>
						)}
						<xGap t="10" />
						<xItem
							configs={vm.dataXItem.format}
							v-model={vm.currentNode.format}
						/>
					</>
				)
			};
			const fn = FORM_STRATEGY[vm.currentNode.type];
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
		}
	},
	render(vm) {
		if (!vm.currentNode) {
			return null;
		}
		return (
			<div className="SchemaEditor flex vertical flex1">
				<div class="SchemaEditor_button ">
					<aButton onClick={vm.submit} type="primary">
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
					{vm.vDomSubForm()}
				</xForm>
			</div>
		);
	}
});
