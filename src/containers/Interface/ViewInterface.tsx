import { defineComponent } from "vue";
import { stateApp } from "@/state/app";
import { Cpt_url } from "@/router/router";
import { InterfaceLeftSider } from "./InterfaceLeftSider";
import { stateInterface } from "@/state/interface";

export const ViewInterface = defineComponent({
	setup() {
		stateInterface._resetURL();
		return function () {
			return (
				<section
					id="ViewProjectInterface"
					v-xloading={stateInterface.isLoading}>
					<InterfaceLeftSider />
					<main class="flex flex1 padding10" style="width:1px;">
						asdfsf
					</main>
				</section>
			);
		};
	}
});
