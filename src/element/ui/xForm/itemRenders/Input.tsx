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
		return {
			oldComponent: "",
			ComponentInstance: ""
		};
	},
	methods: {
		diffComponent(type) {
			if (type === this.oldComponent) {
				return this.ComponentInstance;
			}
			this.oldComponent = type;
			const ComponentInstance = resolveComponent(type);
			/* @ts-ignore */
			ComponentInstance.__v_skip = true;
			this.ComponentInstance = ComponentInstance;
		}
	},
	computed: {
		_modelValue: {
			get() {
				return this.properties.value;
			},
			set(val) {
				this.listeners["onEmitItemValue"](val);
			}
		},
		component({ properties }) {
			if (!this.ComponentInstance) {
				this.diffComponent("ElInput");
			}
			if (properties.isNumber) {
				this.diffComponent("ElInputNumber");
			}
			return this.ComponentInstance;
		}
	},
	render(vm) {
		const {
			properties,
			slots,
			listeners,
			propsWillDeleteFromConfigs,
			component
		} = vm;

		/* { properties, slots, listeners, propsWillDeleteFromConfigs } */
		/* 只读模式下的 */
		if (properties.isReadonly) {
			return <ReadonlyItem value={properties.value} />;
		}

		if (properties.isTextarea) {
			properties.type = "textarea";
			properties.autosize = properties.autoSize || {
				minRows: 4,
				maxRows: 6
			};
		}
		if (properties.isPassword) {
			properties.showPassword = true;
		}

		return (
			<component
				v-model={this._modelValue}
				{...xU.omit(properties, [
					"value",
					"isTextarea",
					...propsWillDeleteFromConfigs
				])}
				{...xU.omit(listeners, ["onEmitItemValue"])}
				v-slots={slots}
			/>
		);
	}
});
