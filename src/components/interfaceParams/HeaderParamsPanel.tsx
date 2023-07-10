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
	emits: ["update:reqHeaders"],
	data(vm) {
		return {};
	},
	render(vm) {
		return (
			<ElCard>
				<HeaderParamsForm reqHeaders={this.reqHeaders} />
			</ElCard>
		);
	}
});
