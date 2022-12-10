import { xU, $, VentoseUIWithInstall, State_UI } from "@ventose/ui";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import { RouterView } from "../components/RouterView/RouterView";
import { ErrMsg } from "../components/ErrMsg/ErrMsg";
import { InfoCard } from "../components/InfoCard";
export { ITEM_OPTIONS } from "./common.options";
import CopyContent from "../components/CopyContent.vue";

dayjs.locale("zh-cn");

/**
 * 复用配置
 * @param {*} app
 * @param {*} param1
 * @returns
 */
export const appPlugins = {
	install: (app, options /*{dependState, appPlugins}*/) => {
		/* isUsePopover 全局监听 [data-ui-popover] */
		app.use(VentoseUIWithInstall, {
			appPlugins,
			dependState: options.dependState
		});
		app.use({
			install: (app, { watch } = {}) => {
				app.component("InfoCard", InfoCard);
				app.component("RouterView", RouterView);
				app.component("ErrMsg", ErrMsg);
				app.component("CopyContent", CopyContent);
				//注册i8n实例并引入语言文件
				app.config.globalProperties.$t = State_UI.$t;
				State_UI.assetsSvgPath = `${__URL_STATIC_DIR}assets/img/svg`;
				$("html").attr("lang", State_UI.language);
				watch && watch();
			}
		});
		return app;
	}
};

// 从 Javascript 对象中选取随机属性
export const _$pickRandomProperty = obj => {
	let result;
	let count = 0;
	for (let prop in obj) {
		if (Math.random() < 1 / ++count) {
			result = prop;
		}
	}
	return result;
};
// 从 Javascript 对象中选取随机属性

export const _$randomValueAndProp = (obj: any) => {
	if (xU.isArray(obj) && obj.length > 0) {
		const start = 0;
		const end = obj.length;
		const key = Math.floor(Math.random() * end + start);
		return [obj[key], key];
	} else if (xU.isPlainObject(obj)) {
		const objArray = Object.keys(obj);
		const [prop] = _$randomValueAndProp(objArray);
		return [obj[prop], prop];
	} else {
		return ["", 0];
	}
};
export const _$randomNum = (start = 0, end = 100) => {
	return Math.floor(Math.random() * end + start);
};

export const _$handlePath = path => {
	path = xU.trim(path);
	if (!path) {
		return path;
	}
	if (path === "/") {
		return "";
	}
	path = path[0] !== "/" ? "/" + path : path;
	path = path[path.length - 1] === "/" ? path.substr(0, path.length - 1) : path;
	return path;
};

export const _$timeAgo = function (timestamp) {
	let minutes, hours, days, seconds, mouth, year;
	const timeNow = parseInt(new Date().getTime() / 1000);
	seconds = timeNow - timestamp;
	if (seconds > 86400 * 30 * 12) {
		year = parseInt(seconds / (86400 * 30 * 12));
	} else {
		year = 0;
	}
	if (seconds > 86400 * 30) {
		mouth = parseInt(seconds / (86400 * 30));
	} else {
		mouth = 0;
	}
	if (seconds > 86400) {
		days = parseInt(seconds / 86400);
	} else {
		days = 0;
	}
	if (seconds > 3600) {
		hours = parseInt(seconds / 3600);
	} else {
		hours = 0;
	}
	minutes = parseInt(seconds / 60);
	if (year > 0) {
		return year + "年前";
	} else if (mouth > 0 && year <= 0) {
		return mouth + "月前";
	} else if (days > 0 && mouth <= 0) {
		return days + "天前";
	} else if (days <= 0 && hours > 0) {
		return hours + "小时前";
	} else if (hours <= 0 && minutes > 0) {
		return minutes + "分钟前";
	} else if (minutes <= 0 && seconds > 0) {
		if (seconds < 30) {
			return "刚刚";
		} else {
			return seconds + "秒前";
		}
	} else {
		return "刚刚";
	}
};

// 交换数组的位置
export const _$arrayChangeIndex = (arr, dragId, dropId) => {
	arr = JSON.parse(JSON.stringify(arr));
	const findBy = { _id: dragId };
	const dragItem = xU.find(arr, findBy);
	const dragIndex = xU.findIndex(arr, findBy);
	const dropIndex = xU.findIndex(arr, { _id: dropId });

	if (dragIndex > -1 && dropIndex > -1) {
		arr[dragIndex] = null;
		arr.splice(dropIndex, 0, dragItem);
		let index = 0;
		return xU.reduce(
			arr,
			(_arr, item) => {
				if (item) {
					_arr.push({
						id: item._id,
						index: index++
					});
				}
				return _arr;
			},
			[]
		);
	} else {
		return [];
	}
};
