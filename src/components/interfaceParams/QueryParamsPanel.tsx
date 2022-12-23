import { defineComponent } from "vue";
import { QueryParamsForm } from "./QueryParamsForm";


export const QueryParamsPanel = defineComponent({
	/* req_body_type */
	props: {
		reqQuery: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	emits: ["update:reqQuery"],
	data(vm) {
		return {};
	},
	render(vm) {
		debugger;
		return (
			<aCard>
				{{
					default: () => {
						return <QueryParamsForm
							reqQuery={this.reqQuery}
							onUpdate:reqQuery={val => {
								vm.$emit("update:reqQuery", val)
							}}
						/>;
					}
				}}
			</aCard>
		);
	}
});
