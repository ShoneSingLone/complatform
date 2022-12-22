import { defItem, UI, xU } from "@ventose/ui";
import { ITEM_OPTIONS } from "src/utils/common.options";
import { defineComponent } from "vue";
import { BodyParamsForm } from "./BodyParamsForm";
import { DialogBulkValues } from "./DialogBulkValues";
import { HeaderParamsForm } from "./HeaderParamsForm";

export const HeaderParamsPanel = defineComponent({
	/* req_body_type */
	props: ["params"],
	data(vm) {
		return {};
	},
	render() {
		return (
			<aCard>
				{{
					default: () => {
						debugger;
						return <>{ this.params.req_headers } <HeaderParamsForm v-model:params={this.params} /></>;
					}
				}}
			</aCard>
		);
	}
});
