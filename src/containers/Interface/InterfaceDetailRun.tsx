import { defineComponent } from "vue";
import { xScope } from "@/ventose/ui";

export const InterfaceDetailRun = defineComponent({
	props: ["info"],
	setup() {
		var state = {};
		type t_vm = typeof state;
		state = xScope<t_vm>(state);

		return function () {
			return <h1>Run</h1>;
		};
	}
});
