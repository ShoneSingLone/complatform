/// <reference types="vite/client" />

declare module "*.vue" {
	import type { DefineComponent } from "vue";
	const window: Window;
	const component: DefineComponent<{}, {}, any>;
	export default component;
}
declare module "*.tsx" {
	const window: Window;
}

declare interface Window {
	process: object;
	__APP_VERSION: string;
	/* 基础url，与静态资源从public里面加载有关 */
	__BASE_URL: string;
	__URL_API_VERSION: string;
	/* TODO: electronAPI 如果是Electron环境  */
	electronAPI: any;
}
