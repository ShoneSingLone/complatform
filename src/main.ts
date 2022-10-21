import { createApp } from "vue";
import App from "./App.vue";
import { appPlugins } from "ysrc/utils/common";
import { State_App } from "ysrc/state/State_App";

async function main() {
	createApp(App)
		.use(appPlugins, {
			dependState: State_App
		})
		.mount("#app");
}

main();
