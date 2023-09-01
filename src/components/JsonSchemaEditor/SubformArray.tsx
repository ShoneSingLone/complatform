import { defineComponent } from "vue";

export const arrayNeedProps = ["maxItems", "minItems", "uniqueItems"];

export const SubformArray = defineComponent({
	props: ["configs", "data"],
	render(vm) {
		return (
			<>
				<xGap t />
				<div class="flex middle">
					<xItem
						configs={vm.configs.minItems}
						v-model={vm.data.minItems}
						class="flex1"
					/>
					<xGap t />
					<xItem
						configs={vm.configs.maxItems}
						v-model={vm.data.maxItems}
						class="flex1"
					/>
				</div>
				<xGap t />
				<xItem configs={vm.configs.uniqueItems} v-model={vm.data.uniqueItems} />
			</>
		);
	}
});
