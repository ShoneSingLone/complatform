<template>
	<span
		ref="item"
		class="CurrentMobileSongItem MobileSongItem elevation-1 flex flex1 horizon middle pointer elevation"
		:loading="loading"
		:data-index="song.index"
		@click="playSong">
		<div>
			<span class="title">
				{{ song.title }}
			</span>
			<span class="singer"> {{ song.artist }}-{{ song.album }} </span>
		</div>
	</span>
	<div
		:data-song-index="song.index"
		:style="styleDelete"
		class="elevation-1 CurrentMobileSongItem_delete-icon flex vertical middle center"
		@click="removeSongFromPlaylist">
		<xIcon icon="delete" />
	</div>
</template>

<script lang="jsx">
import { Actions_Music } from "@/state/music";
import { $ } from "@/ventose/ui";
const WIDTH = 64;
export default {
	props: ["song"],
	setup() {
		return {};
	},
	data() {
		return {
			width: 0,
			isMove: false,
			loading: false,
			isShowDeleteIcon: false
		};
	},
	computed: {
		styleDelete() {
			return { width: `${this.width}px` };
		}
	},
	mounted() {
		$(this.$refs.item)
			.on("mousedown", this.handleMousedown)
			.on("mousemove", this.handleMousemove)
			.on("mouseup", this.handleMouseup)
			.on("mouseleave", this.handleMouseup)
			.on("touchstart", this.handleMousedown)
			.on("touchmove", this.handleMousemove)
			.on("touchend", this.handleMouseup);
	},
	beforeUnmount() {
		$(this.$refs.item)
			.off("mousedown", this.handleMousedown)
			.off("mousemove", this.handleMousemove)
			.off("mouseup", this.handleMouseup)
			.off("mouseleave", this.handleMouseup)
			.off("touchstart", this.handleMousedown)
			.off("touchmove", this.handleMousemove)
			.off("touchend", this.handleMouseup);
	},
	methods: {
		handleMousedown(e) {
			if (e.changedTouches) {
				e = e.changedTouches[0];
			}
			if (!this.isMove) {
				this.isMove = true;
				this.moveStart = e.clientX;
			}
		},
		handleMousemove(e) {
			if (e.changedTouches) {
				e = e.changedTouches[0];
			}
			if (this.isMove) {
				const distance = this.moveStart - e.clientX;
				if (distance < 0) {
					if (this.width + distance > 0) {
						this.width = this.width + distance;
					}
				} else {
					this.width = distance;
				}
				return;
			}
		},
		handleMouseup(e) {
			if (this.isMove) {
				this.isMove = false;
				if (this.width < 44) {
					this.width = 0;
				} else {
					this.width = WIDTH;
				}
			}
		},
		async removeSongFromPlaylist() {
			Actions_Music.removeSongFromPlaylist(this.song);
		},
		async playSong() {
			const record = this.song;
			this.loading = true;
			try {
				await Actions_Music.playSongById(record.id);
			} catch (error) {
				console.error(error);
			} finally {
				this.loading = false;
			}
		}
	}
};
</script>

<style lang="less">
.CurrentMobileSongItem {
	line-height: 20px;
	height: 48px;
	border-top-right-radius: 16px;
	border-bottom-right-radius: 16px;
	z-index: 1;
	width: 1px;
	background: white;
	padding-right: 16px;
	padding-left: 16px;

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

.CurrentMobileSongItem_delete-icon {
	width: 0;
	line-height: 20px;
	height: 48px;
	transform: translateX(-10px);
	z-index: 0;
	border-top-right-radius: 4px;
	border-bottom-right-radius: 4px;
	background-color: #e9f7ff;
}
</style>
