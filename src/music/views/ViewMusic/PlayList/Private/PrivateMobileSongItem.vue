<template>
	<div
		class="PrivateMobileSongItem MobileSongItem flex vertical width100"
		:loading="loading">
		<div class="title">
			{{ song.title }}
		</div>
		<div class="singer">
			{{ song.index }}-{{ song.artist }}-{{ song.album }}
		</div>
	</div>
</template>

<script lang="jsx">
export default {
	props: ["song", "loading"],
	setup() {
		return {};
	},
	data() {
		return {};
	},
	computed: {
		asdf() {
			return this.song;
		}
	},
	mounted() {}
};
</script>

<style lang="less">
.PrivateMobileSongItem {
	line-height: 20px;
	height: 48px;
	padding: 8px 16px;
	box-shadow: var(--el-box-shadow-light);

	> .title {
		width: 100%;
		text-align: left;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	> .singer {
		font-size: 12px;
		text-indent: 16px;
	}
}
</style>
