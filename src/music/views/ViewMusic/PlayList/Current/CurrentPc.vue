<template>
	<div class="flex vertical flex1 height100 overflow-hidden">
		<div class="search-wrapper padding10 flex width100">
			<xItem :configs="state.configs.search" class="flex1 mr10" />
			<xButton :configs="btnClear" style="margin-right: -10px" />
		</div>
		<xGap t="16" />
		<xVirScroll :configs="state.configs" class="flex1">
			<template #item="{ item }">
				<CurrentMobileSongItem
					:song="item"
					:loading="currentLoadingSongId === item.id" />
			</template>
		</xVirScroll>
	</div>
</template>

<script>
import { stateMusic } from "@/state/music";
import CurrentMobileSongItem from "./CurrentMobileSongItem.vue";
import { xU } from "@/ventose/ui";
import { state, btnClear } from "./CurrentLayout.vue";

export default {
	components: {
		CurrentMobileSongItem
	},
	setup() {
		return {
			stateMusic,
			state,
			btnClear
		};
	},
	data() {
		return {
			currentLoadingSongId: ""
		};
	},
	methods: {}
};
</script>

<style lang="less"></style>
