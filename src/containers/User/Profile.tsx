import axios from "axios";
import { formatTime } from "../../common.js";
import { setBreadcrumb, setImageUrl } from "../../reducer/modules/user";
import Select from "@/element/ui/xForm/itemRenders/Select.jsx";
import { ADMIN } from "@/utils/variable.jsx";

const EditButton = props => {
	const { isAdmin, isOwner, onClick, name, admin } = props;
	if (isOwner) {
		// 本人
		if (admin) {
			return null;
		}
		return (
			<ElButton
				icon="edit"
				onClick={() => {
					onClick(name, true);
				}}>
				修改
			</ElButton>
		);
	} else if (isAdmin) {
		// 管理员
		return (
			<ElButton
				icon="edit"
				onClick={() => {
					onClick(name, true);
				}}>
				修改
			</ElButton>
		);
	} else {
		return null;
	}
};
EditButton.propTypes = {
	isAdmin: PropTypes.bool,
	isOwner: PropTypes.bool,
	onClick: PropTypes.func,
	name: PropTypes.string,
	admin: PropTypes.bool
};

@connect(
	state => {
		return {
			curUid: state.user.uid,
			userType: state.user.type,
			curRole: state.user.role
		};
	},
	{
		setBreadcrumb
	}
)
class Profile extends Component {
	static propTypes = {
		match: PropTypes.object,
		curUid: PropTypes.number,
		userType: PropTypes.string,
		setBreadcrumb: PropTypes.func,
		curRole: PropTypes.string,
		upload: PropTypes.bool
	};

	constructor(props) {
		super(props);
		this.state = {
			usernameEdit: false,
			emailEdit: false,
			secureEdit: false,
			roleEdit: false,
			userinfo: {}
		};
	}

	componentDidMount() {
		this._uid = this.$route.params.uid;
		this.handleUserinfo(this.props);
	}

	componentWillReceiveProps(nextProps) {
		if (!nextProps.match.params.uid) {
			return;
		}
		if (this._uid !== nextProps.match.params.uid) {
			this.handleUserinfo(nextProps);
		}
	}

	handleUserinfo(props) {
		const uid = props.match.params.uid;
		this.getUserInfo(uid);
	}

	handleEdit = (key, val) => {
		var s = {};
		s[key] = val;
		this.setState(s);
	};

	getUserInfo = id => {
		var _this = this;
		const { curUid } = this.props;
		axios.get("/api/user/find?id=" + id).then(res => {
			if (res.data.errmsg === "没有权限") {
				alert("没有权限");
				res.data.data = {};
			}
			_this.setState({
				userinfo: res.data.data,
				_userinfo: res.data.data
			});
			if (curUid === +id) {
				this.props.setBreadcrumb([{ name: res.data.data.username }]);
			} else {
				this.props.setBreadcrumb([{ name: "管理: " + res.data.data.username }]);
			}
		});
	};

	updateUserinfo = name => {
		var state = this.state;
		let value = this.state._userinfo[name];
		let params = { uid: state.userinfo.uid };
		params[name] = value;

		axios.post("/api/user/update", params).then(
			res => {
				let data = res.data;
				if (data.errcode === 0) {
					let userinfo = this.state.userinfo;
					userinfo[name] = value;
					this.setState({
						userinfo: userinfo
					});

					this.handleEdit(name + "Edit", false);
					message.success("更新用户信息成功");
				} else {
					message.error(data.errmsg);
				}
			},
			err => {
				message.error(err.message);
			}
		);
	};

	changeUserinfo = e => {
		let dom = e.target;
		let name = dom.getAttribute("name");
		let value = dom.value;

		this.setState({
			_userinfo: {
				...this.state._userinfo,
				[name]: value
			}
		});
	};

	changeRole = val => {
		let userinfo = this.state.userinfo;
		userinfo.role = val;
		this.setState({
			_userinfo: userinfo
		});
		this.updateUserinfo("role");
	};

	updatePassword = () => {
		let old_password = document.getElementById("old_password").value;
		let password = document.getElementById("password").value;
		let verify_pass = document.getElementById("verify_pass").value;
		if (password != verify_pass) {
			return message.error("两次输入的密码不一样");
		}
		let params = {
			uid: this.state.userinfo.uid,
			password: password,
			old_password: old_password
		};

		axios.post("/api/user/change_password", params).then(
			res => {
				let data = res.data;
				if (data.errcode === 0) {
					this.handleEdit("secureEdit", false);
					message.success("修改密码成功");
					if (this.props.curUid === this.state.userinfo.uid) {
						location.reload();
					}
				} else {
					message.error(data.errmsg);
				}
			},
			err => {
				message.error(err.message);
			}
		);
	};

