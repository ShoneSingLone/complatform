import { genAjax } from "@/music/request/ajax";
import axios from "axios";

const ajax = genAjax({
	baseURL: `${window.__BASE_URL}/s/wyapi`,
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
