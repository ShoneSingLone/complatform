import { lStorage, UI, xU } from "@ventose/ui";
import axios from "axios";
import { State_App } from "../state/State_App";

const ajax = axios.create({
	/* 跨域携带cookies */
	withCredentials: true,
	timeout: 20000 // request timeout
});

// request interceptor
ajax.interceptors.request.use(
	config => {
		config.url = `${State_App.baseURL}${config.url}`;
		pickXCookies(config);
		if (config.data) {
			xU.each(["name"], prop => {
				if (config.data[prop]) {
					config.data[prop] = xU.htmlFilter(config.data[prop]);
				}
			});
		}
		return config;
	},
	error => Promise.reject(error)
);

// response interceptor
ajax.interceptors.response.use(
	async response => {
		saveXCookies(response);
		if (response?.data?.errcode == 40011) {
			State_App.user.isLogin = false;
			window.location.hash = "/login";
		}

		if (response.config.url == "/api/interface/schema2json") {
			return Promise.resolve({ data: response.data, response });
		}
		if (response?.data?.errcode !== 0) {
			UI.message.error(response?.data?.errmsg);
			return Promise.reject(response);
		}

		return Promise.resolve({ data: response.data.data, response });
	},
	async error => {
		const { response } = error;
		lStorage["x-cookies"] = response.headers["x-cookies"] || "";
		logError(response?.data?.data);
		return Promise.reject(error);
	}
);

function pickXCookies(config) {
	const xCookies = lStorage["x-cookies"];
	if (xCookies) {
		config.headers["x-cookies"] = JSON.stringify(xCookies);
	}
}

function saveXCookies(response) {
	const xCookies = response.headers["x-cookies"];
	if (xCookies) {
		lStorage["x-cookies"] = xCookies;
	}
}

export function logError(msg) {
	if (!msg) return;
	UI.notification.error(msg);
	console.error(msg);
}

export { ajax };
