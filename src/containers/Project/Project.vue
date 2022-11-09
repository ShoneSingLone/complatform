<script lang="jsx">
import GroupList from "../Group/GroupList/GroupList";
import ProjectList from "../Group/ProjectList/ProjectList";
import MemberList from "../Group/MemberList/MemberList";
import GroupLog from "../Group/GroupLog/GroupLog";
/* import GroupSetting from "./GroupSetting/GroupSetting.vue"; */
import "../Group/Group.scss";
import { API } from "@/api";
import { defineComponent } from "vue";
import { Methods_App, State_App } from "@/state/State_App";
import { ProjectChildren } from "../../router/router";
import { _ } from "@ventose/ui";
import { Cpt_url } from "../../state/State_App";

export default defineComponent({
	setup() {
		return {
			State_App,
			Cpt_url
		};
	},
	data() {
		return {
			currentViewKey: ProjectChildren[0].path,
			ProjectChildren
		};
	},
	mounted() {
		this.ifUrlNoProjectIdGetIt();
	},
	methods: {
		async ifUrlNoProjectIdGetIt() {
			try {
				if (!this.projectId) {
					let { data: group } = await API.group.getMyGroup();
					this.Cpt_url.go("/group", { group_id: group._id });
				}
			} catch (e) {
				console.error(e);
				this.ifUrlNoProjectIdGetIt();
			}
		},
		switchProjectSubOption({ key: path }) {
			this.Cpt_url.go(path, this.Cpt_url.query);
			this.currentViewKey = path;
		}
	},
	computed: {
		projectId() {
			return this.Cpt_url.query.project_id || false;
		}
	},
	render() {
		/* 如果没有projectId 则重定向到group */
		if (!this.projectId) {
			return <aSpin class="flex vertical middle center height100" />;
		}
		return (
			<div id="ProjectView">
				<aMenu
					onClick={this.switchProjectSubOption}
					selectedKeys={[this.currentViewKey]}
					mode="horizontal"
					class="g-row m-subnav-menu">
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
</script>

<style lang="less">
#ProjectView {
	flex: 1;
}
</style>
