import $ from "jquery";
import { createApp } from "vue";
import { xU } from "../ventoseUtils";
import { i_layerOptions } from "../xSingle/layer/i_layerOptions";
import {
	DATA_LAYER_INDEX,
	DATA_TIPS_FOLLOW_ID,
	LayerUtils
} from "../xSingle/layer/LayerUtils";
import {
	appAddPlugin,
	appDependState,
	DATA_APP_ID,
	TIPS_TARGET_ID,
	X_TIPS_TARGET,
	timer4CloseTips,
	tipsShouldInVisibleArea
} from "./directiveState";

type t_trigger = "click" | "rightClick";
type t_uiPopoverOptions = {
	content: string;
	onlyEllipsis?: Boolean;
};

/* 开发的时候不想关闭，可以把时间值调高 */
// const TIMEOUT_DELAY = 200 * 10000;
const TIMEOUT_DELAY = 200;
/* 缓存 popover 的配置信息 */
const tipsOptionsCollection: {
	[prop: string]: t_uiPopoverOptions;
} = {};

/**/
const tipsKeys: {
	[prop: string]: Number;
} = {};

function openTips({ $ele, xTipsTargetID, appId, event }: any) {
	const options = tipsOptionsCollection[xTipsTargetID] || { content: "" };
	/* onlyEllipsis,content */
	if (!options.content) {
		/* 是不是需要判断内容有省略号 */
		if (options.onlyEllipsis) {
			const eleWidth = $ele.width() || 0;
			const text = $ele.text();
			const $div = $(
				`<span style="position:fixed;top:0;left:0;opacity: 0;height: 0;letter-spacing: normal;">${text}</span>`
			);
			$div.appendTo($("body"));
			const innerWidth = $div.width() || 0;
			$div.remove();
			if (innerWidth > eleWidth) {
				options.content = text;
			}
		} else {
			return;
		}
	}
	let tipsContent = options.content;
	if (!tipsContent) {
		/* 如果仍然没有内容，那就不弹窗 */
		return;
	}
	let app: any;

	let layerTipsOptions: i_layerOptions = {
		tips: [options.placement || "top", "#fff"],
		/*hover 不允许 同时多个 tips出现*/
		/*tipsMore: false,*/
		/* maxWidth */
		during: 1000 * 60 * 10
	};

	const isOpenAtPoint = $ele.attr("data-open-at-point");
	if (isOpenAtPoint) {
		/* @ts-ignore */
		layerTipsOptions.openAtPoint = {
			left: $ele.clientX,
			top: $ele.clientY
		};
	}

	/* TODO:目前只考虑vue组件对象 */
	if (xU.isPlainObject(options.content)) {
		const id = `${xTipsTargetID}_content`;
		/* 桩 */
		tipsContent = `<div id="${id}"></div>`;
		/* @ts-ignore */
		layerTipsOptions.success = function success(indexPanel, layerIndex) {
			/* @ts-ignore */
			app = createApp(options.content);
			app.use(appAddPlugin[appId], { dependState: appDependState[appId] });
			app.mount(`#${id}`);
			/* @ts-ignore */
			options.afterOpenDialoag && options.afterOpenDialoag(app);
		};
		layerTipsOptions.end = function end() {
			if (app) {
				app.unmount();
				app = null;
			}
		};
	}

	/* @ts-ignore */
	if (options.maxWidth) {
		/* @ts-ignore */
		layerTipsOptions.maxWidth = maxWidth;
	}

	setTimeout(() => {
		if (tipsShouldInVisibleArea[xTipsTargetID]) {
			LayerUtils.tips(tipsContent, `#${xTipsTargetID}`, layerTipsOptions);
		}
		/* 如果delay之后还存在，再展示 */
		/* @ts-ignore */
	}, options.delay || 32);
}

/* 监听 触发popover的事件 hover click */
export function installPopoverDirective(app: any, appSettings: any) {
	const appId = xU.genId("appId");
	appAddPlugin[appId] = appSettings.appPlugins;
	appDependState[appId] = appSettings.dependState;

	app.directive("uiPopover", {
		/* @ts-ignore */
		mounted(el: any, binding: any) {
			init();

			updateMounted(el, binding);

			function init() {
				const xTipsTargetID = xU.genId("xTipsTarget");
				const $ele = $(el);
				$ele
					.addClass("x-ui-popover")
					.attr(DATA_APP_ID, appId)
					.attr("id", xTipsTargetID);
			}
		},
		beforeUpdate(el: any, binding: any) {
			updateMounted(el, binding);
		},
		unmounted(el: any) {
			const xTipsTargetID: any = $(el).attr("id");
			const _layer_index = $(`[${TIPS_TARGET_ID}=${xTipsTargetID}]`).attr(
				DATA_LAYER_INDEX
			);
			if (_layer_index) {
				/* @ts-ignore */
				LayerUtils.close(_layer_index);
			}
			delete tipsOptionsCollection[xTipsTargetID];
			delete tipsShouldInVisibleArea[xTipsTargetID];
		}
	});

	function updateMounted(el: any, binding: any) {
		const $ele = $(el);
		const xTipsTargetID: any = $ele.attr("id");
		if (binding.value) {
			tipsOptionsCollection[xTipsTargetID] = binding.value;
			if (binding.value?.trigger) {
				$ele.attr("data-trigger", binding.value?.trigger);
				const classStrategy = {
					rightClick: "pointer-right-click"
				};

				/* @ts-ignore */
				const className = classStrategy[binding.value?.trigger] || "pointer";

				if (!$ele.hasClass(className)) {
					/* @ts-ignore */
					$ele.addClass();
				}
			}
			/* 弹窗在click的点 */
			if (binding.value?.openAtPoint) {
				/* @ts-ignore */
				$ele.attr("data-open-at-point", true);
			}
		}
	}
}

