import { createApp } from "vue";
import App from "./App.tsx";
import { appUiPlugin } from "./utils/common";
import "./main.electron";

async function main() {
	createApp(App).use(appUiPlugin).mount("#app");
}

main();
