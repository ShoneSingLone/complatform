import { API } from "@/music/api";
import { reactive, watch, computed, onMounted } from "vue";
import { xU, lStorage, setDocumentTitle } from "@/ventose/ui";
import { get, set, delMany } from "idb-keyval";
import qs from "qs";
import { stateApp } from "@/state/app";
import axios from "axios";
import { preprocessRecord } from "@/music/utils";

export const stateMusic = reactive({
	/* 每缓存成功一次音频，数值自增，作为可观察数据，响应式更新缓存数据列表 */
	cacheAudioCount: 0,
	AllMusicClient: [],
	tabItems: [
		{ key: "playlist", label: "当前播放列表", icon: "playlist" },
		{ key: "new", label: "发现音乐", icon: "privateNet" },
		// { key: "singer", label: "歌手", icon: "music" },
		{ key: "private", label: "私藏", icon: "user" },
		{ key: "cached", label: "已缓存", icon: "cached" }
	],
	songId: 0,
	personalizedNewSong: [],
	audio: new Audio(),
	loopType: 0, //循环模式 0 单曲循环 1 列表循环 2随机播放
	volume: (() => {
		const volume = lStorage["PLAYER-VOLUME"];
		if (volume) {
			return volume * 100;
		} else {
			return 20;
		}
	})(),
	playlist: [], //播放列表,
	playlistIdSet: new Set([]),
	showPlayList: false,
	id: 0,
	url: "",
	song: {},
	isPlaying: false, //是否播放中
	isPause: false, //是否暂停
	sliderInput: false, //是否正在拖动进度条
	ended: false, //是否播放结束
	muted: false, //是否静音
	currentTime: 0, //当前播放时间
	duration: 0 //总播放时长
});

const stateMusic_PLAYLIST = "stateMusic_PLAYLIST";

(async function recoverPlaylist() {
	let playlist = await get(stateMusic_PLAYLIST);
	playlist = playlist || [];
	Actions_Music.setPlaylist(playlist);
	stateMusic.AllMusicClient = await get("AllMusicClient");
	try {
		stateMusic.AllMusicClient = await API.music.loadAllMusicClient();
		await set(
			"AllMusicClient",
			JSON.parse(JSON.stringify(stateMusic.AllMusicClient))
		);
	} catch (error) {
		console.error(error);
	}
})();

let intervalTimer: NodeJS.Timer;

/* typescript 属性名称与数组保持一致 */
const LOOP_TYPE_NAME_ARRAY = [
	"playOrder",
	"playRandom",
	"playLoop",
	"playSingleLoop"
] as const;

type type_PlayMethods = {
	[prop in (typeof LOOP_TYPE_NAME_ARRAY)[number]]: Function;
};

const playMethods: type_PlayMethods = {
	playLoop(currentSongIndex) {
		const next = currentSongIndex + 1;
		if (next > stateMusic.playlist.length - 1) {
			Actions_Music.playSongById(stateMusic.playlist[0]?.id);
		} else {
			Actions_Music.playSongById(stateMusic.playlist[next]?.id);
		}
	},
	playRandom(currentSongIndex) {
		let next: number;
		/* 如果只有一首，循环一首 */
		if (stateMusic.playlist.length === 1) {
			next = 0;
			Actions_Music.playSongById(stateMusic.playlist[0]?.id);
			return;
		}
		const max = stateMusic.playlist.length - 1;
		const min = 0;
		const getNext = () => Math.floor(Math.random() * (max - min + 1)) + min;
		next = getNext();
		while (next === currentSongIndex) {
			next = getNext();
		}
		Actions_Music.playSongById(stateMusic.playlist[next]?.id);
	},
	playOrder(currentSongIndex) {
		const next = currentSongIndex + 1;
		if (next > stateMusic.playlist.length - 1) {
			Actions_Music.stopSong();
		} else {
			Actions_Music.playSongById(stateMusic.playlist[next]?.id);
		}
	},
	playSingleLoop(currentSongIndex) {
		Actions_Music.playSongById(stateMusic.playlist[currentSongIndex]?.id);
	}
};
const cacheAudioBlob = async (records, url) => {
	try {
		let res = await axios.get(url.replace("http:", "").replace("https:", ""), {
			responseType: "blob"
		});
		if (!res || !res.data) return;
		const audioInfo = {
			records: JSON.parse(JSON.stringify(records)),
			blob: res.data
		};
		await set(`audio_${records.id}`, audioInfo);
		stateMusic.cacheAudioCount++;
	} catch (err) {
		console.error(err);
	}
};

