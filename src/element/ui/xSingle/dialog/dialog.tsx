//@ts-nocheck

import { xU } from "../../ventoseUtils";
import $ from "jquery";
import { KEY, LayerUtils } from "../layer/LayerUtils";
import { compile, createApp, defineComponent } from "vue";
import { State_UI } from "../../State_UI";

const EcsPressHandler = xU.debounce(async function (event, dialogOptions) {
	const $antModal = $(".x-modal-root");
	/* 如果有ant的弹窗就不关闭layer */
	if ($antModal.length > 0) {
		return;
	}
	if (event.keyCode === KEY.esc) {
		await dialogOptions.closeDialog();
	}
}, 100);

export type t_dialogOptions = {
	/* 弹窗里面的弹窗点击之后不关闭（点不到其他位置） */
	keepTop?: boolean;
	payload?: any;
	isEcsCloseDialog?: boolean;
	/* 传入的组件的实例 */
	vmDialogContent?: object;
	/* 在component里面propDialogOptions作为参数传入*/
	title?: any;
	component: object;
	area?: string[];
	/* layer 索引，用于layer close */
	_dialogID?: number;
	fullscreen?: boolean;
	/*关闭方法*/
	$close?: Function;
	/* hook: 完成组件首次加载 */
	onAfterOpenDialoag?: Function;
	onBeforeClose?: Function;
};

const xDialogFooter = defineComponent({
	props: ["configs"],
	computed: {
		onCancel() {
			return this.configs.onCancel;
		},
		onOk() {
			return this.configs.onOk;
		},
		vDomOk() {
			if (this.configs?.hideOk) {
				return null;
			}
			const configs = {
				text: xU.isInput(this.configs.textOk)
					? this.configs.textOk
					: State_UI.$t("确定").label,
				disabled: xU.isInput(this.configs.disabledOk)
					? this.configs.disabledOk
					: false,
				onClick: this.onOk || xU.doNothing
			};
			return <xButton type="primary" class="ml10" configs={configs} />;
		},
		vDomCancel() {
			if (this.configs?.hideCancel) {
				return null;
			}
			const configs = {
				text: xU.isInput(this.configs.textCancel)
					? this.configs.textCancel
					: State_UI.$t("取消").label,
				disabled: xU.isInput(this.configs.disabledCancel)
					? this.configs.disabledCancel
					: false,
				onClick: this.onCancel || xU.doNothing
			};
			return <xButton class="ml10" configs={configs} />;
		},
		vDomContent() {
			if (this.$slots.default) {
				try {
					const vDom = this.$slots.default();
					vDom[0].children.pop();
					return vDom;
				} catch (error) {
					return this.$slots.default();
				}
			} else {
				return (
					<>
						{this.vDomCancel}
						{this.vDomOk}
					</>
				);
			}
		}
	},
	render() {
		return <div class="flex middle end paddingT20">{this.vDomContent}</div>;
	}
});

