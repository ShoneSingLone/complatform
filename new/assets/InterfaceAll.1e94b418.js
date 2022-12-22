import { d as defineComponent, z as useInterfaceTableConfigs, j as State_Project, e as createVNode, r as resolveComponent } from "./index.9a01e62e.js";
const InterfaceAll = defineComponent({
  setup() {
    const {
      filterParams,
      configs_interfaceTable,
      fnUpdateListForShow
    } = useInterfaceTableConfigs(true);
    return {
      State_Project,
      filterParams,
      configs_interfaceTable,
      fnUpdateListForShow
    };
  },
  computed: {},
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
  data() {
    return {};
  },
  render() {
    const vm = this;
    return createVNode(resolveComponent("xView"), {
      "class": "Interface-view"
    }, {
      default: () => [createVNode("div", {
        "class": "Operation mb10"
      }, [createVNode(resolveComponent("xButton"), null, {
        default: () => [vm.$t("\u53D8\u66F4\u72B6\u6001").label]
      }), createVNode(resolveComponent("xButton"), null, {
        default: () => [vm.$t("\u6DFB\u52A0Tag").label]
      }), createVNode(resolveComponent("xButton"), null, {
        default: () => [vm.$t("\u4EE3\u7406\u53D8\u66F4").label]
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
//# sourceMappingURL=InterfaceAll.1e94b418.js.map
