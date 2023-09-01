import { computed, defineComponent, onMounted, reactive } from "vue";
import { stateInterface } from "@/state/interface";
import { InterfaceAside } from "@/containers/Interface/InterfaceAside";
import { InterfaceMain } from "@/containers/Interface/InterfaceMain";
import { InterfaceDetail } from "@/containers/Interface/InterfaceDetail";
import { xU } from "@/ventose/ui";
import { xScope } from "../../ventose/ui";
import { cptRouter } from "@/router/router";
import { INTERFACE } from "@/utils/variable";

export const ViewInterface = defineComponent({
	setup() {
		stateInterface.__resetState();
		stateInterface._updateInterfaceMenuList();
		xU(stateInterface);

		onMounted(() => {
			stateInterface._resetURL();
		});

		const cpt_isShowDetail = computed(() => {
			return cptRouter.value.query.interface_type === INTERFACE;
		});

		return function () {
			return (
				<main id="ViewInterface">
					<InterfaceAside />
					{cpt_isShowDetail.value ? <InterfaceDetail /> : <InterfaceMain />}
				</main>
			);
		};
	}
});
