import { stateApp } from "@/state/app";
import { defineComponent, onMounted, reactive, watch } from "vue";
import "./MemberList.scss";
import {
	defDataGrid,
	defCol,
	xU,
	pickValueFrom,
	itemsInvalid,
	xI,
	xScope,
	defColumns,
	defItem
} from "@/ventose/ui";
import ViewAddMember from "./ViewAddMember.vue";
import { ADMIN, DEV, OWNER } from "@/utils/variable";
import { aHashLink } from "@/router/router";
import { getAvatarSrcByid } from "@/utils/common";
import { DialogUserInfo } from "@/containers/User/DialogUserInfo";

function arrayAddKey(arr) {
	return arr.map((item, index) => {
		return {
			...item,
			key: index
		};
	});
}

export const GroupMemberList = defineComponent({
	props: ["uid"],
	setup() {
		const isAuth = [OWNER, ADMIN].includes(stateApp.currGroup.role);
		var vm = {
			role: "",
			dataSource: [],
			columns: defColumns({
				name: {
					width: 300,
					headerCellRenderer: () => (
						<span class="padding">{`成员 ${vm.dataSource.length} 人`}</span>
					),
					cellRenderer({ rowData }) {
						const text = rowData.username;
						const avatarSrc = getAvatarSrcByid(rowData.uid);
						return (
							<div
								class="flex middle start ml10 pointer"
								onClick={() => vm._showMemberDetial(rowData.uid)}>
								<elAvatar src={avatarSrc} />
								<span class="ml10">{text}</span>
							</div>
						);
						return (
							<a
								class="flex middle start ml10"
								target="_blank"
								href={aHashLink("/user_profile", { user_id: rowData.uid })}>
								<elAvatar src={avatarSrc} />
								<span class="ml10">{text}</span>
							</a>
						);
					}
				},
				action: {
					headerCellRenderer: () => {
						if (isAuth) {
							return (
								<div class="btn-container">
									<xButton
										class="btn"
										type="primary"
										onClick={vm._showAddMemberDialog}>
										添加成员
									</xButton>
								</div>
							);
						} else {
							return "";
						}
					},
					fixed: "right",
					width: 200,
					cellRenderer({ rowData }) {
						if (isAuth) {
							const configs = {
								deleteBtn: {
									text: "删除",
									class: "ml10",
									async onClick() {
										try {
											await xU.deleteConfirm({
												title: "删除确认",
												content: "你确定要删除吗?"
											});
											vm._delMember(rowData.uid);
										} catch (e) {
											console.log("取消删除");
										}
									}
								}
							};

							return (
								<div class="flex">
									<xItem
										modelValue={rowData.role}
										configs={defItem({
											itemType: "Select",
											options: [
												{ label: "组长", value: OWNER },
												{ label: "开发者", value: DEV },
												{ label: "访客", value: "guest" }
											],
											onAfterEmitItemValue(role) {
												vm._changeUserRole({ member_uid: rowData.uid, role });
											}
										})}
									/>
									<xButton configs={configs.deleteBtn} />
								</div>
							);
						} else {
							const ROLE_MAP = {
								owner: xI("组长"),
								dev: xI("开发者"),
								guest: xI("访客")
							};
							// 非管理员可以看到权限 但无法修改
							return ROLE_MAP[rowData.role];
						}
					}
				}
			}),
			async _initTableColumns() {
				await xU.ensureValueDone(() => stateApp.currGroup.role);
				vm._fetchGroupMemberList();
			},
			_showMemberDetial(id) {
				xU.dialog({
					title: xI("用户信息"),
					component: DialogUserInfo,
					payload: { user_id: id }
				});
			},
			_showAddMemberDialog() {
				xU.dialog({
					title: xI("添加成员"),
					component: ViewAddMember,
					area: ["480px", "260px"],
					onOk: async ({ formItems, $close }) => {
						if (!(await itemsInvalid())) {
							const { member_uids, role } = pickValueFrom(formItems);
							try {
								await vm._addMember({ member_uids, role });
								$close();
							} catch (error) {
								xU.message.error("添加失败");
							}
						} else {
							throw new Error("未通过验证");
						}
					}
				});
			},
			// 重新获取列表
			async _fetchGroupMemberList() {
				const menbers = await stateApp._fetchGroupMemberList(
					stateApp.currGroup._id
				);

				vm.dataSource = xU.orderBy(menbers, ["username", "member"]);
			},
			// 增 - 添加成员
			async _addMember({ member_uids, role }) {
				const { data } = await stateApp._addMember({
					id: stateApp.currGroup._id,
					member_uids,
					role
				});

				const { add_members, exist_members } = data;
				const addLength = add_members.length;
				const existLength = exist_members.length;
				xU.message.success(`新增 ${addLength} 人， ${existLength} 人已存在`);
				vm._fetchGroupMemberList(); // 添加成功后重新获取分组成员列表
			},
			// 删 - 删除分组成员
			async _delMember(member_uid) {
				const id = stateApp.currGroup._id;
				const index = xU.layer.loading();
				try {
					await stateApp._delMember({ id, member_uid });
					xU.notification.success("修改成功");
					vm._fetchGroupMemberList(); // 添加成功后重新获取分组成员列表
				} catch (e) {
					console.error(e);
				} finally {
					xU.layer.loading(index);
				}
			},
			// 改 - 修改成员权限
			async _changeUserRole({ member_uid, role }) {
				const id = stateApp.currGroup._id;
				const index = xU.layer.loading();
				try {
					await stateApp._changeMemberRole({ id, member_uid, role });
					xU.notification.success("修改成功");
					vm._fetchGroupMemberList(); // 添加成功后重新获取分组成员列表
				} catch (e) {
					console.error(e);
				} finally {
					xU.layer.loading(index);
				}
			}
		};
		type t_vm = typeof vm;
		vm = xScope<t_vm>(vm);

		onMounted(() => {
			vm._initTableColumns();
		});

		return function () {
			return (
				<xTable columns={vm.columns} rows={vm.dataSource} class="el-card" />
			);
		};
	}
});
