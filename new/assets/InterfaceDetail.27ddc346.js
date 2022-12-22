import { d as defineComponent, g as _State_App, p as privateLodash, e as createVNode, r as resolveComponent, x as withDirectives, y as resolveDirective, F as FormRules, q as Fragment, b as API, M as Methods_App, U as UI, h as createTextVNode, a as defItem, m as pickValueFrom, B as diff, s as setValueTo, v as validateForm, A as AllWasWell, I as ITEM_OPTIONS, G as defXVirTableConfigs, H as defCol, J as compileVNode, K as MonacoEditor, Q as QUERY, L as GET, N as HTTP_METHOD, O as BODY, j as State_Project, V as VNodeCollection, t as markRaw, R as _$handlePath, S as State_UI, k as isVNode, $, C as Cpt_url, T as copyToClipboard, W as makeAhref, X as ITEM_OPTIONS_VDOM, Y as InfoCard } from "./index.9a01e62e.js";
function makeKeyValueObj(i) {
  return {
    key: i.name,
    value: i.value
  };
}
function makeNameValueObj(i) {
  return {
    name: i.key,
    value: i.value
  };
}
function orderAsc(a, b) {
  return a - b < 0 ? -1 : 1;
}
const InputKeyValue = defineComponent({
  props: [
    "items",
    "genItem",
    "fnCheck"
  ],
  emits: ["update:items"],
  setup() {
    return {
      State_App: _State_App
    };
  },
  data() {
    return {
      privateItems: {},
      isLoading: true
    };
  },
  watch: {
    formData() {
      this.isLoading = true;
      this.checkFormDataDebounce();
    }
  },
  mounted() {
    this.setPrivateItems();
  },
  computed: {
    formData() {
      const formData = privateLodash.reduce(this.privateItems, (formData2, privateTag, prop) => {
        formData2[prop] = {
          key: privateTag.keyConfigs.value,
          value: privateTag.valueConfigs.value
        };
        return formData2;
      }, {});
      return formData;
    },
    vDomItems() {
      const vDomItems = privateLodash.map(this.privateItems, ({
        valueConfigs,
        keyConfigs,
        _id
      }, index) => {
        return createVNode("div", {
          "class": "flex mt10 baseline",
          "key": index
        }, [createVNode(resolveComponent("xItem"), {
          "configs": keyConfigs
        }, null), createVNode(resolveComponent("xGap"), {
          "l": "10"
        }, null), createVNode("span", {
          "class": "flex middle"
        }, [createVNode(resolveComponent("xItem"), {
          "configs": valueConfigs
        }, null), createVNode(resolveComponent("xGap"), {
          "l": "10"
        }, null), withDirectives(createVNode(resolveComponent("xIcon"), {
          "icon": "delete",
          "onClick": () => this.deleteItem(index),
          "style": "color:red;",
          "class": "pointer"
        }, null), [[resolveDirective("loading"), this.isLoading]])])]);
      });
      return vDomItems;
    }
  },
  methods: {
    setPrivateItems() {
      const {
        items
      } = this;
      if (privateLodash.isArrayFill(items)) {
        let index = 1;
        this.privateItems = privateLodash.reduce(items, (_items, tag) => {
          _items[index] = this.genItem({
            ...tag,
            index
          });
          ++index;
          return _items;
        }, {});
      } else {
        this.privateItems = {
          0: this.genItem({
            index: 0
          })
        };
      }
    },
    checkFormDataDebounce: privateLodash.debounce(function() {
      if (this.isFormDataOk()) {
        const keys = Object.keys(this.formData).map(Number).sort(orderAsc);
        const value = privateLodash.reduce(keys, (_value, prop) => {
          const item = this.formData[prop];
          if (privateLodash.isInput(item.key)) {
            _value.push(item);
          }
          return _value;
        }, []);
        this.$emit("update:items", value);
      }
      this.isLoading = false;
    }, 1e3),
    isFormDataOk() {
      const res = privateLodash.map(this.formData, ({
        key
      }, prop) => {
        if (privateLodash.some(this.formData, ({
          key: _key
        }, _index) => {
          if (_index == prop) {
            return false;
          } else {
            return _key === key;
          }
        })) {
          this.privateItems[prop].keyConfigs.itemTips = {
            type: "error",
            msg: `${key} \u4E0E\u5DF2\u6709\u6807\u8BC6\u91CD\u590D`
          };
          return FormRules.FAIL;
        } else {
          if (this.fnCheck) {
            const isFail = this.fnCheck(this.privateItems[prop]);
            if (isFail == FormRules.FAIL) {
              return FormRules.FAIL;
            }
          }
          this.privateItems[prop].keyConfigs.itemTips = {
            type: "",
            msg: ""
          };
          return FormRules.SUCCESS;
        }
      });
      return !privateLodash.some(res, (i) => i === FormRules.FAIL);
    },
    deleteItem(index) {
      const keys = Object.keys(this.privateItems);
      if (keys.length === 1) {
        const prop = keys[0];
        this.privateItems[prop].keyConfigs.value = "";
        this.privateItems[prop].valueConfigs.value = "";
      } else {
        delete this.privateItems[index];
      }
    },
    addItem() {
      const keys = Object.keys(this.privateItems).map(Number).sort(orderAsc);
      const nextIndex = Number(privateLodash.last(keys)) + 1;
      this.privateItems[nextIndex] = this.genItem({
        index: nextIndex
      });
    }
  },
  render() {
    const vm = this;
    return createVNode(Fragment, null, [createVNode("div", {
      "class": "ml10 mr10"
    }, [this.vDomItems]), withDirectives(createVNode(resolveComponent("xIcon"), {
      "icon": "add",
      "style": "color:#1890ff;",
      "onClick": this.addItem,
      "class": "pointer mt10 ml10 mb10"
    }, null), [[resolveDirective("loading"), vm.isLoading]])]);
  }
});
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
        tags = privateLodash.cloneDeep(tags);
        if (privateLodash.isArrayFill(tags)) {
          let index = 0;
          this.privateTags = privateLodash.reduce(tags, (tags2, tag) => {
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
      const formData = privateLodash.reduce(this.privateTags, (formData2, privateTag, index) => {
        formData2[index] = {
          name: privateTag.nameConfigs.value,
          desc: privateTag.descConfigs.value
        };
        console.log(formData2, privateTag, index);
        return formData2;
      }, {});
      return formData;
    }
  },
  methods: {
    checkFormDataDebounce: privateLodash.debounce(function() {
      this.isFormDataOk();
    }, 1e3),
    isFormDataOk() {
      const res = privateLodash.map(this.formData, ({
        name
      }, index) => {
        if (privateLodash.some(this.formData, ({
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
      return !privateLodash.some(res, (i) => i === FormRules.FAIL);
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
      const nextIndex = privateLodash.last(keys) + 1;
      this.privateTags[nextIndex] = genTag("", "", nextIndex);
    },
    async onOk() {
      if (this.isFormDataOk()) {
        const data = {
          id: this.propProjectId,
          tag: privateLodash.map(this.formData, (item) => item)
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
      "style": "max-height:500px;overflow:auto;"
    }, [privateLodash.map(this.privateTags, (data, index) => {
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
const DialogUpsertProxyEnv = defineComponent({
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
      isLoading: true,
      privateEnv: {},
      currentSelected: "",
      configsForm: {
        ...defItem({
          label: "\u73AF\u5883\u540D\u79F0",
          prop: "name"
        }),
        ...defItem({
          label: "\u73AF\u5883\u57DF\u540D",
          prop: "domain",
          slots: {
            addonBefore: () => createVNode(resolveComponent("xItem"), {
              "configs": vm.configsForm.protocol
            }, null)
          },
          rules: [FormRules.custom({
            validator(value, {
              rule
            }) {
              if (value.length === 0) {
                rule.msg = "\u8BF7\u8F93\u5165\u73AF\u5883\u57DF\u540D!";
                return FormRules.FAIL;
              } else if (/\s/.test(value)) {
                rule.msg = "\u73AF\u5883\u57DF\u540D\u4E0D\u5141\u8BB8\u51FA\u73B0\u7A7A\u683C!";
                return FormRules.FAIL;
              } else {
                rule.msg = "";
                return FormRules.SUCCESS;
              }
            }
          })]
        }),
        ...defItem({
          prop: "protocol",
          itemType: "Select",
          options: ITEM_OPTIONS.httpProtocol,
          style: "width:100px;"
        }),
        ...defItem({
          value: [],
          label: "Header",
          prop: "header",
          itemType: KeyValuePanel,
          fnCheck(configs) {
            if (configs.keyConfigs.value === "Cookie") {
              configs.keyConfigs.itemTips = {
                type: "error",
                msg: `key \u4E0D\u80FD\u4E3A Cookie`
              };
              return FormRules.FAIL;
            } else {
              return FormRules.SUCCESS;
            }
          },
          genItem(args) {
            const {
              index,
              key,
              value
            } = args;
            return {
              _id: index,
              keyConfigs: defItem.item({
                prop: "key" + index,
                placeholder: "Header\u540D\u79F0",
                value: key || ""
              }),
              valueConfigs: defItem.item({
                prop: "value" + index,
                placeholder: "Header\u503C",
                value: value || ""
              })
            };
          }
        }),
        ...defItem({
          value: [],
          label: "Cookie",
          prop: "cookie",
          itemType: KeyValuePanel,
          genItem(args) {
            const {
              index,
              key,
              value
            } = args;
            return {
              _id: index,
              keyConfigs: defItem.item({
                prop: "key" + index,
                placeholder: "Cookie\u540D\u79F0",
                value: key || ""
              }),
              valueConfigs: defItem.item({
                prop: "value" + index,
                placeholder: "Cookie\u503C",
                value: value || ""
              })
            };
          }
        }),
        ...defItem({
          value: [],
          label: "global",
          prop: "global",
          itemType: KeyValuePanel,
          genItem(args) {
            const {
              index,
              key,
              value
            } = args;
            return {
              _id: index,
              keyConfigs: defItem.item({
                prop: "key" + index,
                placeholder: "global\u540D\u79F0",
                value: key || ""
              }),
              valueConfigs: defItem.item({
                prop: "value" + index,
                placeholder: "global\u503C",
                value: value || ""
              })
            };
          }
        })
      }
    };
  },
  watch: {
    "State_App.currProject.env": {
      immediate: true,
      handler(env) {
        if (!env) {
          return;
        }
        this.privateEnv = privateLodash.cloneDeep(env);
        let currentSelected = false;
        if (this.raw$EnvId) {
          currentSelected = privateLodash.find(this.privateEnv, {
            _id: this.raw$EnvId
          });
          this.raw$EnvId = false;
        }
        if (!currentSelected) {
          currentSelected = privateLodash.first(this.privateEnv);
        }
        if (currentSelected) {
          this.switchEvn(currentSelected, {
            isEnforce: true
          });
        }
      }
    },
    currentSelected: {
      immediate: true,
      handler() {
        this.isLoading = true;
        this.setFormValues();
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
    vDomLeftSide() {
      return createVNode("div", {
        "class": "env-list flex vertical flex1 width100 overflow-auto height100 "
      }, [privateLodash.map(this.privateEnv, (i) => {
        const className = i._id === this.currentSelected._id ? "delete-env-btn active" : "delete-env-btn";
        const fnDelete = (() => {
          if (/^new_env/.test(i._id)) {
            return async () => {
              try {
                await UI.dialog.confirm({
                  content: `\u5220\u9664\u73AF\u5883\u53D8\u91CF${i.name}?`
                });
                const envIndex = privateLodash.findIndex(this.privateEnv, {
                  _id: i._id
                });
                this.privateEnv.splice(envIndex, 1);
              } catch (error) {
              }
            };
          }
          return async () => this.deleteEnv(i);
        })();
        return createVNode(resolveComponent("aButton"), {
          "type": "text",
          "onClick": () => this.switchEvn(i),
          "class": className
        }, {
          default: () => [createVNode("div", {
            "class": "flex middle"
          }, [withDirectives(createVNode("div", {
            "class": "flex1 ellipsis",
            "style": "text-align:left;"
          }, [i.name]), [[resolveDirective("uiPopover"), {
            onlyEllipsis: true,
            placement: "left"
          }]]), createVNode(resolveComponent("xIcon"), {
            "icon": "delete",
            "class": "delete-env-icon",
            "onClick": fnDelete
          }, null)])]
        });
      })]);
    },
    xDomSaveButton() {
      return createVNode(resolveComponent("xButton"), {
        "configs": {
          preset: "save",
          onClick: this.onOk
        },
        "class": "ml10"
      }, null);
    },
    vdomEnvconfigs() {
      const vDomContent = (() => {
        if (this.isLoading) {
          return createVNode(resolveComponent("aSpin"), {
            "spinning": true,
            "class": "ant-spin ant-spin-spinning flex middle center height100 width100"
          }, null);
        }
        return createVNode(resolveComponent("xForm"), {
          "labelStyle": {
            "text-align": "left",
            width: "80px",
            padding: "0 8px"
          }
        }, {
          default: () => [createVNode(resolveComponent("xGap"), {
            "t": "10"
          }, null), createVNode(resolveComponent("xItem"), {
            "configs": this.configsForm.name
          }, {
            afterControll: this.xDomSaveButton
          }), createVNode(resolveComponent("xGap"), {
            "t": "10"
          }, null), createVNode(resolveComponent("xItem"), {
            "configs": this.configsForm.domain
          }, null), createVNode(resolveComponent("xGap"), {
            "t": "10"
          }, null), createVNode(resolveComponent("xItem"), {
            "configs": this.configsForm.global
          }, null), createVNode(resolveComponent("xGap"), {
            "t": "10"
          }, null), createVNode(resolveComponent("xItem"), {
            "configs": this.configsForm.header
          }, null), createVNode(resolveComponent("xGap"), {
            "t": "10"
          }, null), createVNode(resolveComponent("xItem"), {
            "configs": this.configsForm.cookie
          }, null), createVNode(resolveComponent("xGap"), {
            "t": "10"
          }, null)]
        });
      })();
      return createVNode("div", {
        "class": "env-configs flex1 padding10 ant-card ant-card-bordered overflow-auto"
      }, [vDomContent]);
    }
  },
  methods: {
    async switchEvn(envItem, options = {}) {
      const continu = () => {
        this.currentSelected = envItem;
        this.raw$EnvId = envItem._id;
      };
      const isEnforce = options.isEnforce || false;
      if (isEnforce) {
        continu();
        return;
      }
      const rightData = pickValueFrom(this.configsForm);
      var delta = diff(this.leftData, rightData);
      const keys = Object.keys(delta || {});
      if (keys.length > 0) {
        try {
          await UI.dialog.confirm({
            content: "\u6709\u672A\u4FDD\u5B58\u7684\u4FEE\u6539\uFF0C\u5207\u6362\u4E4B\u540E\u5C06\u88AB\u653E\u5F03"
          });
          continu();
        } catch (e) {
        }
      } else {
        continu();
      }
    },
    setFormValues() {
      const item = privateLodash.cloneDeep(this.currentSelected || []);
      item.name = item.name || "";
      item.protocol = (() => item.domain ? item.domain.split("//")[0] + "//" : "http://")();
      item.domain = (() => item.domain ? item.domain.split("//")[1] : "")();
      const cookieIndex = privateLodash.findIndex(item.header, {
        name: "Cookie"
      });
      if (~cookieIndex) {
        const cookieString = item.header.splice(cookieIndex, 1)[0].value;
        if (cookieString.length > 2) {
          item.cookie = cookieString.split(";").map((i) => {
            if (i) {
              const [key, value] = i.split("=");
              return {
                key,
                value
              };
            }
          });
        }
      } else {
        item.cookie = [];
      }
      item.header = privateLodash.map(item.header || [], makeKeyValueObj);
      item.global = privateLodash.map(item.global || [], makeKeyValueObj);
      setValueTo(this.configsForm, item);
      this.leftData = pickValueFrom(this.configsForm);
      setTimeout(() => {
        this.isLoading = false;
      }, 64);
    },
    async onOk() {
      const validateResults = await validateForm(this.configsForm);
      if (!AllWasWell(validateResults)) {
        return;
      }
      let {
        name,
        domain,
        protocol,
        header,
        cookie,
        global
      } = pickValueFrom(this.configsForm);
      header = privateLodash.map(header, makeNameValueObj);
      cookie = privateLodash.map(cookie, makeNameValueObj);
      global = privateLodash.map(global, makeNameValueObj);
      if (cookie.length > 0) {
        header.push({
          name: "Cookie",
          value: cookie.map((item) => item.name + "=" + item.value).join(";")
        });
      }
      const env = {
        _id: this.currentSelected._id,
        name,
        domain: protocol + domain,
        header,
        global
      };
      const envIndex = privateLodash.findIndex(this.privateEnv, {
        _id: env._id
      });
      if (/^new_env/.test(this.currentSelected._id)) {
        delete env._id;
      }
      const envArray = privateLodash.cloneDeep(this.privateEnv);
      if (~envIndex) {
        envArray.splice(envIndex, 1, env);
      } else {
        envArray.push(env);
      }
      await API.project.updateProxyEnv({
        id: this.propProjectId,
        env: envArray
      });
      UI.message.success(this.$t("\u73AF\u5883\u8BBE\u7F6E\u6210\u529F").label);
      Methods_App.setCurrProject(this.propProjectId, {
        isEnforce: true
      });
    },
    async addEnv() {
      const newItem = {
        header: [],
        global: [],
        _id: privateLodash.genId("new_env"),
        name: privateLodash.genId("env_name"),
        domain: "http://"
      };
      this.privateEnv.unshift(newItem);
      this.switchEvn(newItem, {
        isEnforce: true
      });
    },
    async deleteEnv(item) {
      const id = item._id;
      try {
        await UI.dialog.confirm({
          content: `\u5220\u9664\u73AF\u5883\u53D8\u91CF${item.name}?`
        });
        const envIndex = privateLodash.findIndex(this.privateEnv, {
          _id: id
        });
        const envArray = privateLodash.cloneDeep(this.privateEnv);
        envArray.splice(envIndex, 1);
        await API.project.updateProxyEnv({
          id: this.propProjectId,
          env: envArray
        });
        UI.message.success(this.$t("\u73AF\u5883\u8BBE\u7F6E\u6210\u529F").label);
        Methods_App.setCurrProject(this.propProjectId, {
          isEnforce: true
        });
      } catch (error) {
      }
    }
  },
  render() {
    return createVNode(Fragment, null, [createVNode("div", {
      "class": "DialogUpsertProxyEnv flex1 flex horizon padding10",
      "style": "overflow:auto;"
    }, [createVNode("div", {
      "class": "env-list-wrapper flex vertical"
    }, [createVNode("div", {
      "class": "flex center mb10"
    }, [withDirectives(createVNode(resolveComponent("xIcon"), {
      "icon": "add",
      "onClick": this.addEnv,
      "class": "flex middle color-primary pointer"
    }, null), [[resolveDirective("uiPopover"), {
      content: "\u6DFB\u52A0\u65B0\u73AF\u5883",
      delay: 1e3
    }]])]), this.vDomLeftSide]), createVNode("div", {
      "class": "env-configs-wrapper flex1 flex"
    }, [this.vdomEnvconfigs])])]);
  }
});
const KeyValuePanel = (args) => {
  args.property.value = args.property.value || [];
  args.property.fnCheck = args.property.fnCheck || false;
  args.fnUpdate = (val) => {
    args.listeners["onUpdate:value"](val);
  };
  return createVNode("div", {
    "class": "ant-card ant-card-bordered"
  }, [createVNode(InputKeyValue, {
    "items": args.property.value,
    "onUpdate:items": args.fnUpdate,
    "genItem": args.property.genItem,
    "fnCheck": args.property.fnCheck
  }, null)]);
};
function newFormData$1() {
  return {
    _id: privateLodash.genId("body_params"),
    name: "",
    type: "text",
    required: "1",
    desc: "",
    example: ""
  };
}
const STRATEGY_CELL_ITEM_CONFIGS$2 = {
  name: {},
  type: {
    itemType: "Select",
    options: ITEM_OPTIONS.interfaceBodyFormType
  },
  required: {
    itemType: "Select",
    options: ITEM_OPTIONS.required
  },
  example: {},
  desc: {}
};
const BODY_PARAM_PROP_ARRAY$2 = Object.keys(STRATEGY_CELL_ITEM_CONFIGS$2);
const [ID_NAME$1, ID_TYPE$1, ID_REQUIRED$1, ID_RECORD$1, ID_DESC$1, ID_OPERATIONS$1] = [...BODY_PARAM_PROP_ARRAY$2, "ID_OPERATIONS"].map(privateLodash.genId);
const BodyParamsForm = defineComponent({
  props: ["params"],
  watch: {
    "params.req_body_form": {
      immediate: true,
      handler(formDataArray) {
        this.resetDataForm(formDataArray);
      }
    }
  },
  methods: {
    addRow() {
      this.syncFormDataFromConfigs();
      this.configs_table.dataSource.unshift(newFormData$1());
    },
    deleteRow(_id) {
      const index = privateLodash.findIndex(this.configs_table.dataSource, {
        _id
      });
      if (~index) {
        this.syncFormDataFromConfigs();
        this.configs_table.dataSource.splice(index, 1);
      }
    },
    syncFormDataFromConfigs() {
      privateLodash.each(this.configs_table.dataSource, (rowData) => {
        privateLodash.each(BODY_PARAM_PROP_ARRAY$2, (prop) => {
          rowData[prop] = rowData[`configs_${prop}`].value;
        });
      });
    },
    resetDataForm(newFormDataArray) {
      this.configs_table.dataSource = newFormDataArray;
    }
  },
  data(vm) {
    return {
      configs_table: defXVirTableConfigs({
        rowHeight: 36,
        dataSource: [],
        customClass: (tableId) => [`#${tableId} .input-width100{width:100%;}`, `#${tableId} div[role=tr] div[role=th][data-prop=operations]{justify-content:center;}`, `#${tableId} div[role=tr] div[role=td][data-prop=operations]{justify-content:center;color:red;}`].join("\n"),
        dataSourceFilter(dataSource) {
          return privateLodash.map(dataSource, (rowRecord) => {
            privateLodash.each(STRATEGY_CELL_ITEM_CONFIGS$2, (options, prop) => {
              rowRecord[`configs_${prop}`] = defItem.item(privateLodash.merge({
                value: rowRecord[prop],
                itemWrapperClass: "input-width100"
              }, options));
            });
            return rowRecord;
          });
        },
        columns: {
          ...defCol({
            label: vm.$t("\u540D\u79F0").label,
            prop: "name",
            renderCell: ({
              record
            }) => compileVNode(`<xItem :configs="record.configs_name" />`, {
              record
            }, `${ID_NAME$1}${record._id}`)
          }),
          ...defCol({
            label: vm.$t("\u7C7B\u578B").label,
            prop: "type",
            width: "100px",
            renderCell: ({
              record
            }) => compileVNode(`<xItem :configs="record.configs_type" />`, {
              record
            }, `${ID_TYPE$1}${record._id}`)
          }),
          ...defCol({
            label: vm.$t("\u5FC5\u9700").label,
            prop: "required",
            width: "110px",
            renderCell: ({
              record
            }) => compileVNode(`<xItem :configs="record.configs_required" />`, {
              record
            }, `${ID_REQUIRED$1}${record._id}`)
          }),
          ...defCol({
            label: vm.$t("\u793A\u4F8B").label,
            prop: "example",
            renderCell: ({
              record
            }) => compileVNode(`<xItem :configs="record.configs_example" />`, {
              record
            }, `${ID_RECORD$1}${record._id}`)
          }),
          ...defCol({
            label: vm.$t("\u5907\u6CE8").label,
            prop: "desc",
            renderCell: ({
              record
            }) => compileVNode(`<xItem :configs="record.configs_desc" />`, {
              record
            }, `${ID_DESC$1}${record._id}`)
          }),
          ...defCol({
            label: vm.$t("\u64CD\u4F5C").label,
            prop: "operations",
            width: "40px",
            renderHeader: () => null,
            renderCell: ({
              record
            }) => compileVNode(`<xIcon icon="delete" class="pointer" @Click="deleteRow(record._id)" />`, {
              record,
              deleteRow: vm.deleteRow
            }, `${ID_OPERATIONS$1}${record._id}`)
          })
        }
      })
    };
  },
  render() {
    return createVNode(Fragment, null, [createVNode(resolveComponent("aButton"), {
      "class": "width100 mb10",
      "type": "dashed",
      "onClick": this.addRow
    }, {
      default: () => [createVNode(resolveComponent("xIcon"), {
        "icon": "add"
      }, null)]
    }), createVNode("div", {
      "style": {
        height: "300px"
      }
    }, [createVNode(resolveComponent("xVirTable"), {
      "configs": this.configs_table,
      "class": "flex1 width100 "
    }, null)])]);
  }
});
const STRATEGY_CELL_ITEM_CONFIGS$1 = {
  name: {},
  type: {
    itemType: "Select",
    options: ITEM_OPTIONS.interfaceBodyFormType
  },
  required: {
    itemType: "Select",
    options: ITEM_OPTIONS.required
  },
  example: {},
  desc: {}
};
const BODY_PARAM_PROP_ARRAY$1 = Object.keys(STRATEGY_CELL_ITEM_CONFIGS$1);
[...BODY_PARAM_PROP_ARRAY$1, "ID_OPERATIONS"].map(privateLodash.genId);
const BodyParamsRaw = defineComponent({
  props: ["params"],
  watch: {
    "params.req_body_other": {
      immediate: true,
      handler(bodyText) {
        this.resetDataForm(bodyText);
      }
    }
  },
  methods: {
    resetDataForm(bodyText) {
      this.bodyText = bodyText;
    }
  },
  data(vm) {
    return {
      bodyText: ""
    };
  },
  render() {
    return createVNode(Fragment, null, [createVNode("div", {
      "style": {
        height: "300px"
      }
    }, [createVNode(MonacoEditor, {
      "code": this.bodyText,
      "onUpdate:code": ($event) => this.bodyText = $event,
      "language": "json"
    }, null)])]);
  }
});
const DialogBulkValues = defineComponent({
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
      formItems: {
        ...defItem({
          isTextarea: true,
          prop: "bulkValue",
          value: "",
          placeholder: "key:value\nkey:value\nkey:value",
          rules: [FormRules.required()],
          style: "width:500px"
        })
      }
    };
  },
  mounted() {
    this.formItems.bulkValue.value = privateLodash.map(this.propDialogOptions.formValues, (item) => {
      if (item.configs_name) {
        return `${item.configs_name.value || ""}:${item.configs_example.value || ""}`;
      }
      return `${item.name || ""}:${item.example || ""}`;
    }).join("\n");
  },
  computed: {
    onOk() {
      var _a, _b;
      if (!privateLodash.isFunction((_a = this.propDialogOptions) == null ? void 0 : _a.onOk)) {
        alert("miss onOk function");
        return privateLodash.doNothing;
      }
      return (_b = this.propDialogOptions) == null ? void 0 : _b.onOk;
    },
    configsFooter() {
      return {
        onCancel: this.propDialogOptions.closeDialog,
        onOk: async () => {
          const validateResults = await validateForm(this.formItems);
          if (AllWasWell(validateResults)) {
            const {
              bulkValue
            } = pickValueFrom(this.formItems);
            const bulkValueArray = bulkValue.split("\n");
            const formArray = privateLodash.map(bulkValueArray, (str) => str.split(":"));
            this.onOk(formArray);
            this.propDialogOptions.closeDialog();
          }
        }
      };
    },
    vDomFormItems() {
      return privateLodash.map(this.formItems, (item, prop) => {
        return createVNode(Fragment, null, [createVNode(resolveComponent("xGap"), {
          "t": "10"
        }, null), createVNode(resolveComponent("xItem"), {
          "configs": item
        }, null)]);
      });
    }
  },
  render() {
    return createVNode(Fragment, null, [createVNode("div", {
      "class": "flex flex1 vertical padding10",
      "style": "min-height:240px"
    }, [createVNode(resolveComponent("aAlert"), {
      "message": `\u578B\u5982key:value\u4E00\u884C\u4E00\u4E2A \u6362\u884C\u5373\u53EF\uFF0C\u4E0D\u8981\u4F7F\u7528\u9017\u53F7\u3001\u5206\u53F7\u5206\u9694`
    }, null), createVNode(MonacoEditor, {
      "code": this.formItems.bulkValue.value,
      "onUpdate:code": ($event) => this.formItems.bulkValue.value = $event
    }, null)]), createVNode(resolveComponent("xDialogFooter"), {
      "configs": this.configsFooter,
      "language": "text"
    }, null)]);
  }
});
const BodyParamsPanel = defineComponent({
  props: ["params"],
  data(vm) {
    return {
      configsBodyType: defItem.item({
        prop: "configsBodyType",
        itemType: "RadioGroup",
        options: ITEM_OPTIONS.interfaceBodyType
      })
    };
  },
  methods: {
    openBulkValuesDialog() {
      UI.dialog.component({
        title: this.$t("\u6279\u91CF\u6DFB\u52A0\u53C2\u6570").label,
        component: DialogBulkValues,
        formValues: this.params.req_body_form,
        onOk: async (req_body_form) => {
          this.params.req_body_form = req_body_form;
        }
      });
    }
  },
  render() {
    return createVNode(resolveComponent("aCard"), null, {
      extra: () => {
        var _a;
        if ((_a = privateLodash.find(ITEM_OPTIONS.interfaceBodyType, {
          value: this.params.req_body_type
        })) == null ? void 0 : _a.isForm) {
          return createVNode("a", {
            "onClick": this.openBulkValuesDialog
          }, [createTextVNode("\u6279\u91CF\u6DFB\u52A0")]);
        }
        return null;
      },
      title: () => {
        return createVNode(Fragment, null, [createVNode(resolveComponent("xItem"), {
          "modelValue": this.params.req_body_type,
          "onUpdate:modelValue": ($event) => this.params.req_body_type = $event,
          "configs": this.configsBodyType
        }, null)]);
      },
      default: () => {
        return createVNode(Fragment, null, [this.params.req_body_type == "form" ? createVNode(BodyParamsForm, {
          "params": this.params
        }, null) : null, this.params.req_body_type == "json" ? "\u5F00\u53D1\u4E2D......" : null, this.params.req_body_type == "file" ? "\u5F00\u53D1\u4E2D......" : null, this.params.req_body_type == "raw" ? createVNode(BodyParamsRaw, {
          "params": this.params
        }, null) : null]);
      }
    });
  }
});
function newFormData() {
  return {
    _id: privateLodash.genId("body_params"),
    name: "",
    type: "text",
    required: "1",
    desc: "",
    example: ""
  };
}
const STRATEGY_CELL_ITEM_CONFIGS = {
  name: {},
  type: {
    itemType: "Select",
    options: ITEM_OPTIONS.interfaceBodyFormType
  },
  required: {
    itemType: "Select",
    options: ITEM_OPTIONS.required
  },
  example: {},
  desc: {}
};
const BODY_PARAM_PROP_ARRAY = Object.keys(STRATEGY_CELL_ITEM_CONFIGS);
const [ID_NAME, ID_TYPE, ID_REQUIRED, ID_RECORD, ID_DESC, ID_OPERATIONS] = [...BODY_PARAM_PROP_ARRAY, "ID_OPERATIONS"].map(privateLodash.genId);
const HeaderParamsForm = defineComponent({
  props: ["params"],
  watch: {
    "params.req_body_form": {
      immediate: true,
      handler(formDataArray) {
        this.resetDataForm(formDataArray);
      }
    }
  },
  methods: {
    openBulkValuesDialog() {
      UI.dialog.component({
        title: this.$t("\u6279\u91CF\u6DFB\u52A0\u53C2\u6570").label,
        component: DialogBulkValues,
        formValues: this.params.req_body_form,
        onOk: async (formArray) => {
          this.params.req_body_form = privateLodash.map(formArray, ([name, example]) => {
            return {
              name,
              example,
              required: "0",
              type: "text"
            };
          });
        }
      });
    },
    addRow() {
      this.syncFormDataFromConfigs();
      this.configs_table.dataSource.unshift(newFormData());
    },
    deleteRow(_id) {
      const index = privateLodash.findIndex(this.configs_table.dataSource, {
        _id
      });
      if (~index) {
        this.syncFormDataFromConfigs();
        this.configs_table.dataSource.splice(index, 1);
      }
    },
    syncFormDataFromConfigs() {
      privateLodash.each(this.configs_table.dataSource, (rowData) => {
        privateLodash.each(BODY_PARAM_PROP_ARRAY, (prop) => {
          rowData[prop] = rowData[`configs_${prop}`].value;
        });
      });
    },
    resetDataForm(newFormDataArray) {
      this.configs_table.dataSource = newFormDataArray;
    }
  },
  data(vm) {
    return {
      configs_table: defXVirTableConfigs({
        rowHeight: 36,
        dataSource: [],
        customClass: (tableId) => [`#${tableId} .input-width100{width:100%;}`, `#${tableId} div[role=tr] div[role=th][data-prop=operations]{justify-content:center;}`, `#${tableId} div[role=tr] div[role=td][data-prop=operations]{justify-content:center;color:red;}`].join("\n"),
        dataSourceFilter(dataSource) {
          return privateLodash.map(dataSource, (rowRecord) => {
            privateLodash.each(STRATEGY_CELL_ITEM_CONFIGS, (options, prop) => {
              rowRecord[`configs_${prop}`] = defItem.item(privateLodash.merge({
                value: rowRecord[prop],
                itemWrapperClass: "input-width100"
              }, options));
            });
            return rowRecord;
          });
        },
        columns: {
          ...defCol({
            label: vm.$t("\u540D\u79F0").label,
            prop: "name",
            renderCell: ({
              record
            }) => compileVNode(`<xItem :configs="record.configs_name" />`, {
              record
            }, `${ID_NAME}${record._id}`)
          }),
          ...defCol({
            label: vm.$t("\u7C7B\u578B").label,
            prop: "type",
            width: "100px",
            renderCell: ({
              record
            }) => compileVNode(`<xItem :configs="record.configs_type" />`, {
              record
            }, `${ID_TYPE}${record._id}`)
          }),
          ...defCol({
            label: vm.$t("\u793A\u4F8B").label,
            prop: "example",
            renderCell: ({
              record
            }) => compileVNode(`<xItem :configs="record.configs_example" />`, {
              record
            }, `${ID_RECORD}${record._id}`)
          }),
          ...defCol({
            label: vm.$t("\u5907\u6CE8").label,
            prop: "desc",
            renderCell: ({
              record
            }) => compileVNode(`<xItem :configs="record.configs_desc" />`, {
              record
            }, `${ID_DESC}${record._id}`)
          }),
          ...defCol({
            label: vm.$t("\u64CD\u4F5C").label,
            prop: "operations",
            width: "40px",
            renderHeader: () => null,
            renderCell: ({
              record
            }) => compileVNode(`<xIcon icon="delete" class="pointer" @Click="deleteRow(record._id)" />`, {
              record,
              deleteRow: vm.deleteRow
            }, `${ID_OPERATIONS}${record._id}`)
          })
        }
      })
    };
  },
  render() {
    return createVNode(Fragment, null, [createVNode("div", {
      "class": "flex middle"
    }, [createVNode(resolveComponent("aButton"), {
      "class": "mb10",
      "onClick": this.addRow
    }, {
      default: () => [" ", createTextVNode("\u6DFB\u52A0\u4E00\u884C"), " "]
    }), createVNode(resolveComponent("xGap"), {
      "f": "1"
    }, null), createVNode("a", {
      "class": "mb10 mr10",
      "onClick": this.openBulkValuesDialog
    }, [" ", createTextVNode("\u6279\u91CF\u6DFB\u52A0"), " "])]), createVNode("div", {
      "style": {
        height: "300px"
      }
    }, [createVNode(resolveComponent("xVirTable"), {
      "configs": this.configs_table,
      "class": "flex1 width100 "
    }, null)])]);
  }
});
const HeaderParamsPanel = defineComponent({
  props: ["params"],
  data(vm) {
    return {};
  },
  render() {
    return createVNode(resolveComponent("aCard"), null, {
      default: () => {
        return createVNode(HeaderParamsForm, {
          "params": this.params
        }, null);
      }
    });
  }
});
const RequestArgsPanel = defineComponent({
  props: ["params", "apiMethod"],
  emits: ["update:params"],
  data() {
    return {
      collapseActive: QUERY,
      privateHttpMethod: GET,
      privateParams: {}
    };
  },
  watch: {
    params() {
      this.privateParams = privateLodash.cloneDeep(this.params);
    },
    apiMethod: {
      immediate: true,
      handler(apiMethod) {
        this.privateHttpMethod = apiMethod || GET;
        this.collapseActive = HTTP_METHOD[this.privateHttpMethod].default_tab;
      }
    }
  },
  computed: {
    bodyCollapsible() {
      return HTTP_METHOD[this.privateHttpMethod].request_body ? "" : "disabled";
    }
  },
  render() {
    return createVNode(resolveComponent("aCollapse"), {
      "activeKey": this.collapseActive,
      "onUpdate:activeKey": ($event) => this.collapseActive = $event
    }, {
      default: () => [createVNode(resolveComponent("aCollapsePanel"), {
        "key": "header",
        "header": "header"
      }, {
        default: () => [createVNode(HeaderParamsPanel, {
          "params": this.params
        }, null)]
      }), createVNode(resolveComponent("aCollapsePanel"), {
        "key": QUERY,
        "header": QUERY
      }, {
        default: () => [createVNode(resolveComponent("aButton"), {
          "size": "small",
          "type": "primary",
          "onClick": () => this.addParams("req_query")
        }, {
          default: () => [createTextVNode("\u6DFB\u52A0Query\u53C2\u6570")]
        }), createVNode("div", {
          "className": "bulk-import",
          "onClick": () => this.showBulk("req_query")
        }, [createTextVNode("\u6279\u91CF\u6DFB\u52A0")])]
      }), createVNode(resolveComponent("aCollapsePanel"), {
        "key": BODY,
        "header": BODY,
        "collapsible": this.bodyCollapsible
      }, {
        default: () => [createVNode(BodyParamsPanel, {
          "params": this.params
        }, null)]
      })]
    });
  }
});
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const DialogModifyInterface = defineComponent({
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
      State_Project
    };
  },
  computed: {
    vDomXItemPathparams() {
      if (privateLodash.isArrayFill(this.dataXItem.pathParams.value)) {
        return createVNode(Fragment, null, [createVNode(resolveComponent("xGap"), {
          "t": "10"
        }, null), createVNode(resolveComponent("xItem"), {
          "configs": this.dataXItem.pathParams
        }, null)]);
      } else {
        return null;
      }
    },
    interfaceId() {
      return this.propDialogOptions.oldInterface._id;
    },
    configsDialogFooter() {
      return {
        onCancel: async () => {
          this.propDialogOptions.closeDialog();
        },
        onOk: async () => {
          this.submit();
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
        ...defItem({
          value: "",
          itemType: "Select",
          prop: "catid",
          label: vm.$t("\u63A5\u53E3\u5206\u7C7B").label,
          placeholder: "\u5206\u7C7B\u540D\u79F0",
          options: [],
          rules: [FormRules.required()],
          setOptions(allCategory) {
            var _a;
            this.options = allCategory;
            if (vm.propDialogOptions.categoryId) {
              this.value = vm.propDialogOptions.categoryId;
            } else {
              this.value = ((_a = privateLodash.first(this.options)) == null ? void 0 : _a.value) || "";
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
          value: vm.State_App.currProject.basepath,
          prop: "basepath",
          label: vm.$t("\u63A5\u53E3\u57FA\u672C\u8DEF\u5F84").label,
          labelVNodeRender: VNodeCollection.labelTips(`\u63A5\u53E3\u57FA\u672C\u8DEF\u5F84\uFF0C\u53EF\u5728 \u9879\u76EE\u8BBE\u7F6E \u91CC\u4FEE\u6539`),
          disabled: true
        }),
        ...defItem({
          value: "",
          itemType: "Select",
          prop: "apiMethod",
          options: ITEM_OPTIONS.httpMethod,
          onChange(val) {
            vm.dataXItem.requestArgs.apiMethod = val;
          },
          rules: [FormRules.required()],
          style: {
            width: "120px"
          }
        }),
        ...defItem({
          value: "",
          prop: "path",
          label: vm.$t("\u63A5\u53E3\u8DEF\u5F84").label,
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
          onAfterValueEmit: privateLodash.debounce(function(newPatnValue) {
            newPatnValue = _$handlePath(newPatnValue);
            let queue = [];
            setValueTo(vm.dataXItem, {
              path: newPatnValue
            });
            const {
              pathParams
            } = pickValueFrom(vm.dataXItem);
            let insertParams = (name) => {
              let findExist = privateLodash.find(pathParams, {
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
              pathParams: privateLodash.map(privateLodash.uniqBy(queue, "name"), (newValue) => {
                return privateLodash.merge({
                  name: "",
                  desc: "",
                  example: "",
                  _id: ""
                }, newValue);
              })
            });
          }, 800)
        }),
        ...defItem({
          prop: "pathParams",
          label: "\u63A5\u53E3\u8DEF\u5F84\u53C2\u6570",
          value: [],
          itemType: InpterfacePathParams
        }),
        ...defItem({
          prop: "tag",
          label: "Tag",
          value: [],
          options: [],
          async setOptions(tagArray) {
            this.options = tagArray;
          },
          itemType: TagSelectRender
        }),
        ...defItem({
          prop: "isProxy",
          label: "\u662F\u5426\u5F00\u542F\u8F6C\u53D1",
          options: ITEM_OPTIONS.YesOrNo,
          itemType: "Switch"
        }),
        ...defItem({
          isShow: () => vm.dataXItem.isProxy.value,
          prop: "witchEnv",
          label: "\u8F6C\u53D1\u73AF\u5883",
          options: [],
          setOptions(envArray) {
            this.options = privateLodash.map(envArray, (i) => {
              return {
                value: i._id,
                label: `${i.name} ${i.domain}`
              };
            });
          },
          itemType: EnvSelectRender
        }),
        ...defItem({
          prop: "requestArgs",
          label: "\u8BF7\u6C42\u53C2\u6570\u8BBE\u7F6E",
          value: [],
          activeKey: "1",
          apiMethod: "",
          itemType: RequestArgsRender
        })
      }
    };
  },
  mounted() {
    this.setFormDataValues();
  },
  watch: {
    "State_App.currProject": {
      immediate: true,
      deep: true,
      handler(currProject) {
        const {
          env: envArray,
          tag: tagArray,
          cat: category
        } = currProject;
        this.dataXItem.catid.setOptions(privateLodash.map(category, (i) => ({
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
    setFormDataValues() {
      this.detailInfo = this.initState(this.propDialogOptions.oldInterface);
      console.log(JSON.stringify(this.detailInfo, null, 2));
      const {
        catid,
        title,
        path,
        req_params,
        tag,
        isProxy,
        witchEnv,
        method,
        req_body_type,
        req_body_form,
        req_body_other
      } = this.detailInfo;
      setValueTo(this.dataXItem, {
        witchEnv,
        catid,
        title,
        apiMethod: method,
        path,
        pathParams: req_params,
        tag: String(tag).split(","),
        isProxy,
        requestArgs: {
          req_body_type,
          req_body_form,
          req_body_other
        }
      });
    },
    initState(detailInfo) {
      this.startTime = new Date().getTime();
      if (detailInfo.req_query && detailInfo.req_query.length === 0) {
        delete detailInfo.req_query;
      }
      if (detailInfo.req_headers && detailInfo.req_headers.length === 0) {
        delete detailInfo.req_headers;
      }
      if (detailInfo.req_body_form && detailInfo.req_body_form.length === 0) {
        delete detailInfo.req_body_form;
      }
      if (detailInfo.req_params && detailInfo.req_params.length === 0) {
        delete detailInfo.req_params;
      }
      if (detailInfo.req_body_form) {
        detailInfo.req_body_form = detailInfo.req_body_form.map((item) => {
          item.type = item.type === "text" ? "text" : "file";
          return item;
        });
      }
      detailInfo["hideTabs"] = {
        req: {
          body: "hide",
          query: "hide",
          headers: "hide"
        }
      };
      detailInfo["hideTabs"]["req"][HTTP_METHOD[detailInfo.method].default_tab] = "";
      return Object.assign({
        submitStatus: false,
        title: "",
        path: "",
        status: "undone",
        method: "get",
        req_params: [],
        req_query: [{
          name: "",
          desc: "",
          required: "1"
        }],
        req_headers: [{
          name: "",
          value: "",
          required: "1"
        }],
        req_body_type: "form",
        req_body_form: [{
          name: "",
          type: "text",
          required: "1"
        }],
        req_body_other: "",
        res_body_type: "json",
        res_body: "",
        desc: "",
        res_body_mock: "",
        jsonType: "tpl",
        req_radio_type: "req-query",
        custom_field_value: "",
        api_opened: false,
        visible: false
      }, detailInfo);
    },
    async submit() {
      const validateResults = await validateForm(this.dataXItem);
      if (AllWasWell(validateResults)) {
        const {
          catid,
          title,
          path,
          apiMethod
        } = pickValueFrom(this.dataXItem);
        const {
          projectId
        } = this.propDialogOptions;
        try {
          const res = await API.project.addInterface({
            project_id: projectId,
            catid,
            title,
            path,
            method: apiMethod
          });
          if (res) {
            return true;
          }
        } catch (error) {
          UI.message.error("\u6DFB\u52A0\u5931\u8D25");
        }
      }
    }
  },
  render() {
    return createVNode(Fragment, null, [createVNode("div", {
      "class": "dialog-modify-interface g-row flex1 flex horizon height100 width100 overflow-auto"
    }, [createVNode("div", {
      "class": "flex1"
    }, [createVNode(resolveComponent("xGap"), {
      "t": "10"
    }, null), createVNode(resolveComponent("xForm"), {
      "labelStyle": {
        "min-width": "120px",
        width: "unset"
      }
    }, {
      default: () => [createVNode(resolveComponent("xGap"), {
        "t": "10"
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.catid
      }, null), createVNode(resolveComponent("xGap"), {
        "t": "10"
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.title
      }, null), createVNode(resolveComponent("xGap"), {
        "t": "10"
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.basepath
      }, null), createVNode(resolveComponent("xGap"), {
        "t": "10"
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.path
      }, null), this.vDomXItemPathparams, createVNode(resolveComponent("xGap"), {
        "t": "10"
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.tag
      }, null), createVNode(resolveComponent("xGap"), {
        "t": "10"
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.isProxy
      }, null), createVNode(resolveComponent("xGap"), {
        "t": "10"
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.witchEnv
      }, null), createVNode(resolveComponent("xGap"), {
        "t": "10"
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.requestArgs
      }, null)]
    }), createVNode(resolveComponent("xGap"), {
      "t": "10"
    }, null)])]), createVNode(resolveComponent("xDialogFooter"), {
      "configs": this.configsDialogFooter
    }, null)]);
  }
});
const InpterfacePathParams = (args) => {
  args.property.value = args.property.value || [];
  args.fnUpdate = (prop, val, index) => {
    args.property.value[index][prop] = val;
    args.listeners["onUpdate:value"](args.property.value);
  };
  return privateLodash.map(args.property.value, (data, index) => {
    const {
      desc,
      example,
      name,
      _id
    } = data;
    return createVNode("div", {
      "class": "flex middel mt10 width100"
    }, [createVNode(resolveComponent("aTag"), {
      "class": "mr10 flex middle",
      "style": "min-width:100px"
    }, _isSlot(name) ? name : {
      default: () => [name]
    }), createVNode("span", {
      "class": "mr10 flex1"
    }, [createVNode(resolveComponent("xItem"), {
      "configs": {
        placeholder: "\u53C2\u6570\u793A\u4F8B",
        value: example,
        onAfterValueEmit: (val) => args.fnUpdate("example", val, index)
      }
    }, null)]), createVNode("span", {
      "class": "flex1"
    }, [createVNode(resolveComponent("xItem"), {
      "configs": {
        placeholder: "\u5907\u6CE8",
        value: desc,
        onAfterValueEmit: (val) => args.fnUpdate("desc", val, index)
      }
    }, null)])]);
  });
};
async function openProxyEnvDialog() {
  const {
    _layerKey
  } = await UI.dialog.component({
    title: State_UI.$t("\u7BA1\u7406\u9879\u76EE\u63A5\u53E3\u8F6C\u53D1\u73AF\u5883").label,
    component: DialogUpsertProxyEnv
  });
  $(`#layui-layer-shade${_layerKey}`).css("z-index", 1);
}
async function openUpsertTagDialog() {
  const {
    _layerKey
  } = await UI.dialog.component({
    title: State_UI.$t("\u7BA1\u7406\u9879\u76EE\u63A5\u53E3Tags").label,
    component: DialogUpsertTags
  });
  $(`#layui-layer-shade${_layerKey}`).css("z-index", 1);
}
const EnvSelectRender = (args) => {
  args.property.value = args.property.value || [];
  const options = args.property.options || [];
  args.fnUpdate = (val) => {
    args.listeners["onUpdate:value"](val);
  };
  const vDomOptions = privateLodash.map(options, (item) => {
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
    "onChange": args.fnUpdate,
    "mode": "multiple",
    "value": args.property.value
  }, _isSlot(vDomOptions) ? vDomOptions : {
    default: () => [vDomOptions]
  }), createVNode(resolveComponent("xGap"), {
    "l": "10"
  }, null), createVNode(resolveComponent("xButton"), {
    "configs": {
      text: State_UI.$t("\u8F6C\u53D1\u73AF\u5883\u8BBE\u7F6E").label,
      onClick: openProxyEnvDialog
    },
    "class": "ml10",
    "type": "primary"
  }, null)]);
};
const TagSelectRender = (args) => {
  args.property.value = args.property.value || [];
  const options = args.property.options || [];
  args.fnUpdate = (val) => {
    args.listeners["onUpdate:value"](val);
  };
  const vDomOptions = privateLodash.map(options, (item) => {
    return createVNode(resolveComponent("aSelectOption"), {
      "value": item.name,
      "key": item.name
    }, {
      default: () => [withDirectives(createVNode("span", null, [item.name]), [[resolveDirective("uiPopover"), {
        content: item.desc
      }]])]
    });
  });
  return createVNode("div", {
    "class": "flex overflow-auto"
  }, [createVNode(resolveComponent("aSelect"), {
    "placeholder": "\u8BF7\u9009\u62E9 tag",
    "onChange": args.fnUpdate,
    "mode": "multiple",
    "value": args.property.value
  }, _isSlot(vDomOptions) ? vDomOptions : {
    default: () => [vDomOptions]
  }), createVNode(resolveComponent("xGap"), {
    "l": "10"
  }, null), createVNode(resolveComponent("xButton"), {
    "configs": {
      text: State_UI.$t("Tag\u8BBE\u7F6E").label,
      onClick: openUpsertTagDialog
    },
    "class": "ml10",
    "type": "primary"
  }, null)]);
};
const RequestArgsRender = (args) => {
  args.property.value = args.property.value || [];
  args.fnUpdate = (val) => {
    args.listeners["onUpdate:value"](val);
  };
  return createVNode(RequestArgsPanel, {
    "params": args.property.value,
    "apiMethod": args.property.apiMethod,
    "onUpdate:params": args.fnUpdate
  }, null);
};
const InterfaceDetail = defineComponent({
  setup() {
    return {
      State_Project,
      Cpt_url
    };
  },
  data(vm) {
    return {
      State_App: _State_App,
      detailInfo: false
    };
  },
  watch: {
    "Cpt_url.query.interface_id": {
      immediate: true,
      async handler(interface_id) {
        if (!interface_id) {
          return;
        }
        const {
          data
        } = await API.project.fetchInterfaceDetail(this.Cpt_url.query.interface_id);
        this.detailInfo = data;
      }
    }
  },
  mounted() {
    this.showModifyInterfaceDialog();
  },
  methods: {
    copyUrl(url) {
      copyToClipboard(url);
      UI.message.success("\u5DF2\u7ECF\u6210\u529F\u590D\u5236\u5230\u526A\u5207\u677F");
    },
    flagMsg(mock, strice) {
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
    closeWS() {
      this.WebSocket && this.WebSocket.close();
      delete this.WebSocket;
    },
    async showModifyInterfaceDialog() {
      const vm = this;
      await privateLodash.ensureValueDone(() => this.detailInfo);
      const item = this.detailInfo;
      const $dialogModifyInterface = $(`.dialog-modify-interface`);
      if ($dialogModifyInterface.length > 0) {
        UI.message.warn(this.$t("\u5DF2\u5B58\u5728\u4FEE\u6539\u9762\u677F").label);
        return;
      }
      const {
        status,
        curdata,
        message
      } = await this.checkConflict(item);
      if (status == 2) {
        UI.dialog.confirm({
          content: createVNode("div", {
            "class": "flex middle"
          }, [createVNode("a", {
            "href": makeAhref(`/user/profile/${curdata.uid}`)
          }, [curdata.username]), createVNode("div", null, [createTextVNode("\u6B63\u5728\u7F16\u8F91\u8BE5\u63A5\u53E3\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5...")])])
        });
        this.closeWS();
        return;
      }
      if (message) {
        UI.message.warn(message);
      }
      UI.dialog.component({
        title: this.$t("\u4FEE\u6539\u63A5\u53E3").label + `-${item.title}`,
        fullscreen: true,
        component: DialogModifyInterface,
        oldInterface: item,
        maxmin: true,
        onBeforeClose: vm.closeWS
      });
    },
    async checkConflict(item) {
      const vm = this;
      const {
        hostname,
        port,
        protocol
      } = location;
      let domain = hostname + (port !== "" ? ":" + port : "");
      let wsProtocol = protocol === "https:" ? "wss" : "ws";
      return new Promise((resolve, reject) => {
        try {
          const sockei = new WebSocket(`${wsProtocol}://${domain}/api/interface/solve_conflict?id=${item._id}`);
          sockei.onopen = () => {
            vm.WebSocket = sockei;
          };
          sockei.onmessage = (e) => {
            let result = JSON.parse(e.data);
            if (result.errno === 0) {
              resolve({
                curdata: result.data,
                status: 1
              });
            } else {
              resolve({
                curdata: result.data,
                status: 2
              });
            }
          };
          sockei.onerror = () => {
            resolve({
              curdata: item,
              status: 1,
              message: "websocket \u8FDE\u63A5\u5931\u8D25\uFF0C\u5C06\u5BFC\u81F4\u591A\u4EBA\u7F16\u8F91\u540C\u4E00\u4E2A\u63A5\u53E3\u51B2\u7A81\u3002"
            });
          };
        } catch (e) {
          resolve({
            curdata: item,
            status: 1,
            message: "websocket \u8FDE\u63A5\u5931\u8D25\uFF0C\u5C06\u5BFC\u81F4\u591A\u4EBA\u7F16\u8F91\u540C\u4E00\u4E2A\u63A5\u53E3\u51B2\u7A81\u3002"
          });
        }
      });
    }
  },
  computed: {
    status() {
      var _a;
      let status = {
        undone: "\u672A\u5B8C\u6210",
        done: "\u5DF2\u5B8C\u6210"
      };
      return status[(_a = this.detailInfo) == null ? void 0 : _a.status];
    },
    labelProxyEnv() {
      if (!this.detailInfo.isProxy) {
        return "Y-api Mock \u6570\u636E";
      }
      const envId = this.detailInfo.witchEnv;
      if (!envId) {
        return "\u4EFB\u610F";
      }
      if (envId) {
        const envArray = this.State_App.currProject.env;
        let env = privateLodash.find(envArray, {
          _id: envId
        });
        if (env) {
          return createVNode("div", null, [createVNode(resolveComponent("aTag"), {
            "color": "cyan"
          }, {
            default: () => [env.name]
          }), createVNode("span", null, [env.domain])]);
        }
      } else {
        return "--";
      }
    },
    vDomCopyAjaxCodePanel() {
      const {
        tag,
        up_time,
        title,
        uid,
        username,
        path,
        method
      } = this.detailInfo;
      const ajaxCode = `/**
*  ${title}
*  ${window.location.href}
*/
async ${privateLodash.camelCase(path)}({params,data}) {
	return ajax({
	method: "${method}",
	url: \`${path}\`,
	params:params||{},
	data:data||{}
	});
}`;
      return createVNode("div", {
        "style": "position:relative;overflow:auto;height:100%;"
      }, [createVNode(resolveComponent("Button"), {
        "onClick": () => this.copyUrl(ajaxCode),
        "style": {
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 1
        }
      }, {
        default: () => [createTextVNode("\u590D\u5236\u4EE3\u7801")]
      }), createVNode(resolveComponent("MonacoEditor"), {
        "code": ajaxCode,
        "style": {
          minHeight: 180
        },
        "readOnly": true
      }, null)]);
    },
    vDomMockHref() {
      const {
        protocol,
        hostname,
        port
      } = location;
      return `${protocol}//${hostname}${port ? `:${port}` : ""}/mock/${this.State_App.currProject._id}${this.State_App.currProject.basepath}${this.detailInfo.path}`;
    },
    descriptions() {
      var _a, _b, _c, _d;
      const {
        tag,
        up_time,
        title,
        uid,
        username,
        status,
        path,
        method,
        isProxy,
        custom_field_value,
        desc
      } = this.detailInfo || {};
      const rowArray = [{
        colArray: [{
          label: "\u63A5\u53E3\u540D\u79F0",
          col: 3,
          value: (_a = this.detailInfo) == null ? void 0 : _a.title
        }]
      }, {
        colArray: [{
          label: "\u7EF4\u62A4\u4EBA",
          value: createVNode(Fragment, null, [createVNode(resolveComponent("aAvatar"), {
            "src": "/api/user/avatar?uid=" + uid,
            "class": "mr8",
            "style": "height:24px;width:24px;"
          }, null), createVNode("a", null, [username])])
        }, {
          label: "\u72B6\u6001",
          value: ITEM_OPTIONS_VDOM.status(status)
        }, {
          label: "\u66F4\u65B0\u65F6\u95F4",
          value: privateLodash.dateFormat(up_time)
        }]
      }, {
        colArray: [{
          label: "\u63A5\u53E3\u8DEF\u5F84",
          col: 3,
          value: createVNode(resolveComponent("CopyContent"), {
            "class": "flex middle"
          }, {
            default: () => [ITEM_OPTIONS_VDOM.httpMethod(method), this.State_App.currProject.basepath, createTextVNode(" "), path]
          })
        }]
      }, {
        colArray: [{
          label: "Tag",
          col: 3,
          value: ITEM_OPTIONS_VDOM.tags(tag)
        }]
      }, {
        colArray: [{
          label: "\u662F\u5426\u5F00\u542F\u8F6C\u53D1",
          col: 1,
          value: (_b = privateLodash.find(ITEM_OPTIONS.YesOrNo, {
            value: isProxy
          })) == null ? void 0 : _b.label
        }, {
          label: "\u8F6C\u53D1\u73AF\u5883",
          col: 2,
          value: this.labelProxyEnv
        }]
      }, {
        colArray: [{
          label: createVNode("div", {
            "class": "flex middle"
          }, [createVNode("span", {
            "class": "mr10"
          }, [createTextVNode("Mock\u5730\u5740")]), createVNode(resolveComponent("aButton"), {
            "type": "primary"
          }, {
            default: () => [createTextVNode("\u8FD0\u884C")]
          })]),
          col: 3,
          value: createVNode("div", {
            "class": "flex middle width100"
          }, [this.flagMsg(this.State_App.currProject.is_mock_open, this.State_App.currProject.strice), createVNode(resolveComponent("CopyContent"), null, {
            default: () => [createVNode("span", {
              "class": "href"
            }, [this.vDomMockHref])]
          }), createVNode(resolveComponent("xGap"), {
            "f": "1"
          }, null)])
        }]
      }, {
        style: `height:200px;`,
        colArray: [{
          label: "ajax\u4EE3\u7801",
          col: 3,
          value: this.vDomCopyAjaxCodePanel
        }]
      }];
      if (custom_field_value && ((_d = (_c = this.State_App.currGroup) == null ? void 0 : _c.custom_field) == null ? void 0 : _d.enable)) {
        rowArray.push([{
          label: this.State_App.currGroup.custom_field.enable,
          col: 3,
          value: custom_field_value
        }]);
      }
      if (desc) {
        rowArray.push([{
          label: "\u5907\u6CE8",
          col: 3,
          value: desc
        }]);
      }
      return {
        rowArray
      };
    }
  },
  render() {
    if (!this.detailInfo || !this.State_App.currProject) {
      return createVNode(resolveComponent("aSpin"), {
        "spinning": true,
        "class": "flex middle center flex1"
      }, null);
    }
    console.log(this.State_App.currGroup, this.State_App.currProject, this.detailInfo);
    return createVNode(resolveComponent("xView"), {
      "style": "overflow:hidden;"
    }, {
      default: () => [createVNode("div", {
        "class": "flex"
      }, [createVNode(resolveComponent("xButton"), {
        "onClick": this.showModifyInterfaceDialog
      }, {
        default: () => [createTextVNode("\u4FEE\u6539")]
      }), createVNode(resolveComponent("xGap"), {
        "l": "10"
      }, null), createVNode(resolveComponent("xButton"), {
        "onClick": this.showModifyInterfaceDialog
      }, {
        default: () => [createTextVNode("\u5220\u9664")]
      }), createVNode(resolveComponent("xGap"), {
        "f": "1"
      }, null)]), createVNode("div", {
        "class": "flex1 overflow-auto mt10"
      }, [createVNode(InfoCard, {
        "title": createVNode("span", null, [createTextVNode("\u57FA\u672C\u4FE1\u606F")]),
        "info": this.descriptions
      }, null), createVNode(resolveComponent("xGap"), {
        "t": "20"
      }, null), createVNode(InfoCard, {
        "title": "\u8BF7\u6C42\u53C2\u6570"
      }, {
        default: () => [createVNode(resolveComponent("aCard"), {
          "title": "Headers"
        }, {
          default: () => [createVNode("h3", null, [createTextVNode("Headers")])]
        }), createVNode(resolveComponent("xGap"), {
          "t": "10"
        }, null), createVNode(resolveComponent("aCard"), {
          "title": "Query"
        }, {
          default: () => [createVNode("h3", null, [createTextVNode("Query")])]
        })]
      }), createVNode(resolveComponent("xGap"), {
        "t": "20"
      }, null), createVNode(InfoCard, {
        "title": "\u8FD4\u56DE\u4FE1\u606F"
      }, {
        default: () => [createVNode(resolveComponent("aCard"), null, {
          default: () => [createTextVNode("\u8FD4\u56DE\u4FE1\u606F")]
        }), createVNode(resolveComponent("aCard"), null, {
          default: () => [createTextVNode("\u8FD4\u56DE\u4FE1\u606F")]
        }), createVNode(resolveComponent("aCard"), null, {
          default: () => [createTextVNode("\u8FD4\u56DE\u4FE1\u606F")]
        }), createVNode(resolveComponent("aCard"), null, {
          default: () => [createTextVNode("\u8FD4\u56DE\u4FE1\u606F")]
        }), createVNode(resolveComponent("aCard"), null, {
          default: () => [createTextVNode("\u8FD4\u56DE\u4FE1\u606F")]
        }), createVNode(resolveComponent("aCard"), null, {
          default: () => [createTextVNode("\u8FD4\u56DE\u4FE1\u606F")]
        }), createVNode(resolveComponent("aCard"), null, {
          default: () => [createTextVNode("\u8FD4\u56DE\u4FE1\u606F")]
        })]
      })])]
    });
  }
});
export {
  InterfaceDetail
};
//# sourceMappingURL=InterfaceDetail.27ddc346.js.map
