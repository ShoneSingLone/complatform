import { _, $, VentoseUIWithInstall, State_UI } from "@ventose/ui/dist/VentoseUI.es";
import { router } from "@/router/router";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";

export { ITEM_OPTIONS } from "./common.options";
export { STATIC_WORD } from "./common.words";
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
                //注册i8n实例并引入语言文件
                app.config.globalProperties.$t = State_UI.$t;
                State_UI.assetsSvgPath = `${__URL_STATIC_DIR}assets/img/svg`;
                $("html").attr("lang", State_UI.language);
                watch && watch();
            }
        });
        app.use(router);
        return app;
    }
};

// 从 Javascript 对象中选取随机属性
export const pickRandomProperty = obj => {
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


export const randomValueAndProp = (obj: any) => {
    if (_.isArray(obj) && obj.length > 0) {
        const start = 0;
        const end = obj.length;
        const key = Math.floor((Math.random() * end) + start);
        return [obj[key], key];
    } else if (_.isPlainObject(obj)) {
        const objArray = Object.keys(obj);
        const [prop] = randomValueAndProp(objArray);
        return [obj[prop], prop];
    } else {
        return ["", 0];
    }

};
export const randomNum = (start = 0, end = 100) => {
    return Math.floor((Math.random() * end) + start);;
};

export const handlePath = path => {
    path = _.trim(path);
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
