import { _ } from "@ventose/ui";

const APP_API_CACHE = {};
const isPending = {};
const resolveCollection = {};

function reqProxy(ctrlName, reqName) {
	return new Proxy(function () {}, {
		apply(target, thisArg, argumentsList) {
			return new Promise(async (resolve, reject) => {
				try {
					if (isPending[ctrlName]) {
						resolveCollection[ctrlName] = resolveCollection[ctrlName] || [];
						resolveCollection[ctrlName].push(resolve);
					} else {
						isPending[ctrlName] = true;
						const module = await import(`./ctrl/${ctrlName}`);
						const ctrl = module[ctrlName];
						APP_API_CACHE[ctrlName] = ctrl;
						const fnRequest = ctrl[reqName];

						if (typeof fnRequest !== "function") {
							return Promise.reject(`api文件夹下缺失${ctrlName}.${reqName}`);
						}
						const result = fnRequest.apply(thisArg, argumentsList);
						_.each(resolveCollection[ctrlName], r => r(result));
						resolveCollection[ctrlName] = null;
						delete resolveCollection[ctrlName];
						isPending[ctrlName] = true;
						resolve(result);
					}
				} catch (e) {
					console.error(e);
				}
			});
		}
	});
}

function ctrlProxy(ctrlName) {
	return new Proxy(
		{},
		{
			get(__, reqName) {
				return reqProxy(ctrlName, reqName);
			}
		}
	);
}

export const API = new Proxy(
	{},
	{
		set(api, prop, val) {
			APP_API_CACHE[prop] = val;
			return true;
		},
		get(api, ctrlName) {
			if (APP_API_CACHE[ctrlName]) {
				return APP_API_CACHE[ctrlName];
			} else {
				return ctrlProxy(ctrlName);
			}
		}
	}
);
