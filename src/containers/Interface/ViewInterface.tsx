import { defineComponent, onMounted } from "vue";
import { stateApp } from "@/state/app";
import { Cpt_url } from "@/router/router";
import { InterfaceLeftSider } from "./InterfaceLeftSider";
import { stateInterface } from "@/state/interface";

export const ViewInterface = defineComponent({
	setup() {
		stateInterface.__resetState();

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
						{JSON.stringify(Cpt_url.value.query)}
					</main>
				</section>
			);
		};
	}
});
