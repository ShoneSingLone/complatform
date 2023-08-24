import { defineComponent } from "vue";
import { xU, $ } from "@/ventose/ui";
import { marked, Renderer } from "./marked/marked";
import { hljs } from "@/assets/libs/highlight";
import {
	leftArrow,
	MkitTheme,
	rightArrow,
	setTheme,
	newImageDomString
} from "./MkitTheme";
import "./MarkdownIt.less";

/* 异步
// const modules = import.meta.glob("../assets/highlightstyles/*.css");
*/
/* 同步 // const modules = import.meta.globEager("../assets/highlightstyles/*.css");*/

export const MarkdownIt = defineComponent({
	props: ["md" /* md text content */],
	setup() {
		setTheme();
	},
	data() {
		return {
			visible: false,
			imgSrc: "",
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
	beforeUnmount() {
		this.destoryListener();
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

			marked.options = { langClass: "hljs" };
			const renderer = new Renderer();

			renderer.image = function (href, title, text) {
				title = title || text;
				if (!href) {
					return text || "";
				}
				return newImageDomString(title, text, href);
			};

			/* @ts-ignore */
			this.html = marked(this.originHTML, {
				renderer,
				highlight: (code: any) => hljs.highlightAuto(code).value
			});
		},
		setVisible(visible: any) {
			this.visible = visible;
		},
		destoryListener() {
			if (this.$previewer) {
				this.$previewer.off("click");
				this.$previewer = null;
			}
		},
		showImg(imgSrc: any) {
			this.imgSrc = imgSrc;
			this.setVisible(true);
			this.ifHasMulImageAddArrow(imgSrc);
		},
		ifHasMulImageAddArrow(imgSrc) {
			const $md = $(this.$refs.markdown);
			const imgList = $md.find("img");
			if (imgList.length > 1) {
				this.$rawImgList = imgList;
				this.$rawImgIndex = xU.findIndex(
					imgList,
					i => $(i).attr("src") === imgSrc
				);

				setTimeout(() => {
					this.destoryListener();
					this.$previewer = $(".x-tui-image-preview-body");
					this.$previewer.on(
						"click",
						"[class^=x-tui-image-preview-switch-]",
						this.handleClickPreviewSwitch
					);
					this.$previewer.append(leftArrow);
					this.$previewer.append(rightArrow);
				}, 500);
			}
		},
		handleClickPreviewSwitch({ currentTarget }) {
			const { length } = this.$rawImgList;
			if ($(currentTarget).hasClass("right")) {
				this.$rawImgIndex = (this.$rawImgIndex + 1) % length;
			} else {
				this.$rawImgIndex = (this.$rawImgIndex - 1 + length) % length;
			}
			const imgSrc = $(this.$rawImgList[this.$rawImgIndex]).attr("src");
			$(".x-tui-image-preview-img").attr("src", imgSrc);
		},
		handleClick(event: { target: any }) {
			const { target } = event;
			const $ele = $(target).parents(".x-tui-image[data-src]");
			if ($ele && $ele.length) {
				this.showImg($ele.attr("data-src"));
			}
		}
	},
	render({ visible, setVisible, imgSrc, handleClick }) {
		return (
			<>
				<div
					ref="markdown"
					onClick={handleClick}
					class="markdown-wrapper_description mt10"
					v-xTips={this.configsPopoverChangeTheme}
					innerHTML={this.html}
					title="右键点击可以修改<code/>元素高亮样式"></div>
				{/*  */}
				<div class="display-none">
					<ElImage
						src={imgSrc}
						preview={{
							visible,
							onVisibleChange: setVisible
						}}
					/>
				</div>
			</>
		);
	}
});
