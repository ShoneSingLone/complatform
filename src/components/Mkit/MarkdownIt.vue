<template>
	<div
		class="markdown-wrapper_description mt10"
		v-uiPopover="configsPopoverChangeTheme"
		v-html="html"
		title="右键点击可以修改<code/>元素高亮样式">
	</div>
</template>
<script>
import { xU, $ } from "@ventose/ui";
import { marked } from "@/assets/libs/marked";
import { hljs } from "@/assets/libs/highlight";
import { MkitTheme, setTheme } from "./MkitTheme";

/* 异步
// const modules = import.meta.glob("../assets/highlightstyles/*.css");
*/
/* 同步
// const modules = import.meta.globEager("../assets/highlightstyles/*.css");
*/

export default {
	props: ["md" /* md text content */],
	setup() {
		setTheme();
	},
	data() {
		return {
			originHTML: "",
			html: "",
			configsPopoverChangeTheme: {
				trigger: "rightClick",
				content: MkitTheme,
				openAtPoint: true
			}
		};
	},
	async mounted() {
		this.init();
	},
	watch: {
		md() {
			this.init();
		}
	},
	methods: {
		init() {
			this.originHTML = (() => {
				if (xU.isInput(this.md)) {
					return this.md;
				}

				if (xU.isFunction(this.$slots?.default)) {
					const defaultItems = this.$slots?.default();
					if (xU.isArrayFill(defaultItems)) {
						return xU.first(defaultItems).children;
					}
				}
				return "---";
			})();
			const { Renderer } = marked;
			marked.options = { langClass: "hljs" };
			const renderer = new Renderer();
			this.html = marked(this.originHTML, {
				renderer,
				highlight: code => hljs.highlightAuto(code).value
			});
		}
	}
};
</script>

<style lang="scss">
.markdown-wrapper {
	position: relative;
	height: 100%;
	overflow: auto;

	.markdown-theme {
		display: none;
		position: absolute;
		right: 100px;
		top: 0;
		z-index: 1;
	}

	&:hover {
		.markdown-theme {
			display: block;
		}
	}
}

.markdown-wrapper_description {
	position: relative;


	table {
		border-collapse: collapse;
		border-spacing: 0;
		display: block;
		width: 100%;
		overflow: auto;
		word-break: normal;
		word-break: keep-all;

		th {
			font-weight: 700
		}

		td,
		th {
			padding: 6px 13px;
			border: 1px solid #ddd
		}

		tr {
			background-color: #fff;
			border-top: 1px solid #ccc
		}

		tr:nth-child(2n) {
			background-color: #f8f8f8
		}
	}




	code.hljs.language-js {
		border-radius: 6px;
	}
}
</style>
