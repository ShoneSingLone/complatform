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
import { defineComponent, h } from "vue";
import { ITEM_OPTIONS } from "src/utils/common.options";

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
					},
					rules: [FormRules.required()]
				}),
				...defItem({
					value: false,
					prop: "required",
					label: "required",
					itemType: "RadioGroup",
					options: ITEM_OPTIONS.required
				}),
				...defItem({
					value: "object",
					prop: "type",
					label: "type",
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
				})
			}
		};
	},
	watch: {
		node: {
			deep: true,
			handler(node) {
				this.oldNode = node || {};
				const { title, type, required, key } = node;
				setValueTo(this.dataXItem, {
					key,
					title,
					type,
					required: required || "0"
				});
				this.dataXItem.title.onAfterValueEmit(title);
			}
		},
		dataXItemValues(values) {
			this.$emit(
				"nodeChange",
				xU.merge({}, this.oldNode, values),
				this.oldNode
			);
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
		}
	},
	computed: {
		dataXItemValues() {
			return pickValueFrom(this.dataXItem);
		}
	},
	render(vm) {
		if (!vm.node) {
			return null;
		}
		return (
			<div className="SchemaEditor flex vertical flex1">
				<xForm
					class="flex vertical"
					labelStyle={{ "min-width": "120px", width: "unset" }}>
					<xGap t="10" /> <xItem configs={this.dataXItem.key} />
					<xGap t="10" /> <xItem configs={this.dataXItem.title} />
					<xGap t="10" /> <xItem configs={this.dataXItem.required} />
					<xGap t="10" /> <xItem configs={this.dataXItem.type} />
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
