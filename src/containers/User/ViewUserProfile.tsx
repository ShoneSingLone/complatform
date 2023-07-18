import { defineComponent } from "vue";
import { State_App, Cpt_avatarUrl } from "@/state/State_App";
import { $t, UI, defFormConfigs, setValueTo, xU } from "@ventose/ui";
import { DialogUpdatePwd } from "./DialogUpdatePwd";
import { pickValueFrom } from "./../../element/ui/tools/form";

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
					prop: "username"
				},
				{
					value: "",
					label: $t("邮箱地址").label,
					prop: "email",
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
	render({ Cpt_avatarUrl, configsForm, styleForm, styleFormLabel, updatePwd }) {
		return (
			<>
				<h1>个人设置</h1>
				<xForm formStyle={styleForm} labelStyle={styleFormLabel}>
					<ElAvatar size={64} src={Cpt_avatarUrl} />
					<xGap t="10" />
					<xItem configs={configsForm.uid} />
					<xGap t="10" />
					<xItem configs={configsForm.add_time} />
					<xGap t="10" />
					<xItem configs={configsForm.up_time} />
					<xGap t="10" />
					<xItem configs={configsForm.email} />
					<xGap t="10" />
					<xItem configs={configsForm.username} />
					<xGap t="10" />
					<ElButton onClick={updatePwd}>修改密码</ElButton>
					<xGap t="10" />
				</xForm>
			</>
		);
	}
});
