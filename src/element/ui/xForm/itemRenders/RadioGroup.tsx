import { defineComponent, resolveComponent } from "vue";
import { ReadonlyItem } from "./Readonly";
import { xU } from "../../ventoseUtils";

/**
 * @Description
 * @date 2021-11-09
 * @param {any} {properties isPassword 密码输入框 isTextarea
 * @param {any} slots}
 * @returns {any}
 */

export default defineComponent({
	props: ["properties", "slots", "listeners", "propsWillDeleteFromConfigs"],
	data(vm) {
		return {};
	},
	computed: {
		_modelValue: {
			get() {
				return this.properties.value;
			},
			set(val) {
				this.listeners["onEmitItemValue"](val);
			}
		}
	},
	render({ properties, slots, listeners, propsWillDeleteFromConfigs }) {
		const Radio = resolveComponent("ElRadio");
		const RadioGroup = resolveComponent("ElRadioGroup");
		const RadioButton = resolveComponent("ElRadioButton");

		const PROPERTY_OPTIONS = properties.options;
		const componentPropertyOmitOptions = xU.omit(properties, ["options"]);

		const renderOptions = () => {
			if (properties.isButton) {
				return xU.map(PROPERTY_OPTIONS, option => {
					return <RadioButton label={option.value}>{option.label}</RadioButton>;
				});
			}
			return xU.map(PROPERTY_OPTIONS, option => {
				return <Radio label={option.value}>{option.label}</Radio>;
			});
		};

		return (
			<RadioGroup
				v-model={this._modelValue}
				{...componentPropertyOmitOptions}
				{...listeners}
				v-slots={{ default: renderOptions }}
			/>
		);
	}
});
