import { defineComponent } from "vue";
import { stateApp, cptAvatarUrl } from "@/state/app";
import { xI, xU, defFormConfigs, setValueTo } from "@/ventose/ui";
import { DialogUpdatePwd } from "./DialogUpdatePwd";
import { FormRules } from "@/utils/common.FormRules";
import { API } from "@/api";
import { cptRouter } from "@/router/router";
import { getAvatarSrcByid } from "@/utils/common";

function getBase64(img, callback) {
	const reader = new FileReader();
	reader.addEventListener("load", () => callback(reader.result));
	reader.readAsDataURL(img);
}

export const ViewUserProfile = defineComponent({
	props: ["id"],
	setup() {
		return {
			stateApp,
			cptAvatarUrl
		};
	},
	data(vm) {
		return {
			userInfo: {},
			configsForm: defFormConfigs([
				{
					value: "",
					label: xI("用户ID"),
					prop: "uid",
					isReadonly: true
				},
				{
					value: "",
					label: xI("用户名"),
					prop: "username",
					rules: [FormRules.required()],
					isReadonly: () => !vm.cpt_isAuth
				},
				{
					value: "",
					label: xI("邮箱地址"),
					prop: "email",
					isReadonly: true
				},
				{
					value: "",
					label: xI("角色"),
					prop: "role",
					isReadonly: true
				},
				{
					value: "",
					label: xI("登陆方式"),
					prop: "type",
					isReadonly: true
				},
				{
					value: "",
					label: xI("创建时间"),
					prop: "add_time",
					isReadonly: true
				},
				{
					value: "",
					label: xI("更新时间"),
					prop: "up_time",
					isReadonly: true
				}
			])
		};
	},
	mounted() {
		this.init();
	},
	methods: {
		async init() {
			const { data: userInfo } = await API.user.getUserById(this.cpt_userId);
			this.userInfo = userInfo;

			setValueTo(
				this.configsForm,
				xU.merge({}, this.userInfo, {
					up_time: xU.dateFormat(this.userInfo.up_time, 1),
					add_time: xU.dateFormat(this.userInfo.add_time, 1)
				})
			);
		},
		async updatePwd() {
			xU.dialog({
				title: xI("修改密码"),
				component: DialogUpdatePwd
			});
		},
		beforeAvatarUpload(file) {
			const isJPG = file.type === "image/jpeg";
			const isPNG = file.type === "image/png";
			if (!isJPG && !isPNG) {
				xU.message.error("图片的格式只能为 jpg、png！");
			}
			const isLt2M = file.size / 1024 / 1024 < 0.2;
			if (!isLt2M) {
				xU.message.error("图片必须小于 200kb!");
			}
			return (isPNG || isJPG) && isLt2M;
		},
		handleChange(info) {
			if (info.status === "ready") {
				// Get this url from response in real world.
				getBase64(info.raw, basecode => {
					this.userInfo.imageUrl = basecode;
					this.uploadAvatar(basecode);
				});
			}
		},
		async uploadAvatar(basecode) {
			try {
				const res = await API.user.uploadAvatar({ basecode: basecode });
			} catch (error) {
				this.userInfo.imageUrl = "";
			}
		}
	},
	computed: {
		cpt_avatarUrl() {
			return this.userInfo?.imageUrl || getAvatarSrcByid(this.cpt_userId);
		},
		cpt_isAuth() {
			return xU.isSame(stateApp.user._id, this.cpt_userId);
		},
		cpt_userId() {
			return this.id || cptRouter.value.query.user_id || stateApp.user._id;
		},
		styleForm() {
			return {
				width: "520px"
			};
		},
		styleFormLabel() {
			return {
				"text-align": "left",
				"min-width": "120px",
				padding: "0 14px"
			};
		}
	},
	render({
		cptAvatarUrl,
		configsForm,
		styleForm,
		styleFormLabel,
		updatePwd,
		handleChange,
		beforeAvatarUpload
	}) {
		const vm = this;
		return (
			<div class="flex middle center">
				<elCard title="个人设置">
					<xForm formStyle={styleForm} labelStyle={styleFormLabel}>
						<div id="xItem_391" class=" x-item-wrapper flex middle ">
							<div class="x-form-item-label">
								<label>用户头像</label>
							</div>
							<div class="x-form-item-control">
								<elUpload
									class="avatar-uploader"
									show-file-list={false}
									onChange={handleChange}
									beforeUpload={beforeAvatarUpload}>
									{(() => {
										if (this.cpt_avatarUrl) {
											return <elAvatar size={64} src={this.cpt_avatarUrl} />;
										} else {
											return (
												<el-icon class="avatar-uploader-icon">
													<xIcon icon="add" />
												</el-icon>
											);
										}
									})()}
								</elUpload>
							</div>
						</div>
						<xGap t />
						<xItem configs={configsForm.uid} />
						<xGap t />
						<div class="flex middle">
							<xItem configs={configsForm.username} class="flex1" />
							{this.cpt_isAuth && (
								<xButton onClick={updatePwd} class="ml" type="primary">
									修改密码
								</xButton>
							)}
						</div>
						<xGap t />
						<xItem configs={configsForm.email} />
						<xGap t />
						<xItem configs={configsForm.role} />
						<xGap t />
						<xItem configs={configsForm.type} />
						<xGap t />
						<xItem configs={configsForm.add_time} />
						<xGap t />
						<xItem configs={configsForm.up_time} />
						<xGap t />
						{this.cpt_isAuth && <xButton type="primary">更新</xButton>}
						<xGap t />
					</xForm>
				</elCard>
			</div>
		);
	}
});
