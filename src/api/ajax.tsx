import { _, UI, lStorage, $ } from "@ventose/ui";
import axios from "axios";

const ajax = axios.create({
	baseURL: "/devyapi",
	timeout: 20000 // request timeout
});

// request interceptor
ajax.interceptors.request.use(
	config => {
		if (config.data) {
			_.each(["name"], prop => {
				if (config.data[prop]) {
					config.data[prop] = _.htmlFilter(config.data[prop]);
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
