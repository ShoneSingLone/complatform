import { h as createVNode, r as resolveComponent, b0 as stateMusic, b1 as Actions_Music, H as _export_sfc, f as xU, b3 as preprocessRecord, I as openBlock, J as createElementBlock, K as withCtx } from "./index.js";
import { A as API } from "./API.js";
const BroswerItem = {
  props: ["item"],
  setup(props) {
    async function handleClick() {
      const data = await stateMusic._toIfy(props.item.path);
      if ((data == null ? void 0 : data.type) === "audio") {
        playSong(data.record);
        return;
      }
    }
    async function playSong(record) {
      try {
        Actions_Music.pushSongToPlaylist([record], () => {
          Actions_Music.playSongById(record.id);
        });
      } catch (error) {
        console.error(error);
      }
    }
    return function() {
      return createVNode(resolveComponent("elButton"), {
        "class": "PrivateMobileSongItem MobileSongItem elevation-1 flex vertical width100",
        "onClick": handleClick
      }, {
        default: () => [createVNode("div", {
          "class": "title"
        }, [this.item.path])]
      });
    };
  }
};
const _sfc_main = {
  components: {
    BroswerItem
  },
  setup() {
    return {
      stateMusic
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
    }, 1e3)
  }
};
const _hoisted_1 = { class: "flex1 FindNewMobile height100 overflow-hidden flex vertical" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_BroswerItem = resolveComponent("BroswerItem");
  const _component_xVirScroll = resolveComponent("xVirScroll");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createVNode(_component_xVirScroll, {
      top: $data.scrollTop,
      "onUpdate:top": _cache[0] || (_cache[0] = ($event) => $data.scrollTop = $event),
      height: $data.wrapperHeight,
      "onUpdate:height": _cache[1] || (_cache[1] = ($event) => $data.wrapperHeight = $event),
      scrollHeight: $data.scrollHeight,
      "onUpdate:scrollHeight": _cache[2] || (_cache[2] = ($event) => $data.scrollHeight = $event),
      class: "flex1",
      configs: $setup.stateMusic.configs
    }, {
      item: withCtx(({ item }) => [
        createVNode(_component_BroswerItem, { item }, null, 8, ["item"])
      ]),
      _: 1
    }, 8, ["top", "height", "scrollHeight", "configs"])
  ]);
}
const FindNewMobile = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  FindNewMobile as default
};
