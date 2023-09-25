import { defineComponent, reactive, computed } from "vue";
import { stateApp } from "@/state/app";
import { cptRouter } from "@/router/router";
import { xI, defItem, xU, pickValueFrom, itemsInvalid } from "@/ventose/ui";
import { API } from "@/api";

export const ProjectRequestCode = defineComponent({
	setup() {
		const state = reactive({
			ProjectRequestCode: stateApp.currProject.requestCode
		});

		const genCodeFn = function (ProjectRequestCode) {
			try {
				const requestCode = new Function(
					"params",
					`return (${ProjectRequestCode})(params)`
				);

				return requestCode({
					title: "TitleDemo",
					path: "/path_demo",
					method: "GET",
					projectId: "projectId_demo",
					interfaceId: "interfaceId_demo",
					xU
				});
			} catch (error) {
				return error.message;
			}
		};

		const cpt_code = computed(() => {
			return genCodeFn(state.ProjectRequestCode);
		});

		return function () {
			const vm = this;
			return (
				<div class="flex flex1 vertical">
					<div class="flex flex1 box-shadow mt mb ">
						<div class="flex flex1 vertical" style="width:40%;">
							<monacoEditor v-model:code={state.ProjectRequestCode} />
						</div>
						<xGap l />
						<pre class="flex1" style="width:40%;">
							<mkit md={cpt_code.value} />
						</pre>
					</div>
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
