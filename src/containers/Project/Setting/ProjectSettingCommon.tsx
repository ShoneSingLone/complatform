import { defineComponent } from "vue";
import { stateApp } from "@/state/app";
import { cptRouter } from "@/router/router";
import { xI } from "@/ventose/ui";
import {
	xItem_ProjectName,
	xItem_ProjectIcon,
	xItem_ProjectColor,
	xItem_ProjectDesc,
	xItem_ProjectGroupId,
	xItem_ProjectType
} from "@/containers/Group/AddProject/DialogAddProject";
import { defItem } from "@/ventose/ui";
import { xU } from "@/ventose/ui";
import { xItem_ProjectBasePath } from "../../Group/AddProject/DialogAddProject";
import {
	openProxyEnvDialog,
	openUpsertTagDialog
} from "@/containers/Interface/DialogModifyInterface.Helper";

export const ProjectSettingCommon = defineComponent({
	setup() {
		return {
			stateApp,
			cptRouter
		};
	},
	data(vm) {
		return {
			configsBtnOpenUpsertTagDialog: {
				text: xI("管理接口Tags"),
				async onClick() {
					await openUpsertTagDialog();
				}
			},
			configsBtnOpenProxyEnvDialog: {
				text: xI("管理接口转发环境"),
				async onClick() {
					await openProxyEnvDialog();
				}
			},
			dataXItem: {
				projectGroupId: defItem(
					xItem_ProjectGroupId({ value: vm.cptRouter.query.group_id }, vm)
				),
				projectName: defItem(
					xItem_ProjectName({ value: vm.stateApp.currProject.name })
				),
				projectIcon: defItem(
					xItem_ProjectIcon({ value: vm.stateApp.currProject.icon })
				),
				projectColor: defItem(
					xItem_ProjectColor({ value: vm.stateApp.currProject.color })
				),
				projectBasePath: defItem(
					xItem_ProjectBasePath({ value: vm.stateApp.currProject.basepath })
				),
				projectDesc: defItem(
					xItem_ProjectDesc({ value: vm.stateApp.currProject.desc })
				),
				projectType: defItem(
					xItem_ProjectType({ value: vm.stateApp.currProject.project_type })
				),
				proxyHostPort: defItem({
					value: vm.stateApp.currProject.proxyHostPort || "",
					label: () =>
						defItem.labelWithTips({
							label: "代理地址",
							tips: xI("请求需要使用VPN，则需要有一台开启VPN的PC作为代理机")
								.label,
							icon: <xIcon icon="question" />
						}),
					placeholder: "ip:port"
				}),
				strice: defItem({
					itemType: "Switch",
					label: () =>
						defItem.labelWithTips({
							label: xI("mock严格模式"),
							tips: xI(
								"开启后 mock 请求会对 query，body form 的必须字段和 json schema 进行校验"
							).label,
							icon: <xIcon icon="question" />
						}),
					checkedChildren: xI("开"),
					unCheckedChildren: xI("关"),
					value: !!vm.stateApp.currProject.strice
				}),
				is_json5: defItem({
					itemType: "Switch",
					label: () =>
						defItem.labelWithTips({
							label: xI("开启json5"),
							tips: xI("开启后可在接口 body 和返回值中写 json 字段"),
							icon: <xIcon icon="question" />
						}),
					checkedChildren: xI("开"),
					unCheckedChildren: xI("关"),
					value: !!vm.stateApp.currProject.is_json5
				}),
				switch_notice: defItem({
					itemType: "Switch",
					label: xI("默认开启消息通知"),
					checkedChildren: xI("开"),
					unCheckedChildren: xI("关"),
					value: !!vm.stateApp.currProject.switch_notice
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
					<xGap t />
					<xButton configs={this.configsBtnOpenUpsertTagDialog} />
					<xGap t />
					<xButton configs={this.configsBtnOpenProxyEnvDialog} />
				</xForm>
			</>
		);
	}
});
