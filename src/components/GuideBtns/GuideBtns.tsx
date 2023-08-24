import { defineComponent } from "vue";
import { Methods_App } from "@/state/app";

export default defineComponent({
	props: ["isLast"],
	methods: {
		// 点击下一步
		nextStep() {
			Methods_App.changeStudyTip();
			if (this.isLast) {
				Methods_App.finishStudy();
			}
		},

		// 点击退出指引
		exitGuide() {
			Methods_App.finishStudy();
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