function inVisibleArea(xTipsTargetID: string) {
	/*不关闭，取消定时器*/
	if (timer4CloseTips[xTipsTargetID]) {
		clearTimeout(timer4CloseTips[xTipsTargetID]);
		delete timer4CloseTips[xTipsTargetID];
	}
	/* 保持当前tips在可以范围 */
	tipsShouldInVisibleArea[xTipsTargetID] = true;
}

function closeTipsByTargetId(xTipsTargetID: string, options = {}) {
	delete tipsShouldInVisibleArea[xTipsTargetID];
	let layerIndex = tipsIndex(xTipsTargetID);
	if (layerIndex) {
		timer4CloseTips[xTipsTargetID] = setTimeout(() => {
			/* @ts-ignore */
			LayerUtils.close(layerIndex).finally(() => {
				delete timer4CloseTips[xTipsTargetID];
			});
		}, TIMEOUT_DELAY);
	}
}

function tipsIndex(xTipsTargetID) {
	return $(`[${DATA_TIPS_FOLLOW_ID}=${xTipsTargetID}]`).attr(DATA_LAYER_INDEX);
}
/* listener */

function handleClick(event: any) {
	event.preventDefault();
	/* @ts-ignore */
	const $ele: any = $(this);
	const xTipsTargetID = $ele.attr("id");
	const appId = $ele.attr(DATA_APP_ID);
	tipsShouldInVisibleArea[xTipsTargetID] = true;

	if (tipsIndex(xTipsTargetID)) {
		closeTipsByTargetId(xTipsTargetID);
	} else {
		openTips({ $ele, xTipsTargetID, appId, event });
	}
}

/* 鼠标click处理 */
/* 左键单击 */
$(document).on(
	"click.uiPopver",
	`[id^=${X_TIPS_TARGET}][data-trigger=click]`,
	handleClick
);
/* 右键单击 */
$(document).on(
	"contextmenu.uiPopver",
	`[id^=${X_TIPS_TARGET}][data-trigger=rightClick]`,
	handleClick
);

/* 鼠标hover处理 */
$(document).on(
	"mouseenter.uiPopver",
	`[id^=${X_TIPS_TARGET}]`,
	function (event) {
		console.log(event);
		const $ele: any = $(this);
		const xTipsTargetID = $ele.attr("id");
		if (tipsShouldInVisibleArea[xTipsTargetID]) {
			return;
		} else {
			const appId = $ele.attr(DATA_APP_ID);
			inVisibleArea(xTipsTargetID);
			/*如果存在，不重复添加*/
			if (tipsKeys[xTipsTargetID]) {
				return;
			}

			if (($ele.attr("data-trigger") as t_trigger) === "click") {
				return;
			}
			if (($ele.attr("data-trigger") as t_trigger) === "rightClick") {
				return;
			}

			openTips({ $ele, xTipsTargetID: xTipsTargetID, appId, event });
		}
	}
);

$(document).on(
	"mouseleave.uiPopver",
	`[id^=${X_TIPS_TARGET}]`,
	function (event) {
		const xTipsTargetID = $(this).attr("id");
		/*如果鼠标又移动到TIPS范围内，则不close*/
		/* @ts-ignore */
		closeTipsByTargetId(xTipsTargetID);
	}
);

/*
 * 鼠标滑动到弹出的tips上，
 * 不关闭附着的tips
 */
$(document).on(
	"mouseenter.uiPopverTips",
	`[${DATA_TIPS_FOLLOW_ID}]`,
	function (event) {
		/* 跟随的元素ID */
		const xTipsTargetID = $(this).attr(DATA_TIPS_FOLLOW_ID);
		/* @ts-ignore */
		inVisibleArea(xTipsTargetID);
	}
);

$(document).on(
	"mouseleave.uiPopverTips",
	`[${DATA_TIPS_FOLLOW_ID}]`,
	function (event) {
		const xTipsTargetID = $(this).attr(DATA_TIPS_FOLLOW_ID);
		/*如果鼠标又移动到TIPS范围内，则不close*/
		closeTipsByTargetId(xTipsTargetID as string);
	}
);
