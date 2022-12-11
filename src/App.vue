<script>
/*https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup*/
import "./style.css";
import { defineComponent } from "vue";
import { xU } from "@ventose/ui";
import { AppFooter } from "./components/Footer/AppFooter";
import { AppHeader } from "./components/Header/AppHeader";
import { Cpt_url } from "./router/router";
import { Methods_App, State_App } from "./state/State_App";
import { Methods_Interface } from "./containers/Project/Interface/State_Project";

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
	async mounted() {
		try {
			if (this.Cpt_url.query.group_id) {
				await Methods_App.setCurrGroup(this.Cpt_url.query.group_id);
				await Methods_App.fetchProjectList(this.Cpt_url.query.group_id);
				await Methods_App.fetchGroupList();
				if (this.Cpt_url.query.project_id) {
					await Methods_Interface.updateInterfaceMenuList();
					debugger;
				}
			}
		} catch (error) {
			console.error(error);
		} finally {
			this.isLoading = false;
		}
	}
});
</script>
<template>
	<AppHeader v-if="State_App.user.isLogin" />
	<div v-if="isLoading" v-loading="isLoading" />
	<RouterView v-else />
	<AppFooter />
</template>

<style lang="less" src="./styles/App.less"></style>
<style lang="scss" src="./containers/Home/Home.scss"></style>
