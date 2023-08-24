import { Methods_App, stateApp } from "@/state/app";
import { defineComponent, onMounted, reactive } from "vue";
import "./MemberList.scss";
import {
	defDataGridOption,
	defCol,
	stateUI,
	 xU, defItem,
	AllWasWell,
	pickValueFrom,
	itemsInvalid,
	xI
} from "@/ventose/ui";
import ViewAddMember from "./ViewAddMember.vue";
import { ADMIN, DEV, OWNER } from "@/utils/variable";

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
		const state = reactive({
			userInfo: [],
			role: "",
			configs_table: defDataGridOption({
				isHidePagination: true,
				async queryTableList(params) {},
				dataSource: [],
				columns: {}
			})
		});

		const methods = {
			async initTableColumns() {
				await xU.ensureValueDone(() => stateApp.currGroup.role);
				const isAuth = [OWNER, ADMIN].includes(stateApp.currGroup.role);
				state.configs_table.columns = {
					...defCol({
						prop: "name",
						label: `成员 ${state.configs_table.dataSource.length} 人`,
						renderCell({ record }) {
							const text = record.username;
							const imgSrc = `${location.protocol}//${location.host}/api/user/avatar?uid=${record.uid}`;
							return (
								<div class="m-user">
									<div to={`/user/profile/${record.uid}`}>
										<img src={imgSrc} class="m-user-img" />
									</div>
									<div to={`/user/profile/${record.uid}`}>
										<p class="m-user-name">
											<span>{text}</span>
										</p>
									</div>
								</div>
							);
						}
					}),
					...defCol({
						prop: "action",
						label: (() => {
							if (isAuth) {
								return (
									<div class="btn-container">
										<xButton
											class="btn"
											type="primary"
											onClick={methods.showAddMemberDialog}>
											添加成员
										</xButton>
									</div>
								);
							} else {
								return "";
							}
						})(),
						renderCell({ record }) {
							if (isAuth) {
								const configs = {
									deleteBtn: {
										text: "删除",
										class: "ml10",
										async onClick() {
											try {
												await xU.dialog.delete({
													title: "删除确认",
													content: "你确定要删除吗?"
												});
												methods.delMember(record.uid);
											} catch (e) {
												console.log("取消删除");
											}
										}
									}
								};

								return (
									<div class="flex">
										<ElSelect
											value={record.role}
											onChange={role => {
												changeUserRole({ member_uid: record.uid, role });
											}}
											options={[
												{ label: "组长", value: OWNER },
												{ label: "开发者", value: DEV },
												{ label: "访客", value: "guest" }
											]}></ElSelect>
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
								return ROLE_MAP[record.role];
							}
						}
					})
				};
				methods.fetchGroupMemberList();
			},
			showAddMemberDialog() {
				xU.openDialog({
					title: xI("添加成员"),
					component: ViewAddMember,
					area: ["480px", "260px"],
					onOk: async ({ formItems, $close }) => {
						if (!(await itemsInvalid())) {
							const { member_uids, role } = pickValueFrom(formItems);
							try {
								await state.addMember({ member_uids, role });
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
			async fetchGroupMemberList() {
				const menber = await Methods_App.fetchGroupMemberList(
					stateApp.currGroup._id
				);
				state.userInfo = arrayAddKey(menber);
			},
			// 增 - 添加成员
			async addMember({ member_uids, role }) {
				const { data } = await Methods_App.addMember({
					id: stateApp.currGroup._id,
					member_uids,
					role
				});

				const { add_members, exist_members } = data;
				const addLength = add_members.length;
				const existLength = exist_members.length;
				xU.message.success(`新增 ${addLength} 人， ${existLength} 人已存在`);
				methods.fetchGroupMemberList(); // 添加成功后重新获取分组成员列表
			},
			// 删 - 删除分组成员
			async delMember(member_uid) {
				const id = stateApp.currGroup._id;
				const index = xU.layer.loading();
				try {
					await Methods_App.delMember({ id, member_uid });
					xU.notification.success("修改成功");
					methods.fetchGroupMemberList(); // 添加成功后重新获取分组成员列表
				} catch (e) {
					console.error(e);
				} finally {
					xU.layer.loading(index);
				}
			},

			// 改 - 修改成员权限
			async changeUserRole({ member_uid, role }) {
				const id = stateApp.currGroup._id;
				const index = xU.layer.loading();
				try {
					await Methods_App.changeMemberRole({ id, member_uid, role });
					xU.notification.success("修改成功");
					methods.fetchGroupMemberList(); // 添加成功后重新获取分组成员列表
				} catch (e) {
					console.error(e);
				} finally {
					xU.layer.loading(index);
				}
			}
		};

		onMounted(() => {
			methods.initTableColumns();
		});

		return function () {
			return (
				<>
					{state.configs_table.dataSource.length}
					<xDataGrid configs={state.configs_table} />
				</>
			);
		};
	},
	watch: {
		userInfo() {
			let userinfo = state.userInfo;
			let ownerinfo = [];
			let devinfo = [];
			let guestinfo = [];
			for (let i = 0; i < userinfo.length; i++) {
				if (userinfo[i].role === OWNER) {
					ownerinfo.push(userinfo[i]);
				}
				if (userinfo[i].role === DEV) {
					devinfo.push(userinfo[i]);
				}
				if (userinfo[i].role === "guest") {
					guestinfo.push(userinfo[i]);
				}
			}
			userinfo = [...ownerinfo, ...devinfo, ...guestinfo];

			state.configs_table.dataSource = userinfo;
			if (state.configs_table.columns?.name) {
				state.configs_table.columns.name.title = `成员 ${userinfo.length} 人`;
			}
		}
	}
});
