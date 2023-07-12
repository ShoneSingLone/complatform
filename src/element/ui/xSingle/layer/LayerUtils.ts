//@ts-nocheck

/* https://www.layuiweb.com/doc/modules/layer.html#closeBtn */
import $ from "jquery";
import { xU } from "../../ventoseUtils";
import { i_layerOptions } from "./i_layerOptions";
import { getCurrentInstance } from "vue";

export const KEY = {
	right: 39,
	left: 37,
	esc: 27
};
/*
 *
 *
 * layerTipsId
 *
 * */
const $win = $(window);
const $html = $("html");
const $document = $(document);

/* 缓存常用字符 */
export const DATA_TIPS_FOLLOW_ID = "data-tips-follow-id";
export const DATA_V_UI_MOVE = "data-directive-ui-move";

const TYPE_DIALOG = "dialog";
const TYPE_PAGE = "page";
const TYPE_IFRAME = "iframe";
const TYPE_LOADING = "loading";
const TYPE_TIPS = "tips";
/*  */
const LAYUI_LAYER = "layui-layer";
const LAYUI_LAYER_SHADE = "layui-layer-shade";
const LAYUI_LAYER_MOVE = "layui-layer-move";
const LAYUI_LAYER_CONTENT = "layui-layer-content";
const LAYUI_LAYER_CLOSE = "layui-layer-close";
const LAYUI_LAYER_IFRAME = "layui-layer-iframe";
const LAYUI_LAYER_TITLE = "layui-layer-title";
const DOMS_ANIM = [
	"layer-anim-00",
	"layer-anim-01",
	"layer-anim-02",
	"layer-anim-03",
	"layer-anim-04",
	"layer-anim-05",
	"layer-anim-06"
];

export const $MoveMask: JQuery = $(
	`<div class="${LAYUI_LAYER_MOVE}" id="${LAYUI_LAYER_MOVE}"></div>`
);
setTimeout(() => {
	$html.append($MoveMask);
}, 0);

