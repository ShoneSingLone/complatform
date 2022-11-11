<script>
/*https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup*/
import { defineComponent } from "vue";
import { _ } from "@ventose/ui";
import { AppFooter } from "./components/Footer/AppFooter";
import Header from "@/components/Header/Header.tsx";
import { Methods_App, State_App } from "@/state/State_App.tsx";

export default defineComponent({
	components: { AppFooter, Header },
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
	<Header v-if="State_App.user.loginState !== 1" />
	<xRouterView v-loading="isLoading" />
	<AppFooter />
</template>

<style lang="less" src="./styles/App.less"></style>
<style lang="scss" src="./containers/Home/Home.scss"></style>
