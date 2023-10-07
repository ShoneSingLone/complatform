<template>
	<div class="flex1 flex middle" id="MusicPlayerAudio">
		<span>{{ formatDuring(stateMusic.currentTime) }}</span>
		<xGap l />
		<elSlider
			class="flex1"
			:min="0"
			:max="stateMusic.duration"
			v-model="stateMusic.currentTime"
			:format-tooltip="formatDuring"
			@change="changSongProgress" />
		<xGap l />
		<span>{{ formatDuring(stateMusic.duration) }}</span>
	</div>
</template>

<script>
import { Actions_Music, stateMusic } from "@/state/music";
import { formatDuring } from "@/music/utils";

export default {
	setup() {
		return {
			stateMusic,
			formatDuring
		};
	},
	methods: {
		changSongProgress(val) {
			Actions_Music.setCurrentTime(val);
		}
	}
};
</script>

<style lang="less">
#MusicPlayerAudio {
}
</style>
