<template>
	<div class="flex1 FindNewMobile height100 overflow-hidden flex vertical">
		<xVirScroll
			v-model:top="scrollTop"
			v-model:height="wrapperHeight"
			v-model:scrollHeight="scrollHeight"
			class="flex1"
			:configs="stateMusic.configs">
			<template #item="{ item }">
				<BroswerItem :item="item" />
			</template>
		</xVirScroll>
	</div>
</template>

<script>
import { stateMusic } from "@/state/music";
import { API } from "@/music/api";
import { BroswerItem } from "./BroswerItem.tsx";
import { xU } from "@/ventose/ui";
import { preprocessRecord } from "@/music/utils";

export default {
	components: {
		BroswerItem
	},
	setup() {
		return {
			stateMusic
		};
	},
	data() {
		const vm = this;
		return {
			wrapperHeight: 0,
			scrollHeight: 0,
			scrollTop: 0,
			currentLoadingSongId: ""
		};
	},
	methods: {
		setItems: xU.debounce(async function (keywords, offset) {
			if (keywords && offset) {
				if (this.state.songCount <= this.state.configs.items.length) {
					return;
				}
				const index = xU.layer.loading();
				try {
					const { code, result } = await API.music.search({
						keywords,
						limit: 60,
						offset
					});
					if (code === 200) {
						this.state.songCount = result.songCount;
						this.state.configs.items = xU.concat(
							this.state.configs.items,
							preprocessRecord(result?.songs || [])
						);
						++this.state.offset;
						return;
					}
				} catch (error) {
					console.error(error);
				} finally {
					xU.layer.loading(index);
				}
			} else {
				this.state.configs.items = preprocessRecord(
					this.stateMusic.personalizedNewSong
				);
				return;
			}
		}, 1000)
	}
};
</script>
@/state/music
