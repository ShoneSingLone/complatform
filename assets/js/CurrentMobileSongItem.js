import { A as Actions_Music } from "./music.js";
import { $, C as _export_sfc, r as resolveComponent, E as openBlock, H as createElementBlock, af as createBaseVNode, a$ as toDisplayString, f as createVNode, b0 as normalizeStyle, F as Fragment } from "./index.js";
const WIDTH = 64;
const _sfc_main = {
  props: ["song"],
  setup() {
    return {};
  },
  data() {
    return {
      width: 0,
      isMove: false,
      loading: false,
      isShowDeleteIcon: false
    };
  },
  computed: {
    styleDelete() {
      return {
        width: `${this.width}px`
      };
    }
  },
  mounted() {
    $(this.$refs.item).on("mousedown", this.handleMousedown).on("mousemove", this.handleMousemove).on("mouseup", this.handleMouseup).on("mouseleave", this.handleMouseup).on("touchstart", this.handleMousedown).on("touchmove", this.handleMousemove).on("touchend", this.handleMouseup);
  },
  beforeUnmount() {
    $(this.$refs.item).off("mousedown", this.handleMousedown).off("mousemove", this.handleMousemove).off("mouseup", this.handleMouseup).off("mouseleave", this.handleMouseup).off("touchstart", this.handleMousedown).off("touchmove", this.handleMousemove).off("touchend", this.handleMouseup);
  },
  methods: {
    handleMousedown(e) {
      if (e.changedTouches) {
        e = e.changedTouches[0];
      }
      if (!this.isMove) {
        this.isMove = true;
        this.moveStart = e.clientX;
      }
    },
    handleMousemove(e) {
      if (e.changedTouches) {
        e = e.changedTouches[0];
      }
      if (this.isMove) {
        const distance = this.moveStart - e.clientX;
        if (distance < 0) {
          if (this.width + distance > 0) {
            this.width = this.width + distance;
          }
        } else {
          this.width = distance;
        }
        return;
      }
    },
    handleMouseup(e) {
      if (this.isMove) {
        this.isMove = false;
        if (this.width < 44) {
          this.width = 0;
        } else {
          this.width = WIDTH;
        }
      }
    },
    async removeSongFromPlaylist() {
      Actions_Music.removeSongFromPlaylist(this.song);
    },
    async playSong() {
      const record = this.song;
      this.loading = true;
      try {
        await Actions_Music.playSongById(record.id);
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    }
  }
};
const CurrentMobileSongItem_vue_vue_type_style_index_0_lang = "";
const _hoisted_1 = ["loading", "data-index"];
const _hoisted_2 = { class: "title" };
const _hoisted_3 = { class: "singer" };
const _hoisted_4 = ["data-song-index"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_xIcon = resolveComponent("xIcon");
  return openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("span", {
      ref: "item",
      class: "CurrentMobileSongItem MobileSongItem elevation-1 flex flex1 horizon middle pointer elevation",
      loading: $data.loading,
      "data-index": $props.song.index,
      onClick: _cache[0] || (_cache[0] = (...args) => $options.playSong && $options.playSong(...args))
    }, [
      createBaseVNode("div", null, [
        createBaseVNode("span", _hoisted_2, toDisplayString($props.song.title), 1),
        createBaseVNode("span", _hoisted_3, toDisplayString($props.song.artist) + "-" + toDisplayString($props.song.album), 1)
      ])
    ], 8, _hoisted_1),
    createBaseVNode("div", {
      "data-song-index": $props.song.index,
      style: normalizeStyle($options.styleDelete),
      class: "elevation-1 CurrentMobileSongItem_delete-icon flex vertical middle center",
      onClick: _cache[1] || (_cache[1] = (...args) => $options.removeSongFromPlaylist && $options.removeSongFromPlaylist(...args))
    }, [
      createVNode(_component_xIcon, { icon: "delete" })
    ], 12, _hoisted_4)
  ], 64);
}
const CurrentMobileSongItem = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  CurrentMobileSongItem as C
};
