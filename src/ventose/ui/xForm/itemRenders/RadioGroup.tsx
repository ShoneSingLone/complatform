import { defineComponent, resolveComponent } from "vue";
import { ReadonlyItem } from "./Readonly";
import { xU } from "../../ventoseUtils";
import {
	defineComponentProps,
	itemBaseProps,
	usePrivateItemValue
} from "../common";

/**
 * @Description
 * @date 2021-11-09
 * @param {any} {properties isPassword 密码输入框 isTextarea
 * @param {any} slots}
 * @returns {any}
 */

export default defineComponent({
	props: defineComponentProps(itemBaseProps),
	setup(props) {
		return {
			_itemValue: usePrivateItemValue(props)
		};
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
				v-model={this._itemValue}
				{...componentPropertyOmitOptions}
				{...listeners}
				v-slots={{ default: renderOptions }}
			/>
		);
	}
});
