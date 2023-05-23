import { defineComponent } from "vue";
import { xU } from "@ventose/ui";

export const numberNeedProps = [
	"default",
	"maximum",
	"minimum",
	"exclusiveMaximum",
	"exclusiveMinimum",
	"enum",
	"default",
	"isUseEnum"
];

export const SubformNumber = defineComponent({
	props: ["configs", "data", "integer"],
	methods: {
		parserNum(val) {
			if (this.integer) {
				return parseInt(val);
			}
			return val;
		}
	},
	render(vm) {
		xU(vm.integer);
		return (
			<>
				<xGap t="10" />
				<xItem configs={vm.configs.default} v-model={vm.data.default} />
				<xGap t="10" />
				<div class=" ant-form-item ant-form-item-with-help x-item flex ">
					<xItem
						configs={vm.configs.minimum}
						v-model={vm.data.minimum}
						class="flex1"
						parser={val => vm.parserNum(val)}
					/>
					<xItem
						configs={vm.configs.exclusiveMinimum}
						v-model={vm.data.exclusiveMinimum}
					/>
					<xGap r="16" />
				</div>
				<xGap t="10" />
				<div class=" ant-form-item ant-form-item-with-help x-item flex ">
					<xItem
						configs={vm.configs.maximum}
						v-model={vm.data.maximum}
						class="flex1"
						parser={val => vm.parserNum(val)}
					/>
					<xItem
						configs={vm.configs.exclusiveMaximum}
						v-model={vm.data.exclusiveMaximum}
					/>
					<xGap r="16" />
				</div>
				<xGap t="10" />
				<xItem configs={vm.configs.enum} v-model={vm.data.enum}>
					{/* 勾选之后才会显示enum备注 */}
					{{
						afterControll: () => (
							<aCheckbox
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
						<xGap t="10" />
						<xItem configs={vm.configs.enumDesc} v-model={vm.data.enumDesc} />
					</>
				) : null}
			</>
		);
	}
});
