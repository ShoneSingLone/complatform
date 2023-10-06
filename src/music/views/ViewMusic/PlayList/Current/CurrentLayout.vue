<template>
	<CurrentMobile v-if="stateApp.useMobileView" />
	<CurrentPc v-else />
</template>
<script lang="jsx">
import { defineComponent, defineAsyncComponent, reactive, watch } from "vue";
import { stateApp } from "@/state/app";
import { Actions_Music, stateMusic } from "@/state/music";
import { defItem, xU } from "@/ventose/ui";
import { preprocessRecord } from "@/music/utils";

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

export const setItems = xU.debounce(function (search) {
	let allItems = stateMusic.playlist;
	if (search) {
		allItems = xU.filter(allItems, record => {
			const isOk = prop => new RegExp(search, "ig").test(record[prop]);
			return isOk("title") || isOk("artist") || isOk("album");
		});
	}
	state.configs.items = allItems;
}, 600);

/* 播放列表长度变化 */
watch(
	() => stateMusic.playlist.length,
	() => {
		setItems(state.configs.search.value);
	},
	{ immediate: true }
);
/*  */
watch(() => state.configs.search.value, setItems, { immediate: true });

export const btnClear = {
	text: "移除所有",
	async onClick() {
		if (state.configs.search.value) {
			xU.each(state.configs.items, Actions_Music.removeSongFromPlaylist);
		} else {
			Actions_Music.clearPlaylist();
		}
	}
};

export default defineComponent({
	components: {
		CurrentMobile: defineAsyncComponent(() => import("./CurrentMobile.vue")),
		CurrentPc: defineAsyncComponent(() => import("./CurrentPc.vue"))
	},
	setup() {
		return {
			stateApp
		};
	}
});
</script>
@/state/music
