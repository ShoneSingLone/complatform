import { i as reactive, x as xU, b as API, j as watch, s as setDocumentTitle, d as defineComponent, g as _State_App, a as defItem, $ as $t, F as FormRules, v as validateForm, A as AllWasWell, p as pickValueFrom, k as ARTICLE, U as UI, e as createVNode, r as resolveComponent, m as Fragment, n as isVNode, C as Cpt_url, q as $, t as withDirectives, u as resolveDirective, y as compositionAPI } from "./index.js";
import { T as TuiEditor } from "./TuiEditor.js";
const ViewWiki$1 = "";
const defautlValue = () => ({
  treeData: [],
  isLoading: false,
  allWiki: {},
  currentWiki: {},
  expandedKeys: []
});
const _State_Wiki = defautlValue();
const State_Wiki = reactive(_State_Wiki);
const Methods_Wiki = {
  setExpandedKeys: xU.debounce(async (_id) => {
    const expandedKeys = new Set(State_Wiki.expandedKeys);
    let currentWiki = State_Wiki.allWiki[_id];
    while (currentWiki) {
      expandedKeys.add(currentWiki._id);
      if (currentWiki.p_id !== 0) {
        currentWiki = State_Wiki.allWiki[currentWiki.p_id];
      } else {
        currentWiki = null;
      }
    }
    State_Wiki.expandedKeys = [...expandedKeys];
  }, 1e3),
  async setCurrentWiki(_id, item) {
    if (!xU.isInput(_id)) {
      return;
    } else if (item) {
      State_Wiki.currentWiki = item;
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
        State_Wiki.currentWiki = data;
        Methods_Wiki.setExpandedKeys(_id);
      }
    }
  },
  async updateWikiMenuList() {
    const {
      data
    } = await API.wiki.menu();
    State_Wiki.treeData = buildTree(data.list);
  }
};
watch(() => {
  var _a;
  return (_a = State_Wiki == null ? void 0 : State_Wiki.currentWiki) == null ? void 0 : _a.title;
}, () => {
  var _a;
  setDocumentTitle(`\u6587\u6863-${(_a = State_Wiki.currentWiki) == null ? void 0 : _a.title}`);
});
function buildTree(dataArray) {
  State_Wiki.allWiki = xU.reduce(dataArray, (target, i) => {
    target[i._id] = i;
    return target;
  }, {});
  xU.each(State_Wiki.allWiki, function(item) {
    if (!item)
      return;
    const parent = State_Wiki.allWiki[item.p_id];
    if (parent) {
      if (!xU.isArray(parent.children)) {
        parent.children = [];
      }
      parent.children.push(item);
    }
  });
  const tree = xU.filter(State_Wiki.allWiki, (item) => item.p_id === 0);
  return tree;
}
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const DialogAddArticle = defineComponent({
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
          prop: "title",
          label: $t("\u6587\u6863\u540D\u79F0").label,
          placeholder: $t("\u6587\u6863\u540D\u79F0").label,
          rules: [FormRules.required()]
        })
      }
    };
  },
  computed: {
    pid() {
      var _a;
      const _id = (_a = this.propDialogOptions.parentDoc) == null ? void 0 : _a._id;
      return _id || 0;
    }
  },
  mounted() {
    this.propDialogOptions.vm = this;
  },
  methods: {
    async onOk() {
      const validateResults = await validateForm(this.dataXItem);
      if (AllWasWell(validateResults)) {
        const {
          title
        } = pickValueFrom(this.dataXItem);
        const params = {
          title,
          type: ARTICLE,
          p_id: this.pid
        };
        try {
          const {
            data
          } = await API.wiki.action({
            action: "upsertOne",
            data: params
          });
          if (data) {
            UI.message.success("\u6DFB\u52A0\u63A5\u53E3\u6210\u529F");
            Methods_Wiki.updateWikiMenuList();
            Methods_Wiki.setCurrentWiki(data.msg._id);
            this.propDialogOptions.closeDialog();
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
      "message": this.$t("\u4FDD\u5B58\u6807\u9898\u540E\u518D\u7F16\u8F91\u6587\u6863\u5185\u5BB9").label,
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
const WikiLeftSider = defineComponent({
  emits: ["change"],
  setup() {
    const {
      fnObserveDomResize,
      fnUnobserveDomResize
    } = usefnObserveDomResize();
    return {
      State_Wiki,
      State_App: _State_App,
      Cpt_url,
      fnObserveDomResize,
      fnUnobserveDomResize
    };
  },
  watch: {
    filterText(text) {
      this.State_Wiki.isLoading = true;
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
      const siderHeight = Math.floor($(this.$refs.wrapper).height()) - 20;
      this.setSiderHeight(siderHeight);
    });
    const _id = this.Cpt_url.query.wiki_id;
    if (_id) {
      Methods_Wiki.setCurrentWiki(_id);
    }
  },
  beforeUnmount() {
    this.fnUnobserveDomResize(this.$refs.wrapper);
  },
  computed: {
    btnAddNew() {
      return {
        text: $t("\u65B0\u589E").label,
        onClick: () => this.showUpsertArticleDialog()
      };
    },
    btnRefresh() {
      return {
        preset: "refresh",
        onClick: Methods_Wiki.updateWikiMenuList
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
        "expandedKeys": vm.State_Wiki.expandedKeys,
        "onUpdate:expandedKeys": ($event) => vm.State_Wiki.expandedKeys = $event,
        "height": vm.siderHeight,
        "treeData": vm.State_Wiki.treeData,
        "draggable": true,
        "onDrop": vm.handleDropInterface,
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
            if (String(_id) == String(vm.State_Wiki.currentWiki._id)) {
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
            vm.Cpt_url.go("/wiki", {
              wiki_id: item.data._id
            });
            Methods_Wiki.setCurrentWiki(item.data._id);
            vm.$emit("change");
          };
          const canDelete = !(item == null ? void 0 : item.children) || ((_a = item == null ? void 0 : item.children) == null ? void 0 : _a.length) === 0;
          return createVNode("div", {
            "class": classContentString,
            "onClick": handleClick
          }, [createVNode(resolveComponent("xGap"), {
            "l": "10"
          }, null), createVNode(resolveComponent("xIcon"), {
            "icon": "article"
          }, null), createVNode("span", {
            "class": "x-sider-tree_menu_title"
          }, [createVNode("div", {
            "class": "flex middle"
          }, [title])]), createVNode("div", {
            "class": "flex middle x-sider-tree_menu_opration"
          }, [genIcon({
            icon: "add",
            tips: vm.$t("\u6DFB\u52A0").label,
            clickHandler: () => vm.showUpsertArticleDialog(item.data)
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
    async handleDropInterface(e) {
      this.State_Wiki.isLoading = true;
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
        await this.moveItemToFolder(params);
      } catch (error) {
        UI.message.error(error.message);
      } finally {
        this.State_Wiki.isLoading = false;
      }
    },
    async moveItemToFolder({
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
      if (dropToGap) {
        dragItem.p_id = dropItem.p_id;
      } else {
        dragItem.p_id = dropItem._id;
      }
      try {
        await API.wiki.action({
          action: "upsertOne",
          data: dragItem
        });
        await Methods_Wiki.updateWikiMenuList();
        UI.message.success($t("\u66F4\u65B0\u6210\u529F").label);
      } catch (error) {
        UI.message.error(error.message);
      }
    },
    setFilterText: xU.debounce(function(filterText) {
      this.State_Wiki.filterText = filterText;
      this.State_Wiki.isLoading = false;
    }, 600),
    setSiderHeight: xU.debounce(function(siderHeight) {
      this.siderHeight = siderHeight;
    }, 20),
    deleteArticle(_id) {
      UI.dialog.confirm({
        title: "\u786E\u5B9A\u5220\u9664\u6B64\u6587\u6863\u5417\uFF1F",
        content: `\u6587\u6863\u5220\u9664\u540E\u65E0\u6CD5\u6062\u590D`,
        async onOk() {
          var _a;
          try {
            await API.wiki.delete(_id);
            UI.message.success("\u5220\u9664\u6587\u6863\u6210\u529F");
            await Methods_Wiki.updateWikiMenuList();
            Methods_Wiki.setCurrentWiki((_a = xU.first(State_Wiki.treeData)) == null ? void 0 : _a._id);
          } catch (error) {
            UI.message.error(error.message);
            return Promise.reject();
          }
        }
      });
    },
    showUpsertArticleDialog(parentDoc) {
      UI.dialog.component({
        title: this.$t("\u6DFB\u52A0\u6587\u6863").label,
        parentDoc,
        component: DialogAddArticle
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
const ViewWiki = defineComponent({
  setup() {
    return {
      State_Wiki
    };
  },
  mounted() {
    Methods_Wiki.updateWikiMenuList();
  },
  data(vm) {
    return {
      title: "",
      titleConfigs: defItem.item({
        placeholder: $t("\u6587\u6863\u540D\u79F0").label
      }),
      isReadonly: defItem.item({
        value: true,
        itemType: "Switch",
        checkedChildren: $t("\u9884\u89C8").label
      }),
      btnSave: {
        preset: "save",
        isShow() {
          return !vm.isReadonly.value;
        },
        onClick: vm.save
      }
    };
  },
  methods: {
    async save() {
      const params = xU.merge({}, this.State_Wiki.currentWiki, {
        markdown: this.markdown
      }, {
        title: this.title
      });
      await API.wiki.action({
        action: "upsertOne",
        data: params
      });
      Methods_Wiki.updateWikiMenuList();
      Methods_Wiki.setCurrentWiki(params._id, params);
      UI.message.success($t("\u4FDD\u5B58\u6210\u529F").label);
    }
  },
  computed: {
    wikiContent: {
      get() {
        return {
          md: this.State_Wiki.currentWiki.markdown || ""
        };
      },
      set(modelValue, oldModelValue) {
        this.State_Wiki.currentWiki.markdown = modelValue.md;
      }
    },
    vDomTitle() {
      if (this.isReadonly.value) {
        return createVNode("span", {
          "class": "ml10",
          "style": "font-weight:700;font-size:18px;"
        }, [this.State_Wiki.currentWiki.title]);
      } else {
        return createVNode(Fragment, null, [createVNode(resolveComponent("xItem"), {
          "configs": this.titleConfigs,
          "modelValue": this.State_Wiki.currentWiki.title,
          "onUpdate:modelValue": (val) => this.title = val
        }, null)]);
      }
    }
  },
  render({
    btnSave,
    vDomTitle
  }) {
    return createVNode("section", {
      "id": "ViewWiki",
      "class": "flex flex1"
    }, [createVNode(WikiLeftSider, {
      "onChange": () => this.isReadonly.value = true
    }, null), createVNode("main", {
      "class": "flex flex1 padding10 vertical paddingB20"
    }, [createVNode("div", {
      "class": "flex mb10 middle",
      "style": "height:48px;"
    }, [createVNode(resolveComponent("xItem"), {
      "configs": this.isReadonly
    }, null), vDomTitle, createVNode(resolveComponent("xGap"), {
      "f": "1"
    }, null), createVNode(resolveComponent("xButton"), {
      "configs": btnSave
    }, null)]), createVNode(TuiEditor, {
      "modelValue": this.wikiContent,
      "onUpdate:modelValue": ($event) => this.wikiContent = $event,
      "isReadonly": this.isReadonly.value
    }, null)])]);
  }
});
export {
  ViewWiki
};
