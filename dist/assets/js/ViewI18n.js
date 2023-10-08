import { aA as Lodash, T as markRaw, aB as reactive, f as xU, e as API, at as onMounted, aC as onUnmounted, d as defineComponent, s as stateApp, a as cptRouter, x as xI, b as defItem, h as createVNode, r as resolveComponent, i as itemsInvalid, F as Fragment, j as isVNode, $, m as getTreeOrder, w as withDirectives, l as resolveDirective, n as compositionAPI, V as defXVirTableConfigs, W as defCol, aD as defColActions, z as ADMIN, a0 as setDataGridInfo, a2 as MonacoEditor, aE as defColActionsBtnlist } from "./index.js";
import { F as FormRules, s as setValueTo, p as pickValueFrom } from "./common.FormRules.js";
import { I as ITEM_OPTIONS } from "./common.options.js";
import { V as VNodeCollection } from "./VNodeRender.js";
import { M as Methods_Wiki$1 } from "./wiki.js";
function newReactiveState(stateAndMethods) {
  const __defaultValues = {};
  function isFunctionInState({
    value,
    prop
  }) {
    if (value) {
      const valueType = typeof value;
      let isFunction = valueType == "function";
      if (isFunction) {
        isFunction = /^_\$/.test(prop);
        if (isFunction) {
          return true;
        }
      }
    } else {
      return false;
    }
  }
  Lodash.each(stateAndMethods, (value, prop) => {
    if (isFunctionInState({
      value,
      prop
    })) {
      stateAndMethods[prop] = markRaw(value);
      return;
    }
    try {
      __defaultValues[prop] = Lodash.cloneDeep(value);
    } catch (error) {
      console.error(error);
    }
  });
  const innerVariablesAndMethods = {
    __defaultValues: markRaw(__defaultValues),
    _$resetSelf: markRaw(function() {
      Lodash.each(stateAndMethods.__defaultValues, (value, prop) => {
        stateAndMethods[prop] = value;
      });
    }),
    _$null: markRaw(function() {
      Lodash.each(stateAndMethods, (value, prop) => {
        if (isFunctionInState({
          value,
          prop
        })) {
          return;
        }
        if (!Object.keys(innerVariablesAndMethods).includes(prop)) {
          delete stateAndMethods[prop];
        }
      });
    })
  };
  Lodash.each(innerVariablesAndMethods, (value, prop) => stateAndMethods[prop] = value);
  return reactive(stateAndMethods);
}
const ViewI18n$1 = "";
markRaw({
  setExpandedKeys: xU.debounce(async (_id) => {
    const expandedKeys = new Set(stateI18n.expandedKeys);
    let currentWiki = stateI18n.allRecords[_id];
    while (currentWiki) {
      expandedKeys.add(currentWiki._id);
      if (currentWiki.p_id !== 0) {
        currentWiki = stateI18n.allRecords[currentWiki.p_id];
      } else {
        currentWiki = null;
      }
    }
    stateI18n.expandedKeys = [...expandedKeys];
    stateI18n.isLoading = false;
  }, 1e3),
  async setCurrentWiki(_id, item) {
    if (!xU.isInput(_id)) {
      return;
    } else if (item) {
      stateI18n.currentI18n = item;
      Methods_Wiki.setExpandedKeys(item._id);
      return;
    } else {
      const {
        data
      } = await API.wiki.action({
        action: "detail",
        _id
      });
      if (data) {
        stateI18n.currentI18n = data;
        Methods_Wiki.setExpandedKeys(_id);
      }
    }
  }
});
const stateI18n = newReactiveState({
  isLoading: false,
  i18nRecordArray: [],
  allRecords: {},
  currentI18n: {},
  expandedKeys: [],
  async _$updateList(payload = {}) {
    const {
      data
    } = await API.god.i18nRecords();
    stateI18n.i18nRecordArray = data;
  },
  async _$updateCurrent(_id) {
    const {
      data
    } = await API.god.i18nRecordById(_id);
    stateI18n.currentI18n = data;
  },
  async _$deleteI18nRecords(records) {
    await API.god.deleteI18nRecords(records);
  }
});
const useStateI18n = () => {
  onMounted(() => stateI18n._$resetSelf());
  onUnmounted(() => stateI18n._$null());
  return stateI18n;
};
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const DialogUpsertI18nRecord = defineComponent({
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
      cptRouter
    };
  },
  data() {
    const idTipsMarkdown = `\`\`\`js
//${xI(`\u4F5C\u4E3AKey\u503C`)}
xI("Key\u503C")
\`\`\``;
    return {
      dataXItem: {
        key: defItem({
          value: "",
          label: xI("key"),
          labelVNodeRender: VNodeCollection.labelTips(createVNode(resolveComponent("Mkit"), {
            "md": idTipsMarkdown
          }, null)),
          rules: [FormRules.required()]
        }),
        desc: defItem({
          value: "",
          label: xI("\u63CF\u8FF0"),
          isTextarea: true,
          rules: [FormRules.required()]
        }),
        isRectified: defItem({
          value: false,
          label: xI("\u662F\u5426\u5DF2\u6821\u6B63"),
          itemType: "Switch",
          options: ITEM_OPTIONS.trueOrFalse,
          rules: [FormRules.required()]
        }),
        valueArray: defItem({
          value: "",
          label: xI("\u56FD\u9645\u5316\u4FE1\u606F"),
          labelVNodeRender: VNodeCollection.labelTips(xI(`\u4EE5\u6570\u7EC4\u7684\u5F62\u5F0F["\u8BED\u8A00","language"]`)),
          rules: [FormRules.required(), FormRules.stringIsArrayJson()],
          itemType: defineComponent({
            props: ["properties", "slots", "listeners", "propsWillDeleteFromConfigs"],
            computed: {
              _valueArray: {
                get() {
                  return this.properties.value || ``;
                },
                set(modelValue) {
                  this.listeners["onEmitItemValue"](modelValue);
                }
              }
            },
            render() {
              return createVNode("div", {
                "style": "height:300px"
              }, [createVNode(resolveComponent("MonacoEditor"), {
                "code": this._valueArray,
                "onUpdate:code": ($event) => this._valueArray = $event,
                "language": "json"
              }, null)]);
            }
          })
        })
      }
    };
  },
  mounted() {
    this.initForm();
  },
  methods: {
    initForm() {
      var _a, _b, _c;
      if ((_b = (_a = this.propOptions) == null ? void 0 : _a.record) == null ? void 0 : _b.valueArray) {
        setValueTo(this.dataXItem, (_c = this.propOptions) == null ? void 0 : _c.record);
      }
    },
    async onOk() {
      var _a, _b;
      if (!await itemsInvalid()) {
        try {
          const {
            data
          } = await API.god.upsertOneI18nRecord({
            ...(_a = this.propOptions) == null ? void 0 : _a.record,
            ...pickValueFrom(this.dataXItem)
          });
          if ((_b = data == null ? void 0 : data.msg) == null ? void 0 : _b._id) {
            xU.message.success("\u6DFB\u52A0\u8BB0\u5F55\u6210\u529F");
          } else {
            xU.message.success("\u4FEE\u6539\u8BB0\u5F55\u6210\u529F");
          }
          stateI18n._$updateList({});
          this.propOptions.$close();
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
    }, null), createVNode(resolveComponent("xForm"), {
      "class": "flex vertical",
      "labelStyle": {
        "min-width": "120px",
        width: "unset"
      }
    }, _isSlot(_slot = xU.map(this.dataXItem, (configs, prop) => {
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
const {
  usefnObserveDomResize
} = compositionAPI;
stateI18n._$resetSelf();
const I18nLeftSider = defineComponent({
  emits: ["change"],
  setup() {
    const {
      fnObserveDomResize,
      fnUnobserveDomResize
    } = usefnObserveDomResize();
    return {
      stateWiki: stateI18n,
      stateApp,
      cptRouter,
      fnObserveDomResize,
      fnUnobserveDomResize
    };
  },
  watch: {
    filterText(text) {
      stateI18n.isLoading = true;
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
      siderHeight: 500,
      configs: {
        fieldNames: {
          key: "_id"
        }
      }
    };
  },
  async mounted() {
    this.fnObserveDomResize(this.$refs.wrapper, () => {
      const siderHeight = Math.floor($(this.$refs.wrapper).height()) - 52;
      this.setSiderHeight(siderHeight);
    });
  },
  beforeUnmount() {
    this.fnUnobserveDomResize(this.$refs.wrapper);
  },
  computed: {
    btnAddNew() {
      return {
        text: xI("\u65B0\u589E"),
        onClick: () => this.dialogUpsertI18nRecord()
      };
    },
    btnRefresh() {
      return {
        preset: "refresh",
        onClick: () => Methods_Wiki$1.updateWikiMenuList({
          belong_type: "all"
        })
      };
    },
    vDomTree() {
      const vm = this;
      return createVNode("div", {
        "class": "left-tree box-shadow"
      }, [createVNode("div", {
        "class": "flex mb10"
      }, [createVNode(resolveComponent("xButton"), {
        "configs": vm.btnAddNew
      }, null), createVNode(resolveComponent("xGap"), {
        "l": "10"
      }, null), createVNode(resolveComponent("xButton"), {
        "configs": vm.btnRefresh
      }, null)]), createVNode(resolveComponent("ElTree"), {
        "expandedKeys": stateI18n.expandedKeys,
        "onUpdate:expandedKeys": ($event) => stateI18n.expandedKeys = $event,
        "height": vm.siderHeight,
        "treeData": stateI18n.i18nRecordArray,
        "draggable": true,
        "onDrop": vm.handleDropArticle,
        "fieldNames": vm.configs.fieldNames
      }, {
        title(item) {
          var _a;
          const {
            title,
            _id,
            type
          } = item;
          const classContentString = (() => {
            let _classString = "x-sider-tree_menu";
            if (String(_id) == String(stateI18n.currentI18n._id)) {
              return _classString + " x-sider-tree_menu_active";
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
            stateI18n.isLoading = true;
            vm.cptRouter.go("/xI", {
              wiki_id: item.data._id
            });
            vm.$emit("change");
            setTimeout(() => {
              stateI18n.isLoading = false;
            }, 1e3 * 3);
          };
          const canDelete = !(item == null ? void 0 : item.children) || ((_a = item == null ? void 0 : item.children) == null ? void 0 : _a.length) === 0;
          return createVNode("div", {
            "class": classContentString,
            "onClick": handleClick
          }, [createVNode(resolveComponent("xGap"), {
            "l": "10"
          }, null), createVNode(resolveComponent("xIcon"), {
            "icon": "icon_article"
          }, null), createVNode("span", {
            "class": "x-sider-tree_menu_title"
          }, [createVNode("div", {
            "class": "flex middle"
          }, [item.id])]), createVNode("div", {
            "class": "x-sider-tree_menu_opration"
          }, [genIcon({
            icon: "add",
            tips: xI("\u6DFB\u52A0"),
            clickHandler: () => vm.dialogUpsertI18nRecord(item.data)
          }), canDelete && genIcon({
            icon: "delete",
            tips: xI("\u5220\u9664"),
            clickHandler: () => vm.deleteArticle(_id)
          })])]);
        }
      })]);
    }
  },
  methods: {
    async handleDropArticle(e) {
      stateI18n.isLoading = true;
      const {
        dragNode: dragItem,
        node: dropItem,
        dropPosition,
        dropToGap
      } = e;
      const params = {
        dragItem: dragItem.dataRef,
        dropItem: dropItem.dataRef,
        dropToGap,
        dropPosition
      };
      try {
        await this.moveItemAndResetOrder(params);
      } catch (error) {
        xU.message.error(error.message);
      } finally {
        stateI18n.isLoading = false;
      }
    },
    async moveItemAndResetOrder({
      dragItem,
      dropItem,
      dropToGap,
      dropPosition
    }) {
      dragItem = {
        ...dragItem
      };
      dropItem = {
        ...dropItem
      };
      const menuOrderArray = getTreeOrder(stateI18n.i18nRecordArray);
      const dragIndex = menuOrderArray.indexOf(dragItem._id);
      const dropIndex = menuOrderArray.indexOf(dropItem._id);
      if (dropToGap) {
        dragItem.p_id = dropItem.p_id;
        menuOrderArray.splice(dragIndex, 1);
        menuOrderArray.splice(dropIndex, 0, dragItem._id);
      } else {
        dragItem.p_id = dropItem._id;
      }
      try {
        await API.wiki.action({
          action: "upsertOne",
          data: dragItem
        });
        await API.wiki.resetMenuOrder({
          order: menuOrderArray,
          belong_type: "all"
        });
        await Methods_Wiki$1.updateWikiMenuList({
          belong_type: "all"
        });
        xU.message.success(xI("\u66F4\u65B0\u6210\u529F"));
      } catch (error) {
        xU.message.error(error.message);
      }
    },
    setFilterText: xU.debounce(function(filterText) {
      stateI18n.filterText = filterText;
      stateI18n.isLoading = false;
    }, 600),
    setSiderHeight: xU.debounce(function(siderHeight) {
      this.siderHeight = siderHeight;
    }, 20),
    deleteArticle(_id) {
      const vm = this;
      xU.confirm({
        title: "\u786E\u5B9A\u5220\u9664\u6B64\u6587\u6863\u5417\uFF1F",
        content: `\u6587\u6863\u5220\u9664\u540E\u65E0\u6CD5\u6062\u590D`,
        async onOk() {
          var _a;
          try {
            await API.wiki.delete(_id);
            xU.message.success("\u5220\u9664\u6587\u6863\u6210\u529F");
            await Methods_Wiki$1.updateWikiMenuList({
              belong_type: "all"
            });
            vm.cptRouter.go("/xI", {
              wiki_id: (_a = xU.first(stateI18n.i18nRecordArray)) == null ? void 0 : _a._id
            });
          } catch (error) {
            xU.message.error(error.message);
            return Promise.reject();
          }
        }
      });
    },
    dialogUpsertI18nRecord(record) {
      xU.dialog({
        title: xI("\u6DFB\u52A0\u8BB0\u5F55"),
        record,
        component: DialogUpsertI18nRecord
      });
    }
  },
  render() {
    return createVNode("aside", {
      "class": "x-sider_wrapper",
      "style": this.styleAside
    }, [createVNode("div", {
      "class": "x-sider_wrapper_tree",
      "ref": "wrapper"
    }, [this.vDomTree]), withDirectives(createVNode("div", {
      "class": "resize_bar",
      "icon": "scroll"
    }, null), [[resolveDirective("uiMove"), this.configsResize]])]);
  }
});
const DialogImportI18nJSON = defineComponent({
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
  data() {
    return {
      isLoading: false,
      isShowCoverView: false,
      raw$configsTableExistedRecords: {}
    };
  },
  computed: {
    configsBtnCancel() {
      return {
        preset: "cancel",
        onClick: this.propOptions.$close
      };
    },
    configsBtnUpdateExistedRecord() {
      return {
        text: xI("\u8986\u76D6"),
        disabled: () => {
          var _a;
          return !xU.isArrayFill((_a = this == null ? void 0 : this.raw$configsTableExistedRecords) == null ? void 0 : _a.selected);
        },
        onClick: this.onCoverExisted
      };
    }
  },
  created() {
    this.handleChangeDebounce = xU.debounce(async (file) => {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const {
          data
        } = await API.god.importI18nJSON(formData);
        const {
          different
        } = data;
        xU.message.success(`\u6210\u529F\u6DFB\u52A0\u8BB0\u5F55`);
        if (xU.isArrayFill(different)) {
          this.showCoverExistedConfirm(data);
        } else {
          await stateI18n._$updateList();
          this.propOptions.$close();
        }
      } catch (error) {
        xU(error);
      } finally {
        this.isLoading = false;
      }
    }, 1e3);
    this.handleChange = (file) => {
      this.isLoading = true;
      this.handleChangeDebounce(file);
      return false;
    };
  },
  methods: {
    showCoverExistedConfirm({
      existed,
      different
    }) {
      this.raw$tips = createVNode(Fragment, null, [createVNode("div", null, [`\u6709${different.length}\u6761\u8BB0\u5F55\u6709\u53D8\u5316,\u8BF7\u9009\u62E9\u9700\u8981\u8986\u76D6\u7684\u8BB0\u5F55`])]);
      this.raw$configsTableExistedRecords = defXVirTableConfigs({
        rowHeight: 120,
        dataSource: xU.map(different, (i) => ({
          ...i,
          _id: i.existedRecord._id
        })),
        selectedConfigs: {
          type: "many",
          prop: "_id"
        },
        columns: {
          ...defCol({
            label: "key",
            prop: "key",
            renderCell({
              record
            }) {
              return record.existedRecord.key;
            }
          }),
          ...defCol({
            label: xI("\u63CF\u8FF0"),
            width: "80px",
            prop: "desc",
            renderCell({
              record
            }) {
              return record.existedRecord.desc;
            }
          }),
          ...defCol({
            label: xI("diff"),
            prop: "different",
            renderCell({
              record
            }) {
              var _a, _b, _c;
              let valueArray, desc;
              if ((_a = record == null ? void 0 : record.diffRes) == null ? void 0 : _a.valueArray) {
                valueArray = record.diffRes.valueArray.map(JSON.parse);
                valueArray = createVNode(resolveComponent("xInfoDiffCard"), {
                  "title": "valueArray",
                  "old": JSON.stringify(valueArray[1], null, 2),
                  "new": JSON.stringify(valueArray[0], null, 2)
                }, null);
              }
              if ((_b = record == null ? void 0 : record.diffRes) == null ? void 0 : _b.desc) {
                desc = (_c = record == null ? void 0 : record.diffRes) == null ? void 0 : _c.desc;
                desc = createVNode(resolveComponent("xInfoDiffCard"), {
                  "title": xI("\u63CF\u8FF0"),
                  "old": desc[1],
                  "new": desc[0]
                }, null);
              }
              return createVNode("div", {
                "class": "height100 overflow-auto width100"
              }, [valueArray, desc]);
            }
          })
        }
      });
      this.isShowCoverView = true;
      this.$nextTick(() => this.propOptions.dialogInst.offset());
    },
    async onCoverExisted() {
      try {
        const selected = this.raw$configsTableExistedRecords.getSelectedRow();
        const params = xU.map(selected, ({
          diffRes,
          existedRecord
        }) => {
          return {
            ...existedRecord,
            valueArray: diffRes.valueArray ? diffRes.valueArray[0] : existedRecord.valueArray,
            desc: diffRes.desc ? diffRes.desc[0] : existedRecord.desc
          };
        });
        await API.god.upsertI18nRecordMany(params);
        xU.message.success(`\u4FEE\u6539\u8BB0\u5F55\u6210\u529F`);
        await stateI18n._$updateList();
        this.propOptions.$close();
      } catch (error) {
        xU(error);
      }
    }
  },
  render({
    isShowCoverView,
    raw$tips
  }) {
    if (isShowCoverView) {
      return createVNode(Fragment, null, [createVNode("div", {
        "class": "x-dialog-boddy-wrapper margin20 flex vertical",
        "style": "height:40vh"
      }, [createVNode(resolveComponent("elAlert"), {
        "title": raw$tips
      }, null), createVNode(resolveComponent("xGap"), {
        "t": true
      }, null), createVNode(resolveComponent("xVirTable"), {
        "configs": this.raw$configsTableExistedRecords,
        "class": "flex1 width100 "
      }, null)]), createVNode(resolveComponent("xDialogFooter"), null, {
        default: () => [createVNode(resolveComponent("xGap"), {
          "f": "1"
        }, null), createVNode(resolveComponent("xButton"), {
          "configs": this.configsBtnCancel
        }, null), createVNode(resolveComponent("xButton"), {
          "configs": this.configsBtnUpdateExistedRecord
        }, null)]
      })]);
    }
    return withDirectives(createVNode("div", {
      "class": "x-dialog-boddy-wrapper margin20"
    }, [createVNode(resolveComponent("aUploadDragger"), {
      "name": "file",
      "beforeUpload": this.handleChange,
      "multiple": false
    }, {
      default: () => [createVNode("p", {
        "class": "ant-upload-drag-icon"
      }, [createVNode(resolveComponent("xIcon"), {
        "icon": "icon_inbox"
      }, null)]), createVNode("p", {
        "class": "ant-upload-text"
      }, [xI("\u5355\u51FB\u6216\u62D6\u52A8\u6587\u4EF6\u5230\u6B64\u533A\u57DF\u8FDB\u884C\u4E0A\u4F20")])]
    })]), [[resolveDirective("xloading"), this.isLoading]]);
  }
});
const ViewI18n = defineComponent({
  setup() {
    return {
      cptRouter,
      stateI18n: useStateI18n()
    };
  },
  mounted() {
    stateI18n._$updateList();
  },
  data(vm) {
    return {
      configsI18nTable: defXVirTableConfigs({
        queryTableList() {
          stateI18n._$updateList();
        },
        rowHeight: 32,
        dataSource: [],
        selectedConfigs: {
          type: "many",
          prop: "_id"
        },
        columns: {
          ...defCol({
            label: "key",
            prop: "key"
          }),
          ...defCol({
            label: xI("\u63CF\u8FF0"),
            prop: "desc"
          }),
          ...defCol({
            label: xI("\u6821\u6B63"),
            width: "80px",
            prop: "isRectified",
            renderCell({
              record
            }) {
              return xU.valueToLabel(record.isRectified, ITEM_OPTIONS.trueOrFalse);
            }
          }),
          ...defColActions({
            renderCell({
              record
            }) {
              return defColActionsBtnlist({
                fold: 7,
                btns: [{
                  text: xI("\u67E5\u770BvalueArray"),
                  onClick: async () => {
                    await stateI18n._$updateCurrent(record._id);
                  }
                }, {
                  text: xI("\u4FEE\u6539"),
                  onClick: async () => {
                    await stateI18n._$updateCurrent(record._id);
                    xU.dialog({
                      title: xI("\u4FEE\u6539\u8BB0\u5F55"),
                      record: xU.cloneDeep(stateI18n.currentI18n),
                      component: DialogUpsertI18nRecord
                    });
                  }
                }, {
                  text: xI("\u5220\u9664"),
                  isShow: stateApp.user.role === ADMIN,
                  onClick: async () => {
                    vm.deleteI18nRecords([record]);
                  }
                }]
              });
            }
          })
        }
      })
    };
  },
  methods: {
    async exportRecordAsJson(records) {
      function download(url2, name) {
        const ElTag = document.createElement("a");
        ElTag.href = url2;
        ElTag.download = name;
        ElTag.click();
      }
      const {
        data
      } = await API.god.i18nRecords({
        ids: xU.map(records, (i) => i._id)
      });
      const content = JSON.stringify(xU.reduce(data, (target, d) => {
        target[d.key] = JSON.parse(d.valueArray);
        return target;
      }, {}), null, 2);
      const url = `data:,${content}`;
      download(url, "i18nRecords.json");
    },
    deleteI18nRecords(records) {
      xU.confirm({
        title: "\u786E\u5B9A\u5220\u9664\u8FD9\u4E9B\u5417\uFF1F",
        content: `\u8BB0\u5F55\u5220\u9664\u540E\u65E0\u6CD5\u6062\u590D`,
        async onOk() {
          try {
            await stateI18n._$deleteI18nRecords(records);
            xU.message.success("\u5220\u9664\u8BB0\u5F55\u6210\u529F");
            stateI18n._$updateList({});
          } catch (error) {
            xU.message.error(error.message);
            return Promise.reject();
          }
        }
      });
    }
  },
  computed: {
    btnImport() {
      return {
        text: xI("\u5BFC\u5165"),
        async onClick() {
          xU.dialog({
            title: xI("\u5BFC\u5165\u56FD\u9645\u5316JSON\u6587\u4EF6"),
            component: DialogImportI18nJSON
          });
        }
      };
    },
    btnDelete() {
      const vm = this;
      return {
        text: xI("\u5220\u9664"),
        isShow: stateApp.user.role === ADMIN,
        disabled() {
          return !xU.isArrayFill(vm.configsI18nTable.selected);
        },
        onClick() {
          vm.deleteI18nRecords(vm.configsI18nTable.getSelectedRow());
        }
      };
    },
    btnDownload() {
      const vm = this;
      return {
        text: xI("\u5BFC\u51FA"),
        disabled() {
          return !xU.isArrayFill(vm.configsI18nTable.selected);
        },
        onClick() {
          vm.exportRecordAsJson(vm.configsI18nTable.getSelectedRow());
        }
      };
    },
    modelCode: {
      get() {
        return JSON.stringify(stateI18n.currentI18n, null, 2);
      },
      set(val) {
        try {
          stateI18n.currentI18n = JSON.parse(val);
        } catch (error) {
        }
      }
    }
  },
  watch: {
    "stateI18n.i18nRecordArray"(i18nRecordArray) {
      setDataGridInfo(this.configsI18nTable, {
        data: i18nRecordArray
      });
    }
  },
  render() {
    var _a;
    return withDirectives(createVNode("section", {
      "id": "ViewI18n",
      "class": "flex flex1"
    }, [createVNode(I18nLeftSider, null, null), createVNode("main", {
      "class": "flex flex1 app-padding vertical"
    }, [createVNode(resolveComponent("xDataGridToolbar"), {
      "configs": this.configsI18nTable
    }, {
      default: () => [createVNode(resolveComponent("xButton"), {
        "configs": this.btnImport
      }, null), createVNode(resolveComponent("xGap"), {
        "l": "4"
      }, null), createVNode(resolveComponent("xButton"), {
        "configs": this.btnDownload
      }, null), createVNode(resolveComponent("xGap"), {
        "l": "4"
      }, null), createVNode(resolveComponent("xButton"), {
        "configs": this.btnDelete
      }, null)]
    }), createVNode(resolveComponent("xVirTable"), {
      "configs": this.configsI18nTable,
      "class": "flex1 width100 "
    }, null), ((_a = stateI18n.currentI18n) == null ? void 0 : _a.valueArray) && createVNode(resolveComponent("elCard"), null, {
      default: () => [createVNode("div", {
        "style": "height:300px"
      }, [createVNode(MonacoEditor, {
        "code": stateI18n.currentI18n.valueArray,
        "onUpdate:code": ($event) => stateI18n.currentI18n.valueArray = $event,
        "language": "json"
      }, null)])]
    })])]), [[resolveDirective("xloading"), stateI18n.isLoading]]);
  }
});
export {
  ViewI18n
};
