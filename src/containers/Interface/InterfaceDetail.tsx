import { computed, defineComponent, watch } from "vue";
import {
	$,
	xU,
	defCol,
	defDataGrid,
	stateUI,
	xI,
	lStorage,
	xScope
} from "@/ventose/ui";
import { API } from "@/api";
import { cptRouter } from "@/router/router";
import { ITEM_OPTIONS, ITEM_OPTIONS_VDOM } from "@/utils/common.options";
import { stateApp } from "@/state/app";
import { DialogModifyInterface } from "./DialogModifyInterface";
import { makeAhref } from "@/components/RouterView/RouterView";
import * as copyToClipboard from "copy-to-clipboard";
import { TuiEditor } from "@/components/TuiEditor/TuiEditor";
import { JsonSchemaMonaco } from "@/components/JsonSchemaEditor/JsonSchemaMonaco";
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
import { getAvatarSrcByid } from "@/utils/common";

export const InterfaceDetail = defineComponent({
	setup() {
		var vm = {
			WebSocket: null,
			detailInfo: false,
			/* 路径参数 */
			pathParams: defDataGrid({
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
			headersParams: defDataGrid({
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
			queryParams: defDataGrid({
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
			bodyFormParams: defDataGrid({
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
			}),
			async _runPostman() {
				xU.dialog({
					title: xI("修改接口"),
					component: DialogPostman,
					area: ["1024px", "624px"],
					maxmin: true
				});
			},
			async _updateInterfaceInfo() {
				const { data } = await API.project.fetchInterfaceDetail(
					cptRouter.value.query.interface_id
				);
				vm.detailInfo = data;
				xU(data);
				vm.headersParams.dataSource = xU.orderBy(
					data.req_headers,
					["required"],
					["desc"]
				);
				vm.pathParams.dataSource = xU.orderBy(
					data.req_params,
					["required"],
					["desc"]
				);
				vm.queryParams.dataSource = xU.orderBy(
					data.req_query,
					["required", "type"],
					["desc", "asc"]
				);
				vm.bodyFormParams.dataSource = xU.orderBy(
					data.req_body_form,
					["required", "type"],
					["desc", "asc"]
				);
			},
			_copyAjaxCode() {
				const codeString = $(`#interfaceDetailAjaxCode`).text();
				copyToClipboard(codeString);
				xU.message.success("已经成功复制到剪切板");
			},
			_flagMsg(mock, strice) {
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
			_closeWS() {
				vm.WebSocket && vm.WebSocket.close();
				delete vm.WebSocket;
			},
			async _showModifyInterfaceDialog() {
				const vm = this;
				await xU.ensureValueDone(() => vm.detailInfo);
				const item = vm.detailInfo;
				const $dialogModifyInterface = $(`.dialog-modify-interface`);

				if ($dialogModifyInterface.length > 0) {
					xU.message.warn(xI("已存在修改面板"));
					return;
				}
				const { status, curdata, message } = await vm._checkConflict(item);

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
						vm._closeWS();
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
					_updateInterfaceInfo: vm._updateInterfaceInfo,
					onBeforeClose: vm._closeWS()
				});
			},
			async _checkConflict() {
				const { hostname, port, protocol } = location;
				//因后端 node 仅支持 ws， 暂不支持 wss
				let wsProtocol = protocol === "https:" ? "wss" : "ws";

				return new Promise(() => {
					try {
						const wsURL = new URL(stateApp.BASE_URL);
						socket.on("solveConflict", () => {});
						socket
							.open(
								`${wsProtocol}://${wsURL.host}/ws?x-cookies=${JSON.stringify(
									lStorage["x_token"]
								)}`
							)
							.then(() => {
								socket.ws.send(newWsPayload("solveConflict"));
							});
					} catch (e) {}
				});
			}
		};

		type t_vm = typeof vm;

		vm = xScope<t_vm>(vm);

		var cpt_labelProxyEnv = computed(() => {
			if (!vm.detailInfo.isProxy) {
				return "Y-api Mock 数据";
			}
			const envId = vm.detailInfo.witchEnv;
			if (!envId) {
				return "任意";
			}
			if (envId) {
				const envArray = stateApp.currProject.env;
				let env = xU.find(envArray, { _id: envId });
				if (env) {
					return (
						<div>
							<el-tag>{env.name}</el-tag>
							<span class="ml10">{env.domain}</span>
						</div>
					);
				}
			} else {
				return "--";
			}
		});

		var cpt_ajaxCode = computed(() => {
			const { title, path, method } = vm.detailInfo;
			const projectId = stateApp.currProject._id;
			const interfaceId = cptRouter.value.query.interface_id;
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
		});

		var cpt_vDomCopyAjaxCodePanel = computed(() => {
			// const ajaxCode = HighlightJS.highlight("javascript", vm.ajaxCode);
			return (
				<div
					style="position:relative;overflow:auto;height:100%;"
					ref="ajaxCode"
					id="interfaceDetailAjaxCode">
					<Mkit md={cpt_ajaxCode.value} />
					{/* <MonacoEditor code={vm.ajaxCode} style={{ minHeight: 180 }} readOnly={true} /> */}
				</div>
			);
		});

		var cpt_vDomMockHref = computed(() => {
			/* @ts-ignore */
			const { protocol, hostname, port } = location;
			return `${protocol}//${hostname}${port ? `:${port}` : ""}/mock/${
				stateApp.currProject._id
			}${stateApp.currProject.basepath}${vm.detailInfo.path}`;
		});

		var cpt_interfaceInfo = computed(() => {
			const {
				tag,
				up_time,
				uid,
				username,
				status,
				path,
				method,
				isProxy,
				custom_field_value
			}: any = vm.detailInfo || {};

			return {
				title: <span>{xI("基本信息")}</span>,
				labelWidth: 120,
				items: {
					title: {
						label: "接口名称",
						content: () => vm.detailInfo?.title
					},
					username: {
						label: "维护人",
						content: () => (
							<div class="flex middle">
								<elAvatar
									src={getAvatarSrcByid(uid)}
									class="mr8"
									style="height:24px;width:24px;"
								/>
								<a>{username}</a>
							</div>
						)
					},
					status: {
						label: "状态",
						content: () => ITEM_OPTIONS_VDOM.status(status)
					},
					upTime: {
						label: "更新时间",
						content: () => xU.dateFormat(up_time)
					},
					path: {
						label: "接口",
						content: () => (
							<div class="flex vertical">
								<CopyContent class="flex middle">
									<span>{ITEM_OPTIONS_VDOM.httpMethod(method)}</span>
									<span class="ml8">
										{stateApp.currProject.basepath} {path}
									</span>
								</CopyContent>
								<div class="flex middle width100 mt10 ">
									{vm._flagMsg(
										stateApp.currProject.isMockOpen,
										stateApp.currProject.strice
									)}
									<CopyContent>
										<span class="href">{cpt_vDomMockHref.value}</span>
									</CopyContent>
									<xGap f="1" />
									<xButton type="primary" onClick={vm._runPostman}>
										{xI("运行")}
									</xButton>
								</div>
							</div>
						)
					},
					tag: {
						label: "Tag",
						col: 3,
						content: () => ITEM_OPTIONS_VDOM.tags(tag)
					},
					isProxy: {
						label: "是否开启转发",
						col: 1,
						content: () => ITEM_OPTIONS_VDOM.trueOrFalse(isProxy)
					},
					labelProxyEnv: {
						label: "转发环境",
						col: 2,
						content: () => cpt_labelProxyEnv.value,
						isHide: !isProxy
					},
					isMockOpen: {},
					ajaxCode: {
						label: (
							<div class="flex middle">
								<xButton onClick={() => vm._copyAjaxCode()}>
									{xI("复制代码")}
								</xButton>
								<span class="flex1">{xI("ajax代码")}</span>
							</div>
						),
						col: 3,
						content: () => cpt_vDomCopyAjaxCodePanel.value
					},
					customField: {
						label: stateApp.currGroup?.custom_field?.enable,
						isHide:
							custom_field_value && stateApp.currGroup?.custom_field1?.enable,
						content: () => custom_field_value
					}
				},
				layout({ rect }) {
					const { width } = rect;
					if (width < 666) {
						return [
							["title"],
							["status"],
							["upTime"],
							["username"],
							["tag"],
							["path"],
							["isProxy"],
							["labelProxyEnv"],
							["ajaxCode"],
							["customField"]
						];
					}
					return [
						["title:3", "", ""],
						["status", "upTime:2"],
						["username", "tag:2"],
						["path:3"],
						["isProxy", "labelProxyEnv:2"],
						["ajaxCode:3"],
						["customField:3"]
					];
				}
			};
		});

		watch(
			() => cptRouter.value.query.interface_id,
			interface_id => {
				if (interface_id) {
					vm._updateInterfaceInfo();
				}
			},
			{ immediate: true }
		);

		return function () {
			if (!vm.detailInfo || !stateApp.currProject) {
				return <div v-xloading="true" class="flex middle center flex1" />;
			}
			xU(stateApp.currGroup, stateApp.currProject, vm.detailInfo);
			return (
				<xView style="overflow:hidden;">
					<div class="flex">
						<xButton onClick={vm._showModifyInterfaceDialog}>修改</xButton>
						<xGap f="1" />
					</div>
					<div class="flex1 overflow-auto mt10">
						<xInfoCard configs={cpt_interfaceInfo.value} />
						<xGap t="20" />
						{vm.detailInfo.desc && (
							<xInfoCard title={xI("备注")}>
								<TuiEditor modelValue={{ html: vm.detailInfo.desc }} readonly />
							</xInfoCard>
						)}
						<xGap t="20" />
						<xInfoCard title={"请求参数"}>
							{vm.pathParams.dataSource.length > 0 && (
								<elCard title={xI("路径参数")}>
									<xDataGrid configs={vm.pathParams} />
								</elCard>
							)}
							{vm.headersParams.dataSource.length > 0 && (
								<>
									<xGap t />
									<elCard title={xI("Headers")}>
										<xDataGrid configs={vm.headersParams} />
									</elCard>
								</>
							)}
							{vm.queryParams.dataSource.length > 0 && (
								<>
									<xGap t />
									<elCard title={xI("Query")}>
										<xDataGrid configs={vm.queryParams} />
									</elCard>
								</>
							)}
							{vm.detailInfo.req_body_type == "form" &&
								vm.bodyFormParams.dataSource.length > 0 && (
									<>
										<xGap t />
										<elCard title={xI("Body")}>
											<xDataGrid configs={vm.bodyFormParams} />
										</elCard>
									</>
								)}
							{vm.detailInfo.req_body_type == "json" &&
								vm.detailInfo.req_body_other && (
									<>
										<xGap t />
										<elCard title={xI("Body")}>
											<JsonSchemaMonaco
												v-model:schemaString={vm.detailInfo.req_body_other}
												readOnly={true}
											/>
										</elCard>
									</>
								)}
							{vm.detailInfo.req_body_type == "raw" &&
								vm.detailInfo.req_body_other && (
									<>
										<xGap t />
										<elCard title={xI("Body")}>
											<div style="height:300px;width:90%">
												<MonacoEditor
													language="json"
													code={vm.detailInfo.req_body_other}
													readOnly={true}
												/>
											</div>
										</elCard>
									</>
								)}
						</xInfoCard>
						{vm.detailInfo.res_body && (
							<>
								<xGap t="20" />
								<xInfoCard title={"返回信息"}>
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
								</xInfoCard>
							</>
						)}
					</div>
				</xView>
			);
		};
	}
});
