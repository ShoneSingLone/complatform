import { d as defineComponent, c as cptRouter, e as xU, f as createVNode, r as resolveComponent, x as xI, aX as RouterView } from "./index.js";
import { M as MusicPlayer } from "./MusicPlayer.js";
import { s as stateMusic } from "./music.js";
function goHome() {
  debugger;
}
const LayoutMusicPc = defineComponent({
  components: {
    MusicPlayer
  },
  setup() {
    return {
      stateMusic,
      goHome
    };
  },
  data() {
    const selectedKey = cptRouter.value.pathname || "playlist";
    return {
      collapsed: false,
      selectedKeys: [selectedKey]
    };
  },
  watch: {
    selectedKeys(selectedKeys) {
      const viewName = selectedKeys[0];
      this.$router.push({
        path: `/music/${viewName}`
      });
    }
  },
  computed: {
    vDomMenuItem() {
      return xU.map(stateMusic.tabItems, (menuItem) => {
        return createVNode(resolveComponent("AMenuItem"), {
          "key": menuItem.key
        }, {
          default: () => [createVNode("span", {
            "class": "flex"
          }, [createVNode(resolveComponent("xGap"), {
            "l": "10"
          }, null), createVNode(resolveComponent("xIcon"), {
            "icon": menuItem.icon,
            "class": "ml10"
          }, null), xI(menuItem.label)])]
        });
      });
    }
  },
  render() {
    return createVNode(resolveComponent("ALayout"), {
      "id": "ViewMusic",
      "style": "height: 100vh"
    }, {
      default: () => [createVNode(resolveComponent("ALayoutSider"), {
        "class": "elevation-2"
      }, {
        default: () => [createVNode(resolveComponent("AMenu"), {
          "selectedKeys": this.selectedKeys,
          "onUpdate:selectedKeys": ($event) => this.selectedKeys = $event,
          "theme": "light",
          "mode": "inline"
        }, {
          default: () => [this.vDomMenuItem]
        })]
      }), createVNode(resolveComponent("ALayout"), {
        "style": "height: 100vh",
        "class": "flex vertical"
      }, {
        default: () => [createVNode(resolveComponent("ALayoutHeader"), {
          "style": "background: #fff; padding: 0",
          "class": "elevation-1 flex middle"
        }, {
          default: () => [createVNode(resolveComponent("xButton"), {
            "configs": {
              onClick: goHome
            },
            "style": "margin-left: 16px"
          }, {
            default: () => [createVNode(resolveComponent("xIcon"), {
              "icon": "gohome"
            }, null)]
          })]
        }), createVNode("main", {
          "class": "ant-layout-content elevation-1 flex1",
          "style": "margin: 16px"
        }, [createVNode("div", {
          "style": "height: 100%; padding: 24px; background: rgb(255, 255, 255); overflow: hidden;"
        }, [createVNode(RouterView, null, null)])]), createVNode(resolveComponent("ALayoutFooter"), {
          "style": "height: 88px; background: white",
          "class": "flex middle elevation-1"
        }, {
          default: () => [createVNode(MusicPlayer, null, null)]
        })]
      })]
    });
  }
});
export {
  LayoutMusicPc as default
};
