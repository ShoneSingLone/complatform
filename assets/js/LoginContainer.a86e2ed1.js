import { d as defineComponent, C as Cpt_url, M as Methods_App, a as defItem, l as lStorage, F as FormRules, E as EVENT_TYPE, v as validateForm, A as AllWasWell, p as pickValueFrom, b as API, U as UI, S as State_UI, _ as _export_sfc, r as resolveComponent, o as openBlock, c as createElementBlock, e as createVNode, w as withKeys, f as createBaseVNode, g as _State_App, h as createTextVNode } from "./index.4744bf8d.js";
const Login = "";
const {
  $t: $t$1
} = State_UI;
const _sfc_main$1 = defineComponent({
  props: {
    form: {
      type: Object
    },
    history: {
      type: Object
    },
    isLDAP: {
      type: Boolean
    }
  },
  setup() {
    return {
      Cpt_url,
      Methods_App
    };
  },
  data(vm) {
    return {
      loginType: "ldap",
      configsForm: {
        ...defItem({
          value: lStorage.email || "",
          prop: "email",
          size: "large",
          placeholder: () => $t$1("Email").label,
          onAfterValueEmit(val) {
            lStorage.email = val;
          },
          rules: [FormRules.required(() => $t$1("\u8BF7\u8F93\u5165Email!").label, [EVENT_TYPE.blur]), FormRules.email()]
        }),
        ...defItem({
          value: lStorage.password || "",
          prop: "password",
          isPassword: true,
          size: "large",
          placeholder: () => $t$1("\u5BC6\u7801").label,
          onAfterValueEmit(val) {
            lStorage.password = val;
          },
          rules: [FormRules.required(() => $t$1("\u8BF7\u8F93\u5165\u5BC6\u7801").label, [EVENT_TYPE.blur])]
        })
      },
      configsSubmit: {
        size: "large",
        type: "primary",
        class: "login-button flex center login-form-button",
        text: () => $t$1("\u767B\u5F55").label,
        onClick: vm.login
      }
    };
  },
  methods: {
    async login() {
      const vm = this;
      try {
        const validateResults = await validateForm(vm.configsForm);
        if (AllWasWell(validateResults)) {
          const formData = pickValueFrom(vm.configsForm);
          const res = await API.user.loginActions(formData);
          debugger;
          UI.notification.success("\u767B\u5F55\u6210\u529F! ");
          Cpt_url.value.go("/group");
        } else {
          throw new Error("\u672A\u901A\u8FC7\u9A8C\u8BC1");
        }
      } catch (e) {
        console.error(e);
      }
    }
  }
});
const _hoisted_1$1 = { class: "item-wrapper" };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_xItem = resolveComponent("xItem");
  const _component_xGap = resolveComponent("xGap");
  const _component_xButton = resolveComponent("xButton");
  return openBlock(), createElementBlock("form", null, [
    createVNode(_component_xItem, {
      configs: _ctx.configsForm.email,
      autocomplete: "email",
      onKeypress: withKeys(_ctx.login, ["enter"])
    }, null, 8, ["configs", "onKeypress"]),
    createVNode(_component_xGap, { t: "20" }),
    createVNode(_component_xItem, {
      configs: _ctx.configsForm.password,
      autocomplete: "current-password",
      onKeypress: withKeys(_ctx.login, ["enter"])
    }, null, 8, ["configs", "onKeypress"]),
    createBaseVNode("div", _hoisted_1$1, [
      createVNode(_component_xButton, { configs: _ctx.configsSubmit }, null, 8, ["configs"])
    ])
  ]);
}
const LoginForm = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
const {
  $t
} = State_UI;
const styles = {
  icon: {
    color: "rgba(0, 0, 0, 0.25)",
    width: "16px",
    height: "16px"
  }
};
const _sfc_main = defineComponent({
  props: {
    form: {
      type: Object
    },
    history: {
      type: Object
    },
    regActions: {
      type: Function
    }
  },
  setup() {
    return {
      Cpt_url,
      Methods_App
    };
  },
  data() {
    const vm = this;
    return {
      data: {
        userName: "",
        email: "",
        password: "",
        confirm: "",
        verifyCode: ""
      },
      configsForm: {
        ...defItem({
          prop: "userName",
          size: "large",
          placeholder: () => $t("\u7528\u6237\u540D").label,
          rules: [FormRules.required(() => $t("\u8BF7\u8F93\u5165\u7528\u6237\u540D!").label, [EVENT_TYPE.blur])],
          slots: {
            prefix: () => createVNode(resolveComponent("xIcon"), {
              "icon": "UserOutlined",
              "style": styles.icon
            }, null)
          }
        }),
        ...defItem({
          prop: "email",
          size: "large",
          placeholder: () => $t("Email").label,
          rules: [FormRules.required(() => $t("\u8BF7\u8F93\u5165Email!").label, [EVENT_TYPE.blur]), FormRules.email()],
          slots: {
            prefix: () => createVNode(resolveComponent("MailOutlined"), {
              "style": styles.icon
            }, null)
          }
        }),
        ...defItem({
          prop: "password",
          isPassword: true,
          size: "large",
          placeholder: () => $t("\u5BC6\u7801").label,
          rules: [FormRules.required(() => $t("\u8BF7\u8F93\u5165\u5BC6\u7801").label, [EVENT_TYPE.update])],
          onValidateFial: (thisConfigs) => {
            console.log(thisConfigs.itemTips);
          },
          slots: {
            prefix: () => createVNode(resolveComponent("xIcon"), {
              "icon": "LockOutlined",
              "style": styles.icon
            }, null)
          }
        }),
        ...defItem({
          prop: "confirm",
          isPassword: true,
          size: "large",
          placeholder: () => $t("\u8BF7\u518D\u6B21\u8F93\u5165\u5BC6\u7801!").label,
          rules: [FormRules.required(() => $t("\u8BF7\u518D\u6B21\u8F93\u5165\u5BC6\u7801!").label, [EVENT_TYPE.blur]), FormRules.custom({
            msg: () => $t("\u4E24\u6B21\u8F93\u5165\u7684\u5BC6\u7801\u4E0D\u4E00\u81F4!").label,
            validator: async (confirm) => vm.configsForm.password.value !== confirm,
            trigger: [EVENT_TYPE.update]
          })],
          slots: {
            prefix: () => createVNode(resolveComponent("LockOutlined"), {
              "style": styles.icon
            }, null)
          }
        })
      },
      configsSubmit: {
        size: "large",
        type: "primary",
        class: "login-button flex center login-form-button",
        text: () => $t("\u6CE8\u518C").label,
        async onClick() {
          try {
            const validateResults = await validateForm(vm.configsForm);
            if (AllWasWell(validateResults)) {
              const res = await API.user.regActions(vm.data);
              UI.notification.success("\u6CE8\u518C\u6210\u529F");
              this.Cpt_url.go("/group");
            } else {
              throw new Error("\u672A\u901A\u8FC7\u9A8C\u8BC1");
            }
          } catch (e) {
            debugger;
            console.error(e);
          }
        }
      }
    };
  },
  methods: {}
});
const _hoisted_1 = { class: "item-wrapper" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_xItem = resolveComponent("xItem");
  const _component_xGap = resolveComponent("xGap");
  const _component_xButton = resolveComponent("xButton");
  return openBlock(), createElementBlock("form", null, [
    createVNode(_component_xItem, {
      modelValue: _ctx.data.userName,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.data.userName = $event),
      configs: _ctx.configsForm.userName,
      autocomplete: "userName"
    }, null, 8, ["modelValue", "configs"]),
    createVNode(_component_xGap, { t: "20" }),
    createVNode(_component_xItem, {
      modelValue: _ctx.data.email,
      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.data.email = $event),
      configs: _ctx.configsForm.email,
      autocomplete: "email"
    }, null, 8, ["modelValue", "configs"]),
    createVNode(_component_xGap, { t: "20" }),
    createVNode(_component_xItem, {
      modelValue: _ctx.data.password,
      "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.data.password = $event),
      configs: _ctx.configsForm.password,
      autocomplete: "current-password"
    }, null, 8, ["modelValue", "configs"]),
    createVNode(_component_xGap, { t: "20" }),
    createVNode(_component_xItem, {
      modelValue: _ctx.data.confirm,
      "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => _ctx.data.confirm = $event),
      configs: _ctx.configsForm.confirm,
      autocomplete: "current-password"
    }, null, 8, ["modelValue", "configs"]),
    createBaseVNode("div", _hoisted_1, [
      createVNode(_component_xButton, { configs: _ctx.configsSubmit }, null, 8, ["configs"])
    ])
  ]);
}
const RegForm = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
const LoginWrap = defineComponent({
  components: {
    LoginForm
  },
  props: {
    form: {
      type: Object
    },
    canRegister: {
      type: Boolean
    }
  },
  setup() {
    return {
      State_App: _State_App
    };
  },
  render() {
    return createVNode(resolveComponent("aTabs"), {
      "defaultActiveKey": _State_App.user.loginWrapActiveKey,
      "class": "login-form",
      "tabBarStyle": {
        border: "none"
      }
    }, {
      default: () => [createVNode(resolveComponent("aTabPane"), {
        "tab": "\u767B\u5F55",
        "key": "1"
      }, {
        default: () => [createVNode(LoginForm, null, null)]
      }), createVNode(resolveComponent("aTabPane"), {
        "tab": "\u6CE8\u518C",
        "key": "2"
      }, {
        default: () => [_State_App.user.canRegister ? createVNode(RegForm, null, null) : createVNode("div", {
          "style": {
            minHeight: 200
          }
        }, [createTextVNode("\u7BA1\u7406\u5458\u5DF2\u7981\u6B62\u6CE8\u518C\uFF0C\u8BF7\u8054\u7CFB\u7BA1\u7406\u5458")])]
      })]
    });
  }
});
const LoginContainer = defineComponent({
  computed: {
    styleLogo() {
      return {
        width: "100px",
        height: "100px"
      };
    }
  },
  render() {
    return createVNode("div", {
      "class": "g-body login-body flex1 ",
      "style": "overflow:auto"
    }, [createVNode("div", {
      "class": "m-bg"
    }, [createVNode("div", {
      "class": "m-bg-mask m-bg-mask0"
    }, null), createVNode("div", {
      "class": "m-bg-mask m-bg-mask1"
    }, null), createVNode("div", {
      "class": "m-bg-mask m-bg-mask2"
    }, null), createVNode("div", {
      "class": "m-bg-mask m-bg-mask3"
    }, null)]), createVNode("div", {
      "class": "main-one login-container"
    }, [createVNode("div", {
      "class": "container"
    }, [createVNode(resolveComponent("aRow"), {
      "type": "flex",
      "justify": "center"
    }, {
      default: () => [createVNode(resolveComponent("aCol"), {
        "xs": 20,
        "sm": 16,
        "md": 12,
        "lg": 8,
        "class": "container-login"
      }, {
        default: () => [createVNode(resolveComponent("aCard"), {
          "class": "card-login"
        }, {
          default: () => [createVNode("h2", {
            "class": "login-title"
          }, [createTextVNode("YAPI")]), createVNode("div", {
            "class": "login-logo elevation-12"
          }, [createVNode(resolveComponent("xIcon"), {
            "icon": "yapi_logo",
            "style": this.styleLogo
          }, null)]), createVNode(LoginWrap, null, null)]
        })]
      })]
    })])])]);
  }
});
export {
  LoginContainer
};
