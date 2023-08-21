import GuideBtns from "@/components/GuideBtns/GuideBtns";
import {
	xU,
	AllWasWell,
	pickValueFrom,
	isItemInvalid,
	defItem
} from "@ventose/ui";
import { defineComponent } from "vue";
import { UI, State_UI } from "@ventose/ui";
import { API } from "@/api";
import { Methods_App, State_App } from "@/state/State_App";
import { DialogEditGroup } from "./DialogEditGroup";
import { DialogAddGroup } from "./DialogAddGroup";
import { Cpt_url } from "./../../../router/router";
import { ADMIN, OWNER, PRIVATE } from "@/utils/variable";

const { $t } = State_UI;

export async function fnUpsertGroupInfo(formData = {}) {
	const { id } = formData;
	if (id) {
		await API.group.updateGroup(formData);
	} else {
		await API.group.addGroup(formData);
	}
	/*TODO:*/
	await Methods_App.fetchGroupList();
	await Methods_App.setCurrGroup(State_App.currGroup._id);
	await Methods_App.fetchNewsData({
		id: State_App.currGroup._id,
		type: "group"
	});
}

export function fnShowUpsertGroupDialog(row = {}) {
	const vm = this;
	const isUpdate = !!row._id;
	UI.dialog.component({
		title: isUpdate ? $t("修改分组信息").label : $t("添加分组").label,
		component: isUpdate ? DialogEditGroup : DialogAddGroup,
		// fullscreen: true,
		maxmin: true,
		row,
		area: (() => {
			if (isUpdate) {
				if (State_App.user.role === ADMIN) {
					return ["840px", "648px"];
				} else {
					return ["840px", "448px"];
				}
			} else {
				return ["580px", "460px"];
			}
		})(),
		onOk: async ({ formItems, closeDialog }) => {
			let formData = {};
			if (isUpdate) {
				if (!(await isItemInvalid())) {
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
					throw new Error("未通过验证");
				}
			} else {
				if (!(await isItemInvalid())) {
					const { newGroupName, newGroupDesc, owner_uids } =
						pickValueFrom(formItems);
					formData = {
						group_name: newGroupName,
						group_desc: newGroupDesc,
						owner_uids: owner_uids
					};
				} else {
					throw new Error("未通过验证");
				}
			}
			await vm.fnUpsertGroupInfo(formData);
			closeDialog();
		}
	});
}

const tip = (
	<div class="title-container">
		<h3 class="title">欢迎使用 YApi ~</h3>
		<p>
			这里的 <b>“个人空间”</b>{" "}
			是你自己才能看到的分组，你拥有这个分组的全部权限，可以在这个分组里探索
			YApi 的功能。
		</p>
	</div>
);

export const GroupLeftSider = defineComponent({
	props: [
		"groupList",
		"currGroup",
		"fetchGroupList",
		"setCurrGroup",
		"setGroupList",
		"match",
		"history",
		"State_App.user.role",
		"State_App.user.roleInGroup",
		"studyTip",
		"study",
		"fetchNewsData",
		"setCurrGroup"
	],
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
			configsSearch: defItem({
				isSearch: false,
				value: "",
				placeholder: "搜索分类",
				onAfterEmitItemValue: this.searchGroup,
				allowClear: true
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
		await Methods_App.setCurrGroup(this.State_App.currGroup._id);
	},
	methods: {
		async initGroupList() {
			try {
				await Methods_App.fetchGroupList();
				this.searchGroup();
			} catch (error) {
				console.error(error);
			}
		},
		async selectGroup(groupId) {
			await Methods_App.setCurrGroup(groupId);
			this.Cpt_url.go("/group", { group_id: groupId });
			await Methods_App.fetchNewsData({ id: groupId, type: "group" });
		},
		searchGroup: xU.debounce(function () {
			const { groupList } = State_App;
			const keywords = this.configsSearch.value;
			if (keywords === "") {
				this.groupListForShow = groupList;
			} else {
				this.groupListForShow = xU.filter(groupList, group =>
					new RegExp(keywords, "i").test(group.group_name)
				);
			}
		}, 300)
	},
	watch: {
		"State_App.groupList"() {
			this.searchGroup();
		}
	},
	computed: {
		vDomSearchInput() {
			return (
				<div class="group-operate flex center middle">
					<ElTooltip content="添加分组">
						<xIcon
							class="btn editSet pointer"
							icon="addGroup"
							onClick={() => this.fnShowUpsertGroupDialog()}
							style="width:32px;height:32px;transform:translate(-12px,-4px)"
						/>
					</ElTooltip>
					<div class="search">
						{/* 搜索框 */}
						<xItem configs={this.configsSearch} />
					</div>
				</div>
			);
		},
		vDomGroupList() {
			const vm = this;
			return (
				<ElMenu
					class="group-list flex1"
					mode="inline"
					v-xloading={this.groupListForShow.length === 0}>
					{xU.map(this.groupListForShow, group => {
						let icon = "icon_group";
						if (group.type === PRIVATE) {
							icon = "user";
						}

						const vDomEditGroup = (() => {
							/*个人空间不可修改name*/
							/*当前用户在当前group的角色是owner*/
							const isGroupRoleAuth = group.role === OWNER;
							/*超级管理员*/
							const isUserRoleAuth = this.State_App.user.role === ADMIN;

							if (isGroupRoleAuth || isUserRoleAuth) {
								return (
									<xIcon
										v-uiPopover={{
											content: vm.$t("修改分组信息").label,
											placement: "bottom"
										}}
										class="group-menu-icon editSet pointer"
										icon="edit"
										onClick={() => {
											vm.fnShowUpsertGroupDialog(group);
										}}
										style="width:16px;"
									/>
								);
							}
						})();

						return (
							<ElMenuItem
								class={{
									"group-item flex": true,
									active: State_App.currGroup._id === group._id
								}}>
								<div class="flex middle width100">
									<div
										class="flex1 flex middle"
										style="width:1px;"
										onClick={() => this.selectGroup(group._id)}>
										<xIcon icon={icon} style="width:16px;margin-right:4px" />
										<div class="group-menu-item_title ellipsis">
											{group.group_name}
										</div>
									</div>
									{!!group.group_desc && (
										<xIcon
											v-uiPopover={{
												content: group.group_desc
											}}
											class="group-menu-icon editSet pointer ml10 mr10"
											icon="insideTips"
										/>
									)}
									{vDomEditGroup}
								</div>
							</ElMenuItem>
						);
					})}
				</ElMenu>
			);
		}
	},
	render() {
		return (
			<div class="m-group flex1 height100">
				<div class="group-bar flex vertical">
					{this.vDomSearchInput}
					{/* 左侧 分组列表 leftside  */}
					{this.vDomGroupList}
				</div>
			</div>
		);
	}
});