export const installUIDialogComponent = (
	UI,
	{ appPlugins, dependState },
	app
) => {
	app.component("xDialogFooter", xDialogFooter);
	UI.dialog.component = async (dialogOptions: t_dialogOptions) =>
		new Promise(resolve => {
			const { component: BussinessComponent, title, area } = dialogOptions;
			const id = xU.genId("xDialog");
			let $container = $("<div/>", { id });
			const _dialogID = `#${id}`;

			/* FIXED: */
			if (dialogOptions.yes) {
				dialogOptions._yes = dialogOptions.yes;
				delete dialogOptions.yes;
			}

			dialogOptions.$close = async () => {
				let isCloseDialog = true;
				if (dialogOptions.onBeforeClose) {
					const res = await dialogOptions.onBeforeClose({
						dialogOptions,
						_dialogID: "",
						$eleDialog: ""
					});
					if (xU.isBoolean(res) && !res) {
						isCloseDialog = false;
					}
				}
				if (isCloseDialog) {
					LayerUtils.close(handleEcsPress._dialogID);
				}
			};

			/*dialog 的vue app*/
			let dialogVueApp = null;

			/* 处理按Esc键关闭弹窗 */
			let handleEcsPress = {
				_dialogID: "",
				handler: event => EcsPressHandler(event, dialogOptions),
				on(_dialogID) {
					handleEcsPress._dialogID = _dialogID;
					if (!dialogOptions.isEcsCloseDialog) {
						return;
					}
					$(document).on(`keyup.${_dialogID}`, handleEcsPress.handler);
				},
				off() {
					$(document).off(`keyup.${_dialogID}`, handleEcsPress.handler);
					handleEcsPress = null;
				}
			};

			const layerOptions: i_layerOptions = xU.merge(
				dialogOptions,
				{
					/* 传入自定义样式 */
					contentClass: "flex1"
				},
				dialogOptions,
				{
					type: "dialog",
					title: [title || ""],
					area: area || [],
					content: $container,
					offset: "auto",
					/* 无按钮 */
					btn: [
						/*'确定', '取消'*/
					],
					success(dialogInst: t__ClassLayer) {
						const { _dialogID, _contentID } = dialogInst;
						handleEcsPress.on(_dialogID);
						/* dialog 实例 */
						window.dialogInst = dialogInst;
						dialogOptions.dialogInst = dialogInst;
						try {
							dialogVueApp = createApp(
								defineComponent({
									components: { BussinessComponent },
									setup() {
										const cpt_vDomTitle = (() => {
											if (xU.isFunction(title)) {
												return computed(title);
											} else {
												return title;
											}
										})();
										return { cpt_vDomTitle };
									},
									created() {
										this.dialogOptions.vmDialogContent = this;
										if (this.dialogOptions.keepTop) {
											setTimeout(() => {
												this.dialogOptions.dialogInst.cpt$shade.css(
													"z-index",
													1
												);
											}, 6);
										}
										resolve(this.dialogOptions);
									},
									mounted() {
										const vm = this;
										$(this.$refs.DIALOG_TITLE).appendTo(
											this.dialogOptions.dialogInst.cpt$title
										);

										vm.dialogOptions.dialogInst.setPosition();
										setTimeout(() => {
											vm.dialogOptions.dialogInst.setPosition();
											(function () {
												vm.$resizeObserver = new ResizeObserver(entries => {
													vm.dialogOptions.dialogInst.setPosition();
												});
												vm.$resizeObserver.observe(vm.$el);
											})();
										}, 64);
									},
									data() {
										return { dialogOptions };
									},
									render() {
										return (
											<div
												class="ventose-dialog-content"
												data-el-id={_dialogID}>
												{/* title 使用 vue render vNode，挂载之后替换到title的DOM里面 */}
												<div ref="DIALOG_TITLE">{this.cpt_vDomTitle}</div>
												<BussinessComponent
													propOptions={this.dialogOptions}
												/>
											</div>
										);
									}
								})
							);
							dialogVueApp.use(appPlugins, { dependState });
							dialogVueApp.mount(`#${_contentID}`);
						} catch (e) {
							console.error(e);
						}
						dialogOptions.onAfterOpenDialoag &&
							dialogOptions.onAfterOpenDialoag(dialogVueApp);
					},
					cancel() {
						dialogOptions.$close();
						return false;
					},
					end() {
						handleEcsPress.off();
						$container.remove();
						$container = null;
						if (dialogVueApp) {
							dialogVueApp.unmount();
							dialogVueApp = null;
						}
						dialogOptions.dialogInst = null;
						dialogOptions.payload = null;
						dialogOptions.vmDialogContent.$resizeObserver.disconnect();
						dialogOptions.vmDialogContent.$resizeObserver = null;
						dialogOptions.vmDialogContent = null;
						dialogOptions = null;
					}
				},
				xU.omit(dialogOptions, ["end", "cancel", "success", "content"])
			);
			LayerUtils.open(layerOptions);
		});
};
