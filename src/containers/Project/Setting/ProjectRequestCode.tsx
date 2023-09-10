import { defineComponent, reactive } from "vue";
import { stateApp } from "@/state/app";
import { cptRouter } from "@/router/router";
import { xI, defItem, xU, pickValueFrom, itemsInvalid } from "@/ventose/ui";
import { API } from "@/api";

export const ProjectRequestCode = defineComponent({
	setup() {
		const state = reactive({
			ProjectRequestCode: stateApp.currProject.requestCode
		});
		return function () {
			const vm = this;
			return (
				<div class="flex flex1 vertical">
					<MonacoEditor
						language="javascript"
						v-model:code={state.ProjectRequestCode}
					/>
					<div class="flex center middle">
						<xButton
							configs={{
								type: "primary",
								text: xI("更新"),
								async onClick() {
									try {
										const dataForm = {
											id: stateApp.currProject._id,
											requestCode: state.ProjectRequestCode
										};
										await API.project.update(dataForm);
										stateApp._setCurrProject(dataForm.id, { isEnforce: true });
										xU.message.success("更新成功");
									} catch (error) {
										xU.message.error(error.message);
									}
								}
							}}
						/>
					</div>
				</div>
			);
		};
	}
});
