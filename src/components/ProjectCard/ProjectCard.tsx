import "./ProjectCard.scss";
import { defineComponent } from "vue";
import { stateApp } from "@/state/app";
import { API } from "@/api";
import ViewCopyProject from "./ViewCopyProject.vue";
import { xU } from "@/ventose/ui";
import { cptRouter } from "@/router/router";
import { aHashLink } from "../../router/router";

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
		return { stateApp, cptRouter };
	},
	methods: {
		showCopyProjectDialog() {
			xU.dialog({
				title: `复制项目${this.projectData.name}`,
				component: ViewCopyProject,
				copyProject: this.copyProject,
				projectName: this.projectData.name
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
			xU.message.success("项目复制成功");
			this.callbackResult();
		},
		add: xU.debounce(async function () {
			try {
				const { projectData } = this;
				const uid = this.stateApp.user.uid;
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
				<div
					class="pointer icon-item-wrapper"
					onClick={this.followIconClickHandler}>
					<ElTooltip content={this.followIconTitle} placement="top-start">
						<xIcon icon={this.followIconIcon} style={{ fill: "#faad14" }} />
					</ElTooltip>
				</div>
			);
		},
		copyIcon() {
			if (this.isShow) {
				return (
					<div
						class="pointer icon-copy icon-item-wrapper"
						onClick={this.showCopyProjectDialog}>
						<ElTooltip content="复制项目" placement="top-start">
							<xIcon icon="copy" style={{ fill: "#232426" }} />
						</ElTooltip>
					</div>
				);
			}
			return null;
		},
		iconStyle() {
			return {
				fill: "white",
				width: "48px",
				height: "48px",
				borderRadius: "var(--baorder-radius,10px)",
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
				<a
					href={aHashLink("/project", {
						project_id: this.projectData._id,
						group_id: this.cptRouter.query.group_id
					})}>
					<xIcon
						class="ui-logo"
						icon={this.projectData.icon}
						style={this.iconStyle}
					/>
				</a>
			);
		},
		title() {
			return (
				<div class="ui-title">
					{/* v-xTips={{ onlyEllipsis: true }} */}
					{/* <span class="mr10">{this.projectData._id}</span> */}
					<span>{this.projectData.name || this.projectData.projectname}</span>
				</div>
			);
		}
	},
	render() {
		return (
			<div class="card-container">
				<div class="project-card-wrapper">
					<div class="el-card is-always-shadow">
						<div class="el-card__body">
							{this.logo}
							{this.title}
						</div>
					</div>
				</div>
				<div class="card-btns flex">
					{this.copyIcon}
					{this.followIcon}
				</div>
			</div>
		);
	}
});
