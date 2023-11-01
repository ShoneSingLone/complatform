import { computed, defineComponent, provide, watch } from "vue";
import { $, xU, xI, xScope, lStorage } from "@/ventose/ui";
import { cptRouter } from "@/router/router";
import { stateApp } from "@/state/app";
import { makeAhref } from "@/components/RouterView/RouterView";
import { DialogModifyInterface } from "./DialogModifyInterface";
import { InterfaceDetailPreview } from "./InterfaceDetailPreview";
import { InterfaceDetailEdit } from "./InterfaceDetailEdit";
import { InterfaceDetailRun } from "./InterfaceDetailRun";
import { EDIT, PREVIEW, RUN } from "@/utils/variable";
import { API } from "@/api";
import { stateInterface } from "@/state/interface";
import { socket, newWsPayload } from "@/utils/ws";

export const InterfaceDetail = defineComponent({
	components: { InterfaceDetailPreview },
	setup() {
		var state = {
			activeName: cptRouter.value.query.interface_detail_type || PREVIEW,
			async _showModifyInterfaceDialog() {
				await xU.ensureValueDone(() => stateInterface.currInterface);
				const item = stateInterface.currInterface;
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
		provide("InterfaceDetail", state);
		type t_vm = typeof state;
		state = xScope<t_vm>(state);

		const vDomPreview = computed(() => {
			if (cptRouter.value.query.interface_detail_type === PREVIEW) {
				return (
					<div class="flex1 overflow-auto mt10 height1">
						<InterfaceDetailPreview info={stateInterface.currInterface} />
					</div>
				);
			}
		});
		const vDomEdit = computed(() => {
			if (cptRouter.value.query.interface_detail_type === EDIT) {
				if (stateInterface?.currInterface?._id) {
					return (
						<InterfaceDetailEdit
							info={stateInterface.currInterface}
							categoryId={cptRouter.value.query.category_id}
							interfaceId={stateInterface.currInterface._id}
						/>
					);
				}
			}
		});
		const vDomRun = computed(() => {
			if (cptRouter.value.query.interface_detail_type === RUN) {
				return <InterfaceDetailRun info={stateInterface.currInterface} />;
			}
		});

		function go({ props }) {
			cptRouter.value.query.interface_detail_type = props.name;
		}

		watch(
			() => cptRouter.value.query.interface_id,
			interface_id => {
				if (interface_id) {
					stateInterface._updateInterfaceInfo(interface_id);
				}
			},
			{ immediate: true }
		);

		return function () {
			if (!stateApp.currProject) {
				return <div v-xloading="true" class="flex middle center flex1" />;
			}

			return (
				<div class="flex width100 flex1 paddingT paddingR paddingB">
					<div class="interface-detail-wrapper width100 padding box-shadow flex vertical">
						<el-tabs
							modelValue={cptRouter.value.query.interface_detail_type}
							onTabClick={go}>
							<el-tab-pane label="预览" name="PREVIEW" />
							<el-tab-pane label="编辑" name="EDIT" />
							<el-tab-pane label="运行" name="RUN" />
						</el-tabs>
						{vDomPreview.value}
						{vDomEdit.value}
						{vDomRun.value}
					</div>
				</div>
			);
		};
	}
});
