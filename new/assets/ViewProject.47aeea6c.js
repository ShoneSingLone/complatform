import { d as defineComponent, i as resetStateInterface, j as State_Project, g as _State_App, C as Cpt_url, P as ProjectChildren, e as createVNode, r as resolveComponent, p as privateLodash, k as isVNode } from "./index.9a01e62e.js";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const ViewProject = defineComponent({
  name: "ViewProject",
  setup() {
    resetStateInterface();
    return {
      State_Project,
      State_App: _State_App,
      Cpt_url
    };
  },
  data() {
    return {
      currentViewKey: ProjectChildren[0].path,
      ProjectChildren
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
    }, _isSlot(_slot = privateLodash.map(this.ProjectChildren, (item, index) => {
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
    }), createVNode(resolveComponent("RouterView"), null, null)]);
  }
});
export {
  ViewProject
};
//# sourceMappingURL=ViewProject.47aeea6c.js.map
