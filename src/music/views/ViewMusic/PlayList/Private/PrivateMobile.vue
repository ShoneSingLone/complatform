<template>
	<div class="flex vertical flex1 PrivateMobile height100 overflow-hidden">
		<xVirScroll :configs="state.configs" class="flex1">
			<template #item="{ item }">
				<PrivateMobileSongItem
					:song="item"
					:loading="currentLoadingSongId === item.id"
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
import PrivateMobileSongItem from "./PrivateMobileSongItem.vue";
import { xU } from "@/ventose/ui";
import { state } from "./PrivateLayout.vue";

export default {
	components: {
		PrivateMobileSongItem
	},
	setup() {
		return {
			stateMusic,
			state
		};
	},
	data() {
		return {
			currentLoadingSongId: ""
		};
	},
	watch: {
		"state.configs.search.value": {
			immediate: true,
			handler(search) {
				this.setItems(search);
			}
		}
	},
	methods: {
		setItems: xU.debounce(function (search) {
			let allItems = this.stateMusic.AllMusicClient;
			if (search) {
				allItems = xU.filter(allItems, record => {
					const isOk = prop => new RegExp(search, "ig").test(record[prop]);
					return isOk("title") || isOk("artist") || isOk("album");
				});
			}
			this.state.configs.items = allItems;
		}, 600),
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

<style lang="less"></style>
