import { d as defineComponent, g as _State_App, ak as State_ProjectInterface, x as xU, e as createVNode, r as resolveComponent, k as Fragment, a as defItem, F as FormRules, ae as VNodeCollection, N as ITEM_OPTIONS, h as createTextVNode, L as markRaw, ap as _$handlePath, s as setValueTo, p as pickValueFrom, $ as $t$1, b as API, a4 as HTTP_METHOD, v as validateForm, A as AllWasWell, C as Cpt_url, j as Methods_ProjectInterface, U as UI, m as isVNode, Y as defDataGridOption, P as defCol, aq as copyToClipboard, B as $, ar as makeAhref, Q as ITEM_OPTIONS_VDOM, as as InfoCard, Z as MonacoEditor } from "./index.js";
import { I as InpterfacePathParams, E as EnvSelectRender, R as RequestArgsRender, b as ResponseRender, M as MarkdownRender, T as TagSelectRender } from "./DialogModifyInterface.Helper.js";
import { c as colParamsName, b as colRemark, d as colRequired, e as colValue, f as colExample, g as colType, h as asyncGetTuiEditor, T as TuiEditor, J as JsonSchemaMonaco } from "./TuiEditor.js";
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
      State_ProjectInterface
    };
  },
  computed: {
    vDomXItemPathparams() {
      if (xU.isArrayFill(this.dataXItem.pathParams.value)) {
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
        cancel: {
          preset: "cancel",
          onClick: async () => {
            this.propDialogOptions.closeDialog();
          }
        },
        save: {
          preset: "save",
          onClick: this.submit
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
              this.value = ((_a = xU.first(this.options)) == null ? void 0 : _a.value) || "";
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
            vm.dataXItem.requestArgs.deepWatch.apiMethod = val;
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
          onAfterValueEmit: xU.debounce(function(newPatnValue) {
            newPatnValue = _$handlePath(newPatnValue);
            let queue = [];
            setValueTo(vm.dataXItem, {
              path: newPatnValue
            });
            const {
              pathParams
            } = pickValueFrom(vm.dataXItem);
            let insertParams = (name) => {
              let findExist = xU.find(pathParams, {
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
              pathParams: xU.map(xU.uniqBy(queue, "name"), (newValue) => {
                return xU.merge({
                  name: "",
                  desc: "",
                  example: ""
                }, newValue);
              })
            });
          }, 800)
        }),
        ...defItem({
          prop: "pathParams",
          label: vm.$t("\u63A5\u53E3\u8DEF\u5F84\u53C2\u6570").label,
          value: [],
          itemType: InpterfacePathParams
        }),
        ...defItem({
          prop: "tag",
          label: "Tag",
          value: [],
          options: [],
          async setOptions(tagArray) {
            this._$updateUI({
              options: tagArray
            });
          },
          itemType: TagSelectRender
        }),
        ...defItem({
          prop: "status",
          label: $t$1("\u72B6\u6001").label,
          value: ITEM_OPTIONS.interfaceStatus[0].value,
          options: ITEM_OPTIONS.interfaceStatus,
          itemType: "Select"
        }),
        ...defItem({
          prop: "isProxy",
          value: false,
          label: vm.$t("\u662F\u5426\u5F00\u542F\u8F6C\u53D1").label,
          options: ITEM_OPTIONS.trueOrFalse,
          itemType: "Switch"
        }),
        ...defItem({
          isShow: () => vm.dataXItem.isProxy.value,
          prop: "witchEnv",
          label: vm.$t("\u8F6C\u53D1\u73AF\u5883").label,
          value: "",
          options: [],
          setOptions(envArray) {
            this._$updateUI({
              options: xU.map(envArray, (i) => ({
                value: i._id,
                label: `${i.name} ${i.domain}`
              }))
            });
          },
          itemType: EnvSelectRender
        }),
        ...defItem({
          prop: "requestArgs",
          label: vm.$t("\u8BF7\u6C42\u53C2\u6570\u8BBE\u7F6E").label,
          value: [],
          activeKey: "1",
          deepWatch: {
            apiMethod: ""
          },
          itemType: RequestArgsRender
        }),
        ...defItem({
          prop: "responseArgs",
          label: vm.$t("\u54CD\u5E94\u53C2\u6570\u8BBE\u7F6E").label,
          value: {},
          activeKey: "1",
          apiMethod: "",
          itemType: ResponseRender
        }),
        ...defItem({
          prop: "remark",
          label: vm.$t("\u5907\u6CE8").label,
          value: {
            html: "",
            md: ""
          },
          itemType: MarkdownRender
        }),
        ...defItem({
          prop: "noticed",
          label: vm.$t("\u6D88\u606F\u901A\u77E5").label,
          labelVNodeRender: VNodeCollection.labelTips(createVNode("div", null, [vm.$t("\u5F00\u542F\u6D88\u606F\u901A\u77E5\uFF0C\u53EF\u5728 \u9879\u76EE\u8BBE\u7F6E \u91CC\u4FEE\u6539").label])),
          checkedChildren: vm.$t("\u5F00").label,
          unCheckedChildren: vm.$t("\u5173").label,
          value: true,
          itemType: "Switch"
        }),
        ...defItem({
          prop: "api_opened",
          label: vm.$t("\u5F00\u653E\u63A5\u53E3").label,
          labelVNodeRender: VNodeCollection.labelTips(createVNode("div", null, [vm.$t("\u7528\u6237\u53EF\u4EE5\u5728 \u6570\u636E\u5BFC\u51FA \u65F6\u9009\u62E9\u53EA\u5BFC\u51FA\u516C\u5F00\u63A5\u53E3").label])),
          checkedChildren: vm.$t("\u5F00").label,
          unCheckedChildren: vm.$t("\u5173").label,
          value: false,
          itemType: "Switch"
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
        this.dataXItem.catid.setOptions(xU.map(category, (i) => ({
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
    async setFormDataValues() {
      const {
        data
      } = await API.project.fetchInterfaceDetail(this.propDialogOptions.interfaceId);
      this.detailInfo = this.initState(data);
      xU.doNothing(JSON.stringify(this.detailInfo, null, 2));
      const {
        api_opened,
        catid,
        title,
        path,
        req_params,
        tag,
        status,
        isProxy,
        witchEnv,
        method,
        req_headers,
        req_body_type,
        req_query,
        req_body_form,
        req_body_other,
        req_body_is_json_schema,
        res_body,
        res_body_type,
        res_body_mock,
        res_body_is_json_schema,
        desc,
        markdown
      } = this.detailInfo;
      xU(this.detailInfo);
      setValueTo(this.dataXItem, {
        witchEnv,
        catid,
        title,
        apiMethod: method,
        path,
        remark: {
          md: markdown,
          html: desc
        },
        pathParams: req_params,
        tag: String(tag).split(",").filter(xU.isInput),
        status,
        isProxy,
        requestArgs: {
          req_headers,
          req_body_type,
          req_query,
          req_body_form,
          req_body_other,
          req_body_is_json_schema
        },
        responseArgs: {
          res_body_is_json_schema,
          res_body,
          res_body_type,
          res_body_mock
        },
        api_opened,
        noticed: this.State_App.currProject.switch_notice
      });
    },
    initState(detailInfo) {
      if (detailInfo.req_body_form) {
        detailInfo.req_body_form = detailInfo.req_body_form.map((item) => {
          item.type = item.type === "text" ? "text" : "file";
          return item;
        });
      }
      return detailInfo;
    },
    getFormData() {
      const {
        catid,
        title,
        apiMethod,
        path,
        tag,
        status,
        isProxy,
        witchEnv,
        remark,
        requestArgs,
        responseArgs,
        pathParams,
        api_opened,
        noticed
      } = pickValueFrom(this.dataXItem);
      const {
        req_body_type,
        req_body_other,
        req_query,
        req_headers,
        req_body_form
      } = requestArgs;
      const {
        res_body_type,
        res_body
      } = responseArgs;
      const {
        html: desc,
        md: markdown
      } = remark;
      const _formData = {
        id: this.detailInfo._id,
        catid,
        title,
        method: apiMethod,
        path,
        isProxy,
        witchEnv,
        req_params: pathParams,
        tag,
        status,
        req_body_type,
        req_body_other,
        req_query,
        req_headers,
        req_body_form,
        req_body_is_json_schema: true,
        res_body_type,
        res_body,
        res_body_is_json_schema: true,
        desc,
        markdown,
        api_opened,
        switch_notice: noticed
      };
      let isFile = false;
      let haveContentType = false;
      if (_formData.req_body_type === "form") {
        xU.each(_formData.req_body_form, (item) => {
          delete item._id;
          if (item.type === "file") {
            isFile = true;
          }
        });
        xU.each(_formData.req_headers, (item) => {
          delete item._id;
          if (item.name === "Content-Type") {
            item.value = isFile ? "multipart/form-data" : "application/x-www-form-urlencoded";
            haveContentType = true;
          }
        });
        if (haveContentType === false) {
          _formData.req_headers.unshift({
            name: "Content-Type",
            value: isFile ? "multipart/form-data" : "application/x-www-form-urlencoded"
          });
        }
      } else if (_formData.req_body_type === "json") {
        _formData.req_headers ? xU.each(_formData.req_headers, (item) => {
          delete item._id;
          if (item.name === "Content-Type") {
            item.value = "application/json";
            haveContentType = true;
          }
        }) : [];
        if (haveContentType === false) {
          _formData.req_headers = _formData.req_headers || [];
          _formData.req_headers.unshift({
            name: "Content-Type",
            value: "application/json"
          });
        }
      }
      const itemFill = (item) => item.name !== "";
      _formData.req_headers = _formData.req_headers ? _formData.req_headers.filter(itemFill) : [];
      _formData.req_body_form = _formData.req_body_form ? _formData.req_body_form.filter(itemFill) : [];
      _formData.req_params = _formData.req_params ? _formData.req_params.filter(itemFill) : [];
      _formData.req_query = xU.filter(_formData.req_query, itemFill).map((i) => {
        delete i._id;
        return i;
      });
      if (HTTP_METHOD[_formData.method].request_body !== true) {
        _formData.req_body_form = [];
      }
      if (_formData.req_body_is_json_schema && _formData.req_body_other && _formData.req_body_type === "json") {
        if (!_formData.req_body_other) {
          throw new Error(this.$t("\u8BF7\u6C42\u53C2\u6570 json-schema \u683C\u5F0F\u6709\u8BEF").label);
        }
      }
      if (_formData.res_body_is_json_schema && _formData.res_body && _formData.res_body_type === "json") {
        if (!_formData.res_body) {
          throw new Error(this.$t("\u8FD4\u56DE\u6570\u636E json-schema \u683C\u5F0F\u6709\u8BEF").label);
        }
      }
      return _formData;
    },
    async submit() {
      const validateResults = await validateForm(this.dataXItem);
      if (AllWasWell(validateResults)) {
        try {
          const formData = this.getFormData();
          const {
            data
          } = await API.project.updateInterface(formData);
          if (data) {
            await (async () => {
              Cpt_url.value.query.category_id = formData.catid;
              await Methods_ProjectInterface.updateInterfaceMenuList();
              Methods_ProjectInterface.setExpand();
              if (this.propDialogOptions.updateInterfaceInfo) {
                await this.propDialogOptions.updateInterfaceInfo();
              }
              setTimeout(() => {
                this.propDialogOptions.closeDialog();
              }, 1e3);
            })();
            UI.message.success(this.$t("\u4FEE\u6539\u6210\u529F").label);
          }
        } catch (error) {
          UI.message.error(this.$t("\u4FEE\u6539\u5931\u8D25").label);
        }
      }
    }
  },
  render(vm) {
    return createVNode(Fragment, null, [createVNode("div", {
      "class": "dialog-modify-interface x-dialog-boddy-wrapper flex1 flex horizon height100 width100 overflow-auto"
    }, [createVNode("div", {
      "class": "flex1"
    }, [createVNode(resolveComponent("xForm"), {
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
        "configs": this.dataXItem.status
      }, null), createVNode(resolveComponent("xGap"), {
        "t": "10"
      }, null), createVNode("div", {
        "class": "flex"
      }, [createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.isProxy
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.witchEnv,
        "class": "flex1"
      }, null)]), createVNode(resolveComponent("xGap"), {
        "t": "10"
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.requestArgs
      }, null), createVNode(resolveComponent("xGap"), {
        "t": "10"
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.responseArgs
      }, null), createVNode(resolveComponent("xLogObject"), {
        "obj": this.dataXItem.remark,
        "hide": true
      }, null), createVNode(resolveComponent("xGap"), {
        "t": "10"
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.remark
      }, null), createVNode(resolveComponent("xGap"), {
        "t": "10"
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.api_opened
      }, null)]
    }), createVNode(resolveComponent("xGap"), {
      "t": "10"
    }, null)])]), createVNode(resolveComponent("xDialogFooter"), null, {
      default: () => [createVNode(resolveComponent("xGap"), {
        "f": "1"
      }, null), createVNode("div", {
        "style": "min-width:120px;"
      }, [createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.noticed
      }, null)]), createVNode(resolveComponent("xGap"), {
        "r": "10"
      }, null), createVNode(resolveComponent("xButton"), {
        "configs": this.configsDialogFooter.cancel
      }, null), createVNode(resolveComponent("xGap"), {
        "r": "10"
      }, null), createVNode(resolveComponent("xButton"), {
        "configs": this.configsDialogFooter.save
      }, null)]
    })]);
  }
});
function _isSlot$1(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const DialogPostman = defineComponent({
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
      ...defItem({
        value: "",
        itemType: "Select",
        prop: "apiMethod",
        options: ITEM_OPTIONS.httpMethod,
        rules: [FormRules.required()],
        once() {
          this.value = xU.first(this.options).value;
        },
        style: {
          width: "120px"
        }
      }),
      dataXItem: {
        ...defItem({
          value: "",
          itemType: "Select",
          prop: "catid",
          label: vm.$t("\u63A5\u53E3\u5206\u7C7B").label,
          placeholder: "\u5206\u7C7B\u540D\u79F0",
          options: [],
          rules: [FormRules.required()],
          once() {
            this.options = State_ProjectInterface.allCategory;
            if (vm.propDialogOptions.categoryId) {
              this.value = vm.propDialogOptions.categoryId;
            } else {
              this.value = xU.first(this.options).value;
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
          value: "/",
          prop: "path",
          label: vm.$t("\u63A5\u53E3\u8DEF\u5F84").label,
          placeholder: "/path",
          rules: [FormRules.required(), FormRules.apiPath()],
          once() {
            const vDomApiMethodsSelector = createVNode(resolveComponent("xItem"), {
              "configs": vm.apiMethod
            }, null);
            this.slots = markRaw({
              addonBefore: () => vDomApiMethodsSelector
            });
          }
        })
      }
    };
  },
  mounted() {
    this.propDialogOptions.vm = this;
  },
  methods: {
    async onOk() {
      const validateResults = await validateForm(this.dataXItem);
      if (AllWasWell(validateResults)) {
        const {
          catid,
          title,
          path
        } = pickValueFrom(this.dataXItem);
        const {
          projectId,
          closeDialog
        } = this.propDialogOptions;
        try {
          const {
            data
          } = await API.project.addInterface({
            project_id: projectId,
            catid,
            title,
            path,
            method: this.apiMethod.value
          });
          if (data) {
            Methods_ProjectInterface.updateInterfaceMenuList();
            Cpt_url.value.go("/project/interface/detail", {
              ...Cpt_url.value.query,
              interface_id: data._id
            });
            UI.message.success("\u6DFB\u52A0\u63A5\u53E3\u6210\u529F");
            closeDialog();
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
      "class": "x-dialog-boddy-wrapper flex1 height100"
    }, [createVNode(resolveComponent("xGap"), {
      "t": "10"
    }, null), createVNode(resolveComponent("aAlert"), {
      "message": this.$t("\u6CE8\uFF1A \u8BE6\u7EC6\u7684\u63A5\u53E3\u6570\u636E\u53EF\u4EE5\u5728\u7F16\u8F91\u9875\u9762\u4E2D\u6DFB\u52A0").label,
      "type": "info",
      "closable": true,
      "className": "width100"
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
      "t": "10"
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
const InterfaceDetail = defineComponent({
  setup() {
    return {
      State_Project: State_ProjectInterface,
      Cpt_url
    };
  },
  data(vm) {
    return {
      State_App: _State_App,
      detailInfo: false,
      configs_table_path_params: defDataGridOption({
        isHidePagination: true,
        dataSource: [],
        columns: {
          ...colParamsName(),
          ...defCol({
            prop: "example",
            label: vm.$t("\u793A\u4F8B").label,
            width: "300"
          }),
          ...colRemark()
        },
        queryTableList: void 0
      }),
      configs_table_headers: defDataGridOption({
        isHidePagination: true,
        dataSource: [],
        columns: {
          ...colRequired(),
          ...colParamsName(),
          ...colValue,
          ...colExample,
          ...colRemark()
        },
        queryTableList: void 0
      }),
      configs_table_query: defDataGridOption({
        isHidePagination: true,
        dataSource: [],
        columns: {
          ...colRequired(),
          ...colParamsName(),
          ...colExample,
          ...colRemark()
        },
        queryTableList: void 0
      }),
      configs_table_body_form: defDataGridOption({
        isHidePagination: true,
        dataSource: [],
        columns: {
          ...colRequired(),
          ...colParamsName(),
          ...colType,
          ...colExample,
          ...colRemark()
        },
        queryTableList: void 0
      })
    };
  },
  watch: {
    "Cpt_url.query.interface_id": {
      immediate: true,
      async handler(interface_id) {
        if (!interface_id) {
          return;
        }
        this.updateInterfaceInfo();
      }
    }
  },
  async mounted() {
    await asyncGetTuiEditor();
  },
  methods: {
    async runPostman() {
      UI.dialog.component({
        title: this.$t("\u4FEE\u6539\u63A5\u53E3").label,
        component: DialogPostman,
        area: ["1024px", "624px"],
        maxmin: true
      });
    },
    async updateInterfaceInfo() {
      const {
        data
      } = await API.project.fetchInterfaceDetail(this.Cpt_url.query.interface_id);
      this.detailInfo = data;
      xU(data);
      this.configs_table_headers.dataSource = xU.orderBy(data.req_headers, ["required"], ["desc"]);
      this.configs_table_path_params.dataSource = xU.orderBy(data.req_params, ["required"], ["desc"]);
      this.configs_table_query.dataSource = xU.orderBy(data.req_query, ["required", "type"], ["desc", "asc"]);
      this.configs_table_body_form.dataSource = xU.orderBy(data.req_body_form, ["required", "type"], ["desc", "asc"]);
    },
    copyCode() {
      const codeString = this.$refs.ajaxCode.innerText;
      copyToClipboard(codeString);
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
      await xU.ensureValueDone(() => this.detailInfo);
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
        try {
          await UI.dialog.confirm({
            content: createVNode("div", {
              "class": "flex middle"
            }, [createVNode("a", {
              "href": makeAhref(`/user/profile/${curdata.uid}`)
            }, [curdata.username]), createVNode("div", null, [createTextVNode("\u6B63\u5728\u7F16\u8F91\u8BE5\u63A5\u53E3\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5...")])])
          });
        } catch (error) {
        } finally {
          this.closeWS();
        }
        return;
      }
      if (message) {
        UI.message.warn(message);
      }
      UI.dialog.component({
        title: this.$t("\u4FEE\u6539\u63A5\u53E3").label + `-${item.title}`,
        component: DialogModifyInterface,
        area: ["1024px", "624px"],
        interfaceId: item._id,
        maxmin: true,
        updateInterfaceInfo: vm.updateInterfaceInfo,
        onBeforeClose: vm.closeWS()
      });
    },
    async checkConflict(item) {
      const vm = this;
      const {
        hostname,
        port,
        protocol
      } = location;
      let wsProtocol = protocol === "https:" ? "wss" : "ws";
      return new Promise((resolve, reject) => {
        try {
          const wsURL = new URL(_State_App.baseURL);
          const sockei = new WebSocket(`${wsProtocol}://${wsURL.host}/ws/api/interface/solve_conflict?id=${item._id}`);
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
        let env = xU.find(envArray, {
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
    ajaxCode() {
      const {
        tag,
        up_time,
        title,
        uid,
        username,
        path,
        method
      } = this.detailInfo;
      const projectId = this.State_App.currProject._id;
      const interfaceId = this.Cpt_url.query.interface_id;
      return `\`\`\`js
/**
*  ${title}
*  ${window.location.href}
*  http://10.143.133.216:3001/project/${projectId}/interface/api/${interfaceId}
*/
async ${xU.camelCase(path)}({params,data}) {
	return await request({
		method: "${method}",
		url: \`${path}\`,
		params:params||{},
		data:data||{}
	});
}
\`\`\`
`;
    },
    vDomCopyAjaxCodePanel() {
      return createVNode("div", {
        "style": "position:relative;overflow:auto;height:100%;",
        "ref": "ajaxCode"
      }, [createVNode(resolveComponent("Mkit"), {
        "md": this.ajaxCode
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
      const vm = this;
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
          value: (_a = this.detailInfo) == null ? void 0 : _a.title
        }, {
          label: "\u7EF4\u62A4\u4EBA",
          value: createVNode(Fragment, null, [createVNode(resolveComponent("aAvatar"), {
            "src": "/api/user/avatar?uid=" + uid,
            "class": "mr8",
            "style": "height:24px;width:24px;"
          }, null), createVNode("a", null, [username])])
        }]
      }, {
        colArray: [{
          label: "\u72B6\u6001",
          value: ITEM_OPTIONS_VDOM.status(status)
        }, {
          label: "\u66F4\u65B0\u65F6\u95F4",
          value: xU.dateFormat(up_time)
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
          value: (_b = xU.find(ITEM_OPTIONS.trueOrFalse, {
            value: isProxy
          })) == null ? void 0 : _b.label
        }, {
          label: "\u8F6C\u53D1\u73AF\u5883",
          col: 2,
          value: this.labelProxyEnv,
          isHide: !isProxy
        }]
      }, {
        colArray: [{
          label: createVNode("div", {
            "class": "flex middle"
          }, [createVNode(resolveComponent("aButton"), {
            "type": "primary",
            "onClick": vm.runPostman
          }, {
            default: () => [vm.$t("\u8FD0\u884C").label]
          }), createVNode("span", {
            "class": "flex1"
          }, [$t$1("Mock\u5730\u5740").label])]),
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
        style: `height:400px;`,
        colArray: [{
          label: createVNode("div", {
            "class": "flex middle"
          }, [createVNode(resolveComponent("aButton"), {
            "onClick": () => vm.copyCode()
          }, {
            default: () => [$t$1("\u590D\u5236\u4EE3\u7801").label]
          }), createVNode("span", {
            "class": "flex1"
          }, [$t$1("ajax\u4EE3\u7801").label])]),
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
      return {
        rowArray,
        colLabelWidth: "220px"
      };
    }
  },
  render(vm) {
    let _slot;
    if (!vm.detailInfo || !vm.State_App.currProject) {
      return createVNode(resolveComponent("aSpin"), {
        "spinning": true,
        "class": "flex middle center flex1"
      }, null);
    }
    xU(vm.State_App.currGroup, vm.State_App.currProject, vm.detailInfo);
    return createVNode(resolveComponent("xView"), {
      "style": "overflow:hidden;"
    }, {
      default: () => [createVNode("div", {
        "class": "flex"
      }, [createVNode(resolveComponent("xButton"), {
        "onClick": vm.showModifyInterfaceDialog
      }, {
        default: () => [createTextVNode("\u4FEE\u6539")]
      }), createVNode(resolveComponent("xGap"), {
        "f": "1"
      }, null)]), createVNode("div", {
        "class": "flex1 overflow-auto mt10"
      }, [createVNode(InfoCard, {
        "title": createVNode("span", null, [createTextVNode("\u57FA\u672C\u4FE1\u606F")]),
        "info": vm.descriptions
      }, null), createVNode(resolveComponent("xGap"), {
        "t": "20"
      }, null), vm.detailInfo.desc && createVNode(InfoCard, {
        "title": vm.$t("\u5907\u6CE8").label
      }, {
        default: () => [createVNode(TuiEditor, {
          "modelValue": {
            html: vm.detailInfo.desc
          },
          "readonly": true
        }, null)]
      }), createVNode(resolveComponent("xGap"), {
        "t": "20"
      }, null), createVNode(InfoCard, {
        "title": "\u8BF7\u6C42\u53C2\u6570"
      }, {
        default: () => [vm.configs_table_path_params.dataSource.length > 0 && createVNode(resolveComponent("aCard"), {
          "title": vm.$t("\u8DEF\u5F84\u53C2\u6570").label
        }, {
          default: () => [createVNode(resolveComponent("xDataGrid"), {
            "configs": vm.configs_table_path_params
          }, null)]
        }), vm.configs_table_headers.dataSource.length > 0 && createVNode(Fragment, null, [createVNode(resolveComponent("xGap"), {
          "t": "10"
        }, null), createVNode(resolveComponent("aCard"), {
          "title": vm.$t("Headers").label
        }, {
          default: () => [createVNode(resolveComponent("xDataGrid"), {
            "configs": vm.configs_table_headers
          }, null)]
        })]), vm.configs_table_query.dataSource.length > 0 && createVNode(Fragment, null, [createVNode(resolveComponent("xGap"), {
          "t": "10"
        }, null), createVNode(resolveComponent("aCard"), {
          "title": vm.$t("Query").label
        }, {
          default: () => [createVNode(resolveComponent("xDataGrid"), {
            "configs": vm.configs_table_query
          }, null)]
        })]), vm.detailInfo.req_body_type == "form" && vm.configs_table_body_form.dataSource.length > 0 && createVNode(Fragment, null, [createVNode(resolveComponent("xGap"), {
          "t": "10"
        }, null), createVNode(resolveComponent("aCard"), {
          "title": vm.$t("Body").label
        }, {
          default: () => [createVNode(resolveComponent("xDataGrid"), {
            "configs": vm.configs_table_body_form
          }, null)]
        })]), vm.detailInfo.req_body_type == "json" && vm.detailInfo.req_body_other && createVNode(Fragment, null, [createVNode(resolveComponent("xGap"), {
          "t": "10"
        }, null), createVNode(resolveComponent("aCard"), {
          "title": vm.$t("Body").label
        }, {
          default: () => [createVNode(JsonSchemaMonaco, {
            "schemaString": vm.detailInfo.req_body_other,
            "onUpdate:schemaString": ($event) => vm.detailInfo.req_body_other = $event,
            "readOnly": true
          }, null)]
        })]), vm.detailInfo.req_body_type == "raw" && vm.detailInfo.req_body_other && createVNode(Fragment, null, [createVNode(resolveComponent("xGap"), {
          "t": "10"
        }, null), createVNode(resolveComponent("aCard"), {
          "title": vm.$t("Body").label
        }, {
          default: () => [createVNode("div", {
            "style": "height:300px;width:90%"
          }, [createVNode(MonacoEditor, {
            "language": "json",
            "code": vm.detailInfo.req_body_other,
            "readOnly": true
          }, null)])]
        })])]
      }), vm.detailInfo.res_body && createVNode(Fragment, null, [createVNode(resolveComponent("xGap"), {
        "t": "20"
      }, null), createVNode(InfoCard, {
        "title": "\u8FD4\u56DE\u4FE1\u606F"
      }, _isSlot(_slot = (() => {
        if (vm.detailInfo.res_body_type === "json") {
          return createVNode(JsonSchemaMonaco, {
            "schemaString": vm.detailInfo.res_body,
            "onUpdate:schemaString": ($event) => vm.detailInfo.res_body = $event,
            "readOnly": true
          }, null);
        }
        return createVNode(MonacoEditor, {
          "language": "json",
          "code": vm.detailInfo.res_body,
          "readOnly": true
        }, null);
      })()) ? _slot : {
        default: () => [_slot]
      })])])]
    });
  }
});
export {
  InterfaceDetail
};
