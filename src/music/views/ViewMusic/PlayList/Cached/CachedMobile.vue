<template>
	<div class="flex vertical flex1 PrivateMobile height100 overflow-hidden">
		<xVirScroll :configs="state.configs" class="flex1">
			<template #item="{ item }">
				<CachedMobileSongItem
					:song="item"
					:loading="currentLoadingSongId === item.id"
					@play="playSong(item)"
					@del="removeSong(item)" />
			</template>
		</xVirScroll>
		<div class="search-wrapper padding10 flex">
			<xItem :configs="state.configs.search" class="flex1 mr10" />
			<xButton :configs="btnClear" />
		</div>
	</div>
</template>

<script>
import { Actions_Music, stateMusic } from "@/state/music";
import CachedMobileSongItem from "./CachedMobileSongItem.vue";
import { getMany, keys, del } from "idb-keyval";
import { preprocessRecord } from "@/music/utils";
import { xU } from "@/ventose/ui";
import { state, btnClear } from "./CachedLayout.vue";

export default {
	components: {
		CachedMobileSongItem
	},
	setup() {
		return {
			stateMusic,
			state,
			btnClear
		};
	},
	data() {
		const vm = this;
		return {
			currentLoadingSongId: "",
			configs: {
				items: []
			}
		};
	},
	watch: {
		async "stateMusic.cacheAudioCount"() {
			await this.setItems();
		},
		"state.configs.search.value": {
			immediate: true,
			handler(search) {
				this.setItems(search);
			}
		}
	},
	async mounted() {
		await this.setItems();
	},
	methods: {
		setItems: xU.debounce(async function (search) {
			let props = await keys();
			props = props.filter(name => /^audio_/.test(name));
			let allItems = xU.map(await getMany(props), i =>
				preprocessRecord(i.records)
			);

			if (search) {
				allItems = xU.filter(allItems, record => {
					const isOk = prop => new RegExp(search, "ig").test(record[prop]);
					return isOk("title") || isOk("artist") || isOk("album");
				});
			}
			this.state.configs.items = allItems;
		}, 1000),
		async removeSong(record) {
			await del(`audio_${record.id}`);
			await this.setItems();
		},
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
