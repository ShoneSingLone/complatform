import { s as stateMusic } from "./music.js";
import { C as CurrentMobileSongItem } from "./CurrentMobileSongItem.js";
import { H as _export_sfc, r as resolveComponent, I as openBlock, J as createElementBlock, h as createVNode, K as withCtx, ah as createBaseVNode } from "./index.js";
import { state, btnClear } from "./CurrentLayout.js";
const _sfc_main = {
  components: {
    CurrentMobileSongItem
  },
  setup() {
    return {
      state,
      btnClear,
      stateMusic
    };
  },
  data() {
    return {
      currentLoadingSongId: ""
    };
  },
  watch: {},
  mounted() {
  },
  methods: {}
};
const _hoisted_1 = { class: "flex1 height100 overflow-hidden flex vertical" };
const _hoisted_2 = { class: "search-wrapper padding10 flex elevation-2" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_CurrentMobileSongItem = resolveComponent("CurrentMobileSongItem");
  const _component_xVirScroll = resolveComponent("xVirScroll");
  const _component_xItem = resolveComponent("xItem");
  const _component_xButton = resolveComponent("xButton");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createVNode(_component_xVirScroll, {
      configs: $setup.state.configs,
      class: "CurrentMobileScroll flex1"
    }, {
      item: withCtx(({ item }) => [
        createVNode(_component_CurrentMobileSongItem, { song: item }, null, 8, ["song"])
      ]),
      _: 1
    }, 8, ["configs"]),
    createBaseVNode("div", _hoisted_2, [
      createVNode(_component_xItem, {
        configs: $setup.state.configs.search,
        class: "flex1 mr10"
      }, null, 8, ["configs"]),
      createVNode(_component_xButton, { configs: $setup.btnClear }, null, 8, ["configs"])
    ])
  ]);
}
const CurrentMobile = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  CurrentMobile as default
};
