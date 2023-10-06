import { C as _export_sfc, r as resolveComponent, E as openBlock, H as createElementBlock, ac as createBaseVNode, aY as toDisplayString, f as createVNode, I as withCtx } from "./index.js";
const _sfc_main = {
  props: ["song", "loading"],
  emits: ["del", "play"],
  setup() {
    return {};
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {
  }
};
const CachedMobileSongItem_vue_vue_type_style_index_0_lang = "";
const _hoisted_1 = ["loading"];
const _hoisted_2 = { class: "flex vertical start" };
const _hoisted_3 = { class: "title" };
const _hoisted_4 = { class: "singer" };
const _hoisted_5 = /* @__PURE__ */ createBaseVNode("span", { class: "flex1 mr20" }, null, -1);
const _hoisted_6 = { class: "flex" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_xIcon = resolveComponent("xIcon");
  const _component_elButton = resolveComponent("elButton");
  return openBlock(), createElementBlock("div", {
    class: "CachedMobileSongItem MobileSongItem elevation-1 flex middle width100",
    loading: $props.loading
  }, [
    createBaseVNode("div", _hoisted_2, [
      createBaseVNode("div", _hoisted_3, toDisplayString($props.song.title), 1),
      createBaseVNode("div", _hoisted_4, toDisplayString($props.song.artist) + "-" + toDisplayString($props.song.album), 1)
    ]),
    _hoisted_5,
    createBaseVNode("span", null, [
      createBaseVNode("div", _hoisted_6, [
        createVNode(_component_elButton, {
          class: "mr10 flex middle",
          onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("play"))
        }, {
          default: withCtx(() => [
            createVNode(_component_xIcon, { icon: "playsong" })
          ]),
          _: 1
        }),
        createVNode(_component_elButton, {
          class: "mr10 flex middle",
          onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("del"))
        }, {
          default: withCtx(() => [
            createVNode(_component_xIcon, { icon: "delete" })
          ]),
          _: 1
        })
      ])
    ])
  ], 8, _hoisted_1);
}
const CachedMobileSongItem = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  CachedMobileSongItem as C
};
