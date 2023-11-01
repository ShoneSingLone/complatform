<template>
	<FindNewMobile v-if="stateApp.useMobileView" />
	<FindNewPc v-else />
</template>
<script lang="jsx">
import { defineComponent, reactive, defineAsyncComponent } from "vue";
import { stateApp } from "@/state/app";
import { Actions_Music } from "@/state/music";
import { xU, defItem } from "@/ventose/ui";

export const state = reactive({
	configs: {
		search: defItem({
			value: "",
			prop: "search",
			placeholder: "标题、歌手、所属专辑",
			allowClear: true
		}),
		items: []
	}
});

export default defineComponent({
	components: {
		FindNewMobile: defineAsyncComponent(() => import("./FindNewMobile.vue")),
		FindNewPc: defineAsyncComponent(() => import("./FindNewPc.vue"))
	},
	setup() {
		return {
			stateApp
		};
	},
	async mounted() {}
});
</script>
@/state/music
