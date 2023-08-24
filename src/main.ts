import { createApp } from "vue";
import App from "./App.tsx";
import { Methods_App, stateApp } from "@/state/app";
import { appPlugins } from "./utils/common";
import "./main.electron";

async function main() {
	createApp(App).use(appPlugins, { dependState: stateApp }).mount("#app");
}

main();
