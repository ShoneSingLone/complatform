import { defineComponent } from "vue";

export const booleanNeedProps = ["booleanDefault"];

export const SubformBoolean = defineComponent({
	props: ["configs", "data"],
	render(vm) {
		return (
			<>
				<xGap t="10" />
				<xItem
					configs={vm.configs.booleanDefault}
					v-model={vm.data.booleanDefault}
				/>
			</>
		);
	}
});
