import { defineComponent } from "vue";
import $ from "jquery";

export const xVirTableTr = defineComponent({
	props: ["column", "data"],
	computed: {
	},
	data(vm) {
		return {
			isFocus: false
		}
	},
	methods: {
	},
	mounted() {
		$(window).on("onAllCell", this.handleAllCell)
	},
	beforeUnmount() {
		$(window).off("onAllCell", this.handleAllCell)
	},
	render() {
		return (
			<div
				id={this.id}
				ref="cell"
				role="td"
				class="xVirTable-cell"
				data-prop={this.prop}
				data-row-index={this.data.__virRowIndex} >
				{this.vDomCellContent}
			</div>
		);
	}
});
