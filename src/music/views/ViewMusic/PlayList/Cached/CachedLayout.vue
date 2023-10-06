<template>
	<CachedMobile v-if="stateApp.useMobileView" />
	<CachedPc v-else />
</template>
<script lang="jsx">
import { defineComponent, defineAsyncComponent, reactive } from "vue";
import { stateApp } from "@/state/app";
import { Actions_Music } from "@/state/music";
import { defItem, xU } from "@/ventose/ui";

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

export const btnClear = {
	text: "移除所有",
	async onClick() {
		await Actions_Music.delCached(
			xU.map(state.configs.items, i => `audio_${i.id}`)
		);
	}
};

export default defineComponent({
	components: {
		CachedMobile: defineAsyncComponent(() => import("./CachedMobile.vue")),
		CachedPc: defineAsyncComponent(() => import("./CachedPc.vue"))
	},
	setup() {
		return {
			stateApp
		};
	}
});
</script>
@/state/music
