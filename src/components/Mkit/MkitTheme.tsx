//@ts-nocheck
import { defineComponent } from "vue";
import $ from "jquery";
import { MkitCsslist } from "./MkitCsslist";
import { stateUI, xU } from "@/ventose/ui";
import { hljs } from "@/assets/libs/highlight";

export const setTheme = async (theme = "") => {
	theme =
		theme || localStorage.markdownHightlightTheme || "monokai-sublime.css";
	const cssURL = `${stateUI.assetsPath}/highlightstyles/${theme}`;
	localStorage.markdownHightlightTheme = theme;
	const id = `markdonw-hightlight-style`;
	/* 同一个style block 不同的url */
	await xU.asyncLoadStyle(cssURL, { isReplace: true, id });
};

export const MkitTheme = defineComponent({
	setup() {
		return { setTheme };
	},
	computed: {
		cssURL() {
			return;
		}
	},
	watch: {
		theme: {
			immediate: true,
			async handler(theme) {
				this.setTheme(theme);
			}
		}
	},
	data() {
		return {
			theme: localStorage.markdownHightlightTheme || "monokai-sublime.css"
		};
	},
	render() {
		return (
			<select class="markdown-theme" v-model={this.theme}>
				{xU.map(MkitCsslist, i => {
					return (
						<option key={i.value} value={i.value}>
							{i.label}
						</option>
					);
				})}
			</select>
		);
	}
});

export const rightArrow = `<div class="x-tui-image-preview-switch-right right"><span role="img" aria-label="right" class="anticon anticon-right"><svg focusable="false" class="" data-icon="right" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path></svg></span></div>`;
export const leftArrow = `<div class="x-tui-image-preview-switch-left left"><span role="img" aria-label="left" class="anticon anticon-left"><svg focusable="false" class="" data-icon="left" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path></svg></span></div>`;

export function newImageDomString(
	title: any,
	text: any,
	href: any,
	index: number
): any {
	return `<div class="x-tui-image pointer el-card flex center middle" data-x-tui-image-index="${index}">
	<img class="x-tui-image-img" src="${href}" title="${title}" alt="${text}">
</div>`;
}

export class PreprocessHTML {
	constructor(html) {
		this.html = html;
		this.$html = $(this.html);
		this.img().a().codejs();
		this.toc();
	}

	toc() {
		const TOC_TAG = `&lt;!-- toc --&gt;`;
		const headers = xU.filter(this.$html, ele => {
			console.log(ele.tagName);
			return /^h(\d+)/i.test(ele.tagName);
		});

		if (headers.length === 0) {
			return this;
		}
		if (!String(this.html).includes(TOC_TAG)) {
			return this;
		}

		let $toc = $("<ul/>").css({ border: "1px solid #ccc" });
		let stack = [];

		for (const header of headers) {
			let level = parseInt(header.tagName.replace("H", ""), 10);
			// 通过两个where循环对栈进行调整,确保stack中标题级数与当前标题级数相同
			while (stack.length < level) {
				stack.push(0);
			}
			while (stack.length > level) {
				stack.pop();
			}
			// 最小一级标题标号步进+1
			stack[stack.length - 1]++;
			// 生成标题标号( 1.1,1.2.. )
			let index = stack.join(".");
			// 生成标题ID
			let id = "title" + index;
			header.setAttribute("id", id);
			// 为标题加上标号,如果不希望显示标号，把下面这行注释就可以了
			header.textContent = index + " " + header.textContent;
			$toc.append(
				$(`<li>
    <a>${new Array(level * 4).join("&nbsp;") + header.textContent}</a>
</li>`)
			);
		}
		this.html = this.html.replace(TOC_TAG, $toc[0].outerHTML);
		return this;
	}

	img() {
		const imgArray = this.$html.find("img");
		xU.each(imgArray, (img, index) => {
			const { alt, src } = img;
			this.html = this.html.replace(
				img.outerHTML,
				newImageDomString(alt, alt, src, index)
			);
		});
		return this;
	}

	a() {
		const aArray = this.$html.find("a");
		xU.each(aArray, (aDom, index) => {
			const aDomOuterHTML = aDom.outerHTML;
			const outerHTML = $(aDom).attr({
				target: "_blank",
				"data-markdwon-a-index": index
			})[0].outerHTML;
			this.html = this.html.replace(aDomOuterHTML, outerHTML);
		});
		return this;
	}

	codejs() {
		const codeArray = this.$html.find("code[data-language='js']");
		xU.each(codeArray, (codeDom, index) => {
			const $codeDom = $(codeDom);
			const codeDomOuterHTML = codeDom.outerHTML;
			$codeDom.addClass("hljs");
			let codeDomInnerHTML = String($codeDom[0].innerHTML);
			const innerHTML = hljs.highlightAuto(codeDomInnerHTML).value;
			/* => TODO:解析出问题 实体符的转换*/
			const innerHTMLReplaceGreatThan = innerHTML.replace(/=\&amp;gt;/g, "=>");
			/* => 解析出问题 */
			$codeDom[0].innerHTML = innerHTMLReplaceGreatThan;
			this.html = this.html.replace(codeDomOuterHTML, $codeDom[0].outerHTML);
		});
		return this;
	}
}
