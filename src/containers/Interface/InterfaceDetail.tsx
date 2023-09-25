import { computed, defineComponent, watch } from "vue";
import { $, xU, defCol, defDataGrid, xI, lStorage, xScope } from "@/ventose/ui";
import { API } from "@/api";
import { cptRouter } from "@/router/router";
import { ITEM_OPTIONS_VDOM } from "@/utils/common.options";
import { stateApp } from "@/state/app";
import { DialogModifyInterface } from "./DialogModifyInterface";
import { makeAhref } from "@/components/RouterView/RouterView";
import * as copyToClipboard from "copy-to-clipboard";
import { TuiEditor } from "@/components/TuiEditor/TuiEditor";
import { JsonSchemaMonaco } from "@/components/JsonSchemaEditor/JsonSchemaMonaco";
import { MonacoEditor } from "@/components/MonacoEditor/MonacoEditor";
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
		var state = {
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
				state.detailInfo = data;
				xU(data);
				state.headersParams.dataSource = xU.orderBy(
					data.req_headers,
					["required"],
					["desc"]
				);
				state.pathParams.dataSource = xU.orderBy(
					data.req_params,
					["required"],
					["desc"]
				);
				state.queryParams.dataSource = xU.orderBy(
					data.req_query,
					["required", "type"],
					["desc", "asc"]
				);
				state.bodyFormParams.dataSource = xU.orderBy(
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
				state.WebSocket && state.WebSocket.close();
				delete state.WebSocket;
			},
			async _showModifyInterfaceDialog() {
				await xU.ensureValueDone(() => state.detailInfo);
				const item = state.detailInfo;
				const $dialogModifyInterface = $(`.dialog-modify-interface`);

				if ($dialogModifyInterface.length > 0) {
					xU.message.warn(xI("已存在修改面板"));
					return;
				}
				const { status, curdata, message } = await state._checkConflict(item);

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
						state._closeWS();
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
					_updateInterfaceInfo: state._updateInterfaceInfo,
					onBeforeClose: state._closeWS()
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
		type t_vm = typeof state;
		state = xScope<t_vm>(state);

		var cpt_labelProxyEnv = computed(() => {
			if (!state.detailInfo.isProxy) {
				return "Y-api Mock 数据";
			}
			const envId = state.detailInfo.witchEnv;
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
			const { title, path, method } = state.detailInfo;
			const projectId = stateApp.currProject._id;
			const interfaceId = cptRouter.value.query.interface_id;

			const requestCode = new Function(
				"params",
				`return (${stateApp.currProject.requestCode})(params)`
			);

			return requestCode({
				title,
				path,
				method,
				projectId,
				interfaceId,
				xU
			});
		});

		var cpt_vDomCopyAjaxCodePanel = computed(() => {
			// const ajaxCode = HighlightJS.highlight("javascript", vm.ajaxCode);
			return (
				<div
					style="position:relative;overflow:auto;height:100%;"
					ref="ajaxCode"
					id="interfaceDetailAjaxCode">
					<Mkit md={cpt_ajaxCode.value} />
					<xButton
						onClick={() => state._copyAjaxCode()}
						style="position:absolute;right:16px;top:16px;">
						{xI("复制代码")}
					</xButton>
					{/* <MonacoEditor code={vm.ajaxCode} style={{ minHeight: 180 }} readOnly={true} /> */}
				</div>
			);
		});

		var cpt_vDomMockHref = computed(() => {
			/* @ts-ignore */
			const { protocol, hostname, port } = location;
			return `${protocol}//${hostname}${port ? `:${port}` : ""}/mock/${
				stateApp.currProject._id
			}${stateApp.currProject?.basepath}${state.detailInfo.path}`;
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
			}: any = state.detailInfo || {};

			return {
				title: <span>{xI("基本信息")}</span>,
				labelWidth: 120,
				items: {
					title: {
						label: "接口名称",
						content: () => state.detailInfo?.title
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
									{state._flagMsg(
										stateApp.currProject.isMockOpen,
										stateApp.currProject.strice
									)}
									<CopyContent>
										<span class="href">{cpt_vDomMockHref.value}</span>
									</CopyContent>
									<xGap f="1" />
									<xButton type="primary" onClick={state._runPostman}>
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

		const cpt_vNodeDesc = computed(() => {
			if (state.detailInfo.desc) {
				const modelValue = { md: state.detailInfo.markdown };
				return (
					<>
						<xGap t="20" />
						<xInfoCard title={xI("备注")}>
							<TuiEditor v-model={modelValue} isReadonly={true} />
						</xInfoCard>
					</>
				);
			}
		});

		const cpt_vNodePath = computed(() => {
			if (state.pathParams.dataSource.length) {
				return (
					<elCard header={xI("路径参数")}>
						<xDataGrid configs={state.pathParams} />
					</elCard>
				);
			}
		});
		const cpt_vNodeHeaders = computed(() => {
			debugger;
			if (state.headersParams.dataSource.length) {
				return (
					<>
						<xGap t />
						<elCard header={xI("Headers")}>
							<xDataGrid configs={state.headersParams} />
						</elCard>
					</>
				);
			}
		});
		const cpt_vNodeQuery = computed(() => {
			if (state.queryParams.dataSource.length) {
				return (
					<>
						<xGap t />
						<elCard header={xI("Query")}>
							<xDataGrid configs={state.queryParams} />
						</elCard>
					</>
				);
			}
		});
		const cpt_vNodeReq = computed(() => {
			if (state.queryParams.dataSource.length) {
				if (state.detailInfo.req_body_type == "form") {
					if (state.bodyFormParams.dataSource.length) {
						return (
							<>
								<xGap t />
								<elCard header={xI("Body")}>
									<xDataGrid configs={state.bodyFormParams} />
								</elCard>
							</>
						);
					}
				} else if (state.detailInfo.req_body_type == "json") {
					if (state.detailInfo.req_body_other) {
						return (
							<>
								<xGap t />
								<elCard header={xI("Body")}>
									<JsonSchemaMonaco
										v-model:schemaString={state.detailInfo.req_body_other}
										readOnly={true}
									/>
								</elCard>
							</>
						);
					}
				} else if (state.detailInfo.req_body_type == "raw") {
					if (state.detailInfo.req_body_other) {
						return (
							<>
								<xGap t />
								<elCard header={xI("Body")}>
									<div style="height:300px;width:90%">
										<MonacoEditor
											language="json"
											code={state.detailInfo.req_body_other}
											readOnly={true}
										/>
									</div>
								</elCard>
							</>
						);
					}
				}
			}
		});

		const cpt_vNodeRequest = computed(() => {
			if (state.detailInfo.desc) {
				return (
					<>
						<xGap t="20" />
						<xInfoCard title={"请求参数"}>
							{cpt_vNodePath.value}
							{cpt_vNodeHeaders.value}
							{cpt_vNodeQuery.value}
							{cpt_vNodeReq.value}
						</xInfoCard>
					</>
				);
			}
		});
		const cpt_vNodeResponse = computed(() => {
			if (state.detailInfo.res_body) {
				return (
					<>
						<xGap t="20" />
						<xInfoCard title={"Response信息"}>
							{(() => {
								if (state.detailInfo.res_body_type === "json") {
									return (
										<JsonSchemaMonaco
											v-model:schemaString={state.detailInfo.res_body}
											readOnly={true}
										/>
									);
								}

								return (
									<MonacoEditor
										language="json"
										code={state.detailInfo.res_body}
										readOnly={true}
									/>
								);
							})()}
						</xInfoCard>
					</>
				);
			}
		});

		watch(
			() => cptRouter.value.query.interface_id,
			interface_id => {
				if (interface_id) {
					state._updateInterfaceInfo();
				}
			},
			{ immediate: true }
		);

		return function () {
			if (!state.detailInfo || !stateApp.currProject) {
				return <div v-xloading="true" class="flex middle center flex1" />;
			}
			xU(stateApp.currGroup, stateApp.currProject, state.detailInfo);
			return (
				<div class="flex width100 flex1 paddingT paddingR paddingB">
					<div class="interface-detail-wrapper width100 padding box-shadow flex vertical">
						<div class="flex end width100">
							<xButton onClick={state._showModifyInterfaceDialog}>预览</xButton>
							<xButton onClick={state._showModifyInterfaceDialog}>编辑</xButton>
							<xButton onClick={state._showModifyInterfaceDialog}>运行</xButton>
							<xGap f="1" />
						</div>
						<div class="flex1 overflow-auto mt10">
							{/* 接口基本信息 */}
							<xInfoCard configs={cpt_interfaceInfo.value} />
							{/* 备注 */}
							{cpt_vNodeDesc.value}
							{/* 请求 */}
							{cpt_vNodeRequest.value}
							{/* 响应 */}
							{cpt_vNodeResponse.value}
						</div>
					</div>
				</div>
			);
		};
	}
});
