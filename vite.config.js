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
			"@": path.resolve(__dirname, "./src"),
			/* 开发的时候用，不用每次修改之后都发布到npm */
			"@ventose/ui": path.resolve(__dirname, "./src/devui/VentoseUI.es.js"),
			vue: "vue/dist/vue.esm-bundler.js"
		}
	}
});
