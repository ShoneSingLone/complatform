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

/* import GroupSetting from "./GroupSetting/GroupSetting.vue"; */

const TAB_KEY_PROJECT_LIST = "项目列表";
const TAB_KEY_MEMBER_LIST = "成员列表";
const TAB_KEY_GROUP_LOG = "分组动态";

const TAB_KEY_ARRAY = [
	TAB_KEY_PROJECT_LIST,
	TAB_KEY_MEMBER_LIST,
	TAB_KEY_GROUP_LOG
];

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
				if (!this.groupId) {
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
			if (this.State_App.currGroup.type === "public") {
				return (
					/* "成员列表" */
					<aTabPane tab={TAB_KEY_MEMBER_LIST} key={TAB_KEY_MEMBER_LIST}>
						<GroupMemberList />
					</aTabPane>
				);
			} else {
				return null;
			}
		},
		vDomTabGroupLog() {
			const isGroupRoleAuth = ["admin", "owner"].includes(
				this.State_App?.currGroup?.role
			);
			const isUserRoleAuth = ["admin", "owner", "guest", "dev"].includes(
				this.State_App.user.role
			);

			if (isGroupRoleAuth || isUserRoleAuth) {
				return (
					/* 分组动态 */
					<aTabPane tab={TAB_KEY_GROUP_LOG} key={TAB_KEY_GROUP_LOG}>
						<GroupLog />
					</aTabPane>
				);
			} else {
				return null;
			}
		},
		stylePanel() {
			const isFooterFold = this.State_App.isFooterFold;
			return {
				"flex vertical": true,
				"footer-fold elevation-4": isFooterFold,
				"elevation-8": !isFooterFold
			};
		},
		styleContent() {
			return {
				height: "100%",
				margin: "0 24px 0 16px",
				overflow: "initial",
				backgroundColor: "#fff"
			};
		},
		vDomGroupName() {
			let _vDomGroupName = (
				<div class="name">{this.State_App.currGroup.group_name}</div>
			);

			if (this.State_App.currGroup.group_desc) {
				return (
					<aPopover trigger="hover">
						{{
							content: () => (
								<p style={{ maxWidth: "600px" }}>
									{this.State_App.currGroup.group_desc}
								</p>
							),
							default: () => _vDomGroupName
						}}
					</aPopover>
				);
			} else {
				return _vDomGroupName;
			}
		},
		vDomEditIcon() {
			/*当前用户在当前group的角色是owner*/
			const isGroupRoleAuth = this.State_App.currGroup.role === "owner";
			/*超级管理员*/
			const isUserRoleAuth = this.State_App.user.role === "admin";
			/*个人空间不可修改*/
			const isGroupPrivate = this.State_App.currGroup.type === "private";

			if (isGroupPrivate) {
				return null;
			}

			if (isGroupRoleAuth || isUserRoleAuth) {
				return (
					<xIcon
						class="btn editSet pointer"
						icon="edit"
						onClick={() =>
							this.fnShowUpsertGroupDialog(this.State_App.currGroup)
						}
						v-uiPopover={{
							content: "修改分组信息",
							placement: "bottom",
							delay: 1500
						}}
						style="width:16px;"
					/>
				);
			}
		},
		vDomEditGroupInfo() {
			/* TODO: 权限校验 */
			return (
				<div class="curr-group-name">
					<div class="curr-group-name_title elevation-1">
						{this.vDomGroupName}
						{this.vDomEditIcon}
					</div>
				</div>
			);
		}
	},
	render() {
		if (!this.groupId) {
			return <aSpin class="flex vertical middle center height100" />;
		}
		return (
			<aLayout id="GroupView" class="padding20">
				<aLayoutSider id="ViewGroup_sider" class={this.stylePanel} width="300">
					<GroupLeftSider />
				</aLayoutSider>
				<aLayout>
					<aLayoutContent
						data-app-position="Group-layout-content"
						style={this.styleContent}>
						<aTabs
							id="Group-layout-content-tabs"
							v-model:activeKey={this.tabActiveKey}
							type="card"
							centered
							class="m-tab tabs-large height100">
							{{
								leftExtra: () => {
									return this.vDomEditGroupInfo;
								},
								default: () => {
									return (
										<>
											{/* 项目列表 */}
											<aTabPane
												tab={TAB_KEY_PROJECT_LIST}
												key={TAB_KEY_PROJECT_LIST}>
												<GroupProjectList />
											</aTabPane>
											{this.vDomTabMember}
											{this.vDomTabGroupLog}
										</>
									);
								}
							}}
						</aTabs>
					</aLayoutContent>
				</aLayout>
			</aLayout>
		);
	}
});