export const READY: {
	zIndex: number;
	/* instanceDialogForMoveOrResize */
	moveOrResizeInstance: any;
	moveOrResizeWH: any[];
	moveOrResizeType: "resize" | "move";
	pointMousedown: number[];
	basePath: string;
} = {
	zIndex: 0,
	/* 默认zIndex从2开始 */
	pointMousedown: [],
	/*  */
	basePath: (function () {
		var jsPath = document.currentScript
			? document.currentScript.src
			: (function () {
					var js = document.scripts,
						last = js.length - 1,
						src;
					for (var i = last; i > 0; i--) {
						if (js[i].readyState === "interactive") {
							src = js[i].src;
							break;
						}
					}
					return src || js[last].src;
			  })();
		const GLOBAL = {};
		return GLOBAL.layer_dir || jsPath.substring(0, jsPath.lastIndexOf("/") + 1);
	})(),
	config: {},
	end: {},
	minIndex: 0,
	minLeft: [],
	btn: ["&#x786E;&#x5B9A;", "&#x53D6;&#x6D88;"],
	/* 五种原始层模式 */
	type: ["dialog", "page", "iframe", "loading", "tips"],
	/* 获取节点的style属性值 */
	getStyle: function (node, name) {
		var style = node.currentStyle
			? node.currentStyle
			: window.getComputedStyle(node, null);
		return style[style.getPropertyValue ? "getPropertyValue" : "getAttribute"](
			name
		);
	},
	/* for ie6 恢复select */
	reselect() {
		$.each($("select"), function (index, value) {
			var sthis = $(this);
			if (!sthis.parents("." + LAYUI_LAYER)[0]) {
				sthis.attr("layer") == 1 &&
					$("." + LAYUI_LAYER).length < 1 &&
					sthis.removeAttr("layer").show();
			}
			sthis = null;
		});
	},
	/* 记录宽高坐标，用于还原 */
	record($eleDialog) {
		const [windowHeight, windowWidth] = [$win.height(), $win.width()];

		const isLimit = $eleDialog.height() > windowHeight;
		const isLimitWidth = $eleDialog.width() > windowWidth;
		var area = [
			isLimitWidth ? windowWidth - 64 : $eleDialog.width(),
			isLimit ? windowHeight - 64 : $eleDialog.height(),
			isLimit ? 32 : $eleDialog.position().top,
			$eleDialog.position().left + parseFloat($eleDialog.css("margin-left"))
		];
		$eleDialog.find(".layui-layer-max").addClass("layui-layer-maxmin");
		$eleDialog.attr({
			area: area
		});
	},
	rescollbar(index) {
		if ($html.attr("layer-full") == index) {
			if ($html[0].style.removeProperty) {
				$html[0].style.removeProperty("overflow");
			} else {
				$html[0].style.removeAttribute("overflow");
			}
			$html.removeAttr("layer-full");
		}
	}
};
/* 默认内置方法。 */
const LayerUtils = {
	setZIndex(zIndex: number) {
		READY.page;
		READY.zIndex = zIndex;
	},
	/*  */
	MSG: 0,
	DIALOG: 1,
	IFRAME: 2,
	LOADING: 3,
	TIPS: 4,
	UP: 1,
	RIGHT: 2,
	BOTTOM: 3,
	LEFT: 4,
	v: "3.5.1",
	ie: ((): number => {
		/* ie版本 */
		var agent = navigator.userAgent.toLowerCase();
		if ("ActiveXObject" in window) {
			let version = agent.match(/msie\s(\d+)/);
			if (version) {
				return Number(version[1]);
			} else {
				return 11;
			}
		}
		return 0;
	})(),
	path: READY.basePath,
	config: function (options: i_layerOptions, fn) {
		options = options || {};
		LayerUtils.cache = READY.config = $.extend({}, READY.config, options);
		LayerUtils.path = READY.config.path || LayerUtils.path;
		typeof options.extend === "string" && (options.extend = [options.extend]);
		if (!options.extend) {
			return this;
		}
		return this;
	},
	open(options: i_layerOptions) {
		const instanceDialog = new ClassLayer(options);
		const { _IDDialog } = instanceDialog;
		return _IDDialog;
	},
	/* 各种快捷引用 */
	alert(content, options, yes) {
		var type = typeof options === "function";
		if (type) yes = options;
		return LayerUtils.open(
			$.extend(
				{
					content: content,
					yes: yes
				},
				type ? {} : options
			)
		);
	},
	confirm(content, options, yes, cancel) {
		if (xU.isFunction(options)) {
			cancel = yes;
			yes = options;
		}
		return LayerUtils.open(
			$.extend(
				{
					content: content,
					btn: READY.btn,
					yes: yes,
					btn2: cancel
				},
				type ? {} : options
			)
		);
	},
	msg(content, options: i_layerOptions, end = () => null) {
		/*最常用提示层*/
		var isOptionsIsFunction = xU.isFunction(options),
			rskin = READY.config.skin;
		var skin = (rskin ? rskin + " " + rskin + "-msg" : "") || "layui-layer-msg";
		var anim = DOMS_ANIM.length - 1;
		if (isOptionsIsFunction) end = options;
		return LayerUtils.open(
			$.extend(
				{
					content: content,
					time: 3000,
					shade: false,
					skin: skin,
					title: false,
					closeBtn: false,
					btn: false,
					resize: false,
					end: end
				},
				isOptionsIsFunction && !READY.config.skin
					? {
							skin: skin + " layui-layer-hui",
							anim: anim
					  }
					: (function () {
							options = options || {};
							if (
								options.icon === -1 ||
								(options.icon === undefined && !READY.config.skin)
							) {
								options.skin = skin + " " + (options.skin || "layui-layer-hui");
							}
							return options;
					  })()
			)
		);
	},
	load(icon, options) {
		return LayerUtils.open(
			$.extend(
				{
					type: 3,
					icon: icon || 0,
					resize: false,
					shade: 0.01
				},
				options
			)
		);
	},
	tips(content, followSelector, options) {
		return LayerUtils.open(
			$.extend(
				{
					type: LayerUtils.TIPS,
					content: [content, followSelector],
					closeBtn: false,
					time: 3000,
					shade: false,
					resize: false,
					fixed: false,
					maxWidth: 260
				},
				options
			)
		);
	},
	close(layerKey: string) {
		if (!layerKey) {
			return Promise.reject();
		}
		return new Promise((resolve, reject) => {
			try {
				/* 关闭layer核心方法 */
				var $eleDialog = $(`#${LAYUI_LAYER}${layerKey}`);
				var type = $eleDialog.attr("type");
				var closeAnim = "layer-anim-close";
				if ($eleDialog.length === 0) {
					return;
				}
				function removeLayerDomFromHtml() {
					if (
						type === "dialog" &&
						$eleDialog.attr("data-content-type") === "object"
					) {
						$eleDialog.children(`:not(.${LAYUI_LAYER_IFRAME})`).remove();
					} else {
						/* 低版本IE 回收 iframe */
						if (type === TYPE_IFRAME) {
							try {
								var iframe = $(`#${LAYUI_LAYER_CONTENT}${layerKey}`)[0];
								iframe.contentWindow.document.write("");
								iframe.contentWindow.close();
								$eleDialog
									.find(`.${LAYUI_LAYER_IFRAME}`)[0]
									.removeChild(iframe);
							} catch (e) {}
						}
					}

					$eleDialog[0].innerHTML = "";
					$eleDialog.remove();

					try {
						READY.end[layerKey] && READY.end[layerKey]();
						delete READY.end[layerKey];
					} catch (e) {
						/* end就是beforeUnmount 的回调函数，如果有，就执行 */
					}
				}
				if ($eleDialog.data("isOutAnim")) {
					$eleDialog.addClass("layer-anim " + closeAnim);
				}

				$(`#layui-layer-moves, #${LAYUI_LAYER_SHADE}${layerKey}`).remove();
				LayerUtils.ie == 6 && READY.reselect();
				READY.rescollbar(layerKey);
				if ($eleDialog.attr("minLeft")) {
					READY.minIndex--;
					READY.minLeft.push($eleDialog.attr("minLeft"));
				}
				setTimeout(function () {
					removeLayerDomFromHtml();
					resolve(true);
				}, 200);
			} catch (error) {
				console.error(error);
				reject(false);
			}
		});
	},
	getChildFrame(selector, index) {
		/* 获取子iframe的DOM */
		index = index || $(`.${LAYUI_LAYER_CONTENT}`).attr("data-layer-key");
		return $("#" + LAYUI_LAYER + index)
			.find("iframe")
			.contents()
			.find(selector);
	},
	getFrameIndex(name) {
		/* 得到当前iframe层的索引，子iframe时使用 */
		return $("#" + name)
			.parents(`.${LAYUI_LAYER_CONTENT}`)
			.attr("data-layer-key");
	},
	iframeAuto(index) {
		/* iframe层自适应宽高 */
		if (!index) return;
		var heg = LayerUtils.getChildFrame("html", index).outerHeight();
		var $eleDialog = $("#" + LAYUI_LAYER + index);
		var titHeight = $eleDialog.find(`.${LAYUI_LAYER_TITLE}`).outerHeight() || 0;
		var btnHeight =
			$eleDialog.find(`.${LAYUI_LAYER_CONTENT}`).outerHeight() || 0;
		$eleDialog.css({
			height: heg + titHeight + btnHeight
		});
		$eleDialog.find("iframe").css({
			height: heg
		});
	},
	iframeSrc(index, url) {
		/* 重置iframe url */
		$("#" + LAYUI_LAYER + index)
			.find("iframe")
			.attr("src", url);
	},
	style(index, options, limit) {
		/* 设定层的样式 */
		var $eleDialog = $("#" + LAYUI_LAYER + index);
		const $contentEle = $eleDialog.find(`.${LAYUI_LAYER_CONTENT}`);
		const type = $eleDialog.attr("type");
		const titHeight =
			$eleDialog.find(`.${LAYUI_LAYER_TITLE}`).outerHeight() || 0;
		let contentHeight =
			$eleDialog.find(`.${LAYUI_LAYER_CONTENT}`).outerHeight() || 0;
		const [windowHeight, windowWidth] = [$win.height(), $win.width()];
		var minLeft = $eleDialog.attr("minLeft");
		if (type === TYPE_LOADING || type === TYPE_TIPS) {
			return;
		}

		if (!limit) {
			if (parseFloat(options.width) <= 260) {
				options.width = 260;
			}

			if (parseFloat(options.height) - titHeight - contentHeight <= 64) {
				options.height = 64 + titHeight + contentHeight;
			}
		}

		if (options.height > windowHeight) {
			options.height = parseFloat(windowHeight);
		}
		$eleDialog.css(options);
		contentHeight = $contentEle.outerHeight();
		if (type === TYPE_IFRAME) {
			$eleDialog.find("iframe").addClass("flex1");
		} else {
			$contentEle.css({
				height:
					parseFloat(options.height) -
					titHeight -
					contentHeight -
					parseFloat($contentEle.css("padding-top")) -
					parseFloat($contentEle.css("padding-bottom"))
			});
		}
	},
	min(index, options) {
		/* 最小化 */
		options = options || {};
		var $eleDialog = $("#" + LAYUI_LAYER + index),
			shadeo = $("#" + LAYUI_LAYER_SHADE + index),
			titHeight = $eleDialog.find(`.${LAYUI_LAYER_TITLE}`).outerHeight() || 0,
			left = $eleDialog.attr("minLeft") || 181 * READY.minIndex + "px",
			position = $eleDialog.css("position"),
			settings = {
				width: 180,
				height: titHeight,
				position: "fixed",
				overflow: "hidden"
			};
		/* 记录宽高坐标，用于还原 */
		READY.record($eleDialog);
		if (READY.minLeft[0]) {
			left = READY.minLeft[0];
			READY.minLeft.shift();
		}

		/* 是否堆叠在左下角 */
		if (options.minStack) {
			settings.left = left;
			settings.top = $win.height() - titHeight;
			/* 初次执行，最小化操作索引自增 */
			$eleDialog.attr("minLeft") || READY.minIndex++;
			$eleDialog.attr("minLeft", left);
		}

		$eleDialog.attr("position", position);
		LayerUtils.style(index, settings, true);
		$eleDialog.find(".layui-layer-min").hide();
		$eleDialog.attr("type") === "page" &&
			$eleDialog.find(LAYUI_LAYER_CONTENT).hide();
		READY.rescollbar(index);
		/* 隐藏遮罩 */
		shadeo.hide();
	},
	restore(index) {
		/* 还原 */
		var $eleDialog = $("#" + LAYUI_LAYER + index),
			shadeo = $("#" + LAYUI_LAYER_SHADE + index),
			area = $eleDialog.attr("area").split(","),
			type = $eleDialog.attr("type");
		/* 恢复原来尺寸 */
		LayerUtils.style(
			index,
			{
				width: parseFloat(area[0]),
				height: parseFloat(area[1]),
				top: parseFloat(area[2]),
				left: parseFloat(area[3]),
				position: $eleDialog.attr("position"),
				overflow: "visible"
			},
			true
		);
		$eleDialog.find(".layui-layer-max").removeClass("layui-layer-maxmin");
		$eleDialog.find(".layui-layer-min").show();
		$eleDialog.attr("type") === "page" &&
			$eleDialog.find(LAYUI_LAYER_CONTENT).show();
		READY.rescollbar(index);
		/* 恢复遮罩 */
		shadeo.show();
	},
	full(index) {
		/* 全屏 */
		var $eleDialog = $("#" + LAYUI_LAYER + index),
			timer;
		READY.record($eleDialog);
		if (!$html.attr("layer-full")) {
			$html.css("overflow", "hidden").attr("layer-full", index);
		}
		clearTimeout(timer);
		timer = setTimeout(function () {
			var isfix = $eleDialog.css("position") === "fixed";
			LayerUtils.style(
				index,
				{
					top: isfix ? 0 : $win.scrollTop(),
					left: isfix ? 0 : $win.scrollLeft(),
					width: $win.width(),
					height: $win.height()
				},
				true
			);
			$eleDialog.find(".layui-layer-min").hide();
		}, 100);
	},
	title(name, layerKey) {
		/* 改变title */
		$(`#${LAYUI_LAYER}${layerKey}`).find(`.${LAYUI_LAYER_TITLE}`).html(name);
	},
	async closeAll(type: string) {
		/* 关闭所有层 */
		const needClose: any = [];
		$(`.${LAYUI_LAYER}`).each(function () {
			const $ele = $(this);
			if (type) {
				if ($ele.attr("type") === type) {
					needClose.push($ele.attr("data-layer-key"));
				}
			} else {
				needClose.push($ele.attr("data-layer-key"));
			}
		});
		return await Promise.all(needClose.map(LayerUtils.close));
	},
	setLayerTop($current: JQuery) {
		const type = $current.attr("type");
		if ($current.hasClass("set-layer-top")) {
			return;
		} else {
			const selector = `.set-layer-top[type=${type}]`;
			/* FIX: 防止不同类型的层重排 */
			$(selector).removeClass("set-layer-top");
			$current.addClass("set-layer-top").appendTo($html);
		}
	}
};

