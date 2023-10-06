import { C as _export_sfc, r as resolveComponent, E as openBlock, aS as createBlock, I as withCtx, ac as createBaseVNode, aY as toDisplayString, aZ as normalizeStyle } from "./index.js";
const _sfc_main = {
  props: ["song", "loading", "isShowImg"],
  setup(props) {
    console.log(props.song);
    return {};
  },
  data() {
    return {};
  },
  computed: {
    styleBtn() {
      var _a;
      if (this.isShowImg) {
        return `background:url(${(_a = this.song) == null ? void 0 : _a.picUrl}) right/contain no-repeat;`;
      } else {
        return {};
      }
    }
  },
  beforeUnmount() {
    this.observer && this.observer.disconnect();
  },
  mounted() {
  }
};
const FindNewMobileSongItem_vue_vue_type_style_index_0_lang = "";
const _hoisted_1 = { class: "title" };
const _hoisted_2 = { class: "singer" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_elButton = resolveComponent("elButton");
  return openBlock(), createBlock(_component_elButton, {
    ref: "songItem",
    class: "PrivateMobileSongItem MobileSongItem elevation-1 flex vertical width100",
    style: normalizeStyle($options.styleBtn),
    loading: $props.loading
  }, {
    default: withCtx(() => {
      var _a;
      return [
        createBaseVNode("div", _hoisted_1, toDisplayString((_a = $props.song) == null ? void 0 : _a.title), 1),
        createBaseVNode("span", _hoisted_2, toDisplayString($props.song.index) + "- " + toDisplayString($props.song.artist) + "-" + toDisplayString($props.song.album), 1)
      ];
    }),
    _: 1
  }, 8, ["style", "loading"]);
}
const FindNewMobileSongItem = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  FindNewMobileSongItem as F
};
