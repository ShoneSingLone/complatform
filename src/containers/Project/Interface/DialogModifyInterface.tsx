import {
    validateForm,
    AllWasWell,
    pickValueFrom,
    UI,
    defItem,
    xU,
    VNodeCollection,
    setValueTo,
    State_UI,
    $
} from "@ventose/ui";
import { defineComponent, markRaw } from "vue";
import { API } from "../../../api";
import { Methods_App, State_App } from "../../../state/State_App";
import { FormRules } from "../../../utils/common.FormRules";
import { ITEM_OPTIONS } from "../../../utils/common.options";
import { HTTP_METHOD } from "./../../../utils/variable";
import { State_Project } from "./State_Project";
import { _$handlePath, _$interfacePathParamsTpl } from "src/utils/common";
import { DialogAddGroup } from "../../Group/GroupList/DialogAddGroup";
import { DialogUpsertTags } from "./DialogUpsertTags";
import { DialogUpsertProxyEnv } from "./DialogUpsertProxyEnv";

export const DialogModifyInterface = defineComponent({
    props: {
        /* Dialog 默认传入参数 */
        propDialogOptions: {
            type: Object,
            default() {
                return { __elId: false };
            }
        }
    },
    setup() {
        return { State_App, State_Project };
    },
    computed: {
        interfaceId() {
            return this.propDialogOptions.oldInterface._id;
        },
        configsDialogFooter() {
            return {
                onCancel: async () => {
                    this.propDialogOptions.closeDialog()
                },
                onOk: async () => {
                    this.submit()
                }
            }
        }
    },
    data() {
        const vm = this;
        return {
            detailInfo: {},
            activeKey: "1",
            apiMethod: defItem.item({
                value: "",
                itemType: "Select",
                prop: "apiMethod",
                options: ITEM_OPTIONS.httpMethod,
                rules: [FormRules.required()],
                once() {
                    this.value = xU.first(this.options).value;
                },
                style: { width: "120px" }
            }),
            dataXItem: {
                ...defItem({
                    value: '',
                    itemType: "Select",
                    prop: "catid",
                    label: vm.$t("接口分类").label,
                    placeholder: "分类名称",
                    options: [],
                    rules: [FormRules.required()],
                    once() {
                        this.options = vm.State_Project.allCategory;
                        /* 默认在点击的分类下添加新接口 */
                        if (vm.propDialogOptions.categoryId) {
                            this.value = vm.propDialogOptions.categoryId;
                        } else {
                            this.value = xU.first(this.options)?.value || "";
                        }
                    }
                }),
                ...defItem({
                    value: "",
                    prop: "title",
                    label: vm.$t("接口名称").label,
                    placeholder: vm.$t("接口名称").label,
                    rules: [
                        FormRules.required(),
                        FormRules.nameLength({ label: vm.$t("接口").label })
                    ]
                }),
                ...defItem({
                    value: vm.State_App.currProject.basepath,
                    prop: "basepath",
                    label: vm.$t("接口基本路径").label,
                    labelVNodeRender: VNodeCollection.labelTips(`接口基本路径，可在 项目设置 里修改`),
                    disabled: true
                }),
                ...defItem({
                    value: "",
                    prop: "path",
                    label: vm.$t("接口路径").label,
                    labelVNodeRender: VNodeCollection.labelTips(
                        <ul>
                            <li>1.接口路径支持路由参数，例如:/api/v1/project<b>/{"{projectId}"}</b>。</li>
                            <li>2.Query参数，例如/api/v1/project<b>?projectId=0001</b>。请定义到<b>Request设置-&#62;Query</b></li>
                        </ul>
                    ),
                    placeholder: "/path",
                    rules: [FormRules.required(), FormRules.apiPath()],
                    once() {
                        const vDomApiMethodsSelector = <xItem configs={vm.apiMethod} />;
                        this.slots = markRaw({
                            addonBefore: () => vDomApiMethodsSelector
                        });
                    },
                    onAfterValueEmit: xU.debounce(function (newPatnValue) {
                        newPatnValue = _$handlePath(newPatnValue);
                        let queue = [];
                        setValueTo(vm.dataXItem, { path: newPatnValue });
                        const { pathParams } = pickValueFrom(vm.dataXItem);

                        let insertParams = name => {
                            let findExist = xU.find(pathParams, { name: name });
                            if (findExist) {
                                queue.push(findExist);
                            } else {
                                queue.push({ name: name, desc: '' });
                            }
                        };

                        if (newPatnValue && newPatnValue.indexOf(':') !== -1) {
                            let paths = newPatnValue.split('/'),
                                name,
                                i;
                            for (i = 1; i < paths.length; i++) {
                                if (paths[i][0] === ':') {
                                    name = paths[i].substr(1);
                                    insertParams(name);
                                }
                            }
                        }
                        if (newPatnValue && newPatnValue.length > 3) {
                            newPatnValue.replace(/\{(.+?)\}/g, function (str, match) {
                                insertParams(match);
                            });
                        }

                        setValueTo(vm.dataXItem, {
                            pathParams: xU.map(xU.uniqBy(queue, 'name'), (newValue) => {
                                /* @ts-ignore */
                                return xU.merge({ name: '', desc: '', example: "", _id: "" }, newValue)
                            })
                        });

                    }, 800)
                }),
                ...defItem({
                    prop: "pathParams",
                    label: "接口路径参数",
                    value: [],
                    itemType: InpterfacePathParams
                }),
                ...defItem({
                    prop: "isProxy",
                    label: "是否开启转发",
                    options: ITEM_OPTIONS.YesOrNo,
                    itemType: "Switch"
                }),
                ...defItem({
                    isShow: () => vm.dataXItem.isProxy.value,
                    prop: "witchEnv",
                    label: "转发环境",
                    options: [],
                    async once() {
                        this.options = xU.map(State_App.currProject.env, i => {
                            return {
                                value: i._id,
                                label: `${i.name} ${i.domain}`
                            }
                        })
                    },
                    itemType: "Select"
                }),
                ...defItem({
                    prop: "tag",
                    label: "Tag",
                    value: [],
                    tagOptions: [],
                    async once() {
                        this.setOptions();
                    },
                    async setOptions() {
                        this.tagOptions = State_App.currProject.tag;
                    },
                    async onAfterUpdate() {
                        await Methods_App.setCurrProject(State_App.currProject._id);
                        this.setOptions();
                    },
                    itemType: TagSelector,
                }),
            }
        };
    },
    mounted() {
        const vm = this;
        vm.init()
        openProxyEnvDialog();
    },
    methods: {
        init() {
            this.detailInfo = this.initState(this.propDialogOptions.oldInterface);
            const { catid, title, path, req_params, tag, isProxy, witchEnv } = this.detailInfo;
            setValueTo(this.dataXItem, { witchEnv, catid, title, path, pathParams: req_params, tag: String(tag).split(","), isProxy });
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
                detailInfo.req_body_form = detailInfo.req_body_form.map(item => {
                    item.type = item.type === "text" ? "text" : "file";
                    return item;
                });
            }
            // 设置标签的展开与折叠
            detailInfo["hideTabs"] = {
                req: {
                    body: "hide",
                    query: "hide",
                    headers: "hide"
                }
            };
            detailInfo["hideTabs"]["req"][
                HTTP_METHOD[detailInfo.method].default_tab
            ] = "";
            return Object.assign(
                {
                    submitStatus: false,
                    title: "",
                    path: "",
                    status: "undone",
                    method: "get",
                    req_params: [],
                    req_query: [
                        {
                            name: "",
                            desc: "",
                            required: "1"
                        }
                    ],
                    req_headers: [
                        {
                            name: "",
                            value: "",
                            required: "1"
                        }
                    ],
                    req_body_type: "form",
                    req_body_form: [
                        {
                            name: "",
                            type: "text",
                            required: "1"
                        }
                    ],
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
                },
                detailInfo
            );
        },
        async submit() {
            const validateResults = await validateForm(this.dataXItem);
            if (AllWasWell(validateResults)) {
                const { catid, title, path } = pickValueFrom(this.dataXItem);
                const { projectId } = this.propDialogOptions;
                try {
                    const res = await API.project.addInterface({
                        project_id: projectId,
                        catid,
                        title,
                        path,
                        method: this.apiMethod.value
                    });
                    if (res) {
                        return true;
                    }
                } catch (error) {
                    UI.message.error("添加失败");
                }
            }
        }
    },
    render() {
        const vm = this;
        return (
            <>
                <div class="dialog-modify-interface g-row flex1 flex horizon height100 width100 overflow-auto">
                    <a-tabs v-model:activeKey={this.activeKey} tab-position="left" animated>
                        <a-tab-pane key="1" tab="基本设置"></a-tab-pane>
                        <a-tab-pane key="2" tab="请求参数"></a-tab-pane>
                        <a-tab-pane key="3" tab="返回数据"></a-tab-pane>
                        <a-tab-pane key="4" tab="备注"></a-tab-pane>
                    </a-tabs>
                    <div class="flex1">
                        {JSON.stringify(pickValueFrom(this.dataXItem))}
                        <xGap t="10" />
                        <xForm
                            style={{ display: this.activeKey === "1" ? "block" : "none" }}
                            class="flex vertical"
                            labelStyle={{ "min-width": "120px", width: "unset" }}>
                            <xGap t="10" />
                            <xItem configs={this.dataXItem.catid} />
                            <xGap t="10" />
                            <xItem configs={this.dataXItem.title} />
                            <xGap t="10" />
                            <xItem configs={this.dataXItem.basepath} />
                            <xGap t="10" />
                            <xItem configs={this.dataXItem.path} />
                            {/* 接口路径参数 */}
                            {xU.isArrayFill(this.dataXItem.pathParams.value) && <>
                                <xGap t="10" />
                                <xItem configs={this.dataXItem.pathParams} />
                            </>}
                            <xGap t="10" />
                            <xItem configs={this.dataXItem.tag} />
                            <xGap t="10" />
                            <xItem configs={this.dataXItem.isProxy} />
                            <xGap t="10" />
                            <xItem configs={this.dataXItem.witchEnv} >
                                {{
                                    afterControll() {
                                        return <xButton configs={{ text: vm.$t("转发环境设置").label, onClick: openProxyEnvDialog }} class="ml10" type="primary" />
                                    }
                                }}
                            </xItem>
                        </xForm>
                        <xGap t="10" />
                    </div>
                </div>
                <xDialogFooter configs={this.configsDialogFooter} />
            </>
        );
    }
});


