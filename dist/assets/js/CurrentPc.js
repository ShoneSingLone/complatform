import { H as _export_sfc, b0 as stateMusic, r as resolveComponent, I as openBlock, J as createElementBlock, ah as createBaseVNode, h as createVNode, K as withCtx } from "./index.js";
import { C as CurrentMobileSongItem } from "./CurrentMobileSongItem.js";
import { state, btnClear } from "./CurrentLayout.js";
const _sfc_main = {
  components: {
    CurrentMobileSongItem
  },
  setup() {
    return {
      stateMusic,
      state,
      btnClear
    };
  },
  data() {
    return {
      currentLoadingSongId: ""
    };
  },
  methods: {}
};
const _hoisted_1 = { class: "flex vertical flex1 height100 overflow-hidden" };
const _hoisted_2 = { class: "search-wrapper padding10 flex width100" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_xItem = resolveComponent("xItem");
  const _component_xButton = resolveComponent("xButton");
  const _component_xGap = resolveComponent("xGap");
  const _component_CurrentMobileSongItem = resolveComponent("CurrentMobileSongItem");
  const _component_xVirScroll = resolveComponent("xVirScroll");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", _hoisted_2, [
      createVNode(_component_xItem, {
        configs: $setup.state.configs.search,
        class: "flex1 mr10"
      }, null, 8, ["configs"]),
      createVNode(_component_xButton, {
        configs: $setup.btnClear,
        style: { "margin-right": "-10px" }
      }, null, 8, ["configs"])
    ]),
    createVNode(_component_xGap, { t: "16" }),
    createVNode(_component_xVirScroll, {
      configs: $setup.state.configs,
      class: "flex1"
    }, {
      item: withCtx(({ item }) => [
        createVNode(_component_CurrentMobileSongItem, {
          song: item,
          loading: $data.currentLoadingSongId === item.id
        }, null, 8, ["song", "loading"])
      ]),
      _: 1
    }, 8, ["configs"])
  ]);
}
const CurrentPc = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  CurrentPc as default
};
