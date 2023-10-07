import { d as defineComponent, a6 as defineAsyncComponent, s as stateApp, f as xU, ay as reactive, b as defItem, aT as __vitePreload, H as _export_sfc, r as resolveComponent, I as openBlock, aU as createBlock } from "./index.js";
import { A as Actions_Music } from "./music.js";
(async () => {
  const index = xU.layer.loading();
  try {
    await Actions_Music.updatePersonalizedNewSong();
  } catch (error) {
    console.error(error);
  } finally {
    xU.layer.loading(index);
  }
})();
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
    FindNewMobile: defineAsyncComponent(() => __vitePreload(() => import("./FindNewMobile.js"), true ? ["./FindNewMobile.js","./music.js","./index.js","..\\index.css","./FindNewMobileSongItem.js","..\\FindNewMobileSongItem.css"] : void 0, import.meta.url)),
    FindNewPc: defineAsyncComponent(() => __vitePreload(() => import("./FindNewPc.js"), true ? ["./FindNewPc.js","./music.js","./index.js","..\\index.css","./FindNewMobileSongItem.js","..\\FindNewMobileSongItem.css"] : void 0, import.meta.url))
  },
  setup() {
    return {
      stateApp
    };
  },
  async mounted() {
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_FindNewMobile = resolveComponent("FindNewMobile");
  const _component_FindNewPc = resolveComponent("FindNewPc");
  return _ctx.stateApp.useMobileView ? (openBlock(), createBlock(_component_FindNewMobile, { key: 0 })) : (openBlock(), createBlock(_component_FindNewPc, { key: 1 }));
}
const FindNewLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  FindNewLayout as default,
  state
};
