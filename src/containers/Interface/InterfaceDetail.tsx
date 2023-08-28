import { defineComponent } from "vue";
import {
	$,
	xU,
	defCol,
	defDataGridOption,
	stateUI,
	xI,
	lStorage
} from "@/ventose/ui";
import { API } from "@/api";
import { Cpt_url } from "@/router/router";
import { InfoCard } from "../../../components/InfoCard";
import { ITEM_OPTIONS, ITEM_OPTIONS_VDOM } from "@/utils/common.options";
import { stateApp } from "@/state/app";
import { DialogModifyInterface } from "./DialogModifyInterface";
import { makeAhref } from "@/components/RouterView/RouterView";
import copy from "copy-to-clipboard";
import { TuiEditor } from "../../../components/TuiEditor/TuiEditor";
import { JsonSchemaMonaco } from "../../../components/JsonSchemaEditor/JsonSchemaMonaco";
import { MonacoEditor } from "@/components/MonacoEditor/MonacoEditor";
import { stateInterface } from "@/state/interface";
import { socket, newWsPayload } from "@/utils/ws";
import {
	colParamsName,
	colRemark,
	colRequired,
	colExample,
	colType,
	colValue
} from "@/utils/common.columns";
import { DialogPostman } from "./DialogPostman";

export const InterfaceDetail = defineComponent({
	setup() {
		return { State_Project: stateInterface, Cpt_url, stateApp };
	},
	data(vm) {
		return {
			detailInfo: false,
			/* 路径参数 */
			configs_table_path_params: defDataGridOption({
				isHidePagination: true,
				dataSource: [],
				columns: {
					...colParamsName(),
					...defCol({
						prop: "example",
						label: xI("示例"),
						width: "300"
					}),
					...colRemark()
				},
				queryTableList: undefined
			}),
			/* header参数 */
			configs_table_headers: defDataGridOption({
				isHidePagination: true,
				dataSource: [],
				columns: {
					...colRequired(),
					...colParamsName(),
					...colValue,
					...colExample,
					...colRemark()
				},
				queryTableList: undefined
			}),
			/* query参数 */
			configs_table_query: defDataGridOption({
				isHidePagination: true,
				dataSource: [],
				columns: {
					...colRequired(),
					...colParamsName(),
					...colExample,
					...colRemark()
				},
				queryTableList: undefined
			}),
			/* body 参数 */
			configs_table_body_form: defDataGridOption({
				isHidePagination: true,
				dataSource: [],
				columns: {
					...colRequired(),
					...colParamsName(),
					...colType,
					...colExample,
					...colRemark()
				},
				queryTableList: undefined
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
	methods: {
		async runPostman() {
			const vm = this;
			xU.dialog({
				title: xI("修改接口"),
				component: DialogPostman,
				area: ["1024px", "624px"],
				maxmin: true
			});
		},
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
		copyCode() {
			const codeString = this.$refs.ajaxCode.innerText;
			copy(codeString);
			xU.message.success("已经成功复制到剪切板");
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
				xU.message.warn(xI("已存在修改面板"));
				return;
			}
			const { status, curdata, message } = await this.checkConflict(item);

			if (status == 2) {
				try {
					await xU.confirm({
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
					console.error(error);
				} finally {
					this.closeWS();
				}
				return;
			}

			if (message) {
				xU.message.warn(message);
			}
			xU.dialog({
				title: xI("修改接口") + `-${item.title}`,
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
					const wsURL = new URL(stateApp.baseURL);
					socket.on("solveConflict", data => {});
					socket
						.open(
							`${wsProtocol}://${wsURL.host}/ws?x-cookies=${JSON.stringify(
								lStorage["x-cookies"]
							)}`
						)
						.then(data => {
							socket.ws.send(newWsPayload("solveConflict"));
						});
				} catch (e) {}
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
				const envArray = this.stateApp.currProject.env;
				let env = xU.find(envArray, { _id: envId });
				if (env) {
					return (
						<div>
							<ElTag color="cyan">{env.name}</ElTag>
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
			const projectId = this.stateApp.currProject._id;
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
				<div
					style="position:relative;overflow:auto;height:100%;"
					ref="ajaxCode">
					<Mkit md={this.ajaxCode} />
					{/* <MonacoEditor code={this.ajaxCode} style={{ minHeight: 180 }} readOnly={true} /> */}
				</div>
			);
		},
		vDomMockHref() {
			/* @ts-ignore */
			const { protocol, hostname, port } = location;
			return `${protocol}//${hostname}${port ? `:${port}` : ""}/mock/${
				this.stateApp.currProject._id
			}${this.stateApp.currProject.basepath}${this.detailInfo.path}`;
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
									<ElAvatar
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
									{this.stateApp.currProject.basepath} {path}
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
									<xButton type="primary" onClick={vm.runPostman}>
										{xI("运行")}
									</xButton>
									<span class="flex1">{xI("Mock地址")}</span>
								</div>
							),
							col: 3,
							value: (
								<div class="flex middle width100">
									{this.flagMsg(
										this.stateApp.currProject.is_mock_open,
										this.stateApp.currProject.strice
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
									<xButton onClick={() => vm.copyCode()}>
										{xI("复制代码")}
									</xButton>
									<span class="flex1">{xI("ajax代码")}</span>
								</div>
							),
							col: 3,
							value: this.vDomCopyAjaxCodePanel
						}
					]
				}
			];

			if (custom_field_value && this.stateApp.currGroup?.custom_field?.enable) {
				rowArray.push([
					{
						label: this.stateApp.currGroup.custom_field.enable,
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
		if (!vm.detailInfo || !vm.stateApp.currProject) {
			return <div v-xloading="trur" class="flex middle center flex1" />;
		}
		xU(vm.stateApp.currGroup, vm.stateApp.currProject, vm.detailInfo);
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
						<InfoCard title={xI("备注")}>
							<TuiEditor modelValue={{ html: vm.detailInfo.desc }} readonly />
						</InfoCard>
					)}
					<xGap t="20" />
					<InfoCard title={"请求参数"}>
						{vm.configs_table_path_params.dataSource.length > 0 && (
							<ElCard title={xI("路径参数")}>
								<xDataGrid configs={vm.configs_table_path_params} />
							</ElCard>
						)}
						{vm.configs_table_headers.dataSource.length > 0 && (
							<>
								<xGap t="10" />
								<ElCard title={xI("Headers")}>
									<xDataGrid configs={vm.configs_table_headers} />
								</ElCard>
							</>
						)}
						{vm.configs_table_query.dataSource.length > 0 && (
							<>
								<xGap t="10" />
								<ElCard title={xI("Query")}>
									<xDataGrid configs={vm.configs_table_query} />
								</ElCard>
							</>
						)}
						{vm.detailInfo.req_body_type == "form" &&
							vm.configs_table_body_form.dataSource.length > 0 && (
								<>
									<xGap t="10" />
									<ElCard title={xI("Body")}>
										<xDataGrid configs={vm.configs_table_body_form} />
									</ElCard>
								</>
							)}
						{vm.detailInfo.req_body_type == "json" &&
							vm.detailInfo.req_body_other && (
								<>
									<xGap t="10" />
									<ElCard title={xI("Body")}>
										<JsonSchemaMonaco
											v-model:schemaString={vm.detailInfo.req_body_other}
											readOnly={true}
										/>
									</ElCard>
								</>
							)}
						{vm.detailInfo.req_body_type == "raw" &&
							vm.detailInfo.req_body_other && (
								<>
									<xGap t="10" />
									<ElCard title={xI("Body")}>
										<div style="height:300px;width:90%">
											<MonacoEditor
												language="json"
												code={vm.detailInfo.req_body_other}
												readOnly={true}
											/>
										</div>
									</ElCard>
								</>
							)}
					</InfoCard>
					{vm.detailInfo.res_body && (
						<>
							<xGap t="20" />
							<InfoCard title={"返回信息"}>
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
							</InfoCard>
						</>
					)}
				</div>
			</xView>
		);
	}
});
