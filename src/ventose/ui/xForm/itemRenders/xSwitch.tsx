import { xU } from "../../ventoseUtils";
import { defineComponent } from "vue";
import { useItemRender } from "./hooks/useItemRender";
import {
	defineComponentProps,
	itemBaseProps,
	usePrivateItemValue
} from "../common";

export const xSwitch = defineComponent({
	props: defineComponentProps(itemBaseProps),
	setup(props) {
		return {
			_itemValue: usePrivateItemValue(props)
		};
	},
	render() {
		const { properties, listeners, propsWillDeleteFromConfigs } = this;
		/*用span包裹：宽度自适应*/
		return (
			<div class="x-item_switch">
				<elSwitch
					v-model={this._itemValue}
					{...xU.omit(listeners, ["onEmitItemValue"])}
					{...xU.omit(properties, ["value", ...propsWillDeleteFromConfigs])}
				/>
			</div>
		);
	}
});
