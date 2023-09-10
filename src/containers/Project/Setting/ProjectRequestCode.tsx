import { defineComponent, reactive } from "vue";
import { stateApp } from "@/state/app";
import { cptRouter } from "@/router/router";
import { xI, defItem, xU, pickValueFrom, itemsInvalid } from "@/ventose/ui";
import { API } from "@/api";

const a = function ({ title, projectId, interfaceId, path, method, xU }) {
	return `\`\`\`js
/**
*  ${title}
*  ${window.location.href}
*  http://10.143.133.216:3001/project/${projectId}/interface/api/${interfaceId}
*/
async ${xU.camelCase(path)}({params,data}) {
	return await request({
		method: "${method}",
		url: \`${path}\`,
		params:params||{},
		data:data||{}
	});
}
\`\`\`
`;
};

export const ProjectRequestCode = defineComponent({
	setup() {
		const state = reactive({
			ProjectRequestCode: a.toString()
		});
		return function () {
			const vm = this;
			return <MonacoEditor language="js" code={state.ProjectRequestCode} />;
		};
	}
});
