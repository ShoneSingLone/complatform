import { createApp } from "vue";
import App from "./App.tsx";
import { Methods_App, State_App } from "./state/State_App";
import { appPlugins } from "./utils/common";
import "./main.electron";

async function main() {
	await Methods_App.fetchGroupList();
	createApp(App).use(appPlugins, { dependState: State_App }).mount("#app");
}

main();
