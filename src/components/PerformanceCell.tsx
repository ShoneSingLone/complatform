import { xU } from "@/ventose/ui";
import { defineComponent, ref } from "vue";

let currentTargetId = ref(0);

export const PerformanceCell = defineComponent({
	data(vm) {
		return {};
	},
	methods: {
		handleMouseenter({ currentTarget }) {
			currentTargetId.value = currentTarget.id;
		}
	},
	computed: {
		isRennderComponennt() {
			return xU.isSame(currentTargetId.value, this._.uid);
		},
		innerVNode() {
			return this.isRennderComponennt
				? this.$slots?.editor?.()
				: this.$slots?.render?.();
		}
	},
	render() {
		return (
			<div
				onMouseenter={this.handleMouseenter}
				id={this._.uid}
				class="width100">
				{this.innerVNode}
			</div>
		);
	}
});
