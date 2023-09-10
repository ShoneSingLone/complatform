import { $, iStorage, stateUI, xU } from "@/ventose/ui";

export const asyncGetMonaco = async () => {
	if (window.monaco) {
		return window.monaco;
	}
	await xU.asyncGlobalJS("require", `${stateUI.basePath}monaco/vs/loader.js`);
	window.VentoseUtils = {
		iStorage,
		$,
		xU,
		vs: `${stateUI.basePath}monaco/vs`
	};
	await xU.asyncGlobalJS(
		"monacoNls",
		`${stateUI.basePath}monaco/vs/editor/editor.main.nls.js`
	);
	const monacoLoader = await xU.asyncGlobalJS(
		"monaco",
		`${stateUI.basePath}monaco/vs/editor/editor.main.js`
	);
	return await monacoLoader();
};
