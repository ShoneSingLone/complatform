import { defineComponent } from "vue";
import {
	$,
	xU,
	UI,
	defCol,
	defDataGridOption,
	State_UI,
	$t
} from "@ventose/ui";
import { API } from "../../../api";
import { Cpt_url } from "../../../router/router";
import { InfoCard } from "../../../components/InfoCard";
import { ITEM_OPTIONS, ITEM_OPTIONS_VDOM } from "@/utils/common.options";
import { State_App } from "./../../../state/State_App";
import { DialogModifyInterface } from "./DialogModifyInterface";
import { makeAhref } from "@/components/RouterView/RouterView";
import copy from "copy-to-clipboard";
import { asyncGetTuiEditor } from "../../../components/TuiEditor/LoadTuiEditorLibs";
import { TuiEditor } from "../../../components/TuiEditor/TuiEditor";
import { JsonSchemaMonaco } from "../../../components/JsonSchemaEditor/JsonSchemaMonaco";
import { MonacoEditor } from "@/components/MonacoEditor/MonacoEditor";
import { State_ProjectInterface } from "@/containers/Project/Interface/State_ProjectInterface";

const colParamsName = defCol({
	prop: "name",
	label: State_UI.$t("参数名称").label,
	width: "120px"
});
const colRemark = defCol({ prop: "desc", label: State_UI.$t("备注").label });
const colRequired = defCol({
	prop: "required",
	label: State_UI.$t("是否必须").label,
	width: "100px",
	renderCell: ({ record }) => ITEM_OPTIONS_VDOM.required(record.required)
});
const colExample = defCol({
	prop: "example",
	label: State_UI.$t("示例").label
});

