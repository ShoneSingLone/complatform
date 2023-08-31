<section id="ViewProjectSetting">
	{/* {JSON.stringify(stateApp.currProject)} */}
	<a-tabs v-model:activeKey={vm.activeKey} tabPosition="left">
		<a-tab-pane key="1" tab={xI("项目配置")} class="flex" style="width:100%">
			<ProjectSettingCommon />
		</a-tab-pane>
		<a-tab-pane key="3" tab={xI("请求配置")}>
			<p>Content of Tab Pane 3</p>
			<p>Content of Tab Pane 3</p>
			<p>Content of Tab Pane 3</p>
		</a-tab-pane>
		<a-tab-pane key="token配置" tab={xI("token配置")}>
			<p>Content of Tab Pane 3</p>
			<p>Content of Tab Pane 3</p>
			<p>Content of Tab Pane 3</p>
		</a-tab-pane>
		<a-tab-pane key="全局mock脚本" tab={xI("全局mock脚本")}>
			<p>Content of Tab Pane 3</p>
			<p>Content of Tab Pane 3</p>
			<p>Content of Tab Pane 3</p>
		</a-tab-pane>
	</a-tabs>
</section>;
