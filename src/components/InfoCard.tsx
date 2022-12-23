import { xU } from "@ventose/ui";
import { defineComponent } from "vue";
import "./InfoCard.less";

export const InfoCardCol = defineComponent({
	props: ["col"],
	computed: {
		vDomLabel() {
			return this.col.label;
		},
		vDomContent() {
			return this.col.value;
		}
	},
	render() {
		return (
			<>
				<div class="ant-descriptions-item-label">{this.vDomLabel}</div>
				<div class="ant-descriptions-item-content flex1">
					{this.vDomContent}
				</div>
			</>
		);
	}
});

export const InfoCardRow = defineComponent({
	props: ["row"],
	computed: {
		colArray() {
			return this?.row?.colArray || false;
		},
		vDomCol() {
			if (this.row) {
				return xU.map(this.colArray, col => {
					return <InfoCardCol col={col} />;
				});
			}
			return null;
		},
		styleRow() {
			if (this?.row?.style) {
				return this.row.style;
			}
			return "";
		}
	},
	render() {
		return (
			<div
				class="InfoCardRow ant-descriptions-row flex middle"
				style={this.styleRow}>
				{this.vDomCol}
			</div>
		);
	}
});

export const InfoCard = defineComponent({
	props: ["info", "title"],
	computed: {
		rowArray() {
			return this?.info?.rowArray || false;
		},
		vDomTitle() {
			if (!this.title) {
				return null;
			}
			return (
				<div class="ant-descriptions-header">
					<div class="ant-descriptions-title">{this.title}</div>
				</div>
			);
		},
		vDomDescriptions() {
			if (this.rowArray) {
				return (
					<div class="ant-descriptions-view">
						{xU.map(this.rowArray, row => {
							return <InfoCardRow row={row} />;
						})}
					</div>
				);
			}
			if (this.$slots.default) {
				return this.$slots.default();
			}
			return null;
		}
	},
	render() {
		return (
			<div class="ant-descriptions ant-descriptions-middle ant-descriptions-bordered x-infomation-card">
				{this.vDomTitle}
				{this.vDomDescriptions}
			</div>
		);
	}
});