import ProjectCard from "@/components/ProjectCard/ProjectCard";
import { ErrMsg } from "@/components/ErrMsg/ErrMsg";

import "./ProjectList.scss";
import { defineComponent } from "vue";
import { stateApp } from "@/state/app";
import { xU, xI } from "@/ventose/ui";
import { cptRouter } from "@/router/router";
import { DialogAddProject } from "../AddProject/DialogAddProject";
import { ADMIN, OWNER, PRIVATE } from "@/utils/variable";

export const GroupProjectList = defineComponent({
	setup() {
		return { stateApp, cptRouter };
	},
	data() {
		const vm = this;
		vm.fetchProjectList = xU.debounce(async function () {
			await stateApp._fetchProjectList(vm.cptRouter.query.group_id);
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
			const btnConfigs = {
				text: xI("添加项目"),
				type: "primary",
				disabled: this.isAuthAddProject
					? ""
					: `<div>${xI("您没有权限")}</div>
					<div>${xI("请联系该分组组长或管理员")}</div>`,
				onClick: this.showAddProjectDialog
			};
			return <xButton configs={btnConfigs} />;
		},
		vDomNoFollowPanel() {
			const isUnfollow = project => !project.follow;
			let unfollowArray = xU.sortBy(xU.filter(this.projectData, isUnfollow), [
				"up_time"
			]);

			if (xU.isArrayFill(unfollowArray)) {
				return (
					<div class="bottom-line">
						<h3 class="owner-type">{xI("我的项目")}</h3>
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
					<div data-id="我的关注">
						<h3 class="owner-type">{xI("我的关注")}</h3>
						{this.genProjectCard(followProject)}
					</div>
				);
			} else {
				return null;
			}
		},
		vDomOwnerSpace() {
			return this.projectData.length ? (
				<div class="flex1 overflow-auto">
					{this.vDomNoFollowPanel}
					{this.vDomFollowPanel}
				</div>
			) : (
				<ErrMsg type="noProject" />
			);
		},
		vDomSpaceProject() {
			if (this.stateApp.currGroup.type === PRIVATE) {
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
			return this.stateApp.projectList;
		},
		isAuthAddProject() {
			const isGroupRoleAuth = [ADMIN, OWNER].includes(
				this.stateApp?.currGroup?.role
			);
			const _isShow =
				isGroupRoleAuth || [ADMIN, OWNER].includes(this.stateApp.user.role);
			if (!_isShow) {
				xU("isAuthAddProject", this.stateApp.user.role);
			}
			return _isShow;
		}
	},
	watch: {
		"cptRouter.query.group_id": {
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
		async showAddProjectDialog() {
			const vm = this;
			xU.dialog({
				title: "添加项目",
				component: DialogAddProject,
				groupId: vm.cptRouter.query.group_id,
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
			<div v-xloading={this.isLoading} class="project-list">
				<ElRow class="project-list-header">
					<elCol span={16} style={{ textAlign: "left" }}>
						<span>共</span>
						<span> {this.stateApp.projectList.length} </span>
						<span>个项目</span>
					</elCol>
					<elCol span={8} class="flex end flex1">
						{this.vDomAddProjectButton}
					</elCol>
				</ElRow>
				{this.vDomSpaceProject}
			</div>
		);
	}
});
