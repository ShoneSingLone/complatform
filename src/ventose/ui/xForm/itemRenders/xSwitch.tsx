import { xU } from "../../ventoseUtils";
import { defineComponent } from "vue";
import { useItemRender } from "./hooks/useItemRender";

export const xSwitch = defineComponent({
	props: ["properties", "slots", "listeners", "propsWillDeleteFromConfigs"],
	setup() {
		const { privateModelValue } = useItemRender();

		return function (vm) {
			const { properties, listeners, propsWillDeleteFromConfigs } = vm;
			/*用span包裹：宽度自适应*/
			return (
				<div class="x-item_switch">
					<ElSwitch
						v-model={privateModelValue.value}
						{...xU.omit(listeners, ["onEmitItemValue"])}
						{...xU.omit(properties, ["value", ...propsWillDeleteFromConfigs])}
					/>
				</div>
			);
		};
	}
});
