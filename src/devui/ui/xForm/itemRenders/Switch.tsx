import { defineComponent } from "vue";
import { xU } from "../../ventoseUtils";

export default defineComponent({
	props: ["properties", "slots", "listeners", "propsWillDeleteFromConfigs"],
	mounted() {
		xU("xItem Switch");
	},
	methods: {
		handleClick() {
			debugger;
			this.listeners["onUpdate:value"](!this.properties.value);
		}
	},
	render({ handleClick, properties }) {
		debugger;
		/*用span包裹：宽度自适应*/
		return (
			<div class="x-item_switch">
				<aSwitch
					{...xU.omit(
						properties,
						this.propsWillDeleteFromConfigs.concat([
							"value",
							"label",
							"itemType"
						])
					)}
					checked={properties.value}
					onClick={handleClick}
				/>
			</div>
		);
	}
});
