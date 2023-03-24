import { d as defineComponent, ae as useInterfaceTableConfigs, aa as State_ProjectInterface, $ as $t, e as createVNode, r as resolveComponent } from "./index.js";
import { o as openDialogInterfaceStatusModify, a as openDialogInterfaceProxyModify } from "./DialogModifyInterface.Helper.js";
import "./TuiEditor.js";
const InterfaceAll = defineComponent({
  setup() {
    const {
      filterParams,
      configs_interfaceTable,
      fnUpdateListForShow
    } = useInterfaceTableConfigs(true);
    return {
      State_Project: State_ProjectInterface,
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
  watch: {
    "State_Project.allInterface": {
      immediate: true,
      handler() {
        this.fnUpdateListForShow();
      }
    },
    filterParams: {
      deep: true,
      handler() {
        this.State_Project.isLoading = true;
        this.configs_interfaceTable.selected = [];
        this.fnUpdateListForShow();
      }
    }
  },
  methods: {},
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
      }, null), createVNode(resolveComponent("xButton"), {
        "class": "mr4"
      }, {
        default: () => [vm.$t("\u6DFB\u52A0Tag").label]
      }), createVNode(resolveComponent("xButton"), {
        "class": "mr4"
      }, {
        default: () => [vm.$t("\u79FB\u9664Tag").label]
      })]), createVNode("div", {
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
  InterfaceAll
};
