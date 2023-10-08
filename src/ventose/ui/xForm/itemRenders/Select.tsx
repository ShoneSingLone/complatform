import { defineComponent } from "vue";
import { ReadonlyItem } from "./Readonly";
import { xU } from "../../ventoseUtils";
import {
	defineComponentProps,
	usePrivateItemValue,
	itemBaseProps
} from "../common";

export default defineComponent({
	props: defineComponentProps(itemBaseProps),
	setup(props) {
		return {
			_itemValue: usePrivateItemValue(props)
		};
	},
	render() {
		const vm = this;
		const { properties, listeners, propsWillDeleteFromConfigs } = vm;

		/* { properties, slots, listeners, propsWillDeleteFromConfigs } */
		/* 只读模式下的 */
		if (properties.isReadonly) {
			return <ReadonlyItem value={properties.value} />;
		}

		/* { properties, slots, listeners, propsWillDeleteFromConfigs } */
		const _property = xU.omit(properties, [
			...propsWillDeleteFromConfigs,
			"options",
			"renderOptions"
		]);
		const renderOptions = () => {
			if (properties.renderOptions) {
				return properties.renderOptions();
			} else {
				return xU.map(properties.options, option => {
					if (xU.isPlainObject(option.label)) {
						return <elOption value={option.value}>{option.label}</elOption>;
					} else {
						return <elOption value={option.value} label={option.label} />;
					}
				});
			}
		};
		return (
			<elSelect
				v-model={this._itemValue}
				{..._property}
				{...listeners}
				v-slots={{ default: renderOptions }}
			/>
		);
	}
});
