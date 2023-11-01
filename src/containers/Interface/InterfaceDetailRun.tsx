import { defineComponent } from "vue";
import { defItem, xI, xScope } from "@/ventose/ui";
import { FormRules } from "@/utils/common.FormRules";

export const InterfaceDetailRun = defineComponent({
	props: ["info"],
	setup() {
		var state = {
			yapiProxyHost: defItem({
				value: "",
				label: xI("ProxyHost"),
				placeholder: "Host"
			}),
			yapiProxyPort: defItem({
				value: "",
				label: xI("ProxyPort"),
				placeholder: "Port"
			})
		};
		type t_vm = typeof state;
		state = xScope<t_vm>(state);

		return function () {
			return (
				<xForm>
					<xItem configs={state.yapiProxyHost} />
					{/* 代理的host */}
					<xItem configs={state.yapiProxyPort} />
				</xForm>
			);
		};
	}
});
