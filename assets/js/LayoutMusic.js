import { d as defineComponent, a6 as defineAsyncComponent, s as stateApp, aT as __vitePreload, H as _export_sfc, r as resolveComponent, I as openBlock, aU as createBlock } from "./index.js";
const _sfc_main = defineComponent({
  components: {
    LayoutMusicMobile: defineAsyncComponent(async () => {
      const module = await __vitePreload(() => import("./LayoutMusicMobile.js"), true ? ["./LayoutMusicMobile.js","./index.js","..\\index.css","./MusicPlayer.js","..\\MusicPlayer.css","./music.js"] : void 0, import.meta.url);
      return module.default;
    }),
    LayoutMusicPc: defineAsyncComponent(async () => {
      const module = await __vitePreload(() => import("./LayoutMusicPc.js"), true ? ["./LayoutMusicPc.js","./index.js","..\\index.css","./MusicPlayer.js","..\\MusicPlayer.css","./music.js"] : void 0, import.meta.url);
      return module.default;
    })
  },
  setup() {
    return {
      stateApp
    };
  },
  mounted_demo() {
    var audioCtx = new AudioContext();
    var button = this.$refs.button;
    var pre = this.$refs.pre;
    var myScript = this.$refs.script;
    pre.innerHTML = myScript.innerHTML;
    var channels = 2;
    var frameCount = audioCtx.sampleRate * 2;
    var myArrayBuffer = audioCtx.createBuffer(2, frameCount, audioCtx.sampleRate);
    button.onclick = function() {
      for (var channel = 0; channel < channels; channel++) {
        var nowBuffering = myArrayBuffer.getChannelData(channel);
        for (var i = 0; i < frameCount; i++) {
          nowBuffering[i] = Math.random() * 2 - 1;
        }
      }
      var source = audioCtx.createBufferSource();
      source.buffer = myArrayBuffer;
      source.connect(audioCtx.destination);
      source.start();
    };
  }
});
const LayoutMusic_vue_vue_type_style_index_0_lang = "";
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_LayoutMusicMobile = resolveComponent("LayoutMusicMobile");
  const _component_LayoutMusicPc = resolveComponent("LayoutMusicPc");
  return _ctx.stateApp.useMobileView ? (openBlock(), createBlock(_component_LayoutMusicMobile, {
    key: 0,
    class: "music-app"
  })) : (openBlock(), createBlock(_component_LayoutMusicPc, {
    key: 1,
    class: "music-app"
  }));
}
const LayoutMusic = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  LayoutMusic as default
};
