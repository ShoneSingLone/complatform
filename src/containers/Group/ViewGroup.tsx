import "./Group.less";
import { defineComponent } from "vue";
import {
	GroupLeftSider,
	fnShowUpsertGroupDialog,
	fnUpsertGroupInfo
} from "./GroupList/GroupLeftSider";
import { GroupProjectList } from "./GroupProjectList/GroupProjectList";
import GroupLog from "./GroupLog/GroupLog";
import { Cpt_url, aHashLink } from "@/router/router";
import { API } from "@/api";
import { Methods_App, stateApp } from "@/state/app";
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

import { xI, xU } from "@/ventose/ui";

/* import GroupSetting from "./GroupSetting/GroupSetting.vue"; */

export const ViewGroup = defineComponent({
	setup() {
		return {
			Cpt_url,
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
		currTabName: {
			get() {
				const { group_tab } = this.Cpt_url.query;
				if (TAB_KEY_ARRAY.includes(group_tab)) {
					return group_tab;
				}
				return TAB_KEY_PROJECT_LIST;
			},
			set(group_tab) {
				this.Cpt_url.query.group_tab = group_tab;
			}
		},
		vDomTabMember() {
			if (this.currTabName !== TAB_KEY_MEMBER_LIST) {
				return null;
			}
			if (this.stateApp.currGroup.type === PUBLIC) {
				return (
					/* "成员列表" */
					<GroupMemberList />
				);
			} else {
				return null;
			}
		},
		vDomTabGroupLog() {
			if (this.currTabName !== TAB_KEY_GROUP_LOG) {
				return null;
			}
			const isGroupRoleAuth = [ADMIN, OWNER, DEV].includes(
				this.stateApp?.currGroup?.role
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
			if (this.currTabName !== TAB_KEY_PROJECT_LIST) {
				return null;
			}
			return <GroupProjectList />;
		},
		vDomSwitchPanel() {
			let btnArray = [
				TAB_KEY_PROJECT_LIST,
				TAB_KEY_MEMBER_LIST,
				TAB_KEY_GROUP_LOG
			];

			if (this.stateApp.currGroup.type === PRIVATE) {
				btnArray = [TAB_KEY_PROJECT_LIST, TAB_KEY_GROUP_LOG];
			}

			return (
				<div class="flex middle start">
					<el-button-group class="ml-4">
						{xU.map(btnArray, name => {
							const type = this.currTabName === name ? "primary" : "";
							return (
								<xButton type={type} onClick={() => (this.currTabName = name)}>
									{name}
								</xButton>
							);
						})}
					</el-button-group>
					<xGap f="1" />
					<a
						class="flex middle"
						href={aHashLink("/wiki_all", {})}
						target="_black"
						v-xTips={{ content: xI("分组文档") }}>
						<xIcon icon="wikidoc" />
					</a>
				</div>
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
