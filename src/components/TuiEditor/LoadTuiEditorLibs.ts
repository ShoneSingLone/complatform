import { xU, State_UI } from "@ventose/ui";

export const asyncGetTuiEditor = async () => {
	if (window.TuiEditor) {
		return window.TuiEditor;
	}
	xU.asyncLoadStyle(`${State_UI.bashPath}tui-editor/style.css`);
	return await xU.asyncGlobalJS(
		"TuiEditor",
		`${State_UI.bashPath}tui-editor/tui.js`
	);
};
