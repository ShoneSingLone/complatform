import { d as defineComponent, m as xScope, aA as computed, ap as onMounted, c as cptRouter, aB as TAB_KEY_PROJECT_CONFIGS, f as createVNode, r as resolveComponent, e as xU, g as isVNode, aC as TAB_KEY_PROJECT_REQUEST, aD as TAB_KEY_PROJECT_AUTH, aE as TAB_KEY_PROJECT_MOCK, ae as stateInterface, aF as TAB_KEY_INTERFACE, x as xI, aG as TAB_KEY_PROJECT_SETTING, s as stateApp, w as withDirectives, j as resolveDirective, au as OPEN_BLANK, aH as TAB_KEY_PROJECT_WIKI, K as aHashLink, P as PROJECT } from "./index.js";
import { ViewWiki } from "./ViewWiki.js";
import { ViewInterface } from "./ViewInterface.js";
import "./common.FormRules.js";
import "./wiki.js";
import "./TuiEditor.js";
import "./common.options.js";
import "./VNodeRender.js";
const ViewProject$1 = "";
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
      let btnArray = [TAB_KEY_PROJECT_CONFIGS, TAB_KEY_PROJECT_REQUEST, TAB_KEY_PROJECT_AUTH, TAB_KEY_PROJECT_MOCK];
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
    onMounted(() => {
      if (!cptRouter.value.query.project_setting_tab) {
        cptRouter.value.query.project_setting_tab = TAB_KEY_PROJECT_CONFIGS;
      }
    });
    return function() {
      return createVNode("section", {
        "class": "view-main-section box-shadow flex1"
      }, [vDomSwitchPanel.value]);
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
