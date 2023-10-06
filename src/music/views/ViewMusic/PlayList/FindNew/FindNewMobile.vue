<template>
	<div class="flex1 FindNewMobile height100 overflow-hidden flex vertical">
		<xVirScroll
			v-model:top="scrollTop"
			v-model:height="wrapperHeight"
			v-model:scrollHeight="scrollHeight"
			class="flex1"
			:configs="state.configs">
			<template #item="{ item }">
				<FindNewMobileSongItem
					:song="item"
					:loading="currentLoadingSongId === item.id"
					:is-show-img="stateMusic.songId === item.id"
					@click="playSong(item)" />
			</template>
		</xVirScroll>
		<div class="search-wrapper padding10">
			<xItem :configs="state.configs.search" />
		</div>
	</div>
</template>

<script>
import { Actions_Music, stateMusic } from "@/state/music";
import { API } from "@/music/api";
import FindNewMobileSongItem from "./FindNewMobileSongItem.vue";
import { xU } from "@/ventose/ui";
import { state } from "./FindNewLayout.vue";
import { preprocessRecord } from "@/music/utils";

export default {
	components: {
		FindNewMobileSongItem
	},
	setup() {
		return {
			stateMusic,
			state
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
	watch: {
		"stateMusic.personalizedNewSong": {
			immediate: true,
			handler() {
				this.setItems();
			}
		},
		"state.configs.search.value": {
			immediate: true,
			handler(search) {
				this.state.configs.items = [];
				this.state.offset = 1;
				this.state.songCount = 999;
				this.scrollTop = 0;
				this.setItems(search, this.state.offset);
			}
		}
	},
	mounted() {
		this.$watch(
			() => {
				return `scrollHeight${this.scrollHeight}_scrollTop${this.scrollTop}`;
			},
			() => {
				const search = this.state.configs.search.value;
				if (search && this.scrollHeight - this.scrollTop < this.wrapperHeight) {
					this.setItems(search, this.state.offset);
				}
			}
		);
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
		}, 1000),
		async playSong(record) {
			this.currentLoadingSongId = record.id;
			try {
				Actions_Music.pushSongToPlaylist(this.state.configs.items, () =>
					Actions_Music.playSongById(record.id)
				);
			} catch (error) {
				console.error(error);
			} finally {
				this.currentLoadingSongId = false;
			}
		}
	}
};
</script>
@/state/music
