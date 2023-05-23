import { L as markRaw, x as xU, b as API, ab as newReactiveState, ac as onMounted, ad as onUnmounted, d as defineComponent, g as _State_App, C as Cpt_url, $ as $t$1, a as defItem, ae as VNodeCollection, e as createVNode, r as resolveComponent, F as FormRules, N as ITEM_OPTIONS, s as setValueTo, v as validateForm, A as AllWasWell, p as pickValueFrom, U as UI, k as Fragment, m as isVNode, B as $, D as getTreeOrder, G as withDirectives, H as resolveDirective, I as compositionAPI, O as defXVirTableConfigs, P as defCol, af as defColActions, W as setDataGridInfo, Z as MonacoEditor, ag as defColActionsBtnlist } from "./index.js";
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
      State_App: _State_App,
      Cpt_url
    };
  },
  data() {
    const idTipsMarkdown = `\`\`\`js
//${$t$1(`\u4F5C\u4E3AKey\u503C`).label}
$t("Key\u503C").label
\`\`\``;
    return {
      dataXItem: {
        ...defItem({
          value: "",
          prop: "key",
          label: $t$1("key").label,
          labelVNodeRender: VNodeCollection.labelTips(createVNode(resolveComponent("Mkit"), {
            "md": idTipsMarkdown
          }, null)),
          rules: [FormRules.required()]
        }),
        ...defItem({
          value: "",
          prop: "desc",
          label: $t$1("\u63CF\u8FF0").label,
          isTextarea: true,
          rules: [FormRules.required()]
        }),
        ...defItem({
          value: false,
          prop: "isRectified",
          label: $t$1("\u662F\u5426\u5DF2\u6821\u6B63").label,
          itemType: "Switch",
          options: ITEM_OPTIONS.trueOrFalse,
          rules: [FormRules.required()]
        }),
        ...defItem({
          value: "",
          prop: "valueArray",
          label: $t$1("\u56FD\u9645\u5316\u4FE1\u606F").label,
          labelVNodeRender: VNodeCollection.labelTips($t$1(`\u4EE5\u6570\u7EC4\u7684\u5F62\u5F0F["\u8BED\u8A00","language"]`).label),
          rules: [FormRules.required(), FormRules.stringIsArrayJson()],
          itemType: defineComponent({
            props: ["properties", "slots", "listeners", "propsWillDeleteFromConfigs"],
            computed: {
              _valueArray: {
                get() {
                  return this.properties.value || ``;
                },
                set(modelValue) {
                  this.listeners["onUpdate:value"](modelValue);
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
      if ((_b = (_a = this.propDialogOptions) == null ? void 0 : _a.record) == null ? void 0 : _b.valueArray) {
        setValueTo(this.dataXItem, (_c = this.propDialogOptions) == null ? void 0 : _c.record);
      }
    },
    async onOk() {
      var _a, _b;
      const validateResults = await validateForm(this.dataXItem);
      if (AllWasWell(validateResults)) {
        try {
          const {
            data
          } = await API.god.upsertOneI18nRecord({
            ...(_a = this.propDialogOptions) == null ? void 0 : _a.record,
            ...pickValueFrom(this.dataXItem)
          });
          if ((_b = data == null ? void 0 : data.msg) == null ? void 0 : _b._id) {
            UI.message.success("\u6DFB\u52A0\u8BB0\u5F55\u6210\u529F");
          } else {
            UI.message.success("\u4FEE\u6539\u8BB0\u5F55\u6210\u529F");
          }
          stateI18n._$updateList({});
          this.propDialogOptions.closeDialog();
        } catch (error) {
          UI.message.error("\u6DFB\u52A0\u5931\u8D25");
        }
      }
    }
  },
  render() {
    let _slot;
    return createVNode(Fragment, null, [createVNode("div", {
      "class": "x-dialog-boddy-wrapper flex1 height100"
    }, [createVNode(resolveComponent("xGap"), {
      "t": "10"
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
stateI18n._$resetSelf();
const I18nLeftSider = defineComponent({
  emits: ["change"],
  setup() {
    const {
      fnObserveDomResize,
      fnUnobserveDomResize
    } = usefnObserveDomResize();
    return {
      State_Wiki: stateI18n,
      State_App: _State_App,
      Cpt_url,
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
        text: $t$1("\u65B0\u589E").label,
        onClick: () => this.openDialogUpsertI18nRecord()
      };
    },
    btnRefresh() {
      return {
        preset: "refresh",
        onClick: () => Methods_Wiki.updateWikiMenuList({
          belong_type: "all"
        })
      };
    },
    vDomTree() {
      const vm = this;
      return createVNode("div", {
        "class": "elevation-2 height100 padding10",
        "style": "border-radius: 8px;"
      }, [createVNode("div", {
        "class": "flex mb10"
      }, [createVNode(resolveComponent("xButton"), {
        "configs": vm.btnAddNew
      }, null), createVNode(resolveComponent("xGap"), {
        "l": "10"
      }, null), createVNode(resolveComponent("xButton"), {
        "configs": vm.btnRefresh
      }, null)]), createVNode(resolveComponent("aTree"), {
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
            let _classString = "flex middle x-sider-tree_menu";
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
            }, null), [[resolveDirective("uiPopover"), {
              content: tips,
              delay: 1e3
            }]]), createVNode(resolveComponent("xGap"), {
              "l": "8"
            }, null)]);
          };
          const handleClick = () => {
            stateI18n.isLoading = true;
            vm.Cpt_url.go("/i18n", {
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
            "class": "flex middle x-sider-tree_menu_opration"
          }, [genIcon({
            icon: "add",
            tips: vm.$t("\u6DFB\u52A0").label,
            clickHandler: () => vm.openDialogUpsertI18nRecord(item.data)
          }), canDelete && genIcon({
            icon: "delete",
            tips: vm.$t("\u5220\u9664").label,
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
        UI.message.error(error.message);
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
        await Methods_Wiki.updateWikiMenuList({
          belong_type: "all"
        });
        UI.message.success($t$1("\u66F4\u65B0\u6210\u529F").label);
      } catch (error) {
        UI.message.error(error.message);
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
      UI.dialog.confirm({
        title: "\u786E\u5B9A\u5220\u9664\u6B64\u6587\u6863\u5417\uFF1F",
        content: `\u6587\u6863\u5220\u9664\u540E\u65E0\u6CD5\u6062\u590D`,
        async onOk() {
          var _a;
          try {
            await API.wiki.delete(_id);
            UI.message.success("\u5220\u9664\u6587\u6863\u6210\u529F");
            await Methods_Wiki.updateWikiMenuList({
              belong_type: "all"
            });
            vm.Cpt_url.go("/i18n", {
              wiki_id: (_a = xU.first(stateI18n.i18nRecordArray)) == null ? void 0 : _a._id
            });
          } catch (error) {
            UI.message.error(error.message);
            return Promise.reject();
          }
        }
      });
    },
    openDialogUpsertI18nRecord(record) {
      UI.dialog.component({
        title: this.$t("\u6DFB\u52A0\u8BB0\u5F55").label,
        record,
        component: DialogUpsertI18nRecord
      });
    }
  },
  render() {
    return createVNode("aside", {
      "class": "x-sider_wrapper flex vertical move-transition padding10",
      "style": this.styleAside
    }, [createVNode("div", {
      "class": "x-sider_wrapper_tree flex1 mt10 mb10",
      "ref": "wrapper"
    }, [this.vDomTree]), withDirectives(createVNode("div", {
      "class": "resize_bar",
      "icon": "scroll"
    }, null), [[resolveDirective("uiMove"), this.configsResize]])]);
  }
});
const DialogImportI18nJSON = defineComponent({
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
        onClick: this.propDialogOptions.closeDialog
      };
    },
    configsBtnUpdateExistedRecord() {
      return {
        text: $t$1("\u8986\u76D6").label,
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
        UI.message.success(`\u6210\u529F\u6DFB\u52A0\u8BB0\u5F55`);
        if (xU.isArrayFill(different)) {
          this.showCoverExistedConfirm(data);
        } else {
          await stateI18n._$updateList();
          this.propDialogOptions.closeDialog();
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
            label: $t$1("\u63CF\u8FF0").label,
            width: "80px",
            prop: "desc",
            renderCell({
              record
            }) {
              return record.existedRecord.desc;
            }
          }),
          ...defCol({
            label: $t$1("diff").label,
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
                  "title": $t$1("\u63CF\u8FF0").label,
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
      this.$nextTick(() => this.propDialogOptions._layerInstance.offset());
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
        UI.message.success(`\u4FEE\u6539\u8BB0\u5F55\u6210\u529F`);
        await stateI18n._$updateList();
        this.propDialogOptions.closeDialog();
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
      }, [createVNode(resolveComponent("aAlert"), {
        "message": raw$tips
      }, null), createVNode(resolveComponent("xGap"), {
        "t": "10"
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
      "class": "x-dialog-boddy-wrapper flex1 height100 margin20"
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
      }, [$t$1("\u5355\u51FB\u6216\u62D6\u52A8\u6587\u4EF6\u5230\u6B64\u533A\u57DF\u8FDB\u884C\u4E0A\u4F20").label])]
    })]), [[resolveDirective("loading"), this.isLoading]]);
  }
});
const ViewI18n = defineComponent({
  setup() {
    return {
      Cpt_url,
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
            label: $t$1("\u63CF\u8FF0").label,
            prop: "desc"
          }),
          ...defCol({
            label: $t$1("\u6821\u6B63").label,
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
                  text: $t$1("\u67E5\u770BvalueArray").label,
                  onClick: async () => {
                    await stateI18n._$updateCurrent(record._id);
                  }
                }, {
                  text: $t$1("\u4FEE\u6539").label,
                  onClick: async () => {
                    await stateI18n._$updateCurrent(record._id);
                    UI.dialog.component({
                      title: this.$t("\u4FEE\u6539\u8BB0\u5F55").label,
                      record: xU.cloneDeep(stateI18n.currentI18n),
                      component: DialogUpsertI18nRecord
                    });
                  }
                }, {
                  text: $t$1("\u5220\u9664").label,
                  isShow: _State_App.user.role === "admin",
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
        const aTag = document.createElement("a");
        aTag.href = url2;
        aTag.download = name;
        aTag.click();
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
      UI.confirm({
        title: "\u786E\u5B9A\u5220\u9664\u8FD9\u4E9B\u5417\uFF1F",
        content: `\u8BB0\u5F55\u5220\u9664\u540E\u65E0\u6CD5\u6062\u590D`,
        async onOk() {
          try {
            await stateI18n._$deleteI18nRecords(records);
            UI.message.success("\u5220\u9664\u8BB0\u5F55\u6210\u529F");
            stateI18n._$updateList({});
          } catch (error) {
            UI.message.error(error.message);
            return Promise.reject();
          }
        }
      });
    }
  },
  computed: {
    btnImport() {
      return {
        text: $t$1("\u5BFC\u5165").label,
        async onClick() {
          await UI.dialog.component({
            title: $t$1("\u5BFC\u5165\u56FD\u9645\u5316JSON\u6587\u4EF6").label,
            component: DialogImportI18nJSON
          });
        }
      };
    },
    btnDelete() {
      const vm = this;
      return {
        text: $t$1("\u5220\u9664").label,
        isShow: _State_App.user.role === "admin",
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
        text: $t$1("\u5BFC\u51FA").label,
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
      "class": "flex flex1 padding10 vertical paddingB20"
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
    }, null), ((_a = stateI18n.currentI18n) == null ? void 0 : _a.valueArray) && createVNode(resolveComponent("aCard"), null, {
      default: () => [createVNode("div", {
        "style": "height:300px"
      }, [createVNode(MonacoEditor, {
        "code": stateI18n.currentI18n.valueArray,
        "onUpdate:code": ($event) => stateI18n.currentI18n.valueArray = $event,
        "language": "json"
      }, null)])]
    })])]), [[resolveDirective("loading"), stateI18n.isLoading]]);
  }
});
export {
  ViewI18n
};
