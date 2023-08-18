import { defineComponent } from "vue";
import { State_App, Cpt_avatarUrl } from "@/state/State_App";
import { $t, UI, defFormConfigs, setValueTo, xU } from "@ventose/ui";
import { DialogUpdatePwd } from "./DialogUpdatePwd";
import { pickValueFrom } from "./../../element/ui/tools/form";
import { FormRules } from "@/utils/common.FormRules";
import { EVENT_TYPE } from "@ventose/ui";
import { API } from "@/api";

function getBase64(img, callback) {
	const reader = new FileReader();
	reader.addEventListener("load", () => callback(reader.result));
	reader.readAsDataURL(img);
}

export const ViewUserProfile = defineComponent({
	setup() {
		return {
			State_App,
			Cpt_avatarUrl
		};
	},
	data(vm) {
		return {
			configsForm: defFormConfigs([
				{
					value: "",
					label: $t("用户ID").label,
					prop: "uid",
					isReadonly: true
				},
				{
					value: "",
					label: $t("用户名").label,
					prop: "username",
					rules: [FormRules.required()]
				},
				{
					value: "",
					label: $t("邮箱地址").label,
					prop: "email",
					isReadonly: true
				},
				{
					value: "",
					label: $t("角色").label,
					prop: "role",
					isReadonly: true
				},
				{
					value: "",
					label: $t("登陆方式").label,
					prop: "type",
					isReadonly: true
				},
				{
					value: "",
					label: $t("创建时间").label,
					prop: "add_time",
					isReadonly: true
				},
				{
					value: "",
					label: $t("更新时间").label,
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
				xU.merge({}, State_App.user, {
					up_time: xU.dateFormat(State_App.user.up_time, 1),
					add_time: xU.dateFormat(State_App.user.add_time, 1)
				})
			);
		},
		async updatePwd() {
			await UI.dialog.component({
				title: $t("修改密码").label,
				component: DialogUpdatePwd
			});
		},
		beforeAvatarUpload(file) {
			const isJPG = file.type === "image/jpeg";
			const isPNG = file.type === "image/png";
			if (!isJPG && !isPNG) {
				UI.message.error("图片的格式只能为 jpg、png！");
			}
			const isLt2M = file.size / 1024 / 1024 < 0.2;
			if (!isLt2M) {
				UI.message.error("图片必须小于 200kb!");
			}
			return (isPNG || isJPG) && isLt2M;
		},
		handleChange(info) {
			if (info.status === "ready") {
				// Get this url from response in real world.
				getBase64(info.raw, basecode => {
					State_App.user.imageUrl = basecode;
					this.uploadAvatar(basecode);
				});
			}
		},
		async uploadAvatar(basecode) {
			await API.user.uploadAvatar({ basecode: basecode });
			State_App.user.imageUrl = "";
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
		Cpt_avatarUrl,
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
										if (Cpt_avatarUrl) {
											return <ElAvatar size={64} src={Cpt_avatarUrl} />;
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
							<ElButton onClick={updatePwd} class="ml10" type="primary">
								修改密码
							</ElButton>
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
						<ElButton type="primary">更新</ElButton>
						<xGap t="10" />
					</xForm>
				</ElCard>
			</div>
		);
	}
});
