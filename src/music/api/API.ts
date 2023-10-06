import { genAjax } from "@/music/request/ajax";
import axios from "axios";

const ajax = genAjax({
	baseURL: "https://www.singlone.work/s/wyapi",
	reqInterceptor: i => i,
	resInterceptor: i => {
		if (i?.data?.code === 200) {
			return i.data;
		}
		return i;
	}
});

export const API = {
	music: {
		async loadAllMusicClient() {
			let res = [];
			try {
				const { status, data } = await axios.get(
					`https://www.singlone.work/s/0/media/AllMusicClient.json?_t=${Date.now()}`
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
		async getPersonalizedNewSong(limit = 1000) {
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
