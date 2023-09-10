import { defineComponent } from "vue";
import { stateApp } from "@/state/app";
import { cptRouter } from "@/router/router";
import { xI, defItem, xU, pickValueFrom, itemsInvalid } from "@/ventose/ui";
import {
	xItem_ProjectName,
	xItem_ProjectIcon,
	xItem_ProjectColor,
	xItem_ProjectDesc,
	xItem_ProjectGroupId,
	xItem_ProjectType
} from "@/containers/Group/AddProject/DialogAddProject";
import { xItem_ProjectBasePath } from "../../Group/AddProject/DialogAddProject";
import {
	openProxyEnvDialog,
	openUpsertTagDialog
} from "@/containers/Interface/DialogModifyInterface.Helper";
import { API } from "@/api";

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
							icon: (
								<xIcon
									icon="question"
									v-xTips={{
										content: xI(
											`<div>如果请求需要使用VPN，则需要有一台开启VPN的PC作为代理机。</div>
<div>利用 <a class="pointer" href="https://wproxy.org/whistle/" target="_blank">whistle</a> <b>w2 start</b></div>
<div>可以开启http://loclhost:8899</div>`
										)
									}}
								/>
							)
						}),
					placeholder: "ip:port"
				}),
				strice: defItem({
					itemType: "Switch",
					label: () =>
						defItem.labelWithTips({
							label: xI("mock严格模式"),
							icon: (
								<xIcon
									icon="question"
									v-xTips={{
										content: xI(
											"开启后 mock 请求会对 query，body form 的必须字段和 json schema 进行校验"
										)
									}}
								/>
							)
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
							icon: (
								<xIcon
									icon="question"
									v-xTips={{
										content: xI("开启后可在接口 body 和返回值中写 json 字段")
									}}
								/>
							)
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
		const vm = this;
		return (
			<>
				<xContainer col="2" ref="ProjectSettingCommon">
					<xItem configs={this.dataXItem.projectName} />
					<xItem configs={this.dataXItem.projectGroupId} />
					<xItem configs={this.dataXItem.projectIcon} />
					<xItem configs={this.dataXItem.projectColor} />
					<xItem configs={this.dataXItem.projectBasePath} span="full" />
					<xItem configs={this.dataXItem.projectDesc} span="full" />
					<xItem configs={this.dataXItem.proxyHostPort} span="full" />
					<xContainer span="full" class="flex middle" col="3">
						<xItem configs={this.dataXItem.projectType} />
						<xItem configs={this.dataXItem.strice} />
						<xItem configs={this.dataXItem.is_json5} />
						<xItem configs={this.dataXItem.switch_notice} />
						<xButton configs={this.configsBtnOpenUpsertTagDialog} />
						<xButton configs={this.configsBtnOpenProxyEnvDialog} />
					</xContainer>
				</xContainer>
				<xGap f />
				<div class="flex center middle">
					<xButton
						configs={{
							type: "primary",
							text: xI("更新"),
							async onClick() {
								try {
									if (!(await itemsInvalid(vm.$refs.ProjectSettingCommon))) {
										const dataForm = pickValueFrom(vm.dataXItem);
										dataForm.id = vm.stateApp.currProject._id;
										await API.project.update(dataForm);
										xU.message.success("更新成功");
									}
								} catch (error) {
									xU.message.error(error.message);
								}
							}
						}}
					/>
				</div>
			</>
		);
	}
});
