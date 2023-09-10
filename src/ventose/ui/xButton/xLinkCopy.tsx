//@ts-nocheck

import { defineComponent } from "vue";
import copy from "copy-to-clipboard";
import $ from "jquery";

export const xLinkCopy = defineComponent({
	name: "xLinkCopy",
	props: ["to"],
	data() {
		return {};
	},
	setup(props) {},
	computed: {
		xDomText() {
			if (this.$slots?.default) {
				return this.$slots.default();
			}
			return "";
		}
	},
	watch: {},
	created() {},
	methods: {
		handleClickText(...args) {
			if (this.to) {
				this.to.apply(this, args);
			}
		},
		copyText() {
			if (copy($(this.$refs.contents).text())) {
				xU.message.success(xI("已经成功复制到剪切板"));
			} else {
				xU.message.error(xI("复制到剪切板失败"));
			}
		}
	},
	render({ xDomText, handleClickText, copyText }) {
		return (
			<div class="xLinkCopy x-btn x-btn-link flex">
				<div
					class="flex1 ellipsis mr4"
					onClick={handleClickText}
					v-xTips={{ onlyEllipsis: true }}
					ref="contents">
					{xDomText}
				</div>
				<xIcon icon="InsideCopy" class="xLinkCopy_icon" onClick={copyText} />
			</div>
		);
	}
});