class ClassLayer {
	/* 在 constructor 和 init方法里面完成 init */
	_IDDialog = 0;
	_IDLayer = LAYUI_LAYER;
	_IDShade = LAYUI_LAYER_SHADE;
	_IDContent = LAYUI_LAYER_CONTENT;
	zIndex = 0;
	typeName = "";
	ismax = false;
	isNeedTitle = false;
	isContentTypeObject = false;
	$eleDialog: any = null;
	$eleShade: any = null;
	config: i_layerOptions = {
		type: 0,
		title: "信息",
		content: "",
		skin: "",
		area: "auto",
		offset: "auto",
		icon: -1,
		btn: "确认",
		btnAlign: "r",
		closeBtn: "1",
		shade: "0.3",
		shadeClose: false,
		during: 0,
		id: "",
		anim: 0,
		isOutAnim: true,
		maxmin: false,
		fixed: true,
		resize: true,
		onResizing: false,
		scrollbar: true,
		maxWidth: 360,
		maxHeight: 0,
		zIndex: 1,
		move: ".layui-layer-title",
		moveOut: false,
		onMoveEnd: false,
		tips: 2,
		tipsMore: false,
		success: false,
		yes: false,
		onClickClose: false,
		end: false,
		full: false,
		minStack: true
	};

	constructor(custumSettings: i_layerOptions) {
		this.initConfig(custumSettings)
			.insertLayer()
			.addLayerListener()
			.handleAnimation();
	}

