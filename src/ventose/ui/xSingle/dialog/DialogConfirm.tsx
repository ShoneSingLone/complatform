import { defineComponent } from "vue";
import { xU } from "../../ventoseUtils";

export const DialogConfirm = defineComponent({
	setup() {
		return {};
	},
	props: {
		/* Dialog 默认传入参数 */
		propOptions: {
			type: Object,
			default() {
				return { __elId: false };
			}
		}
	},
	computed: {
		contentVNode() {
			if (this.propOptions?.payload?.content?.render) {
				return this.propOptions?.payload?.content.render();
			}

			if (xU.isFunction(this.propOptions?.payload?.content)) {
				return this.propOptions?.payload?.content();
			}
			return this.propOptions?.payload?.content || null;
		},
		configsBtn() {
			const vm = this;
			return {
				async onCancel() {
					if (vm.propOptions?.payload?.onCancel) {
						const isKeepDialog = await vm.propOptions.payload.onCancel();
						if (xU.isBoolean(isKeepDialog) && !isKeepDialog) {
							/* 返回boolean false，就不关闭窗口 */
							return;
						}
					}
					vm.propOptions.$close();
				},
				async onOk() {
					if (vm.propOptions?.payload?.onOk) {
						const isKeepDialog = await vm.propOptions.payload.onOk();
						if (xU.isBoolean(isKeepDialog) && !isKeepDialog) {
							/* 返回boolean false，就不关闭窗口 */
						} else {
							vm.propOptions.$close();
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
