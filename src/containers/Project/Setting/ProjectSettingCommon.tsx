import { defineComponent } from "vue";
import { State_App } from "@/state/State_App";
import { Cpt_url } from "@/router/router";
import { $t } from "@ventose/ui";
import {
	xItem_ProjectName,
	xItem_ProjectIcon,
	xItem_ProjectColor,
	xItem_ProjectDesc,
	xItem_ProjectGroupId,
	xItem_ProjectType
} from "@/containers/Group/AddProject/DialogAddProject";
import { defItem } from "@ventose/ui";
import { xU } from "@ventose/ui";
import { xItem_ProjectBasePath } from "../../Group/AddProject/DialogAddProject";
import {
	openProxyEnvDialog,
	openUpsertTagDialog
} from "../Interface/DialogModifyInterface.Helper";

export const ProjectSettingCommon = defineComponent({
	setup() {
		return {
			State_App,
			Cpt_url
		};
	},
	data(vm) {
		return {
			configsBtnOpenUpsertTagDialog: {
				text: $t("管理接口Tags").label,
				async onClick() {
					await openUpsertTagDialog();
				}
			},
			configsBtnOpenProxyEnvDialog: {
				text: $t("管理接口转发环境").label,
				async onClick() {
					await openProxyEnvDialog();
				}
			},
			dataXItem: {
				projectGroupId: defItem(
					xItem_ProjectGroupId({ value: vm.Cpt_url.query.group_id }, vm)
				),
				projectName: defItem(
					xItem_ProjectName({ value: vm.State_App.currProject.name })
				),
				projectIcon: defItem(
					xItem_ProjectIcon({ value: vm.State_App.currProject.icon })
				),
				projectColor: defItem(
					xItem_ProjectColor({ value: vm.State_App.currProject.color })
				),
				projectBasePath: defItem(
					xItem_ProjectBasePath({ value: vm.State_App.currProject.basepath })
				),
				projectDesc: defItem(
					xItem_ProjectDesc({ value: vm.State_App.currProject.desc })
				),
				projectType: defItem(
					xItem_ProjectType({ value: vm.State_App.currProject.project_type })
				),
				proxyHostPort: defItem({
					value: vm.State_App.currProject.proxyHostPort || "",
					label: () =>
						defItem.labelWithTips({
							label: "代理地址",
							tips: $t("请求需要使用VPN，则需要有一台开启VPN的PC作为代理机")
								.label,
							icon: <xIcon icon="question" />
						}),
					placeholder: "ip:port"
				}),
				strice: defItem({
					itemType: "Switch",
					label: () =>
						defItem.labelWithTips({
							label: $t("mock严格模式").label,
							tips: $t(
								"开启后 mock 请求会对 query，body form 的必须字段和 json schema 进行校验"
							).label,
							icon: <xIcon icon="question" />
						}),
					checkedChildren: vm.$t("开").label,
					unCheckedChildren: vm.$t("关").label,
					value: !!vm.State_App.currProject.strice
				}),
				is_json5: defItem({
					itemType: "Switch",
					label: () =>
						defItem.labelWithTips({
							label: $t("开启json5").label,
							tips: $t("开启后可在接口 body 和返回值中写 json 字段").label,
							icon: <xIcon icon="question" />
						}),
					checkedChildren: vm.$t("开").label,
					unCheckedChildren: vm.$t("关").label,
					value: !!vm.State_App.currProject.is_json5
				}),
				switch_notice: defItem({
					itemType: "Switch",
					label: $t("默认开启消息通知").label,
					checkedChildren: vm.$t("开").label,
					unCheckedChildren: vm.$t("关").label,
					value: !!vm.State_App.currProject.switch_notice
				})
			}
		};
	},
	created() {},
	methods: {},
	render() {
		return (
			<>
				<xForm
					class="flex vertical"
					labelStyle={{ "min-width": "120px", width: "unset" }}>
					{xU.map(this.dataXItem, (configs, prop) => {
						return (
							<>
								<xGap t="10" key={prop} />
								<xItem configs={configs} key={prop} />
							</>
						);
					})}
					<xGap t="10" />
					<xButton configs={this.configsBtnOpenUpsertTagDialog} />
					<xGap t="10" />
					<xButton configs={this.configsBtnOpenProxyEnvDialog} />
				</xForm>
			</>
		);
	}
});
