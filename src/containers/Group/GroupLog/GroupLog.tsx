import { defineComponent } from "vue";
import { TimeLine } from "../../../components/TimeLine/TimeLine";
import { State_App } from "../../../state/State_App";

export default defineComponent({
	props: ["match"],
	setup() {
		return { State_App };
	},
	render() {
		return (
			<div class="g-row">
				<section class="news-box m-panel">
					<TimeLine type={"group"} typeid={this.State_App.currGroup._id} />
				</section>
			</div>
		);
	}
});
