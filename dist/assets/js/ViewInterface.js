import { d as defineComponent, s as stateApp, b as defItem, i as itemsInvalid, aj as stateInterface, f as xU, x as xI, e as API, h as createVNode, r as resolveComponent, F as Fragment, j as isVNode, T as markRaw, a as cptRouter, aO as INTERFACE, aP as _$arrayChangeIndex, o as xScope, at as onMounted, aQ as ALL, w as withDirectives, l as resolveDirective, aR as cpt_treeData, aS as CATEGORY, aT as PREVIEW, aU as ref, v as createTextVNode, R as defineComponentProps, S as usePrivateItemValue, U as itemBaseProps, a1 as defDataGrid, aF as computed, p as watch, M as aHashLink, _ as _$handlePath, a7 as HTTP_METHOD, W as defCol, $, aV as copyToClipboard, al as getAvatarSrcByid, a2 as MonacoEditor, aW as makeAhref, ae as lStorage, aX as provide, aY as EDIT, aZ as RUN } from "./index.js";
import { F as FormRules, s as setValueTo, p as pickValueFrom } from "./common.FormRules.js";
import { I as ITEM_OPTIONS, a as ITEM_OPTIONS_VDOM } from "./common.options.js";
import { o as orderAsc, R as RequestArgsPanel, T as TuiEditor, g as ResponsePanel, h as DialogUpsertProxyEnv, i as colParamsName, j as colRemark, k as colRequired, m as colValue, n as colExample, p as colType, J as JsonSchemaMonaco } from "./TuiEditor.js";
import { V as VNodeCollection } from "./VNodeRender.js";
function _isSlot$5(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const DialogUpsertCategory = defineComponent({
  props: {
    propOptions: {
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
      stateApp
    };
  },
  data() {
    return {
      dataXItem: {
        name: defItem({
          value: "",
          label: "\u5206\u7C7B\u540D",
          placeholder: "\u5206\u7C7B\u540D\u79F0",
          rules: [FormRules.required("\u8BF7\u8F93\u5165\u5206\u7C7B\u540D\u79F0!")]
        }),
        desc: defItem({
          value: "",
          label: "\u5907\u6CE8",
          isTextarea: true,
          showCount: true,
          maxlength: 144
        })
      }
    };
  },
  mounted() {
    this.initForm();
  },
  computed: {
    category() {
      if (this.propOptions.payload.category) {
        return this.propOptions.payload.category;
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
      if (!await itemsInvalid()) {
        const {
          name,
          desc
        } = pickValueFrom(this.dataXItem);
        const project_id = this.stateApp.currProject._id;
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
          stateInterface._updateInterfaceMenuList();
          this.propOptions.$close();
        } catch (error) {
          if (this.category) {
            xU.message.error(xI("\u4FEE\u6539_\u5931\u8D25", {
              title: "\u5206\u7C7B"
            }));
          } else {
            xU.message.error(xI("\u6DFB\u52A0_\u5931\u8D25", {
              title: "\u5206\u7C7B"
            }));
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
        xU.message.success(xI("\u6DFB\u52A0_\u6210\u529F", {
          title: "\u5206\u7C7B"
        }));
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
        xU.message.success(xI("\u4FEE\u6539_\u6210\u529F", {
          title: "\u5206\u7C7B"
        }));
      } else {
        throw new Error("");
      }
    }
  },
  render() {
    let _slot;
    return createVNode(Fragment, null, [createVNode("div", {
      "class": "x-dialog-boddy-wrapper"
    }, [createVNode(resolveComponent("xForm"), {
      "class": "flex vertical",
      "labelStyle": {
        "min-width": "120px",
        width: "unset"
      }
    }, _isSlot$5(_slot = xU.map(this.dataXItem, (configs, prop) => {
      return createVNode(Fragment, null, [createVNode(resolveComponent("xGap"), {
        "t": true
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": configs
      }, null)]);
    })) ? _slot : {
      default: () => [_slot]
    })]), createVNode(resolveComponent("xDialogFooter"), {
      "configs": {
        onCancel: this.propOptions.$close,
        onOk: this.onOk
      }
    }, null)]);
  }
});
const DialogAddInterface = defineComponent({
  props: {
    propOptions: {
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
      stateApp
    };
  },
  data() {
    const vm = this;
    return {
      apiMethod: defItem({
        value: "",
        itemType: "Select",
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
        catid: defItem({
          value: "",
          itemType: "Select",
          label: xI("\u63A5\u53E3\u5206\u7C7B"),
          placeholder: "\u5206\u7C7B\u540D\u79F0",
          options: [],
          rules: [FormRules.required()],
          once() {
            this.options = stateInterface.allCategory;
            if (vm.propOptions.payload.categoryId) {
              this.value = vm.propOptions.payload.categoryId;
            } else {
              this.value = xU.first(this.options).value;
            }
          }
        }),
        title: defItem({
          value: "",
          label: xI("\u63A5\u53E3\u540D\u79F0"),
          placeholder: xI("\u63A5\u53E3\u540D\u79F0"),
          rules: [FormRules.required(), FormRules.nameLength({
            label: xI("\u63A5\u53E3")
          })]
        }),
        path: defItem({
          value: "/",
          label: xI("\u63A5\u53E3\u8DEF\u5F84"),
          placeholder: "/path",
          rules: [FormRules.required(), FormRules.apiPath()],
          once() {
            const vDomApiMethodsSelector = createVNode(resolveComponent("xItem"), {
              "configs": vm.apiMethod
            }, null);
            this.slots = markRaw({
              prepend: () => vDomApiMethodsSelector
            });
          }
        })
      }
    };
  },
  mounted() {
    this.propOptions.vm = this;
  },
  methods: {
    async onOk() {
      if (!await itemsInvalid()) {
        const {
          catid,
          title,
          path
        } = pickValueFrom(this.dataXItem);
        const {
          payload,
          $close
        } = this.propOptions;
        try {
          const {
            data
          } = await API.project.addInterface({
            project_id: payload.projectId,
            catid,
            title,
            path,
            method: this.apiMethod.value
          });
          if (data) {
            stateInterface._updateInterfaceMenuList();
            cptRouter.value.query.interface_type = INTERFACE;
            cptRouter.value.query.category_id = payload.categoryId;
            cptRouter.value.query.interface_id = data._id;
            stateInterface._setExpand();
            xU.message.success("\u6DFB\u52A0\u63A5\u53E3\u6210\u529F");
            $close();
          }
        } catch (error) {
          xU.message.error("\u6DFB\u52A0\u5931\u8D25");
        }
      }
    }
  },
  render() {
    return createVNode(Fragment, null, [createVNode("div", {
      "class": "x-dialog-boddy-wrapper"
    }, [createVNode(resolveComponent("elAlert"), {
      "title": xI("\u6CE8\uFF1A \u8BE6\u7EC6\u7684\u63A5\u53E3\u6570\u636E\u53EF\u4EE5\u5728\u7F16\u8F91\u9875\u9762\u4E2D\u6DFB\u52A0"),
      "type": "info",
      "closable": true,
      "class": "width100"
    }, null), createVNode(resolveComponent("xForm"), {
      "class": "flex vertical",
      "labelStyle": {
        "min-width": "120px",
        width: "unset"
      }
    }, {
      default: () => [xU.map(this.dataXItem, (configs, prop) => {
        return createVNode(Fragment, null, [createVNode(resolveComponent("xGap"), {
          "t": true
        }, null), createVNode(resolveComponent("xItem"), {
          "configs": configs
        }, null)]);
      }), createVNode(resolveComponent("xGap"), {
        "t": true
      }, null)]
    }), createVNode(resolveComponent("xGap"), {
      "t": true
    }, null)]), createVNode(resolveComponent("xDialogFooter"), {
      "configs": {
        onCancel: this.propOptions.$close,
        onOk: this.onOk
      }
    }, null)]);
  }
});
const InterfaceAside = defineComponent({
  setup() {
    var vm = {
      styleAside: {
        width: "300px",
        position: "relative"
      },
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
      filterText: "",
      btnAddNew: {
        onClick() {
        }
      },
      siderHeight: 500,
      _showAddInterfaceDialog(categoryId, $event) {
        $event.stopPropagation();
        $event.preventDefault();
        xU.dialog({
          component: DialogAddInterface,
          title: xI("\u6DFB\u52A0\u63A5\u53E3"),
          payload: {
            categoryId,
            projectId: cptRouter.value.query.project_id
          }
        });
      },
      _deleteInterface(id) {
        xU.confirm({
          title: xI("\u60A8\u786E\u8BA4\u5220\u9664\u6B64\u63A5\u53E3\uFF1F"),
          content: xI(`\u6E29\u99A8\u63D0\u793A\uFF1A\u63A5\u53E3\u5220\u9664\u540E\uFF0C\u65E0\u6CD5\u6062\u590D`),
          async onOk() {
            try {
              await API.project.deleteInterfaceById(id);
              xU.message.success(xI("\u5220\u9664\u63A5\u53E3\u6210\u529F"));
              stateInterface._updateInterfaceMenuList();
            } catch (error) {
              xU.message.error(error.message);
            }
          }
        });
      },
      _deleteCategory(id) {
        xU.confirm({
          title: "\u786E\u5B9A\u5220\u9664\u6B64\u63A5\u53E3\u5206\u7C7B\u5417\uFF1F",
          content: `\u6E29\u99A8\u63D0\u793A\uFF1A\u8BE5\u64CD\u4F5C\u4F1A\u5220\u9664\u8BE5\u5206\u7C7B\u4E0B\u6240\u6709\u63A5\u53E3\uFF0C\u63A5\u53E3\u5220\u9664\u540E\u65E0\u6CD5\u6062\u590D`,
          async onOk() {
            try {
              await API.project.deleteCategoryById(id);
              xU.message.success("\u5220\u9664\u5206\u7C7B\u6210\u529F");
              stateInterface._updateInterfaceMenuList();
            } catch (error) {
              xU.message.error(error.message);
              return Promise.reject();
            }
          }
        });
      },
      _showUpsertCategoryDialog({
        category
      } = {}) {
        xU.dialog({
          title: category ? xI("\u4FEE\u6539\u5206\u7C7B") : xI("\u6DFB\u52A0\u5206\u7C7B"),
          component: DialogUpsertCategory,
          payload: {
            category
          }
        });
      },
      async _switchSameCategoryInterfaceOrder({
        dragItem,
        dropItem
      }) {
        const category = xU.find(stateInterface.allCategory, {
          _id: dragItem.categoryId
        });
        const paramsChanges = _$arrayChangeIndex(category.list, dragItem._id, dropItem._id);
        await API.project.switchManyInterfaceOrder(paramsChanges);
      },
      _setFilterText: xU.debounce(function(filterText) {
        vm.filterText = filterText;
        stateInterface.isLoading = false;
      }, 600),
      async _switchDiffCategoryInterfaceOrder({
        dragItem,
        dropItem
      }) {
        await API.project.updateInterface({
          id: dragItem._id,
          catid: dropItem.categoryId
        });
      },
      async _switchCategoryOrder({
        dragItem,
        dropItem
      }) {
        const paramsChanges = _$arrayChangeIndex(State_Project.allCategory, dragItem._id, dropItem._id);
        await API.project.switchManyCategoryOrder(paramsChanges);
      },
      async _handleDropInterface(draggingNode, dropNode, dropType) {
        const dragItem = draggingNode.data;
        const dropItem = dropNode.data;
        const isDragInterface = dragItem.menuType === INTERFACE;
        const isDropSameCategory = dragItem.categoryId === dropItem.categoryId;
        const params = {
          dragItem,
          dropItem
        };
        try {
          if (isDragInterface) {
            if (isDropSameCategory) {
              await vm._switchSameCategoryInterfaceOrder(params);
            } else {
              await vm._switchDiffCategoryInterfaceOrder(params);
            }
          } else {
            await vm._switchCategoryOrder(params);
          }
          stateInterface._updateInterfaceMenuList();
        } catch (error) {
          xU.message.error(error.message);
        }
      }
    };
    vm = xScope(vm);
    onMounted(() => {
      if (!cptRouter.value.query.category_id) {
        cptRouter.value.query.category_id = ALL;
        cptRouter.value.query.interface_type = ALL;
      }
    });
    return function() {
      return createVNode("aside", {
        "class": "x-sider_wrapper",
        "style": vm.styleAside
      }, [createVNode("div", {
        "class": "x-sider_wrapper_tree",
        "ref": "wrapper"
      }, [withDirectives(createVNode("div", {
        "class": "left-tree box-shadow"
      }, [createVNode(resolveComponent("elScrollbar"), {
        "height": vm.siderHeight,
        "class": "flex1"
      }, {
        default: () => [createVNode(resolveComponent("elTree"), {
          "height": vm.siderHeight,
          "default-expand-all": true,
          "defaultExpandedKeys": stateInterface.expandedKeys,
          "data": cpt_treeData.value,
          "onNodeDragEnd": vm._handleDropInterface,
          "draggable": true,
          "node-key": "_id",
          "expand-on-click-node": false
        }, {
          default(item) {
            try {
              const {
                data
              } = item;
              const {
                title,
                _id,
                categoryId,
                menuType
              } = data;
              const classContentString = (() => {
                let _classString = "x-sider-tree_menu";
                if (menuType === INTERFACE && xU.isSame(_id, cptRouter.value.query.interface_id)) {
                  _classString += " x-sider-tree_menu_active";
                }
                if (menuType === CATEGORY && xU.isSame(categoryId, cptRouter.value.query.category_id)) {
                  _classString += " x-sider-tree_menu_active";
                }
                return _classString;
              })();
              const genIcon = ({
                icon,
                tips,
                clickHandler
              }) => {
                return createVNode(Fragment, null, [withDirectives(createVNode(resolveComponent("xIcon"), {
                  "icon": icon,
                  "class": "x-sider-tree_menu_icon",
                  "onClick": clickHandler
                }, null), [[resolveDirective("xTips"), {
                  content: tips,
                  delay: 1e3
                }]]), createVNode(resolveComponent("xGap"), {
                  "l": "8"
                }, null)]);
              };
              const handleClick = () => {
                cptRouter.value.query.interface_type = menuType;
                (() => {
                  if (menuType == ALL) {
                    cptRouter.value.query.interface_detail_type = void 0;
                    cptRouter.value.query.interface_id = void 0;
                    cptRouter.value.query.category_id = void 0;
                    return;
                  }
                  if (menuType == CATEGORY) {
                    cptRouter.value.query.interface_detail_type = void 0;
                    cptRouter.value.query.interface_id = void 0;
                    cptRouter.value.query.category_id = categoryId;
                    return;
                  }
                  if (menuType == INTERFACE) {
                    cptRouter.value.query.interface_detail_type = PREVIEW;
                    cptRouter.value.query.interface_id = _id;
                    cptRouter.value.query.category_id = categoryId;
                  }
                })();
              };
              if (menuType === ALL) {
                return createVNode("div", {
                  "data-interface-all-menu": true,
                  "class": classContentString
                }, [createVNode(resolveComponent("xGap"), {
                  "l": "10"
                }, null), createVNode(resolveComponent("xIcon"), {
                  "icon": "allCategory"
                }, null), createVNode("div", {
                  "onClick": handleClick,
                  "class": "x-sider-tree_menu_title"
                }, [title]), createVNode("div", {
                  "class": "x-sider-tree_menu_opration"
                }, [genIcon({
                  icon: "add",
                  tips: xI("\u6DFB\u52A0\u5206\u7C7B"),
                  clickHandler: () => vm._showUpsertCategoryDialog()
                }), genIcon({
                  icon: "refresh",
                  tips: xI("\u5237\u65B0"),
                  clickHandler: () => stateInterface._updateInterfaceMenuList()
                })])]);
              }
              const vDomOpration = (() => {
                if (menuType === "category") {
                  return createVNode("div", {
                    "class": "x-sider-tree_menu_opration"
                  }, [genIcon({
                    icon: "add",
                    tips: xI("\u6DFB\u52A0\u63A5\u53E3"),
                    clickHandler: ($event) => vm._showAddInterfaceDialog(categoryId, $event)
                  }), genIcon({
                    icon: "edit",
                    tips: xI("\u4FEE\u6539\u5206\u7C7B"),
                    clickHandler: ($event) => vm._showUpsertCategoryDialog({
                      category: data
                    })
                  }), genIcon({
                    icon: "delete",
                    tips: xI("\u5220\u9664\u5206\u7C7B"),
                    clickHandler: ($event) => vm._deleteCategory(_id, $event)
                  })]);
                } else {
                  return createVNode("div", {
                    "class": "x-sider-tree_menu_opration"
                  }, [genIcon({
                    icon: "delete",
                    tips: xI("\u5220\u9664\u63A5\u53E3"),
                    clickHandler: ($event) => vm._deleteInterface(_id, $event)
                  })]);
                }
              })();
              let iconName = "subCategoryInterface";
              if (menuType === "category") {
                iconName = "subCategory";
              }
              return createVNode("div", {
                "class": classContentString
              }, [createVNode("div", {
                "class": "x-sider-tree_menu_title",
                "onClick": handleClick
              }, [createVNode(resolveComponent("xGap"), {
                "l": "10"
              }, null), createVNode(resolveComponent("xIcon"), {
                "icon": iconName
              }, null), title]), createVNode("div", {
                "class": "x-sider-tree_menu_opration"
              }, [vDomOpration])]);
            } catch (error) {
              return null;
            }
          }
        })]
      })]), [[resolveDirective("element-size"), ({
        height
      }) => vm.siderHeight = height]])]), withDirectives(createVNode("div", {
        "class": "resize_bar",
        "icon": "scroll"
      }, null), [[resolveDirective("uiMove"), vm.configsResize]])]);
    };
  }
});
function _isSlot$4(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
function useColHeader({
  controller,
  onFilter,
  onReset,
  prop,
  title,
  style,
  width
}) {
  width = width || 300;
  const popoverRef = ref(null);
  return {
    vDom: createVNode(resolveComponent("el-popover"), {
      "ref": popoverRef,
      "trigger": "click",
      "width": width
    }, {
      default() {
        let _slot, _slot2;
        return createVNode("div", {
          "style": "max-height:500px;padding:14px;",
          "class": "flex vertical"
        }, [createVNode("div", {
          "class": "flex1 el-card",
          "style": "overflow:auto;padding:14px;"
        }, [controller]), createVNode("div", {
          "class": "flex middle end",
          "style": "padding-top:12px"
        }, [createVNode(resolveComponent("xButton"), {
          "onClick": () => onFilter({
            ref: popoverRef,
            prop
          })
        }, _isSlot$4(_slot = xI("\u786E\u8BA4")) ? _slot : {
          default: () => [_slot]
        }), createVNode(resolveComponent("xButton"), {
          "onClick": () => onReset({
            ref: popoverRef,
            prop
          })
        }, _isSlot$4(_slot2 = xI("\u91CD\u7F6E")) ? _slot2 : {
          default: () => [_slot2]
        })])]);
      },
      reference: () => createVNode("div", {
        "class": "flex middle center width100",
        "style": style
      }, [createVNode("span", {
        "class": "mr4"
      }, [title]), createVNode(resolveComponent("xIcon"), {
        "icon": "icon_filter"
      }, null)])
    })
  };
}
function genTag(name, desc, index) {
  return {
    nameConfigs: defItem({
      prop: "name" + index,
      placeholder: "tag\u540D\u79F0",
      value: name
    }),
    descConfigs: defItem({
      prop: "desc" + index,
      placeholder: "tag\u63CF\u8FF0\u4FE1\u606F",
      value: desc
    })
  };
}
const DialogUpsertTags = defineComponent({
  props: {
    propOptions: {
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
      stateApp
    };
  },
  data() {
    return {
      privateTags: {}
    };
  },
  watch: {
    formData() {
      this.checkFormDataDebounce();
    },
    "stateApp.currProject.tag": {
      immediate: true,
      handler(tags) {
        tags = xU.cloneDeep(tags);
        if (xU.isArrayFill(tags)) {
          let index = 0;
          this.privateTags = xU.reduce(tags, (tags2, tag) => {
            tags2[index] = genTag(tag.name, tag.desc, index);
            ++index;
            return tags2;
          }, {});
        } else {
          this.privateTags = {
            0: genTag("", "", 0)
          };
        }
      }
    }
  },
  computed: {
    propProjectId() {
      if (this.stateApp.currProject._id) {
        return this.stateApp.currProject._id;
      } else {
        alert("miss projectId");
      }
    },
    formData() {
      const formData = xU.reduce(this.privateTags, (formData2, privateTag, index) => {
        formData2[index] = {
          name: privateTag.nameConfigs.value,
          desc: privateTag.descConfigs.value
        };
        xU(formData2, privateTag, index);
        return formData2;
      }, {});
      return formData;
    }
  },
  methods: {
    checkFormDataDebounce: xU.debounce(function() {
      this.isFormDataOk();
    }, 1e3),
    isFormDataOk() {
      const res = xU.map(this.formData, ({
        name
      }, index) => {
        if (xU.some(this.formData, ({
          name: _name
        }, _index) => {
          if (_index == index) {
            return false;
          } else {
            return _name === name;
          }
        })) {
          this.privateTags[index].nameConfigs.itemTips = {
            type: "error",
            msg: `${name} \u4E0E\u5DF2\u6709\u6807\u8BC6\u91CD\u590D`
          };
          return FormRules.FAIL;
        } else {
          this.privateTags[index].nameConfigs.itemTips = {
            type: "",
            msg: ""
          };
          return FormRules.SUCCESS;
        }
      });
      return !xU.some(res, (i) => i === FormRules.FAIL);
    },
    deleteTag(index) {
      const keys = Object.keys(this.privateTags);
      if (keys.length === 1) {
        this.privateTags = {
          0: genTag("", "", 0)
        };
      } else {
        delete this.privateTags[index];
      }
    },
    addTag() {
      const keys = Object.keys(this.privateTags).map(Number).sort(orderAsc);
      const nextIndex = xU.last(keys) + 1;
      this.privateTags[nextIndex] = genTag("", "", nextIndex);
    },
    async onOk() {
      if (this.isFormDataOk()) {
        const data = {
          id: this.propProjectId,
          tag: xU.map(this.formData, (item) => item)
        };
        await API.project.updateTags(data);
        await stateApp._setCurrProject(this.propProjectId, {
          isEnforce: true
        });
        xU.message.success("Tag\u4FEE\u6539\u6210\u529F");
        this.propOptions.$close();
      }
    }
  },
  render() {
    return createVNode(Fragment, null, [createVNode("div", {
      "class": "flex1",
      "style": "max-height:500px;overflow:auto;padding:20px;"
    }, [xU.map(this.privateTags, (data, index) => {
      const {
        descConfigs,
        nameConfigs
      } = data || {};
      return createVNode("div", {
        "class": "flex baseline mt10 margin10 ",
        "key": index
      }, [createVNode(resolveComponent("xItem"), {
        "configs": nameConfigs
      }, null), createVNode(resolveComponent("xGap"), {
        "l": "10"
      }, null), createVNode("span", {
        "class": "flex middle"
      }, [createVNode(resolveComponent("xItem"), {
        "configs": descConfigs
      }, null), createVNode(resolveComponent("xGap"), {
        "l": "10"
      }, null), createVNode(resolveComponent("xButton"), {
        "onClick": () => this.deleteTag(index),
        "class": "flex middle"
      }, {
        default: () => [createVNode(resolveComponent("xIcon"), {
          "icon": "delete"
        }, null)]
      })])]);
    })]), createVNode(resolveComponent("xDialogFooter"), null, {
      default: () => [createVNode(resolveComponent("xButton"), {
        "onClick": this.addTag,
        "class": "flex middle"
      }, {
        default: () => [createVNode(resolveComponent("xIcon"), {
          "icon": "add"
        }, null), createTextVNode(" \u6DFB\u52A0\u65B0\u7684Tag")]
      }), createVNode(resolveComponent("xGap"), {
        "f": "1"
      }, null), createVNode(resolveComponent("xButton"), {
        "configs": {
          preset: "cancel",
          onClick: this.propOptions.$close
        }
      }, null), createVNode(resolveComponent("xButton"), {
        "configs": {
          preset: "save",
          onClick: this.onOk
        }
      }, null)]
    })]);
  }
});
function _isSlot$3(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const DialogInterfaceStatusModify = defineComponent({
  props: {
    propOptions: {
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
      stateApp
    };
  },
  data() {
    return {
      dataXItem: {
        status: defItem({
          label: xI("\u72B6\u6001"),
          value: ITEM_OPTIONS.interfaceStatus[0].value,
          options: ITEM_OPTIONS.interfaceStatus,
          itemType: "Select"
        })
      }
    };
  },
  mounted() {
    this.propOptions.vm = this;
    this.initForm();
  },
  computed: {
    category() {
      if (this.propOptions.category) {
        return this.propOptions.category;
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
      const {
        selected
      } = this.propOptions.payload;
      if (!await itemsInvalid()) {
        const {
          status
        } = pickValueFrom(this.dataXItem);
        try {
          await Promise.all(xU.map(selected, (id) => API.project.updateInterface({
            id,
            status
          })));
          stateInterface._updateInterfaceMenuList();
          this.propOptions.$close();
          xU.message.success(xI("\u4FEE\u6539_\u6210\u529F", {
            title: "\u72B6\u6001"
          }));
        } catch (error) {
          xU.message.error(xI("\u4FEE\u6539_\u5931\u8D25", {
            title: "\u72B6\u6001"
          }));
        }
      }
    }
  },
  render() {
    let _slot;
    return createVNode(Fragment, null, [createVNode("div", {
      "class": "x-dialog-boddy-wrapper "
    }, [createVNode(resolveComponent("xGap"), {
      "t": true
    }, null), createVNode(resolveComponent("xForm"), {
      "class": "flex vertical",
      "labelStyle": {
        "min-width": "120px",
        width: "unset"
      }
    }, _isSlot$3(_slot = xU.map(this.dataXItem, (configs, prop) => {
      return createVNode(Fragment, null, [createVNode(resolveComponent("xGap"), {
        "t": true
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": configs
      }, null)]);
    })) ? _slot : {
      default: () => [_slot]
    }), createVNode(resolveComponent("xGap"), {
      "b": "38"
    }, null)]), createVNode(resolveComponent("xDialogFooter"), {
      "configs": {
        onCancel: this.propOptions.$close,
        onOk: this.onOk
      }
    }, null)]);
  }
});
const DialogInterfaceProxyModify = defineComponent({
  props: {
    propOptions: {
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
      stateApp
    };
  },
  watch: {
    "stateApp.currProject": {
      immediate: true,
      deep: true,
      handler(currProject) {
        const {
          env: envArray
        } = currProject;
        this.dataXItem.witchEnv.setOptions(envArray);
      }
    }
  },
  data(vm) {
    return {
      dataXItem: {
        isProxy: defItem({
          value: false,
          label: xI("\u662F\u5426\u5F00\u542F\u8F6C\u53D1"),
          options: ITEM_OPTIONS.trueOrFalse,
          itemType: "Switch"
        }),
        resBodyType: defItem({
          value: false,
          label: xI("\u54CD\u5E94\u7C7B\u578B"),
          isShow() {
            return !vm.dataXItem.isProxy.value;
          },
          options: ITEM_OPTIONS.interfaceBodyType,
          itemType: "RadioGroup"
        }),
        witchEnv: defItem({
          isShow() {
            return vm.dataXItem.isProxy.value;
          },
          label: xI("\u8F6C\u53D1\u73AF\u5883"),
          value: "",
          options: [],
          setOptions(envArray) {
            this.options = xU.map(envArray, (i) => {
              return {
                value: i._id,
                label: `${i.name} ${i.domain}`
              };
            });
          },
          itemType: EnvSelectRender
        })
      }
    };
  },
  mounted() {
    this.propOptions.vm = this;
    this.initForm();
  },
  computed: {
    category() {
      if (this.propOptions.category) {
        return this.propOptions.category;
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
      const {
        selected
      } = this.propOptions.payload;
      if (!await itemsInvalid()) {
        const {
          isProxy,
          witchEnv,
          resBodyType
        } = pickValueFrom(this.dataXItem);
        try {
          const res = await Promise.all(xU.map(selected, (id) => {
            const data = {
              id,
              witchEnv,
              isProxy
            };
            if (resBodyType) {
              data.res_body_type = resBodyType;
            }
            return API.project.updateInterface(data);
          }));
          stateInterface._updateInterfaceMenuList();
          this.propOptions.$close();
          xU.message.success(xI("\u4FEE\u6539_\u6210\u529F", {
            title: "\u4EE3\u7406"
          }));
        } catch (error) {
          xU.message.error(xI("\u4FEE\u6539_\u5931\u8D25", {
            title: "\u4EE3\u7406"
          }));
        }
      }
    }
  },
  render() {
    return createVNode(Fragment, null, [createVNode("div", {
      "class": "x-dialog-boddy-wrapper "
    }, [createVNode(resolveComponent("xGap"), {
      "t": true
    }, null), JSON.stringify(pickValueFrom(this.dataXItem)), createVNode(resolveComponent("xForm"), {
      "class": "flex",
      "labelStyle": {
        "min-width": "120px",
        width: "unset"
      }
    }, {
      default: () => [createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.isProxy
      }, null), createVNode(resolveComponent("xGap"), {
        "t": true
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.resBodyType
      }, null), createVNode(resolveComponent("xGap"), {
        "t": true
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.witchEnv,
        "class": "flex1"
      }, null)]
    }), createVNode(resolveComponent("xGap"), {
      "b": "38"
    }, null)]), createVNode(resolveComponent("xDialogFooter"), {
      "configs": {
        onCancel: this.propOptions.$close,
        onOk: this.onOk
      }
    }, null)]);
  }
});
const RequestArgsRender = defineComponent({
  props: defineComponentProps(itemBaseProps),
  setup(props) {
    return {
      _itemValue: usePrivateItemValue(props)
    };
  },
  render() {
    var _a, _b, _c;
    return createVNode(RequestArgsPanel, {
      "params": (_a = this.properties) == null ? void 0 : _a.value,
      "apiMethod": (_c = (_b = this.properties) == null ? void 0 : _b.deepWatch) == null ? void 0 : _c.apiMethod,
      "onUpdate:params": this.listeners["onEmitItemValue"]
    }, null);
  }
});
const MarkdownRender = defineComponent({
  props: defineComponentProps(itemBaseProps),
  setup(props) {
    return {
      _itemValue: usePrivateItemValue(props, {
        md: "",
        html: ""
      })
    };
  },
  render(vm) {
    return createVNode(TuiEditor, {
      "modelValue": vm._itemValue,
      "onUpdate:modelValue": ($event) => vm._itemValue = $event
    }, null);
  }
});
const ResponseRender = defineComponent({
  props: defineComponentProps(itemBaseProps),
  setup(props) {
    return {
      _itemValue: usePrivateItemValue(props)
    };
  },
  computed: {
    body: {
      get() {
        var _a;
        return ((_a = this._itemValue) == null ? void 0 : _a.res_body) || "";
      },
      set(res_body) {
        this._itemValue.res_body = res_body;
      }
    },
    resBodyType: {
      get() {
        var _a;
        return ((_a = this._itemValue) == null ? void 0 : _a.res_body_type) || "";
      },
      set(res_body_type) {
        this._itemValue.res_body_type = res_body_type;
      }
    },
    resBackupJson: {
      get() {
        var _a;
        return ((_a = this._itemValue) == null ? void 0 : _a.resBackupJson) || "";
      },
      set(resBackupJson) {
        this._itemValue.resBackupJson = resBackupJson;
      }
    }
  },
  render(vm) {
    return createVNode(ResponsePanel, {
      "body": vm.body,
      "onUpdate:body": ($event) => vm.body = $event,
      "bodyType": vm.resBodyType,
      "onUpdate:bodyType": ($event) => vm.resBodyType = $event,
      "resBackupJson": vm.resBackupJson,
      "onUpdate:resBackupJson": ($event) => vm.resBackupJson = $event
    }, null);
  }
});
async function openProxyEnvDialog() {
  xU.dialog({
    title: xI("\u7BA1\u7406\u9879\u76EE\u63A5\u53E3\u8F6C\u53D1\u73AF\u5883"),
    component: DialogUpsertProxyEnv,
    keepTop: true
  });
}
async function openUpsertTagDialog() {
  xU.dialog({
    title: xI("\u7BA1\u7406\u9879\u76EE\u63A5\u53E3Tags"),
    component: DialogUpsertTags,
    keepTop: true
  });
}
const InpterfacePathParams = defineComponent({
  props: ["properties", "slots", "listeners", "propsWillDeleteFromConfigs"],
  methods: {
    fnUpdate(prop, value, index) {
      this.properties.value[index][prop] = value;
      this.listeners["onEmitItemValue"](this.properties.value);
    }
  },
  render(vm) {
    return xU.map(vm.properties.value, (data, index) => {
      return createVNode("div", {
        "class": "flex middel mt10 width100"
      }, [createVNode(resolveComponent("ElTag"), {
        "class": "mr10 flex middle",
        "style": "min-width:100px"
      }, {
        default: () => [data.name]
      }), createVNode("span", {
        "class": "mr10 flex1"
      }, [createVNode(resolveComponent("ElInput"), {
        "value": data.example,
        "onEmitItemValue": (val) => {
          this.fnUpdate("example", val, index);
        }
      }, null)]), createVNode("span", {
        "class": "flex1"
      }, [createVNode(resolveComponent("ElInput"), {
        "value": data.desc,
        "onEmitItemValue": (val) => {
          this.fnUpdate("desc", val, index);
        }
      }, null)])]);
    });
  }
});
const EnvSelectRender = defineComponent({
  props: defineComponentProps(itemBaseProps),
  setup(props) {
    return {
      _itemValue: usePrivateItemValue(props, "")
    };
  },
  computed: {
    envConfigs() {
      return defItem({
        itemType: "Select",
        placeholder: "\u8BF7\u9009\u62E9\u8F6C\u53D1\u73AF\u5883",
        options: this.properties.options,
        style: "width:100px;"
      });
    }
  },
  render() {
    return createVNode("div", {
      "class": "flex overflow-auto"
    }, [createVNode(resolveComponent("xItem"), {
      "configs": this.envConfigs,
      "modelValue": this._itemValue,
      "onUpdate:modelValue": ($event) => this._itemValue = $event,
      "style": {
        width: "300px"
      }
    }, null), createVNode(resolveComponent("xGap"), {
      "l": "10"
    }, null), createVNode(resolveComponent("xButton"), {
      "configs": {
        text: xI("\u8F6C\u53D1\u73AF\u5883\u8BBE\u7F6E"),
        onClick: openProxyEnvDialog
      },
      "class": "ml10",
      "type": "primary"
    }, null)]);
  }
});
const TagSelectRender = defineComponent({
  props: ["properties", "slots", "listeners", "propsWillDeleteFromConfigs"],
  computed: {
    selected: {
      get() {
        var _a, _b;
        if (xU.isArrayFill((_a = this.properties) == null ? void 0 : _a.value)) {
          return (_b = this.properties) == null ? void 0 : _b.value;
        } else {
          return [];
        }
      },
      set(val) {
        var _a;
        if (((_a = this.properties) == null ? void 0 : _a.value) !== val) {
          this.listeners["onEmitItemValue"](val);
        }
      }
    },
    vDomOptions() {
      const options = this.properties.options || [];
      const vDomOptions = xU.map(options, (item) => {
        return createVNode(resolveComponent("aSelectOption"), {
          "value": item.name,
          "key": item.name
        }, {
          default: () => [withDirectives(createVNode("span", null, [item.name]), [[resolveDirective("xTips"), {
            content: item.desc
          }]])]
        });
      });
      return vDomOptions;
    }
  },
  render(vm) {
    return createVNode("div", {
      "class": "flex overflow-auto"
    }, [createVNode(resolveComponent("el-select"), {
      "placeholder": "\u8BF7\u9009\u62E9 tag",
      "mode": "multiple",
      "value": vm.selected,
      "onUpdate:value": ($event) => vm.selected = $event
    }, {
      default: () => [this.vDomOptions]
    }), createVNode(resolveComponent("xGap"), {
      "l": "10"
    }, null), createVNode(resolveComponent("xButton"), {
      "configs": {
        text: xI("Tag\u8BBE\u7F6E"),
        onClick: openUpsertTagDialog
      },
      "class": "ml10",
      "type": "primary"
    }, null)]);
  }
});
function dialogInterfaceStatusModify({
  selected
}) {
  xU.dialog({
    title: xI("\u53D8\u66F4\u72B6\u6001"),
    component: DialogInterfaceStatusModify,
    payload: {
      selected
    }
  });
}
function dialogInterfaceProxyModify({
  selected
}) {
  xU.dialog({
    title: xI("\u53D8\u66F4\u4EE3\u7406"),
    component: DialogInterfaceProxyModify,
    payload: {
      selected
    }
  });
}
function _isSlot$2(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
function titleStyle(isLink) {
  return {
    color: isLink ? "var(--app-link)" : ""
  };
}
const InterfaceMain = defineComponent({
  setup(props) {
    var vm = {
      dataGrid: defDataGrid({
        isHidePagination: true,
        dataSource: [],
        columns: {},
        queryTableList: void 0
      }),
      selected: /* @__PURE__ */ new Set(),
      filter: {
        catid: [],
        method: [],
        status: [],
        witchEnv: [],
        tag: [],
        path: "",
        title: "",
        isUseBackup: []
      },
      conditions: {
        catid: [],
        method: [],
        status: [],
        witchEnv: [],
        tag: [],
        path: "",
        title: "",
        isUseBackup: []
      },
      $btnChangeStatus: {
        text: xI("\u53D8\u66F4\u72B6\u6001"),
        disabled: () => vm.selected.size === 0,
        async onClick() {
          dialogInterfaceStatusModify({
            selected: Array.from(vm.selected)
          });
        }
      },
      $btnChangeProxy: {
        text: xI("\u53D8\u66F4\u4EE3\u7406"),
        disabled: () => vm.selected.size === 0,
        async onClick() {
          dialogInterfaceProxyModify({
            selected: Array.from(vm.selected)
          });
        }
      },
      _onFilter({
        ref: ref2,
        prop
      }) {
        vm.filter[prop] = vm.conditions[prop];
        ref2.value.hide();
      },
      _onReset({
        ref: ref2,
        prop
      }) {
        vm.conditions[prop] = [];
        vm._onFilter({
          ref: ref2,
          prop
        });
      }
    };
    vm = xScope(vm);
    const cpt_columns = computed(() => {
      const checkbox = {
        prop: "checkbox",
        key: "checkbox",
        title: xI("checkbox"),
        width: 48,
        fixed: true,
        headerCellRenderer(_props) {
          const isChecked = cptInterfaceRowData.value.length > 0 && vm.selected.size === cptInterfaceRowData.value.length;
          const isIndeterminate = vm.selected.size > 0 && vm.selected.size < cptInterfaceRowData.value.length;
          return createVNode("div", {
            "class": "flex center width100"
          }, [createVNode(resolveComponent("el-checkbox"), {
            "indeterminate": isIndeterminate,
            "model-value": isChecked,
            "onChange": () => {
              if (vm.selected.size < cptInterfaceRowData.value.length) {
                vm.selected = new Set(xU.map(cptInterfaceRowData.value, (i) => i._id));
              } else {
                vm.selected = /* @__PURE__ */ new Set();
              }
            }
          }, null)]);
        },
        cellRenderer: ({
          rowData
        }) => {
          const isChecked = vm.selected.has(rowData._id);
          return createVNode("div", {
            "class": "flex center width100"
          }, [createVNode(resolveComponent("el-checkbox"), {
            "model-value": isChecked,
            "onChange": (value) => {
              if (value) {
                vm.selected.add(rowData._id);
              } else {
                vm.selected.delete(rowData._id);
              }
            }
          }, null)]);
        }
      };
      const catid = {
        prop: "catid",
        key: "catid",
        title: xI("\u63A5\u53E3\u5206\u7C7B"),
        width: 150,
        headerCellRenderer(_props) {
          let _slot;
          const {
            vDom
          } = useColHeader({
            title: _props.column.title,
            prop: "catid",
            style: titleStyle(vm.filter.catid.length > 0),
            controller: createVNode(resolveComponent("el-checkbox-group"), {
              "modelValue": vm.conditions.catid,
              "onUpdate:modelValue": ($event) => vm.conditions.catid = $event
            }, _isSlot$2(_slot = xU.map(stateInterface.allCategory, (i) => {
              return createVNode("div", null, [createVNode(resolveComponent("el-checkbox"), {
                "label": i._id
              }, {
                default: () => [i.name]
              })]);
            })) ? _slot : {
              default: () => [_slot]
            }),
            onFilter: vm._onFilter,
            onReset: vm._onReset
          });
          return vDom;
        },
        cellRenderer: ({
          cellData
        }) => xU.cellValToLabel(stateInterface.allCategory, {
          value: cellData
        })
      };
      const title = {
        prop: "title",
        key: "title",
        title: xI("\u63A5\u53E3\u540D\u79F0"),
        width: 300,
        headerCellRenderer(_props) {
          const {
            vDom
          } = useColHeader({
            title: _props.column.title,
            prop: "title",
            style: titleStyle(String(vm.filter.title).length > 0),
            controller: createVNode(resolveComponent("el-input"), {
              "modelValue": vm.conditions.title,
              "onUpdate:modelValue": ($event) => vm.conditions.title = $event,
              "rows": 3,
              "clearable": true
            }, null),
            onFilter: vm._onFilter,
            onReset: vm._onReset
          });
          return vDom;
        },
        cellRenderer({
          cellData,
          rowData
        }) {
          return createVNode("a", {
            "href": aHashLink("/project", {
              ...cptRouter.value.query,
              interface_type: INTERFACE,
              interface_id: rowData._id
            })
          }, [cellData]);
        }
      };
      const method = {
        prop: "method",
        key: "method",
        title: xI("\u8BF7\u6C42\u65B9\u6CD5"),
        width: 100,
        headerCellRenderer(_props) {
          let _slot2;
          const {
            vDom
          } = useColHeader({
            title: _props.column.title,
            prop: "method",
            style: titleStyle(vm.filter.method.length > 0),
            controller: createVNode(resolveComponent("el-checkbox-group"), {
              "modelValue": vm.conditions.method,
              "onUpdate:modelValue": ($event) => vm.conditions.method = $event
            }, _isSlot$2(_slot2 = xU.map(ITEM_OPTIONS.httpMethod, (i) => {
              return createVNode("div", null, [createVNode(resolveComponent("el-checkbox"), {
                "label": i.value
              }, {
                default: () => [i.label]
              })]);
            })) ? _slot2 : {
              default: () => [_slot2]
            }),
            onFilter: vm._onFilter,
            onReset: vm._onReset
          });
          return vDom;
        },
        cellRenderer: ({
          cellData
        }) => createVNode("div", {
          "class": "flex center width100"
        }, [ITEM_OPTIONS_VDOM.httpMethod(cellData)])
      };
      const path = {
        prop: "path",
        key: "path",
        title: xI("\u63A5\u53E3\u8DEF\u5F84"),
        width: 250,
        headerCellRenderer(_props) {
          const {
            vDom
          } = useColHeader({
            title: _props.column.title,
            prop: "path",
            style: titleStyle(String(vm.filter.path).length > 0),
            controller: createVNode(resolveComponent("el-input"), {
              "modelValue": vm.conditions.path,
              "onUpdate:modelValue": ($event) => vm.conditions.path = $event,
              "rows": 3,
              "clearable": true
            }, null),
            onFilter: vm._onFilter,
            onReset: vm._onReset
          });
          return vDom;
        }
      };
      const status = {
        prop: "status",
        key: "status",
        title: xI("\u72B6\u6001"),
        width: 150,
        headerCellRenderer(_props) {
          let _slot3;
          const {
            vDom
          } = useColHeader({
            title: _props.column.title,
            prop: "status",
            style: titleStyle(vm.filter.status.length > 0),
            width: 200,
            controller: createVNode(resolveComponent("el-checkbox-group"), {
              "modelValue": vm.conditions.status,
              "onUpdate:modelValue": ($event) => vm.conditions.status = $event
            }, _isSlot$2(_slot3 = xU.map(ITEM_OPTIONS.interfaceStatus, (i) => {
              return createVNode("div", null, [createVNode(resolveComponent("el-checkbox"), {
                "label": i.value
              }, {
                default: () => [i.label]
              })]);
            })) ? _slot3 : {
              default: () => [_slot3]
            }),
            onFilter: vm._onFilter,
            onReset: vm._onReset
          });
          return vDom;
        },
        cellRenderer: ({
          cellData
        }) => createVNode("div", {
          "class": "flex center width100"
        }, [ITEM_OPTIONS_VDOM.status(cellData)])
      };
      const isProxy = {
        prop: "isProxy",
        key: "isProxy",
        title: xI("\u8F6C\u53D1"),
        width: 150,
        headerCellRenderer(_props) {
          let _slot4;
          const {
            vDom
          } = useColHeader({
            title: _props.column.title,
            prop: "witchEnv",
            style: titleStyle(vm.filter.witchEnv.length > 0),
            width: 350,
            controller: createVNode(resolveComponent("el-checkbox-group"), {
              "modelValue": vm.conditions.witchEnv,
              "onUpdate:modelValue": ($event) => vm.conditions.witchEnv = $event
            }, {
              default: () => [createVNode("div", null, [createVNode(resolveComponent("el-checkbox"), {
                "label": "unset"
              }, {
                default: () => [createVNode(resolveComponent("el-tag"), null, _isSlot$2(_slot4 = xI("\u672A\u8BBE\u7F6E")) ? _slot4 : {
                  default: () => [_slot4]
                })]
              })]), xU.map(stateApp.currProject.env, (i) => {
                return createVNode("div", null, [createVNode(resolveComponent("el-checkbox"), {
                  "label": i._id
                }, {
                  default: () => [createVNode(resolveComponent("el-tag"), null, {
                    default: () => [i.name]
                  }), createVNode("span", {
                    "class": "ml8"
                  }, [i.domain])]
                })]);
              })]
            }),
            onFilter: vm._onFilter,
            onReset: vm._onReset
          });
          return vDom;
        },
        cellRenderer: (params) => {
          const {
            cellData: isProxy2,
            rowData: record
          } = params;
          if (isProxy2) {
            const {
              witchEnv
            } = record;
            if (!witchEnv) {
              return "\u4EFB\u610F";
            }
            if (witchEnv) {
              const envArray = stateApp.currProject.env;
              let env = xU.find(envArray, {
                _id: witchEnv
              });
              if (env) {
                return createVNode("div", {
                  "class": "flex center width100"
                }, [createVNode(resolveComponent("el-tag"), null, {
                  default: () => [env.name]
                })]);
              }
            } else {
              return "--";
            }
          }
          return "";
        }
      };
      const isUseBackup = {
        prop: "isUseBackup",
        key: "isUseBackup",
        title: xI("\u542F\u7528\u5907\u4EFD\u6570\u636E"),
        width: 150,
        headerCellRenderer(_props) {
          let _slot5;
          const {
            vDom
          } = useColHeader({
            title: _props.column.title,
            prop: "isUseBackup",
            style: titleStyle(vm.filter.isUseBackup.length > 0),
            width: 350,
            controller: createVNode(resolveComponent("el-checkbox-group"), {
              "modelValue": vm.conditions.isUseBackup,
              "onUpdate:modelValue": ($event) => vm.conditions.isUseBackup = $event
            }, _isSlot$2(_slot5 = xU.map([xI("\u662F"), xI("\u5426"), xI("\u65E0\u5907\u4EFD\u6570\u636E")], (i) => {
              console.log(i);
              return createVNode("div", null, [createVNode(resolveComponent("el-checkbox"), {
                "label": i
              }, {
                default: () => [createVNode(resolveComponent("el-tag"), null, _isSlot$2(i) ? i : {
                  default: () => [i]
                })]
              })]);
            })) ? _slot5 : {
              default: () => [_slot5]
            }),
            onFilter: vm._onFilter,
            onReset: vm._onReset
          });
          return vDom;
        },
        cellRenderer: (params) => {
          let _slot8;
          const {
            rowData
          } = params;
          const tag2 = ((_slot7) => {
            if (rowData.res_body_type === "backup") {
              let _slot6;
              return createVNode(resolveComponent("el-tag"), {
                "type": "success"
              }, _isSlot$2(_slot6 = xI("\u662F")) ? _slot6 : {
                default: () => [_slot6]
              });
            }
            return createVNode(resolveComponent("el-tag"), {
              "type": "info"
            }, _isSlot$2(_slot7 = xI("\u5426")) ? _slot7 : {
              default: () => [_slot7]
            });
          })();
          return [tag2, !rowData.isSetBackupData && createVNode(resolveComponent("el-tag"), {
            "type": "warning",
            "class": "ml8"
          }, _isSlot$2(_slot8 = xI("\u65E0\u5907\u4EFD\u6570\u636E")) ? _slot8 : {
            default: () => [_slot8]
          })];
        }
      };
      const maintainer = {
        prop: "tag",
        key: "tag",
        title: xI("\u7EF4\u62A4\u4EBA"),
        width: 150,
        headerCellRenderer(_props) {
          let _slot9;
          const {
            vDom
          } = useColHeader({
            title: _props.column.title,
            prop: "tag",
            style: titleStyle(vm.filter.tag.length > 0),
            width: 450,
            controller: createVNode(resolveComponent("el-checkbox-group"), {
              "modelValue": vm.conditions.tag,
              "onUpdate:modelValue": ($event) => vm.conditions.tag = $event
            }, _isSlot$2(_slot9 = xU.map(stateInterface.allTags, (i) => {
              return createVNode("div", null, [createVNode(resolveComponent("el-checkbox"), {
                "label": i
              }, null)]);
            })) ? _slot9 : {
              default: () => [_slot9]
            }),
            onFilter: vm._onFilter,
            onReset: vm._onReset
          });
          return vDom;
        },
        cellRenderer: ({
          rowData
        }) => createVNode("div", {
          "class": "flex center width100"
        }, [rowData.uid])
      };
      const tag = {
        prop: "tag",
        key: "tag",
        title: xI("Tags"),
        width: 250,
        headerCellRenderer(_props) {
          let _slot10;
          const {
            vDom
          } = useColHeader({
            title: _props.column.title,
            prop: "tag",
            style: titleStyle(vm.filter.tag.length > 0),
            width: 450,
            controller: createVNode(resolveComponent("el-checkbox-group"), {
              "modelValue": vm.conditions.tag,
              "onUpdate:modelValue": ($event) => vm.conditions.tag = $event
            }, _isSlot$2(_slot10 = xU.map(stateInterface.allTags, (i) => {
              return createVNode("div", null, [createVNode(resolveComponent("el-checkbox"), {
                "label": i
              }, null)]);
            })) ? _slot10 : {
              default: () => [_slot10]
            }),
            onFilter: vm._onFilter,
            onReset: vm._onReset
          });
          return vDom;
        },
        cellRenderer: ({
          cellData
        }) => createVNode("div", {
          "class": "flex center width100"
        }, [ITEM_OPTIONS_VDOM.tags(cellData)])
      };
      if (cptRouter.value.query.interface_type === ALL) {
        return [checkbox, catid, title, method, path, status, maintainer, isProxy, isUseBackup, tag];
      }
      if (cptRouter.value.query.interface_type === CATEGORY) {
        return [checkbox, title, method, path, status, maintainer, isProxy, isUseBackup, tag];
      }
      return [];
    });
    watch(() => cpt_columns.value, (columns) => {
      vm.dataGrid.columns = columns;
    }, {
      immediate: true
    });
    const cptInterfaceRowData = computed(() => {
      let interfaceForShow = (() => {
        if (cptRouter.value.query.interface_type === INTERFACE) {
          return [];
        }
        const {
          allInterface
        } = stateInterface;
        let interfaceForShow2 = xU.isArrayFill(allInterface) ? xU.cloneDeep(allInterface) : [];
        if (cptRouter.value.query.interface_type === CATEGORY) {
          const {
            category_id
          } = cptRouter.value.query;
          interfaceForShow2 = xU.filter(interfaceForShow2, (i) => xU.isSame(category_id, i.catid));
        }
        let paramKeys = Object.keys(vm.filter);
        let prop = paramKeys.pop();
        while (prop) {
          const search = vm.filter[prop];
          if (xU.isInput(search)) {
            interfaceForShow2 = xU.filter(interfaceForShow2, (i) => {
              if (prop == "status") {
                return search.includes(i.status);
              } else if (prop == "catid") {
                return search.includes(i.catid);
              } else if (prop == "method") {
                return search.includes(i.method);
              } else if (prop == "tag") {
                return xU.some(i.tag, (tag) => search.includes(tag));
              } else if (prop == "isUseBackup") {
                if (search.includes("\u662F")) {
                  return i.res_body_type === "backup";
                }
                if (search.includes("\u5426")) {
                  return i.res_body_type !== "backup";
                }
                if (search.includes("\u65E0\u5907\u4EFD\u6570\u636E")) {
                  if (!i.isSetBackupData) {
                    return true;
                  }
                }
                return false;
              } else if (prop == "witchEnv") {
                if (search.includes("unset")) {
                  if (!i.witchEnv) {
                    return true;
                  }
                }
                if (!i.isProxy) {
                  return false;
                }
                return search.includes(i.witchEnv);
              } else {
                return new RegExp(search, "i").test(i[prop]);
              }
            });
            xU("interfaceForShow.length new", interfaceForShow2.length);
          }
          prop = paramKeys.pop();
        }
        return interfaceForShow2;
      })();
      vm.dataGrid.dataSource = interfaceForShow;
      return interfaceForShow;
    });
    return function() {
      let _slot11, _slot12, _slot13;
      return createVNode("div", {
        "id": "ViewInterfaceList"
      }, [createVNode("div", {
        "class": "Operation mb10 flex end middle"
      }, [createVNode(resolveComponent("el-button-group"), {
        "class": "ml-4"
      }, {
        default: () => [createVNode(resolveComponent("xButton"), {
          "class": "mr4",
          "configs": vm.$btnChangeStatus
        }, null), createVNode(resolveComponent("xButton"), {
          "class": "mr4",
          "configs": vm.$btnChangeProxy
        }, null), createVNode(resolveComponent("xButton"), {
          "class": "mr4"
        }, _isSlot$2(_slot11 = xI("\u8DEF\u5F84\u66FF\u6362")) ? _slot11 : {
          default: () => [_slot11]
        }), createVNode(resolveComponent("xButton"), {
          "class": "mr4"
        }, _isSlot$2(_slot12 = xI("\u6DFB\u52A0Tag")) ? _slot12 : {
          default: () => [_slot12]
        }), createVNode(resolveComponent("xButton"), {
          "class": "mr4"
        }, _isSlot$2(_slot13 = xI("\u79FB\u9664Tag")) ? _slot13 : {
          default: () => [_slot13]
        })]
      })]), createVNode("div", {
        "class": "flex1 el-card"
      }, [createVNode(resolveComponent("xDataGrid"), {
        "configs": vm.dataGrid
      }, null)])]);
    };
  }
});
const DialogModifyInterface = defineComponent({
  props: {
    propOptions: {
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
      stateApp,
      stateInterface
    };
  },
  computed: {
    vDomXItemPathparams() {
      if (xU.isArrayFill(this.dataXItem.pathParams.value)) {
        return createVNode(Fragment, null, [createVNode(resolveComponent("xGap"), {
          "t": true
        }, null), createVNode(resolveComponent("xItem"), {
          "configs": this.dataXItem.pathParams
        }, null)]);
      } else {
        return null;
      }
    },
    interfaceId() {
      return this.propOptions.oldInterface._id;
    },
    configsDialogFooter() {
      return {
        cancel: {
          preset: "cancel",
          onClick: async () => {
            this.propOptions.$close();
          }
        },
        save: {
          preset: "save",
          onClick: this.submit
        }
      };
    }
  },
  data() {
    const vm = this;
    return {
      reqArgs: "1",
      detailInfo: {},
      activeKey: "1",
      dataXItem: {
        catid: defItem({
          value: "",
          itemType: "Select",
          label: xI("\u63A5\u53E3\u5206\u7C7B"),
          placeholder: "\u5206\u7C7B\u540D\u79F0",
          options: [],
          rules: [FormRules.required()],
          setOptions(allCategory) {
            var _a;
            this.options = allCategory;
            if (vm.propOptions.categoryId) {
              this.value = vm.propOptions.categoryId;
            } else {
              this.value = ((_a = xU.first(this.options)) == null ? void 0 : _a.value) || "";
            }
          }
        }),
        title: defItem({
          value: "",
          label: xI("\u63A5\u53E3\u540D\u79F0"),
          placeholder: xI("\u63A5\u53E3\u540D\u79F0"),
          rules: [FormRules.required(), FormRules.nameLength({
            label: xI("\u63A5\u53E3")
          })]
        }),
        basepath: defItem({
          value: vm.stateApp.currProject.basepath,
          label: xI("\u63A5\u53E3\u57FA\u672C\u8DEF\u5F84"),
          labelVNodeRender: VNodeCollection.labelTips(`\u63A5\u53E3\u57FA\u672C\u8DEF\u5F84\uFF0C\u53EF\u5728 \u9879\u76EE\u8BBE\u7F6E \u91CC\u4FEE\u6539`),
          disabled: true
        }),
        apiMethod: defItem({
          value: "",
          itemType: "Select",
          options: ITEM_OPTIONS.httpMethod,
          onChange(val) {
            vm.dataXItem.requestArgs.deepWatch.apiMethod = val;
          },
          rules: [FormRules.required()],
          style: {
            width: "120px"
          }
        }),
        path: defItem({
          value: "",
          label: xI("\u63A5\u53E3\u8DEF\u5F84"),
          labelVNodeRender: VNodeCollection.labelTips(createVNode("ul", null, [createVNode("li", null, [createTextVNode("1.\u63A5\u53E3\u8DEF\u5F84\u652F\u6301\u8DEF\u7531\u53C2\u6570\uFF0C\u4F8B\u5982:/api/v1/project"), createVNode("b", null, [createTextVNode("/"), "{projectId}"]), createTextVNode("\u3002")]), createVNode("li", null, [createTextVNode("2.Query\u53C2\u6570\uFF0C\u4F8B\u5982/api/v1/project"), createVNode("b", null, [createTextVNode("?projectId=0001")]), createTextVNode("\u3002\u8BF7\u5B9A\u4E49\u5230"), createVNode("b", null, [createTextVNode("Request\u8BBE\u7F6E->Query")])])])),
          placeholder: "/path",
          rules: [FormRules.required(), FormRules.apiPath()],
          once() {
            const vDomApiMethodsSelector = createVNode(resolveComponent("xItem"), {
              "configs": vm.dataXItem.apiMethod
            }, null);
            this.slots = markRaw({
              addonBefore: () => vDomApiMethodsSelector
            });
          },
          onAfterEmitItemValue: xU.debounce(function(newPatnValue) {
            newPatnValue = _$handlePath(newPatnValue);
            let queue = [];
            setValueTo(vm.dataXItem, {
              path: newPatnValue
            });
            const {
              pathParams
            } = pickValueFrom(vm.dataXItem);
            let insertParams = (name) => {
              let findExist = xU.find(pathParams, {
                name
              });
              if (findExist) {
                queue.push(findExist);
              } else {
                queue.push({
                  name,
                  desc: ""
                });
              }
            };
            if (newPatnValue && newPatnValue.indexOf(":") !== -1) {
              let paths = newPatnValue.split("/"), name, i;
              for (i = 1; i < paths.length; i++) {
                if (paths[i][0] === ":") {
                  name = paths[i].substr(1);
                  insertParams(name);
                }
              }
            }
            if (newPatnValue && newPatnValue.length > 3) {
              newPatnValue.replace(/\{(.+?)\}/g, function(str, match) {
                insertParams(match);
              });
            }
            setValueTo(vm.dataXItem, {
              pathParams: xU.map(xU.uniqBy(queue, "name"), (newValue) => {
                return xU.merge({
                  name: "",
                  desc: "",
                  example: ""
                }, newValue);
              })
            });
          }, 800)
        }),
        pathParams: defItem({
          label: xI("\u63A5\u53E3\u8DEF\u5F84\u53C2\u6570"),
          value: [],
          itemType: InpterfacePathParams
        }),
        tag: defItem({
          label: "Tag",
          value: [],
          options: [],
          async setOptions(tagArray) {
            this._$updateUI({
              options: tagArray
            });
          },
          itemType: TagSelectRender
        }),
        status: defItem({
          label: xI("\u72B6\u6001"),
          value: ITEM_OPTIONS.interfaceStatus[0].value,
          options: ITEM_OPTIONS.interfaceStatus,
          itemType: "Select"
        }),
        isProxy: defItem({
          value: false,
          label: xI("\u662F\u5426\u5F00\u542F\u8F6C\u53D1"),
          options: ITEM_OPTIONS.trueOrFalse,
          itemType: "Switch"
        }),
        witchEnv: defItem({
          isShow: () => vm.dataXItem.isProxy.value,
          label: xI("\u8F6C\u53D1\u73AF\u5883"),
          value: "",
          options: [],
          setOptions(envArray) {
            this._$updateUI({
              options: xU.map(envArray, (i) => ({
                value: i._id,
                label: `${i.name} ${i.domain}`
              }))
            });
          },
          itemType: EnvSelectRender
        }),
        requestArgs: defItem({
          label: xI("\u8BF7\u6C42\u53C2\u6570\u8BBE\u7F6E"),
          value: [],
          activeKey: "1",
          deepWatch: {
            apiMethod: ""
          },
          itemType: RequestArgsRender
        }),
        responseArgs: defItem({
          label: xI("\u54CD\u5E94\u53C2\u6570\u8BBE\u7F6E"),
          value: {},
          activeKey: "1",
          apiMethod: "",
          itemType: ResponseRender
        }),
        remark: defItem({
          label: xI("\u5907\u6CE8"),
          value: {
            html: "",
            md: ""
          },
          itemType: MarkdownRender
        }),
        noticed: defItem({
          label: xI("\u6D88\u606F\u901A\u77E5"),
          labelVNodeRender: VNodeCollection.labelTips(createVNode("div", null, [xI("\u5F00\u542F\u6D88\u606F\u901A\u77E5\uFF0C\u53EF\u5728 \u9879\u76EE\u8BBE\u7F6E \u91CC\u4FEE\u6539")])),
          checkedChildren: xI("\u5F00"),
          unCheckedChildren: xI("\u5173"),
          value: true,
          itemType: "Switch"
        }),
        api_opened: defItem({
          label: xI("\u5F00\u653E\u63A5\u53E3"),
          labelVNodeRender: VNodeCollection.labelTips(createVNode("div", null, [xI("\u7528\u6237\u53EF\u4EE5\u5728 \u6570\u636E\u5BFC\u51FA \u65F6\u9009\u62E9\u53EA\u5BFC\u51FA\u516C\u5F00\u63A5\u53E3")])),
          checkedChildren: xI("\u5F00"),
          unCheckedChildren: xI("\u5173"),
          value: false,
          itemType: "Switch"
        })
      }
    };
  },
  mounted() {
    this.setFormDataValues();
  },
  watch: {
    "stateApp.currProject": {
      immediate: true,
      deep: true,
      handler(currProject) {
        const {
          env: envArray,
          tag: tagArray,
          cat: category
        } = currProject;
        this.dataXItem.catid.setOptions(xU.map(category, (i) => ({
          ...i,
          label: i.name,
          value: i._id
        })));
        this.dataXItem.witchEnv.setOptions(envArray);
        this.dataXItem.tag.setOptions(tagArray);
      }
    }
  },
  methods: {
    async setFormDataValues() {
      const {
        data
      } = await API.project.fetchInterfaceDetail(this.propOptions.interfaceId);
      this.detailInfo = this.initState(data);
      const {
        api_opened,
        catid,
        title,
        path,
        req_params,
        tag,
        status,
        isProxy,
        witchEnv,
        method,
        req_headers,
        req_body_type,
        req_query,
        req_body_form,
        req_body_other,
        req_body_is_json_schema,
        res_body,
        res_body_type,
        res_body_mock,
        res_body_is_json_schema,
        desc,
        markdown,
        resBackupJson
      } = this.detailInfo;
      xU(this.detailInfo);
      try {
        debugger;
        setValueTo(this.dataXItem, {
          witchEnv,
          catid,
          title,
          apiMethod: method,
          path,
          remark: {
            md: markdown,
            html: desc
          },
          pathParams: req_params,
          tag: String(tag).split(",").filter(xU.isInput),
          status,
          isProxy,
          requestArgs: {
            req_headers,
            req_body_type,
            req_query,
            req_body_form,
            req_body_other,
            req_body_is_json_schema
          },
          responseArgs: {
            res_body_is_json_schema,
            res_body,
            res_body_type,
            res_body_mock,
            resBackupJson
          },
          api_opened,
          noticed: this.stateApp.currProject.switch_notice
        });
      } catch (error) {
        console.error(error);
        debugger;
      }
      console.log(this.dataXItem.responseArgs.value);
    },
    initState(detailInfo) {
      if (detailInfo.req_body_form) {
        detailInfo.req_body_form = detailInfo.req_body_form.map((item) => {
          item.type = item.type === "text" ? "text" : "file";
          return item;
        });
      }
      return detailInfo;
    },
    getFormData() {
      const {
        catid,
        title,
        apiMethod,
        path,
        tag,
        status,
        isProxy,
        witchEnv,
        remark,
        requestArgs,
        responseArgs,
        pathParams,
        api_opened,
        noticed
      } = pickValueFrom(this.dataXItem);
      const {
        req_body_type,
        req_body_other,
        req_query,
        req_headers,
        req_body_form
      } = requestArgs;
      const {
        res_body_type,
        res_body
      } = responseArgs;
      const {
        html: desc,
        md: markdown
      } = remark;
      const _formData = {
        id: this.detailInfo._id,
        catid,
        title,
        method: apiMethod,
        path,
        isProxy,
        witchEnv,
        req_params: pathParams,
        tag,
        status,
        req_body_type,
        req_body_other,
        req_query,
        req_headers,
        req_body_form,
        req_body_is_json_schema: true,
        res_body_type,
        res_body,
        res_body_is_json_schema: true,
        desc,
        markdown,
        api_opened,
        switch_notice: noticed
      };
      let isFile = false;
      let haveContentType = false;
      if (_formData.req_body_type === "form") {
        xU.each(_formData.req_body_form, (item) => {
          delete item._id;
          if (item.type === "file") {
            isFile = true;
          }
        });
        xU.each(_formData.req_headers, (item) => {
          delete item._id;
          if (item.name === "Content-Type") {
            item.value = isFile ? "multipart/form-data" : "application/x-www-form-urlencoded";
            haveContentType = true;
          }
        });
        if (haveContentType === false) {
          _formData.req_headers.unshift({
            name: "Content-Type",
            value: isFile ? "multipart/form-data" : "application/x-www-form-urlencoded"
          });
        }
      } else if (_formData.req_body_type === "json") {
        _formData.req_headers ? xU.each(_formData.req_headers, (item) => {
          delete item._id;
          if (item.name === "Content-Type") {
            item.value = "application/json";
            haveContentType = true;
          }
        }) : [];
        if (haveContentType === false) {
          _formData.req_headers = _formData.req_headers || [];
          _formData.req_headers.unshift({
            name: "Content-Type",
            value: "application/json"
          });
        }
      }
      const itemFill = (item) => item.name !== "";
      _formData.req_headers = _formData.req_headers ? _formData.req_headers.filter(itemFill) : [];
      _formData.req_body_form = _formData.req_body_form ? _formData.req_body_form.filter(itemFill) : [];
      _formData.req_params = _formData.req_params ? _formData.req_params.filter(itemFill) : [];
      _formData.req_query = xU.filter(_formData.req_query, itemFill).map((i) => {
        delete i._id;
        return i;
      });
      if (HTTP_METHOD[_formData.method].request_body !== true) {
        _formData.req_body_form = [];
      }
      if (_formData.req_body_is_json_schema && _formData.req_body_other && _formData.req_body_type === "json") {
        if (!_formData.req_body_other) {
          throw new Error(xI("\u8BF7\u6C42\u53C2\u6570 json-schema \u683C\u5F0F\u6709\u8BEF"));
        }
      }
      if (_formData.res_body_is_json_schema && _formData.res_body && _formData.res_body_type === "json") {
        if (!_formData.res_body) {
          throw new Error(xI("\u8FD4\u56DE\u6570\u636E json-schema \u683C\u5F0F\u6709\u8BEF"));
        }
      }
      return _formData;
    },
    async submit() {
      if (!await itemsInvalid()) {
        try {
          const formData = this.getFormData();
          const {
            data
          } = await API.project.updateInterface(formData);
          if (data) {
            await (async () => {
              cptRouter.value.query.category_id = formData.catid;
              await stateInterface._updateInterfaceMenuList();
              stateInterface._setExpand();
              if (this.propOptions.updateInterfaceInfo) {
                await this.propOptions.updateInterfaceInfo();
              }
              setTimeout(() => {
                this.propOptions.$close();
              }, 1e3);
            })();
            xU.message.success(xI("\u4FEE\u6539\u6210\u529F"));
          }
        } catch (error) {
          xU.message.error(xI("\u4FEE\u6539\u5931\u8D25"));
        }
      }
    }
  },
  render(vm) {
    return createVNode(Fragment, null, [createVNode("div", {
      "class": "dialog-modify-interface x-dialog-boddy-wrapper flex1 flex horizon height100 width100 overflow-auto"
    }, [createVNode("div", {
      "class": "flex1"
    }, [createVNode(resolveComponent("xForm"), {
      "labelStyle": {
        "min-width": "120px",
        width: "unset"
      }
    }, {
      default: () => [createVNode(resolveComponent("xGap"), {
        "t": true
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.catid
      }, null), createVNode(resolveComponent("xGap"), {
        "t": true
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.title
      }, null), createVNode(resolveComponent("xGap"), {
        "t": true
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.basepath
      }, null), createVNode(resolveComponent("xGap"), {
        "t": true
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.path
      }, null), this.vDomXItemPathparams, createVNode(resolveComponent("xGap"), {
        "t": true
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.tag
      }, null), createVNode(resolveComponent("xGap"), {
        "t": true
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.status
      }, null), createVNode(resolveComponent("xGap"), {
        "t": true
      }, null), createVNode("div", {
        "class": "flex"
      }, [createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.isProxy
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.witchEnv,
        "class": "flex1"
      }, null)]), createVNode(resolveComponent("xGap"), {
        "t": true
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.requestArgs
      }, null), createVNode(resolveComponent("xGap"), {
        "t": true
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.responseArgs
      }, null), createVNode(resolveComponent("xLogObject"), {
        "obj": this.dataXItem.remark,
        "hide": true
      }, null), createVNode(resolveComponent("xGap"), {
        "t": true
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.remark
      }, null), createVNode(resolveComponent("xGap"), {
        "t": true
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.api_opened
      }, null)]
    }), createVNode(resolveComponent("xGap"), {
      "t": true
    }, null)])]), createVNode(resolveComponent("xDialogFooter"), null, {
      default: () => [createVNode(resolveComponent("xGap"), {
        "f": "1"
      }, null), createVNode("div", {
        "style": "min-width:120px;"
      }, [createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.noticed
      }, null)]), createVNode(resolveComponent("xGap"), {
        "r": "10"
      }, null), createVNode(resolveComponent("xButton"), {
        "configs": this.configsDialogFooter.cancel
      }, null), createVNode(resolveComponent("xGap"), {
        "r": "10"
      }, null), createVNode(resolveComponent("xButton"), {
        "configs": this.configsDialogFooter.save
      }, null)]
    })]);
  }
});
function _isSlot$1(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const DialogPostman = defineComponent({
  props: {
    propOptions: {
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
      stateApp
    };
  },
  data() {
    const vm = this;
    return {
      api: defItem({
        value: "",
        itemType: "Select",
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
        catid: defItem({
          value: "",
          itemType: "Select",
          label: xI("\u63A5\u53E3\u5206\u7C7B"),
          placeholder: "\u5206\u7C7B\u540D\u79F0",
          options: [],
          rules: [FormRules.required()],
          once() {
            this.options = stateInterface.allCategory;
            if (vm.propOptions.categoryId) {
              this.value = vm.propOptions.categoryId;
            } else {
              this.value = xU.first(this.options).value;
            }
          }
        }),
        title: defItem({
          value: "",
          label: xI("\u63A5\u53E3\u540D\u79F0"),
          placeholder: xI("\u63A5\u53E3\u540D\u79F0"),
          rules: [FormRules.required(), FormRules.nameLength({
            label: xI("\u63A5\u53E3")
          })]
        }),
        path: defItem({
          value: "/",
          label: xI("\u63A5\u53E3\u8DEF\u5F84"),
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
    this.propOptions.vm = this;
  },
  methods: {
    async onOk() {
      if (!await itemsInvalid()) {
        const {
          catid,
          title,
          path
        } = pickValueFrom(this.dataXItem);
        const {
          projectId,
          $close
        } = this.propOptions;
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
            stateInterface._updateInterfaceMenuList();
            cptRouter.value.go("/interface/detail", {
              ...cptRouter.value.query,
              interface_id: data._id
            });
            xU.message.success("\u6DFB\u52A0\u63A5\u53E3\u6210\u529F");
            $close();
          }
        } catch (error) {
          xU.message.error("\u6DFB\u52A0\u5931\u8D25");
        }
      }
    }
  },
  render() {
    let _slot;
    return createVNode(Fragment, null, [createVNode("div", {
      "class": "x-dialog-boddy-wrapper"
    }, [createVNode(resolveComponent("xGap"), {
      "t": true
    }, null), createVNode(resolveComponent("elAlert"), {
      "title": xI("\u6CE8\uFF1A \u8BE6\u7EC6\u7684\u63A5\u53E3\u6570\u636E\u53EF\u4EE5\u5728\u7F16\u8F91\u9875\u9762\u4E2D\u6DFB\u52A0"),
      "type": "info",
      "closable": true,
      "class": "width100"
    }, null), createVNode(resolveComponent("xForm"), {
      "class": "flex vertical",
      "labelStyle": {
        "min-width": "120px",
        width: "unset"
      }
    }, _isSlot$1(_slot = xU.map(this.dataXItem, (configs, prop) => {
      return createVNode(Fragment, null, [createVNode(resolveComponent("xGap"), {
        "t": true
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": configs
      }, null)]);
    })) ? _slot : {
      default: () => [_slot]
    }), createVNode(resolveComponent("xGap"), {
      "t": true
    }, null)]), createVNode(resolveComponent("xDialogFooter"), {
      "configs": {
        onCancel: this.propOptions.$close,
        onOk: this.onOk
      }
    }, null)]);
  }
});
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const InterfaceDetailPreview = defineComponent({
  props: ["info"],
  setup(props) {
    var state = {
      WebSocket: null,
      detailInfo: false,
      pathParams: defDataGrid({
        isHidePagination: true,
        dataSource: [],
        columns: {
          ...colParamsName(),
          ...defCol({
            prop: "example",
            label: xI("\u793A\u4F8B"),
            width: "300"
          }),
          ...colRemark()
        },
        queryTableList: void 0
      }),
      headersParams: defDataGrid({
        isHidePagination: true,
        dataSource: [],
        columns: {
          ...colRequired(),
          ...colParamsName(),
          ...colValue,
          ...colExample,
          ...colRemark()
        },
        queryTableList: void 0
      }),
      queryParams: defDataGrid({
        isHidePagination: true,
        dataSource: [],
        columns: {
          ...colRequired(),
          ...colParamsName(),
          ...colExample,
          ...colRemark()
        },
        queryTableList: void 0
      }),
      bodyFormParams: defDataGrid({
        isHidePagination: true,
        dataSource: [],
        columns: {
          ...colRequired(),
          ...colParamsName(),
          ...colType,
          ...colExample,
          ...colRemark()
        },
        queryTableList: void 0
      }),
      async _runPostman() {
        xU.dialog({
          title: xI("\u4FEE\u6539\u63A5\u53E3"),
          component: DialogPostman,
          area: ["1024px", "624px"],
          maxmin: true
        });
      },
      async _updateInfo() {
        state.headersParams.dataSource = xU.orderBy(stateInterface.currInterface.req_headers, ["required"], ["desc"]);
        state.pathParams.dataSource = xU.orderBy(stateInterface.currInterface.req_params, ["required"], ["desc"]);
        state.queryParams.dataSource = xU.orderBy(stateInterface.currInterface.req_query, ["required", "type"], ["desc", "asc"]);
        state.bodyFormParams.dataSource = xU.orderBy(stateInterface.currInterface.req_body_form, ["required", "type"], ["desc", "asc"]);
      },
      _copyAjaxCode() {
        const codeString = $(`#interfaceDetailAjaxCode`).text();
        copyToClipboard(codeString);
        xU.message.success("\u5DF2\u7ECF\u6210\u529F\u590D\u5236\u5230\u526A\u5207\u677F");
      },
      _flagMsg(mock, strice) {
        if (mock && strice) {
          return createVNode("span", null, [createTextVNode("( \u5168\u5C40mock & \u4E25\u683C\u6A21\u5F0F )")]);
        } else if (!mock && strice) {
          return createVNode("span", null, [createTextVNode("( \u4E25\u683C\u6A21\u5F0F )")]);
        } else if (mock && !strice) {
          return createVNode("span", null, [createTextVNode("( \u5168\u5C40mock )")]);
        } else {
          return;
        }
      },
      _closeWS() {
        state.WebSocket && state.WebSocket.close();
        delete state.WebSocket;
      }
    };
    state = xScope(state);
    var cpt_labelProxyEnv = computed(() => {
      if (!stateInterface.currInterface.isProxy) {
        return "Y-api Mock \u6570\u636E";
      }
      const envId = stateInterface.currInterface.witchEnv;
      if (!envId) {
        return "\u4EFB\u610F";
      }
      if (envId) {
        const envArray = stateApp.currProject.env;
        let env = xU.find(envArray, {
          _id: envId
        });
        if (env) {
          return createVNode("div", null, [createVNode(resolveComponent("el-tag"), null, {
            default: () => [env.name]
          }), createVNode("span", {
            "class": "ml10"
          }, [env.domain])]);
        }
      } else {
        return "--";
      }
    });
    var cpt_ajaxCode = computed(() => {
      const {
        title,
        path,
        method
      } = stateInterface.currInterface;
      const projectId = stateApp.currProject._id;
      const interfaceId = cptRouter.value.query.interface_id;
      const requestCode = stateApp._returnRequestCode();
      return requestCode({
        title,
        path,
        method,
        projectId,
        interfaceId,
        xU
      });
    });
    var cpt_vDomCopyAjaxCodePanel = computed(() => {
      let _slot;
      return createVNode("div", {
        "style": "position:relative;overflow:auto;height:100%;",
        "ref": "ajaxCode",
        "id": "interfaceDetailAjaxCode"
      }, [createVNode(resolveComponent("Mkit"), {
        "md": cpt_ajaxCode.value
      }, null), createVNode(resolveComponent("xButton"), {
        "onClick": () => state._copyAjaxCode(),
        "style": "position:absolute;right:16px;top:16px;"
      }, _isSlot(_slot = xI("\u590D\u5236\u4EE3\u7801")) ? _slot : {
        default: () => [_slot]
      })]);
    });
    var cpt_vDomMockHref = computed(() => {
      var _a;
      const {
        protocol,
        hostname,
        port
      } = location;
      return `${protocol}//${hostname}${port ? `:${port}` : ""}/mock/${stateApp.currProject._id}${(_a = stateApp.currProject) == null ? void 0 : _a.basepath}${stateInterface.currInterface.path}`;
    });
    var cpt_interfaceInfo = computed(() => {
      var _a, _b, _c, _d;
      const {
        tag,
        up_time,
        uid,
        username,
        status,
        path,
        method,
        isProxy,
        custom_field_value
      } = stateInterface.currInterface || {};
      return {
        title: createVNode("span", null, [xI("\u57FA\u672C\u4FE1\u606F")]),
        labelWidth: 120,
        items: {
          title: {
            label: "\u63A5\u53E3\u540D\u79F0",
            content: () => {
              var _a2;
              return (_a2 = stateInterface.currInterface) == null ? void 0 : _a2.title;
            }
          },
          username: {
            label: "\u7EF4\u62A4\u4EBA",
            content: () => createVNode("div", {
              "class": "flex middle"
            }, [createVNode(resolveComponent("elAvatar"), {
              "src": getAvatarSrcByid(uid),
              "class": "mr8",
              "style": "height:24px;width:24px;"
            }, null), createVNode("a", null, [username])])
          },
          status: {
            label: "\u72B6\u6001",
            content: () => ITEM_OPTIONS_VDOM.status(status)
          },
          upTime: {
            label: "\u66F4\u65B0\u65F6\u95F4",
            content: () => xU.dateFormat(up_time)
          },
          path: {
            label: "\u63A5\u53E3",
            content: () => {
              let _slot2;
              return createVNode("div", {
                "class": "flex vertical"
              }, [createVNode(resolveComponent("CopyContent"), {
                "class": "flex middle"
              }, {
                default: () => [createVNode("span", null, [ITEM_OPTIONS_VDOM.httpMethod(method)]), createVNode("span", {
                  "class": "ml8"
                }, [stateApp.currProject.basepath, createTextVNode(" "), path])]
              }), createVNode("div", {
                "class": "flex middle width100 mt10 "
              }, [state._flagMsg(stateApp.currProject.isMockOpen, stateApp.currProject.strice), createVNode(resolveComponent("CopyContent"), null, {
                default: () => [createVNode("span", {
                  "class": "href"
                }, [cpt_vDomMockHref.value])]
              }), createVNode(resolveComponent("xGap"), {
                "f": "1"
              }, null), createVNode(resolveComponent("xButton"), {
                "type": "primary",
                "onClick": state._runPostman
              }, _isSlot(_slot2 = xI("\u8FD0\u884C")) ? _slot2 : {
                default: () => [_slot2]
              })])]);
            }
          },
          tag: {
            label: "Tag",
            col: 3,
            content: () => ITEM_OPTIONS_VDOM.tags(tag)
          },
          isProxy: {
            label: "\u662F\u5426\u5F00\u542F\u8F6C\u53D1",
            col: 1,
            content: () => ITEM_OPTIONS_VDOM.trueOrFalse(isProxy)
          },
          labelProxyEnv: {
            label: "\u8F6C\u53D1\u73AF\u5883",
            col: 2,
            content: () => cpt_labelProxyEnv.value,
            isHide: !isProxy
          },
          isMockOpen: {},
          ajaxCode: {
            label: createVNode("div", {
              "class": "flex middle"
            }, [createVNode("span", {
              "class": "flex1"
            }, [xI("ajax\u4EE3\u7801")])]),
            col: 3,
            content: () => cpt_vDomCopyAjaxCodePanel.value
          },
          customField: {
            label: (_b = (_a = stateApp.currGroup) == null ? void 0 : _a.custom_field) == null ? void 0 : _b.enable,
            isHide: custom_field_value && ((_d = (_c = stateApp.currGroup) == null ? void 0 : _c.custom_field1) == null ? void 0 : _d.enable),
            content: () => custom_field_value
          }
        },
        layout({
          rect
        }) {
          const {
            width
          } = rect;
          if (width < 666) {
            return [["title"], ["status"], ["upTime"], ["username"], ["tag"], ["path"], ["isProxy"], ["labelProxyEnv"], ["ajaxCode"], ["customField"]];
          }
          return [["title:3", "", ""], ["status", "upTime:2"], ["username", "tag:2"], ["path:3"], ["isProxy", "labelProxyEnv:2"], ["ajaxCode:3"], ["customField:3"]];
        }
      };
    });
    const cpt_vNodeDesc = computed(() => {
      if (stateInterface.currInterface.desc) {
        const modelValue = {
          md: stateInterface.currInterface.markdown
        };
        return createVNode(Fragment, null, [createVNode(resolveComponent("xGap"), {
          "t": "20"
        }, null), createVNode(resolveComponent("xInfoCard"), {
          "title": xI("\u5907\u6CE8")
        }, {
          default: () => [createVNode(TuiEditor, {
            "modelValue": modelValue,
            "onUpdate:modelValue": ($event) => modelValue = $event,
            "isReadonly": true
          }, null)]
        })]);
      }
    });
    const cpt_vNodePath = computed(() => {
      if (state.pathParams.dataSource.length) {
        return createVNode(resolveComponent("elCard"), {
          "header": xI("\u8DEF\u5F84\u53C2\u6570")
        }, {
          default: () => [createVNode(resolveComponent("xDataGrid"), {
            "configs": state.pathParams
          }, null)]
        });
      }
    });
    const cpt_vNodeHeaders = computed(() => {
      if (state.headersParams.dataSource.length) {
        return createVNode(Fragment, null, [createVNode(resolveComponent("xGap"), {
          "t": true
        }, null), createVNode(resolveComponent("elCard"), {
          "header": xI("Headers")
        }, {
          default: () => [createVNode(resolveComponent("xDataGrid"), {
            "configs": state.headersParams
          }, null)]
        })]);
      }
    });
    const cpt_vNodeQuery = computed(() => {
      if (state.queryParams.dataSource.length) {
        return createVNode(Fragment, null, [createVNode(resolveComponent("xGap"), {
          "t": true
        }, null), createVNode(resolveComponent("elCard"), {
          "header": xI("Query")
        }, {
          default: () => [createVNode(resolveComponent("xDataGrid"), {
            "configs": state.queryParams
          }, null)]
        })]);
      }
    });
    const cpt_vNodeReq = computed(() => {
      if (state.queryParams.dataSource.length) {
        if (stateInterface.currInterface.req_body_type == "form") {
          if (state.bodyFormParams.dataSource.length) {
            return createVNode(Fragment, null, [createVNode(resolveComponent("xGap"), {
              "t": true
            }, null), createVNode(resolveComponent("elCard"), {
              "header": xI("Body")
            }, {
              default: () => [createVNode(resolveComponent("xDataGrid"), {
                "configs": state.bodyFormParams
              }, null)]
            })]);
          }
        } else if (stateInterface.currInterface.req_body_type == "json") {
          if (stateInterface.currInterface.req_body_other) {
            return createVNode(Fragment, null, [createVNode(resolveComponent("xGap"), {
              "t": true
            }, null), createVNode(resolveComponent("elCard"), {
              "header": xI("Body")
            }, {
              default: () => [createVNode(JsonSchemaMonaco, {
                "schemaString": stateInterface.currInterface.req_body_other,
                "onUpdate:schemaString": ($event) => stateInterface.currInterface.req_body_other = $event,
                "readOnly": true
              }, null)]
            })]);
          }
        } else if (stateInterface.currInterface.req_body_type == "raw") {
          if (stateInterface.currInterface.req_body_other) {
            return createVNode(Fragment, null, [createVNode(resolveComponent("xGap"), {
              "t": true
            }, null), createVNode(resolveComponent("elCard"), {
              "header": xI("Body")
            }, {
              default: () => [createVNode("div", {
                "style": "height:300px;width:90%"
              }, [createVNode(MonacoEditor, {
                "language": "json",
                "code": stateInterface.currInterface.req_body_other,
                "readOnly": true
              }, null)])]
            })]);
          }
        }
      }
    });
    const cpt_vNodeRequest = computed(() => {
      if (stateInterface.currInterface.desc) {
        return createVNode(Fragment, null, [createVNode(resolveComponent("xGap"), {
          "t": "20"
        }, null), createVNode(resolveComponent("xInfoCard"), {
          "title": "\u8BF7\u6C42\u53C2\u6570"
        }, {
          default: () => [cpt_vNodePath.value, cpt_vNodeHeaders.value, cpt_vNodeQuery.value, cpt_vNodeReq.value]
        })]);
      }
    });
    const cpt_vNodeResponse = computed(() => {
      if (stateInterface.currInterface.res_body) {
        let _slot3;
        return createVNode(Fragment, null, [createVNode(resolveComponent("xGap"), {
          "t": "20"
        }, null), createVNode(resolveComponent("xInfoCard"), {
          "title": "Response\u4FE1\u606F"
        }, _isSlot(_slot3 = (() => {
          if (stateInterface.currInterface.res_body_type === "json") {
            return createVNode(JsonSchemaMonaco, {
              "schemaString": stateInterface.currInterface.res_body,
              "onUpdate:schemaString": ($event) => stateInterface.currInterface.res_body = $event,
              "readOnly": true
            }, null);
          }
          return createVNode(MonacoEditor, {
            "language": "json",
            "code": stateInterface.currInterface.res_body,
            "readOnly": true
          }, null);
        })()) ? _slot3 : {
          default: () => [_slot3]
        })]);
      }
    });
    watch(() => stateInterface.currInterface, () => {
      state._updateInfo();
    }, {
      immediate: true
    });
    return function() {
      if (!stateInterface.currInterface || !stateApp.currProject) {
        return withDirectives(createVNode("div", {
          "class": "flex middle center flex1"
        }, null), [[resolveDirective("xloading"), "true"]]);
      }
      xU(stateApp.currGroup, stateApp.currProject, stateInterface.currInterface);
      return createVNode(Fragment, null, [createVNode(resolveComponent("xInfoCard"), {
        "configs": cpt_interfaceInfo.value
      }, null), cpt_vNodeDesc.value, cpt_vNodeRequest.value, cpt_vNodeResponse.value]);
    };
  }
});
const InterfaceDetailEdit = defineComponent({
  props: {
    info: {
      type: Object,
      required: true
    },
    interfaceId: {
      type: String,
      required: true
    },
    categoryId: {
      type: String,
      required: true
    },
    propOptions: {
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
      stateApp,
      stateInterface
    };
  },
  computed: {
    vDomXItemPathparams() {
      if (xU.isArrayFill(this.dataXItem.pathParams.value)) {
        return createVNode(Fragment, null, [createVNode(resolveComponent("xGap"), {
          "t": true
        }, null), createVNode(resolveComponent("xItem"), {
          "configs": this.dataXItem.pathParams
        }, null)]);
      } else {
        return null;
      }
    }
  },
  data() {
    const vm = this;
    return {
      reqArgs: "1",
      detailInfo: {},
      activeKey: "1",
      dataXItem: {
        catid: defItem({
          value: "",
          itemType: "Select",
          label: xI("\u63A5\u53E3\u5206\u7C7B"),
          placeholder: "\u5206\u7C7B\u540D\u79F0",
          options: [],
          rules: [FormRules.required()],
          setOptions(allCategory) {
            var _a;
            this.options = allCategory;
            if (vm.categoryId) {
              this.value = vm.categoryId;
            } else {
              this.value = ((_a = xU.first(this.options)) == null ? void 0 : _a.value) || "";
            }
          }
        }),
        title: defItem({
          value: "",
          label: xI("\u63A5\u53E3\u540D\u79F0"),
          placeholder: xI("\u63A5\u53E3\u540D\u79F0"),
          rules: [FormRules.required(), FormRules.nameLength({
            label: xI("\u63A5\u53E3")
          })]
        }),
        basepath: defItem({
          value: vm.stateApp.currProject.basepath,
          label: xI("\u63A5\u53E3\u57FA\u672C\u8DEF\u5F84"),
          labelVNodeRender: VNodeCollection.labelTips(`\u63A5\u53E3\u57FA\u672C\u8DEF\u5F84\uFF0C\u53EF\u5728 \u9879\u76EE\u8BBE\u7F6E \u91CC\u4FEE\u6539`),
          disabled: true
        }),
        apiMethod: defItem({
          value: "",
          itemType: "Select",
          options: ITEM_OPTIONS.httpMethod,
          onChange(val) {
            vm.dataXItem.requestArgs.deepWatch.apiMethod = val;
          },
          rules: [FormRules.required()],
          style: {
            width: "120px"
          }
        }),
        path: defItem({
          value: "",
          label: xI("\u63A5\u53E3\u8DEF\u5F84"),
          labelVNodeRender: VNodeCollection.labelTips(createVNode("ul", null, [createVNode("li", null, [createTextVNode("1.\u63A5\u53E3\u8DEF\u5F84\u652F\u6301\u8DEF\u7531\u53C2\u6570\uFF0C\u4F8B\u5982:/api/v1/project"), createVNode("b", null, [createTextVNode("/"), "{projectId}"]), createTextVNode("\u3002")]), createVNode("li", null, [createTextVNode("2.Query\u53C2\u6570\uFF0C\u4F8B\u5982/api/v1/project"), createVNode("b", null, [createTextVNode("?projectId=0001")]), createTextVNode("\u3002\u8BF7\u5B9A\u4E49\u5230"), createVNode("b", null, [createTextVNode("Request\u8BBE\u7F6E->Query")])])])),
          placeholder: "/path",
          rules: [FormRules.required(), FormRules.apiPath()],
          once() {
            const vDomApiMethodsSelector = createVNode(resolveComponent("xItem"), {
              "configs": vm.dataXItem.apiMethod
            }, null);
            this.slots = markRaw({
              addonBefore: () => vDomApiMethodsSelector
            });
          },
          onAfterEmitItemValue: xU.debounce(function(newPatnValue) {
            newPatnValue = _$handlePath(newPatnValue);
            let queue = [];
            setValueTo(vm.dataXItem, {
              path: newPatnValue
            });
            const {
              pathParams
            } = pickValueFrom(vm.dataXItem);
            let insertParams = (name) => {
              let findExist = xU.find(pathParams, {
                name
              });
              if (findExist) {
                queue.push(findExist);
              } else {
                queue.push({
                  name,
                  desc: ""
                });
              }
            };
            if (newPatnValue && newPatnValue.indexOf(":") !== -1) {
              let paths = newPatnValue.split("/"), name, i;
              for (i = 1; i < paths.length; i++) {
                if (paths[i][0] === ":") {
                  name = paths[i].substr(1);
                  insertParams(name);
                }
              }
            }
            if (newPatnValue && newPatnValue.length > 3) {
              newPatnValue.replace(/\{(.+?)\}/g, function(str, match) {
                insertParams(match);
              });
            }
            setValueTo(vm.dataXItem, {
              pathParams: xU.map(xU.uniqBy(queue, "name"), (newValue) => {
                return xU.merge({
                  name: "",
                  desc: "",
                  example: ""
                }, newValue);
              })
            });
          }, 800)
        }),
        pathParams: defItem({
          label: xI("\u63A5\u53E3\u8DEF\u5F84\u53C2\u6570"),
          value: [],
          itemType: InpterfacePathParams
        }),
        tag: defItem({
          label: "Tag",
          value: [],
          options: [],
          async setOptions(tagArray) {
            this._$updateUI({
              options: tagArray
            });
          },
          itemType: TagSelectRender
        }),
        status: defItem({
          label: xI("\u72B6\u6001"),
          value: ITEM_OPTIONS.interfaceStatus[0].value,
          options: ITEM_OPTIONS.interfaceStatus,
          itemType: "Select"
        }),
        isProxy: defItem({
          value: false,
          label: xI("\u662F\u5426\u5F00\u542F\u8F6C\u53D1"),
          options: ITEM_OPTIONS.trueOrFalse,
          itemType: "Switch"
        }),
        witchEnv: defItem({
          isShow: () => vm.dataXItem.isProxy.value,
          label: xI("\u8F6C\u53D1\u73AF\u5883"),
          value: "",
          options: [],
          setOptions(envArray) {
            this._$updateUI({
              options: xU.map(envArray, (i) => ({
                value: i._id,
                label: `${i.name} ${i.domain}`
              }))
            });
          },
          itemType: EnvSelectRender
        }),
        requestArgs: defItem({
          label: xI("\u8BF7\u6C42\u53C2\u6570\u8BBE\u7F6E"),
          value: [],
          activeKey: "1",
          deepWatch: {
            apiMethod: ""
          },
          itemType: RequestArgsRender
        }),
        responseArgs: defItem({
          label: xI("\u54CD\u5E94\u53C2\u6570\u8BBE\u7F6E"),
          value: {},
          activeKey: "1",
          apiMethod: "",
          itemType: ResponseRender
        }),
        remark: defItem({
          label: xI("\u5907\u6CE8"),
          value: {
            html: "",
            md: ""
          },
          itemType: MarkdownRender
        }),
        noticed: defItem({
          label: xI("\u6D88\u606F\u901A\u77E5"),
          labelVNodeRender: VNodeCollection.labelTips(createVNode("div", null, [xI("\u5F00\u542F\u6D88\u606F\u901A\u77E5\uFF0C\u53EF\u5728 \u9879\u76EE\u8BBE\u7F6E \u91CC\u4FEE\u6539")])),
          checkedChildren: xI("\u5F00"),
          unCheckedChildren: xI("\u5173"),
          value: true,
          itemType: "Switch"
        }),
        api_opened: defItem({
          label: xI("\u5F00\u653E\u63A5\u53E3"),
          labelVNodeRender: VNodeCollection.labelTips(createVNode("div", null, [xI("\u7528\u6237\u53EF\u4EE5\u5728 \u6570\u636E\u5BFC\u51FA \u65F6\u9009\u62E9\u53EA\u5BFC\u51FA\u516C\u5F00\u63A5\u53E3")])),
          checkedChildren: xI("\u5F00"),
          unCheckedChildren: xI("\u5173"),
          value: false,
          itemType: "Switch"
        })
      }
    };
  },
  mounted() {
    this.setFormDataValues();
  },
  watch: {
    "stateApp.currProject": {
      immediate: true,
      deep: true,
      handler(currProject) {
        const {
          env: envArray,
          tag: tagArray,
          cat: category
        } = currProject;
        this.dataXItem.catid.setOptions(xU.map(category, (i) => ({
          ...i,
          label: i.name,
          value: i._id
        })));
        this.dataXItem.witchEnv.setOptions(envArray);
        this.dataXItem.tag.setOptions(tagArray);
      }
    }
  },
  methods: {
    async setFormDataValues() {
      const {
        data
      } = await API.project.fetchInterfaceDetail(this.interfaceId);
      this.detailInfo = this.initState(data);
      xU(JSON.stringify(this.detailInfo, null, 2));
      const {
        api_opened,
        catid,
        title,
        path,
        req_params,
        tag,
        status,
        isProxy,
        witchEnv,
        method,
        req_headers,
        req_body_type,
        req_query,
        req_body_form,
        req_body_other,
        req_body_is_json_schema,
        res_body,
        res_body_type,
        res_body_mock,
        res_body_is_json_schema,
        resBackupJson,
        desc,
        markdown
      } = this.detailInfo;
      setValueTo(this.dataXItem, {
        witchEnv,
        catid,
        title,
        apiMethod: method,
        path,
        remark: {
          md: markdown,
          html: desc
        },
        pathParams: req_params,
        tag: String(tag).split(",").filter(xU.isInput),
        status,
        isProxy,
        requestArgs: {
          req_headers,
          req_body_type,
          req_query,
          req_body_form,
          req_body_other,
          req_body_is_json_schema
        },
        responseArgs: {
          res_body_is_json_schema,
          res_body,
          res_body_type,
          res_body_mock,
          resBackupJson
        },
        api_opened,
        noticed: this.stateApp.currProject.switch_notice
      });
      xU(this.dataXItem);
    },
    initState(detailInfo) {
      if (detailInfo.req_body_form) {
        detailInfo.req_body_form = detailInfo.req_body_form.map((item) => {
          item.type = item.type === "text" ? "text" : "file";
          return item;
        });
      }
      return detailInfo;
    },
    getFormData() {
      const {
        catid,
        title,
        apiMethod,
        path,
        tag,
        status,
        isProxy,
        witchEnv,
        remark,
        requestArgs,
        responseArgs,
        pathParams,
        api_opened,
        noticed
      } = pickValueFrom(this.dataXItem);
      const {
        req_body_type,
        req_body_other,
        req_query,
        req_headers,
        req_body_form
      } = requestArgs;
      const {
        res_body_type,
        res_body,
        resBackupJson
      } = responseArgs;
      const {
        html: desc,
        md: markdown
      } = remark;
      const _formData = {
        id: this.detailInfo._id,
        catid,
        title,
        method: apiMethod,
        path,
        isProxy,
        witchEnv,
        req_params: pathParams,
        tag,
        status,
        req_body_type,
        req_body_other,
        req_query,
        req_headers,
        req_body_form,
        req_body_is_json_schema: true,
        res_body_type,
        res_body,
        res_body_is_json_schema: true,
        resBackupJson,
        desc,
        markdown,
        api_opened,
        switch_notice: noticed
      };
      let isFile = false;
      let haveContentType = false;
      if (_formData.req_body_type === "form") {
        xU.each(_formData.req_body_form, (item) => {
          delete item._id;
          if (item.type === "file") {
            isFile = true;
          }
        });
        xU.each(_formData.req_headers, (item) => {
          delete item._id;
          if (item.name === "Content-Type") {
            item.value = isFile ? "multipart/form-data" : "application/x-www-form-urlencoded";
            haveContentType = true;
          }
        });
        if (haveContentType === false) {
          _formData.req_headers.unshift({
            name: "Content-Type",
            value: isFile ? "multipart/form-data" : "application/x-www-form-urlencoded"
          });
        }
      } else if (_formData.req_body_type === "json") {
        _formData.req_headers ? xU.each(_formData.req_headers, (item) => {
          delete item._id;
          if (item.name === "Content-Type") {
            item.value = "application/json";
            haveContentType = true;
          }
        }) : [];
        if (haveContentType === false) {
          _formData.req_headers = _formData.req_headers || [];
          _formData.req_headers.unshift({
            name: "Content-Type",
            value: "application/json"
          });
        }
      }
      const itemFill = (item) => item.name !== "";
      _formData.req_headers = _formData.req_headers ? _formData.req_headers.filter(itemFill) : [];
      _formData.req_body_form = _formData.req_body_form ? _formData.req_body_form.filter(itemFill) : [];
      _formData.req_params = _formData.req_params ? _formData.req_params.filter(itemFill) : [];
      _formData.req_query = xU.filter(_formData.req_query, itemFill).map((i) => {
        delete i._id;
        return i;
      });
      if (HTTP_METHOD[_formData.method].request_body !== true) {
        _formData.req_body_form = [];
      }
      if (_formData.req_body_is_json_schema && _formData.req_body_other && _formData.req_body_type === "json") {
        if (!_formData.req_body_other) {
          throw new Error(xI("\u8BF7\u6C42\u53C2\u6570 json-schema \u683C\u5F0F\u6709\u8BEF"));
        }
      }
      if (_formData.res_body_is_json_schema && _formData.res_body && _formData.res_body_type === "json") {
        if (!_formData.res_body) {
          throw new Error(xI("\u8FD4\u56DE\u6570\u636E json-schema \u683C\u5F0F\u6709\u8BEF"));
        }
      }
      return _formData;
    },
    async onSubmit() {
      if (!await itemsInvalid()) {
        try {
          const formData = this.getFormData();
          const {
            data
          } = await API.project.updateInterface(formData);
          if (data) {
            await (async () => {
              cptRouter.value.query.category_id = formData.catid;
              await stateInterface._updateInterfaceMenuList();
              stateInterface._setExpand();
              if (this.propOptions.updateInterfaceInfo) {
                await this.propOptions.updateInterfaceInfo();
              }
              setTimeout(() => {
                this.propOptions.$close();
              }, 1e3);
            })();
            xU.message.success(xI("\u4FEE\u6539\u6210\u529F"));
          }
        } catch (error) {
          xU.message.error(xI("\u4FEE\u6539\u5931\u8D25"));
        }
      }
    }
  },
  render(vm) {
    return createVNode(Fragment, null, [createVNode("div", {
      "class": "dialog-modify-interface x-dialog-boddy-wrapper flex1 flex horizon height100 width100 overflow-auto"
    }, [createVNode("div", {
      "class": "flex1"
    }, [createVNode(resolveComponent("xForm"), {
      "labelStyle": {
        "min-width": "120px",
        width: "unset"
      }
    }, {
      default: () => [createVNode(resolveComponent("xGap"), {
        "t": true
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.catid
      }, null), createVNode(resolveComponent("xGap"), {
        "t": true
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.title
      }, null), createVNode(resolveComponent("xGap"), {
        "t": true
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.basepath
      }, null), createVNode(resolveComponent("xGap"), {
        "t": true
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.path
      }, null), this.vDomXItemPathparams, createVNode(resolveComponent("xGap"), {
        "t": true
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.tag
      }, null), createVNode(resolveComponent("xGap"), {
        "t": true
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.status
      }, null), createVNode(resolveComponent("xGap"), {
        "t": true
      }, null), createVNode("div", {
        "class": "flex"
      }, [createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.isProxy
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.witchEnv,
        "class": "flex1"
      }, null)]), createVNode(resolveComponent("xGap"), {
        "t": true
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.requestArgs
      }, null), createVNode(resolveComponent("xGap"), {
        "t": true
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.responseArgs
      }, null), createVNode(resolveComponent("xLogObject"), {
        "obj": this.dataXItem.remark,
        "hide": true
      }, null), createVNode(resolveComponent("xGap"), {
        "t": true
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.remark
      }, null), createVNode(resolveComponent("xGap"), {
        "t": true
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.api_opened
      }, null)]
    }), createVNode(resolveComponent("xGap"), {
      "t": true
    }, null)])]), createVNode(resolveComponent("xDialogFooter"), null, {
      default: () => [createVNode(resolveComponent("xGap"), {
        "f": "1"
      }, null), createVNode("div", {
        "style": "min-width:120px;"
      }, [createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.noticed
      }, null)]), createVNode(resolveComponent("xGap"), {
        "r": "10"
      }, null), createVNode(resolveComponent("xButton"), {
        "configs": {
          preset: "save",
          onClick: this.onSubmit
        }
      }, null)]
    })]);
  }
});
const InterfaceDetailRun = defineComponent({
  props: ["info"],
  setup() {
    var state = {
      yapiProxyHost: defItem({
        value: "",
        label: xI("ProxyHost"),
        placeholder: "Host"
      }),
      yapiProxyPort: defItem({
        value: "",
        label: xI("ProxyPort"),
        placeholder: "Port"
      })
    };
    state = xScope(state);
    return function() {
      return createVNode(resolveComponent("xForm"), null, {
        default: () => [createVNode(resolveComponent("xItem"), {
          "configs": state.yapiProxyHost
        }, null), createVNode(resolveComponent("xItem"), {
          "configs": state.yapiProxyPort
        }, null)]
      });
    };
  }
});
function newWsPayload(type, payload = {}) {
  try {
    return JSON.stringify({ type, payload });
  } catch (error) {
    return "{type:'error',payload:{}}";
  }
}
const socket = {
  ws: null,
  open(url) {
    return new Promise((r) => {
      this.ws = new WebSocket(url);
      this.ws.addEventListener("open", (event) => {
        this.ws.addEventListener("message", (event2) => {
          try {
            const data = JSON.parse(event2.data);
            const { type, payload } = data;
            if ("_$auth" === type) {
              r(data);
            } else {
              const handler = this.handlerMap.get(type);
              handler(payload);
              console.log("Message from server ", data);
            }
          } catch (error) {
            console.error(error);
          }
        });
        this.ws.addEventListener("error", (event2) => {
          console.log("error from server ", event2.data);
        });
        this.ws.addEventListener("close", (event2) => {
          console.log("close from server ", event2.data);
        });
      });
    });
  },
  handlerMap: /* @__PURE__ */ new Map(),
  on(type, handler) {
    if (!this.handlerMap.get(type)) {
      this.handlerMap.set(type, handler);
    }
  },
  emit(type, payload) {
    this.ws.send(JSON.stringify({ type, payload }));
  }
};
const InterfaceDetail = defineComponent({
  components: {
    InterfaceDetailPreview
  },
  setup() {
    var state = {
      activeName: cptRouter.value.query.interface_detail_type || PREVIEW,
      async _showModifyInterfaceDialog() {
        await xU.ensureValueDone(() => stateInterface.currInterface);
        const item = stateInterface.currInterface;
        const $dialogModifyInterface = $(`.dialog-modify-interface`);
        if ($dialogModifyInterface.length > 0) {
          xU.message.warn(xI("\u5DF2\u5B58\u5728\u4FEE\u6539\u9762\u677F"));
          return;
        }
        const {
          status,
          curdata,
          message
        } = await state._checkConflict(item);
        if (status == 2) {
          try {
            await xU.confirm({
              content: createVNode("div", {
                "class": "flex middle"
              }, [createVNode("a", {
                "href": makeAhref(`/user/profile/${curdata.uid}`)
              }, [curdata.username]), createVNode("div", null, [createTextVNode("\u6B63\u5728\u7F16\u8F91\u8BE5\u63A5\u53E3\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5...")])])
            });
          } catch (error) {
            console.error(error);
          } finally {
            state._closeWS();
          }
          return;
        }
        if (message) {
          xU.message.warn(message);
        }
        xU.dialog({
          title: xI("\u4FEE\u6539\u63A5\u53E3") + `-${item.title}`,
          component: DialogModifyInterface,
          area: ["1024px", "624px"],
          interfaceId: item._id,
          maxmin: true,
          _updateInterfaceInfo: state._updateInterfaceInfo,
          onBeforeClose: state._closeWS()
        });
      },
      async _checkConflict() {
        const {
          hostname,
          port,
          protocol
        } = location;
        let wsProtocol = protocol === "https:" ? "wss" : "ws";
        return new Promise(() => {
          try {
            const wsURL = new URL(stateApp.BASE_URL);
            socket.on("solveConflict", () => {
            });
            socket.open(`${wsProtocol}://${wsURL.host}/ws?x-cookies=${JSON.stringify(lStorage["x_token"])}`).then(() => {
              socket.ws.send(newWsPayload("solveConflict"));
            });
          } catch (e) {
          }
        });
      }
    };
    provide("InterfaceDetail", state);
    state = xScope(state);
    const vDomPreview = computed(() => {
      if (cptRouter.value.query.interface_detail_type === PREVIEW) {
        return createVNode("div", {
          "class": "flex1 overflow-auto mt10 height1"
        }, [createVNode(InterfaceDetailPreview, {
          "info": stateInterface.currInterface
        }, null)]);
      }
    });
    const vDomEdit = computed(() => {
      var _a, _b;
      if (cptRouter.value.query.interface_detail_type === EDIT) {
        if ((_b = (_a = stateInterface) == null ? void 0 : _a.currInterface) == null ? void 0 : _b._id) {
          return createVNode(InterfaceDetailEdit, {
            "info": stateInterface.currInterface,
            "categoryId": cptRouter.value.query.category_id,
            "interfaceId": stateInterface.currInterface._id
          }, null);
        }
      }
    });
    const vDomRun = computed(() => {
      if (cptRouter.value.query.interface_detail_type === RUN) {
        return createVNode(InterfaceDetailRun, {
          "info": stateInterface.currInterface
        }, null);
      }
    });
    function go({
      props
    }) {
      cptRouter.value.query.interface_detail_type = props.name;
    }
    watch(() => cptRouter.value.query.interface_id, (interface_id) => {
      if (interface_id) {
        stateInterface._updateInterfaceInfo(interface_id);
      }
    }, {
      immediate: true
    });
    return function() {
      if (!stateApp.currProject) {
        return withDirectives(createVNode("div", {
          "class": "flex middle center flex1"
        }, null), [[resolveDirective("xloading"), "true"]]);
      }
      return createVNode("div", {
        "class": "flex width100 flex1 paddingT paddingR paddingB"
      }, [createVNode("div", {
        "class": "interface-detail-wrapper width100 padding box-shadow flex vertical"
      }, [createVNode(resolveComponent("el-tabs"), {
        "modelValue": cptRouter.value.query.interface_detail_type,
        "onTabClick": go
      }, {
        default: () => [createVNode(resolveComponent("el-tab-pane"), {
          "label": "\u9884\u89C8",
          "name": "PREVIEW"
        }, null), createVNode(resolveComponent("el-tab-pane"), {
          "label": "\u7F16\u8F91",
          "name": "EDIT"
        }, null), createVNode(resolveComponent("el-tab-pane"), {
          "label": "\u8FD0\u884C",
          "name": "RUN"
        }, null)]
      }), vDomPreview.value, vDomEdit.value, vDomRun.value])]);
    };
  }
});
const ViewInterface = defineComponent({
  setup() {
    stateInterface.__resetState();
    stateInterface._updateInterfaceMenuList();
    xU(stateInterface);
    onMounted(() => {
      stateInterface._resetURL();
    });
    const cpt_isShowDetail = computed(() => {
      return cptRouter.value.query.interface_type === INTERFACE;
    });
    return function() {
      return createVNode("main", {
        "id": "ViewInterface"
      }, [createVNode(InterfaceAside, null, null), cpt_isShowDetail.value ? createVNode(InterfaceDetail, null, null) : createVNode(InterfaceMain, null, null)]);
    };
  }
});
const ViewInterface$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ViewInterface
}, Symbol.toStringTag, { value: "Module" }));
export {
  ViewInterface as V,
  openProxyEnvDialog as a,
  ViewInterface$1 as b,
  openUpsertTagDialog as o
};
