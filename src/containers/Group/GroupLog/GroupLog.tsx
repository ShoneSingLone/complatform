import TimeTree from "@/components/TimeLine/Timeline";
import { State_App } from "@/state/State_App";
import { defineComponent } from "vue";

export default defineComponent({
	props: ["match"],
	setup() {
		return { State_App };
	},
	render() {
		return (
			<div class="g-row">
				<section class="news-box m-panel">
					<TimeTree type={"group"} typeid={this.State_App.currGroup._id} />
				</section>
			</div>
		);
	}
});
