<script>
/*https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup*/
import "./style.css";
import { defineComponent } from "vue";
import { AppFooter } from "./components/Footer/AppFooter";
import { AppHeader } from "./components/Header/AppHeader";
import { Cpt_url } from "./router/router";
import { Methods_App, State_App } from "./state/State_App";
import { Methods_ProjectInterface } from "@/containers/Project/Interface/State_ProjectInterface";

export default defineComponent({
	components: { AppFooter, AppHeader },
	setup() {
		return {
			Cpt_url,
			State_App
		};
	},
	data() {
		return {
			isLoading: true
		};
	},
	mounted() {
		this.onAfterRefresh();
	},
	methods: {
		async onAfterRefresh() {
			/* 刷新之后重新获取基础信息 */
			try {
				await Methods_App.checkLoginState();
				await Methods_App.fetchGroupList();
				if (this.Cpt_url.query.group_id) {
					await Methods_App.setCurrGroup(this.Cpt_url.query.group_id);
					await Methods_App.fetchProjectList(this.Cpt_url.query.group_id);
					if (this.Cpt_url.query.project_id) {
						await Methods_App.setCurrProject(this.Cpt_url.query.project_id);
						await Methods_ProjectInterface.updateInterfaceMenuList();
					}
				}
			} catch (error) {
				console.error(error);
			} finally {
				this.isLoading = false;
			}
		}
	}
});
</script>
<template>
	<AppHeader v-if="State_App.user.isLogin" />
	<aSpin v-if="isLoading" :spinning="true" class="flex1 flex middle center" />
	<RouterView v-else />
	<AppFooter />
</template>

<style lang="less" src="./styles/App.less"></style>
<style lang="scss" src="./containers/Home/Home.scss"></style>
