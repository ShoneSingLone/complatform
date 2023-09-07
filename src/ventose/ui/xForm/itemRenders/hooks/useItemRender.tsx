import { computed, getCurrentInstance } from "vue";

export function useItemRender() {
	const { ctx } = getCurrentInstance();
	const privateModelValue = computed({
		get() {
			return ctx.$parent.privateValue;
		},
		set(val) {
			ctx.listeners["onEmitItemValue"](val);
		}
	});
	return {
		privateModelValue
	};
}