	get cpt$title() {
		return this.$eleDialog.find(`.${LAYUI_LAYER_TITLE}`);
	}
	get cpt$shade() {
		return this.$eleDialog.find(`#${this._IDShade}`);
	}

	get cptDomShade() {
		const { config, _IDShade } = this;
		if (!config.shade) {
			return "";
		}
		return `<div class="${LAYUI_LAYER_SHADE}" id="${_IDShade}" style="z-index:${
			this.zIndex - 1
		};"></div>`;
	}

	get cptDomTitle() {
		const { config, _IDLayer } = this;

		if (this.isContentTypeObject && !this.isNeedTitle) {
			return "";
		}

		const [title, styleString] = (() => {
			if (xU.isString(config.title)) {
				return [config.title, ""];
			}

			if (xU.isArray(config.title)) {
				return config.title;
			}
			return ["", ""];
		})();

		return `<div class="${LAYUI_LAYER_TITLE}" style="${styleString}" data-layer-id="${_IDLayer}"> ${title} </div >`;
	}

	get cptDomIcon() {
		if (this.config.type == LayerUtils.MSG && this.config.icon !== -1) {
			return `<i class="layui-layer-ico layui-layer-ico${this.config.icon}></i>`;
		}
		return "";
	}

	get cptDomContent() {
		if (this.config.type == LayerUtils.DIALOG && this.isContentTypeObject) {
			return "";
		}
		return this.config.content || "";
	}

	get cptDomSetDialogOperations() {
		const { config, ismax, _IDLayer } = this;
		return (
			'<span class="layui-layer-setwin">' +
			(function () {
				var closebtn = ismax
					? '<a class="layui-layer-min" href="javascript:;"><cite></cite></a><a class="layui-layer-ico layui-layer-max" href="javascript:;"></a>'
					: "";
				if (config.closeBtn) {
					closebtn +=
						`<a data-layer-id="${_IDLayer}" class="layui-layer-ico ${LAYUI_LAYER_CLOSE} ` +
						LAYUI_LAYER_CLOSE +
						(config.title
							? config.closeBtn
							: config.type == LayerUtils.TIPS
							? "1"
							: "2") +
						'" href="javascript:;"></a>';
				}
				return closebtn;
			})() +
			"</span>"
		);
	}

	get cptDomFooterBtns() {
		const { config } = this;
		if (config.btn) {
			if (typeof config.btn === "string") {
				/* OK 按钮 */
				config.btn = [config.btn, ""];
			}
			/* 没一个能用,则不显示 */
			if (xU.every(config.btn, i => !i)) {
				return "";
			}

			const domButtons = xU.reduce(
				config.btn,
				(domButtonString, label) => {
					if (label) {
						domButtonString += `<a class="${LAYUI_LAYER_CONTENT}">${label}</a>`;
					}
					return domButtonString;
				},
				""
			);
			return `<div class="${LAYUI_LAYER_CONTENT} layui-layer-btn-${
				config.btnAlign || ""
			}">${domButtons}</div>`;
		}
		return "";
	}

	get cptDomResizeBar() {
		return this.config.resize ? '<span class="layui-layer-resize"></span>' : "";
	}

