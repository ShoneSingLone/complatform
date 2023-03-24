import { defineComponent } from "vue";
import { State_App } from "@/state/State_App";
import { Cpt_url } from "@/router/router";
import { $t } from "@ventose/ui";
import { ProjectSettingCommon } from "./ProjectSettingCommon";

export const ProjectSetting = defineComponent({
	setup() {
		return {
			State_App,
			Cpt_url
		};
	},
	data(vm) {
		return {
			activeKey: "1"
		};
	},
	created() {},
	methods: {},
	render() {
		return (
			<section id="ViewProjectSetting">
				{/* {JSON.stringify(this.State_App.currProject)} */}
				<a-tabs v-model:activeKey={this.activeKey} tabPosition="left">
					<a-tab-pane
						key="1"
						tab={$t("项目配置").label}
						class="flex"
						style="width:100%">
						<ProjectSettingCommon />
					</a-tab-pane>
					<a-tab-pane key="3" tab={$t("请求配置").label}>
						<p>Content of Tab Pane 3</p>
						<p>Content of Tab Pane 3</p>
						<p>Content of Tab Pane 3</p>
					</a-tab-pane>
					<a-tab-pane key="token配置" tab={$t("token配置").label}>
						<p>Content of Tab Pane 3</p>
						<p>Content of Tab Pane 3</p>
						<p>Content of Tab Pane 3</p>
					</a-tab-pane>
					<a-tab-pane key="全局mock脚本" tab={$t("全局mock脚本").label}>
						<p>Content of Tab Pane 3</p>
						<p>Content of Tab Pane 3</p>
						<p>Content of Tab Pane 3</p>
					</a-tab-pane>
				</a-tabs>
			</section>
		);
	}
});
