import { createApp } from "vue";
import ViewApp from "@/ViewApp";
import "@/main.electron";
async function main() {
	const { appUiPlugin } = await import("@/utils/common");
	createApp(ViewApp).use(appUiPlugin).mount("#app");
}

main();
