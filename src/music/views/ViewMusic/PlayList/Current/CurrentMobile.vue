<template>
	<div class="flex1 height100 overflow-hidden flex vertical">
		<xVirScroll :configs="state.configs" class="CurrentMobileScroll flex1">
			<template #item="{ item }">
				<CurrentMobileSongItem :song="item" />
			</template>
		</xVirScroll>
		<div class="search-wrapper padding10 flex elevation-2">
			<xItem :configs="state.configs.search" class="flex1 mr10" />
			<xButton :configs="btnClear" />
		</div>
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
			state,
			btnClear,

			stateMusic
		};
	},
	data() {
		return {
			currentLoadingSongId: ""
		};
	},
	watch: {},
	mounted() {},
	methods: {}
};
</script>

<style lang="less"></style>
