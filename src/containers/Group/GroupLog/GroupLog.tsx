import TimeTree from "ysrc/components/TimeLine/Timeline";
import { State_App } from "ysrc/state/State_App";
import { defineComponent } from "vue";

export default defineComponent({
	props: ["match"],
	render() {
		return (
			<div class="g-row">
				<section class="news-box m-panel">
					<TimeTree
						type={"group"}
						typeid={this.State_App.group.currGroup._id}
					/>
				</section>
			</div>
		);
	}
});
