import "./ProjectCard.scss";
import { Card, Tooltip, Modal, Alert, Input, message } from "ant-design-vue";
import constants from "@/utils/variable";
import produce from "immer";
import { defineComponent } from "vue";
import { _ } from "@ventose/ui";
import { State_App } from "@/state/State_App";
import { API } from "@/api";

const confirm = Modal.confirm;

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
		add: _.debounce(async function () {
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
			if (data) {
				this.callbackResult();
			}
		}, 300),
		del: _.debounce(async function () {
			const id = this.projectData.projectid || this.projectData._id;
			const { data } = await API.project.delFollow(id);
			if (data) {
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
							<xIcon icon="copy" />
						</aTooltip>
					</span>
				);
			}
			return null;
		})();

		return (
			<div class="card-container" style={"width:200px;"}>
				<aCard
					hoverable
					class="m-card"
					onClick={() =>
						this.$router.push({
							path: "/project/" + (projectData.projectid || projectData._id)
						})
					}>
					{projectData.icon}
					<xIcon
						icon={"github"}
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
