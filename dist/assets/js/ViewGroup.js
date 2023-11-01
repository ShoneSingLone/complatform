import { d as defineComponent, s as stateApp, a as cptRouter, f as xU, h as createVNode, r as resolveComponent, F as Fragment, z as ADMIN, x as xI, v as createTextVNode, b as defItem, e as API, Z as components, R as defineComponentProps, S as usePrivateItemValue, j as isVNode, U as itemBaseProps, O as OWNER, w as withDirectives, l as resolveDirective, i as itemsInvalid, am as ErrMsg, u as PRIVATE, an as index, ao as defPagination, ap as METHOD_COLOR, aq as LOG_TYPE, ar as _$timeAgo, as as jsondiffpatch, H as _export_sfc, I as openBlock, J as createElementBlock, K as withCtx, L as renderList, o as xScope, at as onMounted, au as defColumns, al as getAvatarSrcByid, D as DEV, av as TAB_KEY_PROJECT_LIST, aw as TAB_KEY_MEMBER_LIST, y as PUBLIC, ax as TAB_KEY_GROUP_LOG, ay as TAB_KEY_GROUP_WIKI, G as GROUP, M as aHashLink, az as OPEN_BLANK } from "./index.js";
import { F as FormRules, p as pickValueFrom } from "./common.FormRules.js";
import { V as VNodeCollection } from "./VNodeRender.js";
import { P as ProjectCard, D as DialogAddProject, l as lib } from "./TuiEditor.js";
import { ViewUserProfile } from "./ViewUserProfile.js";
import { ViewWiki } from "./ViewWiki.js";
import "./common.options.js";
import "./wiki.js";
const Group = "";
const {
  xItem
} = components;
const DialogEditGroup = defineComponent({
  setup() {
    return {
      stateApp,
      cptRouter
    };
  },
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
  computed: {
    row() {
      var _a;
      return ((_a = this.propOptions) == null ? void 0 : _a.row) || {};
    },
    vDomFormItems() {
      return xU.map(this.formItems, (item, prop) => {
        return createVNode(Fragment, null, [createVNode(resolveComponent("xGap"), {
          "t": true
        }, null), createVNode(xItem, {
          "configs": item
        }, null)]);
      });
    },
    vDomDeleteGroup() {
      const vm = this;
      if (stateApp.user.role === ADMIN) {
        return createVNode(resolveComponent("elAlert"), {
          "type": "warning",
          "show-icon": true,
          "class": "mt20",
          "id": "admin-delete-group-alert"
        }, {
          title() {
            return xI("\u5220\u9664\u5206\u7EC4");
          },
          default() {
            return createVNode("div", {
              "class": "flex vertical"
            }, [createVNode("div", {
              "class": "card-danger-content"
            }, [createVNode("p", null, [createTextVNode("\u5206\u7EC4\u4E00\u65E6\u5220\u9664\uFF0C\u5C06\u65E0\u6CD5\u6062\u590D\u6570\u636E\uFF0C\u8BF7\u614E\u91CD\u64CD\u4F5C\uFF01")]), createVNode("p", null, [createTextVNode("\u53EA\u6709\u8D85\u7EA7\u7BA1\u7406\u5458\u6709\u6743\u9650\u5220\u9664\u5206\u7EC4\u3002")])]), createVNode("div", {
              "class": "flex end"
            }, [createVNode(resolveComponent("xButton"), {
              "configs": {
                onClick: vm.showDeleteGroupConfirm,
                preset: "delete"
              }
            }, null)])]);
          }
        });
      }
      return null;
    }
  },
  render() {
    return createVNode(Fragment, null, [createVNode("div", {
      "class": "padding20 flex1 overflow-auto"
    }, [createVNode(resolveComponent("xForm"), {
      "class": "flex vertical mb20",
      "labelStyle": {
        "min-width": "170px",
        width: "unset"
      }
    }, {
      default: () => [this.vDomFormItems]
    }), this.vDomDeleteGroup]), createVNode(resolveComponent("xDialogFooter"), {
      "configs": {
        onCancel: this.propOptions.$close,
        onOk: () => {
          this.propOptions.onOk({
            formItems: this.formItems,
            $close: this.propOptions.$close
          });
        }
      }
    }, null)]);
  },
  data() {
    const vm = this;
    return {
      formDelete: {
        authText: defItem({
          value: "",
          placeholder: xI("\u8BF7\u8F93\u5165\u5206\u7EC4\u540D\u79F0\u786E\u8BA4\u6B64\u64CD\u4F5C"),
          clearable: true
        })
      },
      formItems: {
        currGroupName: defItem({
          value: "",
          label: xI("\u5206\u7EC4\u540D"),
          placeholder: xI("\u8BF7\u8F93\u5165\u5206\u7EC4\u540D\u79F0"),
          rules: [FormRules.required()]
        }),
        currGroupDesc: defItem({
          isTextarea: true,
          value: "",
          label: xI("\u7B80\u4ECB"),
          placeholder: "\u8BF7\u8F93\u5165\u5206\u7EC4\u63CF\u8FF0",
          rules: [FormRules.required()]
        }),
        custom_field1_enable: defItem({
          itemType: "Switch",
          value: false,
          label: xI("\u542F\u7528\u63A5\u53E3\u81EA\u5B9A\u4E49\u5B57\u6BB5"),
          placeholder: "\u8BF7\u8F93\u5165\u5206\u7EC4\u63CF\u8FF0",
          rules: [FormRules.required()]
        }),
        custom_field1_name: defItem({
          value: "",
          disabled() {
            return !vm.formItems.custom_field1_enable.value;
          },
          label: xI("\u63A5\u53E3\u81EA\u5B9A\u4E49\u5B57\u6BB5"),
          labelVNodeRender: VNodeCollection.labelTips(createVNode("div", null, [xI("\u53EF\u4EE5\u5728\u63A5\u53E3\u4E2D\u6DFB\u52A0 \u989D\u5916\u5B57\u6BB5 \u6570\u636E")])),
          placeholder: xI("\u989D\u5916\u5B57\u6BB5"),
          rules: [FormRules.required()],
          once() {
            vm.$watch("formItems.custom_field1_enable.value", (isUse) => {
              if (isUse) {
                this.rules = [FormRules.required()];
              } else {
                this.rules = [];
              }
            }, {
              immediate: true
            });
          }
        })
      }
    };
  },
  methods: {
    init() {
      const {
        group_desc,
        group_name,
        custom_field1
      } = this.row;
      const {
        enable,
        name
      } = custom_field1 || {};
      this.formItems.currGroupName.value = group_name;
      this.formItems.currGroupDesc.value = group_desc;
      this.formItems.custom_field1_enable.value = enable;
      this.formItems.custom_field1_name.value = name;
    },
    showDeleteGroupConfirm() {
      const vm = this;
      vm.formDelete.authText.value = "";
      xU.confirm({
        title: "\u786E\u8BA4\u5220\u9664 " + vm.stateApp.currGroup.group_name + " \u5206\u7EC4\u5417\uFF1F",
        content: () => createVNode(Fragment, null, [createVNode(resolveComponent("elAlert"), {
          "title": xI("\u8B66\u544A\uFF1A\u6B64\u64CD\u4F5C\u975E\u5E38\u5371\u9669,\u4F1A\u5220\u9664\u8BE5\u5206\u7EC4\u4E0B\u9762\u6240\u6709\u9879\u76EE\u548C\u63A5\u53E3\uFF0C\u5E76\u4E14\u65E0\u6CD5\u6062\u590D!").label,
          "type": "warning"
        }, null), createVNode("div", {
          "style": {
            marginTop: "16px"
          }
        }, [createVNode(xItem, {
          "configs": this.formDelete.authText
        }, null)])]),
        onOk() {
          return new Promise(async (resolve, reject) => {
            var _a;
            const {
              authText
            } = pickValueFrom(vm.formDelete);
            if (authText !== vm.stateApp.currGroup.group_name) {
              xU.message.error("\u5206\u7EC4\u540D\u79F0\u6709\u8BEF");
              return reject();
            } else {
              await vm.deleteGroup();
              (_a = vm.propOptions) == null ? void 0 : _a.close();
              return resolve("");
            }
          });
        },
        iconType: "delete",
        onCancel() {
        }
      });
    },
    async deleteGroup() {
      const {
        currGroup
      } = this.stateApp;
      await API.group.deleteGroup({
        id: currGroup._id
      });
      xU.notification.success("\u5220\u9664\u6210\u529F");
      await stateApp._fetchGroupList();
      const firstGroup = xU.first(this.stateApp.groupList);
      this.cptRouter.go("/group", {
        group_id: firstGroup._id
      });
    }
  },
  mounted() {
    this.init();
    this.propOptions.vm = this;
  }
});
function _isSlot$2(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const ItemUAC = defineComponent({
  props: defineComponentProps(itemBaseProps),
  setup(props) {
    return {
      _itemValue: usePrivateItemValue(props)
    };
  },
  data() {
    this.doSearch = xU.debounce(async (params) => {
      try {
        const {
          data
        } = await API.user.searchUser(params);
        this.optionArray = data;
      } catch (error) {
        console.error(error);
      } finally {
        this.isFetching = false;
      }
    }, 600);
    return {
      optionArray: [],
      isFetching: false
    };
  },
  mounted() {
    this.doSearch();
  },
  methods: {
    onSearch(value) {
      const params = {
        q: value
      };
      this.isFetching = true;
      this.doSearch(params);
    }
  },
  computed: {
    selectOptionsVNode() {
      return xU.map(this.optionArray, ({
        username,
        uid
      }) => {
        return createVNode(resolveComponent("elOption"), {
          "key": uid,
          "value": uid,
          "label": username
        }, _isSlot$2(username) ? username : {
          default: () => [username]
        });
      });
    }
  },
  render() {
    return createVNode(resolveComponent("elSelect"), {
      "multiple": true,
      "filterable": true,
      "remote": true,
      "remote-show-suffix": true,
      "modelValue": this._itemValue,
      "onUpdate:modelValue": ($event) => this._itemValue = $event,
      "remoteMethod": this.onSearch,
      "style": {
        width: "100%"
      },
      "placeholder": "\u8BF7\u8F93\u5165\u7528\u6237\u540D"
    }, {
      default: () => [this.selectOptionsVNode]
    });
  }
});
const DialogAddGroup = defineComponent({
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
        newGroupName: defItem({
          value: "",
          label: xI("\u5206\u7EC4\u540D"),
          placeholder: xI("\u8BF7\u8F93\u5165\u5206\u7EC4\u540D\u79F0"),
          rules: [FormRules.required()]
        }),
        newGroupDesc: defItem({
          isTextarea: true,
          value: "",
          label: xI("\u7B80\u4ECB"),
          placeholder: "\u8BF7\u8F93\u5165\u5206\u7EC4\u63CF\u8FF0",
          rules: [FormRules.required()]
        }),
        owner_uids: defItem({
          itemType: ItemUAC,
          value: [],
          label: xI("\u7EC4\u957F"),
          placeholder: "\u8BF7\u8F93\u5165\u5206\u7EC4\u63CF\u8FF0",
          rules: [FormRules.required()]
        })
      },
      styleLabel: {
        "min-width": "120px",
        width: "unset"
      }
    };
  },
  mounted() {
    this.propOptions.vm = this;
  },
  computed: {
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
      "class": "x-dialog-boddy-wrapper"
    }, [createVNode(resolveComponent("xForm"), {
      "class": "flex vertical",
      "labelStyle": this.styleLabel
    }, {
      default: () => [this.vDomFormItems]
    })]), createVNode(resolveComponent("xDialogFooter"), {
      "configs": {
        onCancel: this.propOptions.$close,
        onOk: () => {
          this.propOptions.onOk({
            formItems: this.formItems,
            $close: this.propOptions.$close
          });
        }
      }
    }, null)]);
  }
});
async function fnUpsertGroupInfo(formData = {}) {
  const {
    id
  } = formData;
  if (id) {
    await API.group.updateGroup(formData);
  } else {
    await API.group.addGroup(formData);
  }
  await stateApp._fetchGroupList();
  await stateApp._setCurrGroup(stateApp.currGroup._id);
  await stateApp._fetchNewsData({
    id: stateApp.currGroup._id,
    type: "group"
  });
}
function fnShowUpsertGroupDialog(row = {}) {
  const isUpdate = !!row._id;
  xU.dialog({
    title: isUpdate ? xI("\u4FEE\u6539\u5206\u7EC4\u4FE1\u606F") : xI("\u6DFB\u52A0\u5206\u7EC4"),
    component: isUpdate ? DialogEditGroup : DialogAddGroup,
    maxmin: true,
    row,
    area: (() => {
      if (isUpdate) {
        if (stateApp.user.role === ADMIN) {
          return ["840px", "648px"];
        } else {
          return ["840px", "448px"];
        }
      } else {
        return ["580px", "460px"];
      }
    })(),
    onOk: async ({
      formItems,
      $close
    }) => {
      let formData = {};
      if (isUpdate) {
        if (!await itemsInvalid()) {
          const {
            currGroupName,
            currGroupDesc,
            custom_field1_enable,
            custom_field1_name
          } = pickValueFrom(formItems);
          formData = {
            ...row,
            group_name: currGroupName,
            group_desc: currGroupDesc,
            custom_field1: {
              enable: custom_field1_enable,
              name: custom_field1_name
            },
            id: row._id
          };
        } else {
          throw new Error("\u672A\u901A\u8FC7\u9A8C\u8BC1");
        }
      } else {
        if (!await itemsInvalid()) {
          const {
            newGroupName,
            newGroupDesc,
            owner_uids
          } = pickValueFrom(formItems);
          formData = {
            group_name: newGroupName,
            group_desc: newGroupDesc,
            owner_uids
          };
        } else {
          throw new Error("\u672A\u901A\u8FC7\u9A8C\u8BC1");
        }
      }
      await fnUpsertGroupInfo(formData);
      $close();
    }
  });
}
const GroupAside = defineComponent({
  props: ["height", "groupList", "currGroup", "fetchGroupList", "setCurrGroup", "setGroupList", "match", "history", "stateApp.user.role", "stateApp.user.roleInGroup", "studyTip", "study", "fetchNewsData", "setCurrGroup"],
  setup() {
    return {
      cptRouter,
      stateApp,
      fnShowUpsertGroupDialog,
      fnUpsertGroupInfo
    };
  },
  data() {
    const vm = this;
    vm.searchGroup = xU.debounce(() => {
      const {
        groupList
      } = stateApp;
      const keywords = vm.configsSearch.value;
      let groupListForShow;
      if (keywords === "") {
        const {
          true: notInGroup,
          undefined: inGroup
        } = xU.groupBy(groupList, "notInGroup");
        const {
          owner,
          member
        } = xU.groupBy(inGroup, "role");
        let {
          true: privateSpace,
          undefined: otherOwner
        } = xU.groupBy(owner, "privateSpace");
        groupListForShow = [{
          ...(privateSpace == null ? void 0 : privateSpace[0]) || {},
          icon: "icon_group_personal"
        }, {
          group_name: "\u5206\u7EC4\u6210\u5458",
          icon: "icon_group_include",
          children: [{
            group_name: "\u6240\u6709\u8005",
            icon: "icon_group_include_owner",
            children: xU.map(otherOwner, (i) => ({
              ...i,
              icon: "icon_group_include_owner"
            }))
          }, {
            group_name: "\u5F00\u53D1\u8005",
            icon: "icon_group_include_member",
            children: xU.map(member, (i) => ({
              ...i,
              icon: "icon_group_include_member"
            }))
          }]
        }, {
          group_name: "\u975E\u5206\u7EC4\u6210\u5458",
          icon: "icon_group_exclude",
          children: xU.map(notInGroup, (i) => ({
            ...i,
            icon: "icon_group_exclude"
          }))
        }];
      } else {
        groupListForShow = xU.filter(groupList, (group) => new RegExp(keywords, "i").test(group.group_name));
      }
      vm.groupListForShow = groupListForShow;
    }, 300);
    return {
      elScrollbarHeight: 0,
      resizeAside: {
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
      configsSearch: defItem({
        isSearch: false,
        value: "",
        placeholder: "\u641C\u7D22\u5206\u7EC4",
        onAfterEmitItemValue: this.searchGroup,
        clearable: true
      }),
      groupListForShow: [],
      state: {
        addGroupModalVisible: false,
        newGroupName: "",
        newGroupDesc: "",
        currGroupName: "",
        currGroupDesc: "",
        groupList: [],
        owner_uids: []
      }
    };
  },
  async mounted() {
    await this.initGroupList();
    await stateApp._setCurrGroup(this.stateApp.currGroup._id);
  },
  methods: {
    setElScrollbarHeight: xU.debounce(function({
      height
    }) {
      this.elScrollbarHeight = height;
    }, 300),
    async initGroupList() {
      try {
        await stateApp._fetchGroupList();
        this.searchGroup();
      } catch (error) {
        console.error(error);
      }
    },
    async selectGroup(groupId) {
      if (!groupId) {
        return;
      }
      await stateApp._setCurrGroup(groupId);
      this.cptRouter.go("/group", {
        group_id: groupId
      });
      await stateApp._fetchNewsData({
        id: groupId,
        type: "group"
      });
    },
    getVDomIconEdit({
      group
    }) {
      if (!group._id) {
        return null;
      }
      const vm = this;
      const isGroupRoleAuth = group.role === OWNER;
      const isUserRoleAuth = stateApp.user.role === ADMIN;
      if (isGroupRoleAuth || isUserRoleAuth) {
        return withDirectives(createVNode(resolveComponent("xIcon"), {
          "class": "group-menu-icon editSet pointer",
          "icon": "edit",
          "onClick": () => {
            vm.fnShowUpsertGroupDialog(group);
          },
          "style": "width:16px;"
        }, null), [[resolveDirective("xTips"), {
          content: xI("\u4FEE\u6539\u5206\u7EC4\u4FE1\u606F"),
          placement: "top"
        }]]);
      }
    },
    getVDomIconDesc({
      group
    }) {
      if (!!group.group_desc) {
        return withDirectives(createVNode(resolveComponent("xIcon"), {
          "class": "x-sider-tree_menu_icon",
          "icon": "insideTips"
        }, null), [[resolveDirective("xTips"), {
          content: group.group_desc
        }]]);
      } else {
        return null;
      }
    },
    getGroupMenuItemClass({
      group
    }) {
      return {
        "x-sider-tree_menu": true,
        "x-sider-tree_menu_active": stateApp.currGroup._id && xU.isSame(stateApp.currGroup._id, group._id)
      };
    },
    getGroupMenuItem({
      group
    }) {
      return createVNode("div", {
        "class": this.getGroupMenuItemClass({
          group
        })
      }, [createVNode("div", {
        "class": "x-sider-tree_menu_title",
        "onClick": () => this.selectGroup(group._id)
      }, [createVNode(resolveComponent("xIcon"), {
        "class": "x-sider-tree_menu_icon",
        "icon": group.icon
      }, null), group.group_name]), createVNode("div", {
        "class": "x-sider-tree_menu_opration"
      }, [this.getVDomIconDesc({
        group
      }), this.getVDomIconEdit({
        group
      })])]);
    }
  },
  watch: {
    "stateApp.groupList"() {
      this.searchGroup();
    }
  },
  computed: {
    vDomSearchInput() {
      return createVNode("div", {
        "class": "group-operate flex start middle mb10"
      }, [createVNode(resolveComponent("xItem"), {
        "configs": this.configsSearch,
        "class": "flex1"
      }, null), createVNode(resolveComponent("xGap"), {
        "l": "10"
      }, null), withDirectives(createVNode("div", {
        "class": "btn editSet pointer",
        "onClick": this.fnShowUpsertGroupDialog
      }, [createVNode(resolveComponent("xIcon"), {
        "icon": "add",
        "class": "icon-opreation_click"
      }, null)]), [[resolveDirective("xTips"), {
        content: "\u6DFB\u52A0\u5206\u7EC4"
      }]])]);
    }
  },
  render() {
    const vm = this;
    return createVNode("aside", {
      "class": "x-sider_wrapper",
      "style": vm.styleAside
    }, [withDirectives(createVNode("div", {
      "class": "x-sider_wrapper_tree"
    }, [this.vDomSearchInput, createVNode(resolveComponent("el-scrollbar"), {
      "height": this.elScrollbarHeight
    }, {
      default: () => withDirectives(createVNode(resolveComponent("el-tree"), {
        "expandedKeys": stateApp.expandedKeys.group,
        "onUpdate:expandedKeys": ($event) => stateApp.expandedKeys.group = $event,
        "data": vm.groupListForShow,
        "node-key": "_id",
        "expand-on-click-node": false,
        "default-expand-all": true
      }, {
        default: ({
          data: group
        }) => vm.getGroupMenuItem({
          group
        })
      }), [[resolveDirective("xloading"), vm.groupListForShow.length === 0]])
    })]), [[resolveDirective("element-size"), this.setElScrollbarHeight]]), withDirectives(createVNode("div", {
      "class": "resize_bar",
      "icon": "scroll"
    }, null), [[resolveDirective("uiMove"), this.resizeAside]])]);
  }
});
const ProjectList = "";
const GroupProjectList = defineComponent({
  setup() {
    return {
      stateApp,
      cptRouter
    };
  },
  data() {
    const vm = this;
    vm.fetchProjectList = xU.debounce(async function() {
      await stateApp._fetchProjectList(vm.cptRouter.query.group_id);
      vm.isLoading = false;
    });
    vm.updateProjectList = () => {
      vm.isLoading = true;
      vm.fetchProjectList();
    };
    return {
      configs: {},
      isLoading: false,
      state: {
        visible: false,
        protocol: "http://",
        projectData: []
      }
    };
  },
  computed: {
    vDomAddProjectButton() {
      const btnConfigs = {
        text: xI("\u6DFB\u52A0\u9879\u76EE"),
        type: "primary",
        disabled: this.isAuthAddProject ? "" : `<div>${xI("\u60A8\u6CA1\u6709\u6743\u9650")}</div>
					<div>${xI("\u8BF7\u8054\u7CFB\u8BE5\u5206\u7EC4\u7EC4\u957F\u6216\u7BA1\u7406\u5458")}</div>`,
        onClick: this.showAddProjectDialog
      };
      return createVNode(resolveComponent("xButton"), {
        "configs": btnConfigs
      }, null);
    },
    vDomNoFollowPanel() {
      const isUnfollow = (project) => !project.follow;
      let unfollowArray = xU.sortBy(xU.filter(this.projectData, isUnfollow), ["up_time"]);
      if (xU.isArrayFill(unfollowArray)) {
        return createVNode("div", {
          "class": "bottom-line"
        }, [createVNode("h3", {
          "class": "owner-type"
        }, [xI("\u6211\u7684\u9879\u76EE")]), this.genProjectCard(unfollowArray, this.isAuthAddProject)]);
      }
      return null;
    },
    vDomFollowPanel() {
      const isFollow = (project) => !!project.follow;
      let followProject = xU.sortBy(xU.filter(this.projectData, isFollow), ["up_time"]);
      if (xU.isArrayFill(followProject)) {
        return createVNode("div", {
          "data-id": "\u6211\u7684\u5173\u6CE8"
        }, [createVNode("h3", {
          "class": "owner-type"
        }, [xI("\u6211\u7684\u5173\u6CE8")]), this.genProjectCard(followProject)]);
      } else {
        return null;
      }
    },
    vDomOwnerSpace() {
      return this.projectData.length ? createVNode("div", {
        "class": "flex1 overflow-auto"
      }, [this.vDomNoFollowPanel, this.vDomFollowPanel]) : createVNode(ErrMsg, {
        "type": "noProject"
      }, null);
    },
    vDomSpaceProject() {
      if (this.stateApp.currGroup.type === PRIVATE) {
        return this.vDomOwnerSpace;
      } else {
        if (this.projectData.length) {
          return this.genProjectCard(this.projectData, this.isAuthAddProject);
        } else {
          return createVNode("div", {
            "class": "flex center width100"
          }, [createVNode(ErrMsg, {
            "type": "noProject"
          }, null)]);
        }
      }
    },
    projectData() {
      return this.stateApp.projectList;
    },
    isAuthAddProject() {
      var _a, _b;
      const isGroupRoleAuth = [ADMIN, OWNER].includes((_b = (_a = this.stateApp) == null ? void 0 : _a.currGroup) == null ? void 0 : _b.role);
      const _isShow = isGroupRoleAuth || [ADMIN, OWNER].includes(this.stateApp.user.role);
      if (!_isShow) {
        xU("isAuthAddProject", this.stateApp.user.role);
      }
      return _isShow;
    }
  },
  watch: {
    "cptRouter.query.group_id": {
      immediate: true,
      handler() {
        this.isLoading = true;
        this.updateProjectList();
      }
    }
  },
  methods: {
    genProjectCard(projectItems, isShow = false) {
      return createVNode("div", {
        "class": "flex like-float"
      }, [xU.map(projectItems, (item, index2) => {
        return createVNode(ProjectCard, {
          "isShow": isShow,
          "index": index2,
          "projectData": item,
          "callbackResult": this.updateProjectList
        }, null);
      })]);
    },
    async showAddProjectDialog() {
      const vm = this;
      xU.dialog({
        title: "\u6DFB\u52A0\u9879\u76EE",
        component: DialogAddProject,
        groupId: vm.cptRouter.query.group_id,
        updateProjectList: vm.updateProjectList
      });
    },
    protocolChange(value) {
      this.setState({
        protocol: value
      });
    }
  },
  render() {
    return withDirectives(createVNode("div", {
      "class": "project-list"
    }, [createVNode(resolveComponent("ElRow"), {
      "class": "project-list-header"
    }, {
      default: () => [createVNode(resolveComponent("elCol"), {
        "span": 16,
        "style": {
          textAlign: "left"
        }
      }, {
        default: () => [createVNode("span", null, [createTextVNode("\u5171")]), createVNode("span", null, [createTextVNode(" "), this.stateApp.projectList.length, createTextVNode(" ")]), createVNode("span", null, [createTextVNode("\u4E2A\u9879\u76EE")])]
      }), createVNode(resolveComponent("elCol"), {
        "span": 8,
        "class": "flex end flex1"
      }, {
        default: () => [this.vDomAddProjectButton]
      })]
    }), this.vDomSpaceProject]), [[resolveDirective("xloading"), this.isLoading]]);
  }
});
const annotated = "";
const html = "";
const TimeLine$1 = "";
const DialogShowApiModify = defineComponent({
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
  computed: {
    propDiffView() {
      var _a;
      return ((_a = this.propOptions) == null ? void 0 : _a.diffView) || [];
    },
    vDomContentItem() {
      if (this.propDiffView.length === 0) {
        return createVNode(resolveComponent("ErrMsg"), {
          "type": "noChange"
        }, null);
      } else {
        return xU.map(this.propDiffView, (item, index2) => {
          if (!item.content) {
            return null;
          }
          return createVNode("div", {
            "class": "item-content"
          }, [createVNode("h3", {
            "class": "title"
          }, [item.title]), createVNode("div", {
            "innerHTML": item.content
          }, null)]);
        });
      }
    }
  },
  render() {
    return createVNode("div", {
      "class": "flex vertical flex1",
      "id": "ViewApiModify"
    }, [createVNode("div", {
      "class": "padding20"
    }, [createVNode(resolveComponent("elAlert"), {
      "title": xI("\u6CE8\uFF1A \u7EFF\u8272\u4EE3\u8868\u65B0\u589E\u5185\u5BB9\uFF0C\u7EA2\u8272\u4EE3\u8868\u5220\u9664\u5185\u5BB9"),
      "type": "info",
      "closable": true,
      "class": "width100"
    }, null)]), createVNode("div", {
      "class": "project-interface-change-content flex1 padding20"
    }, [this.vDomContentItem])]);
  }
});
const diffMessage = function(jsondiffpatch2, formattersHtml2, curDiffData) {
  const json5_parse = (json) => {
    if (typeof json === "object" && json)
      return json;
    try {
      return lib.parse(json);
    } catch (err) {
      return json;
    }
  };
  const diffText = (left, right) => {
    left = left || "";
    right = right || "";
    if (left == right) {
      return null;
    }
    var delta = jsondiffpatch2.diff(left, right);
    let result = formattersHtml2.format(delta, left);
    return result;
  };
  const diffJson = (left, right) => {
    left = json5_parse(left);
    right = json5_parse(right);
    let delta = jsondiffpatch2.diff(left, right);
    return formattersHtml2.format(delta, left);
  };
  const valueMaps = {
    1: "\u5FC5\u9700",
    0: "\u975E\u5FC5\u9700",
    text: "\u6587\u672C",
    file: "\u6587\u4EF6",
    undone: "\u672A\u5B8C\u6210",
    done: "\u5DF2\u5B8C\u6210"
  };
  const handleParams = (item) => {
    let newItem = Object.assign({}, item);
    newItem._id = void 0;
    Object.keys(newItem).forEach((key) => {
      switch (key) {
        case "required":
          newItem[key] = valueMaps[newItem[key]];
          break;
        case "type":
          newItem[key] = valueMaps[newItem[key]];
          break;
      }
    });
    return newItem;
  };
  const diffArray = (arr1, arr2) => {
    arr1 = arr1 || [];
    arr2 = arr2 || [];
    arr1 = arr1.map(handleParams);
    arr2 = arr2.map(handleParams);
    return diffJson(arr1, arr2);
  };
  let diffView = [];
  if (curDiffData && typeof curDiffData === "object" && curDiffData.current) {
    const {
      current,
      old,
      type
    } = curDiffData;
    if (type === "wiki") {
      if (current != old) {
        diffView.push({
          title: "wiki\u66F4\u65B0",
          content: diffText(old, current)
        });
      }
      return diffView = diffView.filter((item) => item.content);
    }
    if (current.path != old.path) {
      diffView.push({
        title: "Api \u8DEF\u5F84",
        content: diffText(old.path, current.path)
      });
    }
    if (current.title != old.title) {
      diffView.push({
        title: "Api \u540D\u79F0",
        content: diffText(old.title, current.title)
      });
    }
    if (current.method != old.method) {
      diffView.push({
        title: "Method",
        content: diffText(old.method, current.method)
      });
    }
    if (current.catid != old.catid) {
      diffView.push({
        title: "\u5206\u7C7B id",
        content: diffText(old.catid, current.catid)
      });
    }
    if (current.status != old.status) {
      diffView.push({
        title: "\u63A5\u53E3\u72B6\u6001",
        content: diffText(valueMaps[old.status], valueMaps[current.status])
      });
    }
    if (current.tag !== old.tag) {
      diffView.push({
        title: "\u63A5\u53E3tag",
        content: diffText(old.tag, current.tag)
      });
    }
    diffView.push({
      title: "Request Path Params",
      content: diffArray(old.req_params, current.req_params)
    });
    diffView.push({
      title: "Request Query",
      content: diffArray(old.req_query, current.req_query)
    });
    diffView.push({
      title: "Request Header",
      content: diffArray(old.req_headers, current.req_headers)
    });
    let oldValue = current.req_body_type === "form" ? old.req_body_form : old.req_body_other;
    if (current.req_body_type !== old.req_body_type) {
      diffView.push({
        title: "Request Type",
        content: diffText(old.req_body_type, current.req_body_type)
      });
      oldValue = null;
    }
    if (current.req_body_type === "json") {
      diffView.push({
        title: "Request Body",
        content: diffJson(oldValue, current.req_body_other)
      });
    } else if (current.req_body_type === "form") {
      diffView.push({
        title: "Request Form Body",
        content: diffArray(oldValue, current.req_body_form)
      });
    } else {
      diffView.push({
        title: "Request Raw Body",
        content: diffText(oldValue, current.req_body_other)
      });
    }
    let oldResValue = old.res_body;
    if (current.res_body_type !== old.res_body_type) {
      diffView.push({
        title: "Response Type",
        content: diffText(old.res_body_type, current.res_body_type)
      });
      oldResValue = "";
    }
    if (current.res_body_type === "json") {
      diffView.push({
        title: "Response Body",
        content: diffJson(oldResValue, current.res_body)
      });
    } else {
      diffView.push({
        title: "Response Body",
        content: diffText(oldResValue, current.res_body)
      });
    }
  }
  return diffView = diffView.filter((item) => item.content);
};
function _isSlot$1(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const formattersHtml = index.html;
const TimeLine = defineComponent({
  props: ["typeid", "type"],
  setup() {
    return function() {
      return createVNode(Fragment, null, [createVNode("section", {
        "class": "mb mt el-card padding"
      }, [this.vDomSectionProject, this.vDomSectionRecords]), createVNode("div", {
        "class": "flex end"
      }, [createVNode(resolveComponent("xPagination"), {
        "pagination": this.pagination,
        "onQuery": this.getMore
      }, null)])]);
    };
  },
  data() {
    return {
      newsWillShow: [],
      curSelectValue: "",
      pagination: defPagination(),
      state: {
        bidden: "",
        apiList: []
      }
    };
  },
  async mounted() {
    if (this.type === "project") {
      await this.getApiList();
    }
    await this.getMore();
  },
  methods: {
    async getMore() {
      this.state.loading = true;
      try {
        const {
          data
        } = await API.news.getLogList({
          typeid: this.typeid,
          type: this.type,
          page: this.pagination.page,
          limit: this.pagination.size,
          selectValue: this.curSelectValue
        });
        const {
          list,
          total
        } = data || {};
        if (list && total) {
          this.newsWillShow = list;
          this.pagination.total = total;
        }
      } catch (error) {
      } finally {
        this.state.loading = false;
      }
    },
    handleCancel() {
      this.setState({
        visible: false
      });
    },
    showDiffLogDialog(data) {
      xU.dialog({
        title: xI("Api \u6539\u52A8\u65E5\u5FD7(Esc \u5173\u95ED\u5F39\u7A97)"),
        component: DialogShowApiModify,
        maxmin: true,
        fullscreen: true,
        diffView: diffMessage(jsondiffpatch, formattersHtml, data)
      });
    },
    async getApiList() {
      let result = await API.project.fetchInterfaceList({
        project_id: this.typeid,
        limit: "all"
      });
      this.state.apiList = result.records;
    },
    handleSelectApi(selectValue) {
      this.curSelectValue = selectValue;
      stateApp._fetchNewsData({
        id: this.typeid,
        type: this.type
      });
    }
  },
  computed: {
    vDomProjectChildren() {
      const children = this.state.apiList.map((item) => {
        let methodColor = METHOD_COLOR[item.method ? item.method.toLowerCase() : "get"];
        return createVNode(resolveComponent("Option"), {
          "title": item.title,
          "value": item._id + "",
          "path": item.path,
          "key": item._id
        }, {
          default: () => [item.title, " ", createVNode(resolveComponent("ElTag"), {
            "style": {
              color: methodColor ? methodColor.color : "#cfefdf",
              backgroundColor: methodColor ? methodColor.bac : "#00a854",
              border: "unset"
            }
          }, {
            default: () => [item.method]
          })]
        });
      });
      children.unshift(createVNode(resolveComponent("Option"), {
        "value": "",
        "key": "all"
      }, {
        default: () => [createTextVNode("\u9009\u62E9\u5168\u90E8")]
      }));
      return children;
    },
    vDomSectionProject() {
      if (this.type === "project") {
        return createVNode(resolveComponent("ElRow"), {
          "class": "news-search"
        }, {
          default: () => [createVNode(resolveComponent("elCol"), {
            "span": "3"
          }, {
            default: () => [xI("\u9009\u62E9\u67E5\u8BE2\u7684 Api"), createTextVNode("\uFF1A")]
          }), createVNode(resolveComponent("elCol"), {
            "span": "10"
          }, {
            default: () => [createVNode(resolveComponent("aAutoComplete"), {
              "onSelect": this.handleSelectApi,
              "style": {
                width: "100%"
              },
              "placeholder": "Select Api",
              "optionLabelProp": "title",
              "filterOption": (inputValue, options) => {
                if (options.props.value == "")
                  return true;
                if (options.props.path.indexOf(inputValue) !== -1 || options.props.title.indexOf(inputValue) !== -1) {
                  return true;
                }
                return false;
              }
            }, {
              default: () => [createVNode(resolveComponent("OptGroup"), {
                "label": "other"
              }, {
                default: () => [createVNode(resolveComponent("Option"), {
                  "value": "wiki",
                  "path": "",
                  "title": "wiki"
                }, {
                  default: () => [createTextVNode("wiki")]
                })]
              }), createVNode(resolveComponent("OptGroup"), {
                "label": "api"
              }, {
                default: () => [this.vDomProjectChildren]
              })]
            })]
          })]
        });
      }
      return null;
    },
    vDomSectionRecords() {
      let records = createVNode(resolveComponent("ErrMsg"), {
        "type": "noData"
      }, null);
      if (this.newsWillShow.length) {
        const vDomTimeLineItem = xU.map(this.newsWillShow, (newsItem, i) => {
          let interfaceDiff = xU.isPlainObject(newsItem.data);
          const addTime = xU.dateFormat(newsItem.add_time, 1);
          return createVNode(resolveComponent("ElTimelineItem"), {
            "key": i,
            "timestamp": addTime,
            "placement": "top"
          }, {
            default: () => [createVNode(resolveComponent("el-card"), null, {
              header() {
                return createVNode("div", {
                  "class": "card-header flex middle"
                }, [createVNode("div", {
                  "class": "logtype"
                }, [LOG_TYPE[newsItem.type], createTextVNode("\u52A8\u6001")]), createVNode("span", {
                  "class": "logtime ml10"
                }, [_$timeAgo(newsItem.add_time)]), interfaceDiff && createVNode(resolveComponent("xButton"), {
                  "onClick": () => this.showDiffLogDialog(newsItem.data)
                }, {
                  default: () => [createTextVNode("\u6539\u52A8\u8BE6\u60C5")]
                })]);
              },
              default() {
                return createVNode("span", {
                  "class": "logcontent",
                  "innerHTML": newsItem.content
                }, null);
              }
            })]
          });
        });
        records = createVNode(resolveComponent("ElTimeline"), {
          "class": "TimeLine_news-content"
        }, _isSlot$1(vDomTimeLineItem) ? vDomTimeLineItem : {
          default: () => [vDomTimeLineItem]
        });
      }
      return records;
    }
  }
});
const GroupLog = defineComponent({
  props: ["match"],
  setup() {
    return {
      stateApp
    };
  },
  render() {
    return createVNode(TimeLine, {
      "type": "group",
      "typeid": this.stateApp.currGroup._id
    }, null);
  }
});
const MemberList = "";
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
  data() {
    return {
      formItems: {
        member_uids: defItem({
          value: [],
          itemType: ItemUAC,
          label: xI("\u7528\u6237\u540D"),
          rules: [FormRules.required()]
        }),
        role: defItem({
          value: "dev",
          itemType: "Select",
          label: xI("\u6743\u9650"),
          rules: [FormRules.required()],
          options: [{
            label: "\u7EC4\u957F",
            value: "owner"
          }, {
            label: "\u5F00\u53D1\u8005",
            value: "dev"
          }, {
            label: "\u8BBF\u5BA2",
            value: "guest"
          }]
        })
      }
    };
  },
  computed: {
    dialogDefautBtn() {
      return {
        onCancel: this.propOptions.$close,
        onOk: () => {
          this.propOptions.onOk({
            formItems: this.formItems,
            $close: this.propOptions.$close
          });
        }
      };
    }
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_xGap = resolveComponent("xGap");
  const _component_xItem = resolveComponent("xItem");
  const _component_xForm = resolveComponent("xForm");
  const _component_elCard = resolveComponent("elCard");
  const _component_xDialogFooter = resolveComponent("xDialogFooter");
  return openBlock(), createElementBlock(Fragment, null, [
    createVNode(_component_elCard, { class: "flex1" }, {
      default: withCtx(() => [
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
const ViewAddMember = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
const DialogUserInfo = defineComponent({
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
  setup(props) {
    const {
      payload,
      $close
    } = props.propOptions;
    return function() {
      return createVNode(Fragment, null, [createVNode("div", {
        "class": "x-dialog-boddy-wrapper "
      }, [createVNode(ViewUserProfile, {
        "id": payload.user_id
      }, null)]), createVNode(resolveComponent("xDialogFooter"), {
        "configs": {
          hideOk: true,
          onCancel: $close
        }
      }, null)]);
    };
  }
});
const GroupMemberList = defineComponent({
  props: ["uid"],
  setup() {
    const isAuth = [OWNER, ADMIN].includes(stateApp.currGroup.role);
    var vm = {
      role: "",
      dataSource: [],
      columns: defColumns({
        name: {
          width: 300,
          headerCellRenderer: () => createVNode("span", {
            "class": "padding"
          }, [`\u6210\u5458 ${vm.dataSource.length} \u4EBA`]),
          cellRenderer({
            rowData
          }) {
            const text = rowData.username;
            const avatarSrc = getAvatarSrcByid(rowData.uid);
            return createVNode("div", {
              "class": "flex middle start ml10 pointer",
              "onClick": () => vm._showMemberDetial(rowData.uid)
            }, [createVNode(resolveComponent("elAvatar"), {
              "src": avatarSrc
            }, null), createVNode("span", {
              "class": "ml10"
            }, [text])]);
          }
        },
        action: {
          headerCellRenderer: () => {
            if (isAuth) {
              return createVNode("div", {
                "class": "btn-container"
              }, [createVNode(resolveComponent("xButton"), {
                "class": "btn",
                "type": "primary",
                "onClick": vm._showAddMemberDialog
              }, {
                default: () => [createTextVNode("\u6DFB\u52A0\u6210\u5458")]
              })]);
            } else {
              return "";
            }
          },
          fixed: "right",
          width: 200,
          cellRenderer({
            rowData
          }) {
            if (isAuth) {
              const configs = {
                deleteBtn: {
                  text: "\u5220\u9664",
                  class: "ml10",
                  async onClick() {
                    try {
                      await xU.deleteConfirm({
                        title: "\u5220\u9664\u786E\u8BA4",
                        content: "\u4F60\u786E\u5B9A\u8981\u5220\u9664\u5417?"
                      });
                      vm._delMember(rowData.uid);
                    } catch (e) {
                      console.log("\u53D6\u6D88\u5220\u9664");
                    }
                  }
                }
              };
              return createVNode("div", {
                "class": "flex"
              }, [createVNode(resolveComponent("xItem"), {
                "modelValue": rowData.role,
                "configs": defItem({
                  itemType: "Select",
                  options: [{
                    label: "\u7EC4\u957F",
                    value: OWNER
                  }, {
                    label: "\u5F00\u53D1\u8005",
                    value: DEV
                  }, {
                    label: "\u8BBF\u5BA2",
                    value: "guest"
                  }],
                  onAfterEmitItemValue(role) {
                    vm._changeUserRole({
                      member_uid: rowData.uid,
                      role
                    });
                  }
                })
              }, null), createVNode(resolveComponent("xButton"), {
                "configs": configs.deleteBtn
              }, null)]);
            } else {
              const ROLE_MAP = {
                owner: xI("\u7EC4\u957F"),
                dev: xI("\u5F00\u53D1\u8005"),
                guest: xI("\u8BBF\u5BA2")
              };
              return ROLE_MAP[rowData.role];
            }
          }
        }
      }),
      async _initTableColumns() {
        await xU.ensureValueDone(() => stateApp.currGroup.role);
        vm._fetchGroupMemberList();
      },
      _showMemberDetial(id) {
        xU.dialog({
          title: xI("\u7528\u6237\u4FE1\u606F"),
          component: DialogUserInfo,
          payload: {
            user_id: id
          }
        });
      },
      _showAddMemberDialog() {
        xU.dialog({
          title: xI("\u6DFB\u52A0\u6210\u5458"),
          component: ViewAddMember,
          area: ["480px", "260px"],
          onOk: async ({
            formItems,
            $close
          }) => {
            if (!await itemsInvalid()) {
              const {
                member_uids,
                role
              } = pickValueFrom(formItems);
              try {
                await vm._addMember({
                  member_uids,
                  role
                });
                $close();
              } catch (error) {
                xU.message.error("\u6DFB\u52A0\u5931\u8D25");
              }
            } else {
              throw new Error("\u672A\u901A\u8FC7\u9A8C\u8BC1");
            }
          }
        });
      },
      async _fetchGroupMemberList() {
        const menbers = await stateApp._fetchGroupMemberList(stateApp.currGroup._id);
        vm.dataSource = xU.orderBy(menbers, ["username", "member"]);
      },
      async _addMember({
        member_uids,
        role
      }) {
        const {
          data
        } = await stateApp._addMember({
          id: stateApp.currGroup._id,
          member_uids,
          role
        });
        const {
          add_members,
          exist_members
        } = data;
        const addLength = add_members.length;
        const existLength = exist_members.length;
        xU.message.success(`\u65B0\u589E ${addLength} \u4EBA\uFF0C ${existLength} \u4EBA\u5DF2\u5B58\u5728`);
        vm._fetchGroupMemberList();
      },
      async _delMember(member_uid) {
        const id = stateApp.currGroup._id;
        const index2 = xU.layer.loading();
        try {
          await stateApp._delMember({
            id,
            member_uid
          });
          xU.notification.success("\u4FEE\u6539\u6210\u529F");
          vm._fetchGroupMemberList();
        } catch (e) {
          console.error(e);
        } finally {
          xU.layer.loading(index2);
        }
      },
      async _changeUserRole({
        member_uid,
        role
      }) {
        const id = stateApp.currGroup._id;
        const index2 = xU.layer.loading();
        try {
          await stateApp._changeMemberRole({
            id,
            member_uid,
            role
          });
          xU.notification.success("\u4FEE\u6539\u6210\u529F");
          vm._fetchGroupMemberList();
        } catch (e) {
          console.error(e);
        } finally {
          xU.layer.loading(index2);
        }
      }
    };
    vm = xScope(vm);
    onMounted(() => {
      vm._initTableColumns();
    });
    return function() {
      return createVNode(resolveComponent("xTable"), {
        "columns": vm.columns,
        "rows": vm.dataSource,
        "class": "el-card"
      }, null);
    };
  }
});
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const ViewGroup = defineComponent({
  setup() {
    return {
      cptRouter,
      stateApp,
      fnShowUpsertGroupDialog,
      fnUpsertGroupInfo
    };
  },
  data() {
    return {};
  },
  mounted() {
    this.ifUrlNoGroupIdGetAndAddIdToUrl();
  },
  methods: {
    async ifUrlNoGroupIdGetAndAddIdToUrl() {
      if (!this.cptRouter.query.group_tab) {
        this.cptRouter.query.group_tab = TAB_KEY_PROJECT_LIST;
      }
      try {
        if (!this.groupId || this.groupId === "undefined") {
          let {
            data: group
          } = await API.group.mine();
          if (xU.isArrayFill(group)) {
            this.cptRouter.query.group_id = group[0]._id;
          }
        } else {
          await stateApp._setCurrGroup(this.groupId);
        }
      } catch (e) {
        console.error(e);
      }
    }
  },
  computed: {
    groupId() {
      return this.cptRouter.query.group_id || false;
    },
    currTabName: {
      get() {
        return this.cptRouter.query.group_tab || TAB_KEY_PROJECT_LIST;
      },
      set(group_tab) {
        this.cptRouter.query.group_tab = group_tab;
      }
    },
    vDomTabMember() {
      if (this.currTabName !== TAB_KEY_MEMBER_LIST) {
        return null;
      }
      if (this.stateApp.currGroup.type === PUBLIC) {
        return createVNode("div", {
          "class": "mt flex1 h1px"
        }, [createVNode(GroupMemberList, null, null)]);
      } else {
        return null;
      }
    },
    vDomTabGroupLog() {
      var _a, _b;
      if (this.currTabName !== TAB_KEY_GROUP_LOG) {
        return null;
      }
      const isGroupRoleAuth = [ADMIN, OWNER, DEV].includes((_b = (_a = this.stateApp) == null ? void 0 : _a.currGroup) == null ? void 0 : _b.role);
      if (isGroupRoleAuth) {
        return createVNode(GroupLog, null, null);
      } else {
        return null;
      }
    },
    vDomTabProjectList() {
      if (this.currTabName !== TAB_KEY_PROJECT_LIST) {
        return null;
      }
      return createVNode(GroupProjectList, null, null);
    },
    vDomTabGroupWiki() {
      if (this.currTabName !== TAB_KEY_GROUP_WIKI) {
        return null;
      }
      return createVNode(ViewWiki, {
        "belongType": GROUP,
        "style": "margin: 0 -10px -10px;"
      }, null);
    },
    vDomSwitchPanel() {
      let _slot;
      let btnArray = [TAB_KEY_PROJECT_LIST, TAB_KEY_MEMBER_LIST, TAB_KEY_GROUP_LOG, TAB_KEY_GROUP_WIKI];
      if (this.stateApp.currGroup.type === PRIVATE) {
        btnArray = [TAB_KEY_PROJECT_LIST, TAB_KEY_GROUP_LOG, TAB_KEY_GROUP_WIKI];
      }
      return createVNode("div", {
        "class": "flex middle start"
      }, [createVNode(resolveComponent("el-button-group"), {
        "class": "ml-4"
      }, _isSlot(_slot = xU.map(btnArray, (name) => {
        const type = this.currTabName === name ? "primary" : "";
        let tips = {};
        if (name === TAB_KEY_GROUP_WIKI) {
          const href = aHashLink("/wiki_group", {
            group_id: cptRouter.value.query.group_id
          });
          const tipsLabel = xI(OPEN_BLANK);
          tips = {
            content: `<a class="flex middle" href="${href}" target="_blank" >${tipsLabel} </a>`
          };
        }
        return withDirectives(createVNode(resolveComponent("xButton"), {
          "type": type,
          "onClick": () => this.currTabName = name
        }, _isSlot(name) ? name : {
          default: () => [name]
        }), [[resolveDirective("xTips"), tips]]);
      })) ? _slot : {
        default: () => [_slot]
      }), createVNode(resolveComponent("xGap"), {
        "f": "1"
      }, null)]);
    }
  },
  render() {
    return withDirectives(createVNode("section", {
      "id": "ViewGroup"
    }, [createVNode("aside", {
      "id": "ViewGroup_sider",
      "class": "flex vertical box-shadow"
    }, [createVNode(GroupAside, null, null)]), createVNode("section", {
      "class": "view-main-section box-shadow flex1"
    }, [this.vDomSwitchPanel, this.vDomTabProjectList, this.vDomTabMember, this.vDomTabGroupLog, this.vDomTabGroupWiki])]), [[resolveDirective("xloading"), !this.groupId]]);
  }
});
export {
  ViewGroup
};
