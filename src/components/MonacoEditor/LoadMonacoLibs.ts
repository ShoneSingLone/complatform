import { xU, State_UI, iStorage, $ } from "@ventose/ui";
export const asyncGetMonaco = async () => {

    if (window.monaco) {
        return window.monaco;
    }
    await xU.asyncGlobalJS(
        "require",
        `${State_UI.bashPath}monaco/node_modules/monaco-editor/min/vs/loader.js`
    );
    window.VentoseUtils = {
        iStorage,
        $,
        xU,
        vs: `${State_UI.bashPath}monaco/node_modules/monaco-editor/min/vs`
    };
    await xU.asyncGlobalJS("monacoNls", `${State_UI.bashPath}monaco/node_modules/monaco-editor/min/vs/editor/editor.main.nls.js`);
    const monacoLoader = await xU.asyncGlobalJS("monaco", `${State_UI.bashPath}monaco/node_modules/monaco-editor/min/vs/editor/editor.main.js`);
    return await monacoLoader();

};