	get cptDomContainer() {
		const {
			config,
			typeName,
			isContentTypeObject,
			zIndex,
			_IDDialog,
			_IDLayer,
			_IDContent
		} = this;

		const fnValid = i => !!i;

		const layerWrapperClassname = [
			LAYUI_LAYER,
			"x-dialog-wrapper",
			"flex vertical",
			`layui-layer-${typeName}`,
			config.skin,
			(() => {
				if (
					[LayerUtils.IFRAME, LayerUtils.MSG].includes(config.type) &&
					!config.shade
				) {
					return "layui-layer-border";
				}
				return "";
			})()
		]
			.filter(fnValid)
			.join(" ");

		const classContent = [
			LAYUI_LAYER_CONTENT,
			config.contentClass,
			config.type == LayerUtils.MSG && config.icon !== -1
				? "layui-layer-padding"
				: "",
			config.type == LayerUtils.LOADING
				? `layui-layer-loading${config.icon}`
				: ""
		]
			.filter(fnValid)
			.join(" ");

		const [width, height] = config.area || [];

		return `
<div id="${_IDLayer}" layer-wrapper="${_IDLayer}" type="${typeName}"
		class="${layerWrapperClassname}" 
		data-z-index="${zIndex}"
		data-layer-key="${_IDDialog}"
		data-during-time="${config.during}"
		data-content-type="${isContentTypeObject ? "object" : "string"}"
		style="position:fixed;
			z-index:calc(var(--el-index-normal) + ${zIndex});
			width:${width}; 
			height:${height};"
		>
			${this.cptDomTitle}
			<div class="${classContent}" id="${_IDContent}">
				${this.cptDomIcon}
				${this.cptDomContent}
			</div>
			${this.cptDomSetDialogOperations}
			${this.cptDomFooterBtns}
			${this.cptDomResizeBar}
</div>`;
	}

	initConfig(custumSettings: i_layerOptions) {
		const instanceDialog = this;
		instanceDialog.config = Object.assign(
			instanceDialog.config,
			custumSettings
		);
		/* icon - 图标。信息框和加载层的私有参数; 类型：number，默认：-1（信息框）/0（加载层） */
		instanceDialog.config.icon =
			custumSettings.type === LayerUtils.LOADING ? 0 : -1;
		/* 初始最大宽度：当前屏幕宽，左右留 15px 边距 */
		instanceDialog.config.maxWidth = ($win.width() as number) - 15 * 2;
		instanceDialog.config.custumSettings = custumSettings;

		const { config } = instanceDialog;
		/* 随layer 的增减变动 */
		instanceDialog._IDDialog = xU.genId("");
		instanceDialog._IDLayer = `${LAYUI_LAYER}${instanceDialog._IDDialog}`;
		instanceDialog._IDShade = `${LAYUI_LAYER_SHADE}${instanceDialog._IDDialog}`;
		instanceDialog._IDContent = `${LAYUI_LAYER_CONTENT}${instanceDialog._IDDialog}`;

		/* shade 会-1 */
		instanceDialog.zIndex =
			READY.zIndex + (instanceDialog.config.zIndex as number);
		instanceDialog.typeName = READY.type[config.type || 0];
		instanceDialog.isNeedTitle = [
			LayerUtils.IFRAME,
			LayerUtils.DIALOG
		].includes(Number(config.type));
		instanceDialog.ismax = Boolean(config.maxmin && instanceDialog.isNeedTitle);
		instanceDialog.isContentTypeObject = typeof config.content === "object";

		instanceDialog.config.onClickClose = async params => {
			/* 明确返回Boolean false 则为false */
			const isFalse = val => xU.isBoolean(val) && !val;
			if (custumSettings.onClickClose) {
				if (isFalse(await custumSettings.onClickClose(params))) {
					return false;
				}
			} else if (custumSettings.onBeforeClose) {
				if (isFalse(await custumSettings.onBeforeClose(params))) {
					return false;
				}
			}
			return true;
		};

		const { isContentTypeObject } = instanceDialog;

		if (typeof config.area === "string") {
			config.area = config.area === "auto" ? ["", ""] : [config.area, ""];
		}

		/* anim兼容旧版shift */
		if (config.shift) {
			config.anim = config.shift;
		}

		if (LayerUtils.ie == 6) {
			config.fixed = false;
		}

		const processContentStrategy = {
			[LayerUtils.MSG]() {
				config.btn = "btn" in config ? config.btn : READY.btn[0];
				LayerUtils.closeAll("dialog");
			},
			[LayerUtils.IFRAME]() {
				let scrolling = "auto";
				let src = config.content;
				if (isContentTypeObject) {
					/* @ts-ignore */
					scrolling = config.content[1] || "auto";
					/* @ts-ignore */
					src = config.content[0] || "";
				}

				config.btn = [];
				config.content = `
<iframe class="layui-layer-load flex flex1" 
		scrolling="${scrolling}" 
		src="${src}"
		allowtransparency="true"
		onload="this.class=''" 
		style="height:100%;" 
		frameborder="0">
</iframe>`;
			},
			[LayerUtils.LOADING]() {
				delete config.title;
				delete config.closeBtn;
				config.icon === -1 && config.icon === 0;
				LayerUtils.closeAll("loading");
			},
			[LayerUtils.TIPS]() {
				if (!isContentTypeObject) {
					config.content = [config.content, "body"];
				}
				config.follow = config.content[1];
				const arrow = '<i class="layui-layer-TipsG"></i>';
				config.content = `<div style="max-width:${
					config?.custumSettings?.maxWidth || "300px"
				};overflow:auto;">${config.content[0]}<div>${arrow}`;
				delete config.title;
				config.btn = [];
				config.tips =
					typeof config.tips === "object" ? config.tips : [config.tips, true];
				config.tipsMore || LayerUtils.closeAll("tips");
			}
		};

		const processContentFn = processContentStrategy[config.type as any];
		processContentFn && processContentFn();

		return instanceDialog;
	}

	/* 调整位置并显示 */
	async setLayerPosition() {
		await xU.sleep(34);
		const instanceDialog = this;
		const { config, _IDDialog } = instanceDialog;
		/* 首次弹出时，若 css 尚未加载，则等待 css 加载完毕后，重新设定尺寸 */
		instanceDialog.offset();
		if (config.type === LayerUtils.TIPS) {
			instanceDialog.setTips();
		}
		instanceDialog.$eleDialog.css("visibility", "visible");
		if (config.fullscreen) {
			setTimeout(() => {
				LayerUtils.full(_IDDialog);
			}, 500);
		}

		/* 如果是固定定位 */
		if (config.fixed) {
			$win.on("resize", function () {
				instanceDialog.offset();
				if (/^\d+%$/.test(config.area[0]) || /^\d+%$/.test(config.area[1])) {
					instanceDialog.setPosition();
				}
				if (config.type == LayerUtils.tips) {
					instanceDialog.setTips();
				}
			});
		}

		if (typeof config.during === "number" && config.during > 0) {
			setTimeout(function () {
				LayerUtils.close(instanceDialog._IDDialog);
			}, config.during);
		}
		/* 最后至于最上层 */
		LayerUtils.setLayerTop(instanceDialog.$eleDialog);

		return instanceDialog;
	}

