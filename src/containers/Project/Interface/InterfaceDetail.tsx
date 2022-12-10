import {defineComponent, ref, watch} from "vue";
import {$, xU, UI} from "@ventose/ui";
import {DialogUpsertCategory} from "./DialogUpsertCategory";
import {usefnObserveDomResize} from "../../../compositions/useDomResize";
import {API} from "../../../api";
import {Cpt_currProject} from "../../../state/State_App";
import {ALL} from "../../../utils/variable";
import {Methods_Interface, State_Project} from "./State_Project";
import {Cpt_url} from "../../../router/router";
import {InfoCard} from "../../../components/InfoCard";
import {ITEM_OPTIONS_VDOM} from "../../../utils/common.options";

export const InterfaceDetail = defineComponent({
    setup() {
        return {State_Interface: State_Project, Cpt_url};
    },
    data(vm) {

        return {
            Cpt_currProject,
            interfaceDetail: false
        };
    },
    watch: {
        "Cpt_url.query.interface_id": {
            immediate: true,
            async handler(interface_id) {
                if (!interface_id) {
                    return;
                }
                const {data} = await API.project.fetchInterfaceDetail(
                    this.Cpt_url.query.interface_id
                );
                this.interfaceDetail = data;
            }
        }
    },
    methods: {
        flagMsg(mock, strice) {
            if (mock && strice) {
                return <span>( 全局mock & 严格模式 )</span>;
            } else if (!mock && strice) {
                return <span>( 严格模式 )</span>;
            } else if (mock && !strice) {
                return <span>( 全局mock )</span>;
            } else {
                return;
            }
        }
    },
    computed: {
        status() {
            let status = {
                undone: "未完成",
                done: "已完成"
            };

            return status[this.interfaceDetail?.status];
        }
    },
    render() {
        const vm = this;
        if (!this.interfaceDetail || !this.Cpt_currProject) {
            return <aSpin spinning={true}></aSpin>;
        }
        const {tag, up_time, title, uid, username, status, path, method} =
        this.interfaceDetail || {};
        console.log(this.Cpt_currProject, this.interfaceDetail)
        return (
            <xView>
                <aDescriptions bordered title="基本信息" size="middle" column={3}>
                    {{
                        extra: () => {
                            return;
                        },
                        default: () => {
                            return (
                                <>
                                    <aDescriptionsItem label="接口名称" span={3}>
                                        {title}
                                    </aDescriptionsItem>
                                    <aDescriptionsItem label="维护人" span={1}>
                                        <aAvatar src={"/api/user/avatar?uid=" + uid} class="mr8"/>
                                        <a>{username}</a>
                                    </aDescriptionsItem>
                                    <aDescriptionsItem label="状态" span={1}>
                                        {ITEM_OPTIONS_VDOM.status(status)}
                                    </aDescriptionsItem>
                                    <aDescriptionsItem label="更新时间" span={1}>
                                        {xU.dateFormat(up_time)}
                                    </aDescriptionsItem>
                                    <aDescriptionsItem label="接口路径" span={3}>
                                        <CopyContent class="flex middle">
                                            {ITEM_OPTIONS_VDOM.httpMethod(method)}
                                            {this.Cpt_currProject.basepath}
                                            {path}
                                        </CopyContent>
                                    </aDescriptionsItem>
                                    <aDescriptionsItem label="Tag" span={3}>
                                        {ITEM_OPTIONS_VDOM.tags(tag)}
                                    </aDescriptionsItem>
                                    <aDescriptionsItem label="Mock地址" span={3}>
                                        {vm.flagMsg(vm.Cpt_currProject.is_mock_open, vm.Cpt_currProject.strice)}
                                        <CopyContent>
                                            <span
                                                class="href"
                                                onClick={() =>
                                                    window.open(
                                                        location.protocol +
                                                        '//' +
                                                        location.hostname +
                                                        (location.port !== '' ? ':' + location.port : '') +
                                                        `/mock/${vm.Cpt_currProject._id}${vm.Cpt_currProject.basepath}${
                                                            vm.interfaceDetail.path
                                                        }`,
                                                        '_blank'
                                                    )
                                                }
                                            >
                {location.protocol +
                '//' +
                location.hostname +
                (location.port !== '' ? ':' + location.port : '') +
                `/mock/${vm.Cpt_currProject._id}${vm.Cpt_currProject.basepath}${
                    vm.interfaceDetail.path
                }`}
              </span>

                                        </CopyContent>
                                        <aButton type="primary">运行</aButton>
                                    </aDescriptionsItem>
                                </>
                            );
                        }
                    }}
                </aDescriptions>
                <xGap t="20"/>
                <InfoCard>
                    {{
                        title: () => {
                            return "返回信息";
                        },
                        default: () => {
                            return <h1>asdfasdfsf</h1>;
                        }
                    }}
                </InfoCard>
            </xView>
        );
    }
});