export const InterfaceDetail = defineComponent({
	setup() {
		return { State_Project: State_ProjectInterface, Cpt_url };
	},
	data(vm) {
		return {
			State_App,
			detailInfo: false,
			configs_table_path_params: defDataGridOption({
				isHidePagination: true,
				dataSource: [],
				columns: {
					...colParamsName,
					...defCol({ prop: "example", label: vm.$t("示例").label }),
					...colRemark
				}
			}),
			configs_table_headers: defDataGridOption({
				isHidePagination: true,
				dataSource: [],
				columns: {
					...colRequired,
					...colParamsName,
					...defCol({
						prop: "value",
						label: vm.$t("参数值").label
					}),
					...colExample,
					...colRemark
				}
			}),
			configs_table_query: defDataGridOption({
				isHidePagination: true,
				dataSource: [],
				columns: {
					...colRequired,
					...colParamsName,
					...colExample,
					...colRemark
				}
			}),
			configs_table_body_form: defDataGridOption({
				isHidePagination: true,
				dataSource: [],
				columns: {
					...colRequired,
					...colParamsName,
					...defCol({
						prop: "type",
						label: vm.$t("参数类型").label,
						width: "100px",
						renderCell: ({ record }) =>
							ITEM_OPTIONS_VDOM.interfaceBodyFormType(record.type)
					}),
					...colExample,
					...colRemark
				}
			})
		};
	},
	watch: {
		"Cpt_url.query.interface_id": {
			immediate: true,
			async handler(interface_id) {
				if (!interface_id) {
					return;
				}
				this.updateInterfaceInfo();
			}
		}
	},
	async mounted() {
		await asyncGetTuiEditor();
	},
	methods: {
		async updateInterfaceInfo() {
			const { data } = await API.project.fetchInterfaceDetail(
				this.Cpt_url.query.interface_id
			);
			this.detailInfo = data;
			xU(data);
			this.configs_table_headers.dataSource = xU.orderBy(
				data.req_headers,
				["required"],
				["desc"]
			);
			this.configs_table_path_params.dataSource = xU.orderBy(
				data.req_params,
				["required"],
				["desc"]
			);
			this.configs_table_query.dataSource = xU.orderBy(
				data.req_query,
				["required", "type"],
				["desc", "asc"]
			);
			this.configs_table_body_form.dataSource = xU.orderBy(
				data.req_body_form,
				["required", "type"],
				["desc", "asc"]
			);
		},
		copyUrl(url) {
			copy(url);
			UI.message.success("已经成功复制到剪切板");
		},
		flagMsg(mock, strice) {
			if (mock && strice) {
				return <span>( 全局mock & 严格模式 )</span>;
			} else if (!mock && strice) {
				return <span>( 严格模式 )</span>;
			} else if (mock && !strice) {
				return <span>( 全局mock )</span>;
			} else {
				return;
			}
		},
		closeWS() {
			this.WebSocket && this.WebSocket.close();
			delete this.WebSocket;
		},
		async showModifyInterfaceDialog() {
			const vm = this;
			await xU.ensureValueDone(() => this.detailInfo);
			const item = this.detailInfo;
			const $dialogModifyInterface = $(`.dialog-modify-interface`);

			if ($dialogModifyInterface.length > 0) {
				UI.message.warn(this.$t("已存在修改面板").label);
				return;
			}
			const { status, curdata, message } = await this.checkConflict(item);

			if (status == 2) {
				try {
					await UI.dialog.confirm({
						content: (
							<div class="flex middle">
								<a href={makeAhref(`/user/profile/${curdata.uid}`)}>
									{curdata.username}
								</a>
								<div>正在编辑该接口，请稍后再试...</div>
							</div>
						)
					});
				} catch (error) {
				} finally {
					this.closeWS();
				}
				return;
			}

			if (message) {
				UI.message.warn(message);
			}
			UI.dialog.component({
				title: this.$t("修改接口").label + `-${item.title}`,
				// fullscreen: true,
				component: DialogModifyInterface,
				area: ["1024px", "624px"],
				interfaceId: item._id,
				maxmin: true,
				updateInterfaceInfo: vm.updateInterfaceInfo,
				onBeforeClose: vm.closeWS()
			});
		},
		async checkConflict(item) {
			const vm = this;
			const { hostname, port, protocol } = location;
			let domain = hostname + (port !== "" ? ":" + port : "");
			//因后端 node 仅支持 ws， 暂不支持 wss
			let wsProtocol = protocol === "https:" ? "wss" : "ws";

			return new Promise((resolve, reject) => {
				try {
					const sockei = new WebSocket(
						`${wsProtocol}://${domain}/api/interface/solve_conflict?id=${item._id}`
					);
					sockei.onopen = () => {
						vm.WebSocket = sockei;
					};
					sockei.onmessage = e => {
						let result = JSON.parse(e.data);
						if (result.errno === 0) {
							resolve({
								curdata: result.data,
								status: 1
							});
						} else {
							resolve({
								curdata: result.data,
								status: 2
							});
						}
					};
					sockei.onerror = () => {
						resolve({
							curdata: item,
							status: 1,
							message: "websocket 连接失败，将导致多人编辑同一个接口冲突。"
						});
					};
				} catch (e) {
					resolve({
						curdata: item,
						status: 1,
						message: "websocket 连接失败，将导致多人编辑同一个接口冲突。"
					});
				}
			});
		}
	},
	computed: {
		status() {
			let status = {
				undone: "未完成",
				done: "已完成"
			};

			return status[this.detailInfo?.status];
		},
		labelProxyEnv() {
			if (!this.detailInfo.isProxy) {
				return "Y-api Mock 数据";
			}
			const envId = this.detailInfo.witchEnv;
			if (!envId) {
				return "任意";
			}
			if (envId) {
				const envArray = this.State_App.currProject.env;
				let env = xU.find(envArray, { _id: envId });
				if (env) {
					return (
						<div>
							<aTag color="cyan">{env.name}</aTag>
							<span>{env.domain}</span>
						</div>
					);
				}
			} else {
				return "--";
			}
		},
		ajaxCode() {
			const { tag, up_time, title, uid, username, path, method } =
				this.detailInfo;
			const projectId = this.State_App.currProject._id;
			const interfaceId = this.Cpt_url.query.interface_id;
			/* TODO:后端获取模板 */
			return `\`\`\`js
/**
*  ${title}
*  ${window.location.href}
*  http://10.143.133.216:3001/project/${projectId}/interface/api/${interfaceId}
*/
async ${xU.camelCase(path)}({params,data}) {
	return await request({
		method: "${method}",
		url: \`${path}\`,
		params:params||{},
		data:data||{}
	});
}
\`\`\`
`;
		},
		vDomCopyAjaxCodePanel() {
			// const ajaxCode = HighlightJS.highlight("javascript", this.ajaxCode);
			return (
				<div style="position:relative;overflow:auto;height:100%;">
					<Mkit md={this.ajaxCode} />
					{/* <MonacoEditor code={this.ajaxCode} style={{ minHeight: 180 }} readOnly={true} /> */}
				</div>
			);
		},
		vDomMockHref() {
			/* @ts-ignore */
			const { protocol, hostname, port } = location;
			return `${protocol}//${hostname}${port ? `:${port}` : ""}/mock/${
				this.State_App.currProject._id
			}${this.State_App.currProject.basepath}${this.detailInfo.path}`;
		},
		descriptions() {
			const vm = this;
			const {
				tag,
				up_time,
				title,
				uid,
				username,
				status,
				path,
				method,
				isProxy,
				custom_field_value,
				desc
			} = this.detailInfo || {};

			const rowArray = [
				{
					colArray: [
						{
							label: "接口名称",
							value: this.detailInfo?.title
						},
						{
							label: "维护人",
							value: (
								<>
									<aAvatar
										src={"/api/user/avatar?uid=" + uid}
										class="mr8"
										style="height:24px;width:24px;"
									/>
									<a>{username}</a>
								</>
							)
						}
					]
				},
				{
					colArray: [
						{ label: "状态", value: ITEM_OPTIONS_VDOM.status(status) },
						{ label: "更新时间", value: xU.dateFormat(up_time) }
					]
				},
				{
					colArray: [
						{
							label: "接口路径",
							col: 3,
							value: (
								<CopyContent class="flex middle">
									{ITEM_OPTIONS_VDOM.httpMethod(method)}
									{this.State_App.currProject.basepath} {path}
								</CopyContent>
							)
						}
					]
				},
				{
					colArray: [
						{ label: "Tag", col: 3, value: ITEM_OPTIONS_VDOM.tags(tag) }
					]
				},
				{
					colArray: [
						{
							label: "是否开启转发",
							col: 1,
							value: xU.find(ITEM_OPTIONS.trueOrFalse, { value: isProxy })
								?.label
						},
						{
							label: "转发环境",
							col: 2,
							value: this.labelProxyEnv,
							isHide: !isProxy
						}
					]
				},
				{
					colArray: [
						{
							label: (
								<div class="flex middle">
									<aButton type="primary">{vm.$t("运行").label}</aButton>
									<span class="flex1">{$t("Mock地址").label}</span>
								</div>
							),
							col: 3,
							value: (
								<div class="flex middle width100">
									{this.flagMsg(
										this.State_App.currProject.is_mock_open,
										this.State_App.currProject.strice
									)}
									<CopyContent>
										<span class="href">{this.vDomMockHref}</span>
									</CopyContent>
									<xGap f="1" />
								</div>
							)
						}
					]
				},
				{
					style: `height:400px;`,
					colArray: [
						{
							label: (
								<div class="flex middle">
									<aButton onClick={() => vm.copyUrl(vm.ajaxCode)}>
										{$t("复制代码").label}
									</aButton>
									<span class="flex1">{$t("ajax代码").label}</span>
								</div>
							),
							col: 3,
							value: this.vDomCopyAjaxCodePanel
						}
					]
				}
			];

			if (
				custom_field_value &&
				this.State_App.currGroup?.custom_field?.enable
			) {
				rowArray.push([
					{
						label: this.State_App.currGroup.custom_field.enable,
						col: 3,
						value: custom_field_value
					}
				]);
			}
			return {
				rowArray,
				colLabelWidth: "220px"
			};
		}
	},
	render(vm) {
		if (!vm.detailInfo || !vm.State_App.currProject) {
			return <aSpin spinning={true} class="flex middle center flex1"></aSpin>;
		}
		xU(vm.State_App.currGroup, vm.State_App.currProject, vm.detailInfo);
		return (
			<xView style="overflow:hidden;">
				<div class="flex">
					<xButton onClick={vm.showModifyInterfaceDialog}>修改</xButton>
					<xGap f="1" />
				</div>
				<div class="flex1 overflow-auto mt10">
					<InfoCard title={<span>基本信息</span>} info={vm.descriptions} />
					<xGap t="20" />
					{vm.detailInfo.desc && (
						<InfoCard title={vm.$t("备注").label}>
							<TuiEditor modelValue={{ html: vm.detailInfo.desc }} readonly />
						</InfoCard>
					)}
					<xGap t="20" />
					<InfoCard title={"请求参数"}>
						{vm.configs_table_path_params.dataSource.length > 0 && (
							<aCard title={vm.$t("路径参数").label}>
								<xDataGrid configs={vm.configs_table_path_params} />
							</aCard>
						)}
						{vm.configs_table_headers.dataSource.length > 0 && (
							<>
								<xGap t="10" />
								<aCard title={vm.$t("Headers").label}>
									<xDataGrid configs={vm.configs_table_headers} />
								</aCard>
							</>
						)}
						{vm.configs_table_query.dataSource.length > 0 && (
							<>
								<xGap t="10" />
								<aCard title={vm.$t("Query").label}>
									<xDataGrid configs={vm.configs_table_query} />
								</aCard>
							</>
						)}
						{vm.detailInfo.req_body_type == "form" &&
							vm.configs_table_body_form.dataSource.length > 0 && (
								<>
									<xGap t="10" />
									<aCard title={vm.$t("Body").label}>
										<xDataGrid configs={vm.configs_table_body_form} />
									</aCard>
								</>
							)}
						{vm.detailInfo.req_body_type == "json" &&
							vm.detailInfo.req_body_other && (
								<>
									<xGap t="10" />
									<aCard title={vm.$t("Body").label}>
										<div style="height:300px;width:90%">
											{vm.detailInfo.req_body_other}
											{
												<JsonSchemaMonaco
													v-model:schemaString={vm.detailInfo.req_body_other}
													readOnly={true}
												/>
											}
										</div>
									</aCard>
								</>
							)}
						{vm.detailInfo.req_body_type == "raw" &&
							vm.detailInfo.req_body_other && (
								<>
									<xGap t="10" />
									<aCard title={vm.$t("Body").label}>
										<div style="height:300px;width:90%">
											<MonacoEditor
												language="json"
												code={vm.detailInfo.req_body_other}
												readOnly={true}
											/>
										</div>
									</aCard>
								</>
							)}
					</InfoCard>
					{vm.detailInfo.res_body && (
						<>
							<xGap t="20" />
							<InfoCard title={"返回信息"}>
								<div style="height:300px;width:90%">
									{(() => {
										if (vm.detailInfo.res_body_type === "json") {
											return (
												<JsonSchemaMonaco
													v-model:schemaString={vm.detailInfo.res_body}
													readOnly={true}
												/>
											);
										}

										return (
											<MonacoEditor
												language="json"
												code={vm.detailInfo.res_body}
												readOnly={true}
											/>
										);
									})()}
								</div>
							</InfoCard>
						</>
					)}
				</div>
			</xView>
		);
	}
});