const cacheAudioVolume = xU.debounce(function (audiovolume) {
	lStorage["PLAYER-VOLUME"] = audiovolume;
}, 1000);

export const Actions_Music = {
	setPlaylist(playlist) {
		stateMusic.playlist = playlist;
		stateMusic.playlistIdSet = new Set(playlist.map(i => i.id));
	},
	addSongToPlaylist(song) {
		if (!stateMusic.playlistIdSet.has(song.id)) {
			song = preprocessRecord(song);
			stateMusic.playlist.push(song);
			stateMusic.playlistIdSet.add(song.id);
		}
	},
	async delCached(keys) {
		await delMany(xU.isArray(keys) ? keys : [keys]);
		stateMusic.cacheAudioCount++;
	},
	clearPlaylist() {
		stateMusic.playlist = [];
		stateMusic.playlistIdSet.clear();
	},
	removeSongFromPlaylist(song) {
		const id = song.id;
		const itemIndex = xU.findIndex(stateMusic.playlist, { id });
		if (itemIndex > -1) {
			stateMusic.playlist.splice(itemIndex, 1);
			stateMusic.playlistIdSet.delete(id);
		}
	},
	async loadAllMusicClient() {
		const res = await API.music.loadAllMusicClient();
	},
	playMethods,
	palyPrevSong() {
		const currentSongIndex = xU.findIndex(stateMusic.playlist, {
			id: stateMusic.songId
		});
		if (currentSongIndex > -1) {
			if (currentSongIndex === 0) {
				Actions_Music.playSongById(
					stateMusic.playlist[stateMusic.playlist.length - 1]?.id
				);
			} else {
				Actions_Music.playSongById(
					stateMusic.playlist[currentSongIndex - 1]?.id
				);
			}
		}
	},
	playNextSong() {
		const currentSongIndex = xU.findIndex(stateMusic.playlist, {
			id: stateMusic.songId
		});
		if (currentSongIndex > -1) {
			Actions_Music.playMethods.playLoop(currentSongIndex);
		}
	},
	handlePlayEnd() {
		console.log("播放结束", Cpt_iconPlayModel.value);
		Actions_Music.stopSong();
		const currentSongIndex = xU.findIndex(stateMusic.playlist, {
			id: stateMusic.songId
		});
		if (currentSongIndex > -1) {
			Actions_Music.playMethods[Cpt_iconPlayModel.value](currentSongIndex);
		}
	},
	setCurrentTime(val) {
		stateMusic.audio.currentTime = val;
	},
	intervalCurrentTime() {
		stateMusic.currentTime = parseInt(stateMusic.audio.currentTime.toString());
		stateMusic.duration = parseInt(stateMusic.audio.duration.toString());
		stateMusic.ended = stateMusic.audio.ended;
	},
	//音量设置
	setVolume(n) {
		n = n > 100 ? 100 : n;
		n = n < 0 ? 0 : n;
		stateMusic.volume = n;
		const audioVolume = n / 100;
		stateMusic.audio.volume = audioVolume;
		cacheAudioVolume(audioVolume);
	},
	async togglePlayModel() {
		stateMusic.loopType =
			(stateMusic.loopType + 1) % LOOP_TYPE_NAME_ARRAY.length;
	},
	toggleVolumeMute() {
		stateMusic.muted = !stateMusic.muted;
		stateMusic.audio.muted = stateMusic.muted;
	},
	togglePlayOrPause() {
		if (!stateMusic.songId) return;
		stateMusic.isPlaying = !stateMusic.isPlaying;
		if (stateMusic.isPlaying) {
			stateMusic.audio.play();
		} else {
			stateMusic.audio.pause();
		}
	},
	pushSongToPlaylist: xU.debounce(function (newSong, fnDone) {
		if (xU.isArray(newSong)) {
			xU.each(newSong, Actions_Music.addSongToPlaylist);
		} else {
			Actions_Music.addSongToPlaylist(newSong);
		}
		console.timeEnd("pushSongToPlaylist");
		if (fnDone) {
			fnDone();
		}
	}, 1000),
	stopSong() {
		stateMusic.isPlaying = false;
		stateMusic.audio.pause();
		stateMusic.audio.currentTime = 0;
		stateMusic.currentTime = 0;
		setDocumentTitle("Music");
	},
	async playSongById(id) {
		if (!xU.isInput(id)) {
			return;
		}
		if (stateMusic.isPlaying && id === stateMusic.songId) {
			return;
		}
		let record = xU.find(stateMusic.playlist, { id });
		if (!record) {
			xU.notification.error("no song info");
			throw new Error("no song info");
		}
		record = preprocessRecord(record);
		stateMusic.song = record;
		let audioSrc;
		const audioInfo = await get(`audio_${id}`);
		if (audioInfo) {
			audioSrc = window.URL.createObjectURL(audioInfo.blob);
		} else {
			/* 判断资源的来源，private处理方式不一样 */
			if (record.isPrivate) {
				var xToken = {
					...lStorage["x_token"],
					id: record.id
				};
				let params: any = [];
				xU.each(xToken, (val, prop) => {
					params.push(`${prop}=${val}`);
				});
				params = params.join("&");
				audioSrc = `${window.__BASE_URL}/s/0/api/resource/remote_music_file?${params}`;
			} else {
				const res = await API.music.getSongUrlBuId(id);
				audioSrc = xU.first(res?.data).url;
			}
		}
		if (!audioSrc) {
			return;
		}
		record.url = audioSrc;

		stateMusic.audio.src = audioSrc;

		function canPlay() {
			return new Promise(resolve => {
				stateMusic.audio.onloadedmetadata = async event => {
					console.log(
						"🚀 ~ file: stateMusic.tsx ~ line 292 ~ canPlay ~ event",
						event
					);
				};
				stateMusic.audio.oncanplaythrough = async event => {
					console.log("I think I can play through the entire ", event);
					const audioInfo = await get(`audio_${id}`);
					if (!audioInfo) {
						cacheAudioBlob(record, audioSrc);
					}
				};
				stateMusic.audio.oncanplay = function (event) {
					if (intervalTimer) {
						clearInterval(intervalTimer);
					}
					intervalTimer = setInterval(Actions_Music.intervalCurrentTime, 1000);
					resolve(stateMusic.duration);
				};
			});
		}

		Actions_Music.stopSong();
		if (record) {
			setDocumentTitle(`${record.title}-${record.artist}`);
		}
		stateMusic.audio.load();
		await canPlay();
		stateMusic.audio.play();
		stateMusic.isPlaying = true;
		stateMusic.url = audioSrc;
		stateMusic.songId = id;
		const audioVolume = stateMusic.volume / 100;
		stateMusic.audio.volume = audioVolume;
		cacheAudioVolume(audioVolume);
	},
	async updatePersonalizedNewSong() {
		const { result } = await API.music.getPersonalizedNewSong();
		stateMusic.personalizedNewSong = result;
		return stateMusic.personalizedNewSong;
	}
};

export const Cpt_iconSound = computed(() => {
	return stateMusic.muted ? "soundMute" : "sound";
});

export const Cpt_iconPlayModel = computed(() => {
	return LOOP_TYPE_NAME_ARRAY[stateMusic.loopType];
});
export const Cpt_currentSong = computed(() => {
	if (stateMusic.song?.title) {
		return stateMusic.song;
	}
	return (
		xU.find(stateMusic.playlist, { id: stateMusic.songId }) || {
			title: "--"
		}
	);
});

const backupPlaylist = xU.debounce(async function (playlist) {
	playlist = JSON.parse(JSON.stringify(playlist));
	await set(stateMusic_PLAYLIST, playlist);
}, 300);

watch(
	() => stateMusic.playlist.length,
	() => {
		backupPlaylist(stateMusic.playlist);
	}
);

watch(
	() => stateMusic.ended,
	ended => {
		if (!ended) return;
		Actions_Music.handlePlayEnd();
	}
);
