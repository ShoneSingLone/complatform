import { lStorage, xU } from "@/ventose/ui";
import axios from "axios";
import qs from "qs";
import { stateApp } from "@/state/app";
import { cptRouter } from "@/router/router";

const ajax = axios.create({
	/* 跨域携带cookies */
	withCredentials: true,
	timeout: 20000 // request timeout
});

// request interceptor
ajax.interceptors.request.use(
	config => {
		config.url = `${stateApp.BASE_URL}${config.url}`;
		// config.url = `${stateApp.BASE_URL}${config.url}`;
		xToken.pick(config);
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
		if (!lStorage["x_token"]) {
			cptRouter.value.go("/login");
		}
		if (response?.data?.errcode == 40011) {
			stateApp.user.isLogin = false;
			cptRouter.value.go("/login");
			return Promise.resolve(response?.data);
		}
		if (response.config.url == "/api/interface/schema2json") {
			return Promise.resolve({ data: response.data, response });
		}
		if (response?.data?.errcode !== 0) {
			if (response?.data?.errmsg) {
				return Promise.reject(new Error(response?.data?.errmsg));
			}
			return Promise.reject(response?.data || response);
		}
		return Promise.resolve({ data: response.data.data, response });
	},
	async error => {
		xU(error);
		const { response } = error;
		if (response) {
			logError(response?.data?.data);
		}
		return Promise.reject(error);
	}
);

const xToken = {
	pick(config) {
		config.headers = config.headers || {};
		config.params = config.params || {};
		if (lStorage["x_token"]) {
			var xToken = lStorage["x_token"];
			xU.each(xToken, (val, prop) => {
				config.params[prop] = val;
			});
		}
	}
};

export function logError(msg) {
	if (!msg) return;
	xU.notification.error(msg);
	console.error(msg);
}

export { ajax };
