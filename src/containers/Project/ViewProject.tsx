import { xU } from "@ventose/ui";
import { defineComponent } from "vue";
import { resetStateInterface } from "./Interface/State_ProjectInterface";
import "./ViewProject.scss";
import { RouterView } from "@/components/RouterView/RouterView";
import { Cpt_url, ProjectChildren } from "@/router/router";
import { State_App } from "@/state/State_App";

/* 数据状态由ViewProject 提供，以便subView 切换之后数据状态不变 */

export const ViewProject = defineComponent({
	name: "ViewProject",
	setup() {
		/* 以project为root，共享数据随project生命周期重置 */
		resetStateInterface();
		return {
			State_App,
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
		switchProjectSubOption({ key: path }) {
			this.Cpt_url.go(path, this.Cpt_url.query);
			this.currentViewKey = path;
		}
	},
	computed: {},
	render() {
		/* 如果没有projectId 则重定向到group */
		if (!this.State_App.currProject._id) {
			return (
				<div v-xloading="true" class="flex vertical middle center height100" />
			);
		}

		return (
			<div id="ViewProject">
				<ElMenu
					onClick={this.switchProjectSubOption}
					selectedKeys={[this.currentViewKey]}
					mode="horizontal"
					class="">
					{xU.map(this.ProjectChildren, (item, index) => {
						// 若导航标题为两个字，则自动在中间加个空格
						if (item.label.length === 2) {
							item.label = item.label[0] + " " + item.label[1];
						}
						return (
							<ElMenuItem class="item" key={item.path}>
								{item.label}
							</ElMenuItem>
						);
					})}
				</ElMenu>
				<RouterView />
			</div>
		);
	}
});
