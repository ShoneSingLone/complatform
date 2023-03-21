import { d as defineComponent, g as _State_App, a as defItem, F as FormRules, s as setValueTo, v as validateForm, A as AllWasWell, p as pickValueFrom, k as Methods_ProjectInterface, U as UI, b as API, e as createVNode, r as resolveComponent, x as xU, m as Fragment, j as isVNode, I as ITEM_OPTIONS, n as State_ProjectInterface, q as markRaw, C as Cpt_url, t as ALL, $, D as DefaultInterfaceMenu, u as _$arrayChangeIndex, y as withDirectives, z as resolveDirective, B as compositionAPI } from "./index.js";
function _isSlot$1(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const DialogUpsertCategory = defineComponent({
  props: {
    propDialogOptions: {
      type: Object,
      default() {
        return {
          __elId: false
        };
      }
    }
  },
  setup() {
    return {
      State_App: _State_App
    };
  },
  data() {
    return {
      dataXItem: {
        ...defItem({
          value: "",
          prop: "name",
          label: "\u5206\u7C7B\u540D",
          placeholder: "\u5206\u7C7B\u540D\u79F0",
          rules: [FormRules.required("\u8BF7\u8F93\u5165\u5206\u7C7B\u540D\u79F0!")]
        }),
        ...defItem({
          value: "",
          prop: "desc",
          label: "\u5907\u6CE8",
          isTextarea: true,
          showCount: true,
          maxlength: 144
        })
      }
    };
  },
  mounted() {
    this.propDialogOptions.vm = this;
    this.initForm();
  },
  computed: {
    category() {
      if (this.propDialogOptions.category) {
        return this.propDialogOptions.category;
      } else {
        return false;
      }
    }
  },
  methods: {
    initForm() {
      if (this.category) {
        setValueTo(this.dataXItem, this.category);
      }
    },
    async onOk() {
      const validateResults = await validateForm(this.dataXItem);
      if (AllWasWell(validateResults)) {
        const {
          name,
          desc
        } = pickValueFrom(this.dataXItem);
        const project_id = this.State_App.currProject._id;
        try {
          if (this.category) {
            await this.updateOldCategory({
              name,
              desc,
              project_id
            });
          } else {
            await this.insertNewCategory({
              name,
              desc,
              project_id
            });
          }
          Methods_ProjectInterface.updateInterfaceMenuList();
          this.propDialogOptions.closeDialog();
        } catch (error) {
          if (this.category) {
            UI.message.error(this.$t("\u4FEE\u6539_\u5931\u8D25", {
              title: "\u5206\u7C7B"
            }).label);
          } else {
            UI.message.error(this.$t("\u6DFB\u52A0_\u5931\u8D25", {
              title: "\u5206\u7C7B"
            }).label);
          }
        }
      }
    },
    async insertNewCategory({
      name,
      desc,
      project_id
    }) {
      const res = await API.project.addInterfaceCategory({
        project_id,
        name,
        desc
      });
      if (res) {
        UI.message.success(this.$t("\u6DFB\u52A0_\u6210\u529F", {
          title: "\u5206\u7C7B"
        }).label);
      } else {
        throw new Error("");
      }
    },
    async updateOldCategory({
      name,
      desc,
      project_id
    }) {
      const res = await API.project.updateInterfaceCategory({
        project_id,
        catid: this.category._id,
        name,
        desc
      });
      if (res) {
        UI.message.success(this.$t("\u4FEE\u6539_\u6210\u529F", {
          title: "\u5206\u7C7B"
        }).label);
      } else {
        throw new Error("");
      }
    }
  },
  render() {
    let _slot;
    return createVNode(Fragment, null, [createVNode("div", {
      "class": "g-row flex1 height100 "
    }, [createVNode(resolveComponent("xGap"), {
      "t": "10"
    }, null), createVNode(resolveComponent("xForm"), {
      "class": "flex vertical",
      "labelStyle": {
        "min-width": "120px",
        width: "unset"
      }
    }, _isSlot$1(_slot = xU.map(this.dataXItem, (configs, prop) => {
      return createVNode(Fragment, null, [createVNode(resolveComponent("xGap"), {
        "t": "10"
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": configs
      }, null)]);
    })) ? _slot : {
      default: () => [_slot]
    }), createVNode(resolveComponent("xGap"), {
      "b": "38"
    }, null)]), createVNode(resolveComponent("xDialogFooter"), {
      "configs": {
        onCancel: this.propDialogOptions.closeDialog,
        onOk: this.onOk
      }
    }, null)]);
  }
});
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const DialogAddInterface = defineComponent({
  props: {
    propDialogOptions: {
      type: Object,
      default() {
        return {
          __elId: false
        };
      }
    }
  },
  setup() {
    return {
      State_App: _State_App
    };
  },
  data() {
    const vm = this;
    return {
      ...defItem({
        value: "",
        itemType: "Select",
        prop: "apiMethod",
        options: ITEM_OPTIONS.httpMethod,
        rules: [FormRules.required()],
        once() {
          this.value = xU.first(this.options).value;
        },
        style: {
          width: "120px"
        }
      }),
      dataXItem: {
        ...defItem({
          value: "",
          itemType: "Select",
          prop: "catid",
          label: vm.$t("\u63A5\u53E3\u5206\u7C7B").label,
          placeholder: "\u5206\u7C7B\u540D\u79F0",
          options: [],
          rules: [FormRules.required()],
          once() {
            this.options = State_ProjectInterface.allCategory;
            if (vm.propDialogOptions.categoryId) {
              this.value = vm.propDialogOptions.categoryId;
            } else {
              this.value = xU.first(this.options).value;
            }
          }
        }),
        ...defItem({
          value: "",
          prop: "title",
          label: vm.$t("\u63A5\u53E3\u540D\u79F0").label,
          placeholder: vm.$t("\u63A5\u53E3\u540D\u79F0").label,
          rules: [FormRules.required(), FormRules.nameLength({
            label: vm.$t("\u63A5\u53E3").label
          })]
        }),
        ...defItem({
          value: "/",
          prop: "path",
          label: vm.$t("\u63A5\u53E3\u8DEF\u5F84").label,
          placeholder: "/path",
          rules: [FormRules.required(), FormRules.apiPath()],
          once() {
            const vDomApiMethodsSelector = createVNode(resolveComponent("xItem"), {
              "configs": vm.apiMethod
            }, null);
            this.slots = markRaw({
              addonBefore: () => vDomApiMethodsSelector
            });
          }
        })
      }
    };
  },
  mounted() {
    this.propDialogOptions.vm = this;
  },
  methods: {
    async onOk() {
      const validateResults = await validateForm(this.dataXItem);
      if (AllWasWell(validateResults)) {
        const {
          catid,
          title,
          path
        } = pickValueFrom(this.dataXItem);
        const {
          projectId,
          closeDialog
        } = this.propDialogOptions;
        try {
          const {
            data
          } = await API.project.addInterface({
            project_id: projectId,
            catid,
            title,
            path,
            method: this.apiMethod.value
          });
          if (data) {
            Methods_ProjectInterface.updateInterfaceMenuList();
            Cpt_url.value.go("/project/interface/detail", {
              ...Cpt_url.value.query,
              interface_id: data._id
            });
            UI.message.success("\u6DFB\u52A0\u63A5\u53E3\u6210\u529F");
            closeDialog();
          }
        } catch (error) {
          UI.message.error("\u6DFB\u52A0\u5931\u8D25");
        }
      }
    }
  },
  render() {
    let _slot;
    return createVNode(Fragment, null, [createVNode("div", {
      "class": "g-row flex1 height100"
    }, [createVNode(resolveComponent("xGap"), {
      "t": "10"
    }, null), createVNode(resolveComponent("aAlert"), {
      "message": this.$t("\u6CE8\uFF1A \u8BE6\u7EC6\u7684\u63A5\u53E3\u6570\u636E\u53EF\u4EE5\u5728\u7F16\u8F91\u9875\u9762\u4E2D\u6DFB\u52A0").label,
      "type": "info",
      "closable": true,
      "className": "width100"
    }, null), createVNode(resolveComponent("xForm"), {
      "class": "flex vertical",
      "labelStyle": {
        "min-width": "120px",
        width: "unset"
      }
    }, _isSlot(_slot = xU.map(this.dataXItem, (configs, prop) => {
      return createVNode(Fragment, null, [createVNode(resolveComponent("xGap"), {
        "t": "10"
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": configs
      }, null)]);
    })) ? _slot : {
      default: () => [_slot]
    }), createVNode(resolveComponent("xGap"), {
      "t": "10"
    }, null)]), createVNode(resolveComponent("xDialogFooter"), {
      "configs": {
        onCancel: this.propDialogOptions.closeDialog,
        onOk: this.onOk
      }
    }, null)]);
  }
});
const {
  usefnObserveDomResize
} = compositionAPI;
const ProjectInterfaceLeftSider = defineComponent({
  setup() {
    const {
      fnObserveDomResize,
      fnUnobserveDomResize
    } = usefnObserveDomResize();
    return {
      State_App: _State_App,
      State_Project: State_ProjectInterface,
      Cpt_url,
      fnObserveDomResize,
      fnUnobserveDomResize
    };
  },
  watch: {
    filterText(text) {
      this.State_Project.isLoading = true;
      this.setFilterText(text);
    }
  },
  data(vm) {
    return {
      configsResize: {
        onMoving({
          clickEvent,
          movingEvent,
          clickInfo
        }) {
          const {
            left: leftStart
          } = clickInfo;
          let left = 16 + leftStart + movingEvent.clientX - clickEvent.clientX;
          if (left < 100) {
            left = 100;
          }
          vm.styleAside.width = `${left}px`;
        }
      },
      styleAside: {
        width: "300px",
        position: "relative"
      },
      filterText: "",
      selectedKeys: [ALL],
      siderHeight: 500,
      configs: {
        fieldNames: {
          children: "list",
          key: "_id"
        }
      }
    };
  },
  mounted() {
    this.fnObserveDomResize(this.$refs.wrapper, () => {
      const siderHeight = Math.floor($(this.$refs.wrapper).height()) - 20;
      this.setSiderHeight(siderHeight);
    });
    Methods_ProjectInterface.updateInterfaceMenuList();
    Methods_ProjectInterface.setExpand();
  },
  beforeUnmount() {
    this.fnUnobserveDomResize(this.$refs.wrapper);
  },
  computed: {
    currentSelectedMenu() {
      const {
        pathname,
        query
      } = this.Cpt_url;
      const StrategyMap = {
        "/project/interface/all": ALL,
        "/project/interface/category": query.category_id,
        "/project/interface/detail": query.interface_id
      };
      return StrategyMap[pathname];
    },
    treeData() {
      return DefaultInterfaceMenu.concat(this.State_Project.allCategory);
    },
    vDomTree() {
      const vm = this;
      return createVNode("div", {
        "class": "elevation-2 height100 padding10",
        "style": "border-radius: 8px;"
      }, [createVNode(resolveComponent("aTree"), {
        "expandedKeys": vm.State_Project.expandedKeys,
        "onUpdate:expandedKeys": ($event) => vm.State_Project.expandedKeys = $event,
        "height": vm.siderHeight,
        "treeData": vm.treeData,
        "draggable": true,
        "onDrop": vm.handleDropInterface,
        "fieldNames": vm.configs.fieldNames
      }, {
        title(item) {
          const {
            title,
            _id,
            list,
            menuType,
            categoryId
          } = item;
          const classContentString = (() => {
            let _classString = "flex middle x-sider-tree_menu";
            if (String(_id) == String(vm.currentSelectedMenu)) {
              return _classString + " x-sider-tree_menu_active";
            }
            return _classString;
          })();
          const handleClickMenuItem = () => {
            if (menuType === ALL) {
              Cpt_url.value.go("/project/interface/all", xU.omit(Cpt_url.value.query, ["category_id", "interface_id"]));
            } else if (menuType === "category") {
              Cpt_url.value.go("/project/interface/category", {
                ...Cpt_url.value.query,
                category_id: _id
              });
            } else {
              Cpt_url.value.go("/project/interface/detail", {
                ...Cpt_url.value.query,
                category_id: categoryId,
                interface_id: _id
              });
            }
            vm.setSelectedKeys(_id);
          };
          const genIcon = ({
            icon,
            tips,
            clickHandler
          }) => {
            return createVNode(Fragment, null, [withDirectives(createVNode(resolveComponent("xIcon"), {
              "icon": icon,
              "class": "x-sider-tree_menu_icon",
              "onClick": clickHandler
            }, null), [[resolveDirective("uiPopover"), {
              content: tips,
              delay: 1e3
            }]]), createVNode(resolveComponent("xGap"), {
              "l": "8"
            }, null)]);
          };
          if (menuType === ALL) {
            return createVNode("div", {
              "data-interface-all-menu": true,
              "class": classContentString,
              "onClick": handleClickMenuItem
            }, [createVNode(resolveComponent("xGap"), {
              "l": "10"
            }, null), createVNode(resolveComponent("xIcon"), {
              "icon": "allCategory"
            }, null), createVNode("span", {
              "class": "x-sider-tree_menu_title"
            }, [title]), createVNode("div", {
              "class": "flex middle x-sider-tree_menu_opration"
            }, [genIcon({
              icon: "add",
              tips: vm.$t("\u6DFB\u52A0\u5206\u7C7B").label,
              clickHandler: () => vm.showUpsertCategoryDialog()
            }), genIcon({
              icon: "refresh",
              tips: vm.$t("\u5237\u65B0").label,
              clickHandler: Methods_ProjectInterface.updateInterfaceMenuList
            })])]);
          }
          if (xU.isArray(list))
            ;
          const vDomOpration = (() => {
            if (menuType === "category") {
              return createVNode("div", {
                "class": "flex middle x-sider-tree_menu_opration"
              }, [genIcon({
                icon: "add",
                tips: vm.$t("\u6DFB\u52A0\u63A5\u53E3").label,
                clickHandler: ($event) => vm.showAddInterfaceDialog(_id, $event)
              }), genIcon({
                icon: "edit",
                tips: vm.$t("\u4FEE\u6539\u5206\u7C7B").label,
                clickHandler: ($event) => vm.showUpsertCategoryDialog(item)
              }), genIcon({
                icon: "delete",
                tips: vm.$t("\u5220\u9664\u5206\u7C7B").label,
                clickHandler: ($event) => vm.deleteCategory(_id, $event)
              })]);
            } else {
              return createVNode("div", {
                "class": "flex middle x-sider-tree_menu_opration"
              }, [genIcon({
                icon: "delete",
                tips: vm.$t("\u5220\u9664\u63A5\u53E3").label,
                clickHandler: ($event) => vm.deleteInterface(_id, $event)
              })]);
            }
          })();
          let iconName = "subCategoryInterface";
          if (menuType === "category") {
            iconName = "subCategory";
          }
          return createVNode("div", {
            "class": classContentString,
            "onClick": handleClickMenuItem
          }, [createVNode(resolveComponent("xGap"), {
            "l": "10"
          }, null), createVNode(resolveComponent("xIcon"), {
            "icon": iconName
          }, null), createVNode("span", {
            "class": "x-sider-tree_menu_title"
          }, [title]), vDomOpration]);
        }
      })]);
    }
  },
  methods: {
    async handleDropInterface(e) {
      this.State_Project.isLoading = true;
      const dragItem = e.dragNode;
      const dropItem = e.node;
      const isDragInterface = dragItem.menuType === "interface";
      const isDropSameCategory = dragItem.categoryId === dropItem.categoryId;
      const params = {
        dragItem,
        dropItem
      };
      try {
        if (isDragInterface) {
          if (isDropSameCategory) {
            await this.switchSameCategoryInterfaceOrder(params);
          } else {
            await this.switchDiffCategoryInterfaceOrder(params);
          }
        } else {
          await this.switchCategoryOrder(params);
        }
        Methods_ProjectInterface.updateInterfaceMenuList();
      } catch (error) {
        UI.message.error(error.message);
      } finally {
        setTimeout(() => {
          this.State_Project.isLoading = false;
        }, 400);
      }
    },
    async switchSameCategoryInterfaceOrder({
      dragItem,
      dropItem
    }) {
      const category = xU.find(this.State_Project.allCategory, {
        _id: dragItem.categoryId
      });
      const paramsChanges = _$arrayChangeIndex(category.list, dragItem._id, dropItem._id);
      await API.project.switchManyInterfaceOrder(paramsChanges);
    },
    async switchDiffCategoryInterfaceOrder({
      dragItem,
      dropItem
    }) {
      await API.project.updateInterface({
        id: dragItem._id,
        catid: dropItem.categoryId
      });
    },
    async switchCategoryOrder({
      dragItem,
      dropItem
    }) {
      const paramsChanges = _$arrayChangeIndex(this.State_Project.allCategory, dragItem._id, dropItem._id);
      await API.project.switchManyCategoryOrder(paramsChanges);
    },
    setFilterText: xU.debounce(function(filterText) {
      this.State_Project.filterText = filterText;
      this.State_Project.isLoading = false;
    }, 600),
    setSelectedKeys(id) {
      this.selectedKeys = [id];
    },
    setSiderHeight: xU.debounce(function(siderHeight) {
      this.siderHeight = siderHeight;
    }, 20),
    deleteInterface(id) {
      const vm = this;
      UI.confirm({
        title: vm.$t("\u60A8\u786E\u8BA4\u5220\u9664\u6B64\u63A5\u53E3\uFF1F").label,
        content: vm.$t(`\u6E29\u99A8\u63D0\u793A\uFF1A\u63A5\u53E3\u5220\u9664\u540E\uFF0C\u65E0\u6CD5\u6062\u590D`).label,
        async onOk() {
          try {
            await API.project.deleteInterfaceById(id);
            UI.message.success(vm.$t("\u5220\u9664\u63A5\u53E3\u6210\u529F").label);
            Methods_ProjectInterface.updateInterfaceMenuList();
            vm.Cpt_url.go("/project/interface/all", xU.omit(vm.Cpt_url.query, ["category_id", "interface_id"]));
          } catch (error) {
            UI.message.error(error.message);
          }
        }
      });
    },
    deleteCategory(id) {
      const vm = this;
      UI.dialog.confirm({
        title: "\u786E\u5B9A\u5220\u9664\u6B64\u63A5\u53E3\u5206\u7C7B\u5417\uFF1F",
        content: `\u6E29\u99A8\u63D0\u793A\uFF1A\u8BE5\u64CD\u4F5C\u4F1A\u5220\u9664\u8BE5\u5206\u7C7B\u4E0B\u6240\u6709\u63A5\u53E3\uFF0C\u63A5\u53E3\u5220\u9664\u540E\u65E0\u6CD5\u6062\u590D`,
        async onOk() {
          try {
            await API.project.deleteCategoryById(id);
            UI.message.success("\u5220\u9664\u5206\u7C7B\u6210\u529F");
            Methods_ProjectInterface.updateInterfaceMenuList();
            vm.Cpt_url.go("/project/interface/all", xU.omit(vm.Cpt_url.query, ["category_id"]));
          } catch (error) {
            UI.message.error(error.message);
            return Promise.reject();
          }
        }
      });
    },
    showUpsertCategoryDialog(category = false) {
      UI.dialog.component({
        title: category ? this.$t("\u4FEE\u6539\u5206\u7C7B").label : this.$t("\u6DFB\u52A0\u5206\u7C7B").label,
        component: DialogUpsertCategory,
        category
      });
    },
    showAddInterfaceDialog(categoryId, $event) {
      $event.stopPropagation();
      $event.preventDefault();
      UI.dialog.component({
        title: this.$t("\u6DFB\u52A0\u63A5\u53E3").label,
        categoryId,
        projectId: this.State_App.currProject._id,
        component: DialogAddInterface
      });
    }
  },
  render() {
    return createVNode("aside", {
      "class": "ViewProject-sider_wrapper flex vertical move-transition padding10",
      "style": this.styleAside
    }, [createVNode("div", {
      "class": "ViewProjectInterface_tree flex1 mt10 mb10",
      "ref": "wrapper"
    }, [this.vDomTree]), withDirectives(createVNode("div", {
      "class": "resize_bar",
      "icon": "scroll"
    }, null), [[resolveDirective("uiMove"), this.configsResize]])]);
  }
});
const ProjectInterface = defineComponent({
  components: {
    ProjectInterfaceLeftSider
  },
  setup() {
    return {
      State_App: _State_App,
      State_Project: State_ProjectInterface,
      Cpt_url
    };
  },
  data() {
    return {
      state: {}
    };
  },
  created() {
    Methods_ProjectInterface.resetURL();
  },
  methods: {},
  render() {
    return withDirectives(createVNode("section", {
      "id": "ViewProjectInterface"
    }, [createVNode(ProjectInterfaceLeftSider, null, null), createVNode("main", {
      "class": "flex flex1 padding10",
      "style": "width:1px;"
    }, [createVNode(resolveComponent("RouterView"), {
      "class": "flex flex1 width100 height100 vertical padding10"
    }, null)])]), [[resolveDirective("loading"), this.State_Project.isLoading]]);
  }
});
export {
  ProjectInterface
};
