import { defineComponent } from "vue";
import { xU } from "../../ventoseUtils";
import { ReadonlyItem } from "./Readonly";
import {
	defineComponentProps,
	itemBaseProps,
	usePrivateItemValue
} from "../common";

export const ComponentSample = defineComponent({
	props: defineComponentProps(itemBaseProps),
	setup(props) {
		return {
			_itemValue: usePrivateItemValue(props)
		};
	},
	mounted() {
		xU("xItem ComponentSample");
	},
	watch: {},
	computed: {},
	render(vm) {
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
			}
			return null;
		};
		return (
			<ElInput
				v-model={this._itemValue}
				{...listeners}
				{..._property}
				v-slots={{ default: renderOptions }}
			/>
		);
	}
});
