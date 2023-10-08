import { s as stateMusic, a as API, p as preprocessRecord, A as Actions_Music } from "./music.js";
import { H as _export_sfc, f as xU, r as resolveComponent, I as openBlock, J as createElementBlock, ah as createBaseVNode, h as createVNode, K as withCtx } from "./index.js";
import { F as FindNewMobileSongItem } from "./FindNewMobileSongItem.js";
import { state } from "./FindNewLayout.js";
const _sfc_main = {
  components: {
    FindNewMobileSongItem
  },
  setup() {
    return {
      stateMusic,
      state
    };
  },
  data() {
    return {
      wrapperHeight: 0,
      scrollHeight: 0,
      scrollTop: 0,
      currentLoadingSongId: ""
    };
  },
  watch: {
    "stateMusic.personalizedNewSong": {
      immediate: true,
      handler() {
        this.setItems();
      }
    },
    "state.configs.search.value": {
      immediate: true,
      handler(search) {
        this.state.configs.items = [];
        this.state.offset = 1;
        this.state.songCount = 999;
        this.scrollTop = 0;
        this.setItems(search, this.state.offset);
      }
    }
  },
  mounted() {
    this.$watch(
      () => {
        return `scrollHeight${this.scrollHeight}_scrollTop${this.scrollTop}`;
      },
      () => {
        const search = this.state.configs.search.value;
        if (search && this.scrollHeight - this.scrollTop < this.wrapperHeight) {
          this.setItems(search, this.state.offset);
        }
      }
    );
  },
  methods: {
    setItems: xU.debounce(async function(keywords, offset) {
      if (keywords && offset) {
        if (this.state.songCount <= this.state.configs.items.length) {
          return;
        }
        const index = xU.layer.loading();
        try {
          const { code, result } = await API.music.search({
            keywords,
            limit: 60,
            offset
          });
          if (code === 200) {
            this.state.songCount = result.songCount;
            this.state.configs.items = xU.concat(
              this.state.configs.items,
              preprocessRecord((result == null ? void 0 : result.songs) || [])
            );
            ++this.state.offset;
            return;
          }
        } catch (error) {
          console.error(error);
        } finally {
          xU.layer.loading(index);
        }
      } else {
        this.state.configs.items = preprocessRecord(
          this.stateMusic.personalizedNewSong
        );
        return;
      }
    }, 1e3),
    async playSong(record) {
      this.currentLoadingSongId = record.id;
      try {
        Actions_Music.pushSongToPlaylist(
          this.state.configs.items,
          () => Actions_Music.playSongById(record.id)
        );
      } catch (error) {
        console.error(error);
      } finally {
        this.currentLoadingSongId = false;
      }
    }
  }
};
const _hoisted_1 = { class: "flex1 height100 overflow-hidden flex vertical" };
const _hoisted_2 = { class: "search-wrapper padding10" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_xItem = resolveComponent("xItem");
  const _component_xGap = resolveComponent("xGap");
  const _component_FindNewMobileSongItem = resolveComponent("FindNewMobileSongItem");
  const _component_xVirScroll = resolveComponent("xVirScroll");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", _hoisted_2, [
      createVNode(_component_xItem, {
        configs: $setup.state.configs.search
      }, null, 8, ["configs"])
    ]),
    createVNode(_component_xGap, { t: "16" }),
    createVNode(_component_xVirScroll, {
      top: $data.scrollTop,
      "onUpdate:top": _cache[0] || (_cache[0] = ($event) => $data.scrollTop = $event),
      height: $data.wrapperHeight,
      "onUpdate:height": _cache[1] || (_cache[1] = ($event) => $data.wrapperHeight = $event),
      scrollHeight: $data.scrollHeight,
      "onUpdate:scrollHeight": _cache[2] || (_cache[2] = ($event) => $data.scrollHeight = $event),
      class: "flex1",
      configs: $setup.state.configs
    }, {
      item: withCtx(({ item }) => [
        createVNode(_component_FindNewMobileSongItem, {
          song: item,
          loading: $data.currentLoadingSongId === item.id,
          "is-show-img": $setup.stateMusic.songId === item.id,
          onClick: ($event) => $options.playSong(item)
        }, null, 8, ["song", "loading", "is-show-img", "onClick"])
      ]),
      _: 1
    }, 8, ["top", "height", "scrollHeight", "configs"])
  ]);
}
const FindNewPc = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  FindNewPc as default
};
