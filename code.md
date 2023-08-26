```js
import { State_App } from "@/state/State_App";

	setup() {
		return {State_App}
	},

```

```js

itemsInvalid,  pickValueFrom,

rules: [FormRules.required("请输入项目基本路径!")]



if (!(await itemsInvalid())) {
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

xU.openDialog({
	title: this.$t("添加分类"),
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