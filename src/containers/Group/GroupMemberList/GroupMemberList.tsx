import { State_App, Methods_App } from "@/state/State_App";
import { defineComponent } from "vue";
import "./MemberList.scss";
import {
	defDataGridOption,
	defCol,
	State_UI,
	UI,
	defItem,
	xU,
	AllWasWell,
	pickValueFrom,
	itemsInvalid
} from "@ventose/ui";
import ViewAddMember from "./ViewAddMember.vue";
import { ADMIN, DEV, OWNER } from "@/utils/variable";

const { $t } = State_UI;

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
		return { State_App };
	},
	data() {
		const vm = this;
		return {
			state: {
				userInfo: [],
				role: ""
			},
			configs_table: defDataGridOption({
				isHidePagination: true,
				async queryTableList(params) {},
				dataSource: [],
				columns: {}
			})
		};
	},
	async mounted() {
		debugger;
		this.initTableColumns();
	},
	watch: {
		"State_App.currGroup._id": {
			immediate: true,
			handler() {
				this.fetchGroupMemberList();
			}
		}
	},
	methods: {
		initTableColumns() {
			const vm = this;
			const isAuth = [OWNER, ADMIN].includes(vm.State_App.currGroup.role);
			this.configs_table.columns = {
				...defCol({
					prop: "name",
					label: `成员 ${vm.configs_table.dataSource.length} 人`,
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
									<ElButton
										class="btn"
										type="primary"
										onClick={vm.showAddMemberDialog}>
										添加成员
									</ElButton>
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
											await UI.dialog.delete({
												title: "删除确认",
												content: "你确定要删除吗?"
											});
											vm.delMember(record.uid);
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
											vm.changeUserRole({ member_uid: record.uid, role });
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
								owner: vm.$t("组长").label,
								dev: vm.$t("开发者").label,
								guest: vm.$t("访客").label
							};
							// 非管理员可以看到权限 但无法修改
							return ROLE_MAP[record.role];
						}
					}
				})
			};
		},
		showAddMemberDialog() {
			UI.dialog.component({
				title: State_UI.$t("添加成员").label,
				component: ViewAddMember,
				area: ["480px", "260px"],
				onOk: async ({ formItems, $close }) => {
					if (!(await itemsInvalid())) {
						const { member_uids, role } = pickValueFrom(formItems);
						try {
							await this.addMember({ member_uids, role });
							$close();
						} catch (error) {
							UI.message.error("添加失败");
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
				this.State_App.currGroup._id
			);
			this.state.userInfo = arrayAddKey(menber);
		},

		// 增 - 添加成员
		async addMember({ member_uids, role }) {
			const { data } = await Methods_App.addMember({
				id: this.State_App.currGroup._id,
				member_uids,
				role
			});

			const { add_members, exist_members } = data;
			const addLength = add_members.length;
			const existLength = exist_members.length;
			UI.message.success(`新增 ${addLength} 人， ${existLength} 人已存在`);
			this.fetchGroupMemberList(); // 添加成功后重新获取分组成员列表
		},
		// 删 - 删除分组成员
		async delMember(member_uid) {
			const id = this.State_App.currGroup._id;
			const index = UI.layer.loading();
			try {
				await Methods_App.delMember({ id, member_uid });
				UI.notification.success("修改成功");
				this.fetchGroupMemberList(); // 添加成功后重新获取分组成员列表
			} catch (e) {
				console.error(e);
			} finally {
				UI.layer.loading(index);
			}
		},

		// 改 - 修改成员权限
		async changeUserRole({ member_uid, role }) {
			const id = this.State_App.currGroup._id;
			const index = UI.layer.loading();
			try {
				await Methods_App.changeMemberRole({ id, member_uid, role });
				UI.notification.success("修改成功");
				this.fetchGroupMemberList(); // 添加成功后重新获取分组成员列表
			} catch (e) {
				console.error(e);
			} finally {
				UI.layer.loading(index);
			}
		}
	},
	render() {
		let userinfo = this.state.userInfo;
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
		this.configs_table.dataSource = userinfo;
		if (this.configs_table.columns?.name) {
			this.configs_table.columns.name.title = `成员 ${userinfo.length} 人`;
		}

		return (
			<div class="m-panel">
				<xDataGrid configs={this.configs_table} />
			</div>
		);
	}
});
