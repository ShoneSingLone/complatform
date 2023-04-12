import { d as defineComponent, a8 as resetStateInterface, g as _State_App, C as Cpt_url, a9 as ProjectChildren, e as createVNode, r as resolveComponent, x as xU, aa as RouterView, q as isVNode } from "./index.js";
const ViewProject$1 = "";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const ViewProject = defineComponent({
  name: "ViewProject",
  setup() {
    resetStateInterface();
    return {
      State_App: _State_App,
      Cpt_url
    };
  },
  watch: {
    Cpt_url: {
      deep: true,
      handler(Cpt_url2) {
        const [_, a, b] = String(Cpt_url2.pathname).split("/");
        const currentViewKey = `/${a}/${b}`;
        if (this.currentViewKey != currentViewKey) {
          this.currentViewKey = currentViewKey;
        }
      }
    }
  },
  data() {
    const [_, a, b] = String(this.Cpt_url.pathname).split("/");
    return {
      ProjectChildren,
      currentViewKey: `/${a}/${b}`
    };
  },
  methods: {
    switchProjectSubOption({
      key: path
    }) {
      this.Cpt_url.go(path, this.Cpt_url.query);
      this.currentViewKey = path;
    }
  },
  computed: {},
  render() {
    let _slot;
    if (!this.State_App.currProject._id) {
      return createVNode(resolveComponent("aSpin"), {
        "class": "flex vertical middle center height100"
      }, null);
    }
    return createVNode("div", {
      "id": "ViewProject"
    }, [createVNode(resolveComponent("aMenu"), {
      "onClick": this.switchProjectSubOption,
      "selectedKeys": [this.currentViewKey],
      "mode": "horizontal",
      "class": ""
    }, _isSlot(_slot = xU.map(this.ProjectChildren, (item, index) => {
      if (item.label.length === 2) {
        item.label = item.label[0] + " " + item.label[1];
      }
      return createVNode(resolveComponent("aMenuItem"), {
        "class": "item",
        "key": item.path
      }, {
        default: () => [item.label]
      });
    })) ? _slot : {
      default: () => [_slot]
    }), createVNode(RouterView, null, null)]);
  }
});
export {
  ViewProject
};
