//@ts-nocheck
import "./index.less";
import "./ui.scss";
import ElementPlus from "element-plus";
import dayjs from "dayjs";
import $ from "jquery";
import xIcon, {xIconUseSvgInit} from "./xIcon/xIcon.vue";
import xButton from "./xButton/xButton";
import {xGap} from "./xLayout/xGap";
import xRender from "./xRender/xRender.jsx";
import xForm from "./xForm/xForm.vue";
import xButtonCountDown from "./xButton/xButtonCountDown.vue";
import xCharts from "./xCharts/xCharts.vue";
import xView from "./xView/xView.vue";
import xDataGrid from "./xDataGrid/xDataGrid.vue";
import xDataGridToolbar from "./xDataGrid/xDataGridToolbar.vue";
import xCellLabel from "./xDataGrid/xCellLabel.vue";
import xColFilter from "./xDataGrid/xColFilter.vue";
import xVirScroll from "./xSingle/xScroll/xVirScroll.vue";
import {xPagination} from "./xDataGrid/xPagination";
import {xItem} from "./xForm/xItem";
import {
    defXVirTableConfigs as defXVirTableConfigs,
    xVirTable
} from "./xDataGrid/xVirTable/xVirTable";
import {xU} from "./ventoseUtils";
import {Cpt_UI_locale, State_UI, $t} from "./State_UI";
import {installUIDialogComponent} from "./xSingle/dialog/dialog";
import {installDirective} from "./directive";
import {
    defCol,
    defColActions,
    defColActionsBtnlist,
    defDataGridOption,
    defPagination,
    getPaginationPageSize,
    setDataGridInfo,
    setPagination
} from "./xDataGrid/common";
import {antColKey, defItem, defFormConfigs, vModel} from "./xForm/common";
import {UI} from "./UI";
import {
    AllWasWell,
    EVENT_TYPE,
    itemsInvalid,
    setCSSVariables,
    setDocumentTitle,
    lStorage,
    iStorage,
    pickValueFrom,
    resetValueOf,
    setValueTo,
    VNodeCollection,
    newReactiveState,
    compileVNode
} from "./tools";
import {xLogObject} from "./xSingle/xLogObject";
import {usefnObserveDomResize} from "./compositionAPI/useDomResize";
import {useScopeStyle} from "./compositionAPI/useScopeStyle";
import {xInfoCard} from "./xView/xInfoCard";
import {xLinkCopy} from "./xButton/xLinkCopy";
import {xInfoDiffCard} from "./xInfoDiffCard/xInfoDiffCard";
import {xHighlight} from "./xRender/xHighlight";
// import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

if (State_UI.isDev) {
    /* @ts-ignore */
    window.dayjs = dayjs;
    /* @ts-ignore */
    window.moment = dayjs;
    /* @ts-ignore */
    window.jquery = $;
    /* @ts-ignore */
    window._ = xU;
}

export const compositionAPI = {
    usefnObserveDomResize,
    useScopeStyle
};

/* my-private-ui-component */
const componentMyUI = {
    xIcon,
    xButton,
    xGap,
    xRender,
    xItem,
    xForm,
    xButtonCountDown,
    xCharts,
    xView,
    xDataGrid,
    xDataGridToolbar,
    xColFilter,
    xPagination,
    xCellLabel,
    xVirScroll,
    xVirTable,
    xLogObject,
    xInfoCard,
    xLinkCopy,
    xInfoDiffCard,
    xHighlight
};

export const components = {
    ...componentMyUI
};

export {VNodeCollection as VNodeCollection};
export {newReactiveState as newReactiveState};
export {UI as UI};
export {dayjs as moment};
export {dayjs as dayjs};
export {xU as xU};
export {xU as _};
export {$ as $};
export {defPagination as defPagination};
export {defCol as defCol};
export {defColActions as defColActions};
export {defColActionsBtnlist as defColActionsBtnlist};
export {defDataGridOption as defDataGridOption};
export {defXVirTableConfigs as defXVirTableConfigs};
export {setDataGridInfo as setDataGridInfo};
/* State_UI作为句柄，与外部通信，$t language 等属性 */
export {State_UI as State_UI};
export {$t as $t};
export {Cpt_UI_locale as Cpt_UI_locale};
export {lStorage as lStorage};
export {iStorage as iStorage};
export {EVENT_TYPE as EVENT_TYPE};

export {setPagination as setPagination};
export {getPaginationPageSize as getPaginationPageSize};
export {itemsInvalid as itemsInvalid};
export {AllWasWell as AllWasWell};
export {setDocumentTitle as setDocumentTitle};
export {setCSSVariables as setCSSVariables};
export {defItem as defItem};
export {defFormConfigs as defFormConfigs};
export {vModel as vModel};
export {antColKey as antColKey};
export {pickValueFrom as pickValueFrom};
export {resetValueOf as resetValueOf};
export {setValueTo as setValueTo};
export {compileVNode as compileVNode};

export const VentoseUIWithInstall = {
    install: (app, options /* {appPlugins,dependState} */) => {
        app.config.globalProperties.$t = $t;
        installDirective(app, options);
        installUIDialogComponent(UI, options, app);
        xIconUseSvgInit();
        xU.each(components, (component, name) => {
            if (component.name) {
                name = component.name;
            } else {
                xU.doNothing(name, `miss name`);
            }
            app.component(component.name || name, component);
        });
        app.use(ElementPlus, {
            // locale: zhCn,
        });
    }
};
/*
export { ElCollapse as Collapse };
export { ElSelect as Select };
export { ElAutoComplete as AutoComplete };
export { ElAlert as Alert };
export { ElInput as Input };
export { ElTree as Tree };
export { ElModal as Modal };
export { ElElButton as Button };
export { Elmessage as message };
export { ElCheckbox as Checkbox };
export { ElSwitch as Switch };
export { ElTabs as Tabs };
export { ElTable as Table };
export { ElForm as Form };
export { ElIcon as Icon };
export { ElPopconfirm as Popconfirm };
export { ElUpload as Upload };
export { ElRow as Row };


<aCollapse
<aTooltip
<ElRow
<ElButton
<ElSpin
<xIcon
<ElDropdown
<ElAvatar
<ElMenu
<ElMenuItem
<ElInput
<ElSelect
<ElAlert<aAutoComplete
<ElTag
<ElTree
<ElCheckbox
<aModal
<aSearch
<aTooltipTitle
<aModalPostman
<aInputGroup
<aTooltipContent
<aCollapsePanel
<ElTimelineItem
<ElTimeline
<aSelectOption
<aResult
<aside
<aUploadDragger
<aTextarea
<any
<ElPagination


 */