	handleAnimation() {
		/* 为兼容jQuery3.0的css动画影响元素尺寸计算 */
		const instanceDialog = this;
		const { config } = instanceDialog;
		if (DOMS_ANIM[config.anim]) {
			var animClass = "layer-anim " + DOMS_ANIM[config.anim];
			instanceDialog.$eleDialog
				.addClass(animClass)
				.one(
					"webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
					function () {
						$(this).removeClass(animClass);
					}
				);
		}
		/* 记录关闭动画 */
		if (config.isOutAnim) {
			instanceDialog.$eleDialog.data("isOutAnim", true);
		}
		return instanceDialog;
	}

	insertLayer() {
		/* 容器 */
		const instanceDialog = this;
		/* moving 的遮罩是单例 */
		const { config, _IDDialog, _IDShade } = instanceDialog;
		instanceDialog.$eleDialog = $(instanceDialog.cptDomContainer);
		/*  */
		if (
			xU.isObject(config.content) &&
			(xU.isString(config.content) || xU.isString(config.content.jquery))
		) {
			const $content = $(config.content);
			instanceDialog.$eleDialog
				.find(`.${LAYUI_LAYER_CONTENT}`)
				.append($content);
		}
		instanceDialog.$eleDialog.css({
			visibility: "hidden",
			top: "100%",
			left: "100%"
		});
		$html.append(instanceDialog.$eleDialog);

		/* 当前实例的遮罩 */
		if (instanceDialog.cptDomShade) {
			$html.append(instanceDialog.cptDomShade);
			instanceDialog.$eleShade = $(`#${_IDShade}`);
			instanceDialog.cpt$shade.css({
				"background-color": config.shade[1] || "#000",
				opacity: config.shade[0] || config.shade
			});
		}

		if (!config.scrollbar) {
			$html.css("overflow", "hidden").attr("layer-full", _IDDialog);
		}

		instanceDialog.setLayerPosition();
		return instanceDialog;
	}

	/**
	 * 计算坐标
	 *
	 * @returns
	 *
	 * @memberOf ClassLayer
	 */
	offset() {
		var instanceDialog = this,
			config = instanceDialog.config,
			$eleDialog = instanceDialog.$eleDialog;
		var area = [$eleDialog.outerWidth(), $eleDialog.outerHeight()];
		var whetherOffsetIsObject = typeof config.offset === "object";
		instanceDialog.offsetTop = ($win.height() - area[1]) / 2;
		instanceDialog.offsetLeft = ($win.width() - area[0]) / 2;
		if (whetherOffsetIsObject) {
			const [top, left] = config.offset;
			instanceDialog.offsetTop = top;
			instanceDialog.offsetLeft = left || instanceDialog.offsetLeft;
		} else if (config.offset !== "auto") {
			if (config.offset === "t") {
				/* 上 */
				instanceDialog.offsetTop = 0;
			} else if (config.offset === "r") {
				/* 右 */
				instanceDialog.offsetLeft = $win.width() - area[0];
			} else if (config.offset === "b") {
				/* 下 */
				instanceDialog.offsetTop = $win.height() - area[1];
			} else if (config.offset === "l") {
				/* 左 */
				instanceDialog.offsetLeft = 0;
			} else if (config.offset === "lt") {
				/* 左上角 */
				instanceDialog.offsetTop = 0;
				instanceDialog.offsetLeft = 0;
			} else if (config.offset === "lb") {
				/* 左下角 */
				instanceDialog.offsetTop = $win.height() - area[1];
				instanceDialog.offsetLeft = 0;
			} else if (config.offset === "rt") {
				/* 右上角 */
				instanceDialog.offsetTop = 0;
				instanceDialog.offsetLeft = $win.width() - area[0];
			} else if (config.offset === "rb") {
				/* 右下角 */
				instanceDialog.offsetTop = $win.height() - area[1];
				instanceDialog.offsetLeft = $win.width() - area[0];
			} else {
				instanceDialog.offsetTop = config.offset;
			}
		}

		if (!config.fixed) {
			instanceDialog.offsetTop = /%$/.test(instanceDialog.offsetTop)
				? ($win.height() * parseFloat(instanceDialog.offsetTop)) / 100
				: parseFloat(instanceDialog.offsetTop);
			instanceDialog.offsetLeft = /%$/.test(instanceDialog.offsetLeft)
				? ($win.width() * parseFloat(instanceDialog.offsetLeft)) / 100
				: parseFloat(instanceDialog.offsetLeft);
			instanceDialog.offsetTop += $win.scrollTop();
			instanceDialog.offsetLeft += $win.scrollLeft();
		}

		if ($eleDialog.attr("minLeft")) {
			instanceDialog.offsetTop =
				$win.height() -
				($eleDialog.find(`.${LAYUI_LAYER_TITLE}`).outerHeight() || 0);
			instanceDialog.offsetLeft = $eleDialog.css("left");
		}
		$eleDialog.css({
			top: instanceDialog.offsetTop,
			left: instanceDialog.offsetLeft
		});
		return instanceDialog;
	}

