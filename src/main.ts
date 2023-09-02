import { createApp } from "vue";
import App from "@/App";
import "@/main.electron";

async function main() {
	const { appUiPlugin } = await import("@/utils/common");
	createApp(App).use(appUiPlugin).mount("#app");
}

main();
