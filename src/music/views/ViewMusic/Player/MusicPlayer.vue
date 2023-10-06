<template>
	<PlayerMobile v-if="stateApp.useMobileView" id="MusicPlayerWrapper" />
	<PlayerPc v-else id="MusicPlayerWrapper" />
</template>
<script lang="jsx">
import { defineComponent, defineAsyncComponent } from "vue";
import { stateApp } from "@/state/app";

export default defineComponent({
	components: {
		PlayerMobile: defineAsyncComponent(() =>
			import("./PlayerMobile/PlayerMobile.vue")
		),
		PlayerPc: defineAsyncComponent(() => import("./PlayerPc/PlayerPc.vue"))
	},
	setup() {
		return {
			stateApp
		};
	}
});
</script>

<style lang="less">
#MusicPlayerWrapper {
	width: 100%;

	.ant-slider-handle,
	.ant-slider-track {
		// transition: all 1s ease-in-out;
	}
}
</style>
