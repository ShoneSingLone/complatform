<template>
	<div class="flex center ViewMusicPlayerMobile">
		<div class="audio">
			<MusicPlayerAudio />
			<div class="flex center title">
				{{ Cpt_currentSong.title }}
			</div>
		</div>

		<div class="flex MusicPlayerOpration">
			<MusicPlayerModel />
			<xGap l="16" />
			<MusicPlayerOpration />
		</div>
	</div>
</template>

<script lang="jsx">
import { defineComponent } from "vue";
import MusicPlayerModel from "./MusicPlayerModel.vue";
import MusicPlayerOpration from "./MusicPlayerOpration.vue";
import MusicPlayerAudio from "./MusicPlayerAudio.vue";
import { Actions_Music, stateMusic, Cpt_currentSong } from "@/state/music";
import { xU } from "@/ventose/ui";

export default defineComponent({
	components: {
		MusicPlayerModel,
		MusicPlayerOpration,
		MusicPlayerAudio
	},
	setup() {
		Actions_Music.setVolume(100);
		console.log(
			"🚀 ~ file: PlayerMobile.vue ~ line 38 ~ setup ~ Cpt_currentSong",
			Cpt_currentSong
		);
		return {
			Cpt_currentSong,
			stateMusic
		};
	}
});
</script>

<style lang="less">
.ViewMusicPlayerMobile {
	width: 100%;
	position: relative;
	height: 120px;

	.audio {
		position: absolute;
		top: 0;
		left: 16px;
		right: 16px;
		z-index: 1;
	}

	.MusicPlayerOpration {
		margin: 64px;
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
