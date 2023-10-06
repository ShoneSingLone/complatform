import { xU } from "@/ventose/ui";

/**
 *
 * 播放列表展示需要的字段是 title album artist
 * 次函数用于处理不符合格式要求的数据
 *
 * @export
 * @param {any} record
 * @returns
 */
export function preprocessRecord(records) {
	function process(record) {
		const { song, artists, album, name } = record;
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

export function formatDuring(during) {
	const s = Math.floor(during) % 60;
	during = Math.floor(during / 60);
	const i = during % 60;

	let ii = i < 10 ? `0${i}` : i;
	let ss = s < 10 ? `0${s}` : s;

	ii = xU.isNaN(ii) ? "00" : ii;
	ss = xU.isNaN(ss) ? "00" : ss;
	return ii + ":" + ss;
}
