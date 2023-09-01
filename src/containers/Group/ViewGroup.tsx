import "./Group.less";
import { defineComponent } from "vue";
import {
	GroupAside,
	fnShowUpsertGroupDialog,
	fnUpsertGroupInfo
} from "./GroupList/GroupAside";
import { GroupProjectList } from "./GroupProjectList/GroupProjectList";
import GroupLog from "./GroupLog/GroupLog";
import { cptRouter, aHashLink } from "@/router/router";
import { API } from "@/api";
import { stateApp } from "@/state/app";
import { GroupMemberList } from "./GroupMemberList/GroupMemberList";
import {
	ADMIN,
	DEV,
	OWNER,
	PRIVATE,
	PUBLIC,
	TAB_KEY_GROUP_LOG,
	TAB_KEY_MEMBER_LIST,
	TAB_KEY_PROJECT_LIST,
	TAB_KEY_GROUP_WIKI,
	GROUP,
	OPEN_BLANK
} from "@/utils/variable";

import { xI, xU } from "@/ventose/ui";
import { ViewWiki } from "../Wiki/ViewWiki";

/* import GroupSetting from "./GroupSetting/GroupSetting.vue"; */

export const ViewGroup = defineComponent({
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
		if (!this.cptRouter.query.group_tab) {
			this.cptRouter.query.group_tab = TAB_KEY_PROJECT_LIST;
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
					this.cptRouter.query.group_id = group._id;
				} else {
					await stateApp._setCurrGroup(this.groupId);
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
				/* "成员列表" */
				return (
					<div class="mt flex1 h1px">
						<GroupMemberList />
					</div>
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
		vDomTabGroupWiki() {
			if (this.currTabName !== TAB_KEY_GROUP_WIKI) {
				return null;
			}
			return <ViewWiki belongType={GROUP} style="margin: 0 -10px -10px;" />;
		},
		vDomSwitchPanel() {
			let btnArray = [
				TAB_KEY_PROJECT_LIST,
				TAB_KEY_MEMBER_LIST,
				TAB_KEY_GROUP_LOG,
				TAB_KEY_GROUP_WIKI
			];

			if (this.stateApp.currGroup.type === PRIVATE) {
				btnArray = [
					TAB_KEY_PROJECT_LIST,
					TAB_KEY_GROUP_LOG,
					TAB_KEY_GROUP_WIKI
				];
			}

			return (
				<div class="flex middle start">
					<el-button-group class="ml-4">
						{xU.map(btnArray, name => {
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
							return (
								<xButton
									v-xTips={tips}
									type={type}
									onClick={() => (this.currTabName = name)}>
									{name}
								</xButton>
							);
						})}
					</el-button-group>
					<xGap f="1" />
				</div>
			);
		}
	},
	render() {
		return (
			<section id="ViewGroup" v-xloading={!this.groupId}>
				<aside id="ViewGroup_sider" class="flex vertical box-shadow">
					<GroupAside />
				</aside>
				<section class="view-main-section box-shadow flex1">
					{this.vDomSwitchPanel}
					{this.vDomTabProjectList}
					{this.vDomTabMember}
					{this.vDomTabGroupLog}
					{this.vDomTabGroupWiki}
				</section>
			</section>
		);
	}
});
