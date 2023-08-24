import {
	xU,
	pickValueFrom,
	itemsInvalid,
	defItem,
	xI,
	stateUI
} from "@/ventose/ui";
import { defineComponent } from "vue";
import { API } from "@/api";
import { Methods_App, stateApp } from "@/state/app";
import { DialogEditGroup } from "./DialogEditGroup";
import { DialogAddGroup } from "./DialogAddGroup";
import { Cpt_url } from "@/router/router";
import { ADMIN, OWNER, PRIVATE } from "@/utils/variable";

export async function fnUpsertGroupInfo(formData = {}) {
	const { id } = formData;
	if (id) {
		await API.group.updateGroup(formData);
	} else {
		await API.group.addGroup(formData);
	}
	/*TODO:*/
	await Methods_App.fetchGroupList();
	await Methods_App.setCurrGroup(stateApp.currGroup._id);
	await Methods_App.fetchNewsData({
		id: stateApp.currGroup._id,
		type: "group"
	});
}

export function fnShowUpsertGroupDialog(row = {}) {
	const vm = this;
	const isUpdate = !!row._id;
	xU.openDialog({
		title: isUpdate ? xI("修改分组信息").label : xI("添加分组"),
		component: isUpdate ? DialogEditGroup : DialogAddGroup,
		// fullscreen: true,
		maxmin: true,
		row,
		area: (() => {
			if (isUpdate) {
				if (stateApp.user.role === ADMIN) {
					return ["840px", "648px"];
				} else {
					return ["840px", "448px"];
				}
			} else {
				return ["580px", "460px"];
			}
		})(),
		onOk: async ({ formItems, $close }) => {
			let formData = {};
			if (isUpdate) {
				if (!(await itemsInvalid())) {
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
				if (!(await itemsInvalid())) {
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
			$close();
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
		"height",
		"groupList",
		"currGroup",
		"fetchGroupList",
		"setCurrGroup",
		"setGroupList",
		"match",
		"history",
		"stateApp.user.role",
		"stateApp.user.roleInGroup",
		"studyTip",
		"study",
		"fetchNewsData",
		"setCurrGroup"
	],
	setup() {
		return {
			Cpt_url,
			stateApp,
			fnShowUpsertGroupDialog,
			fnUpsertGroupInfo
		};
	},
	data() {
		const vm = this;
		vm.searchGroup = xU.debounce(() => {
			const { groupList } = stateApp;
			const keywords = vm.configsSearch.value;
			let groupListForShow;

			if (keywords === "") {
				const { true: notInGroup, undefined: inGroup } = xU.groupBy(
					groupList,
					"notInGroup"
				);
				const { owner, member } = xU.groupBy(inGroup, "role");
				const { true: privateSpace, undefined: otherOwner } = xU.groupBy(
					owner,
					"privateSpace"
				);
				groupListForShow = [
					{
						...privateSpace[0],
						icon: "icon_group_personal"
					},
					{
						group_name: "分组成员",
						icon: "icon_group_include",
						children: [
							{
								group_name: "所有者",
								icon: "icon_group_include_owner",
								children: xU.map(otherOwner, i => ({
									...i,
									icon: "icon_group_include_owner"
								}))
							},
							{
								group_name: "开发者",
								icon: "icon_group_include_member",
								children: xU.map(member, i => ({
									...i,
									icon: "icon_group_include_member"
								}))
							}
						]
					},
					{
						group_name: "非分组成员",
						icon: "icon_group_exclude",
						children: xU.map(notInGroup, i => ({
							...i,
							icon: "icon_group_exclude"
						}))
					}
				];
			} else {
				groupListForShow = xU.filter(groupList, group =>
					new RegExp(keywords, "i").test(group.group_name)
				);
			}

			vm.groupListForShow = groupListForShow;
		}, 300);

		return {
			elScrollbarHeight: 0,
			resizeAside: {
				onMoving({ clickEvent, movingEvent, clickInfo }) {
					const { left: leftStart } = clickInfo;
					let left = 16 + leftStart + movingEvent.clientX - clickEvent.clientX;
					if (left < 100) {
						left = 100;
					}
					vm.styleAside.width = `${left}px`;
				}
			},
			styleAside: {
				width: "300px",
				position: "relative"
			},
			/* ******** */
			configsSearch: defItem({
				isSearch: false,
				value: "",
				placeholder: "搜索分组",
				onAfterEmitItemValue: this.searchGroup,
				clearable: true
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
		await Methods_App.setCurrGroup(this.stateApp.currGroup._id);
	},
	methods: {
		setElScrollbarHeight: xU.debounce(function ({ height }) {
			/* mt mb 共计20 */
			this.elScrollbarHeight = height;
		}, 300),
		async initGroupList() {
			try {
				await Methods_App.fetchGroupList();
				this.searchGroup();
			} catch (error) {
				console.error(error);
			}
		},
		async selectGroup(groupId) {
			if (!groupId) {
				return;
			}
			await Methods_App.setCurrGroup(groupId);
			this.Cpt_url.go("/group", { group_id: groupId });
			await Methods_App.fetchNewsData({ id: groupId, type: "group" });
		},
		getVDomIconEdit({ group }) {
			const vm = this;
			/*个人空间不可修改name*/
			/*当前用户在当前group的角色是owner*/
			const isGroupRoleAuth = group.role === OWNER;
			/*超级管理员*/
			const isUserRoleAuth = stateApp.user.role === ADMIN;

			if (isGroupRoleAuth || isUserRoleAuth) {
				return (
					<xIcon
						v-xTips={{
							content: xI("修改分组信息"),
							placement: "top"
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
		},
		getVDomGroupName({ group }) {
			return (
				<div
					class="flex1 flex middle"
					onClick={() => this.selectGroup(group._id)}>
					<xIcon class="x-sider-tree_menu_icon" icon={group.icon} />
					<div class="x-sider-tree_menu_title">{group.group_name}</div>
				</div>
			);
		},
		getVDomIconDesc({ group }) {
			if (!!group.group_desc) {
				return (
					<xIcon
						v-xTips={{
							content: group.group_desc
						}}
						class="x-sider-tree_menu_icon"
						icon="insideTips"
					/>
				);
			} else {
				return null;
			}
		},
		getGroupItemClass({ group }) {
			return {
				"x-sider-tree_menu": true,
				"x-sider-tree_menu_active":
					stateApp.currGroup._id && xU.isSame(stateApp.currGroup._id, group._id)
			};
		}
	},
	watch: {
		"stateApp.groupList"() {
			this.searchGroup();
		}
	},
	computed: {
		vDomSearchInput() {
			return (
				<div class="group-operate flex start middle">
					{/* 搜索框 */}
					<xItem configs={this.configsSearch} class="flex1" />
					<xGap l="10" />
					<div
						class="btn editSet pointer"
						onClick={() => this.fnShowUpsertGroupDialog()}
						v-xTips={{ content: "添加分组" }}>
						<xIcon icon="add" style="width:16px;height:16px;" />
					</div>
				</div>
			);
		}
	},
	render() {
		const vm = this;

		return (
			<aside class="x-sider_wrapper" style={this.styleAside}>
				{this.vDomSearchInput}
				<div
					class="x-sider_wrapper_tree"
					v-element-size={this.setElScrollbarHeight}>
					<ElScrollbar height={this.elScrollbarHeight}>
						<ElTree
							v-xloading={vm.groupListForShow.length === 0}
							v-model:expandedKeys={stateApp.expandedKeys.group}
							data={vm.groupListForShow}
							node-key="_id"
							expand-on-click-node={false}
							default-expand-all>
							{{
								default({ data: group }) {
									return (
										<div class={vm.getGroupItemClass({ group })}>
											{vm.getVDomGroupName({ group })}
											<div class="x-sider-tree_menu_opration">
												{vm.getVDomIconDesc({ group })}
												{vm.getVDomIconEdit({ group })}
											</div>
										</div>
									);
								}
							}}
						</ElTree>
					</ElScrollbar>
				</div>
				<div class="resize_bar" icon="scroll" v-uiMove={this.resizeAside} />
			</aside>
		);
	}
});
