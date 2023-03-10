import { createApp } from "vue";
import App from "./App.vue";
import { State_App } from "./state/State_App";
import { appPlugins } from "./utils/common";
import "./main.electron";

async function main() {
	createApp(App)
		.use(appPlugins, {
			dependState: State_App
		})
		.mount("#app");
}

main();
