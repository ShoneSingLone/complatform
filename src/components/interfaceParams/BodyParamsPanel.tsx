import { defItem, xU } from "@ventose/ui";
import { ITEM_OPTIONS } from "src/utils/common.options";
import { defineComponent } from "vue";
import { BodyParamsForm } from "./BodyParamsForm";

export const BodyParamsPanel = defineComponent({
	/* req_body_type */
	props: ["params"],
	data(vm) {
		return {
			configsBodyType: defItem.item({
				prop: "configsBodyType",
				itemType: "RadioGroup",
				options: ITEM_OPTIONS.interfaceBodyType
			})
		};
	},
	render() {
		return (
			<aCard>
				{{
					extra: () => {
						if (
							xU.find(ITEM_OPTIONS.interfaceBodyType, {
								value: this.params.req_body_type
							})?.isForm
						) {
							return (<a>批量添加</a>);
						}
						return null;
					},
					title: () => {
						return (
							<>
								<xItem
									v-model={this.params.req_body_type}
									configs={this.configsBodyType}
								/>
							</>
						);
					},
					default: () => {
						return (
							<>
								<BodyParamsForm params={this.params} />
							</>
						);
					}
				}}
			</aCard>
		);
	}
});
