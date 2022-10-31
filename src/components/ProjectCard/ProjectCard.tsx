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
				const { data } = await API.project.addFollow(param);
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
		isFollowStatus() {
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
		}
	},
	render() {
		const projectData = this.projectData;
		const isShow = this.isShow;
		/* 处于follow页面全是已follow的 */
		const followIcon = (
			<span class="pointer" onClick={this.followIconClickHandler}>
				<aTooltip placement="rightTop" title={this.followIconTitle}>
					<xIcon icon={this.followIconIcon} style={{ color: "#faad14" }} />
				</aTooltip>
			</span>
		);

		const copyIcon = (() => {
			if (isShow) {
				return (
					<span class="pointer" onClick={this.showConfirm}>
						<aTooltip placement="rightTop" title="复制项目">
							<xIcon icon="copy" style={{ color: "#eceef1" }} />
						</aTooltip>
					</span>
				);
			}
			return null;
		})();

		return (
			<div class="card-container" style={"width:200px;"}>
				<aCard hoverable class="m-card" onClick={this.goToProject}>
					<xIcon
						icon={projectData.icon}
						class="ui-logo"
						style={{
							color: "white",
							backgroundColor:
								constants.PROJECT_COLOR[projectData.color] ||
								constants.PROJECT_COLOR.blue
						}}
					/>
					<h4 class="ui-title">
						{projectData.name || projectData.projectname}
					</h4>
				</aCard>
				<div class="card-btns flex">
					{copyIcon}
					<xGap l="10" />
					{followIcon}
				</div>
			</div>
		);
	}
});
