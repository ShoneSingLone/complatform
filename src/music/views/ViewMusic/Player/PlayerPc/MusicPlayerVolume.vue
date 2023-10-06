<template>
	<xButton class="volume flex horizon">
		<xIcon :icon="Cpt_iconSound" @click="Actions_Music.toggleVolumeMute" />
		<xGap l="4" />
		<div class="flex1">
			<elSlider
				id="test"
				v-model="stateMusic.volume"
				:tooltip-visible="isTooltipVisible"
				@change="changeVolume" />
		</div>
	</xButton>
</template>

<script>
import { xU, lStorage } from "@/ventose/ui";
import { Actions_Music, Cpt_iconSound, stateMusic } from "@/state/music";

export default {
	setup() {
		return {
			stateMusic,
			Actions_Music,
			Cpt_iconSound
		};
	},
	data() {
		return {
			isTooltipVisible: false,
			isMute: false
		};
	},
	methods: {
		changeVolume(val) {
			if (!this.isTooltipVisible) {
				this.isTooltipVisible = true;
			}
			this.delayHideIsTooltipVisible();
			Actions_Music.setVolume(val);
		},
		delayHideIsTooltipVisible: xU.debounce(function () {
			this.isTooltipVisible = false;
		}, 1000 * 3)
	}
};
</script>

<style></style>
