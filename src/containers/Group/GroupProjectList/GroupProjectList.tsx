import ProjectCard from "@/components/ProjectCard/ProjectCard";
import { ErrMsg } from "@/components/ErrMsg/ErrMsg";

import "./ProjectList.scss";
import { defineComponent } from "vue";
import { Methods_App, State_App } from "@/state/State_App";
import { UI, xU } from "@ventose/ui";
import { Cpt_url } from "../../../router/router";
import { DialogAddProject } from "../AddProject/DialogAddProject";

export const GroupProjectList = defineComponent({
	setup() {
		return { State_App, Cpt_url };
	},
	data() {
		const vm = this;
		vm.fetchProjectList = xU.debounce(async function () {
			await Methods_App.fetchProjectList(vm.Cpt_url.query.group_id);
			vm.isLoading = false;
		});
		vm.updateProjectList = () => {
			vm.isLoading = true;
			vm.fetchProjectList();
		};
		return {
			configs: {},
			isLoading: false,
			state: {
				visible: false,
				protocol: "http://",
				projectData: []
			}
		};
	},
	computed: {
		vDomAddProjectButton() {
			if (this.isAuthAddProject) {
				return (
					<aButton type="primary" onClick={this.showAddProjectDialog}>
						添加项目
					</aButton>
				);
			} else {
				return (
					<aTooltip title="您没有权限,请联系该分组组长或管理员">
						<aButton type="primary" disabled>
							添加项目
						</aButton>
					</aTooltip>
				);
			}
		},
		vDomNoFollowPanel() {
			const isUnfollow = project => !project.follow;
			let unfollowArray = xU.sortBy(xU.filter(this.projectData, isUnfollow), [
				"up_time"
			]);

			if (xU.isArrayFill(unfollowArray)) {
				return (
					<div style={{ borderBottom: "1px solid #eee", marginBottom: "15px" }}>
						<h3 class="owner-type">我的项目</h3>
						{this.genProjectCard(unfollowArray, this.isAuthAddProject)}
					</div>
				);
			}
			return null;
		},
		vDomFollowPanel() {
			const isFollow = project => !!project.follow;
			let followProject = xU.sortBy(xU.filter(this.projectData, isFollow), [
				"up_time"
			]);
			if (xU.isArrayFill(followProject)) {
				return (
					<div style={{ borderBottom: "1px solid #eee", marginBottom: "15px" }}>
						<h3 class="owner-type">我的关注</h3>
						{this.genProjectCard(followProject)}
					</div>
				);
			} else {
				return null;
			}
		},
		vDomOwnerSpace() {
			return this.projectData.length ? (
				<div class="flex1 height100 overflow-auto">
					{this.vDomNoFollowPanel}
					{this.vDomFollowPanel}
				</div>
			) : (
				<ErrMsg type="noProject" />
			);
		},
		vDomSpaceProject() {
			if (this.State_App.currGroup.type === "private") {
				/*私有项目*/
				return this.vDomOwnerSpace;
			} else {
				if (this.projectData.length) {
					/*一般项目*/
					return this.genProjectCard(this.projectData, this.isAuthAddProject);
				} else {
					/*无项目*/
					return (
						<div class="flex center width100">
							<ErrMsg type="noProject" />
						</div>
					);
				}
			}
		},
		projectData() {
			return this.State_App.projectList;
		},
		isAuthAddProject() {
			const isGroupRoleAuth = ["admin", "owner"].includes(
				this.State_App?.currGroup?.role
			);
			const _isShow =
				isGroupRoleAuth ||
				["admin", "owner"].includes(this.State_App.user.role);
			if (!_isShow) {
				xU("isAuthAddProject", this.State_App.user.role);
			}
			return _isShow;
		}
	},
	watch: {
		"Cpt_url.query.group_id": {
			immediate: true,
			handler() {
				this.isLoading = true;
				this.updateProjectList();
			}
		}
	},
	methods: {
		genProjectCard(projectItems, isShow = false) {
			return (
				<div class="flex like-float">
					{xU.map(projectItems, (item, index) => {
						return (
							<ProjectCard
								isShow={isShow}
								index={index}
								projectData={item}
								callbackResult={this.updateProjectList}
							/>
						);
					})}
				</div>
			);
		},
		showAddProjectDialog() {
			const vm = this;
			UI.dialog.component({
				title: "添加项目",
				component: DialogAddProject,
				groupId: vm.Cpt_url.query.group_id,
				updateProjectList: vm.updateProjectList
			});
		},
		// 修改线上域名的协议类型 (http/https)
		protocolChange(value) {
			this.setState({
				protocol: value
			});
		}
		// 获取 ProjectCard 组件的关注事件回调，收到后更新数据
	},
	render() {
		return (
			<div
				v-loading={this.isLoading}
				style={{ paddingTop: "24px" }}
				class="m-panel card-panel card-panel-s project-list height100 flex vertical">
				<aRow class="project-list-header">
					<aCol span={16} style={{ textAlign: "left" }}>
						<span>共</span>
						<span> {this.State_App.projectList.length} </span>
						<span>个项目</span>
						{/* {this.isAuthAddProject ? JSON.stringify(this.State_App.currGroup, null, 2) : ""} */}
					</aCol>
					<aCol span={8} class="flex end flex1">
						{this.vDomAddProjectButton}
					</aCol>
				</aRow>
				{this.vDomSpaceProject}
			</div>
		);
	}
});
