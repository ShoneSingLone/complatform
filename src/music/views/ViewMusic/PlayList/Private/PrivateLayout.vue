<template>
	<PrivateMobile v-if="stateApp.useMobileView" />
	<PrivatePc v-else />
</template>
<script lang="jsx">
import { defineComponent, defineAsyncComponent, reactive } from "vue";
import { stateApp } from "@/state/app";
import { defItem } from "@/ventose/ui";

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
		PrivateMobile: defineAsyncComponent(() => import("./PrivateMobile.vue")),
		PrivatePc: defineAsyncComponent(() => import("./PrivatePc.vue"))
	},
	setup() {
		return {
			stateApp
		};
	}
});
</script>
