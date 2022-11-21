```js
import { State_App } from "@/state/State_App";

	setup() {
		return {State_App}
	},

```

```js

validateForm, AllWasWell, pickValueFrom,

rules: [FormRules.required("请输入项目基本路径!")]



const validateResults = await validateForm(instance.vm.formItems);
if (AllWasWell(validateResults)) {
	const { project_name } = pickValueFrom(instance.vm.formItems);
	try {
		await this.copyProject({ project_name });
		return true;
	} catch (error) {
		UI.message.error("复制失败");
	}
} else {
	throw new Error("未通过验证");
}

UI.dialog.component({
	title: this.$t("添加分类").label,
	component: DialogAddCategory,
	onOk: async (instance) => {
		const res = await instance.vm.submit();
		if (res) {
			instance.close()
		}
		this.update()
	}
})

```