import { d as defineComponent, s as stateApp, e as xU, c as cptRouter, f as createVNode, r as resolveComponent, a_ as RouterView } from "./index.js";
import { M as MusicPlayer } from "./MusicPlayer.js";
import { s as stateMusic } from "./music.js";
function goHome() {
  debugger;
}
const LayoutMusicMobile = defineComponent({
  components: {
    MusicPlayer
  },
  setup() {
    return {
      stateMusic,
      stateApp,
      goHome
    };
  },
  data() {
    const selectedKey = xU.last(cptRouter.value.pathname.split("/")) || "playlist";
    return {
      selectedKey
    };
  },
  computed: {
    vDomItem() {
      return xU.map(stateMusic.tabItems, (item) => {
        const className = {
          "ant-btn-link elevation elevation-2": item.key === this.selectedKey,
          "menu-icon flex middle center": true
        };
        return createVNode("div", {
          "key": item.key,
          "class": className,
          "onClick": () => this.handleClickSelectedKey(item.key)
        }, [createVNode(resolveComponent("xIcon"), {
          "icon": item.icon
        }, null)]);
      });
    }
  },
  methods: {
    handleClickSelectedKey(viewName) {
      cptRouter.value.go(`/music/${viewName}`);
      this.selectedKey = viewName;
    }
  },
  render() {
    return createVNode("div", {
      "id": "ViewMusic",
      "class": "flex vertical"
    }, [createVNode("div", {
      "class": "flex1 flex",
      "style": "height:1px;"
    }, [createVNode(RouterView, null, null)]), createVNode("div", {
      "class": "elevation-2"
    }, [createVNode(MusicPlayer, null, null), createVNode("div", {
      "class": "nav-tab flex width100 around middle"
    }, [this.vDomItem])])]);
  }
});
export {
  LayoutMusicMobile as default
};