	async setTips() {
		/* Tips=================470 */
		const instanceDialog = this;
		const { config, $eleDialog } = instanceDialog;
		const [tipsDomWidth, tipsdomHeight] = [
			$eleDialog.outerWidth(),
			$eleDialog.outerHeight()
		];

		let $eleFollow = $(config.follow);

		if ($eleFollow.length == 0) {
			$eleFollow = $html;
		}

		var followInfo = {
			width: $eleFollow.outerWidth(),
			height: $eleFollow.outerHeight(),
			top: $eleFollow.offset().top,
			left: $eleFollow.offset().left,
			tipTop: 0,
			tipLeft: 0
		};
		if (config.openAtPoint) {
			const { top, left } = config.openAtPoint;
			followInfo.top = top;
			followInfo.left = left;
		}

		var $tipsG = $eleDialog.find(".layui-layer-TipsG");
		/* 1,2,3,4 */
		const [direction, customColor]: any = config.tips || ["1", ""];
		function makeLeftAuto() {
			/* 如果超出边界，位置需要偏移 */
			/* 起始位置+tips宽度 比 视口 宽 */
			if (followInfo.left + tipsDomWidth - $win.width() > 0) {
				/* 向左偏移为超出的宽度 */
				followInfo.tipLeft = followInfo.left + followInfo.width - tipsDomWidth;
				$tipsG.css({ right: 12, left: "auto" });
			} else {
				followInfo.tipLeft = followInfo.left;
			}
		}

		/* 辨别tips的方位 */
		const direction_strategy = {
			[LayerUtils.UP]() {
				/* 上 */
				makeLeftAuto();
				followInfo.tipTop = followInfo.top - tipsdomHeight - 10;
				$tipsG
					.removeClass("layui-layer-TipsB")
					.addClass("layui-layer-TipsT")
					.css("border-right-color", customColor);
				followInfo.top - ($win.scrollTop() + tipsdomHeight + 8 * 2) < 0 &&
					direction_strategy[2]();
			},
			[LayerUtils.RIGHT]() {
				/* 右 */
				followInfo.tipLeft = followInfo.left + followInfo.width + 10;
				followInfo.tipTop = followInfo.top;
				$tipsG
					.removeClass("layui-layer-TipsL")
					.addClass("layui-layer-TipsR")
					.css("border-bottom-color", customColor);
				$win.width() -
					(followInfo.left + followInfo.width + tipsDomWidth + 8 * 2) >
					0 || direction_strategy[3]();
			},
			[LayerUtils.BOTTOM]() {
				/* 下 */
				makeLeftAuto();
				followInfo.tipTop = followInfo.top + followInfo.height + 10;
				$tipsG
					.removeClass("layui-layer-TipsT")
					.addClass("layui-layer-TipsB")
					.css("border-right-color", customColor);
				followInfo.top -
					$win.scrollTop() +
					followInfo.height +
					tipsdomHeight +
					8 * 2 -
					$win.height() >
					0 && direction_strategy[4]();
			},
			[LayerUtils.LEFT]() {
				/* 左 */
				followInfo.tipLeft = followInfo.left - tipsDomWidth - 10;
				followInfo.tipTop = followInfo.top;
				$tipsG
					.removeClass("layui-layer-TipsR")
					.addClass("layui-layer-TipsL")
					.css("border-bottom-color", customColor);
				tipsDomWidth + 8 * 2 - followInfo.left > 0 && direction_strategy[1]();
			}
		};

		direction_strategy[direction] && direction_strategy[direction]();

		/* 8*2为小三角形占据的空间 */
		$eleDialog.attr(DATA_TIPS_FOLLOW_ID, config.follow.substring(1));
		$eleDialog.find(`.${LAYUI_LAYER_CONTENT}`).css({
			"background-color": customColor,
			"padding-right": config.closeBtn ? "30px" : ""
		});

		$eleDialog.css({
			left: followInfo.tipLeft - $win.scrollLeft(),
			top: followInfo.tipTop - $win.scrollTop(),
			"transform-origin": [
				$tipsG.hasClass("layui-layer-TipsT") ? "top" : "bottem",
				$tipsG.hasClass("layui-layer-TipsL") ? "left" : "right"
			].join(" ")
		});

		if (!customColor) {
			$tipsG.remove();
		}
	}

	onMoveOrResize() {
		/* 拖拽层 */
		var instanceDialog = this;
		const { config, $eleDialog } = instanceDialog;
		const $eleMove = $eleDialog.find(config.move);
		const $eleResize = $eleDialog.find(".layui-layer-resize");

		/*  */
		$eleMove.css("cursor", "move");
		$eleMove.on("mousedown", function (e) {
			LayerUtils.setLayerTop($eleDialog);
			e.preventDefault();
			if (config.move) {
				// READY.$eleMoveOrResize = $(e.currentTarget).parent(`[layer-wrapper]`);
				READY.moveOrResizeInstance = instanceDialog;
				READY.moveOrResizeType = "move";
				READY.pointMousedown = [
					e.clientX - parseFloat($eleDialog.css("left")),
					e.clientY - parseFloat($eleDialog.css("top"))
				];
				$MoveMask.css("cursor", "move").show();
			}
		});

		$eleResize.on("mousedown", function (e) {
			LayerUtils.setLayerTop($eleDialog);
			e.preventDefault();
			READY.moveOrResizeInstance = instanceDialog;
			READY.moveOrResizeType = "resize";
			READY.pointMousedown = [e.clientX, e.clientY];
			READY.moveOrResizeWH = [
				$eleDialog.outerWidth(),
				$eleDialog.outerHeight()
			];
			$MoveMask.css("cursor", "se-resize").show();
		});

		return instanceDialog;
	}

