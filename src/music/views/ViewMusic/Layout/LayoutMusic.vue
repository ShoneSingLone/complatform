<template>
	<LayoutMusicMobile v-if="stateApp.useMobileView" class="music-app" />
	<LayoutMusicPc v-else class="music-app" />
</template>
<script lang="jsx">
import { defineComponent, defineAsyncComponent } from "vue";
import { stateApp } from "@/state/app";

export default defineComponent({
	components: {
		LayoutMusicMobile: defineAsyncComponent(async () => {
			const module = await import("./LayoutMusicMobile");
			return module.default;
		}),
		LayoutMusicPc: defineAsyncComponent(async () => {
			const module = await import("./LayoutMusicPc");
			return module.default;
		})
	},
	setup() {
		return {
			stateApp
		};
	},
	mounted_demo() {
		var audioCtx = new AudioContext();
		var button = this.$refs.button;
		var pre = this.$refs.pre;
		var myScript = this.$refs.script;

		pre.innerHTML = myScript.innerHTML;

		// Stereo
		var channels = 2;
		// Create an empty two-second stereo buffer at the
		// sample rate of the AudioContext
		var frameCount = audioCtx.sampleRate * 2.0;

		var myArrayBuffer = audioCtx.createBuffer(
			2,
			frameCount,
			audioCtx.sampleRate
		);

		button.onclick = function () {
			// Fill the buffer with white noise;
			//just random values between -1.0 and 1.0
			for (var channel = 0; channel < channels; channel++) {
				// This gives us the actual ArrayBuffer that contains the data
				var nowBuffering = myArrayBuffer.getChannelData(channel);
				for (var i = 0; i < frameCount; i++) {
					// Math.random() is in [0; 1.0]
					// audio needs to be in [-1.0; 1.0]
					nowBuffering[i] = Math.random() * 2 - 1;
				}
			}

			// Get an AudioBufferSourceNode.
			// This is the AudioNode to use when we want to play an AudioBuffer
			var source = audioCtx.createBufferSource();
			// set the buffer in the AudioBufferSourceNode
			source.buffer = myArrayBuffer;
			// connect the AudioBufferSourceNode to the
			// destination so we can hear the sound
			source.connect(audioCtx.destination);
			// start the source playing
			source.start();
		};
	}
});
</script>

<style lang="less">
.music-app {
	.title {
		font-weight: 700;
		text-shadow: 1px 1px rgba(7, 6, 100, 0.1);
		margin-right: 4px;
	}
}

#ViewMusic {
	.nav-tab {
		height: 48px !important;
		z-index: 1;

		.menu-icon {
			width: 32px;
			height: 32px;
			border-radius: 4px;
		}
	}

	.top-nav {
		[aria-label="gohome"] {
			// width: 32px;
			margin-left: 4px;
		}
	}

	.play-list-wrapper {
		overflow: auto;
		overflow-x: hidden;
		height: 90%;
	}

	.ant-btn-link.elevation {
		border-radius: 50%;

		span {
			transform: scale(1.2);
		}
	}

	.MobileSongItem {
		div {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			text-align: left;
		}
	}
}

#ViewMusic {
	.site-layout .site-layout-background {
		background: #fff;
	}

	[aria-label="gohome"] {
		display: inline-block;
		width: 16px;
	}

	.ant-layout-sider {
		position: relative;
		min-width: 0;
		background: #ffffff;
		transition: all 0.2s;
	}
}
</style>
