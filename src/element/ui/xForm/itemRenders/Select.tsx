import { defineComponent } from "vue";
import { ReadonlyItem } from "./Readonly";
import { xU } from "../../ventoseUtils";

export default defineComponent({
	props: ["properties", "slots", "listeners", "propsWillDeleteFromConfigs"],
	mounted() {
		xU("xItem Select");
	},
	data(vm) {
		return {};
	},
	methods: {},
	watch: {},
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
		xU(_property);
		const renderOptions = () => {
			if (properties.renderOptions) {
				return properties.renderOptions();
			} else {
				return xU.map(properties.options, option => {
					if (xU.isPlainObject(option.label)) {
						return <ElOption value={option.value}>{option.label}</ElOption>;
					} else {
						return <ElOption value={option.value} label={option.label} />;
					}
				});
			}
		};
		return (
			<ElSelect
				v-model={this._modelValue}
				{..._property}
				{...listeners}
				v-slots={{ default: renderOptions }}
			/>
		);
	}
});
