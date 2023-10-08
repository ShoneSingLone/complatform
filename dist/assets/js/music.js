import { aW as axios, e as xU, az as reactive, ac as lStorage, aX as get, aY as set, aZ as delMany, p as setDocumentTitle, aD as computed, n as watch } from "./index.js";
const reqInterceptor = (config) => {
  return config;
};
const resInterceptor = async (response) => {
  const { data } = response;
  return Promise.resolve(data == null ? void 0 : data.data);
};
const resErrorHandler = async (error) => {
  var _a, _b;
  const { response } = error;
  console.log(response);
  logError((_a = response == null ? void 0 : response.data) == null ? void 0 : _a.data);
  if (((_b = response == null ? void 0 : response.data) == null ? void 0 : _b.msg) === "auth") {
    stateApp.token = "";
    await xU.sleep(1e3);
    window.location.reload();
  }
  return Promise.reject(error);
};
function genAjax(options = {}) {
  options.baseURL = options.baseURL;
  options.reqInterceptor = options.reqInterceptor || reqInterceptor;
  options.resInterceptor = options.resInterceptor || resInterceptor;
  options.resErrorHandler = options.resErrorHandler || resErrorHandler;
  const ajax2 = axios.create({
    baseURL: options.baseURL,
    timeout: 2e4
  });
  ajax2.interceptors.request.use(
    options.reqInterceptor,
    (error) => Promise.reject(error)
  );
  ajax2.interceptors.response.use(
    options.resInterceptor,
    options.resErrorHandler
  );
  return ajax2;
}
function logError(msg) {
  if (!msg)
    return;
  xU.notification.error({
    message: msg
  });
  console.error(msg);
}
genAjax();
const ajax = genAjax({
  baseURL: `${window.__BASE_URL}/s/wyapi`,
  reqInterceptor: (i) => i,
  resInterceptor: (i) => {
    var _a;
    if (((_a = i == null ? void 0 : i.data) == null ? void 0 : _a.code) === 200) {
      return i.data;
    }
    return i;
  }
});
const API = {
  music: {
    async loadAllMusicClient() {
      let res = [];
      try {
        const { status, data } = await axios.get(
          `${window.__BASE_URL}/s/0/media/AllMusicClient.json?_t=${Date.now()}`
        );
        if (status === 200) {
          res = data;
        }
      } catch (error) {
        console.error(error);
      } finally {
        return res;
      }
    },
    async search(params = { limit: 60, offset: 1 }) {
      return await ajax({
        method: "GET",
        url: "/search",
        params
      });
    },
    async getPersonalizedNewSong(limit = 1e3) {
      return await ajax({
        method: "GET",
        url: "/personalized/newsong",
        params: { limit }
      });
    },
    async getSongUrlBuId(id) {
      return await ajax({
        method: "GET",
        url: "/song/url",
        params: { id }
      });
    },
    async getSongDetailBuId(id) {
      return await ajax({
        method: "GET",
        url: "/song/detail",
        params: { id }
      });
    }
  }
};
function preprocessRecord(records) {
  function process(record) {
    const {
      song,
      artists,
      album,
      name
    } = record;
    if (song) {
      record.title = record.title || record.name;
      record.album = record.album || song.album.name;
      record.artist = record.artist || song.artists[0].name;
    }
    if (artists && name && album) {
      record.title = name;
      record.album = album.name;
      record.artist = artists[0].name;
    }
    return record;
  }
  if (xU.isArray(records)) {
    return xU.map(records, process);
  } else {
    return process(records);
  }
}
function formatDuring(during) {
  const s = Math.floor(during) % 60;
  during = Math.floor(during / 60);
  const i = during % 60;
  let ii = i < 10 ? `0${i}` : i;
  let ss = s < 10 ? `0${s}` : s;
  ii = xU.isNaN(ii) ? "00" : ii;
  ss = xU.isNaN(ss) ? "00" : ss;
  return ii + ":" + ss;
}
const stateMusic = reactive({
  cacheAudioCount: 0,
  AllMusicClient: [],
  tabItems: [
    {
      key: "playlist",
      label: "\u5F53\u524D\u64AD\u653E\u5217\u8868",
      icon: "playlist"
    },
    {
      key: "new",
      label: "\u53D1\u73B0\u97F3\u4E50",
      icon: "privateNet"
    },
    {
      key: "private",
      label: "\u79C1\u85CF",
      icon: "user"
    },
    {
      key: "cached",
      label: "\u5DF2\u7F13\u5B58",
      icon: "cached"
    }
  ],
  songId: 0,
  personalizedNewSong: [],
  audio: new Audio(),
  loopType: 0,
  volume: (() => {
    const volume = lStorage["PLAYER-VOLUME"];
    if (volume) {
      return volume * 100;
    } else {
      return 20;
    }
  })(),
  playlist: [],
  playlistIdSet: /* @__PURE__ */ new Set([]),
  showPlayList: false,
  id: 0,
  url: "",
  song: {},
  isPlaying: false,
  isPause: false,
  sliderInput: false,
  ended: false,
  muted: false,
  currentTime: 0,
  duration: 0
});
const stateMusic_PLAYLIST = "stateMusic_PLAYLIST";
(async function recoverPlaylist() {
  let playlist = await get(stateMusic_PLAYLIST);
  playlist = playlist || [];
  Actions_Music.setPlaylist(playlist);
  stateMusic.AllMusicClient = await get("AllMusicClient");
  try {
    stateMusic.AllMusicClient = await API.music.loadAllMusicClient();
    await set("AllMusicClient", JSON.parse(JSON.stringify(stateMusic.AllMusicClient)));
  } catch (error) {
    console.error(error);
  }
})();
let intervalTimer;
const LOOP_TYPE_NAME_ARRAY = ["playOrder", "playRandom", "playLoop", "playSingleLoop"];
const playMethods = {
  playLoop(currentSongIndex) {
    var _a, _b;
    const next = currentSongIndex + 1;
    if (next > stateMusic.playlist.length - 1) {
      Actions_Music.playSongById((_a = stateMusic.playlist[0]) == null ? void 0 : _a.id);
    } else {
      Actions_Music.playSongById((_b = stateMusic.playlist[next]) == null ? void 0 : _b.id);
    }
  },
  playRandom(currentSongIndex) {
    var _a, _b;
    let next;
    if (stateMusic.playlist.length === 1) {
      next = 0;
      Actions_Music.playSongById((_a = stateMusic.playlist[0]) == null ? void 0 : _a.id);
      return;
    }
    const max = stateMusic.playlist.length - 1;
    const min = 0;
    const getNext = () => Math.floor(Math.random() * (max - min + 1)) + min;
    next = getNext();
    while (next === currentSongIndex) {
      next = getNext();
    }
    Actions_Music.playSongById((_b = stateMusic.playlist[next]) == null ? void 0 : _b.id);
  },
  playOrder(currentSongIndex) {
    var _a;
    const next = currentSongIndex + 1;
    if (next > stateMusic.playlist.length - 1) {
      Actions_Music.stopSong();
    } else {
      Actions_Music.playSongById((_a = stateMusic.playlist[next]) == null ? void 0 : _a.id);
    }
  },
  playSingleLoop(currentSongIndex) {
    var _a;
    Actions_Music.playSongById((_a = stateMusic.playlist[currentSongIndex]) == null ? void 0 : _a.id);
  }
};
const cacheAudioBlob = async (records, url) => {
  try {
    let res = await axios.get(url.replace("http:", "").replace("https:", ""), {
      responseType: "blob"
    });
    if (!res || !res.data)
      return;
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
const cacheAudioVolume = xU.debounce(function(audiovolume) {
  lStorage["PLAYER-VOLUME"] = audiovolume;
}, 1e3);
const Actions_Music = {
  setPlaylist(playlist) {
    stateMusic.playlist = playlist;
    stateMusic.playlistIdSet = new Set(playlist.map((i) => i.id));
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
    const itemIndex = xU.findIndex(stateMusic.playlist, {
      id
    });
    if (itemIndex > -1) {
      stateMusic.playlist.splice(itemIndex, 1);
      stateMusic.playlistIdSet.delete(id);
    }
  },
  async loadAllMusicClient() {
    await API.music.loadAllMusicClient();
  },
  playMethods,
  palyPrevSong() {
    var _a, _b;
    const currentSongIndex = xU.findIndex(stateMusic.playlist, {
      id: stateMusic.songId
    });
    if (currentSongIndex > -1) {
      if (currentSongIndex === 0) {
        Actions_Music.playSongById((_a = stateMusic.playlist[stateMusic.playlist.length - 1]) == null ? void 0 : _a.id);
      } else {
        Actions_Music.playSongById((_b = stateMusic.playlist[currentSongIndex - 1]) == null ? void 0 : _b.id);
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
    console.log("\u64AD\u653E\u7ED3\u675F", Cpt_iconPlayModel.value);
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
  setVolume(n) {
    n = n > 100 ? 100 : n;
    n = n < 0 ? 0 : n;
    stateMusic.volume = n;
    const audioVolume = n / 100;
    stateMusic.audio.volume = audioVolume;
    cacheAudioVolume(audioVolume);
  },
  async togglePlayModel() {
    stateMusic.loopType = (stateMusic.loopType + 1) % LOOP_TYPE_NAME_ARRAY.length;
  },
  toggleVolumeMute() {
    stateMusic.muted = !stateMusic.muted;
    stateMusic.audio.muted = stateMusic.muted;
  },
  togglePlayOrPause() {
    if (!stateMusic.songId)
      return;
    stateMusic.isPlaying = !stateMusic.isPlaying;
    if (stateMusic.isPlaying) {
      stateMusic.audio.play();
    } else {
      stateMusic.audio.pause();
    }
  },
  pushSongToPlaylist: xU.debounce(function(newSong, fnDone) {
    if (xU.isArray(newSong)) {
      xU.each(newSong, Actions_Music.addSongToPlaylist);
    } else {
      Actions_Music.addSongToPlaylist(newSong);
    }
    console.timeEnd("pushSongToPlaylist");
    if (fnDone) {
      fnDone();
    }
  }, 1e3),
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
    let record = xU.find(stateMusic.playlist, {
      id
    });
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
      if (record.isPrivate) {
        var xToken = {
          ...lStorage["x_token"],
          id: record.id
        };
        let params = [];
        xU.each(xToken, (val, prop) => {
          params.push(`${prop}=${val}`);
        });
        params = params.join("&");
        audioSrc = `${window.__BASE_URL}/s/0/api/resource/remote_music_file?${params}`;
      } else {
        const res = await API.music.getSongUrlBuId(id);
        audioSrc = xU.first(res == null ? void 0 : res.data).url;
      }
    }
    if (!audioSrc) {
      return;
    }
    record.url = audioSrc;
    stateMusic.audio.src = audioSrc;
    function canPlay() {
      return new Promise((resolve) => {
        stateMusic.audio.onloadedmetadata = async (event) => {
          console.log("\u{1F680} ~ file: stateMusic.tsx ~ line 292 ~ canPlay ~ event", event);
        };
        stateMusic.audio.oncanplaythrough = async (event) => {
          console.log("I think I can play through the entire ", event);
          const audioInfo2 = await get(`audio_${id}`);
          if (!audioInfo2) {
            cacheAudioBlob(record, audioSrc);
          }
        };
        stateMusic.audio.oncanplay = function(event) {
          if (intervalTimer) {
            clearInterval(intervalTimer);
          }
          intervalTimer = setInterval(Actions_Music.intervalCurrentTime, 1e3);
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
    const {
      result
    } = await API.music.getPersonalizedNewSong();
    stateMusic.personalizedNewSong = result;
    return stateMusic.personalizedNewSong;
  }
};
const Cpt_iconSound = computed(() => {
  return stateMusic.muted ? "soundMute" : "sound";
});
const Cpt_iconPlayModel = computed(() => {
  return LOOP_TYPE_NAME_ARRAY[stateMusic.loopType];
});
const Cpt_currentSong = computed(() => {
  var _a;
  if ((_a = stateMusic.song) == null ? void 0 : _a.title) {
    return stateMusic.song;
  }
  return xU.find(stateMusic.playlist, {
    id: stateMusic.songId
  }) || {
    title: "--"
  };
});
const backupPlaylist = xU.debounce(async function(playlist) {
  playlist = JSON.parse(JSON.stringify(playlist));
  await set(stateMusic_PLAYLIST, playlist);
}, 300);
watch(() => stateMusic.playlist.length, () => {
  backupPlaylist(stateMusic.playlist);
});
watch(() => stateMusic.ended, (ended) => {
  if (!ended)
    return;
  Actions_Music.handlePlayEnd();
});
export {
  Actions_Music as A,
  Cpt_iconPlayModel as C,
  API as a,
  Cpt_currentSong as b,
  Cpt_iconSound as c,
  formatDuring as f,
  preprocessRecord as p,
  stateMusic as s
};
