import { d as defineComponent, a9 as defineAsyncComponent, s as stateApp, b0 as stateMusic, a_ as __vitePreload, H as _export_sfc, r as resolveComponent, I as openBlock, a$ as createBlock } from "./index.js";
const _sfc_main = defineComponent({
  components: {
    FindNewMobile: defineAsyncComponent(() => __vitePreload(() => import("./FindNewMobile2.js"), true ? ["./FindNewMobile2.js","./index.js","..\\index.css","./API.js"] : void 0, import.meta.url))
  },
  setup() {
    return {
      stateApp
    };
  },
  async mounted() {
    stateMusic._toIfy();
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_FindNewMobile = resolveComponent("FindNewMobile");
  return openBlock(), createBlock(_component_FindNewMobile);
}
const FindNewLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  FindNewLayout as default
};
