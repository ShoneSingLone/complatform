import { d as defineComponent, z as useInterfaceTableConfigs, j as State_Project, C as Cpt_url, e as createVNode, r as resolveComponent, h as createTextVNode } from "./index.9a01e62e.js";
const InterfaceCategory = defineComponent({
  setup() {
    const {
      filterParams,
      configs_interfaceTable,
      fnUpdateListForShow
    } = useInterfaceTableConfigs();
    return {
      State_Project,
      Cpt_url,
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
  render() {
    return createVNode(resolveComponent("xView"), {
      "class": "Interface-view"
    }, {
      default: () => [createVNode("div", {
        "class": "Operation mb10"
      }, [createVNode(resolveComponent("aCard"), null, {
        default: () => [createVNode(resolveComponent("aButton"), null, {
          default: () => [createTextVNode("this.Cpt")]
        }), this.configs_interfaceTable.selected]
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
  InterfaceCategory
};
//# sourceMappingURL=InterfaceCategory.fa1c65d3.js.map
