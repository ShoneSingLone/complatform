import { H as _export_sfc, I as openBlock, J as createElementBlock, ae as createBaseVNode, a_ as toDisplayString } from "./index.js";
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
const _hoisted_1 = ["loading"];
const _hoisted_2 = { class: "title" };
const _hoisted_3 = { class: "singer" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: "PrivateMobileSongItem MobileSongItem flex vertical width100",
    loading: $props.loading
  }, [
    createBaseVNode("div", _hoisted_2, toDisplayString($props.song.title), 1),
    createBaseVNode("div", _hoisted_3, toDisplayString($props.song.index) + "-" + toDisplayString($props.song.artist) + "-" + toDisplayString($props.song.album), 1)
  ], 8, _hoisted_1);
}
const PrivateMobileSongItem = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  PrivateMobileSongItem as P
};
