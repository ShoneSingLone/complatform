<template>
	<div
		class="CachedMobileSongItem MobileSongItem elevation-1 flex middle width100"
		:loading="loading">
		<div class="flex vertical start">
			<div class="title">
				{{ song.title }}
			</div>
			<div class="singer">{{ song.artist }}-{{ song.album }}</div>
		</div>
		<span class="flex1 mr20" />
		<span>
			<div class="flex">
				<elButton class="mr10 flex middle" @click="$emit('play')">
					<xIcon icon="playsong" />
				</elButton>
				<elButton class="mr10 flex middle" @click="$emit('del')">
					<xIcon icon="delete" />
				</elButton>
			</div>
		</span>
	</div>
</template>

<script lang="jsx">
export default {
	props: ["song", "loading"],
	emits: ["del", "play"],
	setup() {
		return {};
	},
	data() {
		return {};
	},
	computed: {},
	mounted() {}
};
</script>

<style lang="less">
.CachedMobileSongItem {
	padding: 0 16px;
	line-height: 20px;
	height: 48px;
	border-radius: 4px;

	.title {
		width: 100%;
		text-align: left;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.singer {
		font-size: 12px;
		text-indent: 16px;
	}
}
</style>
