<template>
	<div class="flex ViewMusicPlayer">
		<div class="title flex center" :style="styleAlbum">
			{{ Cpt_currentSong.title }}
		</div>
		<MusicPlayerModel />
		<xGap l="16" />
		<!-- 上一曲，下一曲，播放，暂停 -->
		<MusicPlayerOpration />
		<xGap l="16" />
		<MusicPlayerAudio />
		<xGap l="16" />
		<MusicPlayerVolume />
	</div>
</template>

<script lang="jsx">
import { defineComponent } from "vue";
import MusicPlayerModel from "./MusicPlayerModel.vue";
import MusicPlayerOpration from "./MusicPlayerOpration.vue";
import MusicPlayerAudio from "./MusicPlayerAudio.vue";
import MusicPlayerVolume from "./MusicPlayerVolume.vue";
import { Actions_Music, stateMusic, Cpt_currentSong } from "@/state/music";

export default defineComponent({
	components: {
		MusicPlayerModel,
		MusicPlayerOpration,
		MusicPlayerAudio,
		MusicPlayerVolume
	},
	setup() {
		return {
			Cpt_currentSong,
			stateMusic
		};
	},
	computed: {
		styleAlbum() {
			console.log(this.Cpt_currentSong);
			if (this.Cpt_currentSong.picUrl) {
				return `background:url(${this.Cpt_currentSong.picUrl}) right/contain no-repeat;`;
			} else {
				return {};
			}
		}
	}
});
</script>

<style lang="less">
.ViewMusicPlayer {
	.title {
		margin-right: 10px;
		width: 200px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.site-layout .site-layout-background {
		background: #fff;
	}

	.ant-layout-sider {
		position: relative;
		min-width: 0;
		background: #ffffff;
		transition: all 0.2s;
	}

	.volume {
		width: 120px;
	}
}
</style>
