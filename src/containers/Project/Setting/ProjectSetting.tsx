import { defineComponent } from "vue";
import { State_App } from "@/state/State_App";
import { Cpt_url } from "@/router/router";
import { $t } from "@/devui/ui/State_UI";
import {
	xItem_ProjectName,
	xItem_ProjectIcon,
	xItem_ProjectColor,
	xItem_ProjectDesc,
	xItem_ProjectGroupId,
	xItem_ProjectType
} from "@/containers/Group/AddProject/DialogAddProject";
import { defItem } from "@/devui/ui/index";
import { xU } from "@/devui/ui/ventoseUtils";
import { FormRules } from "@/utils/common.FormRules";
import { xItem_ProjectBasePath } from "./../../Group/AddProject/DialogAddProject";
import {
	openProxyEnvDialog,
	openUpsertTagDialog
} from "../Interface/DialogModifyInterface.Helper";

export const ProjectSetting = defineComponent({
	setup() {
		return {
			State_App,
			Cpt_url
		};
	},
	data(vm) {
		return {
			activeKey: "1",
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
				...defItem(
					xItem_ProjectGroupId({ value: vm.Cpt_url.query.group_id }, vm)
				),
				...defItem(xItem_ProjectName({ value: vm.State_App.currProject.name })),
				...defItem(xItem_ProjectIcon({ value: vm.State_App.currProject.icon })),
				...defItem(
					xItem_ProjectColor({ value: vm.State_App.currProject.color })
				),
				...defItem(
					xItem_ProjectBasePath({ value: vm.State_App.currProject.basepath })
				),
				...defItem(xItem_ProjectDesc({ value: vm.State_App.currProject.desc })),
				...defItem(
					xItem_ProjectType({ value: vm.State_App.currProject.project_type })
				),
				...defItem({
					value: "",
					prop: "proxyHostPort",
					label: defItem.labelWithTips({
						label: "代理地址",
						tips: $t("请求需要使用VPN，则需要有一台开启VPN的PC作为代理机")
							.label,
						icon: <xIcon icon="question" />
					}),
					placeholder: "ip:port"
				}),
				...defItem({
					itemType: "Switch",
					prop: "noticed",
					label: defItem.labelWithTips({
						label: $t("mock严格模式").label,
						tips: $t(
							"开启后 mock 请求会对 query，body form 的必须字段和 json schema 进行校验"
						).label,
						icon: <xIcon icon="question" />
					}),
					checkedChildren: vm.$t("开").label,
					unCheckedChildren: vm.$t("关").label,
					value: true
				})
			}
		};
	},
	created() {},
	methods: {},
	render() {
		return (
			<section id="ViewProjectSetting">
				{/* {JSON.stringify(this.State_App.currProject)} */}
				<a-tabs v-model:activeKey={this.activeKey} tabPosition="left">
					<a-tab-pane
						key="1"
						tab={$t("项目配置").label}
						class="flex"
						style="width:100%">
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
					</a-tab-pane>
					<a-tab-pane key="2" tab={$t("环境配置").label}>
						<p>Content of Tab Pane 2</p>
						<p>Content of Tab Pane 2</p>
						<p>Content of Tab Pane 2</p>
					</a-tab-pane>
					<a-tab-pane key="3" tab={$t("请求配置").label}>
						<p>Content of Tab Pane 3</p>
						<p>Content of Tab Pane 3</p>
						<p>Content of Tab Pane 3</p>
					</a-tab-pane>
					<a-tab-pane key="token配置" tab={$t("token配置").label}>
						<p>Content of Tab Pane 3</p>
						<p>Content of Tab Pane 3</p>
						<p>Content of Tab Pane 3</p>
					</a-tab-pane>
					<a-tab-pane key="全局mock脚本" tab={$t("全局mock脚本").label}>
						<p>Content of Tab Pane 3</p>
						<p>Content of Tab Pane 3</p>
						<p>Content of Tab Pane 3</p>
					</a-tab-pane>
				</a-tabs>
			</section>
		);
	}
});
