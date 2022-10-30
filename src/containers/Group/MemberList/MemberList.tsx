import { ErrMsg } from "@/components/ErrMsg/ErrMsg";
import UsernameAutoComplete from "@/components/UsernameAutoComplete/UsernameAutoComplete";
import { State_App, Methods_App } from "@/state/State_App";
import { defineComponent } from "vue";
import "./MemberList.scss";
import { RouterLink } from "vue-router";
import { defDataGridOption, defCol, State_UI, defItem } from "@ventose/ui";

const { $t } = State_UI;

function arrayAddKey(arr) {
	return arr.map((item, index) => {
		return {
			...item,
			key: index
		};
	});
}

export default defineComponent({
	props: [
		"currGroup",
		"uid",
		"fetchGroupMemberList",
		"setCurrGroup",
		"addMember",
		"delMember",
		"changeMemberRole",
		"role"
	],
	setup() {
		return { State_App };
	},
	data() {
		const vm = this;
		return {
			state: {
				userInfo: [],
				role: "",
				visible: false,
				dataSource: [],
				inputUids: [],
				inputRole: "dev"
			},
			configs_table: defDataGridOption({
				async queryTableList(params) {},
				dataSource: [],
				columns: {}
			})
		};
	},
	async mounted() {
		const vm = this;
		this.initTableColumns();
		await Methods_App.setCurrGroup(this.State_App.currGroup._id);
		await this.fetchList();

		this.$watch(
			() => {
				return this._groupId + this.State_App.currGroup._id;
			},
			() => {
				if (this._groupId !== this._groupId) {
					return null;
				}
				if (this.State_App.currGroup._id !== nextProps.currGroup._id) {
					Methods_App.fetchGroupMemberList(nextProps.currGroup._id).then(
						res => {
							this.setState({
								userInfo: arrayAddKey(res.payload.data.data)
							});
						}
					);
					Methods_App.setCurrGroup(nextProps.currGroup._id).then(res => {
						this.setState({
							role: res.payload.data.data.role
						});
					});
				}
			}
		);
	},
	methods: {
		initTableColumns() {
			const vm = this;
			this.configs_table.columns = {
				...defCol({
					prop: "name",
					label: `${vm.State_App.currGroup.group_name} 分组成员 (${vm.state.userInfo.length}) 人`,
					renderCell({ record }) {
						const text = record.username;
						return (
							<div class="m-user">
								<RouterLink to={`/user/profile/${record.uid}`}>
									<img
										src={
											location.protocol +
											"//" +
											location.host +
											"/api/user/avatar?uid=" +
											record.uid
										}
										class="m-user-img"
									/>
								</RouterLink>
								<RouterLink to={`/user/profile/${record.uid}`}>
									<p class="m-user-name">
										{text}
										<span>{vm.state.role}</span>
									</p>
								</RouterLink>
							</div>
						);
					}
				}),
				...defCol({
					prop: "action",
					label: (() => {
						if (vm.state.role === "owner" || vm.state.role === "admin") {
							return (
								<div class="btn-container">
									<aButton
										className="btn"
										type="primary"
										onClick={this.showAddMemberModal}>
										添加成员
									</aButton>
								</div>
							);
						} else {
							return "";
						}
					})(),
					renderCell({ record }) {
						console.log(vm.state.role);
						if (vm.state.role === "owner" || vm.state.role === "admin") {
							const configs = {
								...defItem({
									value: [],
									prop: "AuthSelect",
									label: $t("类型").label,
									itemType: "Select",
									options: [
										{ label: "组长", value: "owner-" + record.uid },
										{ label: "开发者", value: "dev-" + record.uid },
										{ label: "访客", value: "guest-" + record.uid }
									],
									mode: "multiple",
									maxTagCount: 1,
									maxTagTextLength: 10,
									style: { width: "200px" }
								})
							};
							debugger;
							return (
								<div>
									<xItem configs={configs.AuthSelect} />
									<aSelect
										value={record.role + "-" + record.uid}
										class="select"
										onChange={vm.changeUserRole}>
										<aOption value={"owner-" + record.uid}>组长</aOption>
										<aOption value={"dev-" + record.uid}>开发者</aOption>
										<aOption value={"guest-" + record.uid}>访客</aOption>
									</aSelect>
									<aPopconfirm
										placement="topRight"
										title="你确定要删除吗? "
										onConfirm={vm.deleteConfirm(record.uid)}
										okText="确定"
										cancelText="">
										<aButton type="danger" icon="delete" class="btn-danger" />
										{/* <xIcon icon="delete" class="btn-danger"/> */}
									</aPopconfirm>
								</div>
							);
						} else {
							// 非管理员可以看到权限 但无法修改
							if (record.role === "owner") {
								return "组长";
							} else if (record.role === "dev") {
								return "开发者";
							} else if (record.role === "guest") {
								return "访客";
							} else {
								return "";
							}
						}
					}
				})
			};
		},
		showAddMemberModal() {
			this.setState({
				visible: true
			});
		},

		// 重新获取列表
		async fetchList() {
			const menber = await Methods_App.fetchGroupMemberList(
				this.State_App.currGroup._id
			);
			this.state.userInfo = arrayAddKey(menber);
		},

		// 增 - 添加成员
		handleOk() {
			Methods_App.addMember({
				id: this.State_App.currGroup._id,
				member_uids: this.state.inputUids,
				role: this.state.inputRole
			}).then(res => {
				if (!res.payload.data.errcode) {
					const { add_members, exist_members } = res.payload.data.data;
					const addLength = add_members.length;
					const existLength = exist_members.length;
					this.setState({
						inputRole: "dev",
						inputUids: []
					});
					message.success(
						`添加成功! 已成功添加 ${addLength} 人，其中 ${existLength} 人已存在`
					);
					this.fetchList(); // 添加成功后重新获取分组成员列表
				}
			});
		},
		// 添加成员时 选择新增成员权限

		changeNewMemberRole(value) {
			debugger;
			this.setState({
				inputRole: value
			});
		},

		// 删 - 删除分组成员

		deleteConfirm(member_uid) {
			return () => {
				const id = this.State_App.currGroup._id;
				Methods_App.delMember({ id, member_uid }).then(res => {
					if (!res.payload.data.errcode) {
						message.success(res.payload.data.errmsg);
						this.fetchList(); // 添加成功后重新获取分组成员列表
					}
				});
			};
		},

		// 改 - 修改成员权限
		changeUserRole(e) {
			const id = this.State_App.currGroup._id;
			const role = e.split("-")[0];
			const member_uid = e.split("-")[1];
			Methods_App.changeMemberRole({ id, member_uid, role }).then(res => {
				if (!res.payload.data.errcode) {
					message.success(res.payload.data.errmsg);
					this.fetchList(); // 添加成功后重新获取分组成员列表
				}
			});
		},

		// 关闭模态框

		handleCancel() {
			this.setState({
				visible: false
			});
		},

		onUserSelect(uids) {
			this.setState({
				inputUids: uids
			});
		}
	},
	render() {
		let userinfo = this.state.userInfo;
		let ownerinfo = [];
		let devinfo = [];
		let guestinfo = [];
		for (let i = 0; i < userinfo.length; i++) {
			if (userinfo[i].role === "owner") {
				ownerinfo.push(userinfo[i]);
			}
			if (userinfo[i].role === "dev") {
				devinfo.push(userinfo[i]);
			}
			if (userinfo[i].role === "guest") {
				guestinfo.push(userinfo[i]);
			}
		}
		userinfo = [...ownerinfo, ...devinfo, ...guestinfo];
		this.configs_table.dataSource = userinfo;

		return (
			<div class="m-panel">
				{this.state.visible ? (
					<aModal
						title="添加成员"
						visible={this.state.visible}
						onOk={this.handleOk}
						onCancel={this.handleCancel}>
						<aRow gutter={6} class="modal-input">
							<aCol span="5">
								<div class="label usernamelabel">用户名:</div>
							</aCol>
							<aCol span="15">
								<UsernameAutoComplete callbackState={this.onUserSelect} />
							</aCol>
						</aRow>
						<aRow gutter={6} class="modal-input">
							<aCol span="5">
								<div class="label usernameauth">权限:</div>
							</aCol>
							<aCol span="15">
								<aSelect
									defaultValue="dev"
									class="select"
									onChange={this.changeNewMemberRole}>
									<aOption value="owner">组长</aOption>
									<aOption value="dev">开发者</aOption>
									<aOption value="guest">访客</aOption>
								</aSelect>
							</aCol>
						</aRow>
					</aModal>
				) : (
					""
				)}
				{/*<aTable columns={columns} dataSource={userinfo} pagination={false} locale={{emptyText: <ErrMsg type="noMemberInGroup"/>}}/>*/}
				<xDataGrid configs={this.configs_table} />
			</div>
		);
	}
});
