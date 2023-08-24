import { $, iStorage, stateUI, xU } from "@/ventose/ui";

export const asyncGetMonaco = async () => {
	if (window.monaco) {
		return window.monaco;
	}
	await xU.asyncGlobalJS("require", `${stateUI.bashPath}monaco/vs/loader.js`);
	window.VentoseUtils = {
		iStorage,
		$,
		xU,
		vs: `${stateUI.bashPath}monaco/vs`
	};
	await xU.asyncGlobalJS(
		"monacoNls",
		`${stateUI.bashPath}monaco/vs/editor/editor.main.nls.js`
	);
	const monacoLoader = await xU.asyncGlobalJS(
		"monaco",
		`${stateUI.bashPath}monaco/vs/editor/editor.main.js`
	);
	return await monacoLoader();
};
