import "./ProjectCard.scss";
import { defineComponent } from "vue";
import { State_App, Methods_App } from "@/state/State_App";
import { API } from "@/api";
import ViewCopyProject from "./ViewCopyProject.vue";
import { xU, UI, AllWasWell, pickValueFrom, validateForm } from "@ventose/ui";
import { Cpt_url } from "../../router/router";

export default defineComponent({
	props: [
		"projectData",
		"uid",
		"inFollowPage",
		"callbackResult",
		"isShow",
		"getProject",
		"checkProjectName",
		"currPage"
	],
	setup() {
		return { State_App, Cpt_url };
	},
	methods: {
		showCopyProjectDialog() {
			UI.dialog.component({
				title: `复制项目${this.projectData.name}`,
				component: ViewCopyProject,
				copyProject: this.copyProject,
				projectName: this.projectData.name,
			});
		},
		async copyProject({ newProjectName, icon }) {
			const id = this.projectData._id;
			let { data } = await API.project.getProjectById(id);
			data = xU.merge(
				data,
				{ icon },
				{ name: newProjectName },
				{ preName: data.name }
			);
			await API.project.copyProjectMsg(data);
			UI.message.success("项目复制成功");
			this.callbackResult();
		},
		async goToProject() {
			this.Cpt_url.go("/project/interface/all", {
				project_id: this.projectData._id,
				group_id: this.Cpt_url.query.group_id
			});
		},
		add: xU.debounce(async function () {
			try {
				const { projectData } = this;
				const uid = this.State_App.user.uid;
				const param = {
					uid,
					projectid: projectData._id,
					projectname: projectData.name,
					icon: projectData.icon,
					color: projectData.color
				};
				await API.project.addFollow(param);
			} catch (error) {
				console.error(error);
			} finally {
				this.callbackResult();
			}
		}, 300),
		del: xU.debounce(async function () {
			try {
				const id = this.projectData.projectid || this.projectData._id;
				await API.project.delFollow(id);
			} catch (error) {
				console.error(error);
			} finally {
				this.callbackResult();
			}
		}, 300)
	},
	computed: {
		followIcon() {
			return (
				<span class="pointer" onClick={this.followIconClickHandler}>
					<aTooltip placement="rightTop" title={this.followIconTitle}>
						<xIcon icon={this.followIconIcon} style={{ color: "#faad14" }} />
					</aTooltip>
				</span>
			);
		},
		copyIcon() {
			if (this.isShow) {
				return (
					<span class="pointer icon-copy" onClick={this.showCopyProjectDialog}>
						<aTooltip placement="rightTop" title="复制项目">
							<xIcon icon="copy" style={{ color: "#232426" }} />
						</aTooltip>
					</span>
				);
			}
			return null;
		},
		iconStyle() {
			return {
				color: "white",
				width: "84px",
				height: "84px",
				borderRadius: "16px",
				backgroundColor: this.projectData.color
			};
		},
		isFollowStatus() {
			/* 处于follow页面全是已follow的 */
			return Boolean(this.projectData.follow || this.inFollowPage);
		},
		followIconTitle() {
			return this.isFollowStatus ? "取消关注" : "添加关注";
		},
		followIconIcon() {
			return this.isFollowStatus ? "follow" : "unfollow";
		},
		followIconClickHandler() {
			return this.isFollowStatus ? this.del : this.add;
		},
		logo() {
			return (
				<xIcon
					class="ui-logo"
					icon={this.projectData.icon}
					style={this.iconStyle}
					onClick={this.goToProject}
				/>
			);
		},
		title() {
			return (
				<h4 class="ui-title">
					<span class="mr10">{this.projectData._id}</span>
					<span>{this.projectData.name || this.projectData.projectname}</span>
				</h4>
			);
		}
	},
	render() {
		return (
			<div class="card-container" style={"width:200px;"}>
				<aCard hoverable class="m-card">
					{this.logo}
					{this.title}
				</aCard>
				<div class="card-btns flex">
					{this.copyIcon}
					<xGap l="10" />
					{this.followIcon}
				</div>
			</div>
		);
	}
});
