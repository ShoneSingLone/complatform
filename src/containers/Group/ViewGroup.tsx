import "./Group.scss";
import {
	GroupLeftSider,
	openDialogUpsertGroup
} from "./GroupList/GroupLeftSider";
import ProjectList from "./GroupProjectList/ProjectList";
import GroupLog from "./GroupLog/GroupLog";
import { defineComponent } from "vue";
import { Cpt_url } from "../../router/router";
import { API } from "../../api";
import { Methods_App, State_App } from "../../state/State_App";
import { GroupMemberList } from "./GroupMemberList/GroupMemberList";
import { DialogEditGroup } from "./GroupList/DialogEditGroup";
import ViewAddGroup from "./GroupList/ViewAddGroup.vue";

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
			openDialogUpsertGroup
		};
	},
	data() {
		return {
			state: {},
			styleContent: {
				height: "100%",
				margin: "0 24px 0 16px",
				overflow: "initial",
				backgroundColor: "#fff"
			}
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
				setTimeout(() => {
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
						<GroupMemberList />
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
		},
		stylePanel() {
			const isFooterFold = this.State_App.isFooterFold;
			return {
				"flex vertical": true,
				"footer-fold elevation-4": isFooterFold,
				"elevation-8": !isFooterFold
			};
		}
	},
	render() {
		if (!this.groupId) {
			return <aSpin class="flex vertical middle center height100" />;
		}

		return (
			<aLayout id="GroupView" style={{ marginLeft: "24px", marginTop: "24px" }}>
				<aLayoutSider id="ViewGroup_sider" class={this.stylePanel} width="300">
					<GroupLeftSider />
				</aLayoutSider>
				<aLayout>
					<aLayoutContent
						data-app-position="Group-layout-content"
						style={this.styleContent}>
						<aTabs
							id="Group-layout-content-tabs"
							activeKey={this.tabActiveKey}
							onUpdate:activeKey={val => (this.tabActiveKey = val)}
							type="card"
							centered
							class="m-tab tabs-large height100">
							{{
								leftExtra: () => {
									return (
										<div class="curr-group-name">
											<div class="curr-group-name_title">
												<div class="name">
													{this.State_App.currGroup.group_name}
												</div>
												<aTooltip title="修改分组信息">
													<xIcon
														class="btn editSet pointer"
														icon="edit"
														onClick={() =>
															this.openDialogUpsertGroup(
																this.State_App.currGroup
															)
														}
														style="width:16px;"
													/>
												</aTooltip>
											</div>
										</div>
									);
								},
								default: () => {
									return (
										<>
											{/* 项目列表 */}
											<aTabPane
												tab={TAB_KEY_PROJECT_LIST}
												key={TAB_KEY_PROJECT_LIST}>
												<ProjectList />
											</aTabPane>
											{this.TabMember}
											{this.TabGroupLog}
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
