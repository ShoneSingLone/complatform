import { xU } from "../ventoseUtils";

/**
 * 从defItem定义的配置项中获取value的值，组成key-val形式的对象
 * @param configs =>{first:{value:"aaa"},age:{value:22}}
 * @returns=>{first:"aaa",age:22}
 */
export function pickValueFrom<T>(configs: object): T {
	return xU.reduce(
		configs,
		(target, config, prop) => {
			try {
				target[prop] = JSON.parse(JSON.stringify(config.value));
			} catch (error) {}
			return target;
		},
		{}
	) as T;
}
export const setValueTo = (configs, values) => {
	configs = xU.reduce(
		values,
		(configs, value, prop) => {
			if (value !== undefined) {
				if (configs[prop]) {
					configs[prop].value = value;
					/* onChange */
					if (xU.isFunction(configs[prop].onChange)) {
						configs[prop].onChange(value);
					}
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
