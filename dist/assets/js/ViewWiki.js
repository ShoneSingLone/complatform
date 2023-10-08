import { d as defineComponent, s as stateApp, c as cptRouter, a as defItem, x as xI, i as itemsInvalid, G as GROUP, P as PROJECT, A as ARTICLE, b as API, e as xU, f as createVNode, r as resolveComponent, F as Fragment, g as isVNode, h as cpt_isPersonalWikiView, $, w as withDirectives, j as resolveDirective, k as getTreeOrder, l as compositionAPI } from "./index.js";
import { F as FormRules, p as pickValueFrom } from "./common.FormRules.js";
import { s as stateWiki, M as Methods_Wiki } from "./wiki.js";
import { T as TuiEditor } from "./TuiEditor.js";
import "./common.options.js";
const ViewWiki$1 = "";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const DialogAddArticle = defineComponent({
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
    return {
      dataXItem: {
        title: defItem({
          value: "",
          label: xI("\u6587\u6863\u540D\u79F0"),
          placeholder: xI("\u6587\u6863\u540D\u79F0"),
          rules: [FormRules.required()]
        })
      }
    };
  },
  computed: {
    pid() {
      var _a;
      const _id = (_a = this.propOptions.parentDoc) == null ? void 0 : _a._id;
      return _id || 0;
    },
    belong_type() {
      return this.propOptions.belong_type || "all";
    }
  },
  mounted() {
    this.propOptions.vm = this;
  },
  methods: {
    async onOk() {
      var _a;
      if (!await itemsInvalid()) {
        const {
          project_id,
          group_id
        } = this.cptRouter.query;
        let belong_id;
        if (stateWiki.belongType === GROUP) {
          belong_id = group_id;
        }
        if (stateWiki.belongType === PROJECT) {
          belong_id = project_id;
        }
        const {
          title
        } = pickValueFrom(this.dataXItem);
        const params = {
          title,
          type: ARTICLE,
          p_id: this.pid,
          belong_type: stateWiki.belongType,
          belong_id
        };
        try {
          const {
            data
          } = await API.wiki.upsertOne(params);
          if ((_a = data == null ? void 0 : data.msg) == null ? void 0 : _a._id) {
            xU.message.success("\u6DFB\u52A0\u6587\u6863\u6210\u529F");
            Methods_Wiki.updateWikiMenuList();
            Methods_Wiki.clickWiki({
              wiki_id: data.msg._id
            });
            this.propOptions.$close();
          }
        } catch (error) {
          xU.message.error(error || "\u6DFB\u52A0\u5931\u8D25");
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
      "title": xI("\u4FDD\u5B58\u6807\u9898\u540E\u518D\u7F16\u8F91\u6587\u6863\u5185\u5BB9"),
      "type": "info",
      "closable": true,
      "class": "width100"
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
const WikiLeftSider = defineComponent({
  props: ["isShow"],
  emits: ["change"],
  setup() {
    const {
      fnObserveDomResize,
      fnUnobserveDomResize
    } = usefnObserveDomResize();
    return {
      stateWiki,
      stateApp,
      cptRouter,
      cpt_isPersonalWikiView,
      fnObserveDomResize,
      fnUnobserveDomResize
    };
  },
  watch: {},
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
        isShow() {
          const {
            user_id
          } = cptRouter.value.query;
          if (user_id) {
            return String(user_id) === String(stateApp.user._id);
          }
          return true;
        },
        onClick: () => this.showUpsertArticleDialog()
      };
    },
    btnRefresh() {
      return {
        preset: "refresh",
        onClick: () => Methods_Wiki.updateWikiMenuList()
      };
    },
    vDomTree() {
      const vm = this;
      return createVNode("div", {
        "class": "left-tree box-shadow"
      }, [createVNode("div", {
        "class": "flex mb10 middle"
      }, [createVNode(resolveComponent("ElInput"), {
        "modelValue": vm.filterText,
        "onUpdate:modelValue": ($event) => vm.filterText = $event
      }, null), createVNode(resolveComponent("xGap"), {
        "l": "10"
      }, null), createVNode(resolveComponent("xIcon"), {
        "icon": "add",
        "onClick": vm.btnAddNew.onClick,
        "class": "icon-opreation_click"
      }, null), createVNode(resolveComponent("xGap"), {
        "l": "10"
      }, null), createVNode(resolveComponent("xIcon"), {
        "icon": "refresh",
        "onClick": vm.btnRefresh.onClick,
        "class": "icon-opreation_click"
      }, null)]), createVNode(resolveComponent("ElScrollbar"), {
        "height": vm.siderHeight,
        "class": "flex1"
      }, {
        default: () => [createVNode(resolveComponent("ElTree"), {
          "expandedKeys": vm.stateWiki.expandedKeys,
          "onUpdate:expandedKeys": ($event) => vm.stateWiki.expandedKeys = $event,
          "data": vm.stateWiki.treeData,
          "onNodeDragEnd": vm.handleDropArticle,
          "draggable": true,
          "node-key": "_id",
          "expand-on-click-node": false,
          "default-expand-all": true
        }, {
          default(item) {
            var _a;
            try {
              const {
                data
              } = item;
              const {
                title,
                _id,
                type
              } = data;
              const classContentString = (() => {
                let _classString = "x-sider-tree_menu";
                if (String(_id) == String(vm.stateWiki.currentWiki._id)) {
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
                }]])]);
              };
              const handleClick = () => {
                Methods_Wiki.clickWiki({
                  wiki_id: item.data._id
                });
                vm.$emit("change");
              };
              const canDelete = !(item == null ? void 0 : item.children) || ((_a = item == null ? void 0 : item.children) == null ? void 0 : _a.length) === 0;
              return createVNode("div", {
                "class": classContentString
              }, [createVNode("div", {
                "class": "x-sider-tree_menu_title",
                "onClick": handleClick
              }, [createVNode(resolveComponent("xGap"), {
                "l": "10",
                "onClick": handleClick
              }, null), createVNode(resolveComponent("xIcon"), {
                "icon": "icon_article",
                "onClick": handleClick
              }, null), createVNode(resolveComponent("xHighlight"), {
                "content": title,
                "filter": vm.filterText
              }, null)]), createVNode("div", {
                "class": "x-sider-tree_menu_opration"
              }, [genIcon({
                icon: "add",
                tips: xI("\u6DFB\u52A0"),
                clickHandler: () => vm.showUpsertArticleDialog(item.data)
              }), canDelete && genIcon({
                icon: "delete",
                tips: xI("\u5220\u9664"),
                clickHandler: () => vm.deleteArticle(_id)
              })])]);
            } catch (error) {
              return null;
            }
          }
        })]
      })]);
    }
  },
  methods: {
    async handleDropArticle(draggingNode, dropNode, dropType) {
      stateWiki.isLoading = true;
      const params = {
        dragItem: draggingNode.data,
        dropItem: dropNode.data,
        dropType
      };
      try {
        await this.moveItemAndResetOrder(params);
      } catch (error) {
        xU.message.error(error.message);
      } finally {
        stateWiki.isLoading = false;
      }
    },
    async moveItemAndResetOrder({
      dragItem,
      dropItem,
      dropType
    }) {
      dragItem = {
        ...dragItem
      };
      dropItem = {
        ...dropItem
      };
      if (dragItem._id == dropItem._id) {
        return;
      }
      const menuOrderArray = getTreeOrder(stateWiki.treeData);
      const dragIndex = menuOrderArray.indexOf(dragItem._id);
      if (dropType === "inner") {
        dragItem.p_id = dropItem._id;
      }
      if (dropType === "after") {
        dragItem.p_id = dropItem.p_id;
        menuOrderArray.splice(dragIndex, 1);
        const dropIndex = menuOrderArray.indexOf(dropItem._id);
        menuOrderArray.splice(dropIndex + 1, 0, dragItem._id);
      }
      if (dropType === "before") {
        dragItem.p_id = dropItem.p_id;
        menuOrderArray.splice(dragIndex, 1);
        let dropIndex = menuOrderArray.indexOf(dropItem._id);
        if (dropIndex === 0) {
          menuOrderArray.unshift(dragItem._id);
        } else {
          menuOrderArray.splice(dropIndex - 1, 0, dragItem._id);
        }
      }
      try {
        await API.wiki.upsertOne(dragItem);
        await API.wiki.resetMenuOrder({
          order: menuOrderArray,
          belong_type: stateWiki.belongType,
          belong_id: (() => {
            const {
              group_id,
              project_id
            } = cptRouter.value.query;
            const s_map = {
              group: group_id,
              project: project_id
            };
            return s_map[stateWiki.belongType];
          })()
        });
        await Methods_Wiki.updateWikiMenuList();
        xU.message.success(xI("\u66F4\u65B0\u6210\u529F"));
      } catch (error) {
        xU.message.error(error.message);
      }
    },
    setSiderHeight: xU.debounce(function(siderHeight) {
      this.siderHeight = siderHeight;
    }, 300),
    async deleteArticle(_id) {
      xU.deleteConfirm({
        content: `\u6587\u6863\u5220\u9664\u540E\u65E0\u6CD5\u6062\u590D`,
        async onOk() {
          var _a;
          try {
            await API.wiki.delete(_id);
            xU.message.success("\u5220\u9664\u6587\u6863\u6210\u529F");
            await Methods_Wiki.updateWikiMenuList();
            Methods_Wiki.clickWiki({
              wiki_id: (_a = xU.first(stateWiki.treeData)) == null ? void 0 : _a._id
            });
          } catch (error) {
            xU.message.error(error.message);
          }
        }
      });
    },
    showUpsertArticleDialog(parentDoc) {
      xU.dialog({
        title: xI("\u6DFB\u52A0\u6587\u6863"),
        parentDoc,
        belong_type: "all",
        component: DialogAddArticle
      });
    }
  },
  render() {
    if (!this.isShow) {
      return null;
    }
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
const ViewWiki = defineComponent({
  props: ["belongType"],
  setup() {
    return {
      stateWiki
    };
  },
  mounted() {
    stateWiki.__resetState({
      ctx: this
    });
    if (stateWiki.belongType) {
      Methods_Wiki.updateWikiMenuList();
    } else {
      cptRouter.value.go("/");
    }
  },
  data() {
    const vm = this;
    return {
      titleConfigs: defItem({
        value: stateWiki.currentWiki.title,
        itemWrapperClass: "flex1 mr10",
        isShow: () => !vm.isReadonly
      }),
      isReadonly: true
    };
  },
  methods: {
    async save() {
      try {
        xU.loading(true);
        const params = xU.merge({}, stateWiki.currentWiki, {
          markdown: this.markdown
        }, {
          title: this.titleConfigs.value
        });
        await API.wiki.upsertOne(params);
        Methods_Wiki.updateWikiMenuList();
        Methods_Wiki.setCurrentWiki(params._id, params);
        xU.message.success(xI("\u4FDD\u5B58\u6210\u529F"));
        this.titleConfigs.value = "";
        this.isReadonly = true;
      } catch (error) {
        console.error(error);
      } finally {
        xU.loading();
      }
    }
  },
  computed: {
    btnEditOrSave() {
      return {
        text: this.isReadonly ? xI("\u7F16\u8F91") : xI("\u4FDD\u5B58"),
        type: "primary",
        isShow: () => {
          var _a;
          return !!((_a = stateWiki.currentWiki) == null ? void 0 : _a._id);
        },
        onClick: () => {
          var _a;
          if (this.isReadonly) {
            this.isReadonly = false;
            this.titleConfigs.value = (_a = stateWiki.currentWiki) == null ? void 0 : _a.title;
          } else {
            this.save();
          }
        }
      };
    },
    btnCancel() {
      return {
        text: xI("\u53D6\u6D88"),
        isShow: () => {
          return !this.isReadonly;
        },
        onClick: () => {
          Methods_Wiki.setCurrentWiki();
          this.isReadonly = true;
        }
      };
    },
    wikiContent: {
      get() {
        return {
          md: stateWiki.currentWiki.markdown || ""
        };
      },
      set(modelValue) {
        stateWiki.currentWiki.markdown = modelValue.md;
      }
    },
    vDomTitle() {
      return createVNode(Fragment, null, [createVNode("span", {
        "class": "ml10 flex1",
        "style": {
          "font-weight": "700",
          "font-size": "18px",
          display: this.isReadonly ? "inline-block" : "none"
        }
      }, [stateWiki.currentWiki.title]), createVNode(resolveComponent("xItem"), {
        "id": "wiki-editor-title",
        "configs": this.titleConfigs
      }, null)]);
    }
  },
  render() {
    return withDirectives(createVNode("section", {
      "id": "ViewWiki"
    }, [createVNode(WikiLeftSider, {
      "onChange": () => this.isReadonly = true,
      "isShow": this.isReadonly
    }, null), createVNode("main", {
      "class": "flex flex1 app-padding vertical"
    }, [createVNode("div", {
      "class": "flex mb10 middle",
      "style": "height:48px;"
    }, [this.vDomTitle, createVNode(resolveComponent("xButton"), {
      "configs": this.btnCancel
    }, null), createVNode(resolveComponent("xGap"), {
      "r": "10"
    }, null), createVNode(resolveComponent("xButton"), {
      "configs": this.btnEditOrSave
    }, null)]), createVNode(TuiEditor, {
      "modelValue": this.wikiContent,
      "onUpdate:modelValue": ($event) => this.wikiContent = $event,
      "isReadonly": this.isReadonly
    }, null)])]), [[resolveDirective("xloading"), stateWiki.isLoading]]);
  }
});
export {
  ViewWiki
};
