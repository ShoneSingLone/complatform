import { defineComponent } from "vue";

export const DialogSourceCode = defineComponent({
	props: {
		/* Dialog 默认传入参数 */
		propOptions: {
			type: Object,
			default() {
				return { __elId: false };
			}
		}
	},
	render() {
		return (
			<div class="padding20">
				<mkit md={this.propOptions.code} />
			</div>
		);
	}
});
