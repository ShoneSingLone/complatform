import { d as defineComponent, g as _State_App, i as defFormConfigs, F as FormRules, $ as $t$1, E as EVENT_TYPE, s as setValueTo, v as validateForm, A as AllWasWell, p as pickValueFrom, j as Methods_ProjectInterface, U as UI, b as API, e as createVNode, r as resolveComponent, x as xU, k as Fragment, m as isVNode, n as Cpt_avatarUrl, h as createTextVNode } from "./index.js";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const DialogUpdatePwd = defineComponent({
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
      dataXItem: defFormConfigs([{
        value: "",
        prop: "old_password",
        label: "\u5F53\u524D\u5BC6\u7801",
        placeholder: "\u5F53\u524D\u5BC6\u7801",
        isPassword: true,
        rules: [FormRules.required("\u8BF7\u8F93\u5165\u5F53\u524D\u5BC6\u7801!")]
      }, {
        value: "",
        prop: "password",
        label: "\u65B0\u5BC6\u7801",
        placeholder: "\u65B0\u5BC6\u7801",
        isPassword: true,
        rules: [FormRules.required("\u8BF7\u8F93\u5165\u65B0\u5BC6\u7801!")]
      }, {
        value: "",
        prop: "verify_pass",
        label: "\u786E\u8BA4\u65B0\u5BC6\u7801",
        placeholder: "\u786E\u8BA4\u65B0\u5BC6\u7801",
        isPassword: true,
        rules: [FormRules.required(() => $t$1("\u8BF7\u518D\u6B21\u8F93\u5165\u5BC6\u7801!").label, [EVENT_TYPE.blur]), FormRules.custom({
          msg: () => $t$1("\u4E24\u6B21\u8F93\u5165\u7684\u5BC6\u7801\u4E0D\u4E00\u81F4!").label,
          validator: async (confirm) => vm.dataXItem.password.value !== confirm,
          trigger: [EVENT_TYPE.update]
        })]
      }])
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
      "class": "x-dialog-boddy-wrapper flex1 height100 "
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
      "b": "38"
    }, null)]), createVNode(resolveComponent("xDialogFooter"), {
      "configs": {
        onCancel: this.propDialogOptions.closeDialog,
        onOk: this.onOk
      }
    }, null)]);
  }
});
const ViewUserProfile = defineComponent({
  setup() {
    return {
      State_App: _State_App,
      Cpt_avatarUrl
    };
  },
  data(vm) {
    return {
      configsForm: defFormConfigs([{
        value: "",
        label: $t$1("\u7528\u6237ID").label,
        prop: "uid",
        isReadonly: true
      }, {
        value: "",
        label: $t$1("\u7528\u6237\u540D").label,
        prop: "username"
      }, {
        value: "",
        label: $t$1("\u90AE\u7BB1\u5730\u5740").label,
        prop: "email",
        isReadonly: true
      }, {
        value: "",
        label: $t$1("\u521B\u5EFA\u65F6\u95F4").label,
        prop: "add_time",
        isReadonly: true
      }, {
        value: "",
        label: $t$1("\u66F4\u65B0\u65F6\u95F4").label,
        prop: "up_time",
        isReadonly: true
      }])
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      setValueTo(this.configsForm, xU.merge({}, _State_App.user, {
        up_time: xU.dateFormat(_State_App.user.up_time, 1),
        add_time: xU.dateFormat(_State_App.user.add_time, 1)
      }));
    },
    async updatePwd() {
      await UI.dialog.component({
        title: $t$1("\u4FEE\u6539\u5BC6\u7801").label,
        component: DialogUpdatePwd
      });
    }
  },
  computed: {
    styleForm() {
      return {
        width: "520px"
      };
    },
    styleFormLabel() {
      return {
        "text-align": "left",
        "min-width": "120px",
        padding: "0 14px"
      };
    }
  },
  render({
    Cpt_avatarUrl: Cpt_avatarUrl2,
    configsForm,
    styleForm,
    styleFormLabel,
    updatePwd
  }) {
    return createVNode(resolveComponent("aCard"), null, {
      default: () => [createVNode("h1", null, [createTextVNode("\u4E2A\u4EBA\u8BBE\u7F6E")]), createVNode(resolveComponent("xForm"), {
        "formStyle": styleForm,
        "labelStyle": styleFormLabel
      }, {
        default: () => [createVNode(resolveComponent("aAvatar"), {
          "size": 64,
          "src": Cpt_avatarUrl2
        }, null), createVNode(resolveComponent("xGap"), {
          "t": "10"
        }, null), createVNode(resolveComponent("xItem"), {
          "configs": configsForm.uid
        }, null), createVNode(resolveComponent("xGap"), {
          "t": "10"
        }, null), createVNode(resolveComponent("xItem"), {
          "configs": configsForm.add_time
        }, null), createVNode(resolveComponent("xGap"), {
          "t": "10"
        }, null), createVNode(resolveComponent("xItem"), {
          "configs": configsForm.up_time
        }, null), createVNode(resolveComponent("xGap"), {
          "t": "10"
        }, null), createVNode(resolveComponent("xItem"), {
          "configs": configsForm.email
        }, null), createVNode(resolveComponent("xGap"), {
          "t": "10"
        }, null), createVNode(resolveComponent("xItem"), {
          "configs": configsForm.username
        }, null), createVNode(resolveComponent("xGap"), {
          "t": "10"
        }, null), createVNode(resolveComponent("aButton"), {
          "onClick": updatePwd
        }, {
          default: () => [createTextVNode("\u4FEE\u6539\u5BC6\u7801")]
        }), createVNode(resolveComponent("xGap"), {
          "t": "10"
        }, null)]
      })]
    });
  }
});
export {
  ViewUserProfile
};
