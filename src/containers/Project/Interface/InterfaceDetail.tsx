import { defineComponent, ref, watch } from "vue";
import { $, xU, UI } from "@ventose/ui";
import { API } from "../../../api";
import { Methods_Project, State_Project } from "./State_Project";
import { Cpt_url } from "../../../router/router";
import { InfoCard, InfoCardCol } from "../../../components/InfoCard";
import { ITEM_OPTIONS_VDOM } from "../../../utils/common.options";
import { State_App } from "./../../../state/State_App";
import { DialogModifyInterface } from "./DialogModifyInterface";
import { makeAhref } from "src/components/RouterView/RouterView";
import { openProxyEnvDialog } from "./DialogModifyInterface"

export const InterfaceDetail = defineComponent({
	setup() {
		return { State_Project: State_Project, Cpt_url };
	},
	data(vm) {
		return {
			State_App,
			detailInfo: false
		};
	},
	watch: {
		"Cpt_url.query.interface_id": {
			immediate: true,
			async handler(interface_id) {
				if (!interface_id) {
					return;
				}
				const { data } = await API.project.fetchInterfaceDetail(
					this.Cpt_url.query.interface_id
				);
				this.detailInfo = data;
			}
		}
	},
	mounted() {
		openProxyEnvDialog();
	},
	methods: {
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
			const item = this.detailInfo;
			const $dialogModifyInterface = $(`.dialog-modify-interface`);

			if ($dialogModifyInterface.length > 0) {
				UI.message.warn(this.$t("已存在修改面板").label);
				return;
			}
			const { status, curdata, message } = await this.checkConflict(item);

			if (status == 2) {
				UI.dialog.confirm({
					content: (
						<div class="flex middle">
							<a href={makeAhref(`/user/profile/${curdata.uid}`)}>
								{curdata.username}
							</a>
							<div>正在编辑该接口，请稍后再试...</div>
						</div>
					)
				});
				this.closeWS();
				return;
			}

			if (message) {
				UI.message.warn(message);
			}

			UI.dialog.component({
				title: this.$t("修改接口").label + `-${item.title}`,
				fullscreen: true,
				component: DialogModifyInterface,
				oldInterface: item,
				maxmin: true,
				onBeforeClose: vm.closeWS,
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
		vDomMockHref() {
			/* @ts-ignore */
			const { protocol, hostname, port } = location;
			return `${protocol}//${hostname}${port ? `:${port}` : ""}/mock/${this.State_App.currProject._id
				}${this.State_App.currProject.basepath}${this.detailInfo.path}`;
		},
		descriptions() {
			const {
				tag,
				up_time,
				title,
				uid,
				username,
				status,
				path,
				method,
				custom_field_value,
				desc
			} = this.detailInfo || {};

			const items = [
				[
					{
						label: "接口名称",
						col: 3,
						value: this.detailInfo?.title
					}
				],
				[
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
					},
					{ label: "状态", value: ITEM_OPTIONS_VDOM.status(status) },
					{ label: "更新时间", value: xU.dateFormat(up_time) }
				],
				[
					{
						label: "接口路径",
						col: 3,
						value: (
							<CopyContent class="flex middle">
								{ITEM_OPTIONS_VDOM.httpMethod(method)}
								{this.State_App.currProject.basepath}
								{path}
							</CopyContent>
						)
					}
				],
				[
					{
						label: "Tag",
						col: 3,
						value: ITEM_OPTIONS_VDOM.tags(tag)
					}
				],
				[
					{
						label: (
							<div class="flex middle">
								<span class="mr10">Mock地址</span>
								<aButton type="primary">运行</aButton>
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
			];

			if (
				custom_field_value &&
				this.State_App.currGroup?.custom_field?.enable
			) {
				items.push([
					{
						label: this.State_App.currGroup.custom_field.enable,
						col: 3,
						value: custom_field_value
					}
				]);
			}
			if (desc) {
				items.push([
					{
						label: "备注",
						col: 3,
						value: desc
					}
				]);
			}

			return items;
		}
	},
	render() {
		if (!this.detailInfo || !this.State_App.currProject) {
			return <aSpin spinning={true}></aSpin>;
		}
		console.log(
			this.State_App.currGroup,
			this.State_App.currProject,
			this.detailInfo
		);
		return (
			<xView style="overflow:hidden;">
				<div class="flex">
					<xButton onClick={this.showModifyInterfaceDialog}>
						修改
					</xButton>
					<xGap l="10" />
					<xButton onClick={this.showModifyInterfaceDialog}>
						删除
					</xButton>
					<xGap f="1" />
				</div>
				<div class="flex1 overflow-auto mt10">
					<InfoCard title={<span>基本信息</span>} items={this.descriptions} />
					<xGap t="20" />
					<InfoCard title={"请求参数"}>
						<aCard title="Headers">
							<h3>Headers</h3>
						</aCard>
						<xGap t="10" />
						<aCard title="Query">
							<h3>Query</h3>
						</aCard>
					</InfoCard>
					<xGap t="20" />
					<InfoCard title={"返回信息"}>
						<aCard>返回信息</aCard>
						<aCard>返回信息</aCard>
						<aCard>返回信息</aCard>
						<aCard>返回信息</aCard>
						<aCard>返回信息</aCard>
						<aCard>返回信息</aCard>
						<aCard>返回信息</aCard>
					</InfoCard>
				</div>
			</xView>
		);
	}
});
