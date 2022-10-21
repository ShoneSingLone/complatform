import { defineConfig } from 'vite'
import useVue from "@vitejs/plugin-vue";
import useVueJsx from "@vitejs/plugin-vue-jsx";
import { injectHtml } from "vite-plugin-html";
import path from "path"

const __APP_VERSION = Date.now().toString();


// https://vitejs.dev/config/
export default defineConfig({
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
      "ysrc": path.resolve(__dirname, "./src"),
    },
  },
})
