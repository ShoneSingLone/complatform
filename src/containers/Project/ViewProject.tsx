import { xU, xI } from "@/ventose/ui";
import { defineComponent } from "vue";
import { resetStateInterface } from "./Interface/State_ProjectInterface";
import "./ViewProject.scss";
import { RouterView } from "@/components/RouterView/RouterView";
import { Cpt_url, ProjectChildren, aHashLink } from "@/router/router";
import { stateApp } from "@/state/app";

/* 数据状态由ViewProject 提供，以便subView 切换之后数据状态不变 */

export const ViewProject = defineComponent({
	name: "ViewProject",
	setup() {
		/* 以project为root，共享数据随project生命周期重置 */
		resetStateInterface();
		return {
			stateApp,
			Cpt_url
		};
	},
	watch: {
		Cpt_url: {
			deep: true,
			handler(Cpt_url) {
				const [_, a, b] = String(Cpt_url.pathname).split("/");
				const currentViewKey = `/${a}/${b}`;
				if (this.currentViewKey != currentViewKey) {
					this.currentViewKey = currentViewKey;
				}
			}
		}
	},
	data() {
		const [_, a, b] = String(this.Cpt_url.pathname).split("/");
		return {
			ProjectChildren,
			currentViewKey: `/${a}/${b}`
		};
	},
	methods: {
		switchProjectSubOption(item) {
			const { path } = item;
			if (path) {
				this.Cpt_url.go(path, this.Cpt_url.query);
				this.currentViewKey = path;
			}
		}
	},
	computed: {},
	render() {
		/* 如果没有projectId 则重定向到group */
		if (!this.stateApp.currProject._id) {
			return (
				<div v-xloading="true" class="flex vertical middle center height100" />
			);
		}

		return (
			<div id="ViewProject">
				<div class="el-menu">
					<a
						class="flex middle el-sub-menu"
						href={aHashLink("/wiki_project", {
							group_id: this.Cpt_url.query.group_id,
							project_id: this.Cpt_url.query.project_id
						})}
						style={this.styleLogo}
						target="_black">
						<xIcon icon="wikidoc" style={this.styleLogo} />
						<span>{xI("项目文档")}</span>
					</a>
					{xU.map(this.ProjectChildren, (item, index) => {
						return (
							<div
								class="el-sub-menu item pointer"
								key={item.path}
								onClick={() => this.switchProjectSubOption(item)}>
								{item.label}
							</div>
						);
					})}
				</div>
				<div class="flex middle vertical flex1">
					<RouterView />
				</div>
			</div>
		);
	}
});
