import "./ProjectCard.scss";
import constants from "@/utils/variable";
import { defineComponent } from "vue";
import { _ } from "@ventose/ui";
import { State_App } from "@/state/State_App";
import { API } from "@/api";

export default defineComponent({
	props: [
		"projectData",
		"uid",
		"inFollowPage",
		"callbackResult",
		"isShow",
		"getProject",
		"checkProjectName",
		"copyProjectMsg",
		"currPage"
	],
	setup() {
		return { State_App };
	},
	methods: {
		goToProject() {
			this.$router.push({
				path: "/project/" + (this.projectData.projectid || this.projectData._id)
			});
		},
		add: _.debounce(async function () {
			try {
				const { projectData } = this;
				const uid = this.State_App.user.uid;
				const param = {
					uid,
					projectid: projectData._id,
					projectname: projectData.name,
					icon: projectData.icon || constants.PROJECT_ICON[0],
					color: projectData.color || constants.PROJECT_COLOR.blue
				};
				await API.project.addFollow(param);
			} catch (error) {
				console.error(error);
			} finally {
				this.callbackResult();
			}
		}, 300),
		del: _.debounce(async function () {
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
					<span class="pointer" onClick={this.showConfirm}>
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
				borderRadius: "16px",
				backgroundColor:
					constants.PROJECT_COLOR[this.projectData.color] ||
					constants.PROJECT_COLOR.blue
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
				/>
			);
		},
		title() {
			return (
				<h4 class="ui-title">
					{this.projectData.name || this.projectData.projectname}
				</h4>
			);
		}
	},
	render() {
		return (
			<div class="card-container" style={"width:200px;"}>
				<aCard hoverable class="m-card" onClick={this.goToProject}>
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
