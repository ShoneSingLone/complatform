import { s as stateMusic, p as preprocessRecord, A as Actions_Music } from "./music.js";
import { C as CachedMobileSongItem } from "./CachedMobileSongItem.js";
import { C as _export_sfc, e as xU, a_ as keys, a$ as getMany, b0 as del, r as resolveComponent, E as openBlock, H as createElementBlock, f as createVNode, I as withCtx, ac as createBaseVNode } from "./index.js";
import { state, btnClear } from "./CachedLayout.js";
const _sfc_main = {
  components: {
    CachedMobileSongItem
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
      currentLoadingSongId: "",
      configs: {
        items: []
      }
    };
  },
  watch: {
    async "stateMusic.cacheAudioCount"() {
      await this.setItems();
    },
    "state.configs.search.value": {
      immediate: true,
      handler(search) {
        this.setItems(search);
      }
    }
  },
  async mounted() {
    await this.setItems();
  },
  methods: {
    setItems: xU.debounce(async function(search) {
      let props = await keys();
      props = props.filter((name) => /^audio_/.test(name));
      let allItems = xU.map(
        await getMany(props),
        (i) => preprocessRecord(i.records)
      );
      if (search) {
        allItems = xU.filter(allItems, (record) => {
          const isOk = (prop) => new RegExp(search, "ig").test(record[prop]);
          return isOk("title") || isOk("artist") || isOk("album");
        });
      }
      this.state.configs.items = allItems;
    }, 1e3),
    async removeSong(record) {
      await del(`audio_${record.id}`);
      await this.setItems();
    },
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
const _hoisted_2 = { class: "search-wrapper padding10 flex" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_CachedMobileSongItem = resolveComponent("CachedMobileSongItem");
  const _component_xVirScroll = resolveComponent("xVirScroll");
  const _component_xItem = resolveComponent("xItem");
  const _component_xButton = resolveComponent("xButton");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createVNode(_component_xVirScroll, {
      configs: $setup.state.configs,
      class: "flex1"
    }, {
      item: withCtx(({ item }) => [
        createVNode(_component_CachedMobileSongItem, {
          song: item,
          loading: $data.currentLoadingSongId === item.id,
          onPlay: ($event) => $options.playSong(item),
          onDel: ($event) => $options.removeSong(item)
        }, null, 8, ["song", "loading", "onPlay", "onDel"])
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
const CachedMobile = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  CachedMobile as default
};
