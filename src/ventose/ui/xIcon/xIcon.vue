<template>
	<svg
		class="xIcon"
		v-bind="$attrs"
		:style="cpt_Style"
		:data-icon="$attrs.icon">
		<use :xlink:href="cpt_href"></use>
	</svg>
</template>
<script lang="tsx">
import $ from "jquery";
import { defineComponent } from "vue";
import { stateUI, xU } from "../index";
import { insideIconAutoGen } from "../../assets/svg/insideIconAutoGen";

export function xIconUseSvgInit() {
	let $svgWrapper = $("#__SVG_SPRITE_NODE__");
	if ($svgWrapper.length !== 1) {
		$(`
<svg id="__SVG_SPRITE_NODE__" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position: absolute; width: 0; height: 0" aria-hidden="true">
    <svg  id="xIcon_loading" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="currentColor"> <g><path d="M 27.020,22.82A0.182,0.182 1080 1 0 27.384,22.82A0.182,0.182 1080 1 0 27.020,22.82zM 23.002,26.966A0.362,0.362 1080 1 0 23.726,26.966A0.362,0.362 1080 1 0 23.002,26.966zM 17.586,29.1A0.544,0.544 1080 1 0 18.674,29.1A0.544,0.544 1080 1 0 17.586,29.1zM 11.756,28.814A0.724,0.724 1080 1 0 13.204,28.814A0.724,0.724 1080 1 0 11.756,28.814zM 6.584,26.16A0.906,0.906 1080 1 0 8.396,26.16A0.906,0.906 1080 1 0 6.584,26.16zM 3.002,21.648A1.088,1.088 1080 1 0 5.178,21.648A1.088,1.088 1080 1 0 3.002,21.648zM 1.658,16.108A1.268,1.268 1080 1 0 4.194,16.108A1.268,1.268 1080 1 0 1.658,16.108zM 2.764,10.604A1.45,1.45 1080 1 0 5.664,10.604A1.45,1.45 1080 1 0 2.764,10.604zM 6.082,6.166A1.632,1.632 1080 1 0 9.346,6.166A1.632,1.632 1080 1 0 6.082,6.166zM 10.954,3.624A1.812,1.812 1080 1 0 14.578,3.624A1.812,1.812 1080 1 0 10.954,3.624zM 16.426,3.466A1.994,1.994 1080 1 0 20.414,3.466A1.994,1.994 1080 1 0 16.426,3.466zM 21.436,5.72A2.174,2.174 1080 1 0 25.784,5.72A2.174,2.174 1080 1 0 21.436,5.72zM 24.996,9.954A2.356,2.356 1080 1 0 29.708,9.954A2.356,2.356 1080 1 0 24.996,9.954zM 26.412,15.438A2.538,2.538 1080 1 0 31.488,15.438A2.538,2.538 1080 1 0 26.412,15.438z"> </path> </g> </svg>
    ${insideIconAutoGen}
</svg>`).appendTo($("body"));
	}
}

export default defineComponent({
	name: "xIcon",
	data() {
		return {
			isLoad: false
		};
	},
	watch: {
		cpt_iconName: {
			immediate: true,
			handler() {
				this.loadSVG();
			}
		}
	},
	methods: {
		async loadSVG() {
			try {
				const $svg = $(this.cpt_selector);
				if ($svg.length !== 1) {
					/* useAllComponents xIconUseSvgInit 保证 $("#__SVG_SPRITE_NODE__")*/
					const $svgWrapper = $("#__SVG_SPRITE_NODE__");
					const $svgContent = $(`<svg/>`).attr("id", this.cpt_id);
					$svgWrapper.append($svgContent);
					const svgContent = await xU.asyncLoadText(this.cpt_icon_url);
					this.$nextTick(() => {
						const $svg = $(svgContent)
							.attr({
								id: this.cpt_id,
								fill: "inherit",
								class: "xIcon"
							})
							.removeAttr("style")
							.removeAttr("version")
							.removeAttr("xmlns")
							.removeAttr("p-id")
							.removeAttr("data-icon")
							.removeAttr("aria-hidden")
							.removeAttr("focusable")
							.removeAttr("width")
							.removeAttr("height");
						$svgContent.replaceWith($svg);
					});
				}

				this.$watch(
					"cpt_color",
					() => {
						$(this.$el).css("color", this.cpt_color);
					},
					{ immediate: true }
				);
				this.isLoad = true;
			} catch (error) {
				// console.error(error);
			}
		}
	},
	computed: {
		cpt_color() {
			let iconColor = this.$attrs.color || "inherit";
			return iconColor;
		},
		cpt_iconName() {
			let iconName = this.$attrs.icon || "loading";
			return iconName;
		},
		cpt_href() {
			if (!this.isLoad) {
				return "#xIcon_loading";
			}
			return this.cpt_selector;
		},
		cpt_selector() {
			return `#xIcon_${this.cpt_iconName}`;
		},
		cpt_id() {
			return `xIcon_${this.cpt_iconName}`;
		},
		cpt_icon_url() {
			return `${stateUI.assetsSvgPath}/${this.cpt_iconName}.svg`;
		},
		cpt_Style() {
			const src = this.$attrs.src;
			if (src) {
				return {
					background: "center center/contain no-repeat",
					"background-image": "var(--xIcon-img-url)",
					"--xIcon-img-url": `url(${src})`
				};
			} else {
				return {};
			}
		}
	}
});
</script>

<style lang="less">
.xIcon {
	width: 16px;
	height: 16px;

	&.auto-size {
		width: unset;
		height: unset;
	}
}

div[id^="lazy-svg_"] {
	display: flex;
}

.next-loading {
	height: 100%;
	width: 100%;

	&.next-open {
		pointer-events: none;
	}
}

.next-loading .next-loading-component {
	opacity: 0.7;
	filter: blur(1px);
	filter: "progid:DXImageTransform.Microsoft.Blur(PixelRadius=1, MakeShadow=false)";
	position: relative;
	pointer-events: none;
}

.next-loading-masker {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 99;
	opacity: 0.2;
	background: #fff;
}

.next-loading-inline {
	display: inline-block;
}

.next-loading-tip {
	display: block;
	position: absolute;
	z-index: 4;
	text-align: center;
}

.xIcon {
	&.icon-opreation_click {
		width: 24px;
		height: 24px;
		font-size: 24px;

		&:hover {
			transform: scale(1.2);
			cursor: pointer;
		}
	}
}
</style>
