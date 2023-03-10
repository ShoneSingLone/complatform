import { defineComponent } from "vue";

export const objectNeedProps = ["maxProperties", "minProperties"];

export const SubformObject = defineComponent({
	props: ["configs", "data"],
	render(vm) {
		return (
			<>
				<xGap t="10" />
				<div class="flex middle">
					<xItem
						configs={vm.configs.minProperties}
						v-model={vm.data.minProperties}
						class="flex1"
					/>
					<xGap t="10" />
					<xItem
						configs={vm.configs.maxProperties}
						v-model={vm.data.maxProperties}
						class="flex1"
					/>
				</div>
			</>
		);
	}
});
