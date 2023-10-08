import { H as _export_sfc, r as resolveComponent, I as openBlock, aX as createBlock, K as withCtx, h as createVNode, J as createElementBlock, F as Fragment, ah as createBaseVNode, b1 as toDisplayString, f as xU, d as defineComponent, b2 as normalizeStyle } from "./index.js";
import { s as stateMusic, A as Actions_Music, C as Cpt_iconPlayModel, f as formatDuring, c as Cpt_iconSound, b as Cpt_currentSong } from "./music.js";
const MusicPlayerModel_vue_vue_type_style_index_0_lang = "";
const _sfc_main$4 = {
  setup() {
    return {
      stateMusic,
      Actions_Music,
      Cpt_iconPlayModel
    };
  }
};
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_xIcon = resolveComponent("xIcon");
  const _component_xButton = resolveComponent("xButton");
  return openBlock(), createBlock(_component_xButton, {
    configs: { text: "\u64AD\u653E\u65B9\u5F0F", onClick: $setup.Actions_Music.togglePlayModel }
  }, {
    default: withCtx(() => [
      createVNode(_component_xIcon, { icon: $setup.Cpt_iconPlayModel }, null, 8, ["icon"])
    ]),
    _: 1
  }, 8, ["configs"]);
}
const MusicPlayerModel = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4]]);
const _sfc_main$3 = {
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
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_xIcon = resolveComponent("xIcon");
  const _component_xButton = resolveComponent("xButton");
  const _component_xGap = resolveComponent("xGap");
  return openBlock(), createElementBlock(Fragment, null, [
    createVNode(_component_xButton, {
      configs: { text: "\u4E0A\u4E00\u66F2", onClick: $setup.Actions_Music.palyPrevSong }
    }, {
      default: withCtx(() => [
        createVNode(_component_xIcon, { icon: "prevsong" })
      ]),
      _: 1
    }, 8, ["configs"]),
    createVNode(_component_xGap, { l: "4" }),
    createVNode(_component_xButton, {
      configs: { text: "\u505C\u6B62", onClick: $setup.Actions_Music.stopSong }
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
      configs: { text: "\u4E0B\u4E00\u66F2", onClick: $setup.Actions_Music.playNextSong }
    }, {
      default: withCtx(() => [
        createVNode(_component_xIcon, { icon: "nextsong" })
      ]),
      _: 1
    }, 8, ["configs"])
  ], 64);
}
const MusicPlayerOpration = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3]]);
const MusicPlayerAudio_vue_vue_type_style_index_0_lang = "";
const _sfc_main$2 = {
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
const _hoisted_1$2 = {
  class: "flex1 flex middle",
  id: "MusicPlayerAudio"
};
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_xGap = resolveComponent("xGap");
  const _component_elSlider = resolveComponent("elSlider");
  return openBlock(), createElementBlock("div", _hoisted_1$2, [
    createBaseVNode("span", null, toDisplayString($setup.formatDuring($setup.stateMusic.currentTime)), 1),
    createVNode(_component_xGap, { l: "8" }),
    createVNode(_component_elSlider, {
      class: "flex1",
      min: 0,
      max: $setup.stateMusic.duration,
      modelValue: $setup.stateMusic.currentTime,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.stateMusic.currentTime = $event),
      "tooltip-visible": false,
      onChange: $options.changSongProgress
    }, null, 8, ["max", "modelValue", "onChange"]),
    createVNode(_component_xGap, { l: "8" }),
    createBaseVNode("span", null, toDisplayString($setup.formatDuring($setup.stateMusic.duration)), 1)
  ]);
}
const MusicPlayerAudio = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);
const _sfc_main$1 = {
  setup() {
    return {
      stateMusic,
      Actions_Music,
      Cpt_iconSound
    };
  },
  data() {
    return {
      isTooltipVisible: false,
      isMute: false
    };
  },
  methods: {
    changeVolume(val) {
      if (!this.isTooltipVisible) {
        this.isTooltipVisible = true;
      }
      this.delayHideIsTooltipVisible();
      Actions_Music.setVolume(val);
    },
    delayHideIsTooltipVisible: xU.debounce(function() {
      this.isTooltipVisible = false;
    }, 1e3 * 3)
  }
};
const _hoisted_1$1 = { class: "flex1" };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_xIcon = resolveComponent("xIcon");
  const _component_xGap = resolveComponent("xGap");
  const _component_elSlider = resolveComponent("elSlider");
  const _component_xButton = resolveComponent("xButton");
  return openBlock(), createBlock(_component_xButton, { class: "volume flex horizon" }, {
    default: withCtx(() => [
      createVNode(_component_xIcon, {
        icon: $setup.Cpt_iconSound,
        onClick: $setup.Actions_Music.toggleVolumeMute
      }, null, 8, ["icon", "onClick"]),
      createVNode(_component_xGap, { l: "4" }),
      createBaseVNode("div", _hoisted_1$1, [
        createVNode(_component_elSlider, {
          id: "test",
          modelValue: $setup.stateMusic.volume,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.stateMusic.volume = $event),
          "tooltip-visible": $data.isTooltipVisible,
          onChange: $options.changeVolume
        }, null, 8, ["modelValue", "tooltip-visible", "onChange"])
      ])
    ]),
    _: 1
  });
}
const MusicPlayerVolume = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
const _sfc_main = defineComponent({
  components: {
    MusicPlayerModel,
    MusicPlayerOpration,
    MusicPlayerAudio,
    MusicPlayerVolume
  },
  setup() {
    return {
      Cpt_currentSong,
      stateMusic
    };
  },
  computed: {
    styleAlbum() {
      console.log(this.Cpt_currentSong);
      if (this.Cpt_currentSong.picUrl) {
        return `background:url(${this.Cpt_currentSong.picUrl}) right/contain no-repeat;`;
      } else {
        return {};
      }
    }
  }
});
const PlayerPc_vue_vue_type_style_index_0_lang = "";
const _hoisted_1 = { class: "flex ViewMusicPlayer" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_MusicPlayerModel = resolveComponent("MusicPlayerModel");
  const _component_xGap = resolveComponent("xGap");
  const _component_MusicPlayerOpration = resolveComponent("MusicPlayerOpration");
  const _component_MusicPlayerAudio = resolveComponent("MusicPlayerAudio");
  const _component_MusicPlayerVolume = resolveComponent("MusicPlayerVolume");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", {
      class: "title flex center",
      style: normalizeStyle(_ctx.styleAlbum)
    }, toDisplayString(_ctx.Cpt_currentSong.title), 5),
    createVNode(_component_MusicPlayerModel),
    createVNode(_component_xGap, { l: "16" }),
    createVNode(_component_MusicPlayerOpration),
    createVNode(_component_xGap, { l: "16" }),
    createVNode(_component_MusicPlayerAudio),
    createVNode(_component_xGap, { l: "16" }),
    createVNode(_component_MusicPlayerVolume)
  ]);
}
const PlayerPc = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  PlayerPc as default
};
