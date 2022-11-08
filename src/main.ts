import { createApp } from "vue";
import App from "./App.vue";
import Demo from "./Demo.vue";
import { router } from "@/router/router";
import { appPlugins } from "@/utils/common";
import { State_App } from "@/state/State_App";

async function main() {
	createApp(App)
		.use(appPlugins, {
			dependState: State_App
		})
		.mount("#app");
}

// main();

function demo() {
	createApp(Demo)
		.use(router)
		.mount("#app");
}

demo()
