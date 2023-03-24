import { d as defineComponent, g as _State_App, x as xU, F as FormRules, b as API, M as Methods_App, U as UI, e as createVNode, r as resolveComponent, h as createTextVNode, m as Fragment, a as defItem, $ as $t, I as ITEM_OPTIONS, G as setValueTo, v as validateForm, A as AllWasWell, p as pickValueFrom, a9 as Methods_ProjectInterface, n as isVNode, t as withDirectives, u as resolveDirective } from "./index.js";
import { o as orderAsc, R as RequestArgsPanel, T as TuiEditor, a as ResponsePanel, D as DialogUpsertProxyEnv } from "./TuiEditor.js";
function genTag(name, desc, index) {
  return {
    nameConfigs: defItem.item({
      prop: "name" + index,
      placeholder: "tag\u540D\u79F0",
      value: name
    }),
    descConfigs: defItem.item({
      prop: "desc" + index,
      placeholder: "tag\u63CF\u8FF0\u4FE1\u606F",
      value: desc
    })
  };
}
const DialogUpsertTags = defineComponent({
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
      privateTags: {}
    };
  },
  watch: {
    formData() {
      this.checkFormDataDebounce();
    },
    "State_App.currProject.tag": {
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
      if (this.State_App.currProject._id) {
        return this.State_App.currProject._id;
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
        await Methods_App.setCurrProject(this.propProjectId, {
          isEnforce: true
        });
        UI.message.success("Tag\u4FEE\u6539\u6210\u529F");
        this.propDialogOptions.closeDialog();
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
          onClick: this.propDialogOptions.closeDialog
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
function _isSlot$1(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const DialogInterfaceStatusModify = defineComponent({
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
          prop: "status",
          label: $t("\u72B6\u6001").label,
          value: ITEM_OPTIONS.interfaceStatus[0].value,
          options: ITEM_OPTIONS.interfaceStatus,
          itemType: "Select"
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
      const {
        selected
      } = this.propDialogOptions;
      if (AllWasWell(validateResults)) {
        const {
          status
        } = pickValueFrom(this.dataXItem);
        try {
          const res = await Promise.all(xU.map(selected, (id) => API.project.updateInterface({
            id,
            status
          })));
          Methods_ProjectInterface.updateInterfaceMenuList();
          this.propDialogOptions.closeDialog();
          UI.message.success(this.$t("\u4FEE\u6539_\u6210\u529F", {
            title: "\u72B6\u6001"
          }).label);
        } catch (error) {
          UI.message.error(this.$t("\u4FEE\u6539_\u5931\u8D25", {
            title: "\u72B6\u6001"
          }).label);
        }
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
const DialogInterfaceProxyModify = defineComponent({
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
  watch: {
    "State_App.currProject": {
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
        ...defItem({
          prop: "isProxy",
          value: false,
          label: vm.$t("\u662F\u5426\u5F00\u542F\u8F6C\u53D1").label,
          options: ITEM_OPTIONS.trueOrFalse,
          itemType: "Switch"
        }),
        ...defItem({
          isShow() {
            return vm.dataXItem.isProxy.value;
          },
          prop: "witchEnv",
          label: vm.$t("\u8F6C\u53D1\u73AF\u5883").label,
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
      const {
        selected
      } = this.propDialogOptions;
      if (AllWasWell(validateResults)) {
        const {
          isProxy,
          witchEnv
        } = pickValueFrom(this.dataXItem);
        try {
          const res = await Promise.all(xU.map(selected, (id) => API.project.updateInterface({
            id,
            witchEnv,
            isProxy
          })));
          Methods_ProjectInterface.updateInterfaceMenuList();
          this.propDialogOptions.closeDialog();
          UI.message.success(this.$t("\u4FEE\u6539_\u6210\u529F", {
            title: "\u4EE3\u7406"
          }).label);
        } catch (error) {
          UI.message.error(this.$t("\u4FEE\u6539_\u5931\u8D25", {
            title: "\u4EE3\u7406"
          }).label);
        }
      }
    }
  },
  render() {
    return createVNode(Fragment, null, [createVNode("div", {
      "class": "g-row flex1 height100 "
    }, [createVNode(resolveComponent("xGap"), {
      "t": "10"
    }, null), createVNode(resolveComponent("xForm"), {
      "class": "flex",
      "labelStyle": {
        "min-width": "120px",
        width: "unset"
      }
    }, {
      default: () => [createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.isProxy
      }, null), createVNode(resolveComponent("xGap"), {
        "t": "10"
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.witchEnv,
        "class": "flex1"
      }, null)]
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
async function openProxyEnvDialog() {
  await UI.dialog.component({
    title: $t("\u7BA1\u7406\u9879\u76EE\u63A5\u53E3\u8F6C\u53D1\u73AF\u5883").label,
    component: DialogUpsertProxyEnv,
    keepTop: true
  });
}
async function openUpsertTagDialog() {
  await UI.dialog.component({
    title: $t("\u7BA1\u7406\u9879\u76EE\u63A5\u53E3Tags").label,
    component: DialogUpsertTags,
    keepTop: true
  });
}
const InpterfacePathParams = defineComponent({
  props: ["properties", "slots", "listeners", "propsWillDeleteFromConfigs"],
  methods: {
    fnUpdate(prop, value, index) {
      this.properties.value[index][prop] = value;
      this.listeners["onUpdate:value"](this.properties.value);
    }
  },
  render(vm) {
    return xU.map(vm.properties.value, (data, index) => {
      return createVNode("div", {
        "class": "flex middel mt10 width100"
      }, [createVNode(resolveComponent("aTag"), {
        "class": "mr10 flex middle",
        "style": "min-width:100px"
      }, {
        default: () => [data.name]
      }), createVNode("span", {
        "class": "mr10 flex1"
      }, [createVNode(resolveComponent("aInput"), {
        "value": data.example,
        "onUpdate:value": (val) => {
          this.fnUpdate("example", val, index);
        }
      }, null)]), createVNode("span", {
        "class": "flex1"
      }, [createVNode(resolveComponent("aInput"), {
        "value": data.desc,
        "onUpdate:value": (val) => {
          this.fnUpdate("desc", val, index);
        }
      }, null)])]);
    });
  }
});
const EnvSelectRender = defineComponent({
  props: ["properties", "slots", "listeners", "propsWillDeleteFromConfigs"],
  render(vm) {
    vm.properties.value = vm.properties.value || [];
    const options = vm.properties.options || [];
    const fnUpdate = (val) => {
      vm.listeners["onUpdate:value"](val);
    };
    const vDomOptions = xU.map(options, (item) => {
      return createVNode(resolveComponent("aSelectOption"), {
        "value": item.value,
        "key": item.value
      }, {
        default: () => [item.label]
      });
    });
    return createVNode("div", {
      "class": "flex overflow-auto"
    }, [createVNode(resolveComponent("aSelect"), {
      "placeholder": "\u8BF7\u9009\u62E9\u8F6C\u53D1\u73AF\u5883",
      "onChange": fnUpdate,
      "value": vm.properties.value
    }, _isSlot(vDomOptions) ? vDomOptions : {
      default: () => [vDomOptions]
    }), createVNode(resolveComponent("xGap"), {
      "l": "10"
    }, null), createVNode(resolveComponent("xButton"), {
      "configs": {
        text: $t("\u8F6C\u53D1\u73AF\u5883\u8BBE\u7F6E").label,
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
          this.listeners["onUpdate:value"](val);
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
          default: () => [withDirectives(createVNode("span", null, [item.name]), [[resolveDirective("uiPopover"), {
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
    }, [createVNode(resolveComponent("aSelect"), {
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
        text: vm.$t("Tag\u8BBE\u7F6E").label,
        onClick: openUpsertTagDialog
      },
      "class": "ml10",
      "type": "primary"
    }, null)]);
  }
});
const RequestArgsRender = defineComponent({
  props: ["properties", "slots", "listeners", "propsWillDeleteFromConfigs"],
  render() {
    var _a, _b, _c;
    return createVNode(RequestArgsPanel, {
      "params": (_a = this.properties) == null ? void 0 : _a.value,
      "apiMethod": (_c = (_b = this.properties) == null ? void 0 : _b.deepWatch) == null ? void 0 : _c.apiMethod,
      "onUpdate:params": this.listeners["onUpdate:value"]
    }, null);
  }
});
const MarkdownRender = defineComponent({
  props: ["properties", "slots", "listeners", "propsWillDeleteFromConfigs"],
  computed: {
    modelValue: {
      get() {
        var _a;
        return ((_a = this.properties) == null ? void 0 : _a.value) || {
          md: "",
          html: ""
        };
      },
      set(modelValue) {
        this.listeners["onUpdate:value"](modelValue);
      }
    }
  },
  render(vm) {
    return createVNode(TuiEditor, {
      "modelValue": vm.modelValue,
      "onUpdate:modelValue": ($event) => vm.modelValue = $event
    }, null);
  }
});
const ResponseRender = defineComponent({
  props: ["properties", "slots", "listeners", "propsWillDeleteFromConfigs"],
  computed: {
    body: {
      get() {
        var _a, _b;
        return ((_b = (_a = this.properties) == null ? void 0 : _a.value) == null ? void 0 : _b.res_body) || "";
      },
      set(res_body) {
        this.listeners["onUpdate:value"]({
          ...this.properties.value,
          res_body
        });
      }
    },
    resBodyType: {
      get() {
        var _a, _b;
        return ((_b = (_a = this.properties) == null ? void 0 : _a.value) == null ? void 0 : _b.res_body_type) || "";
      },
      set(res_body_type) {
        this.listeners["onUpdate:value"]({
          ...this.properties.value,
          res_body_type
        });
      }
    }
  },
  render(vm) {
    return createVNode(ResponsePanel, {
      "body": vm.body,
      "onUpdate:body": ($event) => vm.body = $event,
      "bodyType": vm.resBodyType,
      "onUpdate:bodyType": ($event) => vm.resBodyType = $event
    }, null);
  }
});
async function openDialogInterfaceStatusModify({
  selected
}) {
  await UI.dialog.component({
    title: $t("\u53D8\u66F4\u72B6\u6001").label,
    component: DialogInterfaceStatusModify,
    selected
  });
}
async function openDialogInterfaceProxyModify({
  selected
}) {
  await UI.dialog.component({
    title: $t("\u53D8\u66F4\u4EE3\u7406").label,
    component: DialogInterfaceProxyModify,
    selected
  });
}
export {
  EnvSelectRender as E,
  InpterfacePathParams as I,
  MarkdownRender as M,
  RequestArgsRender as R,
  TagSelectRender as T,
  openDialogInterfaceProxyModify as a,
  ResponseRender as b,
  openUpsertTagDialog as c,
  openProxyEnvDialog as d,
  openDialogInterfaceStatusModify as o
};
