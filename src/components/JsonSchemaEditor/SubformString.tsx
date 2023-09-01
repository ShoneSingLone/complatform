import { defineComponent } from "vue";

export const stringNeedProps = [
	"default",
	"minLength",
	"maxLength",
	"pattern",
	"enum",
	"isUseEnum",
	"enumDesc",
	"format"
];

export const SubformString = defineComponent({
	props: ["configs", "data"],
	render(vm) {
		return (
			<>
				<xGap t />
				<xItem configs={vm.configs.default} v-model={vm.data.default} />
				<xGap t />
				<div class="flex middle">
					<xItem
						configs={vm.configs.minLength}
						v-model={vm.data.minLength}
						class="flex1"
					/>
					<xGap t />
					<xItem
						configs={vm.configs.maxLength}
						v-model={vm.data.maxLength}
						class="flex1"
					/>
				</div>
				<xGap t />
				<xItem configs={vm.configs.pattern} v-model={vm.data.pattern} />
				<xGap t />
				<xItem configs={vm.configs.enum} v-model={vm.data.enum}>
					{/* 勾选之后才会显示enum备注 */}
					{{
						afterControll: () => (
							<ElCheckbox
								class="ml10"
								checked={!!vm.data.isUseEnum}
								onUpdate:checked={val => {
									vm.configs.enum.disabled = !val;
									vm.data.isUseEnum = val;
								}}
							/>
						)
					}}
				</xItem>
				{vm.data.isUseEnum ? (
					<>
						<xGap t />
						<xItem configs={vm.configs.enumDesc} v-model={vm.data.enumDesc} />
					</>
				) : null}
				<xGap t />
				<xItem configs={vm.configs.format} v-model={vm.data.format} />
			</>
		);
	}
});