export const InpterfacePathParams = (args) => {
    args.property.value = args.property.value || [];
    args.fnUpdate = (prop, val, index) => {
        args.property.value[index][prop] = val;
        args.listeners["onUpdate:value"](args.property.value)
    }
    return xU.map(args.property.value, (data, index) => {
        const { desc, example, name, _id } = data;
        return (<div class="flex middel mt10 width100">
            <aTag class="mr10 flex middle" style="min-width:100px">{name}</aTag>
            <span class="mr10 flex1"><xItem configs={{
                placeholder: "参数示例",
                value: example,
                onAfterValueEmit: (val) => args.fnUpdate("example", val, index),
            }} /></span>
            <span class="flex1"><xItem configs={{
                placeholder: "备注",
                value: desc,
                onAfterValueEmit: (val) => args.fnUpdate("desc", val, index),
            }} /></span>
        </div>)
    })
};


export async function openProxyEnvDialog() {
    const { _layerKey } = await UI.dialog.component({
        title: State_UI.$t("管理项目接口转发环境").label,
        env: State_App.currProject.env,
        projectId: State_App.currProject._id,
        component: DialogUpsertProxyEnv,
    });
    /*弹窗里面的弹窗点击之后不关闭（点不到其他位置）*/
    $(`#layui-layer-shade${_layerKey}`).css("z-index", 1);
}
async function openAddTagDialog() {
    const { _layerKey } = await UI.dialog.component({
        title: State_UI.$t("管理项目接口Tags").label,
        tags: State_App.currProject.tag,
        projectId: State_App.currProject._id,
        component: DialogUpsertTags,
    });
    /*弹窗里面的弹窗点击之后不关闭（点不到其他位置）*/
    $(`#layui-layer-shade${_layerKey}`).css("z-index", 1);
}


const TagSelector = (args) => {
    args.property.value = args.property.value || [];
    const tagOptions = args.property.tagOptions || [];
    const onAfterUpdate = args.property.onAfterUpdate || xU.doNothing;
    args.fnUpdate = (val) => {
        args.listeners["onUpdate:value"](val)
    }
    const vDomOptions = xU.map(tagOptions, item => {
        return (
            <aSelectOption value={item.name} key={item.name}>
                <span v-uiPopover={{ content: item.desc }}>
                    {item.name}
                </span>
            </aSelectOption>
        );
    })
    return <div class="flex overflow-auto">
        <aSelect placeholder='请选择 tag' onChange={args.fnUpdate} mode="multiple" value={args.property.value}>
            {vDomOptions}
        </aSelect>
        <xGap l="10" />
        <aButton type='primary' onClick={() => openAddTagDialog(onAfterUpdate)}>
            Tag设置
        </aButton>
    </div>
};
