import { d as defineComponent, s as stateApp, ag as defFormConfigs, x as xI, i as itemsInvalid, ah as stateInterface, e as xU, b as API, f as createVNode, r as resolveComponent, F as Fragment, g as isVNode, aa as EVENT_TYPE, ai as cptAvatarUrl, aj as getAvatarSrcByid, c as cptRouter, t as createTextVNode } from "./index.js";
import { F as FormRules, n as newRule, s as setValueTo, p as pickValueFrom } from "./common.FormRules.js";
function _isSlot$1(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const DialogUpdatePwd = defineComponent({
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
        rules: [FormRules.required(xI("\u8BF7\u518D\u6B21\u8F93\u5165\u5BC6\u7801!")), newRule({
          validator: async (confirm) => {
            if (vm.dataXItem.password.value !== confirm) {
              return xI("\u4E24\u6B21\u8F93\u5165\u7684\u5BC6\u7801\u4E0D\u4E00\u81F4!");
            }
            return "";
          },
          trigger: [EVENT_TYPE.update]
        })]
      }])
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
      "class": "x-dialog-boddy-wrapper "
    }, [createVNode(resolveComponent("xGap"), {
      "t": true
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
      "b": "38"
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
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
const ViewUserProfile = defineComponent({
  props: ["id"],
  setup() {
    return {
      stateApp,
      cptAvatarUrl
    };
  },
  data(vm) {
    return {
      userInfo: {},
      configsForm: defFormConfigs([{
        value: "",
        label: xI("\u7528\u6237ID"),
        prop: "uid",
        isReadonly: true
      }, {
        value: "",
        label: xI("\u7528\u6237\u540D"),
        prop: "username",
        rules: [FormRules.required()],
        isReadonly: () => !vm.cpt_isAuth
      }, {
        value: "",
        label: xI("\u90AE\u7BB1\u5730\u5740"),
        prop: "email",
        isReadonly: true
      }, {
        value: "",
        label: xI("\u89D2\u8272"),
        prop: "role",
        isReadonly: true
      }, {
        value: "",
        label: xI("\u767B\u9646\u65B9\u5F0F"),
        prop: "type",
        isReadonly: true
      }, {
        value: "",
        label: xI("\u521B\u5EFA\u65F6\u95F4"),
        prop: "add_time",
        isReadonly: true
      }, {
        value: "",
        label: xI("\u66F4\u65B0\u65F6\u95F4"),
        prop: "up_time",
        isReadonly: true
      }])
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      const {
        data: userInfo
      } = await API.user.getUserById(this.cpt_userId);
      this.userInfo = userInfo;
      setValueTo(this.configsForm, xU.merge({}, this.userInfo, {
        up_time: xU.dateFormat(this.userInfo.up_time, 1),
        add_time: xU.dateFormat(this.userInfo.add_time, 1)
      }));
    },
    async updatePwd() {
      xU.dialog({
        title: xI("\u4FEE\u6539\u5BC6\u7801"),
        component: DialogUpdatePwd
      });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      if (!isJPG && !isPNG) {
        xU.message.error("\u56FE\u7247\u7684\u683C\u5F0F\u53EA\u80FD\u4E3A jpg\u3001png\uFF01");
      }
      const isLt2M = file.size / 1024 / 1024 < 0.2;
      if (!isLt2M) {
        xU.message.error("\u56FE\u7247\u5FC5\u987B\u5C0F\u4E8E 200kb!");
      }
      return (isPNG || isJPG) && isLt2M;
    },
    handleChange(info) {
      if (info.status === "ready") {
        getBase64(info.raw, (basecode) => {
          this.userInfo.imageUrl = basecode;
          this.uploadAvatar(basecode);
        });
      }
    },
    async uploadAvatar(basecode) {
      try {
        const res = await API.user.uploadAvatar({
          basecode
        });
      } catch (error) {
        this.userInfo.imageUrl = "";
      }
    }
  },
  computed: {
    cpt_avatarUrl() {
      var _a;
      return ((_a = this.userInfo) == null ? void 0 : _a.imageUrl) || getAvatarSrcByid(this.cpt_userId);
    },
    cpt_isAuth() {
      return xU.isSame(stateApp.user._id, this.cpt_userId);
    },
    cpt_userId() {
      return this.id || cptRouter.value.query.user_id || stateApp.user._id;
    },
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
    cptAvatarUrl: cptAvatarUrl2,
    configsForm,
    styleForm,
    styleFormLabel,
    updatePwd,
    handleChange,
    beforeAvatarUpload
  }) {
    let _slot;
    return createVNode("div", {
      "class": "flex middle center"
    }, [createVNode(resolveComponent("elCard"), {
      "title": "\u4E2A\u4EBA\u8BBE\u7F6E"
    }, {
      default: () => [createVNode(resolveComponent("xForm"), {
        "formStyle": styleForm,
        "labelStyle": styleFormLabel
      }, {
        default: () => [createVNode("div", {
          "id": "xItem_391",
          "class": " x-item-wrapper flex middle "
        }, [createVNode("div", {
          "class": "x-form-item-label"
        }, [createVNode("label", null, [createTextVNode("\u7528\u6237\u5934\u50CF")])]), createVNode("div", {
          "class": "x-form-item-control"
        }, [createVNode(resolveComponent("elUpload"), {
          "class": "avatar-uploader",
          "show-file-list": false,
          "onChange": handleChange,
          "beforeUpload": beforeAvatarUpload
        }, _isSlot(_slot = (() => {
          if (this.cpt_avatarUrl) {
            return createVNode(resolveComponent("elAvatar"), {
              "size": 64,
              "src": this.cpt_avatarUrl
            }, null);
          } else {
            return createVNode(resolveComponent("el-icon"), {
              "class": "avatar-uploader-icon"
            }, {
              default: () => [createVNode(resolveComponent("xIcon"), {
                "icon": "add"
              }, null)]
            });
          }
        })()) ? _slot : {
          default: () => [_slot]
        })])]), createVNode(resolveComponent("xGap"), {
          "t": true
        }, null), createVNode(resolveComponent("xItem"), {
          "configs": configsForm.uid
        }, null), createVNode(resolveComponent("xGap"), {
          "t": true
        }, null), createVNode("div", {
          "class": "flex middle"
        }, [createVNode(resolveComponent("xItem"), {
          "configs": configsForm.username,
          "class": "flex1"
        }, null), this.cpt_isAuth && createVNode(resolveComponent("xButton"), {
          "onClick": updatePwd,
          "class": "ml",
          "type": "primary"
        }, {
          default: () => [createTextVNode("\u4FEE\u6539\u5BC6\u7801")]
        })]), createVNode(resolveComponent("xGap"), {
          "t": true
        }, null), createVNode(resolveComponent("xItem"), {
          "configs": configsForm.email
        }, null), createVNode(resolveComponent("xGap"), {
          "t": true
        }, null), createVNode(resolveComponent("xItem"), {
          "configs": configsForm.role
        }, null), createVNode(resolveComponent("xGap"), {
          "t": true
        }, null), createVNode(resolveComponent("xItem"), {
          "configs": configsForm.type
        }, null), createVNode(resolveComponent("xGap"), {
          "t": true
        }, null), createVNode(resolveComponent("xItem"), {
          "configs": configsForm.add_time
        }, null), createVNode(resolveComponent("xGap"), {
          "t": true
        }, null), createVNode(resolveComponent("xItem"), {
          "configs": configsForm.up_time
        }, null), createVNode(resolveComponent("xGap"), {
          "t": true
        }, null), this.cpt_isAuth && createVNode(resolveComponent("xButton"), {
          "type": "primary"
        }, {
          default: () => [createTextVNode("\u66F4\u65B0")]
        }), createVNode(resolveComponent("xGap"), {
          "t": true
        }, null)]
      })]
    })]);
  }
});
export {
  ViewUserProfile
};
