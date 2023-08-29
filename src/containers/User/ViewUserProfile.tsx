import { defineComponent } from "vue";
import { stateApp, cptAvatarUrl } from "@/state/app";
import { xI, xU, defFormConfigs, setValueTo } from "@/ventose/ui";
import { DialogUpdatePwd } from "./DialogUpdatePwd";
import { FormRules } from "@/utils/common.FormRules";
import { API } from "@/api";

function getBase64(img, callback) {
	const reader = new FileReader();
	reader.addEventListener("load", () => callback(reader.result));
	reader.readAsDataURL(img);
}

export const ViewUserProfile = defineComponent({
	setup() {
		return {
			stateApp,
			cptAvatarUrl
		};
	},
	data(vm) {
		return {
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
					rules: [FormRules.required()]
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
		init() {
			setValueTo(
				this.configsForm,
				xU.merge({}, stateApp.user, {
					up_time: xU.dateFormat(stateApp.user.up_time, 1),
					add_time: xU.dateFormat(stateApp.user.add_time, 1)
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
					stateApp.user.imageUrl = basecode;
					this.uploadAvatar(basecode);
				});
			}
		},
		async uploadAvatar(basecode) {
			await API.user.uploadAvatar({ basecode: basecode });
			stateApp.user.imageUrl = "";
		}
	},
	computed: {
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
			<div style="padding:20px" class="flex middle center">
				<ElCard title="个人设置">
					<xForm formStyle={styleForm} labelStyle={styleFormLabel}>
						<div id="xItem_391" class=" x-item-wrapper flex middle ">
							<div class="x-form-item-label">
								<label>用户头像</label>
							</div>
							<div class="x-form-item-control">
								<ElUpload
									class="avatar-uploader"
									show-file-list={false}
									onChange={handleChange}
									beforeUpload={beforeAvatarUpload}>
									{(() => {
										if (cptAvatarUrl) {
											return <ElAvatar size={64} src={cptAvatarUrl} />;
										} else {
											return (
												<el-icon class="avatar-uploader-icon">
													<xIcon icon="add" />
												</el-icon>
											);
										}
									})()}
								</ElUpload>
							</div>
						</div>
						<xGap t="10" />
						<xItem configs={configsForm.uid} />
						<xGap t="10" />
						<div class="flex middle">
							<xItem configs={configsForm.username} class="flex1" />
							<xButton onClick={updatePwd} class="ml10" type="primary">
								修改密码
							</xButton>
						</div>
						<xGap t="10" />
						<xItem configs={configsForm.email} />
						<xGap t="10" />
						<xItem configs={configsForm.role} />
						<xGap t="10" />
						<xItem configs={configsForm.type} />
						<xGap t="10" />
						<xItem configs={configsForm.add_time} />
						<xGap t="10" />
						<xItem configs={configsForm.up_time} />
						<xGap t="10" />
						<xButton type="primary">更新</xButton>
						<xGap t="10" />
					</xForm>
				</ElCard>
			</div>
		);
	}
});
