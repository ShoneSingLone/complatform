import { H as _export_sfc, r as resolveComponent, I as openBlock, aU as createBlock, K as withCtx, h as createVNode, J as createElementBlock, F as Fragment, ae as createBaseVNode, a_ as toDisplayString, d as defineComponent } from "./index.js";
import { s as stateMusic, A as Actions_Music, C as Cpt_iconPlayModel, f as formatDuring, b as Cpt_currentSong } from "./music.js";
const MusicPlayerModel_vue_vue_type_style_index_0_lang = "";
const _sfc_main$3 = {
  setup() {
    return {
      stateMusic,
      Actions_Music,
      Cpt_iconPlayModel
    };
  }
};
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_xIcon = resolveComponent("xIcon");
  const _component_xButton = resolveComponent("xButton");
  return openBlock(), createBlock(_component_xButton, {
    configs: { text: "", onClick: $setup.Actions_Music.togglePlayModel }
  }, {
    default: withCtx(() => [
      createVNode(_component_xIcon, { icon: $setup.Cpt_iconPlayModel }, null, 8, ["icon"])
    ]),
    _: 1
  }, 8, ["configs"]);
}
const MusicPlayerModel = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3]]);
const _sfc_main$2 = {
  setup() {
    return {
      stateMusic,
      Actions_Music
    };
  },
  data() {
    const iconPause = createVNode(resolveComponent("xIcon"), {
      "icon": "pausesong"
    }, null);
    const iconPlaysong = createVNode(resolveComponent("xIcon"), {
      "icon": "playsong"
    }, null);
    return {
      iconPlaysong,
      iconPause,
      playOrPause: {
        text: iconPlaysong,
        onClick() {
          Actions_Music.togglePlayOrPause();
        }
      }
    };
  },
  computed: {
    iconSound() {
      return this.isMute ? "soundMute" : "sound";
    }
  },
  watch: {
    "stateMusic.isPlaying": {
      immediate: true,
      handler(isPlaying) {
        this.playOrPause.text = isPlaying ? this.iconPause : this.iconPlaysong;
      }
    }
  },
  methods: {
    toggleVolumeMute() {
      this.isMute = !this.isMute;
    }
  }
};
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_xIcon = resolveComponent("xIcon");
  const _component_xButton = resolveComponent("xButton");
  const _component_xGap = resolveComponent("xGap");
  return openBlock(), createElementBlock(Fragment, null, [
    createVNode(_component_xButton, {
      configs: { text: "", onClick: $setup.Actions_Music.palyPrevSong }
    }, {
      default: withCtx(() => [
        createVNode(_component_xIcon, { icon: "prevsong" })
      ]),
      _: 1
    }, 8, ["configs"]),
    createVNode(_component_xGap, { l: "4" }),
    createVNode(_component_xButton, {
      configs: { text: "", onClick: $setup.Actions_Music.stopSong }
    }, {
      default: withCtx(() => [
        createVNode(_component_xIcon, { icon: "stopsong" })
      ]),
      _: 1
    }, 8, ["configs"]),
    createVNode(_component_xGap, { l: "4" }),
    createVNode(_component_xButton, { configs: $data.playOrPause }, null, 8, ["configs"]),
    createVNode(_component_xGap, { l: "4" }),
    createVNode(_component_xButton, {
      configs: { text: "", onClick: $setup.Actions_Music.playNextSong }
    }, {
      default: withCtx(() => [
        createVNode(_component_xIcon, { icon: "nextsong" })
      ]),
      _: 1
    }, 8, ["configs"])
  ], 64);
}
const MusicPlayerOpration = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);
const MusicPlayerAudio_vue_vue_type_style_index_0_lang = "";
const _sfc_main$1 = {
  setup() {
    return {
      stateMusic,
      formatDuring
    };
  },
  methods: {
    changSongProgress(val) {
      Actions_Music.setCurrentTime(val);
    }
  }
};
const _hoisted_1$1 = {
  class: "flex1 flex middle",
  id: "MusicPlayerAudio"
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_xGap = resolveComponent("xGap");
  const _component_elSlider = resolveComponent("elSlider");
  return openBlock(), createElementBlock("div", _hoisted_1$1, [
    createBaseVNode("span", null, toDisplayString($setup.formatDuring($setup.stateMusic.currentTime)), 1),
    createVNode(_component_xGap, { l: "" }),
    createVNode(_component_elSlider, {
      class: "flex1",
      min: 0,
      max: $setup.stateMusic.duration,
      modelValue: $setup.stateMusic.currentTime,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.stateMusic.currentTime = $event),
      "format-tooltip": $setup.formatDuring,
      onChange: $options.changSongProgress
    }, null, 8, ["max", "modelValue", "format-tooltip", "onChange"]),
    createVNode(_component_xGap, { l: "" }),
    createBaseVNode("span", null, toDisplayString($setup.formatDuring($setup.stateMusic.duration)), 1)
  ]);
}
const MusicPlayerAudio = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
const _sfc_main = defineComponent({
  components: {
    MusicPlayerModel,
    MusicPlayerOpration,
    MusicPlayerAudio
  },
  setup() {
    Actions_Music.setVolume(100);
    console.log("\u{1F680} ~ file: PlayerMobile.vue ~ line 38 ~ setup ~ Cpt_currentSong", Cpt_currentSong);
    return {
      Cpt_currentSong,
      stateMusic
    };
  }
});
const PlayerMobile_vue_vue_type_style_index_0_lang = "";
const _hoisted_1 = { class: "flex center ViewMusicPlayerMobile" };
const _hoisted_2 = { class: "audio" };
const _hoisted_3 = { class: "flex center title" };
const _hoisted_4 = { class: "flex MusicPlayerOpration" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_MusicPlayerAudio = resolveComponent("MusicPlayerAudio");
  const _component_MusicPlayerModel = resolveComponent("MusicPlayerModel");
  const _component_xGap = resolveComponent("xGap");
  const _component_MusicPlayerOpration = resolveComponent("MusicPlayerOpration");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", _hoisted_2, [
      createVNode(_component_MusicPlayerAudio),
      createBaseVNode("div", _hoisted_3, toDisplayString(_ctx.Cpt_currentSong.title), 1)
    ]),
    createBaseVNode("div", _hoisted_4, [
      createVNode(_component_MusicPlayerModel),
      createVNode(_component_xGap, { l: "16" }),
      createVNode(_component_MusicPlayerOpration)
    ])
  ]);
}
const PlayerMobile = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  PlayerMobile as default
};
