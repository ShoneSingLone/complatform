import { xU } from "../ventoseUtils";

export const pickValueFrom = configs => {
	return xU.reduce(
		configs,
		(target, config, prop) => {
			try {
				target[prop] = JSON.parse(JSON.stringify(config.value));
			} catch (error) {}
			return target;
		},
		{}
	);
};
export const setValueTo = (configs, values) => {
	configs = xU.reduce(
		values,
		(configs, value, prop) => {
			if (value === undefined) {
				return;
			}
			if (configs[prop]) {
				configs[prop].value = value;
				/* onChange */
				if (xU.isFunction(configs[prop].onChange)) {
					configs[prop].onChange(value);
				}
			}
			return configs;
		},
		configs
	);
	return configs;
};

/*重置reactive数据*/
export const resetValueOf = (state, initState) => {
	xU.each(initState, (value, prop) => {
		state[prop] = JSON.parse(JSON.stringify(value));
	});
	return state;
};
