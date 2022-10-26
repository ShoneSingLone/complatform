import { ErrMsg } from "@/components/ErrMsg/ErrMsg";
import UsernameAutoComplete from "@/components/UsernameAutoComplete/UsernameAutoComplete";
import { State_App, Methods_App } from "@/state/State_App";
import { defineComponent } from "vue";
import "./MemberList.scss";
import { RouterLink } from "vue-router";

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
		return {
			state: {
				userInfo: [],
				role: "",
				visible: false,
				dataSource: [],
				inputUids: [],
				inputRole: "dev"
			}
		};
	},
	async mounted() {
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
		const columns = [
			{
				title: `${this.State_App.currGroup.group_name} 分组成员 (${this.state.userInfo.length}) 人`,
				dataIndex: "username",
				key: "username",
				render: (text, record) => {
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
								<p class="m-user-name">{text}</p>
							</RouterLink>
						</div>
					);
				}
			},
			{
				title:
					this.state.role === "owner" || this.state.role === "admin" ? (
						<div class="btn-container">
							<aButton
								class="btn"
								type="primary"
								onClick={this.showAddMemberModal}>
								添加成员
							</aButton>
						</div>
					) : (
						""
					),
				key: "action",
				className: "member-opration",
				render: (text, record) => {
					if (this.state.role === "owner" || this.state.role === "admin") {
						return (
							<div>
								<aSelect
									value={record.role + "-" + record.uid}
									class="select"
									onChange={this.changeUserRole}>
									<aOption value={"owner-" + record.uid}>组长</aOption>
									<aOption value={"dev-" + record.uid}>开发者</aOption>
									<aOption value={"guest-" + record.uid}>访客</aOption>
								</aSelect>
								<aPopconfirm
									placement="topRight"
									title="你确定要删除吗? "
									onConfirm={this.deleteConfirm(record.uid)}
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
			}
		];
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
				<aTable
					columns={columns}
					dataSource={userinfo}
					pagination={false}
					locale={{ emptyText: <ErrMsg type="noMemberInGroup" /> }}
				/>
			</div>
		);
	}
});
