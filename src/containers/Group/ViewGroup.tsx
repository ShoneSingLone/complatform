import "./Group.scss";
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
			if (this.State_App.currGroup.type === PUBLIC) {
				return (
					/* "成员列表" */
					<ElTabPane name={TAB_KEY_MEMBER_LIST} label={TAB_KEY_MEMBER_LIST}>
						<GroupMemberList />
					</ElTabPane>
				);
			} else {
				return null;
			}
		},
		vDomTabGroupLog() {
			const isGroupRoleAuth = [ADMIN, OWNER, DEV].includes(
				this.State_App?.currGroup?.role
			);
			if (isGroupRoleAuth) {
				return (
					/* 分组动态 */
					<ElTabPane name={TAB_KEY_GROUP_LOG} label={TAB_KEY_GROUP_LOG}>
						<GroupLog />
					</ElTabPane>
				);
			} else {
				return null;
			}
		},
		styleContent() {
			return {
				height: "100%",
				margin: "0 24px 0 16px",
				overflow: "initial",
				backgroundColor: "#fff"
			};
		},
		vDomTabProjectList() {
			return (
				<ElTabPane label={TAB_KEY_PROJECT_LIST} name={TAB_KEY_PROJECT_LIST}>
					<GroupProjectList />
				</ElTabPane>
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
				<section class="flex1">
					<div
						data-app-position="Group-layout-content"
						style={this.styleContent}>
						<ElTabs
							id="Group-layout-content-tabs"
							v-model={this.tabActiveKey}
							type="border-card"
							class="m-tab tabs-large height100">
							{this.vDomTabProjectList}
							{this.vDomTabMember}
							{this.vDomTabGroupLog}
						</ElTabs>
					</div>
				</section>
			</section>
		);
	}
});
