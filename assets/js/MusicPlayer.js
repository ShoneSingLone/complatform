import { d as defineComponent, a4 as defineAsyncComponent, aR as __vitePreload, s as stateApp, C as _export_sfc, r as resolveComponent, E as openBlock, aS as createBlock } from "./index.js";
const _sfc_main = defineComponent({
  components: {
    PlayerMobile: defineAsyncComponent(() => __vitePreload(() => import("./PlayerMobile.js"), true ? ["./PlayerMobile.js","./index.js","..\\index.css","./music.js","..\\PlayerMobile.css"] : void 0, import.meta.url)),
    PlayerPc: defineAsyncComponent(() => __vitePreload(() => import("./PlayerPc.js"), true ? ["./PlayerPc.js","./index.js","..\\index.css","./music.js","..\\PlayerPc.css"] : void 0, import.meta.url))
  },
  setup() {
    return {
      stateApp
    };
  }
});
const MusicPlayer_vue_vue_type_style_index_0_lang = "";
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_PlayerMobile = resolveComponent("PlayerMobile");
  const _component_PlayerPc = resolveComponent("PlayerPc");
  return _ctx.stateApp.useMobileView ? (openBlock(), createBlock(_component_PlayerMobile, {
    key: 0,
    id: "MusicPlayerWrapper"
  })) : (openBlock(), createBlock(_component_PlayerPc, {
    key: 1,
    id: "MusicPlayerWrapper"
  }));
}
const MusicPlayer = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  MusicPlayer as M
};
