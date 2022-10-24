<script lang="jsx">
import GroupList from "./GroupList/GroupList";
import ProjectList from "./ProjectList/ProjectList";
import MemberList from "./MemberList/MemberList";
/*
import GroupLog from "./GroupLog/GroupLog";
import GroupSetting from "./GroupSetting/GroupSetting.vue"; */
import "./Group.scss";
import { API } from "@/api";
import { defineComponent } from "vue";
import { Methods_App, State_App } from "@/state/State_App";

export default defineComponent({
	setup() {
		return {
			State_App
		};
	},
	data() {
		const groupId = this.$route.params.groupId || false;
		return {
			state: {
				groupId
			}
		};
	},
	mounted() {
		this.ifUrlNoGroupIdGetAndAddIdToUrl();
	},
	methods: {
		async ifUrlNoGroupIdGetAndAddIdToUrl() {
			try {
				let jump = () => null;
				if (!this.state.groupId) {
					let { data: group } = await API.group.getMyGroup();
					this.state.groupId = group._id;
					jump = () =>
						this.$router.push({ path: `/group/${this.state.groupId}` });
				}
				await Methods_App.setCurrGroup(this.state.groupId);
				jump();
			} catch (e) {
				console.error(e);
				this.state.groupId = false;
				this.ifUrlNoGroupIdGetAndAddIdToUrl();
			}
		}
	},
	render() {
		if (!this.state.groupId) {
			return <aSpin class="flex vertical middle center height100" />;
		}

		const ProjectTab = null; /*<aTabPane tab="项目列表" key="1">
      <ProjectList/>
    </aTabPane>;*/

		const MenberTab = (() => {
			if (this.State_App.currGroup.type === "public") {
				return (
					<aTabPane tab="成员列表" key="2">
						<MemberList />
					</aTabPane>
				);
			} else {
				return null;
			}
		})();

		return (
			<aLayout
				style={{
					marginLeft: "24px",
					marginTop: "24px"
				}}>
				<aLayoutSider width={300} class="flex vertical height100">
					<div class="logo">Logo</div>
					<GroupList />
				</aLayoutSider>
				<aLayout>
					<aLayoutContent
						style={{
							height: "100%",
							margin: "0 24px 0 16px",
							overflow: "initial",
							backgroundColor: "#fff"
						}}>
						<aTabs type="card" class="m-tab tabs-large height100">
							{ProjectTab}
							{MenberTab}
						</aTabs>
					</aLayoutContent>
				</aLayout>
			</aLayout>
		);
		return (
			<aLayout
				style={{
					minHeight: "calc(100vh - 100px)",
					marginLeft: "24px",
					marginTop: "24px"
				}}>
				<aLayout>
					<aContent
						style={{
							height: "100%",
							margin: "0 24px 0 16px",
							overflow: "initial",
							backgroundColor: "#fff"
						}}>
						<aTabs
							type="card"
							className="m-tab tabs-large"
							style={{ height: "100%" }}>
							<aTabPane tab="项目列表" key="1">
								<ProjectList />
							</aTabPane>
							{["admin", "owner", "guest", "dev"].indexOf(
								this.props.curUserRoleInGroup
							) > -1 || this.props.curUserRole === "admin" ? (
								<aTabPane tab="分组动态" key="3">
									<GroupLog />
								</aTabPane>
							) : (
								""
							)}
							{(this.props.curUserRole === "admin" ||
								this.props.curUserRoleInGroup === "owner") &&
							this.State_App.currGroup.type !== "private" ? (
								<aTabPane tab="分组设置" key="4">
									<GroupSetting />
								</aTabPane>
							) : null}
						</aTabs>
					</aContent>
				</aLayout>
			</aLayout>
		);
	}
});
</script>

<style></style>
