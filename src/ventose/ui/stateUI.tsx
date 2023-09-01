import { computed, reactive, watch, getCurrentInstance } from "vue";
import { lStorage } from "./tools/storage";
import { xU } from "./ventoseUtils";

/*
 * i18n国际化
 * 使用 {变量名} 赋值
 * @export
 * @param {string} prop
 * @param {any} [payload={}]
 * @param {(object | boolean)} [i18nKeyVal=false]
 * @returns
 * */
export function xI(
	prop: string,
	payload = {},
	i18nKeyVal: object | boolean = false
) {
	/* TODO:响应式地更新i18n */
	/* const vm = getCurrentInstance();
	if (vm) {
		debugger;
	} */
	let content = prop;
	/* this指向 */
	i18nKeyVal = i18nKeyVal || stateUI.i18nKeyVal;
	if (i18nKeyVal) {
		//@ts-ignore
		const temp = i18nKeyVal[prop];
		if (temp) {
			xU.templateSettings.interpolate = /{([\s\S]+?)}/g;
			content = xU.template(temp)(payload);
			if (!content) {
				content = prop;
				console.error(`xI:${prop} "NOT_FOUND"`);
			}
		}
	}
	return content;
}

/* 可以与外部通信，可以增改 */

let _stateUI = {
	pagination: {
		page: "page",
		size: "size",
		total: "total"
	},
	i18nKeyVal: {},
	language: lStorage["language"] || "zh-CN",
	onLanguageChange: false,
	LANGUAGE: {},
	/* 放svg文件的文件夹路径*/
	assetsSvgPath: "",
	assetsPath: "",
	basePath: "",
	setBasePath(basePath) {
		stateUI.assetsSvgPath = basePath + "assets/svg";
		stateUI.assetsPath = basePath + "assets";
		stateUI.basePath = basePath;
	},
	setAssetsBaseById(eleId: string) {
		const img = document.getElementById(eleId);
		if (img) {
			//@ts-ignore
			const src = String(img.src || img.href);
			const index = src.match(/assets(.*)/)?.index || 0;
			stateUI.assetsSvgPath = src.substring(0, index) + "assets/svg";
			stateUI.assetsPath = src.substring(0, index) + "assets";
			stateUI.basePath = src.substring(0, index);
		}
	},
	isDev: localStorage.___VENTOSE_UI_IS_DEV_MODE === "VENTOSE_UI_IS_DEV_MODE",
	dev(isDev: any) {
		if (isDev) {
			localStorage.___VENTOSE_UI_IS_DEV_MODE = "VENTOSE_UI_IS_DEV_MODE";
		} else {
			localStorage.removeItem("___VENTOSE_UI_IS_DEV_MODE");
		}
	}
};

type t_stateUI = typeof _stateUI;

export const stateUI: t_stateUI = reactive(_stateUI);

watch(
	() => stateUI.language,
	language => {
		lStorage["language"] = language;
		if (stateUI.onLanguageChange) {
			//@ts-ignore
			stateUI.onLanguageChange(language, stateUI);
		}
	},
	{
		immediate: true
	}
);

export const Cpt_UI_locale = computed(() => {
	const currentLanguage = xU.camelCase(stateUI.language);
	//@ts-ignore
	const locale = stateUI.LANGUAGE[currentLanguage];
	return locale;
});
