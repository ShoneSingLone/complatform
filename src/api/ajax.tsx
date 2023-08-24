import { lStorage, xU } from "@/ventose/ui";
import axios from "axios";
import { stateApp } from "@/state/app";

const ajax = axios.create({
	/* 跨域携带cookies */
	withCredentials: true,
	timeout: 20000 // request timeout
});

// request interceptor
ajax.interceptors.request.use(
	config => {
		config.url = `${stateApp.baseURL}${config.url}`;
		// config.url = `${stateApp.baseURL}${config.url}`;
		xCookies.pick(config);
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
		xCookies.save(response);
		if (response?.data?.errcode == 40011) {
			stateApp.user.isLogin = false;
			window.location.hash = "/login";
		}

		if (response.config.url == "/api/interface/schema2json") {
			return Promise.resolve({ data: response.data, response });
		}
		if (response?.data?.errcode !== 0) {
			return Promise.reject(
				response?.data?.errmsg || response?.data || response
			);
		}

		return Promise.resolve({ data: response.data.data, response });
	},
	async error => {
		xU(error);
		const { response } = error;
		if (response) {
			lStorage["x-cookies"] = response?.headers["x-cookies"] || "";
			logError(response?.data?.data);
		}
		return Promise.reject(error);
	}
);

const xCookies = {
	pick(config) {
		config.headers = config.headers || {};
		config.params = config.params || {};
		const xCookies = lStorage["x-cookies"];
		if (xCookies) {
			const xCookiesString = JSON.stringify(xCookies);
			config.headers["x-cookies"] = xCookiesString;
		} else {
			config.headers["x-cookies"] = "";
		}
	},
	save(response) {
		const xCookies = response.headers["x-cookies"];
		if (xCookies) {
			lStorage["x-cookies"] = xCookies;
		}
	}
};

export function logError(msg) {
	if (!msg) return;
	xU.notification.error(msg);
	console.error(msg);
}

export { ajax };
