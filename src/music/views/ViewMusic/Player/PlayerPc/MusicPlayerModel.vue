<template>
	<xButton
		:configs="{ text: '播放方式', onClick: Actions_Music.togglePlayModel }">
		<xIcon :icon="Cpt_iconPlayModel" />
	</xButton>
</template>

<script>
import { Actions_Music, stateMusic, Cpt_iconPlayModel } from "@/state/music";

export default {
	setup() {
		return {
			stateMusic,
			Actions_Music,
			Cpt_iconPlayModel
		};
	}
};
</script>

<style lang="less">
#MusicPlayerModel {
}
</style>
