import { defineConfig, searchForWorkspaceRoot } from "vite";
import useVue from "@vitejs/plugin-vue";
import useVueJsx from "@vitejs/plugin-vue-jsx";
import { injectHtml } from "vite-plugin-html";
import path from "path";

const __APP_VERSION = Date.now().toString();


// https://vitejs.dev/config/
export default defineConfig({
  server: {
		https: false,
		fs: {
			allow: [searchForWorkspaceRoot(process.cwd())]
		},
		proxy: {
			"^/devyapi": {
				target: `http://localhost:3001/`,
				changeOrigin: true,
				secure: false,
				rewrite: path => path.replace(/^\/devyapi/, "")
			},
			"^/api": {
				target: `http://localhost:3001/`,
				changeOrigin: true,
				secure: false,
				rewrite: path => path.replace(/^\/api/, "/api")
			},
		}
	},
  plugins: [useVue(), useVueJsx(),injectHtml({
    /* windows平台 */
    data: (() => {
      return {
        version: __APP_VERSION,
      };
    })()
  })],
  resolve: {
    alias: {
      vue: "vue/dist/vue.esm-bundler.js",
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
