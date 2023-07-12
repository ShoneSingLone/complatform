import { defineComponent } from "vue";
import { State_UI } from "../../State_UI";
import { Methods_App, State_App } from "../../../../state/State_App";
import { xU } from "../../ventoseUtils";

const { $t } = State_UI;

export const DialogConfirm = defineComponent({
	setup() {
		return {};
	},
	props: {
		/* Dialog 默认传入参数 */
		propDialogOptions: {
			type: Object,
			default() {
				return { __elId: false };
			}
		}
	},
	computed: {
		contentVNode() {
			return this.propDialogOptions?.payload?.content;
		},
		configsBtn() {
			const vm = this;
			return {
				async onCancel() {
					if (vm.propDialogOptions?.payload?.onCancel) {
						const isKeepDialog = await vm.propDialogOptions.payload.onCancel();
						if (xU.isBoolean(isKeepDialog) && !isKeepDialog) {
							/* 返回boolean false，就不关闭窗口 */
							return;
						}
					}
					vm.propDialogOptions.closeDialog();
				},
				async onOk() {
					if (vm.propDialogOptions?.payload?.onOk) {
						const isKeepDialog = await vm.propDialogOptions.payload.onOk();
						if (xU.isBoolean(isKeepDialog) && !isKeepDialog) {
							/* 返回boolean false，就不关闭窗口 */
						} else {
							vm.propDialogOptions.closeDialog();
						}
					}
				}
			};
		}
	},
	render() {
		const vm = this;
		return (
			<>
				<div class="padding20 flex1 overflow-auto">{vm.contentVNode}</div>
				<xDialogFooter configs={vm.configsBtn} />
			</>
		);
	},
	data() {
		return {};
	},
	methods: {},
	mounted() {}
});
