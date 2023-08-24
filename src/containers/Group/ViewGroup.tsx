import "./Group.less";
import { defineComponent } from "vue";
import {
	GroupLeftSider,
	fnShowUpsertGroupDialog,
	fnUpsertGroupInfo
} from "./GroupList/GroupLeftSider";
import { GroupProjectList } from "./GroupProjectList/GroupProjectList";
import GroupLog from "./GroupLog/GroupLog";
import { Cpt_url } from "../../router/router";
import { API } from "../../api";
import { Methods_App, State_App } from "../../state/State_App";
import { GroupMemberList } from "./GroupMemberList/GroupMemberList";
import {
	ADMIN,
	DEV,
	GUEST,
	OWNER,
	PRIVATE,
	PUBLIC,
	TAB_KEY_ARRAY,
	TAB_KEY_GROUP_LOG,
	TAB_KEY_MEMBER_LIST,
	TAB_KEY_PROJECT_LIST
} from "@/utils/variable";
import { xU } from "@/element/ui";

/* import GroupSetting from "./GroupSetting/GroupSetting.vue"; */

export const ViewGroup = defineComponent({
	setup() {
		return {
			Cpt_url,
			State_App,
			fnShowUpsertGroupDialog,
			fnUpsertGroupInfo
		};
	},
	data() {
		return {
			state: {}
		};
	},
	mounted() {
		this.ifUrlNoGroupIdGetAndAddIdToUrl();
		if (!this.Cpt_url.query.group_tab) {
			this.Cpt_url.query.group_tab = TAB_KEY_PROJECT_LIST;
		}
	},
	beforeUnmount() {
		if (this.timmer) {
			clearTimeout(this.timmer);
		}
	},
	methods: {
		async ifUrlNoGroupIdGetAndAddIdToUrl() {
			try {
				if (!this.groupId || this.groupId === "undefined") {
					let { data: group } = await API.group.getMyGroup();
					this.Cpt_url.query.group_id = group._id;
				} else {
					await Methods_App.setCurrGroup(this.groupId);
				}
			} catch (e) {
				console.error(e);
				this.timmer = setTimeout(() => {
					this.ifUrlNoGroupIdGetAndAddIdToUrl();
				}, 1000);
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
				}
				return TAB_KEY_PROJECT_LIST;
			}
		},
		vDomTabMember() {
			if (this.tabActiveKey !== TAB_KEY_MEMBER_LIST) {
				return null;
			}
			if (this.State_App.currGroup.type === PUBLIC) {
				return (
					/* "成员列表" */
					<GroupMemberList />
				);
			} else {
				return null;
			}
		},
		vDomTabGroupLog() {
			if (this.tabActiveKey !== TAB_KEY_GROUP_LOG) {
				return null;
			}
			const isGroupRoleAuth = [ADMIN, OWNER, DEV].includes(
				this.State_App?.currGroup?.role
			);
			if (isGroupRoleAuth) {
				return (
					/* 分组动态 */
					<GroupLog />
				);
			} else {
				return null;
			}
		},
		vDomTabProjectList() {
			if (this.tabActiveKey !== TAB_KEY_PROJECT_LIST) {
				return null;
			}
			return <GroupProjectList />;
		},
		vDomSwitchPanel() {
			return (
				<el-button-group class="ml-4">
					<el-button type="primary">{TAB_KEY_PROJECT_LIST}</el-button>
					<el-button type="primary">{TAB_KEY_MEMBER_LIST}</el-button>
					<el-button type="primary">{TAB_KEY_GROUP_LOG}</el-button>
				</el-button-group>
			);
		}
	},
	render() {
		return (
			<section
				id="GroupView"
				class="padding20 flex horizon"
				v-xloading={!this.groupId}>
				<aside id="ViewGroup_sider" class="flex vertical box-shadow">
					<GroupLeftSider />
				</aside>
				<section class="GrouMainSection el-card is-always-shadow flex1">
					{this.vDomSwitchPanel}
					{this.vDomTabProjectList}
					{this.vDomTabMember}
					{this.vDomTabGroupLog}
				</section>
			</section>
		);
	}
});
