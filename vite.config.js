import { defineConfig, searchForWorkspaceRoot } from "vite";
import useVue from "@vitejs/plugin-vue";
import useVueJsx from "@vitejs/plugin-vue-jsx";
import { injectHtml } from "vite-plugin-html";
import path from "path";
import svgHelper from "./preprocess/plugins/svg";
import { visualizer } from "rollup-plugin-visualizer";
import { PROD_SERVER_ADDRESS } from "../privateConfigs.js";


const { PRD_USE, DEV_MODEL } = process.env;
const __APP_VERSION = Date.now().toString();


/* 使用whistle代理接口 */
let __BASE_URL = "";
if (DEV_MODEL === "PRD") {
	/* 如果跨域 */
	if (PRD_USE === "1") {
		__BASE_URL = PROD_SERVER_ADDRESS;
	}
}

console.log(`🚀 DEV_MODEL:${DEV_MODEL}
🚀 PRD_USE:${PRD_USE}
🚀 __BASE_URL:${__BASE_URL}`);

const isBuildLibTui = process.env.type === "lib:tui";

const appOptions = {
	esbuild: {
		jsxFactory: "h",
		jsxFragment: "Fragment"
	},
	base: "./",
	server: {
		https: false,
		fs: {
			allow: [searchForWorkspaceRoot(process.cwd())]
		},
		proxy: {/* 
			"^/api": {
				target: "http://10.143.133.216:3001/",
				changeOrigin: true,
				secure: false,
				ws: true,
				rewrite: path => path.replace(/^\/api/, "/api")
			}
		 */}
	},
	build: {
		/* 没有混缩 */
		minify: false,
		assetsInlineLimit: 512,
		cssCodeSplit: true,
		sourcemap: false,
		manifest: true,
		rollupOptions: {
			output: {
				/* https://www.rollupjs.com/guide/big-list-of-options/#outputentryfilenames */
				entryFileNames: "assets/js/[name].js",
				chunkFileNames: "assets/js/[name].js",
				assetFileNames: "assets/[name][extname]"
			}
		}
	},
	plugins: [
		useVue(),
		useVueJsx(),
		svgHelper(),
		visualizer(),
		injectHtml({
			/* windows平台 */
			data: (() => {
				return {
					version: __APP_VERSION,
					__BASE_URL
				};
			})()
		})
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			vue: "vue/dist/vue.esm-bundler.js"
		}
	},
	/* 	css: { preprocessorOptions: { scss: { additionalData: `@use "element-plus/styles/element/index.scss" as *;`, }, }, },  */
};


delete appOptions.proxy;

if (isBuildLibTui) {
	appOptions.build = {
		minify: true,
		cssCodeSplit: false,
		outDir: "public/tui-editor",
		lib: {
			formats: ["iife"],
			entry: path.resolve(
				__dirname,
				"src/components/TuiEditor/tuiEditorLibs.ts"
			),
			name: "TuiEditor",
			fileName: () => `tui.js`
		}
	};
}

// if (!DEV_MODEL) {
// 	appOptions.plugins.push(viteCompression({
// 		/* 100kb */
// 		threshold: 100
// 	}));
// }

// https://vitejs.dev/config/
export default defineConfig(appOptions);
