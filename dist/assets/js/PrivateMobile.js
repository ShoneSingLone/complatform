import { s as stateMusic, A as Actions_Music } from "./music.js";
import { P as PrivateMobileSongItem } from "./PrivateMobileSongItem.js";
import { C as _export_sfc, e as xU, r as resolveComponent, E as openBlock, H as createElementBlock, f as createVNode, I as withCtx, af as createBaseVNode } from "./index.js";
import { state } from "./PrivateLayout.js";
const _sfc_main = {
  components: {
    PrivateMobileSongItem
  },
  setup() {
    return {
      stateMusic,
      state
    };
  },
  data() {
    return {
      currentLoadingSongId: ""
    };
  },
  watch: {
    "state.configs.search.value": {
      immediate: true,
      handler(search) {
        this.setItems(search);
      }
    }
  },
  methods: {
    setItems: xU.debounce(function(search) {
      let allItems = this.stateMusic.AllMusicClient;
      if (search) {
        allItems = xU.filter(allItems, (record) => {
          const isOk = (prop) => new RegExp(search, "ig").test(record[prop]);
          return isOk("title") || isOk("artist") || isOk("album");
        });
      }
      this.state.configs.items = allItems;
    }, 600),
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
const _hoisted_1 = { class: "flex vertical flex1 PrivateMobile height100 overflow-hidden" };
const _hoisted_2 = { class: "search-wrapper padding10" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_PrivateMobileSongItem = resolveComponent("PrivateMobileSongItem");
  const _component_xVirScroll = resolveComponent("xVirScroll");
  const _component_xItem = resolveComponent("xItem");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createVNode(_component_xVirScroll, {
      configs: $setup.state.configs,
      class: "flex1"
    }, {
      item: withCtx(({ item }) => [
        createVNode(_component_PrivateMobileSongItem, {
          song: item,
          loading: $data.currentLoadingSongId === item.id,
          onClick: ($event) => $options.playSong(item)
        }, null, 8, ["song", "loading", "onClick"])
      ]),
      _: 1
    }, 8, ["configs"]),
    createBaseVNode("div", _hoisted_2, [
      createVNode(_component_xItem, {
        configs: $setup.state.configs.search
      }, null, 8, ["configs"])
    ])
  ]);
}
const PrivateMobile = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  PrivateMobile as default
};
