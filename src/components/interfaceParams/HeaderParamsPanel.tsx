import { defineComponent } from "vue";
import { HeaderParamsForm } from "./HeaderParamsForm";

export const HeaderParamsPanel = defineComponent({
	/* req_body_type */
	props: {
		reqHeaders: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	data(vm) {
		return {};
	},
	render(vm) {
		
		return (
			<aCard>
				{{
					default: () => {
						return <HeaderParamsForm
							reqHeaders={this.reqHeaders}
							onUpdate:reqHeaders={val => {
								vm.$emit("update:reqHeaders", val)
							}}
						/>;
					}
				}}
			</aCard>
		);
	}
});