	render() {
		let ButtonGroup = Button.Group;
		let userNameEditHtml, emailEditHtml, secureEditHtml, roleEditHtml;
		const Option = Select.Option;
		let userinfo = this.state.userinfo;
		let _userinfo = this.state._userinfo;
		let roles = { admin: "管理员", member: "会员" };
		let userType = "";
		if (this.props.userType === "third") {
			userType = false;
		} else if (this.props.userType === "site") {
			userType = true;
		} else {
			userType = false;
		}

		// 用户名信息修改
		if (this.state.usernameEdit === false) {
			userNameEditHtml = (
				<div>
					<span class="text">{userinfo.username}</span>&nbsp;&nbsp;
					{/*<span class="text-button"  onClick={() => { this.handleEdit('usernameEdit', true) }}><xIcon icon="edit" />修改</span>*/}
					{/* {btn} */}
					{/* 站点登陆才能编辑 */}
					{userType && (
						<EditButton
							userType={userType}
							isOwner={userinfo.uid === this.props.curUid}
							isAdmin={this.props.curRole === ADMIN}
							onClick={this.handleEdit}
							name="usernameEdit"
						/>
					)}
				</div>
			);
		} else {
			userNameEditHtml = (
				<div>
					<ElInput
						value={_userinfo.username}
						name="username"
						onChange={this.changeUserinfo}
						placeholder="用户名"
					/>
					<ElButtonGroup class="edit-buttons">
						<ElButton
							class="edit-button"
							onClick={() => {
								this.handleEdit("usernameEdit", false);
							}}>
							取消
						</ElButton>
						<ElButton
							class="edit-button"
							onClick={() => {
								this.updateUserinfo("username");
							}}
							type="primary">
							确定
						</ElButton>
					</ElButtonGroup>
				</div>
			);
		}
		// 邮箱信息修改
		if (this.state.emailEdit === false) {
			emailEditHtml = (
				<div>
					<span class="text">{userinfo.email}</span>&nbsp;&nbsp;
					{/*<span class="text-button" onClick={() => { this.handleEdit('emailEdit', true) }} ><xIcon icon="edit" />修改</span>*/}
					{/* {btn} */}
					{/* 站点登陆才能编辑 */}
					{userType && (
						<EditButton
							admin={userinfo.role === ADMIN}
							isOwner={userinfo.uid === this.props.curUid}
							isAdmin={this.props.curRole === ADMIN}
							onClick={this.handleEdit}
							name="emailEdit"
						/>
					)}
				</div>
			);
		} else {
			emailEditHtml = (
				<div>
					<ElInput
						placeholder="Email"
						value={_userinfo.email}
						name="email"
						onChange={this.changeUserinfo}
					/>
					<ElButtonGroup class="edit-buttons">
						<ElButton
							class="edit-button"
							onClick={() => {
								this.handleEdit("emailEdit", false);
							}}>
							取消
						</ElButton>
						<ElButton
							class="edit-button"
							type="primary"
							onClick={() => {
								this.updateUserinfo("email");
							}}>
							确定
						</ElButton>
					</ElButtonGroup>
				</div>
			);
		}

		if (this.state.roleEdit === false) {
			roleEditHtml = (
				<div>
					<span class="text">{roles[userinfo.role]}</span>&nbsp;&nbsp;
				</div>
			);
		} else {
			roleEditHtml = (
				<Select
					defaultValue={_userinfo.role}
					onChange={this.changeRole}
					style={{ width: 150 }}>
					<Option value=ADMIN>管理员</Option>
					<Option value="member">会员</Option>
				</Select>
			);
		}

		if (this.state.secureEdit === false) {
			let btn = "";
			if (userType) {
				btn = (
					<ElButton
						icon="edit"
						onClick={() => {
							this.handleEdit("secureEdit", true);
						}}>
						修改
					</ElButton>
				);
			}
			secureEditHtml = btn;
		} else {
			secureEditHtml = (
				<div>
					<ElInput
						style={{
							display:
								this.props.curRole === ADMIN && userinfo.role != ADMIN
									? "none"
									: ""
						}}
						placeholder="旧的密码"
						type="password"
						name="old_password"
						id="old_password"
					/>
					<ElInput
						placeholder="新的密码"
						type="password"
						name="password"
						id="password"
					/>
					<ElInput
						placeholder="确认密码"
						type="password"
						name="verify_pass"
						id="verify_pass"
					/>
					<ElButtonGroup class="edit-buttons">
						<ElButton
							class="edit-button"
							onClick={() => {
								this.handleEdit("secureEdit", false);
							}}>
							取消
						</ElButton>
						<ElButton
							class="edit-button"
							onClick={this.updatePassword}
							type="primary">
							确定
						</ElButton>
					</ElButtonGroup>
				</div>
			);
		}
		return (
			<div class="user-profile">
				<div class="user-item-body">
					{userinfo.uid === this.props.curUid ? (
						<h3>个人设置</h3>
					) : (
						<h3>{userinfo.username} 资料设置</h3>
					)}

					<ElRow class="avatarCon" type="flex" justify="start">
						<ElCol span={24}>
							{userinfo.uid === this.props.curUid ? (
								<AvatarUpload uid={userinfo.uid}>点击上传头像</AvatarUpload>
							) : (
								<div class="avatarImg">
									<img src={`/api/user/avatar?uid=${userinfo.uid}`} />
								</div>
							)}
						</ElCol>
					</ElRow>
					<ElRow class="user-item" type="flex" justify="start">
						<div class="maoboli" />
						<ElCol span={4}>用户id</ElCol>
						<ElCol span={12}>{userinfo.uid}</ElCol>
					</ElRow>
					<ElRow class="user-item" type="flex" justify="start">
						<div class="maoboli" />
						<ElCol span={4}>用户名</ElCol>
						<ElCol span={12}>{userNameEditHtml}</ElCol>
					</ElRow>
					<ElRow class="user-item" type="flex" justify="start">
						<div class="maoboli" />
						<ElCol span={4}>Email</ElCol>
						<ElCol span={12}>{emailEditHtml}</ElCol>
					</ElRow>
					<ElRow
						class="user-item"
						style={{ display: this.props.curRole === ADMIN ? "" : "none" }}
						type="flex"
						justify="start">
						<div class="maoboli" />
						<ElCol span={4}>角色</ElCol>
						<ElCol span={12}>{roleEditHtml}</ElCol>
					</ElRow>
					<ElRow
						class="user-item"
						style={{ display: this.props.curRole === ADMIN ? "" : "none" }}
						type="flex"
						justify="start">
						<div class="maoboli" />
						<ElCol span={4}>登陆方式</ElCol>
						<ElCol span={12}>
							{userinfo.type === "site" ? "站点登陆" : "第三方登陆"}
						</ElCol>
					</ElRow>
					<ElRow class="user-item" type="flex" justify="start">
						<div class="maoboli" />
						<ElCol span={4}>创建账号时间</ElCol>
						<ElCol span={12}>{formatTime(userinfo.add_time)}</ElCol>
					</ElRow>
					<ElRow class="user-item" type="flex" justify="start">
						<div class="maoboli" />
						<ElCol span={4}>更新账号时间</ElCol>
						<ElCol span={12}>{formatTime(userinfo.up_time)}</ElCol>
					</ElRow>

					{userType ? (
						<ElRow class="user-item" type="flex" justify="start">
							<div class="maoboli" />
							<ElCol span={4}>密码</ElCol>
							<ElCol span={12}>{secureEditHtml}</ElCol>
						</ElRow>
					) : (
						""
					)}
				</div>
			</div>
		);
	}
}

