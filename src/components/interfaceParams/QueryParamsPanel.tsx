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
		return (
			<elCard>
				<QueryParamsForm reqQuery={this.reqQuery} />
			</elCard>
		);
	}
});
