import ProjectCard from "ysrc/components/ProjectCard/ProjectCard";
import ViewAddProject from "ysrc/containers/AddProject/ViewAddProject";
import { ErrMsg } from "ysrc/components/ErrMsg/ErrMsg";

import "./ProjectList.scss";
import { defineComponent } from "vue";
import { Methods_App, State_App } from "ysrc/state/State_App";
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
		"currGroup",
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
			return /(admin)|(owner)|(dev)/.test(this.State_App.user.role);
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
					<aRow
						style={{ borderBottom: "1px solid #eee", marginBottom: "15px" }}>
						<h3 class="owner-type">我的关注</h3>
						{_.map(followProject, (item, index) => {
							return (
								<aCol xs={8} lg={6} xxl={4} key={index}>
									<ProjectCard
										projectData={item}
										callbackResult={this.updateProjectList}
									/>
								</aCol>
							);
						})}
					</aRow>
				);
			}
			return null;
		};
		const NoFollow = () => {
			if (noFollow.length) {
				return (
					<aRow
						style={{ borderBottom: "1px solid #eee", marginBottom: "15px" }}>
						<h3 class="owner-type">我的项目</h3>
						{_.map(noFollow, (item, index) => {
							return (
								<aCol xs={8} lg={6} xxl={4} key={index}>
									<ProjectCard
										projectData={item}
										callbackResult={this.updateProjectList}
										isShow={this.isShow}
									/>
								</aCol>
							);
						})}
					</aRow>
				);
			}

			return null;
		};

		const OwnerSpace = () => {
			return projectData.length ? (
				<div>
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

		return (
			<div
				v-loading={this.isLoading}
				style={{ paddingTop: "24px" }}
				class="m-panel card-panel card-panel-s project-list">
				<aRow class="project-list-header">
					<aCol span={16} style={{ textAlign: "left" }}>
						<span> {this.$route.params}</span>
						<span>{this.State_App.currGroup.group_name} </span>
						<span>分组共</span>
						<span> ({this.State_App.project.projectList.length})</span>
						<span>个项目</span>
						{/* {this.isShow ? JSON.stringify(this.State_App.currGroup, null, 2) : ""} */}
					</aCol>
					<aCol span={8} class="flex end">
						{addProjectButton}
					</aCol>
				</aRow>
				<aRow>
					{this.State_App.currGroup.type === "private" ? (
						<OwnerSpace />
					) : projectData.length ? (
						projectData.map((item, index) => {
							return (
								<aCol xs={8} lg={6} xxl={4} key={index}>
									<ProjectCard
										projectData={item}
										callbackResult={this.updateProjectList}
										isShow={this.isShow}
									/>
								</aCol>
							);
						})
					) : (
						<div class="flex center width100">
							<ErrMsg type="noProject" />
						</div>
					)}
				</aRow>
			</div>
		);
	}
});
