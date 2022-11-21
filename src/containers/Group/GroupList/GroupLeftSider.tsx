import GuideBtns from "@/components/GuideBtns/GuideBtns";
import { _, AllWasWell, pickValueFrom, validateForm } from "@ventose/ui";
import { defineComponent } from "vue";
import { UI, State_UI } from "@ventose/ui";
import { API } from "@/api";
import { Methods_App, State_App } from "../../../state/State_App";
import { Cpt_url } from "../../../router/router";

import { DialogEditGroup } from "./DialogEditGroup";
import { DialogAddGroup } from "./DialogAddGroup";

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
	await Methods_App.fetchNewsData(State_App.currGroup._id, "group", 1, 10);
}

export function fnShowUpsertGroupDialog(row = {}) {
	const vm = this;
	const isUpdate = !!row._id;
	UI.dialog.component({
		title: isUpdate ? $t("修改分组信息").label : $t("添加分组").label,
		component: isUpdate ? DialogEditGroup : DialogAddGroup,
		fullscreen: isUpdate,
		row,
		area: ["580px", "460px"],
		onOk: async instance => {
			let formData = {};
			if (isUpdate) {
				const validateResults = await validateForm(instance.vm.formItems);
				if (AllWasWell(validateResults)) {
					const {
						currGroupName,
						currGroupDesc,
						custom_field1_enable,
						custom_field1_name
					} = pickValueFrom(instance.vm.formItems);
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
				const validateResults = await validateForm(instance.vm.formItems);
				if (AllWasWell(validateResults)) {
					const { newGroupName, newGroupDesc, owner_uids } = pickValueFrom(
						instance.vm.formItems
					);
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
			instance.close();
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
			configsSearch: {
				isSearch: false,
				value: "",
				placeholder: "搜索分类",
				onAfterValueChange: this.searchGroup,
				allowClear: true
			},
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
		async selectGroup({ key: groupId }) {
			const currGroup = _.find(this.State_App.groupList, { _id: +groupId });
			await Methods_App.setCurrGroup(currGroup);
			this.Cpt_url.query.group_id = currGroup._id;
			await Methods_App.fetchNewsData(groupId, "group", 1, 10);
		},
		searchGroup: _.debounce(function () {
			const { groupList } = this.State_App;
			const keywords = this.configsSearch.value;
			if (keywords === "") {
				this.groupListForShow = groupList;
			} else {
				this.groupListForShow = _.filter(groupList, group =>
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
		vDomCurrentGroupPanel() {
			return (
				<div class="curr-group">
					<div class="curr-group-name">
						<span class="curr-group-name_title name">
							{this.State_App.currGroup.group_name}
							<aTooltip title="修改分组信息">
								<xIcon
									class="btn editSet pointer"
									icon="edit"
									onClick={() =>
										this.fnShowUpsertGroupDialog(this.State_App.currGroup)
									}
									style="width:16px;"
								/>
							</aTooltip>
						</span>
					</div>
					<div class="curr-group-desc">
						简介: {this.State_App.currGroup.group_desc}
					</div>
				</div>
			);
		},
		vDomSearchInput() {
			return (
				<div class="group-operate flex center middle">
					<aTooltip title="添加分组">
						<xIcon
							class="btn editSet pointer"
							icon="addGroup"
							onClick={() => this.fnShowUpsertGroupDialog()}
							style="width:32px;height:32px;transform:translate(-12px,-4px)"
						/>
					</aTooltip>
					<div class="search">
						{/* 搜索框 */}
						<xItem configs={this.configsSearch} />
					</div>
				</div>
			);
		},
		vDomGroupList() {
			return (
				<aMenu
					class="group-list flex1"
					mode="inline"
					v-loading={this.groupListForShow.length === 0}
					onClick={this.selectGroup}
					selectedKeys={[`${this.State_App.currGroup._id}`]}>
					{_.map(this.groupListForShow, group => {
						let icon = "folderOpen";
						if (group.type === "private") {
							icon = "user";
						}
						return (
							<aMenuItem key={`${group._id}`} class="group-item flex">
								<div class="flex middle">
									<xIcon icon={icon} style="width:16px;" />
									<span>{group.group_name}</span>
								</div>
							</aMenuItem>
						);
					})}
				</aMenu>
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
