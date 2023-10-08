import { d as defineComponent, a7 as defineAsyncComponent, s as stateApp, az as reactive, a as defItem, e as xU, aU as __vitePreload, C as _export_sfc, r as resolveComponent, E as openBlock, aV as createBlock } from "./index.js";
import { A as Actions_Music } from "./music.js";
const state = reactive({
  configs: {
    search: defItem({
      value: "",
      prop: "search",
      placeholder: "\u6807\u9898\u3001\u6B4C\u624B\u3001\u6240\u5C5E\u4E13\u8F91",
      allowClear: true
    }),
    items: []
  }
});
const btnClear = {
  text: "\u79FB\u9664\u6240\u6709",
  async onClick() {
    await Actions_Music.delCached(xU.map(state.configs.items, (i) => `audio_${i.id}`));
  }
};
const _sfc_main = defineComponent({
  components: {
    CachedMobile: defineAsyncComponent(() => __vitePreload(() => import("./CachedMobile.js"), true ? ["./CachedMobile.js","./music.js","./index.js","..\\index.css","./CachedMobileSongItem.js","..\\CachedMobileSongItem.css"] : void 0, import.meta.url)),
    CachedPc: defineAsyncComponent(() => __vitePreload(() => import("./CachedPc.js"), true ? ["./CachedPc.js","./music.js","./index.js","..\\index.css","./CachedMobileSongItem.js","..\\CachedMobileSongItem.css"] : void 0, import.meta.url))
  },
  setup() {
    return {
      stateApp
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_CachedMobile = resolveComponent("CachedMobile");
  const _component_CachedPc = resolveComponent("CachedPc");
  return _ctx.stateApp.useMobileView ? (openBlock(), createBlock(_component_CachedMobile, { key: 0 })) : (openBlock(), createBlock(_component_CachedPc, { key: 1 }));
}
const CachedLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  btnClear,
  CachedLayout as default,
  state
};
