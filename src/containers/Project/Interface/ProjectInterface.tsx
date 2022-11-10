import GroupList from "../../Group/GroupList/GroupList";
import ProjectList from "../../Group/ProjectList/ProjectList";
import MemberList from "../../Group/MemberList/MemberList";
import GroupLog from "../../Group/GroupLog/GroupLog";
/*
import GroupSetting from "./GroupSetting/GroupSetting.vue"; */
import "../../Group/Group.scss";
import { defineComponent } from "vue";
import { Cpt_url, Methods_App, State_App } from "../../../state/State_App";
import { API } from "../../../api";

const TAB_KEY_PROJECT_LIST = "项目列表";
const TAB_KEY_MEMBER_LIST = "成员列表";
const TAB_KEY_GROUP_LOG = "分组动态";

const TAB_KEY_ARRAY = [
    TAB_KEY_PROJECT_LIST,
    TAB_KEY_MEMBER_LIST,
    TAB_KEY_GROUP_LOG
];

export const ProjectInterface = defineComponent({
    setup() {
        return {
            Cpt_url,
            State_App
        };
    },
    data() {
        return {
            state: {}
        };
    },
    mounted() {
        this.ifUrlNoGroupIdGetAndAddIdToUrl();
    },
    methods: {
        async ifUrlNoGroupIdGetAndAddIdToUrl() {
            try {
                if (!this.groupId) {
                    let { data: group } = await API.group.getMyGroup();
                    this.Cpt_url.query.group_id = group._id;
                } else {
                    await Methods_App.setCurrGroup(this.groupId);
                }
            } catch (e) {
                console.error(e);
                this.ifUrlNoGroupIdGetAndAddIdToUrl();
            }
        }
    },
    computed: {
        groupId() {
            return this.Cpt_url.query.group_id || false;
        },
        tabActiveKey: {
            set(group_tab) {
                this.Cpt_url.query.group_tab = group_tab;
            },
            get() {
                const { group_tab } = this.Cpt_url.query;
                if (TAB_KEY_ARRAY.includes(group_tab)) {
                    return group_tab;
                } else {
                    this.Cpt_url.query.group_tab = TAB_KEY_PROJECT_LIST;
                }
            }
        },
        TabMember() {
            if (this.State_App.currGroup.type === "public") {
                return (
                    /* "成员列表" */
                    <aTabPane tab={TAB_KEY_MEMBER_LIST} key={TAB_KEY_MEMBER_LIST}>
                        <MemberList />
                    </aTabPane>
                );
            } else {
                return null;
            }
        },
        TabGroupLog() {
            const isGroupRoleAuth = this.State_App.currGroup.role === "admin";
            const isCurrentUserRoleAuth = ["admin", "owner", "guest", "dev"].includes(
                this.State_App.user.role
            );

            if (isGroupRoleAuth || isCurrentUserRoleAuth) {
                return (
                    /* 分组动态 */
                    <aTabPane tab={TAB_KEY_GROUP_LOG} key={TAB_KEY_GROUP_LOG}>
                        <GroupLog />
                    </aTabPane>
                );
            } else {
                return null;
            }
        }
    },
    render() {
        if (!this.groupId) {
            return <aSpin class="flex vertical middle center height100" />;
        }

        return (
            <aLayout
                id="ViewProjectInterface"
                style={{
                    marginLeft: "24px",
                    marginTop: "24px"
                }}>
                <aLayoutSider width={300} class="flex vertical height100">
                    <aTabs
                        id="Group-layout-content-tabs"
                        activeKey={this.tabActiveKey}
                        onUpdate:activeKey={val => (this.tabActiveKey = val)}
                        type="card"
                        class="m-tab tabs-large height100">
                        {/* 项目列表 */}
                        <aTabPane tab={TAB_KEY_PROJECT_LIST} key={TAB_KEY_PROJECT_LIST}>
                            <ProjectList />
                        </aTabPane>
                        {this.TabMember}
                        {this.TabGroupLog}
                    </aTabs>
                </aLayoutSider>
                <aLayout>
                    <aLayoutContent
                        data-app-position="Group-layout-content"
                        style={{
                            height: "100%",
                            margin: "0 24px 0 16px",
                            overflow: "initial",
                            backgroundColor: "#fff"
                        }}>

                        <h1>content</h1>
                    </aLayoutContent>
                </aLayout>
            </aLayout>
        );
    }
});
