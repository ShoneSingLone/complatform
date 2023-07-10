import { defineComponent } from "vue";

export const arrayNeedProps = ["maxItems", "minItems", "uniqueItems"];

export const SubformArray = defineComponent({
	props: ["configs", "data"],
	render(vm) {
		return (
			<>
				<xGap t="10" />
				<div class="flex middle">
					<xItem
						configs={vm.configs.minItems}
						v-model={vm.data.minItems}
						class="flex1"
					/>
					<xGap t="10" />
					<xItem
						configs={vm.configs.maxItems}
						v-model={vm.data.maxItems}
						class="flex1"
					/>
				</div>
				<xGap t="10" />
				<xItem configs={vm.configs.uniqueItems} v-model={vm.data.uniqueItems} />
			</>
		);
	}
});
