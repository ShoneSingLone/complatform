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
	_IDDialog?: number;
	/*关闭方法*/
	closeDialog?: Function;
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
		return <div class="flex middle end padding20">{this.vDomContent}</div>;
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
			const _IDDialog = `#${id}`;
			/* FIXED: */
			if (dialogOptions.yes) {
				dialogOptions._yes = dialogOptions.yes;
				delete dialogOptions.yes;
			}

			dialogOptions.closeDialog = async () => {
				let isCloseDialog = true;
				if (dialogOptions.onBeforeClose) {
					const res = await dialogOptions.onBeforeClose({
						dialogOptions,
						_IDDialog: "",
						$eleDialog: ""
					});
					if (xU.isBoolean(res) && !res) {
						isCloseDialog = false;
					}
				}
				if (isCloseDialog) {
					LayerUtils.close(handleEcsPress._IDDialog);
				}
			};

			/*dialog 的vue app*/
			let dialogVueApp = null;

			/* 处理按Esc键关闭弹窗 */
			let handleEcsPress = {
				_IDDialog: "",
				handler: event => EcsPressHandler(event, dialogOptions),
				on(_IDDialog) {
					handleEcsPress._IDDialog = _IDDialog;
					if (!dialogOptions.isEcsCloseDialog) {
						return;
					}
					$(document).on(`keyup.${_IDDialog}`, handleEcsPress.handler);
				},
				off() {
					$(document).off(`keyup.${_IDDialog}`, handleEcsPress.handler);
					handleEcsPress = null;
				}
			};

			const layerOptions = xU.merge(
				dialogOptions,
				{
					/* 传入自定义样式 */
					contentClass: "flex1",
					offset: ["160px", null],
					btn: [
						/*'确定', '取消'*/
					]
				},
				dialogOptions,
				{
					type: LayerUtils.DIALOG,
					title: [title || ""],
					area: area || [],
					content: $container,
					offset: ["160px", null],
					/* 无按钮 */
					btn: [
						/*'确定', '取消'*/
					],
					success(instanceDialog: t__ClassLayer) {
						const { _IDDialog, _IDContent } = instanceDialog;
						handleEcsPress.on(_IDDialog);
						/* dialog 实例 */
						dialogOptions.instanceDialog = instanceDialog;
						try {
							dialogVueApp = createApp(
								defineComponent({
									components: { BussinessComponent },
									beforeCreate(...args) {
										if (xU.isFunction(title)) {
											this.$options.computed = this.$options.computed || {};
											/* title 使用 vue render vNode，挂载之后替换到title的DOM里面 */
											this.$options.computed.DIALOG_TITLE = function () {
												return title();
											};
										}
									},
									created() {
										this.dialogOptions.vmDialogContent = this;
										if (this.dialogOptions.keepTop) {
											setTimeout(() => {
												this.dialogOptions.instanceDialog.cpt$shade.css(
													"z-index",
													1
												);
											}, 6);
										}
										resolve(this.dialogOptions);
									},
									mounted() {
										$(this.$refs.DIALOG_TITLE).appendTo(
											this.dialogOptions.instanceDialog.cpt$title
										);
									},
									data() {
										return { dialogOptions };
									},
									render() {
										return (
											<div
												class="ventose-dialog-content"
												data-el-id={_IDDialog}>
												{/* title 使用 vue render vNode，挂载之后替换到title的DOM里面 */}
												<div ref="DIALOG_TITLE">{this.DIALOG_TITLE}</div>
												<BussinessComponent
													propDialogOptions={this.dialogOptions}
												/>
											</div>
										);
									}
								})
							);
							dialogVueApp.use(appPlugins, { dependState });
							dialogVueApp.mount(`#${_IDContent}`);
						} catch (e) {
							console.error(e);
						}
						dialogOptions.onAfterOpenDialoag &&
							dialogOptions.onAfterOpenDialoag(dialogVueApp);
					},
					cancel() {
						dialogOptions.closeDialog();
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
						dialogOptions.payload = null;
						dialogOptions.vmDialogContent = null;
						dialogOptions = null;
					}
				},
				xU.omit(dialogOptions, ["end", "cancel", "success", "content"])
			);
			LayerUtils.open(layerOptions);
		});
};
