import { defineComponent } from "vue";
import { ViewUserProfile } from "./ViewUserProfile";

export const DialogUserInfo = defineComponent({
	props: {
		/* Dialog 默认传入参数 */
		propOptions: {
			type: Object,
			default() {
				return { __elId: false };
			}
		}
	},
	setup(props) {
		const { payload, $close } = props.propOptions;

		return function () {
			return (
				<>
					<div class="x-dialog-boddy-wrapper ">
						<ViewUserProfile id={payload.user_id} />
					</div>
					<xDialogFooter configs={{ hideCancel: true, onOk: $close }} />
				</>
			);
		};
	}
});
