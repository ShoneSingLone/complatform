import { d as defineComponent, s as stateApp, b as defItem, i as itemsInvalid, e as API, f as xU, _ as _$handlePath, h as createVNode, r as resolveComponent, F as Fragment, j as isVNode, u as PRIVATE, v as createTextVNode, y as PUBLIC, D as DEV, O as OWNER, z as ADMIN, w as withDirectives, l as resolveDirective, B as _$randomValueAndProp, C as PROJECT_COLOR, x as xI$1, E as PROJECT_ICON, H as _export_sfc, I as openBlock, J as createElementBlock, K as withCtx, L as renderList, a as cptRouter, M as aHashLink, N as toRaw, Q as diff, R as defineComponentProps, S as usePrivateItemValue, T as markRaw, U as itemBaseProps, V as defXVirTableConfigs, W as defCol, X as h, Y as inject, Z as components, $, a0 as setDataGridInfo, a1 as defDataGrid, a2 as MonacoEditor, n as compositionAPI, a3 as HTTP_REQUEST_HEADER, a4 as compileVNode, a5 as QUERY, a6 as GET, a7 as HTTP_METHOD, a8 as BODY, a9 as defineAsyncComponent, aa as MkitTheme, ab as PreprocessHTML } from "./index.js";
import { p as pickValueFrom, F as FormRules, n as newRule, s as setValueTo } from "./common.FormRules.js";
import { I as ITEM_OPTIONS, a as ITEM_OPTIONS_VDOM } from "./common.options.js";
const ProjectCard$1 = "";
const Addproject = "";
const optionsXIcon = [
  "add",
  "addGroup",
  "allCategory",
  "arrow_left",
  "arrow_right",
  "back_group",
  "cached",
  "CaretDownOutlined",
  "CaretRightOutlined",
  "category",
  "CheckOutlined",
  "CloseOutlined",
  "cloud-o",
  "code-o",
  "column2",
  "column3",
  "configs",
  "copy",
  "database",
  "delete",
  "edit",
  "feedback",
  "folder",
  "folderOpen",
  "folder_content",
  "follow",
  "frown-o",
  "github",
  "gohome",
  "home",
  "icon_article",
  "icon_auto_test",
  "icon_filter",
  "icon_group",
  "icon_group_exclude",
  "icon_group_include",
  "icon_group_include_member",
  "icon_group_include_owner",
  "icon_group_personal",
  "icon_i18n",
  "icon_inbox",
  "icon_interface_mgr",
  "icon_project_setting",
  "icon_project_wiki",
  "icon_\u4F7F\u7528\u6587\u6863",
  "icon_\u6211\u7684\u5173\u6CE8",
  "icon_\u65B0\u5EFA\u9879\u76EE",
  "LockOutlined",
  "lockStrok",
  "logout",
  "mail",
  "MailOutlined",
  "mobile",
  "music",
  "nextsong",
  "pausesong",
  "playlist",
  "playLoop",
  "playOrder",
  "playRandom",
  "playSingleLoop",
  "playsong",
  "PlusOutlined",
  "prevsong",
  "privateNet",
  "question",
  "refresh",
  "scroll",
  "search",
  "SettingOutlined",
  "smail",
  "solution",
  "sound",
  "soundMute",
  "star",
  "stopsong",
  "subCategory",
  "subCategoryInterface",
  "team",
  "type_array",
  "type_boolean",
  "type_int",
  "type_number",
  "type_object",
  "type_string",
  "unfollow",
  "unlock",
  "user",
  "UserOutlined",
  "wikidoc",
  "yapi_logo"
];
function _isSlot$2(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const xItem_ProjectType = (options = {}) => {
  const value = options.value || PRIVATE;
  return {
    value,
    itemType: "RadioGroup",
    prop: "project_type",
    label: "\u6743\u9650",
    options: [{
      label: createVNode(resolveComponent("ElTooltip"), {
        "content": "\u53EA\u6709\u7EC4\u957F\u548C\u9879\u76EE\u5F00\u53D1\u8005\u53EF\u4EE5\u7D22\u5F15\u5E76\u67E5\u770B\u9879\u76EE\u4FE1\u606F"
      }, {
        default: () => [createVNode("span", {
          "class": "flex middle"
        }, [createVNode(resolveComponent("xIcon"), {
          "icon": "lockStrok"
        }, null), createVNode("span", null, [createTextVNode("\u79C1\u6709")])])]
      }),
      value: PRIVATE
    }, {
      label: createVNode(resolveComponent("ElTooltip"), {
        "content": "\u4EFB\u4F55\u4EBA\u90FD\u53EF\u4EE5\u7D22\u5F15\u5E76\u67E5\u770B\u9879\u76EE\u4FE1\u606F"
      }, {
        default: () => [createVNode("span", {
          "class": "flex middle"
        }, [createVNode(resolveComponent("xIcon"), {
          "icon": "unlock"
        }, null), createVNode("span", null, [createTextVNode("\u516C\u5F00")])])]
      }),
      value: PUBLIC
    }]
  };
};
const xItem_ProjectDesc = (options = {}) => {
  options.value || "";
  return {
    value: "",
    prop: "desc",
    label: "\u63CF\u8FF0",
    isTextarea: true,
    placeholder: "\u63CF\u8FF0\u4E0D\u8D85\u8FC7144\u5B57!",
    showCount: true,
    maxlength: 144
  };
};
const xItem_ProjectGroupId = (options = {}, vm) => {
  const value = options.value || "";
  return {
    value,
    prop: "group_id",
    label: "\u6240\u5C5E\u5206\u7EC4",
    placeholder: "\u8BF7\u9009\u62E9\u9879\u76EE\u6240\u5C5E\u7684\u5206\u7EC4",
    itemType: "Select",
    options: xU.map(stateApp.groupList, (i) => {
      return {
        label: i.group_name,
        value: String(i._id),
        disabled: ![DEV, OWNER, ADMIN].includes(i.role)
      };
    }),
    rules: [FormRules.required("\u8BF7\u9009\u62E9\u9879\u76EE\u6240\u5C5E\u7684\u5206\u7EC4!")]
  };
};
const xItem_ProjectBasePath = (options = {}) => {
  const value = options.value || "/";
  return {
    value,
    prop: "basepath",
    label: () => defItem.labelWithTips({
      label: "\u57FA\u672C\u8DEF\u5F84",
      icon: withDirectives(createVNode(resolveComponent("xIcon"), {
        "icon": "question"
      }, null), [[resolveDirective("xTips"), {
        content: "\u63A5\u53E3\u57FA\u672C\u8DEF\u5F84\uFF0C\u9ED8\u8BA4\u662F/"
      }]])
    }),
    placeholder: "\u63A5\u53E3\u57FA\u672C\u8DEF\u5F84\uFF0C\u9ED8\u8BA4\u662F/",
    rules: [FormRules.required("\u8BF7\u8F93\u5165\u9879\u76EE\u57FA\u672C\u8DEF\u5F84!")]
  };
};
const xItem_ProjectColor = (options = {}) => {
  const [defaultValue] = _$randomValueAndProp(PROJECT_COLOR);
  const value = options.value || defaultValue;
  return {
    value,
    prop: "color",
    itemType: "el-color-picker",
    label: xI$1("icon\u80CC\u666F\u989C\u8272"),
    rules: [FormRules.required()]
  };
};
const xItem_ProjectIcon = (options = {}) => {
  const [defaultValue] = _$randomValueAndProp(PROJECT_ICON);
  const value = options.value || defaultValue;
  return {
    value,
    prop: "icon",
    itemType: "Select",
    label: xI$1("\u56FE\u6807"),
    rules: [FormRules.required()],
    options: xU.map(optionsXIcon, (value2) => {
      return {
        label: createVNode("span", null, [createVNode(resolveComponent("xIcon"), {
          "icon": value2
        }, null), createVNode("span", {
          "class": "ml10"
        }, [value2])]),
        value: value2
      };
    }),
    afterControll: ({
      privateValue
    }) => {
      return createVNode(resolveComponent("xIcon"), {
        "icon": privateValue,
        "style": "margin:0 20px"
      }, null);
    }
  };
};
const xItem_ProjectName = (options = {}) => {
  const value = options.value || "";
  const prop = options.prop || "name";
  const appendRules = options.appendRules;
  const rules = [FormRules.required("\u8BF7\u8F93\u5165\u9879\u76EE\u540D\u79F0"), FormRules.nameLength({
    label: xI$1("\u9879\u76EE")
  })];
  if (xU.isArray(appendRules)) {
    rules.concat(appendRules);
  }
  return {
    itemType: "Input",
    label: "\u9879\u76EE\u540D\u79F0",
    prop,
    value,
    rules
  };
};
const DialogAddProject = defineComponent({
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
      dataXItem: {
        projectGroupId: defItem(xItem_ProjectGroupId({
          value: vm.propOptions.groupId
        })),
        projectName: defItem(xItem_ProjectName()),
        projectIcon: defItem(xItem_ProjectIcon()),
        projectColor: defItem(xItem_ProjectColor()),
        projectBasePath: defItem(xItem_ProjectBasePath()),
        projectDesc: defItem(xItem_ProjectDesc()),
        projectType: defItem(xItem_ProjectType())
      },
      state: {
        groupList: []
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      stateApp._setBreadcrumb([{
        name: "\u65B0\u5EFA\u9879\u76EE"
      }]);
      if (!stateApp.currGroup._id) {
        await stateApp._fetchGroupList();
      }
      if (stateApp.groupList.length === 0) {
        return null;
      }
    },
    async submit() {
      const vm = this;
      try {
        if (!await itemsInvalid()) {
          const {
            projectGroupId,
            projectName,
            projectIcon,
            projectColor,
            projectBasePath,
            projectDesc,
            projectType
          } = pickValueFrom(vm.dataXItem);
          const {
            data
          } = await API.project.addProject({
            name: projectName,
            desc: projectDesc,
            basepath: projectBasePath,
            project_type: projectType,
            group_id: projectGroupId,
            group_name: xU.find(stateApp.groupList, {
              _id: Number(projectGroupId)
            }).group_name,
            icon: projectIcon,
            color: projectColor
          });
          xU.notification.success("\u521B\u5EFA\u6210\u529F! ");
          return true;
        } else {
          throw new Error("\u672A\u901A\u8FC7\u9A8C\u8BC1");
        }
      } catch (e) {
        xU.notification.error(e.message);
        console.error(e);
      }
    },
    _$handlePath(e) {
      let val = e.target.value;
      this.props.form.setFieldsValue({
        basepath: _$handlePath(val)
      });
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
    }, _isSlot$2(_slot = xU.map(this.dataXItem, (configs, prop) => {
      console.log(configs);
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
        onOk: async () => {
          const res = await this.submit();
          if (res) {
            this.propOptions.updateProjectList();
            this.propOptions.$close();
          }
        }
      }
    }, null)]);
  }
});
const _sfc_main = defineComponent({
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
  methods: {
    async onOk() {
      if (!await itemsInvalid()) {
        const {
          name,
          icon
        } = pickValueFrom(this.formItems);
        try {
          await this.propOptions.copyProject({
            newProjectName: name,
            icon
          });
          this.propOptions.$close();
        } catch (error) {
          console.error(error);
          xU.message.error("\u590D\u5236\u5931\u8D25");
        }
      } else {
        throw new Error("\u672A\u901A\u8FC7\u9A8C\u8BC1");
      }
    }
  },
  computed: {
    propProjectName() {
      var _a;
      return String(((_a = this.propOptions) == null ? void 0 : _a.projectName) || "");
    },
    dialogDefautBtn() {
      return {
        textOk: xI$1("\u590D\u5236"),
        onCancel: this.propOptions.$close,
        onOk: this.onOk
      };
    }
  },
  data() {
    const vm = this;
    return {
      alertMessage: `\u8BE5\u64CD\u4F5C\u5C06\u4F1A\u590D\u5236 ${this.propProjectName} \u4E0B\u7684\u6240\u6709\u63A5\u53E3\u96C6\u5408\uFF0C\u4F46\u4E0D\u5305\u62EC\u6D4B\u8BD5\u96C6\u5408\u4E2D\u7684\u63A5\u53E3`,
      formItems: {
        projectName: defItem(xItem_ProjectName({
          value: this.propProjectName,
          appendRules: [newRule({
            validator(value, {
              configs,
              rule
            }) {
              if (value === vm.propOptions.projectName) {
                rule.msg = "\u4E0D\u80FD\u4E0E\u539F\u9879\u76EE\u540D\u76F8\u540C";
                return FormRules.FAIL;
              } else {
                return FormRules.SUCCESS;
              }
            }
          })]
        })),
        projectIcon: defItem(xItem_ProjectIcon())
      }
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_elAlert = resolveComponent("elAlert");
  const _component_xGap = resolveComponent("xGap");
  const _component_xItem = resolveComponent("xItem");
  const _component_xForm = resolveComponent("xForm");
  const _component_elCard = resolveComponent("elCard");
  const _component_xDialogFooter = resolveComponent("xDialogFooter");
  return openBlock(), createElementBlock(Fragment, null, [
    createVNode(_component_elCard, { class: "flex1" }, {
      default: withCtx(() => [
        createVNode(_component_elAlert, {
          title: _ctx.alertMessage,
          type: "info"
        }, null, 8, ["title"]),
        createVNode(_component_xForm, {
          class: "flex vertical",
          "label-style": { "min-width": "120px", width: "unset" }
        }, {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.formItems, (item, prop) => {
              return openBlock(), createElementBlock(Fragment, { key: prop }, [
                createVNode(_component_xGap, { t: "" }),
                createVNode(_component_xItem, { configs: item }, null, 8, ["configs"])
              ], 64);
            }), 128))
          ]),
          _: 1
        })
      ]),
      _: 1
    }),
    createVNode(_component_xDialogFooter, { configs: _ctx.dialogDefautBtn }, null, 8, ["configs"])
  ], 64);
}
const ViewCopyProject = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
const ProjectCard = defineComponent({
  props: ["projectData", "uid", "inFollowPage", "callbackResult", "isShow", "getProject", "checkProjectName", "currPage"],
  setup() {
    return {
      stateApp,
      cptRouter
    };
  },
  methods: {
    showCopyProjectDialog() {
      xU.dialog({
        title: `\u590D\u5236\u9879\u76EE${this.projectData.name}`,
        component: ViewCopyProject,
        copyProject: this.copyProject,
        projectName: this.projectData.name
      });
    },
    async copyProject({
      newProjectName,
      icon
    }) {
      const id = this.projectData._id;
      let {
        data
      } = await API.project.getProjectById(id);
      data = xU.merge(data, {
        icon
      }, {
        name: newProjectName
      }, {
        preName: data.name
      });
      await API.project.copyProjectMsg(data);
      xU.message.success("\u9879\u76EE\u590D\u5236\u6210\u529F");
      this.callbackResult();
    },
    add: xU.debounce(async function() {
      try {
        const {
          projectData
        } = this;
        const uid = this.stateApp.user.uid;
        const param = {
          uid,
          projectid: projectData._id,
          projectname: projectData.name,
          icon: projectData.icon,
          color: projectData.color
        };
        await API.project.addFollow(param);
      } catch (error) {
        console.error(error);
      } finally {
        this.callbackResult();
      }
    }, 300),
    del: xU.debounce(async function() {
      try {
        const id = this.projectData.projectid || this.projectData._id;
        await API.project.delFollow(id);
      } catch (error) {
        console.error(error);
      } finally {
        this.callbackResult();
      }
    }, 300)
  },
  computed: {
    followIcon() {
      return createVNode("div", {
        "class": "pointer icon-item-wrapper",
        "onClick": this.followIconClickHandler
      }, [createVNode(resolveComponent("ElTooltip"), {
        "content": this.followIconTitle,
        "placement": "top-start"
      }, {
        default: () => [createVNode(resolveComponent("xIcon"), {
          "icon": this.followIconIcon,
          "style": {
            fill: "#faad14"
          }
        }, null)]
      })]);
    },
    copyIcon() {
      if (this.isShow) {
        return createVNode("div", {
          "class": "pointer icon-copy icon-item-wrapper",
          "onClick": this.showCopyProjectDialog
        }, [createVNode(resolveComponent("ElTooltip"), {
          "content": "\u590D\u5236\u9879\u76EE",
          "placement": "top-start"
        }, {
          default: () => [createVNode(resolveComponent("xIcon"), {
            "icon": "copy",
            "style": {
              fill: "#232426"
            }
          }, null)]
        })]);
      }
      return null;
    },
    iconStyle() {
      return {
        fill: "white",
        width: "48px",
        height: "48px",
        borderRadius: "var(--baorder-radius,10px)",
        backgroundColor: this.projectData.color
      };
    },
    isFollowStatus() {
      return Boolean(this.projectData.follow || this.inFollowPage);
    },
    followIconTitle() {
      return this.isFollowStatus ? "\u53D6\u6D88\u5173\u6CE8" : "\u6DFB\u52A0\u5173\u6CE8";
    },
    followIconIcon() {
      return this.isFollowStatus ? "follow" : "unfollow";
    },
    followIconClickHandler() {
      return this.isFollowStatus ? this.del : this.add;
    },
    logo() {
      return createVNode("a", {
        "href": aHashLink("/project", {
          project_id: this.projectData._id,
          group_id: this.cptRouter.query.group_id
        })
      }, [createVNode(resolveComponent("xIcon"), {
        "class": "ui-logo",
        "icon": this.projectData.icon,
        "style": this.iconStyle
      }, null)]);
    },
    title() {
      return createVNode("div", {
        "class": "ui-title"
      }, [createVNode("span", null, [this.projectData.name || this.projectData.projectname])]);
    }
  },
  render() {
    return createVNode("div", {
      "class": "card-container"
    }, [createVNode("div", {
      "class": "project-card-wrapper"
    }, [createVNode("div", {
      "class": "el-card is-always-shadow"
    }, [createVNode("div", {
      "class": "el-card__body"
    }, [this.logo, this.title])])]), createVNode("div", {
      "class": "card-btns flex"
    }, [this.copyIcon, this.followIcon])]);
  }
});
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
    "modelValue",
    "genItem",
    "fnCheck"
  ],
  emits: ["update:modelValue"],
  setup() {
    return {
      stateApp
    };
  },
  data() {
    return {
      privateItems: {},
      isLoading: true
    };
  },
  watch: {
    modelValue: {
      deep: true,
      handler() {
        const diffContent = toRaw(diff(this.modelValue, this.oldItems));
        if (diffContent) {
          this.setPrivateItems();
        }
      }
    },
    formData() {
      this.isLoading = true;
      this.checkFormDataDebounce();
    }
  },
  mounted() {
  },
  computed: {
    formData() {
      const formData = xU.reduce(this.privateItems, (formData2, privateTag, prop) => {
        formData2[prop] = {
          key: privateTag.keyConfigs.value,
          value: privateTag.valueConfigs.value
        };
        return formData2;
      }, {});
      return formData;
    }
  },
  methods: {
    setPrivateItems() {
      const {
        modelValue
      } = this;
      this.oldItems = modelValue;
      const vm = this;
      if (xU.isArrayFill(modelValue)) {
        let index = 1;
        vm.privateItems = xU.reduce(modelValue, (_items, tag) => {
          _items[index] = vm.genItem({
            ...tag,
            index
          });
          ++index;
          return _items;
        }, {});
      } else {
        vm.privateItems = {
          0: vm.genItem({
            index: 0
          })
        };
      }
    },
    checkFormDataDebounce: xU.debounce(function() {
      if (this.isFormDataOk()) {
        const keys = Object.keys(this.formData).map(Number).sort(orderAsc);
        const value = xU.reduce(keys, (_value, prop) => {
          const item = this.formData[prop];
          if (xU.isInput(item.key)) {
            _value.push(item);
          }
          return _value;
        }, []);
        this.$emit("update:modelValue", value);
      }
      this.isLoading = false;
    }, 1e3),
    isFormDataOk() {
      const res = xU.map(this.formData, ({
        key: key2
      }, prop) => {
        if (xU.some(this.formData, ({
          key: _key
        }, _index) => {
          if (_index == prop) {
            return false;
          } else {
            return _key === key2;
          }
        })) {
          this.privateItems[prop].keyConfigs.itemTips = {
            type: "error",
            msg: `${key2} \u4E0E\u5DF2\u6709\u6807\u8BC6\u91CD\u590D`
          };
          return;
        } else {
          if (this.fnCheck) {
            const isFail = this.fnCheck(this.privateItems[prop]);
            if (isFail == FormRules.FAIL) {
              return;
            }
          }
          this.privateItems[prop].keyConfigs.itemTips = {
            type: "",
            msg: ""
          };
          return;
        }
      });
      return !xU.some(res, (i) => i === FormRules.FAIL);
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
      const nextIndex = Number(xU.last(keys)) + 1;
      this.privateItems[nextIndex] = this.genItem({
        index: nextIndex
      });
    }
  },
  render() {
    const vm = this;
    return createVNode(Fragment, null, [createVNode("div", {
      "class": "ml10 mr10"
    }, [xU.map(this.privateItems, ({
      valueConfigs,
      keyConfigs,
      _id
    }, index) => {
      return createVNode("div", {
        "class": "flex mt10 baseline"
      }, [createVNode(resolveComponent("xItem"), {
        "configs": keyConfigs,
        "modelValue": keyConfigs.value,
        "onUpdate:modelValue": ($event) => keyConfigs.value = $event,
        "key": `${this._.uid}_key_${index}`
      }, null), createVNode(resolveComponent("xGap"), {
        "l": "10"
      }, null), createVNode("span", {
        "class": "flex middle"
      }, [createVNode(resolveComponent("xItem"), {
        "configs": valueConfigs,
        "modelValue": valueConfigs.value,
        "onUpdate:modelValue": ($event) => valueConfigs.value = $event,
        "key": `${this._.uid}_value_${index}`
      }, null), createVNode(resolveComponent("xGap"), {
        "l": "10"
      }, null), withDirectives(createVNode(resolveComponent("xIcon"), {
        "icon": "delete",
        "onClick": () => this.deleteItem(index),
        "style": "color:red;",
        "class": "pointer"
      }, null), [[resolveDirective("xloading"), this.isLoading]])])]);
    })]), withDirectives(createVNode(resolveComponent("xIcon"), {
      "icon": "add",
      "style": "color:#1890ff;",
      "onClick": this.addItem,
      "class": "pointer mt10 ml10 mb10"
    }, null), [[resolveDirective("xloading"), vm.isLoading]])]);
  }
});
const DialogUpsertProxyEnv = defineComponent({
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
      isLoading: true,
      privateEnv: {},
      currentSelected: "",
      configsForm: {
        name: defItem({
          label: xI$1("\u73AF\u5883\u540D\u79F0")
        }),
        domain: defItem({
          label: xI$1("\u73AF\u5883\u57DF\u540D"),
          slots: markRaw({
            addonBefore: () => createVNode(resolveComponent("xItem"), {
              "configs": vm.configsForm.protocol
            }, null)
          }),
          rules: [newRule({
            validator(value) {
              if (value.length === 0) {
                return "\u8BF7\u8F93\u5165\u73AF\u5883\u57DF\u540D!";
              } else if (/\s/.test(value)) {
                return "\u73AF\u5883\u57DF\u540D\u4E0D\u5141\u8BB8\u51FA\u73B0\u7A7A\u683C!";
              } else {
                return "";
              }
            }
          })]
        }),
        protocol: defItem({
          itemType: "Select",
          options: ITEM_OPTIONS.httpProtocol,
          style: "width:100px;"
        }),
        header: defItem({
          value: [],
          label: "Header",
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
              key: key2,
              value
            } = args;
            return {
              _id: index,
              keyConfigs: defItem({
                prop: "key" + index,
                placeholder: "Header\u540D\u79F0",
                value: key2 || ""
              }),
              valueConfigs: defItem({
                prop: "value" + index,
                placeholder: "Header\u503C",
                value: value || ""
              })
            };
          }
        }),
        cookie: defItem({
          value: [],
          label: "Cookie",
          itemType: KeyValuePanel,
          genItem(args) {
            const {
              index,
              key: key2,
              value
            } = args;
            return {
              _id: index,
              keyConfigs: defItem({
                prop: "key" + index,
                placeholder: "Cookie\u540D\u79F0",
                value: key2 || ""
              }),
              valueConfigs: defItem({
                prop: "value" + index,
                placeholder: "Cookie\u503C",
                value: value || ""
              })
            };
          }
        }),
        global: defItem({
          value: [],
          label: "global",
          itemType: KeyValuePanel,
          genItem(args) {
            const {
              index,
              key: key2,
              value
            } = args;
            return {
              _id: index,
              keyConfigs: defItem({
                prop: "key" + index,
                placeholder: "global\u540D\u79F0",
                value: key2 || ""
              }),
              valueConfigs: defItem({
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
    "stateApp.currProject.env": {
      immediate: true,
      handler(env) {
        if (!env) {
          return;
        }
        this.privateEnv = xU.cloneDeep(env);
        let currentSelected = false;
        if (this.raw$EnvId) {
          currentSelected = xU.find(this.privateEnv, {
            _id: this.raw$EnvId
          });
          this.raw$EnvId = false;
        }
        if (!currentSelected) {
          currentSelected = xU.first(this.privateEnv);
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
      if (this.stateApp.currProject._id) {
        return this.stateApp.currProject._id;
      } else {
        alert("miss projectId");
      }
    },
    vDomLeftSide() {
      return createVNode("div", {
        "class": "env-list flex vertical flex1 width100 overflow-auto height100 "
      }, [xU.map(this.privateEnv, (i) => {
        const className = i._id === this.currentSelected._id ? "delete-env-btn active" : "delete-env-btn";
        const fnDelete = (() => {
          if (/^new_env/.test(i._id)) {
            return async () => {
              try {
                await xU.confirm({
                  content: `\u5220\u9664\u73AF\u5883\u53D8\u91CF${i.name}?`
                });
                const envIndex = xU.findIndex(this.privateEnv, {
                  _id: i._id
                });
                this.privateEnv.splice(envIndex, 1);
              } catch (error) {
              }
            };
          }
          return async () => this.deleteEnv(i);
        })();
        return createVNode(resolveComponent("xButton"), {
          "type": "text",
          "onClick": () => this.switchEvn(i),
          "class": className
        }, {
          default: () => [createVNode("div", {
            "class": "flex middle"
          }, [withDirectives(createVNode("div", {
            "class": "flex1 ellipsis",
            "style": "text-align:left;"
          }, [i.name]), [[resolveDirective("xTips"), {
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
    vdomEnvconfigs() {
      const vDomContent = (() => {
        if (this.isLoading) {
          return createVNode("div", {
            "x-xloading": "true",
            "class": "ant-spin ant-spin-spinning flex middle center height100 width100"
          }, null);
        }
        return createVNode(resolveComponent("xForm"), {
          "labelStyle": {
            "text-align": "left",
            width: "80px",
            padding: "0 14px"
          }
        }, {
          default: () => [createVNode(resolveComponent("xGap"), {
            "t": true
          }, null), createVNode(resolveComponent("xItem"), {
            "configs": this.configsForm.name
          }, null), createVNode(resolveComponent("xGap"), {
            "t": true
          }, null), createVNode(resolveComponent("xItem"), {
            "configs": this.configsForm.domain
          }, null), createVNode(resolveComponent("xGap"), {
            "t": true
          }, null), createVNode(resolveComponent("xItem"), {
            "configs": this.configsForm.global
          }, null), createVNode(resolveComponent("xGap"), {
            "t": true
          }, null), createVNode(resolveComponent("xItem"), {
            "configs": this.configsForm.header
          }, null), createVNode(resolveComponent("xGap"), {
            "t": true
          }, null), createVNode(resolveComponent("xItem"), {
            "configs": this.configsForm.cookie
          }, null), createVNode(resolveComponent("xGap"), {
            "t": true
          }, null)]
        });
      })();
      return createVNode("div", {
        "class": "env-configs flex1 app-padding ant-card ant-card-bordered overflow-auto"
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
          await xU.confirm({
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
      const item = xU.cloneDeep(this.currentSelected || []);
      item.name = item.name || "";
      item.protocol = (() => item.domain ? item.domain.split("//")[0] + "//" : "http://")();
      item.domain = (() => item.domain ? item.domain.split("//")[1] : "")();
      const cookieIndex = xU.findIndex(item.header, {
        name: "Cookie"
      });
      if (~cookieIndex) {
        const cookieString = item.header.splice(cookieIndex, 1)[0].value;
        if (cookieString.length > 2) {
          item.cookie = cookieString.split(";").map((i) => {
            if (i) {
              const [key2, value] = i.split("=");
              return {
                key: key2,
                value
              };
            }
          });
        }
      } else {
        item.cookie = [];
      }
      item.header = xU.map(item.header || [], makeKeyValueObj);
      item.global = xU.map(item.global || [], makeKeyValueObj);
      setValueTo(this.configsForm, item);
      this.leftData = pickValueFrom(this.configsForm);
      setTimeout(() => {
        this.isLoading = false;
      }, 64);
    },
    async onOk() {
      if (await itemsInvalid()) {
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
      header = xU.map(header, makeNameValueObj);
      cookie = xU.map(cookie, makeNameValueObj);
      global = xU.map(global, makeNameValueObj);
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
      const envIndex = xU.findIndex(this.privateEnv, {
        _id: env._id
      });
      if (/^new_env/.test(this.currentSelected._id)) {
        delete env._id;
      }
      const envArray = xU.cloneDeep(this.privateEnv);
      if (~envIndex) {
        envArray.splice(envIndex, 1, env);
      } else {
        envArray.push(env);
      }
      await API.project.updateProxyEnv({
        id: this.propProjectId,
        env: envArray
      });
      xU.message.success(xI$1("\u73AF\u5883\u8BBE\u7F6E\u6210\u529F"));
      stateApp._setCurrProject(this.propProjectId, {
        isEnforce: true
      });
    },
    async addEnv() {
      const newItem = {
        header: [],
        global: [],
        _id: xU.genId("new_env"),
        name: xU.genId("env_name"),
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
        await xU.confirm({
          content: `\u5220\u9664\u73AF\u5883\u53D8\u91CF${item.name}?`
        });
        const envIndex = xU.findIndex(this.privateEnv, {
          _id: id
        });
        const envArray = xU.cloneDeep(this.privateEnv);
        envArray.splice(envIndex, 1);
        await API.project.updateProxyEnv({
          id: this.propProjectId,
          env: envArray
        });
        xU.message.success(xI$1("\u73AF\u5883\u8BBE\u7F6E\u6210\u529F"));
        stateApp._setCurrProject(this.propProjectId, {
          isEnforce: true
        });
      } catch (error) {
      }
    }
  },
  render() {
    return createVNode(Fragment, null, [createVNode("div", {
      "class": "DialogUpsertProxyEnv flex1 flex horizon app-padding",
      "style": "overflow:auto;"
    }, [createVNode("div", {
      "class": "env-list-wrapper flex vertical"
    }, [createVNode("div", {
      "class": "flex center mb10"
    }, [withDirectives(createVNode(resolveComponent("xIcon"), {
      "icon": "add",
      "onClick": this.addEnv,
      "class": "flex middle color-primary pointer"
    }, null), [[resolveDirective("xTips"), {
      content: "\u6DFB\u52A0\u65B0\u73AF\u5883",
      delay: 1e3
    }]])]), this.vDomLeftSide]), createVNode("div", {
      "class": "env-configs-wrapper flex1 flex"
    }, [this.vdomEnvconfigs])]), createVNode(resolveComponent("xDialogFooter"), {
      "configs": {
        textOk: xI$1("\u6682\u5B58"),
        onOk: this.onOk,
        onCancel: this.propOptions.$close
      }
    }, null)]);
  }
});
const KeyValuePanel = defineComponent({
  props: defineComponentProps(itemBaseProps),
  setup(props) {
    return {
      _itemValue: usePrivateItemValue(props, [])
    };
  },
  components: {
    InputKeyValue
  },
  render() {
    const {
      properties
    } = this;
    properties.fnCheck = properties.fnCheck || false;
    return createVNode("div", {
      "class": "ant-card ant-card-bordered",
      "style": "padding:10px"
    }, [createVNode(InputKeyValue, {
      "modelValue": this._itemValue,
      "onUpdate:modelValue": ($event) => this._itemValue = $event,
      "genItem": properties.genItem,
      "fnCheck": properties.fnCheck
    }, null)]);
  }
});
function newFormData$2() {
  return {
    _id: xU.genId("body_params"),
    name: "",
    type: "text",
    required: "1",
    desc: "",
    example: ""
  };
}
const BodyParamsForm = defineComponent({
  props: ["reqBodyForm"],
  watch: {
    reqBodyForm: {
      immediate: true,
      handler(reqBodyForm) {
        this.resetDataForm(reqBodyForm);
      }
    }
  },
  methods: {
    addRow() {
      this.configs_table.dataSource.unshift(newFormData$2());
    },
    deleteRow(_id) {
      const index = xU.findIndex(this.configs_table.dataSource, {
        _id
      });
      if (~index) {
        this.configs_table.dataSource.splice(index, 1);
      }
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
        customClass: (tableId) => [`#${tableId} .input-width100{width:100%;}`, `#${tableId} div[role=td] .el-tag{margin:auto;}`, `#${tableId} div[role=tr] div[role=th][data-prop=operations]{justify-content:center;}`, `#${tableId} div[role=tr] div[role=td][data-prop=operations]{justify-content:center;color:red;}`].join("\n"),
        columns: {
          ...defCol({
            label: xI$1("\u540D\u79F0"),
            prop: "name",
            renderEditor: ({
              record
            }) => createVNode(resolveComponent("ElInput"), {
              "value": record.name,
              "onUpdate:value": ($event) => record.name = $event
            }, null)
          }),
          ...defCol({
            label: xI$1("\u7C7B\u578B"),
            prop: "type",
            width: "110px",
            renderCell: ({
              record
            }) => ITEM_OPTIONS_VDOM.interfaceBodyFormType(record.type),
            renderEditor: ({
              record
            }) => createVNode(resolveComponent("ElSelect"), {
              "options": ITEM_OPTIONS.interfaceBodyFormType,
              "value": record.type,
              "onUpdate:value": ($event) => record.type = $event
            }, null)
          }),
          ...defCol({
            label: xI$1("\u5FC5\u9700"),
            prop: "required",
            width: "110px",
            renderCell: ({
              record
            }) => ITEM_OPTIONS_VDOM.required(record.required),
            renderEditor: ({
              record
            }) => createVNode(resolveComponent("ElSelect"), {
              "options": ITEM_OPTIONS.required,
              "value": record.required,
              "onUpdate:value": ($event) => record.required = $event
            }, null)
          }),
          ...defCol({
            label: xI$1("\u793A\u4F8B"),
            prop: "example",
            renderEditor: ({
              record
            }) => createVNode(resolveComponent("ElInput"), {
              "value": record.example,
              "onUpdate:value": ($event) => record.example = $event
            }, null)
          }),
          ...defCol({
            label: xI$1("\u5907\u6CE8"),
            prop: "desc",
            renderEditor: ({
              record
            }) => createVNode(resolveComponent("ElInput"), {
              "value": record.desc,
              "onUpdate:value": ($event) => record.desc = $event
            }, null)
          }),
          ...defCol({
            label: xI$1("\u64CD\u4F5C"),
            prop: "operations",
            width: "40px",
            renderHeader: () => null,
            renderCell: ({
              record
            }) => createVNode(resolveComponent("xIcon"), {
              "icon": "delete",
              "class": "pointer",
              "onClick": () => vm.deleteRow(record._id)
            }, null)
          })
        }
      })
    };
  },
  render() {
    return createVNode(Fragment, null, [createVNode(resolveComponent("xButton"), {
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
var Space_Separator = /[\u1680\u2000-\u200A\u202F\u205F\u3000]/;
var ID_Start = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE83\uDE86-\uDE89\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]/;
var ID_Continue = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09FC\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF9\u1D00-\u1DF9\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDE00-\uDE3E\uDE47\uDE50-\uDE83\uDE86-\uDE99\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/;
var unicode = {
  Space_Separator,
  ID_Start,
  ID_Continue
};
var util = {
  isSpaceSeparator(c2) {
    return typeof c2 === "string" && unicode.Space_Separator.test(c2);
  },
  isIdStartChar(c2) {
    return typeof c2 === "string" && (c2 >= "a" && c2 <= "z" || c2 >= "A" && c2 <= "Z" || c2 === "$" || c2 === "_" || unicode.ID_Start.test(c2));
  },
  isIdContinueChar(c2) {
    return typeof c2 === "string" && (c2 >= "a" && c2 <= "z" || c2 >= "A" && c2 <= "Z" || c2 >= "0" && c2 <= "9" || c2 === "$" || c2 === "_" || c2 === "\u200C" || c2 === "\u200D" || unicode.ID_Continue.test(c2));
  },
  isDigit(c2) {
    return typeof c2 === "string" && /[0-9]/.test(c2);
  },
  isHexDigit(c2) {
    return typeof c2 === "string" && /[0-9A-Fa-f]/.test(c2);
  }
};
let source;
let parseState;
let stack;
let pos;
let line;
let column;
let token;
let key;
let root;
var parse = function parse2(text, reviver) {
  source = String(text);
  parseState = "start";
  stack = [];
  pos = 0;
  line = 1;
  column = 0;
  token = void 0;
  key = void 0;
  root = void 0;
  do {
    token = lex();
    parseStates[parseState]();
  } while (token.type !== "eof");
  if (typeof reviver === "function") {
    return internalize({ "": root }, "", reviver);
  }
  return root;
};
function internalize(holder, name, reviver) {
  const value = holder[name];
  if (value != null && typeof value === "object") {
    if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        const key2 = String(i);
        const replacement = internalize(value, key2, reviver);
        if (replacement === void 0) {
          delete value[key2];
        } else {
          Object.defineProperty(value, key2, {
            value: replacement,
            writable: true,
            enumerable: true,
            configurable: true
          });
        }
      }
    } else {
      for (const key2 in value) {
        const replacement = internalize(value, key2, reviver);
        if (replacement === void 0) {
          delete value[key2];
        } else {
          Object.defineProperty(value, key2, {
            value: replacement,
            writable: true,
            enumerable: true,
            configurable: true
          });
        }
      }
    }
  }
  return reviver.call(holder, name, value);
}
let lexState;
let buffer;
let doubleQuote;
let sign;
let c;
function lex() {
  lexState = "default";
  buffer = "";
  doubleQuote = false;
  sign = 1;
  for (; ; ) {
    c = peek();
    const token2 = lexStates[lexState]();
    if (token2) {
      return token2;
    }
  }
}
function peek() {
  if (source[pos]) {
    return String.fromCodePoint(source.codePointAt(pos));
  }
}
function read() {
  const c2 = peek();
  if (c2 === "\n") {
    line++;
    column = 0;
  } else if (c2) {
    column += c2.length;
  } else {
    column++;
  }
  if (c2) {
    pos += c2.length;
  }
  return c2;
}
const lexStates = {
  default() {
    switch (c) {
      case "	":
      case "\v":
      case "\f":
      case " ":
      case "\xA0":
      case "\uFEFF":
      case "\n":
      case "\r":
      case "\u2028":
      case "\u2029":
        read();
        return;
      case "/":
        read();
        lexState = "comment";
        return;
      case void 0:
        read();
        return newToken("eof");
    }
    if (util.isSpaceSeparator(c)) {
      read();
      return;
    }
    return lexStates[parseState]();
  },
  comment() {
    switch (c) {
      case "*":
        read();
        lexState = "multiLineComment";
        return;
      case "/":
        read();
        lexState = "singleLineComment";
        return;
    }
    throw invalidChar(read());
  },
  multiLineComment() {
    switch (c) {
      case "*":
        read();
        lexState = "multiLineCommentAsterisk";
        return;
      case void 0:
        throw invalidChar(read());
    }
    read();
  },
  multiLineCommentAsterisk() {
    switch (c) {
      case "*":
        read();
        return;
      case "/":
        read();
        lexState = "default";
        return;
      case void 0:
        throw invalidChar(read());
    }
    read();
    lexState = "multiLineComment";
  },
  singleLineComment() {
    switch (c) {
      case "\n":
      case "\r":
      case "\u2028":
      case "\u2029":
        read();
        lexState = "default";
        return;
      case void 0:
        read();
        return newToken("eof");
    }
    read();
  },
  value() {
    switch (c) {
      case "{":
      case "[":
        return newToken("punctuator", read());
      case "n":
        read();
        literal("ull");
        return newToken("null", null);
      case "t":
        read();
        literal("rue");
        return newToken("boolean", true);
      case "f":
        read();
        literal("alse");
        return newToken("boolean", false);
      case "-":
      case "+":
        if (read() === "-") {
          sign = -1;
        }
        lexState = "sign";
        return;
      case ".":
        buffer = read();
        lexState = "decimalPointLeading";
        return;
      case "0":
        buffer = read();
        lexState = "zero";
        return;
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        buffer = read();
        lexState = "decimalInteger";
        return;
      case "I":
        read();
        literal("nfinity");
        return newToken("numeric", Infinity);
      case "N":
        read();
        literal("aN");
        return newToken("numeric", NaN);
      case '"':
      case "'":
        doubleQuote = read() === '"';
        buffer = "";
        lexState = "string";
        return;
    }
    throw invalidChar(read());
  },
  identifierNameStartEscape() {
    if (c !== "u") {
      throw invalidChar(read());
    }
    read();
    const u = unicodeEscape();
    switch (u) {
      case "$":
      case "_":
        break;
      default:
        if (!util.isIdStartChar(u)) {
          throw invalidIdentifier();
        }
        break;
    }
    buffer += u;
    lexState = "identifierName";
  },
  identifierName() {
    switch (c) {
      case "$":
      case "_":
      case "\u200C":
      case "\u200D":
        buffer += read();
        return;
      case "\\":
        read();
        lexState = "identifierNameEscape";
        return;
    }
    if (util.isIdContinueChar(c)) {
      buffer += read();
      return;
    }
    return newToken("identifier", buffer);
  },
  identifierNameEscape() {
    if (c !== "u") {
      throw invalidChar(read());
    }
    read();
    const u = unicodeEscape();
    switch (u) {
      case "$":
      case "_":
      case "\u200C":
      case "\u200D":
        break;
      default:
        if (!util.isIdContinueChar(u)) {
          throw invalidIdentifier();
        }
        break;
    }
    buffer += u;
    lexState = "identifierName";
  },
  sign() {
    switch (c) {
      case ".":
        buffer = read();
        lexState = "decimalPointLeading";
        return;
      case "0":
        buffer = read();
        lexState = "zero";
        return;
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        buffer = read();
        lexState = "decimalInteger";
        return;
      case "I":
        read();
        literal("nfinity");
        return newToken("numeric", sign * Infinity);
      case "N":
        read();
        literal("aN");
        return newToken("numeric", NaN);
    }
    throw invalidChar(read());
  },
  zero() {
    switch (c) {
      case ".":
        buffer += read();
        lexState = "decimalPoint";
        return;
      case "e":
      case "E":
        buffer += read();
        lexState = "decimalExponent";
        return;
      case "x":
      case "X":
        buffer += read();
        lexState = "hexadecimal";
        return;
    }
    return newToken("numeric", sign * 0);
  },
  decimalInteger() {
    switch (c) {
      case ".":
        buffer += read();
        lexState = "decimalPoint";
        return;
      case "e":
      case "E":
        buffer += read();
        lexState = "decimalExponent";
        return;
    }
    if (util.isDigit(c)) {
      buffer += read();
      return;
    }
    return newToken("numeric", sign * Number(buffer));
  },
  decimalPointLeading() {
    if (util.isDigit(c)) {
      buffer += read();
      lexState = "decimalFraction";
      return;
    }
    throw invalidChar(read());
  },
  decimalPoint() {
    switch (c) {
      case "e":
      case "E":
        buffer += read();
        lexState = "decimalExponent";
        return;
    }
    if (util.isDigit(c)) {
      buffer += read();
      lexState = "decimalFraction";
      return;
    }
    return newToken("numeric", sign * Number(buffer));
  },
  decimalFraction() {
    switch (c) {
      case "e":
      case "E":
        buffer += read();
        lexState = "decimalExponent";
        return;
    }
    if (util.isDigit(c)) {
      buffer += read();
      return;
    }
    return newToken("numeric", sign * Number(buffer));
  },
  decimalExponent() {
    switch (c) {
      case "+":
      case "-":
        buffer += read();
        lexState = "decimalExponentSign";
        return;
    }
    if (util.isDigit(c)) {
      buffer += read();
      lexState = "decimalExponentInteger";
      return;
    }
    throw invalidChar(read());
  },
  decimalExponentSign() {
    if (util.isDigit(c)) {
      buffer += read();
      lexState = "decimalExponentInteger";
      return;
    }
    throw invalidChar(read());
  },
  decimalExponentInteger() {
    if (util.isDigit(c)) {
      buffer += read();
      return;
    }
    return newToken("numeric", sign * Number(buffer));
  },
  hexadecimal() {
    if (util.isHexDigit(c)) {
      buffer += read();
      lexState = "hexadecimalInteger";
      return;
    }
    throw invalidChar(read());
  },
  hexadecimalInteger() {
    if (util.isHexDigit(c)) {
      buffer += read();
      return;
    }
    return newToken("numeric", sign * Number(buffer));
  },
  string() {
    switch (c) {
      case "\\":
        read();
        buffer += escape();
        return;
      case '"':
        if (doubleQuote) {
          read();
          return newToken("string", buffer);
        }
        buffer += read();
        return;
      case "'":
        if (!doubleQuote) {
          read();
          return newToken("string", buffer);
        }
        buffer += read();
        return;
      case "\n":
      case "\r":
        throw invalidChar(read());
      case "\u2028":
      case "\u2029":
        separatorChar(c);
        break;
      case void 0:
        throw invalidChar(read());
    }
    buffer += read();
  },
  start() {
    switch (c) {
      case "{":
      case "[":
        return newToken("punctuator", read());
    }
    lexState = "value";
  },
  beforePropertyName() {
    switch (c) {
      case "$":
      case "_":
        buffer = read();
        lexState = "identifierName";
        return;
      case "\\":
        read();
        lexState = "identifierNameStartEscape";
        return;
      case "}":
        return newToken("punctuator", read());
      case '"':
      case "'":
        doubleQuote = read() === '"';
        lexState = "string";
        return;
    }
    if (util.isIdStartChar(c)) {
      buffer += read();
      lexState = "identifierName";
      return;
    }
    throw invalidChar(read());
  },
  afterPropertyName() {
    if (c === ":") {
      return newToken("punctuator", read());
    }
    throw invalidChar(read());
  },
  beforePropertyValue() {
    lexState = "value";
  },
  afterPropertyValue() {
    switch (c) {
      case ",":
      case "}":
        return newToken("punctuator", read());
    }
    throw invalidChar(read());
  },
  beforeArrayValue() {
    if (c === "]") {
      return newToken("punctuator", read());
    }
    lexState = "value";
  },
  afterArrayValue() {
    switch (c) {
      case ",":
      case "]":
        return newToken("punctuator", read());
    }
    throw invalidChar(read());
  },
  end() {
    throw invalidChar(read());
  }
};
function newToken(type, value) {
  return {
    type,
    value,
    line,
    column
  };
}
function literal(s) {
  for (const c2 of s) {
    const p = peek();
    if (p !== c2) {
      throw invalidChar(read());
    }
    read();
  }
}
function escape() {
  const c2 = peek();
  switch (c2) {
    case "b":
      read();
      return "\b";
    case "f":
      read();
      return "\f";
    case "n":
      read();
      return "\n";
    case "r":
      read();
      return "\r";
    case "t":
      read();
      return "	";
    case "v":
      read();
      return "\v";
    case "0":
      read();
      if (util.isDigit(peek())) {
        throw invalidChar(read());
      }
      return "\0";
    case "x":
      read();
      return hexEscape();
    case "u":
      read();
      return unicodeEscape();
    case "\n":
    case "\u2028":
    case "\u2029":
      read();
      return "";
    case "\r":
      read();
      if (peek() === "\n") {
        read();
      }
      return "";
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      throw invalidChar(read());
    case void 0:
      throw invalidChar(read());
  }
  return read();
}
function hexEscape() {
  let buffer2 = "";
  let c2 = peek();
  if (!util.isHexDigit(c2)) {
    throw invalidChar(read());
  }
  buffer2 += read();
  c2 = peek();
  if (!util.isHexDigit(c2)) {
    throw invalidChar(read());
  }
  buffer2 += read();
  return String.fromCodePoint(parseInt(buffer2, 16));
}
function unicodeEscape() {
  let buffer2 = "";
  let count = 4;
  while (count-- > 0) {
    const c2 = peek();
    if (!util.isHexDigit(c2)) {
      throw invalidChar(read());
    }
    buffer2 += read();
  }
  return String.fromCodePoint(parseInt(buffer2, 16));
}
const parseStates = {
  start() {
    if (token.type === "eof") {
      throw invalidEOF();
    }
    push();
  },
  beforePropertyName() {
    switch (token.type) {
      case "identifier":
      case "string":
        key = token.value;
        parseState = "afterPropertyName";
        return;
      case "punctuator":
        pop();
        return;
      case "eof":
        throw invalidEOF();
    }
  },
  afterPropertyName() {
    if (token.type === "eof") {
      throw invalidEOF();
    }
    parseState = "beforePropertyValue";
  },
  beforePropertyValue() {
    if (token.type === "eof") {
      throw invalidEOF();
    }
    push();
  },
  beforeArrayValue() {
    if (token.type === "eof") {
      throw invalidEOF();
    }
    if (token.type === "punctuator" && token.value === "]") {
      pop();
      return;
    }
    push();
  },
  afterPropertyValue() {
    if (token.type === "eof") {
      throw invalidEOF();
    }
    switch (token.value) {
      case ",":
        parseState = "beforePropertyName";
        return;
      case "}":
        pop();
    }
  },
  afterArrayValue() {
    if (token.type === "eof") {
      throw invalidEOF();
    }
    switch (token.value) {
      case ",":
        parseState = "beforeArrayValue";
        return;
      case "]":
        pop();
    }
  },
  end() {
  }
};
function push() {
  let value;
  switch (token.type) {
    case "punctuator":
      switch (token.value) {
        case "{":
          value = {};
          break;
        case "[":
          value = [];
          break;
      }
      break;
    case "null":
    case "boolean":
    case "numeric":
    case "string":
      value = token.value;
      break;
  }
  if (root === void 0) {
    root = value;
  } else {
    const parent = stack[stack.length - 1];
    if (Array.isArray(parent)) {
      parent.push(value);
    } else {
      Object.defineProperty(parent, key, {
        value,
        writable: true,
        enumerable: true,
        configurable: true
      });
    }
  }
  if (value !== null && typeof value === "object") {
    stack.push(value);
    if (Array.isArray(value)) {
      parseState = "beforeArrayValue";
    } else {
      parseState = "beforePropertyName";
    }
  } else {
    const current = stack[stack.length - 1];
    if (current == null) {
      parseState = "end";
    } else if (Array.isArray(current)) {
      parseState = "afterArrayValue";
    } else {
      parseState = "afterPropertyValue";
    }
  }
}
function pop() {
  stack.pop();
  const current = stack[stack.length - 1];
  if (current == null) {
    parseState = "end";
  } else if (Array.isArray(current)) {
    parseState = "afterArrayValue";
  } else {
    parseState = "afterPropertyValue";
  }
}
function invalidChar(c2) {
  if (c2 === void 0) {
    return syntaxError(`JSON5: invalid end of input at ${line}:${column}`);
  }
  return syntaxError(`JSON5: invalid character '${formatChar(c2)}' at ${line}:${column}`);
}
function invalidEOF() {
  return syntaxError(`JSON5: invalid end of input at ${line}:${column}`);
}
function invalidIdentifier() {
  column -= 5;
  return syntaxError(`JSON5: invalid identifier character at ${line}:${column}`);
}
function separatorChar(c2) {
  console.warn(`JSON5: '${formatChar(c2)}' in strings is not valid ECMAScript; consider escaping`);
}
function formatChar(c2) {
  const replacements = {
    "'": "\\'",
    '"': '\\"',
    "\\": "\\\\",
    "\b": "\\b",
    "\f": "\\f",
    "\n": "\\n",
    "\r": "\\r",
    "	": "\\t",
    "\v": "\\v",
    "\0": "\\0",
    "\u2028": "\\u2028",
    "\u2029": "\\u2029"
  };
  if (replacements[c2]) {
    return replacements[c2];
  }
  if (c2 < " ") {
    const hexString = c2.charCodeAt(0).toString(16);
    return "\\x" + ("00" + hexString).substring(hexString.length);
  }
  return c2;
}
function syntaxError(message) {
  const err = new SyntaxError(message);
  err.lineNumber = line;
  err.columnNumber = column;
  return err;
}
var stringify = function stringify2(value, replacer, space) {
  const stack2 = [];
  let indent = "";
  let propertyList;
  let replacerFunc;
  let gap = "";
  let quote;
  if (replacer != null && typeof replacer === "object" && !Array.isArray(replacer)) {
    space = replacer.space;
    quote = replacer.quote;
    replacer = replacer.replacer;
  }
  if (typeof replacer === "function") {
    replacerFunc = replacer;
  } else if (Array.isArray(replacer)) {
    propertyList = [];
    for (const v of replacer) {
      let item;
      if (typeof v === "string") {
        item = v;
      } else if (typeof v === "number" || v instanceof String || v instanceof Number) {
        item = String(v);
      }
      if (item !== void 0 && propertyList.indexOf(item) < 0) {
        propertyList.push(item);
      }
    }
  }
  if (space instanceof Number) {
    space = Number(space);
  } else if (space instanceof String) {
    space = String(space);
  }
  if (typeof space === "number") {
    if (space > 0) {
      space = Math.min(10, Math.floor(space));
      gap = "          ".substr(0, space);
    }
  } else if (typeof space === "string") {
    gap = space.substr(0, 10);
  }
  return serializeProperty("", { "": value });
  function serializeProperty(key2, holder) {
    let value2 = holder[key2];
    if (value2 != null) {
      if (typeof value2.toJSON5 === "function") {
        value2 = value2.toJSON5(key2);
      } else if (typeof value2.toJSON === "function") {
        value2 = value2.toJSON(key2);
      }
    }
    if (replacerFunc) {
      value2 = replacerFunc.call(holder, key2, value2);
    }
    if (value2 instanceof Number) {
      value2 = Number(value2);
    } else if (value2 instanceof String) {
      value2 = String(value2);
    } else if (value2 instanceof Boolean) {
      value2 = value2.valueOf();
    }
    switch (value2) {
      case null:
        return "null";
      case true:
        return "true";
      case false:
        return "false";
    }
    if (typeof value2 === "string") {
      return quoteString(value2);
    }
    if (typeof value2 === "number") {
      return String(value2);
    }
    if (typeof value2 === "object") {
      return Array.isArray(value2) ? serializeArray(value2) : serializeObject(value2);
    }
    return void 0;
  }
  function quoteString(value2) {
    const quotes = {
      "'": 0.1,
      '"': 0.2
    };
    const replacements = {
      "'": "\\'",
      '"': '\\"',
      "\\": "\\\\",
      "\b": "\\b",
      "\f": "\\f",
      "\n": "\\n",
      "\r": "\\r",
      "	": "\\t",
      "\v": "\\v",
      "\0": "\\0",
      "\u2028": "\\u2028",
      "\u2029": "\\u2029"
    };
    let product = "";
    for (let i = 0; i < value2.length; i++) {
      const c2 = value2[i];
      switch (c2) {
        case "'":
        case '"':
          quotes[c2]++;
          product += c2;
          continue;
        case "\0":
          if (util.isDigit(value2[i + 1])) {
            product += "\\x00";
            continue;
          }
      }
      if (replacements[c2]) {
        product += replacements[c2];
        continue;
      }
      if (c2 < " ") {
        let hexString = c2.charCodeAt(0).toString(16);
        product += "\\x" + ("00" + hexString).substring(hexString.length);
        continue;
      }
      product += c2;
    }
    const quoteChar = quote || Object.keys(quotes).reduce((a, b) => quotes[a] < quotes[b] ? a : b);
    product = product.replace(new RegExp(quoteChar, "g"), replacements[quoteChar]);
    return quoteChar + product + quoteChar;
  }
  function serializeObject(value2) {
    if (stack2.indexOf(value2) >= 0) {
      throw TypeError("Converting circular structure to JSON5");
    }
    stack2.push(value2);
    let stepback = indent;
    indent = indent + gap;
    let keys = propertyList || Object.keys(value2);
    let partial = [];
    for (const key2 of keys) {
      const propertyString = serializeProperty(key2, value2);
      if (propertyString !== void 0) {
        let member = serializeKey(key2) + ":";
        if (gap !== "") {
          member += " ";
        }
        member += propertyString;
        partial.push(member);
      }
    }
    let final;
    if (partial.length === 0) {
      final = "{}";
    } else {
      let properties;
      if (gap === "") {
        properties = partial.join(",");
        final = "{" + properties + "}";
      } else {
        let separator = ",\n" + indent;
        properties = partial.join(separator);
        final = "{\n" + indent + properties + ",\n" + stepback + "}";
      }
    }
    stack2.pop();
    indent = stepback;
    return final;
  }
  function serializeKey(key2) {
    if (key2.length === 0) {
      return quoteString(key2);
    }
    const firstChar = String.fromCodePoint(key2.codePointAt(0));
    if (!util.isIdStartChar(firstChar)) {
      return quoteString(key2);
    }
    for (let i = firstChar.length; i < key2.length; i++) {
      if (!util.isIdContinueChar(String.fromCodePoint(key2.codePointAt(i)))) {
        return quoteString(key2);
      }
    }
    return key2;
  }
  function serializeArray(value2) {
    if (stack2.indexOf(value2) >= 0) {
      throw TypeError("Converting circular structure to JSON5");
    }
    stack2.push(value2);
    let stepback = indent;
    indent = indent + gap;
    let partial = [];
    for (let i = 0; i < value2.length; i++) {
      const propertyString = serializeProperty(String(i), value2);
      partial.push(propertyString !== void 0 ? propertyString : "null");
    }
    let final;
    if (partial.length === 0) {
      final = "[]";
    } else {
      if (gap === "") {
        let properties = partial.join(",");
        final = "[" + properties + "]";
      } else {
        let separator = ",\n" + indent;
        let properties = partial.join(separator);
        final = "[\n" + indent + properties + ",\n" + stepback + "]";
      }
    }
    stack2.pop();
    indent = stepback;
    return final;
  }
};
const JSON5 = {
  parse,
  stringify
};
var lib = JSON5;
const JsonSchemaMonaco$1 = "";
const objectNeedProps = ["maxProperties", "minProperties"];
const SubformObject = defineComponent({
  props: ["configs", "data"],
  render(vm) {
    return createVNode(Fragment, null, [createVNode(resolveComponent("xGap"), {
      "t": true
    }, null), createVNode("div", {
      "class": "flex middle"
    }, [createVNode(resolveComponent("xItem"), {
      "configs": vm.configs.minProperties,
      "modelValue": vm.data.minProperties,
      "onUpdate:modelValue": ($event) => vm.data.minProperties = $event,
      "class": "flex1"
    }, null), createVNode(resolveComponent("xGap"), {
      "t": true
    }, null), createVNode(resolveComponent("xItem"), {
      "configs": vm.configs.maxProperties,
      "modelValue": vm.data.maxProperties,
      "onUpdate:modelValue": ($event) => vm.data.maxProperties = $event,
      "class": "flex1"
    }, null)])]);
  }
});
const stringNeedProps = ["default", "minLength", "maxLength", "pattern", "enum", "isUseEnum", "enumDesc", "format"];
const SubformString = defineComponent({
  props: ["configs", "data"],
  render(vm) {
    return createVNode(Fragment, null, [createVNode(resolveComponent("xGap"), {
      "t": true
    }, null), createVNode(resolveComponent("xItem"), {
      "configs": vm.configs.default,
      "modelValue": vm.data.default,
      "onUpdate:modelValue": ($event) => vm.data.default = $event
    }, null), createVNode(resolveComponent("xGap"), {
      "t": true
    }, null), createVNode("div", {
      "class": "flex middle"
    }, [createVNode(resolveComponent("xItem"), {
      "configs": vm.configs.minLength,
      "modelValue": vm.data.minLength,
      "onUpdate:modelValue": ($event) => vm.data.minLength = $event,
      "class": "flex1"
    }, null), createVNode(resolveComponent("xGap"), {
      "t": true
    }, null), createVNode(resolveComponent("xItem"), {
      "configs": vm.configs.maxLength,
      "modelValue": vm.data.maxLength,
      "onUpdate:modelValue": ($event) => vm.data.maxLength = $event,
      "class": "flex1"
    }, null)]), createVNode(resolveComponent("xGap"), {
      "t": true
    }, null), createVNode(resolveComponent("xItem"), {
      "configs": vm.configs.pattern,
      "modelValue": vm.data.pattern,
      "onUpdate:modelValue": ($event) => vm.data.pattern = $event
    }, null), createVNode(resolveComponent("xGap"), {
      "t": true
    }, null), createVNode(resolveComponent("xItem"), {
      "configs": vm.configs.enum,
      "modelValue": vm.data.enum,
      "onUpdate:modelValue": ($event) => vm.data.enum = $event
    }, {
      afterControll: () => createVNode(resolveComponent("ElCheckbox"), {
        "class": "ml10",
        "checked": !!vm.data.isUseEnum,
        "onUpdate:checked": (val) => {
          vm.configs.enum.disabled = !val;
          vm.data.isUseEnum = val;
        }
      }, null)
    }), vm.data.isUseEnum ? createVNode(Fragment, null, [createVNode(resolveComponent("xGap"), {
      "t": true
    }, null), createVNode(resolveComponent("xItem"), {
      "configs": vm.configs.enumDesc,
      "modelValue": vm.data.enumDesc,
      "onUpdate:modelValue": ($event) => vm.data.enumDesc = $event
    }, null)]) : null, createVNode(resolveComponent("xGap"), {
      "t": true
    }, null), createVNode(resolveComponent("xItem"), {
      "configs": vm.configs.format,
      "modelValue": vm.data.format,
      "onUpdate:modelValue": ($event) => vm.data.format = $event
    }, null)]);
  }
});
const numberNeedProps = ["default", "maximum", "minimum", "exclusiveMaximum", "exclusiveMinimum", "enum", "default", "isUseEnum"];
const SubformNumber = defineComponent({
  props: ["configs", "data", "integer"],
  methods: {
    parserNum(val) {
      if (this.integer) {
        return parseInt(val);
      }
      return val;
    }
  },
  render(vm) {
    xU(vm.integer);
    return createVNode(Fragment, null, [createVNode(resolveComponent("xGap"), {
      "t": true
    }, null), createVNode(resolveComponent("xItem"), {
      "configs": vm.configs.default,
      "modelValue": vm.data.default,
      "onUpdate:modelValue": ($event) => vm.data.default = $event
    }, null), createVNode(resolveComponent("xGap"), {
      "t": true
    }, null), createVNode("div", {
      "class": " ant-form-item ant-form-item-with-help x-item flex "
    }, [createVNode(resolveComponent("xItem"), {
      "configs": vm.configs.minimum,
      "modelValue": vm.data.minimum,
      "onUpdate:modelValue": ($event) => vm.data.minimum = $event,
      "class": "flex1",
      "parser": (val) => vm.parserNum(val)
    }, null), createVNode(resolveComponent("xItem"), {
      "configs": vm.configs.exclusiveMinimum,
      "modelValue": vm.data.exclusiveMinimum,
      "onUpdate:modelValue": ($event) => vm.data.exclusiveMinimum = $event
    }, null), createVNode(resolveComponent("xGap"), {
      "r": "16"
    }, null)]), createVNode(resolveComponent("xGap"), {
      "t": true
    }, null), createVNode("div", {
      "class": " ant-form-item ant-form-item-with-help x-item flex "
    }, [createVNode(resolveComponent("xItem"), {
      "configs": vm.configs.maximum,
      "modelValue": vm.data.maximum,
      "onUpdate:modelValue": ($event) => vm.data.maximum = $event,
      "class": "flex1",
      "parser": (val) => vm.parserNum(val)
    }, null), createVNode(resolveComponent("xItem"), {
      "configs": vm.configs.exclusiveMaximum,
      "modelValue": vm.data.exclusiveMaximum,
      "onUpdate:modelValue": ($event) => vm.data.exclusiveMaximum = $event
    }, null), createVNode(resolveComponent("xGap"), {
      "r": "16"
    }, null)]), createVNode(resolveComponent("xGap"), {
      "t": true
    }, null), createVNode(resolveComponent("xItem"), {
      "configs": vm.configs.enum,
      "modelValue": vm.data.enum,
      "onUpdate:modelValue": ($event) => vm.data.enum = $event
    }, {
      afterControll: () => createVNode(resolveComponent("ElCheckbox"), {
        "class": "ml10",
        "checked": !!vm.data.isUseEnum,
        "onUpdate:checked": (val) => {
          vm.configs.enum.disabled = !val;
          vm.data.isUseEnum = val;
        }
      }, null)
    }), vm.data.isUseEnum ? createVNode(Fragment, null, [createVNode(resolveComponent("xGap"), {
      "t": true
    }, null), createVNode(resolveComponent("xItem"), {
      "configs": vm.configs.enumDesc,
      "modelValue": vm.data.enumDesc,
      "onUpdate:modelValue": ($event) => vm.data.enumDesc = $event
    }, null)]) : null]);
  }
});
const arrayNeedProps = ["maxItems", "minItems", "uniqueItems"];
const SubformArray = defineComponent({
  props: ["configs", "data"],
  render(vm) {
    return createVNode(Fragment, null, [createVNode(resolveComponent("xGap"), {
      "t": true
    }, null), createVNode("div", {
      "class": "flex middle"
    }, [createVNode(resolveComponent("xItem"), {
      "configs": vm.configs.minItems,
      "modelValue": vm.data.minItems,
      "onUpdate:modelValue": ($event) => vm.data.minItems = $event,
      "class": "flex1"
    }, null), createVNode(resolveComponent("xGap"), {
      "t": true
    }, null), createVNode(resolveComponent("xItem"), {
      "configs": vm.configs.maxItems,
      "modelValue": vm.data.maxItems,
      "onUpdate:modelValue": ($event) => vm.data.maxItems = $event,
      "class": "flex1"
    }, null)]), createVNode(resolveComponent("xGap"), {
      "t": true
    }, null), createVNode(resolveComponent("xItem"), {
      "configs": vm.configs.uniqueItems,
      "modelValue": vm.data.uniqueItems,
      "onUpdate:modelValue": ($event) => vm.data.uniqueItems = $event
    }, null)]);
  }
});
const booleanNeedProps = ["booleanDefault"];
const SubformBoolean = defineComponent({
  props: ["configs", "data"],
  render(vm) {
    return createVNode(Fragment, null, [createVNode(resolveComponent("xGap"), {
      "t": true
    }, null), createVNode(resolveComponent("xItem"), {
      "configs": vm.configs.booleanDefault,
      "modelValue": vm.data.booleanDefault,
      "onUpdate:modelValue": ($event) => vm.data.booleanDefault = $event
    }, null)]);
  }
});
function _isSlot$1(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const {
  xIcon
} = components;
const SPE = ".properties.";
const ICON_STRATEGE = {
  object: () => h(xIcon, {
    icon: "type_object"
  }),
  array: () => h(xIcon, {
    icon: "type_array"
  }),
  string: () => h(xIcon, {
    icon: "type_string"
  }),
  number: () => h(xIcon, {
    icon: "type_number"
  }),
  boolean: () => h(xIcon, {
    icon: "type_boolean"
  }),
  integer: () => h(xIcon, {
    icon: "type_int"
  })
};
const SchemaEditor = defineComponent({
  emits: ["nodeSync"],
  setup() {
    const jsmVM = inject("jsmVM");
    return {
      jsmVM
    };
  },
  data(vm) {
    return {
      dataXItem: {
        key: defItem({
          defaultValue: "",
          label: xI$1("\u5BF9\u8C61\u8BBF\u95EE\u8DEF\u5F84"),
          readonly: true
        }),
        title: defItem({
          defaultValue: "",
          label: xI$1("\u5B57\u6BB5\u540D"),
          rules: [FormRules.required()]
        }),
        description: defItem({
          defaultValue: "",
          label: xI$1("\u63CF\u8FF0"),
          isTextarea: true
        }),
        required: defItem({
          defaultValue: "0",
          label: xI$1("\u662F\u5426\u5FC5\u987B"),
          itemType: "RadioGroup",
          options: ITEM_OPTIONS.required
        }),
        type: defItem({
          value: "object",
          label: xI$1("\u7C7B\u578B"),
          itemType: "RadioGroup",
          options: ["object", "string", "number", "array", "boolean", "integer"].map((type) => ({
            label: createVNode("span", {
              "class": "mr10",
              "title": type
            }, [ICON_STRATEGE[type]()]),
            value: type
          }))
        }),
        enum: defItem({
          defaultValue: "",
          label: xI$1("\u679A\u4E3E"),
          isTextarea: true,
          placeholder: xI$1("\u4E00\u884C\u4E00\u4E2A\u503C\uFF0C\u4E0D\u9700\u8981\u7B26\u53F7\u5206\u9694"),
          disabled: true
        }),
        enumDesc: defItem({
          defaultValue: "",
          isTextarea: true,
          label: xI$1("\u679A\u4E3E\u63CF\u8FF0")
        }),
        minProperties: defItem({
          defaultValue: "",
          label: xI$1("\u6700\u5C0F\u5143\u7D20\u4E2A\u6570"),
          isNumber: true
        }),
        maxProperties: defItem({
          defaultValue: "",
          label: xI$1("\u6700\u5927\u5143\u7D20\u4E2A\u6570"),
          isNumber: true
        }),
        default: defItem({
          defaultValue: "",
          label: xI$1("\u9ED8\u8BA4\u503C")
        }),
        minLength: defItem({
          defaultValue: "",
          label: xI$1("\u6700\u5C0F\u5B57\u7B26\u6570"),
          isNumber: true
        }),
        maxLength: defItem({
          defaultValue: "",
          label: xI$1("\u6700\u5927\u5B57\u7B26\u6570"),
          isNumber: true
        }),
        pattern: defItem({
          defaultValue: "",
          placeholder: xI$1("new RegExp(xxxxxxx)\u9002\u7528"),
          label: xI$1("\u6B63\u5219\u8868\u8FBE\u5F0F")
        }),
        format: defItem({
          defaultValue: "",
          label: xI$1("\u683C\u5F0F"),
          itemType: "Select",
          options: ["date", "date-time", "email", "hostname", "ipv4", "ipv6", "uri"].map((label) => ({
            label,
            value: label
          })),
          clearable: true
        }),
        minimum: defItem({
          defaultValue: "",
          label: xI$1("\u6700\u5C0F\u503C"),
          isNumber: true
        }),
        maximum: defItem({
          defaultValue: "",
          label: xI$1("\u6700\u5927\u503C"),
          isNumber: true
        }),
        exclusiveMinimum: defItem({
          defaultValue: false,
          itemType: "Checkbox",
          label: xI$1("\u4E0D\u5305\u542B\u6700\u5C0F\u503C")
        }),
        exclusiveMaximum: defItem({
          defaultValue: false,
          itemType: "Checkbox",
          label: xI$1("\u4E0D\u5305\u542B\u6700\u5927\u503C")
        }),
        minItems: defItem({
          defaultValue: "",
          label: xI$1("\u6700\u5C0F\u5143\u7D20\u4E2A\u6570"),
          isNumber: true
        }),
        maxItems: defItem({
          defaultValue: "",
          label: xI$1("\u6700\u5927\u5143\u7D20\u4E2A\u6570"),
          isNumber: true
        }),
        uniqueItems: defItem({
          defaultValue: false,
          itemType: "Checkbox",
          label: xI$1("\u5143\u7D20\u4E0D\u53EF\u91CD\u590D")
        }),
        booleanDefault: defItem({
          defaultValue: "",
          itemType: "Select",
          clearable: true,
          label: xI$1("\u9ED8\u8BA4\u503C"),
          options: ITEM_OPTIONS.YesOrNo
        })
      }
    };
  },
  methods: {
    async syncToJsonTree() {
      const baseProps = ["key", "title", "description", "required", "type"];
      const SUB_PROPS_STRATEGY = {
        object: objectNeedProps,
        string: stringNeedProps,
        number: numberNeedProps,
        array: arrayNeedProps,
        boolean: booleanNeedProps,
        integer: numberNeedProps
      };
      const {
        type,
        title
      } = this.currentNode;
      const currentTypeNeedProps = baseProps.concat(SUB_PROPS_STRATEGY[type]);
      const targetValues = xU.pick(this.currentNode, currentTypeNeedProps);
      if (!await itemsInvalid()) {
        const oldkey = String(this.currentNode.key);
        const newKey = (() => {
          const array = oldkey.split(SPE);
          array[array.length - 1] = title;
          return array.join(SPE);
        })();
        if (type === "object") {
          delete targetValues.children;
        }
        this.$emit("nodeSync", oldkey, {
          ...targetValues,
          key: newKey
        });
      }
    }
  },
  computed: {
    currentNode: {
      get() {
        return this.jsmVM.currentNode;
      },
      set(currentNode) {
        if (currentNode.key !== this.jsmVM.currentNode.key) {
          return;
        } else {
          this.jsmVM.currentNode = xU.merge({}, this.jsmVM.currentNode, currentNode);
        }
      }
    }
  },
  render(vm) {
    let _slot;
    if (!vm.currentNode) {
      return null;
    }
    return createVNode("div", {
      "class": "SchemaEditor flex vertical flex1"
    }, [createVNode("div", {
      "class": "SchemaEditor_button "
    }, [createVNode(resolveComponent("xButton"), {
      "onClick": vm.syncToJsonTree,
      "type": "primary"
    }, _isSlot$1(_slot = xI$1("\u540C\u6B65\u5230 JSON \u6811")) ? _slot : {
      default: () => [_slot]
    })]), createVNode(resolveComponent("xForm"), {
      "class": "flex vertical flex1 overflow-auto",
      "labelStyle": {
        "min-width": "120px",
        width: "unset"
      }
    }, {
      default: () => [createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.key,
        "modelValue": vm.currentNode.key,
        "onUpdate:modelValue": ($event) => vm.currentNode.key = $event
      }, null), createVNode(resolveComponent("xGap"), {
        "t": true
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.title,
        "modelValue": vm.currentNode.title,
        "onUpdate:modelValue": ($event) => vm.currentNode.title = $event
      }, null), createVNode(resolveComponent("xGap"), {
        "t": true
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.description,
        "modelValue": vm.currentNode.description,
        "onUpdate:modelValue": ($event) => vm.currentNode.description = $event
      }, null), createVNode(resolveComponent("xGap"), {
        "t": true
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.required,
        "modelValue": vm.currentNode.required,
        "onUpdate:modelValue": ($event) => vm.currentNode.required = $event
      }, null), createVNode(resolveComponent("xGap"), {
        "t": true
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.type,
        "modelValue": vm.currentNode.type,
        "onUpdate:modelValue": ($event) => vm.currentNode.type = $event
      }, null), vm.currentNode.type === "object" && createVNode(SubformObject, {
        "configs": this.dataXItem,
        "data": vm.currentNode
      }, null), vm.currentNode.type === "string" && createVNode(SubformString, {
        "configs": this.dataXItem,
        "data": vm.currentNode
      }, null), vm.currentNode.type === "number" && createVNode(SubformNumber, {
        "configs": this.dataXItem,
        "data": vm.currentNode
      }, null), vm.currentNode.type === "array" && createVNode(SubformArray, {
        "configs": this.dataXItem,
        "data": vm.currentNode
      }, null), vm.currentNode.type === "boolean" && createVNode(SubformBoolean, {
        "configs": this.dataXItem,
        "data": vm.currentNode
      }, null), vm.currentNode.type === "integer" && createVNode(SubformNumber, {
        "configs": this.dataXItem,
        "data": vm.currentNode,
        "integer": true
      }, null)]
    })]);
  }
});
var src = {};
var typeOfIs = { exports: {} };
(function(module, exports) {
  (function(factory) {
    {
      module.exports = factory();
    }
  })(function() {
    var isBuiltIn = function() {
      var built_ins = [
        Object,
        Function,
        Array,
        String,
        Boolean,
        Number,
        Date,
        RegExp,
        Error
      ];
      var built_ins_length = built_ins.length;
      return function(_constructor) {
        for (var i = 0; i < built_ins_length; i++) {
          if (built_ins[i] === _constructor) {
            return true;
          }
        }
        return false;
      };
    }();
    var stringType = function() {
      var _toString = {}.toString;
      return function(obj) {
        var stype = _toString.call(obj).slice(8, -1);
        if (obj === null || obj === void 0) {
          return stype.toLowerCase();
        }
        var ctype = of(obj);
        if (ctype && !isBuiltIn(ctype)) {
          return ctype.name;
        } else {
          return stype;
        }
      };
    }();
    function of(obj) {
      if (obj === null || obj === void 0) {
        return obj;
      } else {
        return obj.constructor;
      }
    }
    function is(obj, test) {
      var typer = of(test) === String ? stringType : of;
      return typer(obj) === test;
    }
    function instance(obj, test) {
      return obj instanceof test;
    }
    function extension(_Extension, _Base) {
      return instance(_Extension.prototype, _Base);
    }
    function any(obj, tests) {
      if (!is(tests, Array)) {
        throw "Second argument to .any() should be array";
      }
      for (var i = 0; i < tests.length; i++) {
        var test = tests[i];
        if (is(obj, test)) {
          return true;
        }
      }
      return false;
    }
    var exports2 = function(obj, type) {
      if (arguments.length == 1) {
        return of(obj);
      } else {
        if (is(type, Array)) {
          return any(obj, type);
        } else {
          return is(obj, type);
        }
      }
    };
    exports2.instance = instance;
    exports2.string = stringType;
    exports2.of = of;
    exports2.is = is;
    exports2.any = any;
    exports2.extension = extension;
    return exports2;
  });
})(typeOfIs);
var utils$1 = {};
var DATE_REGEXP = /\d{4}-\d{2}-\d{2}/;
utils$1.isNumber = function(value) {
  return typeof value === "number" || Object.prototype.toString.call(value) === "[object Number]";
};
utils$1.isDate = function(date) {
  return new Date(date).toString() !== "Invalid Date" && !isNaN(new Date(date));
};
utils$1.isTimestamp = function(string) {
  return string.length > 18 && !isNaN(new Date(string).getTime());
};
utils$1.isDateString = function(string) {
  return string.match(DATE_REGEXP);
};
utils$1.arrayLastItem = function(arr) {
  return arr[arr.length - 1];
};
var Type$4 = typeOfIs.exports;
var Utils$3 = utils$1;
var generic = function Process(object, output) {
  output = output || {};
  for (var key2 in object) {
    var value = object[key2];
    var type = Type$4.string(value).toLowerCase();
    if (type === "undefined") {
      type = "null";
    }
    if (type === "string" && Utils$3.isDate(value)) {
      type = "date";
    }
    if (type !== "object") {
      output[key2] = {
        type
      };
    } else {
      output[key2] = Process(object[key2]);
      output[key2].type = type;
    }
  }
  return output;
};
var Type$3 = typeOfIs.exports;
var Utils$2 = utils$1;
function getNativeType(string) {
  switch (string) {
    case "array":
      return "Array";
    case "buffer":
      return "Buffer";
    case "boolean":
      return "Boolean";
    case "date":
      return "Date";
    case "number":
      return "Number";
    case "string":
      return "String";
    case "objectid":
      return "ObjectId";
    case "null":
    case "undefined":
    case "regexp":
    default:
      return "Mixed";
  }
}
var mongoose = function Process2(object, output) {
  var output = output || {};
  for (var key2 in object) {
    var value = object[key2];
    var originalType = null;
    var elementType = null;
    var type = null;
    if (value instanceof Buffer) {
      type = "buffer";
    }
    if (value != null && typeof value.toString !== "undefined" && value.toString().match(/^[0-9a-fA-F]{24}$/)) {
      type = "objectid";
    }
    if (!type) {
      type = Type$3.string(value).toLowerCase();
    }
    if (type === "string" && Utils$2.isDate(value)) {
      type = "date";
    }
    if (type === "object") {
      output[key2] = Process2(object[key2]);
    } else {
      if (type === "undefined") {
        type = "null";
      }
      if (type === "array" && value.length) {
        originalType = type;
        type = void 0;
        for (var index = 0, length = value.length; index < length; index++) {
          elementType = Type$3.string(value[index]).toLowerCase();
          if (type && elementType !== type) {
            type = "mixed";
            break;
          } else {
            type = elementType;
          }
        }
      }
      if (originalType && originalType === "array") {
        output[key2] = { type: [getNativeType(type)] };
      } else {
        output[key2] = { type: getNativeType(type) };
      }
    }
  }
  return output;
};
var utils = utils$1;
function getPropertyMode(value) {
  return Array.isArray(value) ? "REPEATED" : "NULLABLE";
}
function getPropertyType$1(value) {
  if (Array.isArray(value)) {
    return getPropertyType$1(value[0]);
  }
  if (value instanceof Date)
    return "TIMESTAMP";
  if (typeof value === "object")
    return "RECORD";
  if (typeof value === "boolean")
    return "BOOLEAN";
  if (typeof value === "string") {
    if (utils.isDateString(value))
      return "DATE";
    if (utils.isTimestamp(value))
      return "TIMESTAMP";
  }
  if (!isNaN(value)) {
    return Number.isInteger(parseFloat(value)) ? "INTEGER" : "FLOAT";
  }
  return "STRING";
}
function processFields(data) {
  return Object.keys(data).map(function(key2) {
    var value = data[key2];
    var entry = {
      name: key2,
      type: getPropertyType$1(data[key2]),
      mode: getPropertyMode(data[key2])
    };
    if (entry.type === "RECORD") {
      entry.fields = processFields(entry.mode === "REPEATED" ? value[0] : value);
    }
    return entry;
  });
}
var bigquery = function Process3(data) {
  return processFields(data);
};
var Type$2 = typeOfIs.exports;
var Utils$1 = utils$1;
var types$1 = {
  boolean: "BOOLEAN",
  string: "TEXT",
  number: "INT",
  date: "DATE",
  timestamp: "TIMESTAMP",
  "regexp": "TEXT",
  "undefined": "TEXT",
  "null": "TEXT"
};
var lang$1 = {
  create: function(name) {
    return ["CREATE TABLE ", name, " ("].join("");
  },
  close: function() {
    return ");";
  },
  id: function(name, value) {
    return ["  ", name, "_id ", value, ","].join("");
  },
  property: function(name, value) {
    return ["  ", name, " ", value, ","].join("");
  },
  primary: function(id) {
    return ["  PRIMARY KEY (", id, "),"].join("");
  },
  foreign: function(key1, table, key2) {
    return ["  FOREIGN KEY (", key1, ") REFERENCES ", table, "(", key2, "),"].join("");
  }
};
function processObject$2(obj, options) {
  var name = options.tableName;
  var parent = options.parentTableName;
  var parentId = options.parentTableId;
  var parentIdType = options.parentTableIdType;
  var keys = Object.keys(obj);
  var output = [];
  var tables = [];
  var id = null;
  var idType = "string";
  output.push(lang$1.create(name));
  if (parent) {
    output.push(lang$1.property(parent + "_" + parentId, types$1[parentIdType]));
  }
  var nkey;
  for (var i = 0; i < keys.length; i++) {
    if (keys[i].toLowerCase() === "id" || keys[i].toLowerCase().indexOf("_id") > -1) {
      nkey = keys[i];
      obj[nkey] = obj[keys[i]];
      keys[i] = nkey;
      id = keys[i];
      idType = typeof obj[keys[i]];
    }
  }
  if (!id) {
    id = "id";
    idType = parentIdType || idType;
    output.push(lang$1.property(id, types$1[idType]));
  }
  var key2, value, type;
  for (var i = 0; i < keys.length; i++) {
    key2 = keys[i];
    value = obj[key2];
    type = value instanceof Date ? "date" : Type$2.string(value).toLowerCase();
    if (type !== "undefined") {
      type = Utils$1.isTimestamp(value) ? "timestamp" : type;
    }
    if (type === "function") {
      continue;
    }
    if (type === "object" && !value.length) {
      tables.push("");
      tables.push(processObject$2(value, {
        parentTableName: name,
        parentTableId: id,
        parentTableIdType: idType,
        tableName: name + "_" + key2
      }).join("\n"));
      continue;
    }
    if (type === "object" || type === "array") {
      if (typeof value[0] === "object") {
        tables.push("");
        tables.push(processObject$2(value[0], {
          parentTableName: name,
          parentTableId: id,
          parentTableIdType: idType,
          tableName: name + "_" + key2
        }).join("\n"));
        continue;
      }
      tables.push("");
      tables.push(processObject$2({
        value: typeof value[0]
      }, {
        parentTableName: name,
        parentTableId: id,
        parentTableIdType: idType,
        tableName: name + "_" + key2
      }).join("\n"));
      continue;
    }
    output.push(lang$1.property(key2, types$1[type]));
  }
  output.push(lang$1.primary(id));
  if (parent) {
    output.push(lang$1.foreign(parent + "_id", parent, parentId));
  }
  output[output.length - 1] = Utils$1.arrayLastItem(output).substr(0, Utils$1.arrayLastItem(output).length - 1);
  output.push(lang$1.close());
  return output.concat(tables);
}
var mysql = function Process4(tableName, object) {
  if (typeof tableName !== "string") {
    object = tableName;
    tableName = "generic";
  }
  return processObject$2(object, {
    tableName
  }).join("\n");
};
var Type$1 = typeOfIs.exports;
var DRAFT = "http://json-schema.org/draft-04/schema#";
function getPropertyFormat(value) {
  var type = Type$1.string(value).toLowerCase();
  if (type === "date")
    return "date-time";
  return null;
}
function getPropertyType(value) {
  var type = Type$1.string(value).toLowerCase();
  if (type === "date")
    return "string";
  if (type === "regexp")
    return "string";
  if (type === "function")
    return "string";
  return type;
}
function getUniqueKeys(a, b, c2) {
  a = Object.keys(a);
  b = Object.keys(b);
  c2 = c2 || [];
  var value;
  var cIndex;
  var aIndex;
  for (var keyIndex = 0, keyLength = b.length; keyIndex < keyLength; keyIndex++) {
    value = b[keyIndex];
    aIndex = a.indexOf(value);
    cIndex = c2.indexOf(value);
    if (aIndex === -1) {
      if (cIndex !== -1) {
        c2.splice(cIndex, 1);
      }
    } else if (cIndex === -1) {
      c2.push(value);
    }
  }
  return c2;
}
function processArray(array, output, nested) {
  var format;
  var oneOf;
  var type;
  if (nested && output) {
    output = { items: output };
  } else {
    output = output || {};
    output.type = getPropertyType(array);
    output.items = output.items || {};
    type = output.items.type || null;
  }
  for (var arrIndex = 0, arrLength = array.length; arrIndex < arrLength; arrIndex++) {
    var elementType = getPropertyType(array[arrIndex]);
    var elementFormat = getPropertyFormat(array[arrIndex]);
    if (type && elementType !== type) {
      output.items.oneOf = [];
      oneOf = true;
      break;
    } else {
      type = elementType;
      format = elementFormat;
    }
  }
  if (!oneOf && type) {
    output.items.type = type;
    if (format) {
      output.items.format = format;
    }
  } else if (oneOf && type !== "object") {
    output.items = {
      oneOf: [{ type }],
      required: output.items.required
    };
  }
  if (typeof output.items.oneOf !== "undefined" || type === "object") {
    for (var itemIndex = 0, itemLength = array.length; itemIndex < itemLength; itemIndex++) {
      var value = array[itemIndex];
      var itemType = getPropertyType(value);
      var itemFormat = getPropertyFormat(value);
      var arrayItem;
      if (itemType === "object") {
        if (output.items.properties) {
          output.items.required = getUniqueKeys(output.items.properties, value, output.items.required);
        }
        arrayItem = processObject$1(value, oneOf ? {} : output.items.properties, true);
      } else if (itemType === "array") {
        arrayItem = processArray(value, oneOf ? {} : output.items.properties, true);
      } else {
        arrayItem = {};
        arrayItem.type = itemType;
        if (itemFormat) {
          arrayItem.format = itemFormat;
        }
      }
      if (oneOf) {
        var childType = Type$1.string(value).toLowerCase();
        var tempObj = {};
        if (!arrayItem.type && childType === "object") {
          tempObj.properties = arrayItem;
          tempObj.type = "object";
          arrayItem = tempObj;
        }
        output.items.oneOf.push(arrayItem);
      } else {
        if (output.items.type !== "object") {
          continue;
        }
        output.items.properties = arrayItem;
      }
    }
  }
  return nested ? output.items : output;
}
function processObject$1(object, output, nested) {
  if (nested && output) {
    output = { properties: output };
  } else {
    output = output || {};
    output.type = getPropertyType(object);
    output.properties = output.properties || {};
  }
  for (var key2 in object) {
    var value = object[key2];
    var type = getPropertyType(value);
    var format = getPropertyFormat(value);
    type = type === "undefined" ? "null" : type;
    if (type === "object") {
      output.properties[key2] = processObject$1(value, output.properties[key2]);
      continue;
    }
    if (type === "array") {
      output.properties[key2] = processArray(value, output.properties[key2]);
      continue;
    }
    if (output.properties[key2]) {
      var entry = output.properties[key2];
      var hasTypeArray = Array.isArray(entry.type);
      if (hasTypeArray && entry.type.indexOf(type) < 0) {
        entry.type.push(type);
      }
      if (!hasTypeArray && entry.type !== type) {
        entry.type = [entry.type, type];
      }
      continue;
    }
    output.properties[key2] = {};
    output.properties[key2].type = type;
    if (format) {
      output.properties[key2].format = format;
    }
  }
  return nested ? output.properties : output;
}
var json = function Process5(title, object) {
  var processOutput;
  var output = {
    $schema: DRAFT
  };
  if (typeof title !== "string") {
    object = title;
    title = void 0;
  } else {
    output.title = title;
  }
  output.type = Type$1.string(object).toLowerCase();
  if (output.type === "object") {
    processOutput = processObject$1(object);
    output.type = processOutput.type;
    output.properties = processOutput.properties;
  }
  if (output.type === "array") {
    processOutput = processArray(object);
    output.type = processOutput.type;
    output.items = processOutput.items;
    if (output.title) {
      output.items.title = output.title;
      output.title += " Set";
    }
  }
  return output;
};
var Type = typeOfIs.exports;
var Utils = utils$1;
var types = {
  boolean: "String",
  string: "String",
  number: "Int32",
  date: "Date",
  timestamp: "DateTime",
  object: "Nested",
  "regexp": "String",
  "undefined": "String",
  "null": "String"
};
var lang = {
  create: function(name) {
    return ["CREATE TABLE ", name, " ("].join("");
  },
  close: function(id, dateField) {
    if (!dateField)
      return [") ENGINE = Memory;"].join("");
    else
      return [") ENGINE = MergeTree(", dateField, ", (", id, ", ", dateField, "), 8192);"].join("");
  },
  id: function(name, value) {
    return ["  ", name, "_id ", value, ","].join("");
  },
  property: function(name, value) {
    return ["  ", name, " ", value, ","].join("");
  }
};
function processObject(obj, options, dateField) {
  var name = options.tableName;
  var parent = options.parentTableName;
  var parentId = options.parentTableId;
  var parentIdType = options.parentTableIdType;
  var keys = Object.keys(obj);
  var output = [];
  var tables = [];
  var id = null;
  var idType = "string";
  output.push(lang.create(name));
  if (parent) {
    output.push(lang.property(parent + "_" + parentId, types[parentIdType]));
  }
  var nkey;
  for (var i = 0; i < keys.length; i++) {
    if (keys[i].toLowerCase() === "id" || keys[i].toLowerCase().indexOf("_id") > -1) {
      nkey = keys[i];
      obj[nkey] = obj[keys[i]];
      keys[i] = nkey;
      id = keys[i];
      idType = typeof obj[keys[i]];
    }
  }
  if (!id) {
    id = "id";
    idType = parentIdType || idType;
    output.push(lang.property(id, types[idType]));
  }
  var key2, value, type;
  for (var i = 0; i < keys.length; i++) {
    key2 = keys[i];
    value = obj[key2];
    type = value instanceof Date ? "date" : Type.string(value).toLowerCase();
    if (type == "date" && !dateField) {
      var dateField = key2;
    }
    if (type !== "undefined") {
      type = Utils.isTimestamp(value) ? "timestamp" : type;
    }
    if (type === "function") {
      continue;
    }
    if (type === "object" && !value.length) {
      tables.push("");
      tables.push(processObject(value, {
        parentTableName: name,
        parentTableId: id,
        parentTableIdType: idType,
        tableName: name + "_" + key2
      }).join(""));
      continue;
    }
    if (type === "object" || type === "array") {
      if (typeof value[0] === "object") {
        tables.push("");
        tables.push(processObject(value[0], {
          parentTableName: name,
          parentTableId: id,
          parentTableIdType: idType,
          tableName: name + "_" + key2
        }).join(""));
        continue;
      }
      tables.push("");
      tables.push(processObject({
        value: typeof value[0]
      }, {
        parentTableName: name,
        parentTableId: id,
        parentTableIdType: idType,
        tableName: name + "_" + key2
      }).join(""));
      continue;
    }
    output.push(lang.property(key2, types[type]));
  }
  output[output.length - 1] = Utils.arrayLastItem(output).substr(0, Utils.arrayLastItem(output).length - 1);
  output.push(lang.close(id, dateField));
  return output.concat(tables);
}
var clickhouse = function Process6(tableName, object, dateField) {
  if (typeof tableName !== "string") {
    object = tableName;
    tableName = "generic";
  }
  if (!dateField)
    dateField = null;
  return processObject(object, {
    tableName
  }, dateField).join("");
};
src.generic = generic;
src.mongoose = mongoose;
src.bigquery = bigquery;
src.mysql = mysql;
src.json = json;
src.clickhouse = clickhouse;
const colParamsName = () => defCol({
  prop: "name",
  label: xI$1("\u53C2\u6570\u540D\u79F0")
});
const colRemark = (options = {}) => defCol(xU.merge({
  prop: "desc",
  label: xI$1("\u5907\u6CE8")
}, options));
const colRequired = () => defCol({
  prop: "required",
  label: xI$1("\u662F\u5426\u5FC5\u987B"),
  width: "100px",
  renderCell: ({
    record
  }) => {
    const vDom = ITEM_OPTIONS_VDOM.required(record.required || "0");
    return vDom;
  }
});
const colExample = defCol({
  prop: "example",
  width: "100px",
  label: xI$1("\u793A\u4F8B")
});
const colType = defCol({
  prop: "type",
  label: xI$1("\u53C2\u6570\u7C7B\u578B"),
  width: "100px",
  renderCell: ({
    record
  }) => {
    const {
      type
    } = record;
    let label = ITEM_OPTIONS_VDOM.interfaceBodyFormType(type);
    if (!label) {
      const vDomIcon = ICON_STRATEGE[type] && ICON_STRATEGE[type]();
      let labelType = createVNode("div", {
        "class": "mr10 cell-width"
      }, [vDomIcon, createVNode("span", {
        "class": "mr10"
      }, [type])]);
      return labelType;
    }
  }
});
const colValue = defCol({
  prop: "value",
  label: xI$1("\u53C2\u6570\u503C")
});
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const {
  usefnObserveDomResize
} = compositionAPI;
function makeProps(pre, prop) {
  return [pre, prop].join(SPE);
}
function transJsonTree(item, prop, key2) {
  if (prop === 0) {
    return {
      ...item,
      key: key2,
      title: "root",
      children: xU.map(item.properties, (item2, prop2) => transJsonTree(item2, prop2, makeProps(key2, prop2)))
    };
  } else {
    return {
      ...item,
      key: key2,
      title: prop,
      children: xU.map(item.properties, (item2, prop2) => transJsonTree(item2, prop2, makeProps(key2, prop2)))
    };
  }
}
const PopoverContent = defineComponent(markRaw({
  template: `<ul>
		<li>1. Tree  <xIcon icon="arrow_right"/> Lowcode  <xIcon icon="arrow_right"/> JSON </li>
		<li>2. <ElTag color="green"><xIcon icon="arrow_right"/> </ElTag>{{xI("\u5DE6\u4FA7\u7684\u7F16\u8F91\u4F1A\u76F4\u63A5\u4F5C\u7528\u4E8E\u53F3\u4FA7")}}</li>
		<li>3. <ElTag color="red"><xIcon icon="arrow_left"/> </ElTag>{{xI("\u53F3\u4FA7\u7684\u7F16\u8F91\u9700\u8981\u624B\u5DE5\u540C\u6B65\u5230\u5DE6\u4FA7")}}\uFF0C{{xI("\u4F9D\u6B21\u70B9\u51FB")}}<xButton type="primary">{{xI("\u540C\u6B65\u5230\u5DE6\u4FA7")}}</xButton></li>
		<li>4. {{xI("\u7F16\u8F91\u4E2D\u4F1A\u6709\u5197\u4F59\u4FE1\u606F\uFF0C\u540C\u6B65\u5230\u5DE6\u4FA7\u7684JSON Tree \u4E4B\u540E\u4F1ATree Shaking")}} </li>
		<li>5. {{xI("\u70B9\u51FB")}} <ElTag color="green">root</ElTag>{{xI("\u67E5\u770B\u5168\u90E8JSON\u5185\u5BB9,\u5E76\u4E14\u53EF\u4EE5\u5168\u91CF\u4FEE\u6539")}}</li>
		<li>6. {{xI("\u666E\u901AJSON\u5BF9\u8C61\u53EF\u4EE5\u8F6C\u4E3Aschema\u683C\u5F0F")}} <xButton type="primary">{{xI("JSON \u8F6C schema")}}</xButton></li>
	  </ul>`
}));
const JsonSchemaMonaco = defineComponent({
  props: ["schemaString", "readOnly"],
  emits: ["update:schemaString"],
  setup() {
    const {
      fnObserveDomResize,
      fnUnobserveDomResize
    } = usefnObserveDomResize();
    return {
      stateApp,
      fnObserveDomResize,
      fnUnobserveDomResize
    };
  },
  computed: {
    syncLabel() {
      if (this.currentNode) {
        return xI$1("\u540C\u6B65\u5230\u7F16\u8F91\u5668");
      } else {
        return xI$1("\u540C\u6B65\u5230 JSON \u6811");
      }
    },
    isShowSchemaEditor() {
      if (this.currentNode) {
        if (this.onlyOneEditor) {
          return this.currentEditor === "SchemaEditor";
        } else {
          return true;
        }
      } else {
        return false;
      }
    },
    isShowMonacoEditor() {
      if (!this.currentNode) {
        return true;
      }
      if (this.onlyOneEditor) {
        return this.currentEditor === "MonacoEditor";
      } else {
        return true;
      }
    }
  },
  watch: {
    currentNode: {
      deep: true,
      async handler() {
        await xU.ensureValueDone(() => this.setSchemaStringDebounce);
        this.setSchemaStringDebounce();
      }
    },
    schemaString: {
      immediate: true,
      handler(schemaString) {
        this.updateSchemaJsonBy(schemaString);
      }
    },
    schemaJson: {
      immediate: true,
      handler() {
        this.updateTableDataSource();
        this.updateTree();
      }
    }
  },
  mounted() {
    this.init();
    this.fnObserveDomResize(this.$refs.JsonSchemaMonaco, () => {
      const width = $(this.$refs.JsonSchemaMonaco).width();
      const onlyOneEditor = width < 800;
      if (onlyOneEditor !== this.onlyOneEditor) {
        this.onlyOneEditor = onlyOneEditor;
      }
    });
  },
  beforeUnmount() {
    this.fnUnobserveDomResize(this.$refs.JsonSchemaMonaco);
  },
  methods: {
    renderReadOnly(vm) {
      return createVNode("div", {
        "class": "JsonSchemaMonaco flex x-card",
        "ref": "JsonSchemaMonaco"
      }, [createVNode("div", {
        "class": "left-json-tree_readonly",
        "style": "width:100%"
      }, [createVNode(resolveComponent("xDataGrid"), {
        "configs": vm.tableConfigs
      }, null)])]);
    },
    toggleEditor() {
      if (this.currentEditor === "SchemaEditor") {
        this.currentEditor = "MonacoEditor";
      } else {
        this.currentEditor = "SchemaEditor";
      }
    },
    setSchemaString() {
      let jsonSchemaString = JSON.stringify(this.schemaJson, null, 2);
      if (this.currentNode) {
        jsonSchemaString = JSON.stringify(this.currentNode, null, 2);
      }
      if (this.jsonSchemaString !== jsonSchemaString) {
        this.jsonSchemaString = jsonSchemaString;
      }
    },
    init() {
      const vm = this;
      vm.raw$Node4Diff = {};
      vm.setSchemaStringDebounce = xU.debounce(function() {
        const node = xU.cloneDeep(vm.currentNode);
        if (node) {
          const isDifferent = diff(vm.raw$Node4Diff, node);
          if (isDifferent) {
            vm.raw$Node4Diff = node;
            vm.setSchemaString(node);
          }
        } else {
          vm.setSchemaString();
        }
      }, 600);
      vm.setSchemaStringDebounce();
      vm.updateTreeDebounce = xU.debounce(function() {
        vm.jsonTree = xU.map([vm.schemaJson], (item, prop) => {
          return transJsonTree(item, prop, "");
        });
        vm.isTreeLoading = false;
      }, 32);
    },
    updateSchemaJsonBy(schemaString) {
      let schemaJson = this.schemaJson;
      try {
        schemaJson = JSON.parse(schemaString);
        this.$emit("update:schemaString", schemaString);
      } catch (error) {
        console.error(error);
        xU.message.error(xI$1("\u6570\u636E\u6709\u8BEF"));
      } finally {
        this.schemaJson = schemaJson;
      }
    },
    async updateTableDataSource() {
      const {
        properties
      } = this.schemaJson;
      setDataGridInfo(this.tableConfigs, {
        data: xU.map(properties, (item, name) => {
          return {
            name,
            ...item
          };
        })
      });
    },
    async updateTree() {
      xU("updateTree");
      this.isTreeLoading = true;
      await xU.ensureValueDone(() => this.updateTreeDebounce);
      this.updateTreeDebounce();
    },
    handleTreeClick(item) {
      this.isMockPreview = false;
      if (item && item.title !== "root") {
        this.setCurrentNode(item);
      } else {
        this.setCurrentNode(false);
      }
    },
    handleNodeSync(oldKey, node) {
      if (!node.key || !oldKey) {
        return;
      }
      xU.MutatingProps(this.schemaJson, oldKey, "never", true);
      xU.MutatingProps(this.schemaJson, node.key, node);
      this.$emit("update:schemaString", JSON.stringify(this.schemaJson));
      this.updateTree();
      this.handleTreeClick(node);
    },
    addProp(item) {
      this.handleTreeClick({
        key: [item.key, ""].join(SPE),
        title: "",
        type: "object"
      });
    },
    deleteProp(item) {
      xU.MutatingProps(this.schemaJson, item.key, "never", true);
      this.handleTreeClick();
    },
    syncMonacoString() {
      if (this.currentNode) {
        try {
          const node = JSON.parse(this.jsonSchemaString);
          this.setCurrentNode(node);
        } catch (error) {
          xU.message.error(xI$1("\u540C\u6B65\u5931\u8D25"));
        }
      } else {
        this.updateSchemaJsonBy(this.jsonSchemaString);
      }
    },
    setCurrentNode(node) {
      if (node) {
        const currentNode = xU.cloneDeep(node);
        delete currentNode.children;
        this.currentNode = currentNode;
      } else {
        this.currentNode = false;
      }
      this.setSchemaStringDebounce();
    },
    monacoJsonToSchema() {
      try {
        const res = src.json(lib.parse(this.jsonSchemaString));
        this.jsonSchemaString = JSON.stringify(res, null, 2);
      } catch (error) {
        xU.message.error(xI$1("JSON \u8F6C schema \u89E3\u6790\u51FA\u9519"));
      }
    },
    async previewMock() {
      try {
        let schema = JSON.parse(this.jsonSchemaString);
        const {
          data
        } = await API.project.interfaceSchema2json({
          schema: schema.properties
        });
        if (data) {
          this.jsonSchemaString = JSON.stringify(data, null, 2);
        } else {
          throw new Error();
        }
      } catch (error) {
        xU.message.error(xI$1("\u9884\u89C8 Mock \u7ED3\u679C\u51FA\u9519"));
      }
    }
  },
  provide() {
    const vm = this;
    return {
      jsmVM: vm
    };
  },
  data(vm) {
    return {
      tableConfigs: defDataGrid({
        isHidePagination: true,
        dataSource: [],
        columns: {
          ...colRequired(),
          ...colParamsName(),
          ...colType,
          ...colValue,
          ...colRemark({
            prop: "description"
          }),
          ...defCol({
            prop: "others",
            label: xI$1("\u5176\u4ED6\u4FE1\u606F"),
            renderCell: ({
              record
            }) => {
              const vDom = [];
              const newInfo = (label, value) => createVNode("div", null, [createVNode("span", {
                "style": "font-weight: 700;"
              }, [label, createTextVNode("\uFF1A")]), value]);
              if (record.enum) {
                vDom.push(newInfo(xI$1("\u679A\u4E3E"), record.enum.join(",")));
              }
              if (record.maximum) {
                vDom.push(newInfo(xI$1("\u6700\u5927\u503C"), record.maximum));
              }
              if (record.minimum) {
                vDom.push(newInfo(xI$1("\u6700\u5C0F\u503C"), record.minimum));
              }
              if (record.format) {
                vDom.push(newInfo(xI$1("format"), record.format));
              }
              return createVNode("div", {
                "class": "flex vertical"
              }, [vDom]);
            }
          })
        }
      }),
      currentEditor: "MonacoEditor",
      onlyOneEditor: false,
      isMockPreview: false,
      currentNode: false,
      helpTips: {
        content: PopoverContent,
        width: "500px"
      },
      isShowRaw: false,
      schemaJson: {},
      jsonSchemaString: "",
      expandedKeys: [],
      selectedKeys: [],
      jsonTree: [],
      isTreeLoading: false,
      configsPreviewMock: {
        itemType: "Checkbox",
        slots: {
          default() {
            return xI$1("Mock\u9884\u89C8");
          }
        }
      }
    };
  },
  render(vm) {
    let _slot;
    if (this.readOnly) {
      return this.renderReadOnly(vm);
    }
    return createVNode("div", {
      "class": "JsonSchemaMonaco flex x-card",
      "ref": "JsonSchemaMonaco"
    }, [createVNode("div", {
      "class": "left-json-tree"
    }, [this.isTreeLoading ? withDirectives(createVNode("div", {
      "class": "flex middle height100 width100"
    }, null), [[resolveDirective("xloading"), "true"]]) : createVNode("div", {
      "class": "flex middle height100 vertical"
    }, [createVNode("div", {
      "class": "app-padding flex middle width100"
    }, [this.onlyOneEditor ? createVNode(Fragment, null, [createVNode(resolveComponent("xButton"), {
      "type": this.currentEditor === "SchemaEditor" ? "primary" : "text",
      "onClick": vm.toggleEditor
    }, {
      default: () => [createVNode(resolveComponent("xIcon"), {
        "icon": "column2"
      }, null)]
    }), createVNode(resolveComponent("xButton"), {
      "type": this.currentEditor === "MonacoEditor" ? "primary" : "text",
      "onClick": vm.toggleEditor
    }, {
      default: () => [createVNode(resolveComponent("xIcon"), {
        "icon": "column3"
      }, null)]
    })]) : null, createVNode(resolveComponent("xGap"), {
      "f": "1"
    }, null), withDirectives(createVNode("span", {
      "class": "flex middle pointer"
    }, [createVNode(resolveComponent("xIcon"), {
      "icon": "question"
    }, null), createVNode("span", {
      "class": "ml10"
    }, [xI$1("\u8BF4\u660E")])]), [[resolveDirective("xTips"), vm.helpTips]])]), createVNode(resolveComponent("ElTree"), {
      "class": "JsonSchemaMonaco-json-tree flex1 overflow-auto width100",
      "show-line": true,
      "defaultExpandAll": true,
      "treeData": vm.jsonTree
    }, {
      title({
        dataRef
      }) {
        const {
          title,
          type,
          key: key2
        } = dataRef;
        const isShowAdd = !type || type === "object";
        const isShowDelete = !!key2;
        const vDomIcon = ICON_STRATEGE[type] && ICON_STRATEGE[type]();
        return createVNode("div", {
          "class": "flex middle  title-wrapper"
        }, [withDirectives(createVNode("div", {
          "class": "title ellipsis pointer flex1 flex middle ",
          "onClick": () => vm.handleTreeClick(dataRef)
        }, [createVNode("span", {
          "class": "mr10"
        }, [vDomIcon]), createVNode("span", null, [title]), createVNode(resolveComponent("xGap"), {
          "f": "1"
        }, null)]), [[resolveDirective("xTips"), {
          onlyEllipsis: true
        }]]), isShowAdd ? createVNode(resolveComponent("xIcon"), {
          "icon": "add",
          "onClick": () => vm.addProp(dataRef)
        }, null) : null, isShowDelete ? createVNode(resolveComponent("xIcon"), {
          "icon": "delete",
          "onClick": () => vm.deleteProp(dataRef)
        }, null) : null, createVNode(resolveComponent("xGap"), {
          "r": "10"
        }, null)]);
      }
    })])]), this.isShowSchemaEditor ? createVNode(SchemaEditor, {
      "onNodeSync": this.handleNodeSync
    }, null) : null, this.isShowMonacoEditor ? createVNode("div", {
      "class": "JsonSchemaMonaco-monaco-panel flex1 flex vertical",
      "style": {
        width: "1px"
      }
    }, [createVNode("div", {
      "class": "JsonSchemaMonaco-monaco-panel_button flex middle"
    }, [createVNode(resolveComponent("xButton"), {
      "onClick": this.syncMonacoString,
      "type": "primary",
      "disabled": this.isMockPreview
    }, {
      default: () => [this.syncLabel]
    }), createVNode(resolveComponent("xGap"), {
      "l": "10"
    }, null), !this.currentNode && createVNode(resolveComponent("xButton"), {
      "onClick": this.monacoJsonToSchema,
      "type": "primary",
      "disabled": this.isMockPreview
    }, _isSlot(_slot = xI$1("JSON \u8F6C schema")) ? _slot : {
      default: () => [_slot]
    }), createVNode(resolveComponent("xGap"), {
      "l": "10"
    }, null), !this.currentNode && createVNode(resolveComponent("xItem"), {
      "configs": vm.configsPreviewMock,
      "modelValue": this.isMockPreview,
      "onUpdate:modelValue": (val) => {
        if (vm.isMockPreview === val) {
          return;
        }
        vm.isMockPreview = val;
        if (val) {
          vm.previewMock();
        } else {
          vm.setSchemaStringDebounce();
        }
      }
    }, null)]), createVNode(MonacoEditor, {
      "class": "flex1",
      "code": this.jsonSchemaString,
      "onUpdate:code": ($event) => this.jsonSchemaString = $event,
      "language": "json"
    }, null)]) : null]);
  }
});
const BodyParamsJson = defineComponent({
  props: ["reqBodyOther", "reqBodyIsJsonSchema"],
  emits: ["update:reqBodyOther"],
  setup() {
    return {
      stateApp
    };
  },
  watch: {},
  computed: {
    schemaString: {
      get() {
        return this.reqBodyOther;
      },
      set(val) {
        this.$emit("update:reqBodyOther", val);
      }
    }
  },
  methods: {},
  data(vm) {
    return {
      isReqBodyUseSchema: false,
      jsonData: {}
    };
  },
  render() {
    return createVNode("div", {
      "style": "height:300px",
      "class": "flex vertical"
    }, [createVNode(JsonSchemaMonaco, {
      "schemaString": this.schemaString,
      "onUpdate:schemaString": ($event) => this.schemaString = $event
    }, null)]);
  }
});
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
[...BODY_PARAM_PROP_ARRAY$2, "ID_OPERATIONS"].map(xU.genId);
const BodyParamsRaw = defineComponent({
  props: ["reqBodyOther"],
  watch: {
    reqBodyOther: {
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
      formItems: {
        bulkdValue: defItem({
          isTextarea: true,
          value: "",
          placeholder: "key:value\nkey:value\nkey:value",
          rules: [FormRules.required()],
          style: "width:500px"
        })
      }
    };
  },
  watch: {
    "propOptions.formValues": {
      immediate: true,
      handler() {
      }
    }
  },
  mounted() {
    this.formItems.bulkValue.value = xU.map(this.propOptions.formValues, (item) => {
      return `${item.key || ""}:${item.value || ""}`;
    }).join("\n");
  },
  computed: {
    styleBody() {
      return "min-height:500px:width:500px";
    },
    onOk() {
      var _a, _b;
      if (!xU.isFunction((_a = this.propOptions) == null ? void 0 : _a.onOk)) {
        alert("miss onOk function");
        return xU.doNothing;
      }
      return (_b = this.propOptions) == null ? void 0 : _b.onOk;
    },
    configsFooter() {
      return {
        onCancel: this.propOptions.$close,
        onOk: async () => {
          if (!await itemsInvalid()) {
            const {
              bulkValue
            } = pickValueFrom(this.formItems);
            const bulkValueArray = bulkValue.split("\n");
            const formArray = xU.map(bulkValueArray, (str) => str.split(":"));
            this.onOk(formArray);
            this.propOptions.$close();
          }
        }
      };
    },
    vDomFormItems() {
      return xU.map(this.formItems, (item, prop) => {
        return createVNode(Fragment, null, [createVNode(resolveComponent("xGap"), {
          "t": true
        }, null), createVNode(resolveComponent("xItem"), {
          "configs": item
        }, null)]);
      });
    }
  },
  render() {
    return createVNode(Fragment, null, [createVNode("div", {
      "class": "flex flex1 vertical app-padding"
    }, [createVNode(resolveComponent("elAlert"), {
      "title": `\u578B\u5982key:value\u4E00\u884C\u4E00\u4E2A \u6362\u884C\u5373\u53EF\uFF0C\u4E0D\u8981\u4F7F\u7528\u9017\u53F7\u3001\u5206\u53F7\u5206\u9694`
    }, null), createVNode("div", {
      "style": "height:340px;width:500px"
    }, [createVNode(MonacoEditor, {
      "code": this.formItems.bulkValue.value,
      "onUpdate:code": ($event) => this.formItems.bulkValue.value = $event,
      "language": "text"
    }, null)])]), createVNode(resolveComponent("xDialogFooter"), {
      "configs": this.configsFooter
    }, null)]);
  }
});
const BodyParamsPanel = defineComponent({
  props: ["params"],
  emits: ["update:params"],
  data(vm) {
    return {
      configsBodyType: defItem({
        prop: "configsBodyType",
        itemType: "RadioGroup",
        options: ITEM_OPTIONS.interfaceBodyType
      })
    };
  },
  methods: {
    openBulkValuesDialog() {
      xU.dialog({
        title: xI("\u6279\u91CF\u6DFB\u52A0\u53C2\u6570"),
        component: DialogBulkValues,
        formValues: this.params.req_body_form,
        onOk: (req_body_form) => {
          this.params.req_body_form = req_body_form;
        }
      });
    }
  },
  computed: {
    bodyType: {
      get() {
        return this.params.req_body_type;
      },
      set(type) {
        this.params.req_body_type = type;
      }
    }
  },
  render() {
    return createVNode(resolveComponent("elCard"), null, {
      extra: () => {
        var _a;
        if ((_a = xU.find(ITEM_OPTIONS.interfaceBodyType, {
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
          "reqBodyForm": this.params.req_body_form
        }, null) : null, this.params.req_body_type == "json" ? createVNode(BodyParamsJson, {
          "reqBodyIsJsonSchema": this.params.req_body_is_json_schema,
          "reqBodyOther": this.params.req_body_other,
          "onUpdate:reqBodyOther": ($event) => this.params.req_body_other = $event
        }, null) : null, this.params.req_body_type == "file" ? "\u5F00\u53D1\u4E2D......" : null, this.params.req_body_type == "raw" ? createVNode(BodyParamsRaw, {
          "reqBodyOther": this.params.req_body_other,
          "onUpdate:reqBodyOther": ($event) => this.params.req_body_other = $event
        }, null) : null]);
      }
    });
  }
});
function newFormData$1([name, value] = ["", ""]) {
  return {
    _id: xU.genId("req_header_item"),
    name,
    value,
    example: "",
    required: "1",
    desc: ""
  };
}
const STRATEGY_CELL_ITEM_CONFIGS$1 = {
  name: {},
  value: {},
  example: {},
  desc: {}
};
const BODY_PARAM_PROP_ARRAY$1 = Object.keys(STRATEGY_CELL_ITEM_CONFIGS$1);
[...BODY_PARAM_PROP_ARRAY$1, "ID_OPERATIONS"].map(xU.genId);
const HeaderParamsForm = defineComponent({
  props: ["reqHeaders"],
  watch: {
    reqHeaders: {
      immediate: true,
      handler(formDataArray) {
        this.resetDataForm(formDataArray);
      }
    }
  },
  methods: {
    openBulkValuesDialog() {
      xU.dialog({
        title: xI$1("\u6279\u91CF\u6DFB\u52A0\u53C2\u6570"),
        component: DialogBulkValues,
        formValues: xU.map(this.configs_table.dataSource, (i) => {
          return {
            key: i.name,
            value: i.value
          };
        }),
        onOk: (formDataArray) => {
          this.configs_table.dataSource = xU.map(formDataArray, newFormData$1);
        }
      });
    },
    addRow() {
      this.configs_table.dataSource.unshift(newFormData$1());
    },
    deleteRow(_id) {
      const index = xU.findIndex(this.configs_table.dataSource, {
        _id
      });
      if (~index) {
        this.configs_table.dataSource.splice(index, 1);
      }
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
        columns: {
          ...defCol({
            label: xI$1("\u540D\u79F0"),
            prop: "name",
            renderEditor: ({
              record
            }) => createVNode(resolveComponent("aAutoComplete"), {
              "options": HTTP_REQUEST_HEADER.map((label) => ({
                label,
                value: label
              })),
              "value": record.name,
              "onUpdate:value": ($event) => record.name = $event
            }, null)
          }),
          ...defCol({
            label: xI$1("\u53C2\u6570\u503C"),
            prop: "value",
            renderEditor: ({
              record
            }) => createVNode(resolveComponent("ElInput"), {
              "value": record.value,
              "onUpdate:value": ($event) => record.value = $event
            }, null)
          }),
          ...defCol({
            label: xI$1("\u793A\u4F8B"),
            prop: "example",
            renderEditor: ({
              record
            }) => createVNode(resolveComponent("ElInput"), {
              "value": record.example,
              "onUpdate:value": ($event) => record.example = $event
            }, null)
          }),
          ...defCol({
            label: xI$1("\u5907\u6CE8"),
            prop: "desc",
            renderEditor: ({
              record
            }) => createVNode(resolveComponent("ElInput"), {
              "value": record.desc,
              "onUpdate:value": ($event) => record.desc = $event
            }, null)
          }),
          ...defCol({
            label: xI$1("\u64CD\u4F5C"),
            prop: "operations",
            width: "40px",
            renderHeader: () => null,
            renderCell: ({
              record
            }) => createVNode(resolveComponent("xIcon"), {
              "icon": "delete",
              "class": "pointer",
              "onClick": () => vm.deleteRow(record._id)
            }, null)
          })
        }
      })
    };
  },
  render() {
    return createVNode(Fragment, null, [createVNode("div", {
      "class": "flex middle"
    }, [createVNode(resolveComponent("xButton"), {
      "class": "mb10",
      "onClick": this.addRow
    }, {
      default: () => [createTextVNode("\u6DFB\u52A0\u4E00\u884C")]
    }), createVNode(resolveComponent("xGap"), {
      "f": "1"
    }, null), createVNode("a", {
      "class": "mb10 mr10",
      "onClick": this.openBulkValuesDialog
    }, [createTextVNode("\u6279\u91CF\u6DFB\u52A0")])]), createVNode("div", {
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
  props: {
    reqHeaders: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  emits: ["update:reqHeaders"],
  data(vm) {
    return {};
  },
  render(vm) {
    return createVNode(resolveComponent("elCard"), null, {
      default: () => [createVNode(HeaderParamsForm, {
        "reqHeaders": this.reqHeaders
      }, null)]
    });
  }
});
function newFormData([name, value] = ["", ""]) {
  return {
    _id: xU.genId("query_params"),
    name: "",
    required: "1",
    example: "",
    desc: ""
  };
}
const STRATEGY_CELL_ITEM_CONFIGS = {
  name: {},
  required: {
    itemType: "Select",
    options: ITEM_OPTIONS.required
  },
  example: {},
  desc: {}
};
const BODY_PARAM_PROP_ARRAY = Object.keys(STRATEGY_CELL_ITEM_CONFIGS);
[...BODY_PARAM_PROP_ARRAY, "ID_OPERATIONS"].map(xU.genId);
const QueryParamsForm = defineComponent({
  props: ["reqQuery"],
  emits: ["update:reqQuery"],
  watch: {
    reqQuery: {
      immediate: true,
      handler(formDataArray) {
        this.resetDataForm(formDataArray);
      }
    }
  },
  methods: {
    openBulkValuesDialog() {
      xU.dialog({
        title: xI$1("\u6279\u91CF\u6DFB\u52A0\u53C2\u6570"),
        component: DialogBulkValues,
        formValues: xU.map(this.configs_table.dataSource, (i) => {
          return {
            key: i.name,
            value: i.value
          };
        }),
        onOk: (formDataArray) => {
          this.configs_table.dataSource = xU.map(formDataArray, newFormData);
        }
      });
    },
    addRow() {
      console.log("addRow");
      this.configs_table.dataSource.unshift(newFormData());
    },
    deleteRow(_id) {
      const index = xU.findIndex(this.configs_table.dataSource, {
        _id
      });
      if (~index) {
        this.configs_table.dataSource.splice(index, 1);
      }
    },
    resetDataForm(newFormDataArray) {
      this.configs_table.dataSource = newFormDataArray;
    }
  },
  data(vm) {
    return {
      configs_table: defXVirTableConfigs({
        rowHeight: 48,
        dataSource: [],
        customClass: (tableId) => [`#${tableId} .input-width100{width:100%;}`, `#${tableId} div[role=td] .el-tag{margin:auto;}`, `#${tableId} div[role=tr] div[role=th][data-prop=operations]{justify-content:center;}`, `#${tableId} div[role=tr] div[role=td][data-prop=operations]{justify-content:center;color:red;}`].join("\n"),
        columns: {
          ...defCol({
            label: xI$1("\u540D\u79F0"),
            prop: "name",
            renderEditor: ({
              record
            }) => createVNode(resolveComponent("ElInput"), {
              "value": record.name,
              "onUpdate:value": ($event) => record.name = $event
            }, null)
          }),
          ...defCol({
            label: xI$1("\u5FC5\u9700"),
            prop: "required",
            width: "110px",
            renderCell: ({
              record
            }) => ITEM_OPTIONS_VDOM.required(record.required),
            renderEditor: ({
              record
            }) => createVNode(resolveComponent("ElSelect"), {
              "options": ITEM_OPTIONS.required,
              "value": record.required,
              "onUpdate:value": ($event) => record.required = $event
            }, null)
          }),
          ...defCol({
            label: xI$1("\u793A\u4F8B"),
            prop: "example",
            renderEditor: ({
              record
            }) => createVNode(resolveComponent("ElInput"), {
              "value": record.example,
              "onUpdate:value": ($event) => record.example = $event
            }, null)
          }),
          ...defCol({
            label: xI$1("\u5907\u6CE8"),
            prop: "desc",
            renderEditor: ({
              record
            }) => createVNode(resolveComponent("ElInput"), {
              "value": record.desc,
              "onUpdate:value": ($event) => record.desc = $event
            }, null)
          }),
          ...defCol({
            label: xI$1("\u64CD\u4F5C"),
            prop: "operations",
            width: "40px",
            renderHeader: () => null,
            renderCell: ({
              record
            }) => {
              return compileVNode(`<xIcon icon="delete" class="pointer" @Click="deleteRow(record._id)" />`, {
                record,
                deleteRow: vm.deleteRow
              });
            }
          })
        }
      })
    };
  },
  render() {
    return createVNode(Fragment, null, [createVNode("div", {
      "class": "flex middle"
    }, [createVNode(resolveComponent("xButton"), {
      "class": "mb10",
      "onClick": this.addRow
    }, {
      default: () => [createTextVNode("\u6DFB\u52A0\u4E00\u884C")]
    }), createVNode(resolveComponent("xGap"), {
      "f": "1"
    }, null), createVNode("a", {
      "class": "mb10 mr10",
      "onClick": this.openBulkValuesDialog
    }, [createTextVNode("\u6279\u91CF\u6DFB\u52A0")])]), createVNode("div", {
      "style": {
        height: "300px"
      }
    }, [createVNode(resolveComponent("xVirTable"), {
      "configs": this.configs_table,
      "class": "flex1 width100 ",
      "uniqBy": "_id"
    }, null)])]);
  }
});
const QueryParamsPanel = defineComponent({
  props: {
    reqQuery: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  emits: ["update:reqQuery"],
  data(vm) {
    return {};
  },
  render(vm) {
    return createVNode(resolveComponent("elCard"), null, {
      default: () => [createVNode(QueryParamsForm, {
        "reqQuery": this.reqQuery
      }, null)]
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
      pparams: null
    };
  },
  watch: {
    pparams(params) {
      this.$emit("update:params", params);
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
    const bodyHeader = (() => {
      var _a, _b, _c, _d;
      if (((_a = this.params) == null ? void 0 : _a.req_body_type) == "form") {
        return `${BODY} ${(_b = this.params) == null ? void 0 : _b.req_body_type} ${(_c = this.params) == null ? void 0 : _c.req_body_form.length}`;
      }
      return `${BODY} ${(_d = this.params) == null ? void 0 : _d.req_body_type}`;
    })();
    return createVNode(resolveComponent("elCollapse"), {
      "modelValue": this.collapseActive,
      "onUpdate:modelValue": ($event) => this.collapseActive = $event
    }, {
      default: () => {
        var _a, _b;
        return [createVNode(resolveComponent("elCollapseItem"), {
          "key": "header",
          "title": `header ${(_a = this.params) == null ? void 0 : _a.req_headers.length}`
        }, {
          default: () => {
            var _a2;
            return [createVNode(HeaderParamsPanel, {
              "reqHeaders": (_a2 = this.params) == null ? void 0 : _a2.req_headers,
              "onUpdate:reqHeaders": (req_headers) => this.$emit("update:params", xU.merge({}, this.params, {
                req_headers
              }))
            }, null)];
          }
        }), createVNode(resolveComponent("elCollapseItem"), {
          "key": QUERY,
          "title": `${QUERY} ${(_b = this.params) == null ? void 0 : _b.req_query.length}`
        }, {
          default: () => {
            var _a2;
            return [createVNode(QueryParamsPanel, {
              "reqQuery": (_a2 = this.params) == null ? void 0 : _a2.req_query,
              "onUpdate:reqQuery": (req_query) => this.$emit("update:params", xU.merge({}, this.params, {
                req_query
              }))
            }, null)];
          }
        }), createVNode(resolveComponent("elCollapseItem"), {
          "key": BODY,
          "title": bodyHeader,
          "collapsible": this.bodyCollapsible
        }, {
          default: () => [createVNode(BodyParamsPanel, {
            "params": this.params || {},
            "onUpdate:params": (params) => this.$emit("update:params", xU.merge({}, this.params, params))
          }, null)]
        })];
      }
    });
  }
});
const ResponsePanel = defineComponent({
  props: ["body", "bodyType", "resBackupJson"],
  emits: ["update:body", "update:bodyType", "update:resBackupJson"],
  data() {
    const configsPrivateBodyType = defItem({
      prop: "configsPrivateBodyType",
      itemType: "RadioGroup",
      options: ITEM_OPTIONS.interfaceBodyType
    });
    return {
      configsPrivateBodyType
    };
  },
  computed: {
    privateBody: {
      get() {
        return this.body || `{}`;
      },
      set(val) {
        this.$emit("update:body", val);
      }
    },
    privateBodyType: {
      get() {
        return this.bodyType || `{}`;
      },
      set(val) {
        this.$emit("update:bodyType", val);
      }
    },
    _resBackupJson: {
      get() {
        return this.resBackupJson || `{}`;
      },
      set(val) {
        this.$emit("update:resBackupJson", val);
      }
    }
  },
  render() {
    return createVNode(resolveComponent("elCard"), null, {
      header: () => {
        console.log("this.privateBodyType", this.privateBodyType);
        return createVNode(resolveComponent("xItem"), {
          "modelValue": this.privateBodyType,
          "onUpdate:modelValue": ($event) => this.privateBodyType = $event,
          "configs": this.configsPrivateBodyType
        }, null);
      },
      default: () => {
        if (this.privateBodyType === "json") {
          return createVNode(JsonSchemaMonaco, {
            "schemaString": this.privateBody,
            "onUpdate:schemaString": ($event) => this.privateBody = $event,
            "style": "height:400px;"
          }, null);
        }
        if (this.privateBodyType === "backup") {
          return createVNode("div", {
            "style": "height:400px;"
          }, [createVNode(resolveComponent("MonacoEditor"), {
            "class": "flex1",
            "code": this._resBackupJson,
            "onUpdate:code": ($event) => this._resBackupJson = $event,
            "language": "json"
          }, null)]);
        }
        return createVNode("div", {
          "style": "height:400px;"
        }, [createVNode(resolveComponent("MonacoEditor"), {
          "class": "flex1",
          "code": this.privateBody,
          "onUpdate:code": ($event) => this.privateBody = $event,
          "language": "json"
        }, null)]);
      }
    });
  }
});
const TuiEditor$1 = "";
const TuiEditor = defineAsyncComponent(async () => {
  const {
    pathname,
    origin
  } = window.location;
  let toastui = await xU.asyncGlobalJS("toastui", `${origin}${pathname}assets/libs/toastui-editor-all.js`);
  if (!toastui) {
    return;
  }
  const {
    Editor
  } = toastui;
  const customHTMLRenderer = {
    image: (node, context) => {
      const {
        title,
        destination,
        firstChild
      } = node;
      const {
        literal: literal2
      } = firstChild || {};
      const {
        skipChildren
      } = context;
      skipChildren();
      const src2 = (() => {
        const [_, id] = String(destination).match(/^_id:(\d+)/) || [];
        if (id) {
          return `${stateApp.BASE_URL}/api/resource/get?id=${id}`;
        } else {
          return destination;
        }
      })();
      return {
        type: "openTag",
        tagName: "img",
        selfClose: true,
        attributes: {
          title,
          alt: literal2,
          src: src2
        }
      };
    }
  };
  return defineComponent({
    props: ["modelValue", "isReadonly"],
    emits: ["update:modelValue"],
    data() {
      return {
        visible: false,
        imgIndex: 0,
        imgList: [],
        imgSrc: "",
        id: xU.genId("TuiEditor"),
        raw$md: "",
        vmTuiEditorDone: false,
        configsPopoverChangeTheme: {
          trigger: "rightClick",
          content: MkitTheme,
          openAtPoint: true
        }
      };
    },
    computed: {
      readonly() {
        if (xU.isBoolean(this.isReadonly)) {
          return this.isReadonly;
        } else {
          if (this.$attrs.readonly) {
            return true;
          }
        }
        return false;
      }
    },
    created() {
    },
    mounted() {
      this.init();
    },
    watch: {
      readonly: {
        immediate: true,
        async handler() {
          this.setHtml && this.setHtml();
        }
      },
      vmTuiEditorDone: {
        async handler() {
          this.setMd(this.modelValue.md);
        }
      },
      "modelValue.md": {
        immediate: true,
        async handler(mdString) {
          this.setMd(mdString);
        }
      }
    },
    methods: {
      setMd(mdString) {
        try {
          if (!this.vmTuiEditor) {
            throw new Error("return");
          }
          if (!mdString && !this.vmTuiEditor) {
            throw new Error("return");
          }
          const _mdString = this.vmTuiEditor.getMarkdown();
          if (_mdString === mdString) {
            throw new Error("return");
          } else {
          }
          this.vmTuiEditor.setMarkdown(mdString);
          this.setHtml();
        } catch (error) {
          if ("return" !== (error == null ? void 0 : error.message)) {
            console.error(error);
          }
        } finally {
        }
      },
      setHtml() {
        try {
          if (!this.vmTuiEditor) {
            return;
          }
          if (!this.isReadonly) {
            return;
          }
          let html = this.vmTuiEditor.getHTML();
          html = new PreprocessHTML(html).html;
          setTimeout(() => {
            $(this.$refs.viewer).html(html);
          }, 64);
        } catch (error) {
          console.error(error);
        } finally {
        }
      },
      destoryListener() {
        if (this.$previewer) {
          this.$previewer.off("click");
          this.$previewer = null;
        }
      },
      showImg(index) {
        const $md = $(this.$refs.viewer);
        const imgList = $md.find("img");
        const img = imgList[index];
        if (img) {
          this.imgIndex = index;
          this.imgList = xU.map(imgList, (img2) => img2.src);
          this.imgSrc = this.imgList[this.imgIndex];
          this.$nextTick(() => {
            $(this.$refs.imgViewer.$el).find("img").click();
          });
        }
      },
      handleClick(event) {
        const {
          target
        } = event;
        let $ele = (() => {
          if (target.classList.contains("x-tui-image")) {
            return $(target);
          }
          if (target.classList.contains("x-tui-image-img")) {
            return $(target).parents(".x-tui-image[data-x-tui-image-index]");
          }
          return false;
        })();
        if ($ele) {
          this.showImg(Number($ele.attr("data-x-tui-image-index")));
        }
      },
      async emitModelValue() {
        const vm = this;
        $(this.raw$selector).show().addClass("flash infinite");
        const mdString = vm.vmTuiEditor.getMarkdown();
        if (vm.modelValue.md !== mdString) {
          vm.$emit("update:modelValue", {
            md: mdString,
            html: ""
          });
        }
        $(this.raw$selector).removeClass("flash infinite").hide();
      },
      async init() {
        let vm = this;
        await xU.ensureValueDone(() => vm.$refs.container);
        try {
          (() => {
            vm.vmTuiEditor = new Editor({
              customHTMLRenderer,
              el: vm.$refs.container,
              initialEditType: "markdown",
              previewStyle: "vertical",
              initialValue: "",
              height: "300px",
              hooks: {
                change: (_) => {
                  vm.emitModelValueDebounce && vm.emitModelValueDebounce();
                },
                addImageBlobHook: async (blob, callback) => {
                  let formData = new FormData();
                  formData.append("file", blob);
                  formData.append("useFor", "wiki");
                  const {
                    data
                  } = await API.resource.upload(formData);
                  callback(`_id:${data._id}`);
                }
              }
            });
            vm.vmTuiEditorDone = true;
            vm.emitModelValueDebounce = xU.debounce(vm.emitModelValue, 1e3);
            const className = `sync_${vm._.uid}`;
            vm.raw$selector = `.${className}`;
            vm.vmTuiEditor.insertToolbarItem({
              groupIndex: 4,
              itemIndex: 2
            }, {
              name: "sync",
              text: "Sync...",
              id: "toastuiEditorToolbarIconsSync",
              className: `toastui-editor-toolbar-icons animated ${className}`,
              style: {
                backgroundImage: "none"
              }
            });
          })();
        } catch (error) {
          console.error(error);
        }
      }
    },
    render(vm) {
      return createVNode(Fragment, null, [vm.readonly && withDirectives(createVNode("div", {
        "onClick": vm.handleClick,
        "ref": "viewer",
        "class": "toastui-editor-contents flex1 border-radius box-shadow padding20",
        "style": "height:300px;width:100%;z-index:1;padding:var(--app-padding);"
      }, null), [[resolveDirective("xTips"), vm.configsPopoverChangeTheme]]), createVNode("div", {
        "class": "display-none"
      }, [createVNode(resolveComponent("ElImage"), {
        "ref": "imgViewer",
        "src": vm.imgSrc,
        "previewSrcList": vm.imgList,
        "initialIndex": vm.imgIndex,
        "hide-on-click-modal": true,
        "fit": "scale-down",
        "previewTeleported": true
      }, null)]), createVNode("div", {
        "id": vm.id,
        "ref": "container",
        "class": {
          flex1: true,
          "display-none": vm.readonly
        },
        "style": "height:300px;width:100%;z-index:1;"
      }, null)]);
    }
  });
});
export {
  DialogAddProject as D,
  JsonSchemaMonaco as J,
  ProjectCard as P,
  RequestArgsPanel as R,
  TuiEditor as T,
  xItem_ProjectName as a,
  xItem_ProjectIcon as b,
  xItem_ProjectColor as c,
  xItem_ProjectBasePath as d,
  xItem_ProjectDesc as e,
  xItem_ProjectType as f,
  ResponsePanel as g,
  DialogUpsertProxyEnv as h,
  colParamsName as i,
  colRemark as j,
  colRequired as k,
  lib as l,
  colValue as m,
  colExample as n,
  orderAsc as o,
  colType as p,
  xItem_ProjectGroupId as x
};
