import { defineComponent } from "vue";
import { TimeLine } from "../../../components/TimeLine/TimeLine";
import { stateApp } from "@/state/app";

export default defineComponent({
	props: ["match"],
	setup() {
		return { stateApp };
	},
	render() {
		return <TimeLine type={"group"} typeid={this.stateApp.currGroup._id} />;
	}
});
