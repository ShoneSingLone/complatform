<script>
/*https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup*/
import "./style.css";
import { defineComponent } from "vue";
import { xU } from "@ventose/ui";
import { AppFooter } from "./components/Footer/AppFooter";
import { AppHeader } from "./components/Header/AppHeader";
import { State_App } from "@/state/State_App.tsx";

export default defineComponent({
	components: { AppFooter, AppHeader },
	setup() {
		return {
			State_App
		};
	},
	data() {
		return {
			isLoading: true
		};
	},
	async mounted() {
		/* try { } catch (error) {} */
		this.isLoading = false;
	}
});
</script>
<template>
	<AppHeader v-if="State_App.user.isLogin" />
	<xRouterView v-loading="isLoading" />
	<AppFooter />
</template>

<style lang="less" src="./styles/App.less"></style>
<style lang="scss" src="./containers/Home/Home.scss"></style>
