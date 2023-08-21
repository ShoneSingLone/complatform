//@ts-nocheck

/* https://www.layuiweb.com/doc/modules/layer.html#closeBtn */
import $ from "jquery";
import { xU } from "../../ventoseUtils";
import { i_layerOptions } from "./i_layerOptions";

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
const INSTANCE_DIALOG_COLLECTION = {};

/* 缓存常用字符 */
export const DATA_LAYER_INDEX = "data-layer-index";
export const DATA_TIPS_FOLLOW_ID = "data-tips-follow-id";
export const DATA_V_UI_MOVE = "data-directive-ui-move";
const DATA_MIN_MAX_STATUS = "data-min-max-status";
const STATUS_MIN = "min";
const STATUS_NORNAML = "nornaml";
const STATUS_MAX = "max";

const LAYER_TOP = "top";
const LAYER_RIGHT = "right";
const LAYER_BOTTOM = "bottom";
const LAYER_LEFT = "left";

const TYPE_MSG = "msg";
const TYPE_DIALOG = "dialog";
const TYPE_PAGE = "page";
const TYPE_IFRAME = "iframe";
const TYPE_LOADING = "loading";
const TYPE_TIPS = "tips";
/*  */
const NAME_LAYER = "x-layer";
const NAME_LAYER_SHADE = "x-layer-shade";
const NAME_LAYER_MOVE = "x-layer-move";
const NAME_LAYER_CONTENT = "x-layer-content";
const NAME_LAYER_CLOSE = "x-layer-close";
const NAME_LAYER_IFRAME = "x-layer-iframe";
const NAME_LAYER_TITLE = "x-layer-title";
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
	`<div class="${NAME_LAYER_MOVE}" id="${NAME_LAYER_MOVE}"></div>`
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
	type: ["dialog", "page", "iframe", "loading", "tips", "msg"],
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
			if (!sthis.parents("." + NAME_LAYER)[0]) {
				sthis.attr("layer") == 1 &&
					$("." + NAME_LAYER).length < 1 &&
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
		$eleDialog.find(".x-layer-max").addClass("x-layer-maxmin");
		$eleDialog.attr({ area: area });
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
		const dialogInst = new ClassLayer(options);
		const { _layer_index } = dialogInst;
		return _layer_index;
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
		var skin = (rskin ? rskin + " " + rskin + "-msg" : "") || "x-layer-msg";
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
							skin: skin + " x-layer-hui",
							anim: anim
					  }
					: (function () {
							options = options || {};
							if (
								options.icon === -1 ||
								(options.icon === undefined && !READY.config.skin)
							) {
								options.skin = skin + " " + (options.skin || "x-layer-hui");
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
					type: TYPE_TIPS,
					content: [content, followSelector],
					closeBtn: false,
					time: 3000,
					shade: false,
					resize: false,
					fixed: false,
					maxWidth: "260px"
				},
				options
			)
		);
	},
	close(_layer_index: string) {
		if (!_layer_index) {
			return Promise.reject();
		}
		return new Promise((resolve, reject) => {
			try {
				/* 关闭layer核心方法 */
				var $eleDialog = $(`#${NAME_LAYER}${_layer_index}`);
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
						$eleDialog.children(`:not(.${NAME_LAYER_IFRAME})`).remove();
					} else {
						/* 低版本IE 回收 iframe */
						if (type === TYPE_IFRAME) {
							try {
								var iframe = $(`#${NAME_LAYER_CONTENT}${_layer_index}`)[0];
								iframe.contentWindow.document.write("");
								iframe.contentWindow.close();
								$eleDialog.find(`.${NAME_LAYER_IFRAME}`)[0].removeChild(iframe);
							} catch (e) {}
						}
					}

					$eleDialog[0].innerHTML = "";
					$eleDialog.remove();
					delete INSTANCE_DIALOG_COLLECTION[_layer_index];

					try {
						READY.end[_layer_index] && READY.end[_layer_index]();
						delete READY.end[_layer_index];
					} catch (e) {
						/* end就是beforeUnmount 的回调函数，如果有，就执行 */
					}
				}
				if ($eleDialog.data("isOutAnim")) {
					$eleDialog.addClass("layer-anim " + closeAnim);
				}

				$(`#x-layer-moves, #${NAME_LAYER_SHADE}${_layer_index}`).remove();
				LayerUtils.ie == 6 && READY.reselect();
				READY.rescollbar(_layer_index);
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
		index = index || $(`.${NAME_LAYER_CONTENT}`).attr(DATA_LAYER_INDEX);
		return $("#" + NAME_LAYER + index)
			.find("iframe")
			.contents()
			.find(selector);
	},
	getFrameIndex(name) {
		/* 得到当前iframe层的索引，子iframe时使用 */
		return $("#" + name)
			.parents(`.${NAME_LAYER_CONTENT}`)
			.attr(DATA_LAYER_INDEX);
	},
	iframeAuto(index) {
		/* iframe层自适应宽高 */
		if (!index) return;
		var heg = LayerUtils.getChildFrame("html", index).outerHeight();
		var $eleDialog = $("#" + NAME_LAYER + index);
		var titHeight = $eleDialog.find(`.${NAME_LAYER_TITLE}`).outerHeight() || 0;
		var btnHeight =
			$eleDialog.find(`.${NAME_LAYER_CONTENT}`).outerHeight() || 0;
		$eleDialog.css({
			height: heg + titHeight + btnHeight
		});
		$eleDialog.find("iframe").css({
			height: heg
		});
	},
	iframeSrc(index, url) {
		/* 重置iframe url */
		$("#" + NAME_LAYER + index)
			.find("iframe")
			.attr("src", url);
	},
	style(index, options, limit) {
		/* 设定层的样式 */
		var $eleDialog = $("#" + NAME_LAYER + index);
		const $contentEle = $eleDialog.find(`.${NAME_LAYER_CONTENT}`);
		const type = $eleDialog.attr("type");
		const titHeight =
			$eleDialog.find(`.${NAME_LAYER_TITLE}`).outerHeight() || 0;
		let contentHeight =
			$eleDialog.find(`.${NAME_LAYER_CONTENT}`).outerHeight() || 0;
		const [windowHeight, windowWidth] = [$win.height(), $win.width()];

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
	min(_layer_index, options) {
		/* 最小化 */
		options = options || {};
		var $eleDialog = $("#" + NAME_LAYER + _layer_index),
			shadeo = $("#" + NAME_LAYER_SHADE + _layer_index),
			titHeight = $eleDialog.find(`.${NAME_LAYER_TITLE}`).outerHeight() || 0,
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
		LayerUtils.style(_layer_index, settings, true);
		$eleDialog.find(".x-layer-min").hide();
		$eleDialog.attr("type") === "page" &&
			$eleDialog.find(NAME_LAYER_CONTENT).hide();
		READY.rescollbar(_layer_index);

		$eleDialog.attr(DATA_MIN_MAX_STATUS, STATUS_MIN);
		/* 隐藏遮罩 */
		shadeo.hide();
	},
	restore(_layer_index) {
		/* 还原 */
		var $eleDialog = $("#" + NAME_LAYER + _layer_index),
			shadeo = $("#" + NAME_LAYER_SHADE + _layer_index),
			area = $eleDialog.attr("area").split(","),
			type = $eleDialog.attr("type");
		/* 恢复原来尺寸 */
		LayerUtils.style(
			_layer_index,
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
		$eleDialog.find(".x-layer-max").removeClass("x-layer-maxmin");
		$eleDialog.find(".x-layer-min").show();
		$eleDialog.attr("type") === "page" &&
			$eleDialog.find(NAME_LAYER_CONTENT).show();
		READY.rescollbar(_layer_index);
		$eleDialog.attr(DATA_MIN_MAX_STATUS, STATUS_NORNAML);
		/* 恢复遮罩 */
		shadeo.show();
	},
	full(index) {
		/* 全屏 */
		var $eleDialog = $("#" + NAME_LAYER + index),
			timer;

		READY.record($eleDialog);
		if (!$html.attr("layer-full")) {
			$html.css("overflow", "hidden").attr("layer-full", index);
		}
		clearTimeout(timer);
		timer = setTimeout(function () {
			var isfix = $eleDialog.css("position") === "fixed";
			const style = {
				top: isfix ? 0 : $win.scrollTop(),
				left: isfix ? 0 : $win.scrollLeft(),
				width: $win.width(),
				height: $win.height()
			};
			LayerUtils.style(index, style, true);
			$eleDialog.find(".x-layer-min").hide();
			$eleDialog.attr(DATA_MIN_MAX_STATUS, STATUS_MAX);
		}, 100);
	},
	title(name, layerKey) {
		/* 改变title */
		$(`#${NAME_LAYER}${layerKey}`).find(`.${NAME_LAYER_TITLE}`).html(name);
	},
	async closeAll(type: string) {
		/* 关闭所有层 */
		const needClose: any = [];
		$(`.${NAME_LAYER}`).each(function () {
			const $ele = $(this);
			if (type) {
				if ($ele.attr("type") === type) {
					needClose.push($ele.attr(DATA_LAYER_INDEX));
				}
			} else {
				needClose.push($ele.attr(DATA_LAYER_INDEX));
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
	_layer_index = 0;
	_layer_name = NAME_LAYER;
	_shadeID = NAME_LAYER_SHADE;
	_contentID = NAME_LAYER_CONTENT;
	zIndex = 0;
	isMax = false;
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
		maxWidth: "360px",
		maxHeight: 0,
		zIndex: 1,
		move: ".x-layer-title",
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
		this.setPosition = xU.debounce(this.setPosition, 200);
		this.initConfig(custumSettings)
			.insertDOM()
			.insertSuccessAndAddListener()
			.handleAnimation()
			.initPosition();
	}

	get cpt$title() {
		return this.$eleDialog.find(`.${NAME_LAYER_TITLE}`);
	}
	get cpt$shade() {
		return this.$eleDialog.find(`#${this._shadeID}`);
	}

	get cptDomShade() {
		const { config, _shadeID } = this;
		if (!config.shade) {
			return "";
		}
		return `<div class="${NAME_LAYER_SHADE}" id="${_shadeID}" style="z-index:${
			this.zIndex - 1
		};"></div>`;
	}

	get cptDomTitle() {
		const { config } = this;

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

		return `<div class="${NAME_LAYER_TITLE}" style="${styleString}" ${DATA_LAYER_INDEX}="${this._layer_index}"> ${title} </div >`;
	}

	get cptDomIcon() {
		if (this.config.type == TYPE_MSG && this.config.icon !== -1) {
			return `<i class="x-layer-ico x-layer-ico${this.config.icon}></i>`;
		}
		return "";
	}

	get cptDomContent() {
		if (this.config.type == TYPE_DIALOG && this.isContentTypeObject) {
			return "";
		}
		return this.config.content || "";
	}

	get cptDomSetDialogOperations() {
		const { config, isMax: ismax, _layer_index } = this;
		return (
			'<span class="x-layer-setwin">' +
			(() => {
				var closebtn = ismax
					? '<a class="x-layer-min" href="javascript:;"><cite></cite></a><a class="x-layer-ico x-layer-max" href="javascript:;"></a>'
					: "";
				if (config.closeBtn) {
					closebtn +=
						`<a ${DATA_LAYER_INDEX}="${_layer_index}" class="x-layer-ico ${NAME_LAYER_CLOSE} ` +
						NAME_LAYER_CLOSE +
						(config.title
							? config.closeBtn
							: config.type == TYPE_TIPS
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
						domButtonString += `<a class="${NAME_LAYER_CONTENT}">${label}</a>`;
					}
					return domButtonString;
				},
				""
			);
			return `<div class="${NAME_LAYER_CONTENT} x-layer-btn-${
				config.btnAlign || ""
			}">${domButtons}</div>`;
		}
		return "";
	}

	get cptDomResizeBar() {
		return this.config.resize ? '<span class="x-layer-resize"></span>' : "";
	}

	get cptDomContainer() {
		const {
			config,
			isContentTypeObject,
			zIndex,
			_layer_index,
			_layer_name,
			_contentID
		} = this;

		const fnValid = i => !!i;

		const layerWrapperClassname = [
			NAME_LAYER,
			"x-dialog-wrapper",
			"flex vertical",
			`x-layer-${config.type}`,
			config.skin,
			(() => {
				if ([TYPE_IFRAME, TYPE_MSG].includes(config.type) && !config.shade) {
					return "x-layer-border";
				}
				return "";
			})()
		]
			.filter(fnValid)
			.join(" ");

		const classContent = [
			NAME_LAYER_CONTENT,
			config.contentClass,
			config.type == TYPE_MSG && config.icon !== -1 ? "x-layer-padding" : "",
			config.type == TYPE_LOADING ? `x-layer-loading${config.icon}` : ""
		]
			.filter(fnValid)
			.join(" ");

		const [width, height] = config.area || [];

		return `<div id="${_layer_name}" 
	layer-wrapper="${_layer_name}" 
	type="${config.type}"
	class="${layerWrapperClassname}" 
	data-z-index="${zIndex}"
	${DATA_LAYER_INDEX}="${_layer_index}"
	data-during-time="${config.during}"
	data-content-type="${isContentTypeObject ? "object" : "string"}"
	style="position:fixed;
		z-index:calc(var(--el-index-normal) + ${zIndex});
		width:${width}; 
		height:${height};"
	>
		${this.cptDomTitle}
		<div class="${classContent}" id="${_contentID}">
			${this.cptDomIcon}
			${this.cptDomContent}
		</div>
		${this.cptDomSetDialogOperations}
		${this.cptDomFooterBtns}
		${this.cptDomResizeBar}
</div>`;
	}

	initConfig(custumSettings: i_layerOptions) {
		const dialogInst = this;
		dialogInst.config = Object.assign(dialogInst.config, custumSettings);
		/* icon - 图标。信息框和加载层的私有参数; 类型：number，默认：-1（信息框）/0（加载层） */
		dialogInst.config.icon = custumSettings.type === TYPE_LOADING ? 0 : -1;
		/* 初始最大宽度：当前屏幕宽，左右留 15px 边距 */
		dialogInst.config.maxWidth = ($win.width() as number) - 15 * 2;
		dialogInst.config.custumSettings = custumSettings;

		const { config } = dialogInst;
		/* 随layer 的增减变动 */
		dialogInst._layer_index = xU.genId("");
		dialogInst._layer_name = `${NAME_LAYER}${dialogInst._layer_index}`;
		dialogInst._shadeID = `${NAME_LAYER_SHADE}${dialogInst._layer_index}`;
		dialogInst._contentID = `${NAME_LAYER_CONTENT}${dialogInst._layer_index}`;

		/* shade 会-1 */
		dialogInst.zIndex = READY.zIndex + (dialogInst.config.zIndex as number);
		dialogInst.isNeedTitle = [TYPE_IFRAME, TYPE_DIALOG].includes(config.type);
		dialogInst.isMax = Boolean(config.maxmin && dialogInst.isNeedTitle);
		dialogInst.isContentTypeObject = typeof config.content === "object";

		dialogInst.config.onClickClose = async params => {
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

		const { isContentTypeObject } = dialogInst;

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
			[TYPE_MSG]: () => {
				config.btn = "btn" in config ? config.btn : READY.btn[0];
				LayerUtils.closeAll("dialog");
			},
			[TYPE_IFRAME]: () => {
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
<iframe class="x-layer-load flex flex1" 
		scrolling="${scrolling}" 
		src="${src}"
		allowtransparency="true"
		onload="this.class=''" 
		style="height:100%;" 
		frameborder="0">
</iframe>`;
			},
			[TYPE_LOADING]: () => {
				delete config.title;
				delete config.closeBtn;
				config.icon === -1 && config.icon === 0;
				LayerUtils.closeAll("loading");
			},
			[TYPE_TIPS]: () => {
				if (!isContentTypeObject) {
					config.content = [config.content, "body"];
				}
				const [tipsString, follow] = config.content;
				config.follow = follow;
				config.content = `<div class="layerContent_tips"> ${tipsString} <div>`;
				delete config.title;

				config.btn = [];
				config.tips = xU.isArray(config.tips)
					? config.tips
					: [config.tips, true];

				/* 如果不允许同时有多个tips，关闭之前的所有tips */
				config.tipsMore || LayerUtils.closeAll("tips");
			}
		};

		const processContentFn = processContentStrategy[config.type as any];
		processContentFn && processContentFn();

		return dialogInst;
	}

	/* 调整位置并显示 */
	async initPosition() {
		await xU.sleep(34);
		const dialogInst = this;
		const { config, _layer_index } = dialogInst;
		/* 首次弹出时，若 css 尚未加载，则等待 css 加载完毕后，重新设定尺寸 */
		dialogInst.setPosition();
		if (config.type === TYPE_TIPS) {
			dialogInst.setTips();
		}

		if (config.fullscreen) {
			setTimeout(() => {
				LayerUtils.full(_layer_index);
			}, 500);
		}

		/* 如果是固定定位 */

		/* 		$win.on("resize", function () {
			dialogInst.setPosition();
			// if (/^\d+%$/.test(config.area[0]) || /^\d+%$/.test(config.area[1])) { }
			if (config.type == LayerUtils.tips) {
				dialogInst.setTips();
			}
		});
 */
		if (typeof config.during === "number" && config.during > 0) {
			setTimeout(function () {
				LayerUtils.close(dialogInst._layer_index);
			}, config.during);
		}
		/* 最后至于最上层 */
		LayerUtils.setLayerTop(dialogInst.$eleDialog);
		this.$eleDialog.css("visibility", "visible");
		return dialogInst;
	}

	handleAnimation() {
		/* 为兼容jQuery3.0的css动画影响元素尺寸计算 */
		const dialogInst = this;
		const { config } = dialogInst;
		if (DOMS_ANIM[config.anim]) {
			var animClass = "layer-anim " + DOMS_ANIM[config.anim];
			dialogInst.$eleDialog
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
			dialogInst.$eleDialog.data("isOutAnim", true);
		}
		return dialogInst;
	}

	insertDOM() {
		/* 容器 */
		const dialogInst = this;
		/* moving 的遮罩是单例 */
		const { config, _layer_index, _shadeID } = dialogInst;
		dialogInst.$eleDialog = $(dialogInst.cptDomContainer);
		/*  */
		if (
			xU.isObject(config.content) &&
			(xU.isString(config.content) || xU.isString(config.content.jquery))
		) {
			const $content = $(config.content);

			dialogInst.$eleDialog.find(`.${NAME_LAYER_CONTENT}`).append($content);
		}
		if (config.triggerDom) {
			dialogInst.$eleDialog.css({
				visibility: "hidden",
				...config.triggerDom
			});
		} else {
			dialogInst.$eleDialog.css({
				visibility: "hidden",
				top: "100px",
				left: "100px"
			});
		}
		$html.append(dialogInst.$eleDialog);

		/* 当前实例的遮罩 */
		if (dialogInst.cptDomShade) {
			$html.append(dialogInst.cptDomShade);
			dialogInst.$eleShade = $(`#${_shadeID}`);
			dialogInst.cpt$shade.css({
				"background-color": config.shade[1] || "#000",
				opacity: config.shade[0] || config.shade
			});
		}

		if (!config.scrollbar) {
			$html.css("overflow", "hidden").attr("layer-full", _layer_index);
		}

		return dialogInst;
	}

	/**
	 * 计算坐标
	 *
	 * @returns
	 *
	 * @memberOf ClassLayer
	 */
	setPosition() {
		var dialogInst = this,
			config = dialogInst.config,
			$eleDialog = dialogInst.$eleDialog;
		const [areaW, areaH] = [$eleDialog.outerWidth(), $eleDialog.outerHeight()];
		const [winW, winH] = [$win.width(), $win.height()];
		const [top, left] = (() => {
			let top = $eleDialog.css("top");
			let left = $eleDialog.css("left");

			if (dialogInst.config.type === TYPE_TIPS) {
				return [top, left];
			}

			const [calTop, calLeft] = (() => {
				let top = 0;
				let left = 0;
				if (config.offset === "auto") {
					top = (winH - areaH) / 2;
					left = (winW - areaW) / 2;
				} else if (typeof config.offset === "object") {
					const [top, left] = config.offset;
					top = top;
					left = left || left;
				} else {
					if (config.offset === "t") {
						/* 上 */
						top = 0;
					} else if (config.offset === "r") {
						/* 右 */
						left = winW - areaW;
					} else if (config.offset === "b") {
						/* 下 */
						top = winH - areaH;
					} else if (config.offset === "l") {
						/* 左 */
						left = 0;
					} else if (config.offset === "lt") {
						/* 左上角 */
						top = 0;
						left = 0;
					} else if (config.offset === "lb") {
						/* 左下角 */
						top = winH - areaH;
						left = 0;
					} else if (config.offset === "rt") {
						/* 右上角 */
						top = 0;
						left = winW - areaW;
					} else if (config.offset === "rb") {
						/* 右下角 */
						top = winH - areaH;
						left = winW - areaW;
					} else {
						top = config.offset;
					}
				}
				return [top, left];
			})();

			const status = dialogInst.$eleDialog.attr(DATA_MIN_MAX_STATUS);

			if (!status) {
				return [calTop, calLeft];
			}

			const isH = calTop + areaH - winH > 0;
			const isW = calLeft + areaW - winW > 0;

			if (isW || isH) {
				return [top, left];
			}
			return [calTop, calLeft];
		})();
		$eleDialog.css({ top, left });
		return dialogInst;
	}

	async setTips() {
		function setTipsG({ direction }) {
			const RADIUS = 4;
			const LENGTH = 10;
			const { dialogW, dialogH, dialogL } = info;
			const canvasString = `<canvas width="${dialogW}" height="${dialogH}"/>`;
			const canvas = $(canvasString)[0];
			const ctx = canvas.getContext("2d");
			const [cW, cH] = [$tips.width() + 20, $tips.height() + 20];
			const lt = [0, 0];
			const rt = [cW, 0];
			const rb = [cW, cH];
			const lb = [0, cH];

			let gap = dialogW + dialogL - $win.width();
			if (gap > RADIUS) {
				info.dialogL = dialogL - gap;
			} else {
				gap = 0;
			}
			/* 顺时针计算节点 */
			/* 顺时针计算节点 */
			const direction_strategy = {
				[LAYER_TOP]() {
					const point_x = cW / 2;
					const point_y = cH + LENGTH;
					const pointK = [point_x + RADIUS, cH];
					const pointA = [point_x, point_y];
					const pointB = [point_x - RADIUS, cH];
					const pointC = [RADIUS, cH];
					const pointD = [0, cH - RADIUS];
					const pointE = [0, RADIUS];
					const pointF = [RADIUS, 0];
					const pointG = [cW - RADIUS, 0];
					const pointH = [cW, RADIUS];
					const pointI = [cW, cH - RADIUS];
					const pointJ = [cW - RADIUS, cH];
					ctx.moveTo(pointA[0], pointA[1]);
					ctx.lineTo(pointB[0], pointB[1]);
					ctx.lineTo(pointC[0], pointC[1]);
					ctx.quadraticCurveTo(lb[0], lb[1], pointD[0], pointD[1]);
					ctx.lineTo(pointE[0], pointE[1]);
					ctx.quadraticCurveTo(lt[0], lt[1], pointF[0], pointF[1]);
					ctx.lineTo(pointG[0], pointG[1]);
					ctx.quadraticCurveTo(rt[0], rt[1], pointH[0], pointH[1]);
					ctx.lineTo(pointI[0], pointI[1]);
					ctx.quadraticCurveTo(rb[0], rb[1], pointJ[0], pointJ[1]);
					ctx.lineTo(pointK[0], pointK[1]);
					// ctx.scale(1.1, 1.1);
				},
				[LAYER_RIGHT]() {
					const point_x = -LENGTH;
					const point_y = cH / 2;
					const pointK = [0, point_y + RADIUS];
					const pointA = [point_x, point_y];
					const pointB = [0, point_y - RADIUS];
					const pointC = [0, RADIUS];
					const pointD = [RADIUS, 0];
					const pointE = [cW - RADIUS, 0];
					const pointF = [cW, RADIUS];
					const pointG = [cW, cH - RADIUS];
					const pointH = [cW - RADIUS, cH];
					const pointI = [RADIUS, cH];
					const pointJ = [0, cH - RADIUS];
					ctx.moveTo(pointA[0], pointA[1]);
					ctx.lineTo(pointB[0], pointB[1]);
					ctx.lineTo(pointC[0], pointC[1]);
					ctx.quadraticCurveTo(lt[0], lt[1], pointD[0], pointD[1]);
					ctx.lineTo(pointE[0], pointE[1]);
					ctx.quadraticCurveTo(rt[0], rt[1], pointF[0], pointF[1]);
					ctx.lineTo(pointG[0], pointG[1]);
					ctx.quadraticCurveTo(rb[0], rb[1], pointH[0], pointH[1]);
					ctx.lineTo(pointI[0], pointI[1]);
					ctx.quadraticCurveTo(lb[0], lb[1], pointJ[0], pointJ[1]);
					ctx.lineTo(pointK[0], pointK[1]);
				},
				[LAYER_BOTTOM]() {
					const point_x = cW / 2 + gap;
					const point_y = -LENGTH;
					const pointA = [point_x, point_y];
					const pointB = [point_x + RADIUS, 0];
					const pointC = [cW - RADIUS, 0];
					const pointD = [cW, RADIUS];
					const pointE = [cW, cH - RADIUS];
					const pointF = [cW - RADIUS, cH];
					const pointG = [RADIUS, cH];
					const pointH = [0, cH - RADIUS];
					const pointI = [0, RADIUS];
					const pointJ = [RADIUS, 0];
					const pointK = [point_x - RADIUS, 0];
					ctx.moveTo(pointA[0], pointA[1]);
					ctx.lineTo(pointB[0], pointB[1]);
					ctx.lineTo(pointC[0], pointC[1]);
					ctx.quadraticCurveTo(rt[0], rt[1], pointD[0], pointD[1]);
					ctx.lineTo(pointE[0], pointE[1]);
					ctx.quadraticCurveTo(rb[0], rb[1], pointF[0], pointF[1]);
					ctx.lineTo(pointG[0], pointG[1]);
					ctx.quadraticCurveTo(lb[0], lb[1], pointH[0], pointH[1]);
					ctx.lineTo(pointI[0], pointI[1]);
					ctx.quadraticCurveTo(lt[0], lt[1], pointJ[0], pointJ[1]);
					ctx.lineTo(pointK[0], pointK[1]);
				},
				[LAYER_LEFT]() {
					const point_x = cW + LENGTH;
					const point_y = cH / 2;
					const pointK = [cW, point_y - RADIUS];
					const pointA = [point_x, point_y];
					const pointB = [cW, point_y + RADIUS];
					const pointC = [cW, cH - RADIUS];
					const pointD = [cW - RADIUS, cH];
					const pointE = [RADIUS, cH];
					const pointF = [0, cH - RADIUS];
					const pointG = [0, RADIUS];
					const pointH = [RADIUS, 0];
					const pointI = [cW - RADIUS, 0];
					const pointJ = [cW, RADIUS];
					ctx.moveTo(pointA[0], pointA[1]);
					ctx.lineTo(pointB[0], pointB[1]);
					ctx.lineTo(pointC[0], pointC[1]);
					ctx.quadraticCurveTo(rb[0], rb[1], pointD[0], pointD[1]);
					ctx.lineTo(pointE[0], pointE[1]);
					ctx.quadraticCurveTo(lb[0], lb[1], pointF[0], pointF[1]);
					ctx.lineTo(pointG[0], pointG[1]);
					ctx.quadraticCurveTo(lt[0], lt[1], pointH[0], pointH[1]);
					ctx.lineTo(pointI[0], pointI[1]);
					ctx.quadraticCurveTo(rt[0], rt[1], pointJ[0], pointJ[1]);
					ctx.lineTo(pointK[0], pointK[1]);
				}
			};

			ctx.translate(10, 10);
			direction_strategy[direction]();
			ctx.closePath();
			// ctx.stroke();
			ctx.shadowOffsetX = 0;
			ctx.shadowOffsetY = 0;
			ctx.shadowBlur = 8;
			ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
			ctx.fillStyle = "white";
			ctx.fill();
			const contentTipsGCss = {
				"background-image": `url(${canvas.toDataURL()})`
			};

			$dialog.find(`.x-layer-content`).css(contentTipsGCss);
		}

		/* Tips=================470 */
		const dialogInst = this;
		const { config, $eleDialog: $dialog } = dialogInst;
		let $target = $(config.follow);
		/* !!import */
		$dialog.attr(DATA_TIPS_FOLLOW_ID, $target.attr("id"));
		var $tips = $dialog.find(".layerContent_tips");

		/* 如果没有跟随的元素就默认页面 */
		if ($target.length == 0) {
			$target = $html;
		}

		const [direction]: any = config.tips || ["top", ""];

		/* 默认中间位置 */
		var info = {
			strategy: 0,
			targetW: $target.outerWidth(),
			targetH: $target.outerHeight(),
			targetT: $target.offset().top,
			targetL: $target.offset().left,
			tipsW: $tips.outerWidth(),
			tipsH: $tips.outerHeight(),
			tipsT: $tips.offset().top,
			tipsL: $tips.offset().left,
			dialogW: $dialog.outerWidth(),
			dialogH: $dialog.outerHeight(),
			dialogT: $dialog.offset().top,
			dialogL: $dialog.offset().left
		};

		console.log(JSON.stringify(info, null, 2));

		function positionAuto(direction) {}
		/* - $win.scrollTop() */
		/* 辨别tips的方位 */
		const direction_strategy = {
			[LAYER_TOP]() {
				/* 上  */
				info.dialogT = info.targetT - info.dialogH;
				info.dialogL = info.targetL - (info.dialogW - info.targetW) / 2;

				if (info.dialogT < 0) {
					direction_strategy["right"]();
				} else {
					setTipsG({ direction: "top" });
				}
			},
			[LAYER_RIGHT]() {
				/* 右 */
				info.dialogL = info.targetL + info.targetW;
				info.dialogT = info.targetT - (info.dialogH - info.targetH) / 2;
				if (info.dialogL + info.dialogW > $win.width()) {
					direction_strategy["bottom"]();
				} else {
					setTipsG({ direction: "right" });
				}
			},
			[LAYER_BOTTOM]() {
				/* 下 */
				info.dialogT = info.targetT + info.targetH;
				info.dialogL = info.targetL - (info.dialogW - info.targetW) / 2;
				setTipsG({ direction: "bottom" });
			},
			[LAYER_LEFT]() {
				/* 左 */
				info.dialogL = info.targetL - info.dialogW;
				info.dialogT = info.targetT - (info.dialogH - info.targetH) / 2;
				if (info.dialogL < 0) {
					direction_strategy["top"]();
				} else {
					setTipsG({ direction: "left" });
				}
			}
		};

		direction_strategy[direction]();

		$dialog.css({
			top: info.dialogT,
			left: info.dialogL
		});

		/* TODO: 动画 */
		// "transform-origin": [ $tipsG.hasClass("x-layer-TipsT") ? "top" : "bottem", $tipsG.hasClass("x-layer-TipsL") ? "left" : "right" ].join(" ")
	}

	onMoveOrResize() {
		/* 拖拽层 */
		var dialogInst = this;
		const { config, $eleDialog } = dialogInst;
		const $eleMove = $eleDialog.find(config.move);
		const $eleResize = $eleDialog.find(".x-layer-resize");

		/*  */
		$eleMove.css("cursor", "move");
		$eleMove.on("mousedown", function (e) {
			LayerUtils.setLayerTop($eleDialog);
			e.preventDefault();
			if (config.move) {
				// READY.$eleMoveOrResize = $(e.currentTarget).parent(`[layer-wrapper]`);
				READY.moveOrResizeInstance = dialogInst;
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
			READY.moveOrResizeInstance = dialogInst;
			READY.moveOrResizeType = "resize";
			READY.pointMousedown = [e.clientX, e.clientY];
			READY.moveOrResizeWH = [
				$eleDialog.outerWidth(),
				$eleDialog.outerHeight()
			];
			$MoveMask.css("cursor", "se-resize").show();
		});

		return dialogInst;
	}

	/* move resize min max close */
	insertSuccessAndAddListener() {
		const dialogInst = this;
		/* resize时重新resize */
		INSTANCE_DIALOG_COLLECTION[this._layer_index] = this;

		const { $eleDialog, config } = dialogInst;

		if (config.success) {
			const args = [dialogInst];
			if (config.type == TYPE_IFRAME) {
				$eleDialog.find("iframe").on("load", function () {
					config.success.apply(config, args);
				});
			} else {
				config.success.apply(config, args);
			}
		}

		/* click事件 */
		function handleClickBtn() {
			/* 按钮 */
			$eleDialog
				.find(`.${NAME_LAYER_CONTENT}`)
				.children("a")
				.on("click", function () {
					var index = $(this).index();
					if (index === 0) {
						if (config.yes) {
							config.yes(dialogInst._layer_index, $eleDialog);
						} else if (config["btn1"]) {
							config["btn1"](dialogInst._layer_index, $eleDialog);
						} else {
							LayerUtils.close(dialogInst._layer_index);
						}
					} else {
						var close =
							config["btn" + (index + 1)] &&
							config["btn" + (index + 1)](dialogInst._layer_index, $eleDialog);
						close === false || LayerUtils.close(dialogInst._layer_index);
					}
				});
		}

		function handleClickCloseBtn() {
			/* 右上角关闭回调 */
			$eleDialog.find(`.${NAME_LAYER_CLOSE}`).on("click", async function () {
				/* 关闭 */
				let isClosed = false;
				const isNeedClose = await config.onClickClose({
					_layer_index: dialogInst._layer_index,
					$eleDialog,
					dialogOptions: ""
				});

				if (isNeedClose) {
					if (!isClosed) {
						isClosed = await LayerUtils.close(dialogInst._layer_index);
					}
					if (!isClosed) {
						await LayerUtils.close($(this).attr(DATA_LAYER_INDEX));
					}
				}
			});
		}
		function handleClickShadeClose(params: type) {
			/* 点遮罩关闭 */
			if (config.shadeClose) {
				dialogInst.$eleShade.on("click", function () {
					LayerUtils.close(dialogInst._layer_index);
				});
			}
		}
		function handleClickMin(params: type) {
			/* 最小化 */
			$eleDialog.find(".x-layer-min").on("click", function () {
				var min = config.min && config.min($eleDialog, dialogInst._layer_index);
				min === false || LayerUtils.min(dialogInst._layer_index, config);
			});
		}
		function handleClickMax(params: type) {
			/* 全屏/还原 */
			$eleDialog.find(".x-layer-max").on("click", function () {
				if ($(this).hasClass("x-layer-maxmin")) {
					LayerUtils.restore(dialogInst._layer_index);
					config.restore && config.restore($eleDialog, dialogInst._layer_index);
				} else {
					LayerUtils.full(dialogInst._layer_index, config);
					setTimeout(function () {
						config.full && config.full($eleDialog, dialogInst._layer_index);
					}, 100);
				}
			});
		}

		handleClickBtn();
		handleClickCloseBtn();
		handleClickShadeClose();
		handleClickMin();
		handleClickMax();

		if (config.end) {
			READY.end[dialogInst._layer_index] = config.end;
		}

		if (![TYPE_TIPS, TYPE_MSG, TYPE_LOADING].includes(config.type)) {
			dialogInst.onMoveOrResize();
		}
		return dialogInst;
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
		`.${NAME_LAYER_MOVE}`,
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