@connect(
	state => {
		return {
			url: state.user.imageUrl
		};
	},
	{
		setImageUrl
	}
)
class AvatarUpload extends Component {
	constructor(props) {
		super(props);
	}
	static propTypes = {
		uid: PropTypes.number,
		setImageUrl: PropTypes.func,
		url: PropTypes.any
	};
	uploadAvatar(basecode) {
		axios
			.post("/api/user/upload_avatar", { basecode: basecode })
			.then(() => {
				// this.setState({ imageUrl: basecode });
				this.props.setImageUrl(basecode);
			})
			.catch(e => {
				console.log(e);
			});
	}
	handleChange(info) {
		if (info.file.status === "done") {
			// Get this url from response in real world.
			getBase64(info.file.originFileObj, basecode => {
				this.uploadAvatar(basecode);
			});
		}
	}
	render() {
		const { url } = this.props;
		let imageUrl = url ? url : `/api/user/avatar?uid=${this.props.uid}`;
		// let imageUrl = this.state.imageUrl ? this.state.imageUrl : `/api/user/avatar?uid=${this.props.uid}`;
		// console.log(this.props.uid);
		return (
			<div class="avatar-box">
				<ElTooltip
					placement="right"
					content={
						<div>点击头像更换 (只支持jpg、png格式且大小不超过200kb的图片)</div>
					}>
					<div>
						<Upload
							class="avatar-uploader"
							name="basecode"
							showUploadList={false}
							action="/api/user/upload_avatar"
							beforeUpload={beforeUpload}
							onChange={this.handleChange.bind(this)}>
							{/*<Avatar size="large" src={imageUrl}  />*/}
							<div style={{ width: 100, height: 100 }}>
								<img class="avatar" src={imageUrl} />
							</div>
						</Upload>
					</div>
				</ElTooltip>
				<span class="avatarChange" />
			</div>
		);
	}
}

function beforeUpload(file) {
	const isJPG = file.type === "image/jpeg";
	const isPNG = file.type === "image/png";
	if (!isJPG && !isPNG) {
		message.error("图片的格式只能为 jpg、png！");
	}
	const isLt2M = file.size / 1024 / 1024 < 0.2;
	if (!isLt2M) {
		message.error("图片必须小于 200kb!");
	}

	return (isPNG || isJPG) && isLt2M;
}

function getBase64(img, callback) {
	const reader = new FileReader();
	reader.addEventListener("load", () => callback(reader.result));
	reader.readAsDataURL(img);
}

export default Profile;
