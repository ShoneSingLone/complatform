import { defineConfig, searchForWorkspaceRoot } from "vite";
import useVue from "@vitejs/plugin-vue";
import useVueJsx from "@vitejs/plugin-vue-jsx";
import { injectHtml } from "vite-plugin-html";
import path from "path";
import { YAPI_TARGET_HOST } from "D://./privateConfigs.js";
import svgHelper from "./preprocess/plugins/svg";
import { visualizer } from "rollup-plugin-visualizer";

const __APP_VERSION = Date.now().toString();

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
				entryFileNames: "assets/js/[name].[hash].js",
				chunkFileNames: "assets/js/[name].[hash].js",
				assetFileNames: "assets/[name].[hash][extname]"
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
					version: __APP_VERSION
				};
			})()
		})
	],
	resolve: {
		alias: {
			src: path.resolve(__dirname, "./src"),
			"@": path.resolve(__dirname, "./src"),
			/* 开发的时候用，不用每次修改之后都发布到npm */
			"@ventose/ui": path.resolve(__dirname, "./src/devui/ui/index.tsx"),
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

// https://vitejs.dev/config/
export default defineConfig(appOptions);
