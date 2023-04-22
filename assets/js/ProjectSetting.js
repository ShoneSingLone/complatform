import { d as defineComponent, g as _State_App, C as Cpt_url, $ as $t, a as defItem, ar as xItem_ProjectGroupId, as as xItem_ProjectName, at as xItem_ProjectIcon, au as xItem_ProjectColor, av as xItem_ProjectBasePath, aw as xItem_ProjectDesc, ax as xItem_ProjectType, e as createVNode, r as resolveComponent, x as xU, n as Fragment, h as createTextVNode } from "./index.js";
import { c as openUpsertTagDialog, d as openProxyEnvDialog } from "./DialogModifyInterface.Helper.js";
import "./TuiEditor.js";
const ProjectSettingCommon = defineComponent({
  setup() {
    return {
      State_App: _State_App,
      Cpt_url
    };
  },
  data(vm) {
    return {
      configsBtnOpenUpsertTagDialog: {
        text: $t("\u7BA1\u7406\u63A5\u53E3Tags").label,
        async onClick() {
          await openUpsertTagDialog();
        }
      },
      configsBtnOpenProxyEnvDialog: {
        text: $t("\u7BA1\u7406\u63A5\u53E3\u8F6C\u53D1\u73AF\u5883").label,
        async onClick() {
          await openProxyEnvDialog();
        }
      },
      dataXItem: {
        ...defItem(xItem_ProjectGroupId({
          value: vm.Cpt_url.query.group_id
        }, vm)),
        ...defItem(xItem_ProjectName({
          value: vm.State_App.currProject.name
        })),
        ...defItem(xItem_ProjectIcon({
          value: vm.State_App.currProject.icon
        })),
        ...defItem(xItem_ProjectColor({
          value: vm.State_App.currProject.color
        })),
        ...defItem(xItem_ProjectBasePath({
          value: vm.State_App.currProject.basepath
        })),
        ...defItem(xItem_ProjectDesc({
          value: vm.State_App.currProject.desc
        })),
        ...defItem(xItem_ProjectType({
          value: vm.State_App.currProject.project_type
        })),
        ...defItem({
          value: vm.State_App.currProject.proxyHostPort || "",
          prop: "proxyHostPort",
          label: defItem.labelWithTips({
            label: "\u4EE3\u7406\u5730\u5740",
            tips: $t("\u8BF7\u6C42\u9700\u8981\u4F7F\u7528VPN\uFF0C\u5219\u9700\u8981\u6709\u4E00\u53F0\u5F00\u542FVPN\u7684PC\u4F5C\u4E3A\u4EE3\u7406\u673A").label,
            icon: createVNode(resolveComponent("xIcon"), {
              "icon": "question"
            }, null)
          }),
          placeholder: "ip:port"
        }),
        ...defItem({
          itemType: "Switch",
          prop: "strice",
          label: defItem.labelWithTips({
            label: $t("mock\u4E25\u683C\u6A21\u5F0F").label,
            tips: $t("\u5F00\u542F\u540E mock \u8BF7\u6C42\u4F1A\u5BF9 query\uFF0Cbody form \u7684\u5FC5\u987B\u5B57\u6BB5\u548C json schema \u8FDB\u884C\u6821\u9A8C").label,
            icon: createVNode(resolveComponent("xIcon"), {
              "icon": "question"
            }, null)
          }),
          checkedChildren: vm.$t("\u5F00").label,
          unCheckedChildren: vm.$t("\u5173").label,
          value: !!vm.State_App.currProject.strice
        }),
        ...defItem({
          itemType: "Switch",
          prop: "is_json5",
          label: defItem.labelWithTips({
            label: $t("\u5F00\u542Fjson5").label,
            tips: $t("\u5F00\u542F\u540E\u53EF\u5728\u63A5\u53E3 body \u548C\u8FD4\u56DE\u503C\u4E2D\u5199 json \u5B57\u6BB5").label,
            icon: createVNode(resolveComponent("xIcon"), {
              "icon": "question"
            }, null)
          }),
          checkedChildren: vm.$t("\u5F00").label,
          unCheckedChildren: vm.$t("\u5173").label,
          value: !!vm.State_App.currProject.is_json5
        }),
        ...defItem({
          itemType: "Switch",
          prop: "switch_notice",
          label: $t("\u9ED8\u8BA4\u5F00\u542F\u6D88\u606F\u901A\u77E5").label,
          checkedChildren: vm.$t("\u5F00").label,
          unCheckedChildren: vm.$t("\u5173").label,
          value: !!vm.State_App.currProject.switch_notice
        })
      }
    };
  },
  created() {
  },
  methods: {},
  render() {
    return createVNode(Fragment, null, [createVNode(resolveComponent("xForm"), {
      "class": "flex vertical",
      "labelStyle": {
        "min-width": "120px",
        width: "unset"
      }
    }, {
      default: () => [xU.map(this.dataXItem, (configs, prop) => {
        return createVNode(Fragment, null, [createVNode(resolveComponent("xGap"), {
          "t": "10",
          "key": prop
        }, null), createVNode(resolveComponent("xItem"), {
          "configs": configs,
          "key": prop
        }, null)]);
      }), createVNode(resolveComponent("xGap"), {
        "t": "10"
      }, null), createVNode(resolveComponent("xButton"), {
        "configs": this.configsBtnOpenUpsertTagDialog
      }, null), createVNode(resolveComponent("xGap"), {
        "t": "10"
      }, null), createVNode(resolveComponent("xButton"), {
        "configs": this.configsBtnOpenProxyEnvDialog
      }, null)]
    })]);
  }
});
const ProjectSetting = defineComponent({
  setup() {
    return {
      State_App: _State_App,
      Cpt_url
    };
  },
  data(vm) {
    return {
      activeKey: "1"
    };
  },
  created() {
  },
  methods: {},
  render() {
    return createVNode("section", {
      "id": "ViewProjectSetting"
    }, [createVNode(resolveComponent("a-tabs"), {
      "activeKey": this.activeKey,
      "onUpdate:activeKey": ($event) => this.activeKey = $event,
      "tabPosition": "left"
    }, {
      default: () => [createVNode(resolveComponent("a-tab-pane"), {
        "key": "1",
        "tab": $t("\u9879\u76EE\u914D\u7F6E").label,
        "class": "flex",
        "style": "width:100%"
      }, {
        default: () => [createVNode(ProjectSettingCommon, null, null)]
      }), createVNode(resolveComponent("a-tab-pane"), {
        "key": "3",
        "tab": $t("\u8BF7\u6C42\u914D\u7F6E").label
      }, {
        default: () => [createVNode("p", null, [createTextVNode("Content of Tab Pane 3")]), createVNode("p", null, [createTextVNode("Content of Tab Pane 3")]), createVNode("p", null, [createTextVNode("Content of Tab Pane 3")])]
      }), createVNode(resolveComponent("a-tab-pane"), {
        "key": "token\u914D\u7F6E",
        "tab": $t("token\u914D\u7F6E").label
      }, {
        default: () => [createVNode("p", null, [createTextVNode("Content of Tab Pane 3")]), createVNode("p", null, [createTextVNode("Content of Tab Pane 3")]), createVNode("p", null, [createTextVNode("Content of Tab Pane 3")])]
      }), createVNode(resolveComponent("a-tab-pane"), {
        "key": "\u5168\u5C40mock\u811A\u672C",
        "tab": $t("\u5168\u5C40mock\u811A\u672C").label
      }, {
        default: () => [createVNode("p", null, [createTextVNode("Content of Tab Pane 3")]), createVNode("p", null, [createTextVNode("Content of Tab Pane 3")]), createVNode("p", null, [createTextVNode("Content of Tab Pane 3")])]
      })]
    })]);
  }
});
export {
  ProjectSetting
};
