import { defineComponent, onMounted } from "vue";
import { stateApp } from "@/state/app";
import { cptRouter } from "@/router/router";
import { InterfaceLeftSider } from "./InterfaceLeftSider";
import { stateInterface } from "@/state/interface";

export const ViewInterface = defineComponent({
	setup() {
		stateInterface.__resetState();
		stateInterface._updateInterfaceMenuList();
		onMounted(() => {
			stateInterface._resetURL();
		});
		return function () {
			return (
				<section
					id="ViewProjectInterface"
					v-xloading={stateInterface.isLoading}>
					<InterfaceLeftSider />
					<main class="flex flex1 padding10" style="width:1px;">
						{JSON.stringify(cptRouter.value.query)}
					</main>
				</section>
			);
		};
	}
});
