import { createApp, defineComponent } from "vue";
import { xU } from "../../ventoseUtils";
import $ from "jquery";
import { KEY_ESC, NAME_LAYER_CONTENT, xLayer } from "../layer/xLayer";
import { xI } from "../../stateUI";

const EcsPressHandler = xU.debounce(async function (event, dialogOptions) {
	const $antModal = $(".x-modal-root");
	/* 如果有ant的弹窗就不关闭layer */
	if ($antModal.length > 0) {
		return;
	}
	if (event.keyCode === KEY_ESC) {
		await dialogOptions.$close();
	}
}, 100);

export type t_dialogOptions = {
	/* 在component里面propDialogOptions作为参数传入*/
	title?: any;
	/* 传入的组件 */
	component: object;
	/* 传入的组件的实例 */
	contentVM?: object;
	/* 用来组件间通信，业务参数 */
	payload?: any;
	/*关闭方法*/
	$close?: Function;
	/* 弹窗里面的弹窗点击之后不关闭（点不到其他位置） */
	keepTop?: boolean;
	isEcsCloseDialog?: boolean;
	area?: string[];
	/* layer 索引，用于layer close */
	_layer_index?: number;
	fullscreen?: boolean;
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
					: xI("确定"),
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
					: xI("取消"),
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

let DialogOpenAt = null;
window.addEventListener(
	"click",
	function (event) {
		const { x, y } = event;
		// console.log("click.DialogOpenAt", event.target);
		DialogOpenAt = { left: x, top: y };
	},
	/* 捕获，冒泡有可能被阻止 */
	true
);

export const installVentoseUIDialog = (app, { appUiPlugin, appState }, xU) => {
	app.component("xDialogFooter", xDialogFooter);

	xU.dialog = async function dialogComponent(dialogOptions: t_dialogOptions) {
		return new Promise(resolve => {
			if (DialogOpenAt) {
				dialogOptions.triggerDom = DialogOpenAt;
			}
			const { component: BussinessComponent, title, area } = dialogOptions;
			const id = xU.genId("xDialog");
			let $container = $("<div/>", { id });
			const _layer_index = `#${id}`;

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
						_layer_index: "",
						$eleDialog: ""
					});
					if (xU.isBoolean(res) && !res) {
						isCloseDialog = false;
					}
				}
				if (isCloseDialog) {
					xLayer.close(handleEcsPress._layer_index);
				}
			};

			/*dialog 的vue app*/
			let dialogVueApp = null;

			/* 处理按Esc键关闭弹窗 */
			let handleEcsPress = {
				_layer_index: "",
				handler: event => EcsPressHandler(event, dialogOptions),
				on(_layer_index) {
					handleEcsPress._layer_index = _layer_index;
					if (!dialogOptions.isEcsCloseDialog) {
						return;
					}
					$(document).on(`keyup.${_layer_index}`, handleEcsPress.handler);
				},
				off() {
					$(document).off(`keyup.${_layer_index}`, handleEcsPress.handler);
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
						const { _layer_index, _contentID } = dialogInst;
						handleEcsPress.on(_layer_index);
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
										this.dialogOptions.contentVM = this;
										if (this.dialogOptions.keepTop) {
											setTimeout(() => {
												this.dialogOptions.dialogInst.cpt$shade.css(
													"z-index",
													1
												);
											}, 6);
										}

										DialogOpenAt = null;
										resolve(this.dialogOptions);
									},
									mounted() {
										const vm = this;
										$(this.$refs.DIALOG_TITLE).appendTo(
											this.dialogOptions.dialogInst.cpt$title
										);
										/* xLayerDialog 在挂载之后重新计算Position */
										this.dialogOptions.dialogInst.$eleDialog.attr(
											"data-mounted",
											"mounted"
										);
									},
									data() {
										return { dialogOptions };
									},
									methods: {
										handleContentResize() {
											const width =
												this.dialogOptions.dialogInst.$eleDialog[0].style.width;
											console.log(width);
											if ("auto" === width) {
												this.dialogOptions.dialogInst.setPosition();
											}
										}
									},
									render() {
										return (
											<div
												class="ventose-dialog-content"
												data-el-id={_layer_index}
												v-element-size={this.handleContentResize}>
												{/* title 使用 vue render vNode，挂载之后替换到title的DOM里面 */}
												<div ref="DIALOG_TITLE">{this.cpt_vDomTitle}</div>
												<BussinessComponent propOptions={this.dialogOptions} />
											</div>
										);
									}
								})
							);
							dialogVueApp.use(appUiPlugin, { appState });
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
						dialogOptions.contentVM.$resizeObserver.disconnect();
						dialogOptions.contentVM.$resizeObserver = null;
						dialogOptions.contentVM = null;
						dialogOptions = null;
					}
				},
				xU.omit(dialogOptions, ["end", "cancel", "success", "content"])
			);
			xLayer.open(layerOptions);
		});
	};
};
