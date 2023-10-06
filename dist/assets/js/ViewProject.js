import { d as defineComponent, s as stateApp, c as cptRouter, x as xI, a as defItem, w as withDirectives, j as resolveDirective, f as createVNode, r as resolveComponent, i as itemsInvalid, b as API, e as xU, F as Fragment, aA as computed, m as xScope, ao as onMounted, aB as TAB_KEY_PROJECT_CONFIGS, aC as TAB_KEY_PROJECT_REQUEST_CODE, g as isVNode, aD as TAB_KEY_PROJECT_REQUEST, aE as TAB_KEY_PROJECT_AUTH, aF as TAB_KEY_PROJECT_MOCK, ae as stateInterface, aG as TAB_KEY_INTERFACE, aH as TAB_KEY_PROJECT_SETTING, au as OPEN_BLANK, aI as TAB_KEY_PROJECT_WIKI, K as aHashLink, P as PROJECT } from "./index.js";
import { ViewWiki } from "./ViewWiki.js";
import { o as openUpsertTagDialog, a as openProxyEnvDialog, V as ViewInterface } from "./ViewInterface.js";
import { x as xItem_ProjectGroupId, a as xItem_ProjectName, b as xItem_ProjectIcon, c as xItem_ProjectColor, d as xItem_ProjectBasePath, e as xItem_ProjectDesc, f as xItem_ProjectType } from "./TuiEditor.js";
import { p as pickValueFrom } from "./common.FormRules.js";
import "./wiki.js";
import "./common.options.js";
import "./VNodeRender.js";
const ViewProject$1 = "";
const ProjectSettingCommon = defineComponent({
  setup() {
    return {
      stateApp,
      cptRouter
    };
  },
  data(vm) {
    return {
      configsBtnOpenUpsertTagDialog: {
        text: xI("\u7BA1\u7406\u63A5\u53E3Tags"),
        async onClick() {
          await openUpsertTagDialog();
        }
      },
      configsBtnOpenProxyEnvDialog: {
        text: xI("\u7BA1\u7406\u63A5\u53E3\u8F6C\u53D1\u73AF\u5883"),
        async onClick() {
          await openProxyEnvDialog();
        }
      },
      dataXItem: {
        group_id: defItem(xItem_ProjectGroupId({
          value: vm.cptRouter.query.group_id
        })),
        name: defItem(xItem_ProjectName({
          value: vm.stateApp.currProject.name
        })),
        icon: defItem(xItem_ProjectIcon({
          value: vm.stateApp.currProject.icon
        })),
        color: defItem(xItem_ProjectColor({
          value: vm.stateApp.currProject.color
        })),
        basepath: defItem(xItem_ProjectBasePath({
          value: vm.stateApp.currProject.basepath
        })),
        desc: defItem(xItem_ProjectDesc({
          value: vm.stateApp.currProject.desc
        })),
        project_type: defItem(xItem_ProjectType({
          value: vm.stateApp.currProject.project_type
        })),
        proxyHostPort: defItem({
          value: vm.stateApp.currProject.proxyHostPort || "",
          label: () => defItem.labelWithTips({
            label: "\u4EE3\u7406\u5730\u5740",
            icon: withDirectives(createVNode(resolveComponent("xIcon"), {
              "icon": "question"
            }, null), [[resolveDirective("xTips"), {
              content: xI(`<div>\u5982\u679C\u8BF7\u6C42\u9700\u8981\u4F7F\u7528VPN\uFF0C\u5219\u9700\u8981\u6709\u4E00\u53F0\u5F00\u542FVPN\u7684PC\u4F5C\u4E3A\u4EE3\u7406\u673A\u3002</div>
<div>\u5229\u7528 <a class="pointer" href="https://wproxy.org/whistle/" target="_blank">whistle</a> <b>w2 start</b></div>
<div>\u53EF\u4EE5\u5F00\u542Fhttp://loclhost:8899</div>`)
            }]])
          }),
          placeholder: "ip:port"
        }),
        strice: defItem({
          itemType: "Switch",
          label: () => defItem.labelWithTips({
            label: xI("mock\u4E25\u683C\u6A21\u5F0F"),
            icon: withDirectives(createVNode(resolveComponent("xIcon"), {
              "icon": "question"
            }, null), [[resolveDirective("xTips"), {
              content: xI("\u5F00\u542F\u540E mock \u8BF7\u6C42\u4F1A\u5BF9 query\uFF0Cbody form \u7684\u5FC5\u987B\u5B57\u6BB5\u548C json schema \u8FDB\u884C\u6821\u9A8C")
            }]])
          }),
          checkedChildren: xI("\u5F00"),
          unCheckedChildren: xI("\u5173"),
          value: !!vm.stateApp.currProject.strice
        }),
        is_json5: defItem({
          itemType: "Switch",
          label: () => defItem.labelWithTips({
            label: xI("\u5F00\u542Fjson5"),
            icon: withDirectives(createVNode(resolveComponent("xIcon"), {
              "icon": "question"
            }, null), [[resolveDirective("xTips"), {
              content: xI("\u5F00\u542F\u540E\u53EF\u5728\u63A5\u53E3 body \u548C\u8FD4\u56DE\u503C\u4E2D\u5199 json \u5B57\u6BB5")
            }]])
          }),
          checkedChildren: xI("\u5F00"),
          unCheckedChildren: xI("\u5173"),
          value: !!vm.stateApp.currProject.is_json5
        }),
        switch_notice: defItem({
          itemType: "Switch",
          label: xI("\u9ED8\u8BA4\u5F00\u542F\u6D88\u606F\u901A\u77E5"),
          checkedChildren: xI("\u5F00"),
          unCheckedChildren: xI("\u5173"),
          value: !!vm.stateApp.currProject.switch_notice
        })
      }
    };
  },
  created() {
  },
  methods: {},
  render() {
    const vm = this;
    return createVNode(Fragment, null, [createVNode(resolveComponent("xContainer"), {
      "col": "2",
      "ref": "ProjectSettingCommon"
    }, {
      default: () => [createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.name
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.group_id
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.icon
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.color
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.basepath,
        "span": "full"
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.desc,
        "span": "full"
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.proxyHostPort,
        "span": "full"
      }, null), createVNode(resolveComponent("xContainer"), {
        "span": "full",
        "class": "flex middle",
        "col": "3"
      }, {
        default: () => [createVNode(resolveComponent("xItem"), {
          "configs": this.dataXItem.project_type
        }, null), createVNode(resolveComponent("xItem"), {
          "configs": this.dataXItem.strice
        }, null), createVNode(resolveComponent("xItem"), {
          "configs": this.dataXItem.is_json5
        }, null), createVNode(resolveComponent("xItem"), {
          "configs": this.dataXItem.switch_notice
        }, null), createVNode(resolveComponent("xButton"), {
          "configs": this.configsBtnOpenUpsertTagDialog
        }, null), createVNode(resolveComponent("xButton"), {
          "configs": this.configsBtnOpenProxyEnvDialog
        }, null)]
      })]
    }), createVNode(resolveComponent("xGap"), {
      "f": true
    }, null), createVNode("div", {
      "class": "flex center middle"
    }, [createVNode(resolveComponent("xButton"), {
      "configs": {
        type: "primary",
        text: xI("\u66F4\u65B0"),
        async onClick() {
          try {
            if (!await itemsInvalid(vm.$refs.ProjectSettingCommon)) {
              const dataForm = pickValueFrom(vm.dataXItem);
              dataForm.id = vm.stateApp.currProject._id;
              await API.project.update(dataForm);
              stateApp._setCurrProject(dataForm.id, {
                isEnforce: true
              });
              xU.message.success("\u66F4\u65B0\u6210\u529F");
            }
          } catch (error) {
            xU.message.error(error.message);
          }
        }
      }
    }, null)])]);
  }
});
const ProjectRequestCode = defineComponent({
  setup() {
    const cpt_code = computed(() => {
      try {
        const requestCode = stateApp._returnRequestCode();
        return requestCode({
          title: "TitleDemo",
          path: "/path_demo",
          method: "GET",
          projectId: "projectId_demo",
          interfaceId: "interfaceId_demo",
          xU
        });
      } catch (error) {
        return error.message;
      }
    });
    return function() {
      return createVNode("div", {
        "class": "flex flex1 vertical"
      }, [createVNode("div", {
        "class": "flex flex1 box-shadow mt mb "
      }, [createVNode("div", {
        "class": "flex flex1 vertical",
        "style": "width:40%;"
      }, [createVNode(resolveComponent("monacoEditor"), {
        "code": stateApp.currProject.requestCode,
        "onUpdate:code": ($event) => stateApp.currProject.requestCode = $event
      }, null)]), createVNode(resolveComponent("xGap"), {
        "l": true
      }, null), createVNode("pre", {
        "class": "flex1",
        "style": "width:40%;"
      }, [createVNode(resolveComponent("mkit"), {
        "md": cpt_code.value
      }, null)])]), createVNode("div", {
        "class": "flex center middle"
      }, [createVNode(resolveComponent("xButton"), {
        "configs": {
          type: "primary",
          text: xI("\u66F4\u65B0"),
          async onClick() {
            try {
              const dataForm = {
                id: stateApp.currProject._id,
                requestCode: stateApp.currProject.requestCode
              };
              await API.project.update(dataForm);
              stateApp._setCurrProject(dataForm.id, {
                isEnforce: true
              });
              xU.message.success("\u66F4\u65B0\u6210\u529F");
            } catch (error) {
              xU.message.error(error.message);
            }
          }
        }
      }, null)])]);
    };
  }
});
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const ProjectSetting = defineComponent({
  setup() {
    var vm = {};
    vm = xScope(vm);
    const cptCurrTabName = computed({
      get() {
        return cptRouter.value.query.project_setting_tab || TAB_KEY_PROJECT_CONFIGS;
      },
      set(project_setting_tab) {
        cptRouter.value.query.project_setting_tab = project_setting_tab;
      }
    });
    var vDomSwitchPanel = computed(() => {
      let _slot;
      let btnArray = [TAB_KEY_PROJECT_CONFIGS, TAB_KEY_PROJECT_REQUEST, TAB_KEY_PROJECT_AUTH, TAB_KEY_PROJECT_MOCK, TAB_KEY_PROJECT_REQUEST_CODE];
      return createVNode("div", {
        "class": "flex middle start"
      }, [createVNode(resolveComponent("el-button-group"), {
        "class": "ml-4"
      }, _isSlot(_slot = xU.map(btnArray, (name) => {
        const type = cptCurrTabName.value === name ? "primary" : "";
        return createVNode(resolveComponent("xButton"), {
          "type": type,
          "onClick": () => cptCurrTabName.value = name
        }, _isSlot(name) ? name : {
          default: () => [name]
        });
      })) ? _slot : {
        default: () => [_slot]
      }), createVNode(resolveComponent("xGap"), {
        "f": "1"
      }, null)]);
    });
    var vDomProjectConfigs = computed(() => {
      if (cptRouter.value.query.project_setting_tab !== TAB_KEY_PROJECT_CONFIGS) {
        return null;
      }
      return createVNode(ProjectSettingCommon, null, null);
    });
    var vDomTabKeyProjectRequestCode = computed(() => {
      if (cptRouter.value.query.project_setting_tab !== TAB_KEY_PROJECT_REQUEST_CODE) {
        return null;
      }
      return createVNode(ProjectRequestCode, null, null);
    });
    onMounted(() => {
      if (!cptRouter.value.query.project_setting_tab) {
        cptRouter.value.query.project_setting_tab = TAB_KEY_PROJECT_CONFIGS;
      }
    });
    return function() {
      return createVNode("div", {
        "class": "padding flex1 width100 flex"
      }, [createVNode("section", {
        "class": "view-main-section box-shadow flex1"
      }, [vDomSwitchPanel.value, vDomProjectConfigs.value, vDomTabKeyProjectRequestCode.value])]);
    };
  }
});
const ViewProject = defineComponent({
  name: "ViewProject",
  setup() {
    stateInterface.__resetState();
    const curretProjectTabName = computed({
      get() {
        return cptRouter.value.query.project_tab;
      },
      set(project_tab) {
        cptRouter.value.query.project_tab = project_tab;
      }
    });
    function newComputedFn({
      iconName,
      tabKey,
      label
    }) {
      return () => {
        let className = "project-tab flex vertical middle";
        if (curretProjectTabName.value === tabKey) {
          className += " active";
        }
        return createVNode("div", {
          "class": className,
          "onClick": () => curretProjectTabName.value = tabKey
        }, [createVNode(resolveComponent("xIcon"), {
          "icon": iconName
        }, null), createVNode("div", null, [label])]);
      };
    }
    const cpt_vDomTabProjectWiki = computed(() => {
      const tipsLabel = xI(OPEN_BLANK);
      let className = "project-tab flex vertical middle";
      if (curretProjectTabName.value === TAB_KEY_PROJECT_WIKI) {
        className += " active";
      }
      const href = aHashLink("/wiki_project", {
        group_id: cptRouter.value.query.group_id,
        project_id: cptRouter.value.query.project_id
      });
      const tips = {
        content: `<a href="${href}" target="_blank"> ${tipsLabel} </a>`,
        placement: "right"
      };
      return withDirectives(createVNode("div", {
        "class": className,
        "onClick": () => curretProjectTabName.value = TAB_KEY_PROJECT_WIKI
      }, [createVNode(resolveComponent("xIcon"), {
        "icon": "icon_project_wiki"
      }, null), createVNode("div", null, [xI(TAB_KEY_PROJECT_WIKI)])]), [[resolveDirective("xTips"), tips]]);
    });
    const cpt_vDomTabInterface = computed(newComputedFn({
      iconName: "icon_interface_mgr",
      tabKey: TAB_KEY_INTERFACE,
      label: xI("\u63A5\u53E3")
    }));
    const cpt_vDomTabProjectSetting = computed(newComputedFn({
      iconName: "icon_project_setting",
      tabKey: TAB_KEY_PROJECT_SETTING,
      label: xI("\u9879\u76EE\u8BBE\u7F6E")
    }));
    const cpt_vDomViewProjectWiki = computed(() => {
      if (curretProjectTabName.value !== TAB_KEY_PROJECT_WIKI) {
        return null;
      }
      return createVNode(ViewWiki, {
        "belongType": PROJECT
      }, null);
    });
    const cpt_vDomViewProjectSetting = computed(() => {
      if (curretProjectTabName.value !== TAB_KEY_PROJECT_SETTING) {
        return null;
      }
      return createVNode(ProjectSetting, null, null);
    });
    const cpt_vDomViewIterface = computed(() => {
      if (curretProjectTabName.value !== TAB_KEY_INTERFACE) {
        return null;
      }
      return createVNode(ViewInterface, null, null);
    });
    onMounted(() => {
      if (!curretProjectTabName.value) {
        curretProjectTabName.value = TAB_KEY_INTERFACE;
      }
    });
    return function() {
      if (!stateApp.currProject._id) {
        return withDirectives(createVNode("div", {
          "class": "flex vertical middle center height100"
        }, null), [[resolveDirective("xloading"), "true"]]);
      }
      return createVNode("div", {
        "id": "ViewProject"
      }, [createVNode("aside", {
        "id": "ViewProjectTabs",
        "class": "elevation-1"
      }, [cpt_vDomTabProjectWiki.value, cpt_vDomTabInterface.value, cpt_vDomTabProjectSetting.value]), cpt_vDomViewProjectWiki.value, cpt_vDomViewIterface.value, cpt_vDomViewProjectSetting.value]);
    };
  }
});
export {
  ViewProject
};
