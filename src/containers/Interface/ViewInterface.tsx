import { defineComponent, onMounted, reactive } from "vue";
import { stateInterface } from "@/state/interface";
import { InterfaceAside } from "@/containers/Interface/InterfaceAside";
import { InterfaceMain } from "@/containers/Interface/InterfaceMain";
import { xU } from "@/ventose/ui";
import { xScope } from "../../ventose/ui";

export const ViewInterface = defineComponent({
	setup() {
		stateInterface.__resetState();
		stateInterface._updateInterfaceMenuList();
		xU(stateInterface);

		onMounted(() => {
			stateInterface._resetURL();
		});

		return function () {
			return (
				<main id="ViewInterface">
					<InterfaceAside />
					<InterfaceMain />
				</main>
			);
		};
	}
});
