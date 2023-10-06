import { C as _export_sfc, r as resolveComponent, E as openBlock, aS as createBlock, I as withCtx, ac as createBaseVNode, aY as toDisplayString } from "./index.js";
const _sfc_main = {
  props: ["song", "loading"],
  setup() {
    return {};
  },
  data() {
    return {};
  },
  computed: {
    asdf() {
      return this.song;
    }
  },
  mounted() {
  }
};
const PrivateMobileSongItem_vue_vue_type_style_index_0_lang = "";
const _hoisted_1 = { class: "title" };
const _hoisted_2 = { class: "singer" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_elButton = resolveComponent("elButton");
  return openBlock(), createBlock(_component_elButton, {
    class: "PrivateMobileSongItem MobileSongItem elevation-1 flex vertical width100",
    loading: $props.loading
  }, {
    default: withCtx(() => [
      createBaseVNode("div", _hoisted_1, toDisplayString($props.song.title), 1),
      createBaseVNode("div", _hoisted_2, toDisplayString($props.song.index) + "-" + toDisplayString($props.song.artist) + "-" + toDisplayString($props.song.album), 1)
    ]),
    _: 1
  }, 8, ["loading"]);
}
const PrivateMobileSongItem = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  PrivateMobileSongItem as P
};
