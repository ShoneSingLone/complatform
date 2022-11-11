import { _ } from "@ventose/ui";
import { computed, defineComponent } from "vue";
import { Cpt_url, ProjectChildren } from "../../router/router";
import { State_App } from "../../state/State_App";
import { API } from "../../api";
import { useProjectBasicProperties } from "../../compositions";

export const ViewProject = defineComponent({
	setup() {
		const { Cpt_currGroupId, Cpt_currProjectId } = useProjectBasicProperties();
		return {
			State_App,
			Cpt_url,
			Cpt_currGroupId,
			Cpt_currProjectId
		};
	},
	data() {
		return {
			currentViewKey: ProjectChildren[0].path,
			ProjectChildren
		};
	},
	methods: {
		switchProjectSubOption({ key: path }) {
			this.Cpt_url.go(path, this.Cpt_url.query);
			this.currentViewKey = path;
		}
	},
	computed: {},
	render() {
		/* 如果没有projectId 则重定向到group */
		if (!this.Cpt_currProjectId) {
			return <aSpin class="flex vertical middle center height100" />;
		}
		return (
			<div id="ProjectView" class="flex flex1 vertical">
				<aMenu
					onClick={this.switchProjectSubOption}
					selectedKeys={[this.currentViewKey]}
					mode="horizontal"
					class="">
					{_.map(this.ProjectChildren, (item, index) => {
						// 若导航标题为两个字，则自动在中间加个空格
						if (item.label.length === 2) {
							item.label = item.label[0] + " " + item.label[1];
						}
						return (
							<aMenuItem class="item" key={item.path}>
								{item.label}
							</aMenuItem>
						);
					})}
				</aMenu>
				<xRouterView />
			</div>
		);
	}
});
