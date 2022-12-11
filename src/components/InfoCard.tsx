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
	props: ["item"],
	computed: {
		vDomCol() {
			if (this.item) {
				return xU.map(this.item, col => {
					return <InfoCardCol col={col} />;
				});
			}
			return null;
		}
	},
	render() {
		return <div class="ant-descriptions-row flex middle">{this.vDomCol}</div>;
	}
});

export const InfoCard = defineComponent({
	props: ["items", "title"],
	computed: {
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
			if (this.items) {
				return (
					<div class="ant-descriptions-view">
						{xU.map(this.items, row => {
							return <InfoCardRow item={row} />;
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
