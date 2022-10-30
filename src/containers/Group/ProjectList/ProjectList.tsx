import ProjectCard from "@/components/ProjectCard/ProjectCard";
import ViewAddProject from "@/containers/AddProject/ViewAddProject";
import { ErrMsg } from "@/components/ErrMsg/ErrMsg";

import "./ProjectList.scss";
import { defineComponent } from "vue";
import { Methods_App, State_App } from "@/state/State_App";
import { AllWasWell, pickValueFrom, UI, validateForm, _ } from "@ventose/ui";

export default defineComponent({
	props: [
		"form",
		"addProject",
		"delProject",
		"changeUpdateModal",
		"projectList",
		"userInfo",
		"tableLoading",
		"setBreadcrumb",
		"currPage",
		"studyTip",
		"study"
	],
	setup() {
		return { State_App };
	},
	data() {
		const vm = this;
		vm.fetchProjectList = _.debounce(async function () {
			await Methods_App.fetchProjectList(vm.$route.params.groupId);
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
		projectData() {
			return this.State_App.project.projectList;
		},
		isShow() {
			const _isShow = ["admin", "owner", "dev"].includes(
				this.State_App.user.role
			);
			if (!_isShow) {
				console.error(this.State_App.user.role);
			}
			return _isShow;
		}
	},
	watch: {
		"$route.params.groupId": {
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
					{_.map(projectItems, (item, index) => {
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
		openAddProjectDialog() {
			const vm = this;
			UI.dialog.component({
				title: "添加项目",
				component: ViewAddProject,
				area: ["840px", "550px"],
				okText: "创建项目",
				groupId: vm.$route.params.groupId,
				onOk: async dialog => {
					const res = await dialog.vm.submit();
					if (res) {
						dialog.close();
						vm.updateProjectList();
					}
				}
			});
		},
		// 取消修改

		// 修改线上域名的协议类型 (http/https)
		protocolChange(value) {
			this.setState({
				protocol: value
			});
		}
		// 获取 ProjectCard 组件的关注事件回调，收到后更新数据
	},
	render() {
		let projectData = this.projectData;
		let noFollow = [];
		let followProject = [];
		for (var i in projectData) {
			if (projectData[i].follow) {
				followProject.push(projectData[i]);
			} else {
				noFollow.push(projectData[i]);
			}
		}
		followProject = followProject.sort((a, b) => {
			return b.up_time - a.up_time;
		});
		noFollow = noFollow.sort((a, b) => {
			return b.up_time - a.up_time;
		});
		projectData = [...followProject, ...noFollow];

		const Follow = () => {
			if (followProject.length) {
				return (
					<div style={{ borderBottom: "1px solid #eee", marginBottom: "15px" }}>
						<h3 class="owner-type">我的关注</h3>
						{this.genProjectCard(followProject)}
					</div>
				);
			}
			return null;
		};
		const NoFollow = () => {
			if (noFollow.length) {
				return (
					<div style={{ borderBottom: "1px solid #eee", marginBottom: "15px" }}>
						<h3 class="owner-type">我的项目</h3>
						{this.genProjectCard(noFollow, this.isShow)}
					</div>
				);
			}

			return null;
		};

		const OwnerSpace = () => {
			return projectData.length ? (
				<div class="flex1 height100 overflow-auto">
					<NoFollow />
					<Follow />
				</div>
			) : (
				<ErrMsg type="noProject" />
			);
		};

		const addProjectButton = (() => {
			if (this.isShow) {
				return (
					<aButton type="primary" onClick={this.openAddProjectDialog}>
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
		})();

		const SpaceProject = (() => {
			if (this.State_App.currGroup.type === "private") {
				/*私有项目*/
				return <OwnerSpace />;
			} else {
				if (projectData.length) {
					/*一般项目*/
					return this.genProjectCard(projectData, this.isShow);
				} else {
					/*无项目*/
					return (
						<div class="flex center width100">
							<ErrMsg type="noProject" />
						</div>
					);
				}
			}
		})();

		return (
			<div
				v-loading={this.isLoading}
				style={{ paddingTop: "24px" }}
				class="m-panel card-panel card-panel-s project-list height100 flex vertical">
				<aRow class="project-list-header">
					<aCol span={16} style={{ textAlign: "left" }}>
						<span> {this.$route.params}</span>
						<span>{this.State_App.currGroup.group_name} </span>
						<span>分组共</span>
						<span> ({this.State_App.project.projectList.length})</span>
						<span>个项目</span>
						{/* {this.isShow ? JSON.stringify(this.State_App.currGroup, null, 2) : ""} */}
					</aCol>
					<aCol span={8} class="flex end flex1">
						{addProjectButton}
					</aCol>
				</aRow>
				{SpaceProject}
			</div>
		);
	}
});
