```js
import { State_App } from "@/state/State_App";

	setup() {
		return {State_App}
	},

```

```js

validateForm, AllWasWell, pickValueFrom,

onOk: async dialog => {
	const validateResults = await validateForm(dialog.vm.formItems);
	if (AllWasWell(validateResults)) {
		const { project_name } = pickValueFrom(dialog.vm.formItems);
		try {
			await this.copyProject({ project_name });
			dialog.close();
		} catch (error) {
			UI.message.error("复制失败");
		}
	} else {
		throw new Error("未通过验证");
	}
}```