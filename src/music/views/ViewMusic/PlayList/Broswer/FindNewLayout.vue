<template>
	<FindNewMobile />
</template>
<script lang="tsx">
import { defineComponent, defineAsyncComponent } from "vue";
import { stateApp } from "@/state/app";
import { stateMusic } from "@/state/music";

export default defineComponent({
	components: {
		FindNewMobile: defineAsyncComponent(() => import("./FindNewMobile.vue"))
	},
	setup() {
		return {
			stateApp
		};
	},
	async mounted() {
		stateMusic._toIfy();
	}
});
</script>
