import { defineComponent } from "vue";
import { stateApp } from "@/state/app";

export default defineComponent({
	props: ["isLast"],
	methods: {
		// 点击下一步
		nextStep() {
			stateApp._changeStudyTip();
			if (this.isLast) {
				stateApp._finishStudy();
			}
		},

		// 点击退出指引
		exitGuide() {
			stateApp._finishStudy();
		}
	},
	render() {
		return (
			<div class="btn-container">
				<xButton class="btn" type="primary" onClick={this.nextStep}>
					{this.isLast ? "完 成" : "下一步"}
				</xButton>
				<xButton class="btn" type="dashed" onClick={this.exitGuide}>
					退出指引
				</xButton>
			</div>
		);
	}
});
