import { defineConfig, searchForWorkspaceRoot } from "vite";
import useVue from "@vitejs/plugin-vue";
import useVueJsx from "@vitejs/plugin-vue-jsx";
import { injectHtml } from "vite-plugin-html";
import path from "path";
import { YAPI_TARGET_HOST } from "D://./privateConfigs.js";

const __APP_VERSION = Date.now().toString();

// https://vitejs.dev/config/
export default defineConfig({
	define: {
		"process.env": {}
	},
	server: {
		https: false,
		fs: {
			allow: [searchForWorkspaceRoot(process.cwd())]
		},
		proxy: {
			"^/devyapi": {
				target: YAPI_TARGET_HOST,
				changeOrigin: true,
				secure: false,
				rewrite: path => path.replace(/^\/devyapi/, "")
			},
			"^/api": {
				target: YAPI_TARGET_HOST,
				changeOrigin: true,
				secure: false,
				rewrite: path => path.replace(/^\/api/, "/api")
			}
		}
	},
	plugins: [
		useVue(),
		useVueJsx(),
		injectHtml({
			/* windows平台 */
			data: (() => {
				return {
					version: __APP_VERSION
				};
			})()
		})
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src")
		}
	}
});
