import { d as defineComponent, a6 as defineAsyncComponent, s as stateApp, ay as reactive, b as defItem, aT as __vitePreload, H as _export_sfc, r as resolveComponent, I as openBlock, aU as createBlock } from "./index.js";
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
const _sfc_main = defineComponent({
  components: {
    PrivateMobile: defineAsyncComponent(() => __vitePreload(() => import("./PrivateMobile.js"), true ? ["./PrivateMobile.js","./music.js","./index.js","..\\index.css","./PrivateMobileSongItem.js","..\\PrivateMobileSongItem.css"] : void 0, import.meta.url)),
    PrivatePc: defineAsyncComponent(() => __vitePreload(() => import("./PrivatePc.js"), true ? ["./PrivatePc.js","./music.js","./index.js","..\\index.css","./PrivateMobileSongItem.js","..\\PrivateMobileSongItem.css"] : void 0, import.meta.url))
  },
  setup() {
    return {
      stateApp
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_PrivateMobile = resolveComponent("PrivateMobile");
  const _component_PrivatePc = resolveComponent("PrivatePc");
  return _ctx.stateApp.useMobileView ? (openBlock(), createBlock(_component_PrivateMobile, { key: 0 })) : (openBlock(), createBlock(_component_PrivatePc, { key: 1 }));
}
const PrivateLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  PrivateLayout as default,
  state
};
