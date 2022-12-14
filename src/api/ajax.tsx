import { xU, UI, lStorage, $ } from "@ventose/ui";
import axios from "axios";
import { State_App } from "../state/State_App";
import { Cpt_url } from "./../router/router";

const ajax = axios.create({
	timeout: 20000 // request timeout
});

// request interceptor
ajax.interceptors.request.use(
	config => {
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
		if (response?.data?.errcode == 40011) {
			State_App.user.isLogin = false;
			window.location.hash = "/login";
		}
		if (response?.data?.errcode !== 0) {
			UI.message.error(response?.data?.errmsg);
			return Promise.reject(response);
		}

		return Promise.resolve({ data: response.data.data, response });
	},
	async error => {
		const { response } = error;
		console.log(response);
		logError(response?.data?.data);
		return Promise.reject(error);
	}
);

export function logError(msg) {
	if (!msg) return;
	UI.notification.error(msg);
	console.error(msg);
}

export { ajax };
