import { d as defineComponent, a9 as useInterfaceTableConfigs, a5 as State_ProjectInterface, C as Cpt_url, $ as $t, e as createVNode, r as resolveComponent } from "./index.js";
import { o as openDialogInterfaceStatusModify, a as openDialogInterfaceProxyModify } from "./DialogModifyInterface.Helper.js";
import "./TuiEditor.js";
const InterfaceCategory = defineComponent({
  setup() {
    const {
      filterParams,
      configs_interfaceTable,
      fnUpdateListForShow
    } = useInterfaceTableConfigs();
    return {
      State_Project: State_ProjectInterface,
      Cpt_url,
      filterParams,
      configs_interfaceTable,
      fnUpdateListForShow
    };
  },
  computed: {
    disabled() {
      return !this.configs_interfaceTable.selected.length;
    }
  },
  data(vm) {
    return {
      btnChangeStatus: {
        text: $t("\u53D8\u66F4\u72B6\u6001").label,
        disabled() {
          return vm.disabled;
        },
        async onClick() {
          openDialogInterfaceStatusModify({
            selected: vm.configs_interfaceTable.selected
          });
        }
      },
      btnChangeProxy: {
        text: $t("\u53D8\u66F4\u4EE3\u7406").label,
        disabled() {
          return vm.disabled;
        },
        async onClick() {
          openDialogInterfaceProxyModify({
            selected: vm.configs_interfaceTable.selected
          });
        }
      }
    };
  },
  watch: {
    "State_Project.allInterface": {
      immediate: true,
      handler() {
        this.fnUpdateListForShow();
      }
    },
    filterParams: {
      deep: true,
      handler(allInterface) {
        this.State_Project.isLoading = true;
        this.configs_interfaceTable.selected = [];
        this.fnUpdateListForShow();
        setTimeout(() => {
          this.State_Project.isLoading = false;
        }, 10 * 1e3);
      }
    },
    "Cpt_url.query.category_id": {
      immediate: true,
      handler(catid) {
        this.filterParams.catid = [Number(catid)];
      }
    }
  },
  render(vm) {
    return createVNode(resolveComponent("xView"), {
      "class": "Interface-view"
    }, {
      default: () => [createVNode("div", {
        "class": "Operation mb10"
      }, [createVNode(resolveComponent("xButton"), {
        "class": "mr4",
        "configs": vm.btnChangeStatus
      }, null), createVNode(resolveComponent("xButton"), {
        "class": "mr4",
        "configs": vm.btnChangeProxy
      }, null)]), createVNode("div", {
        "class": "elevation-1 padding20 flex1",
        "style": {
          height: "100px"
        }
      }, [createVNode(resolveComponent("xVirTable"), {
        "configs": this.configs_interfaceTable,
        "class": "flex1 width100 "
      }, null)])]
    });
  }
});
export {
  InterfaceCategory
};
