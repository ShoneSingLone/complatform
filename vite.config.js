import { defineConfig, searchForWorkspaceRoot } from "vite";
import useVue from "@vitejs/plugin-vue";
import useVueJsx from "@vitejs/plugin-vue-jsx";
import { injectHtml } from "vite-plugin-html";
import path from "path";
import svgHelper from "./preprocess/plugins/svg";
import { visualizer } from "rollup-plugin-visualizer";
import viteCompression from "vite-plugin-compression";

import { PROD_SERVER_ADDRESS, PROD_SERVER_ADDRESS2, /* DEV_SERVER_ADDRESS */ } from "../privateConfigs.js";

const DEV_SERVER_ADDRESS = "http://localhost:3010";
const IS_DEV = process.env.IS_DEV != "PRD";
const { PRD_USE } = process.env;
const __APP_VERSION = Date.now().toString();
const __BASE_URL = IS_DEV ? DEV_SERVER_ADDRESS : PRD_USE == "1" ? PROD_SERVER_ADDRESS : PROD_SERVER_ADDRESS2;

console.log("PRD_USE: ", PRD_USE, "__BASE_URL: ", __BASE_URL);

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
		proxy: {
			"^/api": {
				target: "http://localhost:3001/",
				changeOrigin: true,
				secure: false,
				ws: true,
				rewrite: path => path.replace(/^\/api/, "/api")
			}
		}
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
			src: path.resolve(__dirname, "./src"),
			"@": path.resolve(__dirname, "./src"),
			/* 开发的时候用，不用每次修改之后都发布到npm */
			"@ventose/ui": path.resolve(__dirname, "./src/element/ui"),
			vue: "vue/dist/vue.esm-bundler.js"
		}
	}
};

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

// if (!IS_DEV) {
// 	appOptions.plugins.push(viteCompression({
// 		/* 100kb */
// 		threshold: 100
// 	}));
// }

// https://vitejs.dev/config/
export default defineConfig(appOptions);