	/* move resize min max close */
	addLayerListener() {
		const instanceDialog = this;
		const { $eleDialog, config } = instanceDialog;

		if (config.success) {
			const args = [instanceDialog];
			if (config.type == LayerUtils.IFRAME) {
				$eleDialog.find("iframe").on("load", function () {
					config.success.apply(config, args);
				});
			} else {
				config.success.apply(config, args);
			}
		}

		/* 按钮 */
		$eleDialog
			.find(`.${LAYUI_LAYER_CONTENT}`)
			.children("a")
			.on("click", function () {
				var index = $(this).index();
				if (index === 0) {
					if (config.yes) {
						config.yes(instanceDialog._IDDialog, $eleDialog);
					} else if (config["btn1"]) {
						config["btn1"](instanceDialog._IDDialog, $eleDialog);
					} else {
						LayerUtils.close(instanceDialog._IDDialog);
					}
				} else {
					var close =
						config["btn" + (index + 1)] &&
						config["btn" + (index + 1)](instanceDialog._IDDialog, $eleDialog);
					close === false || LayerUtils.close(instanceDialog._IDDialog);
				}
			});
		/* 右上角关闭回调 */
		$eleDialog
			.find(`.${LAYUI_LAYER_CLOSE}`)
			.on("click", async function handleClickCloseBtn() {
				/* 关闭 */
				let isClosed = false;
				const isNeedClose = await config.onClickClose({
					_IDDialog: instanceDialog._IDDialog,
					$eleDialog,
					dialogOptions: ""
				});

				if (isNeedClose) {
					if (!isClosed) {
						isClosed = await LayerUtils.close(instanceDialog._IDDialog);
					}
					if (!isClosed) {
						await LayerUtils.close($(this).attr("data-layer-id"));
					}
				}
			});
		/* 点遮罩关闭 */
		if (config.shadeClose) {
			instanceDialog.$eleShade.on("click", function () {
				LayerUtils.close(instanceDialog._IDDialog);
			});
		}
		/* 最小化 */
		$eleDialog.find(".layui-layer-min").on("click", function () {
			var min = config.min && config.min($eleDialog, instanceDialog._IDDialog);
			min === false || LayerUtils.min(instanceDialog._IDDialog, config);
		});
		/* 全屏/还原 */
		$eleDialog.find(".layui-layer-max").on("click", function () {
			if ($(this).hasClass("layui-layer-maxmin")) {
				LayerUtils.restore(instanceDialog._IDDialog);
				config.restore && config.restore($eleDialog, instanceDialog._IDDialog);
			} else {
				LayerUtils.full(instanceDialog._IDDialog, config);
				setTimeout(function () {
					config.full && config.full($eleDialog, instanceDialog._IDDialog);
				}, 100);
			}
		});

		if (config.end) {
			READY.end[instanceDialog._IDDialog] = config.end;
		}

		if (
			![LayerUtils.TIPS, LayerUtils.MSG, LayerUtils.LOADING].includes(
				config.type
			)
		) {
			instanceDialog.onMoveOrResize();
		}
		return instanceDialog;
	}
}

var cache = LayerUtils.cache || {};
/* eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee */
/* 点击层zIndex在最上层 */
$document
	.on("click.setLayerTop", "[layer-wrapper]", event => {
		const { currentTarget } = event;
		const $currentTarget = $(currentTarget);
		LayerUtils.setLayerTop($currentTarget);
	})
	.on(
		"mousemove",
		`.${LAYUI_LAYER_MOVE}`,
		function (e) {
			const { moveOrResizeInstance, moveOrResizeType, onMoving } = READY;
			/* 拖拽移动 */
			if (moveOrResizeInstance instanceof ClassLayer) {
				const { $eleDialog, config } = moveOrResizeInstance;
				if (moveOrResizeType === "move") {
					e.preventDefault();
					let X = e.clientX - READY.pointMousedown[0];
					let Y = e.clientY - READY.pointMousedown[1];
					const fixed = $eleDialog.css("position") === "fixed";

					READY.stX = fixed ? 0 : $win.scrollLeft();
					READY.stY = fixed ? 0 : $win.scrollTop();
					/* 控制元素不被拖出窗口外 */
					if (!config.moveOut) {
						let setRig = $win.width() - $eleDialog.outerWidth() + READY.stX;
						let setBot = $win.height() - $eleDialog.outerHeight() + READY.stY;

						if (X < READY.stX) {
							X = READY.stX;
						}

						if (X > setRig) {
							X = setRig;
						}

						if (Y < READY.stY) {
							Y = READY.stY;
						}

						if (Y > setBot) {
							Y = setBot;
						}
					}

					console.log(X, Y);
					$eleDialog.css({ left: X, top: Y });
				}

				if (config.resize) {
					if (READY.moveOrResizeType === "resize") {
						e.preventDefault();
						const X = e.clientX - READY.pointMousedown[0];
						const Y = e.clientY - READY.pointMousedown[1];

						$eleDialog.css({
							width: READY.moveOrResizeWH[0] + X,
							height: READY.moveOrResizeWH[1] + Y
						});

						config.onResizing && config.onResizing($eleDialog);
					}
				}
			} else if (typeof onMoving == "function") {
				event && onMoving(event);
			}

			/* Resize */
		}
		// xU.throttle(, 90)
	)
	.on("mouseup", function (e) {
		if (READY.moveOrResizeInstance instanceof ClassLayer) {
			const { config } = READY.moveOrResizeInstance;
			if (config.onMoveEnd) {
				config.onMoveEnd(READY.moveOrResizeInstance);
			}
			READY.moveOrResizeInstance = false;
		}
		$MoveMask.hide();
	});

export type t__ClassLayer = typeof ClassLayer;

/* 暴露模块 */
export { LayerUtils as LayerUtils };
