import { defineComponent } from "vue";

export const ReadonlyItem = defineComponent({
	props: ["value"],
	render() {
		return (
			<div
				class="cursor-not-allowed xItem_readonly ellipsis"
				v-uiPopover={{ onlyEllipsis: true }}>
				<div class="el-input flex">
					<div class="xItem_readonly__wrapper flex1">
						{this.value}
						{/* <span style="opacity:0">.</span> */}
					</div>
				</div>
			</div>
		);
	}
});
