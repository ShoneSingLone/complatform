import { $t, EVENT_TYPE, State_UI, xU } from "@ventose/ui";
// 限制名称的字符长度(中文算两个长度)
export const NAME_LIMIT = 100;

export const RegexFn = {
	email: () => /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
	mobile: () => /^1[34578]\d{9}$/
};

/**
 *  暂时没想好，之前是msg根据i18n变化
 Object.defineProperty(options,"msg",{ get(){
		return msg();
	} });
 */
export const newRule = options => {
	options.trigger = options.trigger || [
		EVENT_TYPE.update,
		EVENT_TYPE.input,
		EVENT_TYPE.change,
		EVENT_TYPE.blur
	];
	options.msg = options.msg || "";
	if (!options.validator) {
		throw new Error("miss validator");
	}
	return options;
};

const FormRules = {
	demo() {
		return newRule({
			name: "Demo",
			async validator(value) {
				await xU.sleep(1000);
				return "msg";
			}
		});
	},
	required(msg = "", trigger = [EVENT_TYPE.update]) {
		return newRule({
			name: "required",
			async validator(value) {
				msg = msg || $t("必填项").label;
				/*必填的简单验证*/
				if (value) {
					/*不为空数组*/
					if (xU.isArray(value)) {
						if (value.length > 0) {
							return "";
						} else {
							return msg;
						}
					}
					/*TODO:object*/
					return "";
				}

				if (xU.isBoolean(value)) return "";
				if (0 === value) return "";

				return msg;
			},
			trigger
		});
	},
	email() {
		return newRule({
			name: "email",
			async validator(value) {
				if (RegexFn.email().test(value)) {
					return "";
				}
				return $t("请输入Email").label;
			}
		});
	},
	stringIsArrayJson: () => {
		return newRule({
			name: "",
			trigger: "",
			/* 可以根据校验修改提示信息 */
			validator(value, { configs, rule }) {
				try {
					const valueArray = JSON.parse(value);
					if (xU.isArray(valueArray)) {
						rule.msg = "";
						return "";
					}
				} catch (error) {}
				return $t(`以数组的形式["语言","language"]，按顺序填写对应国际化信息。`)
					.label;
			}
		});
	},
	nameLength: ({ label, max, min }) => {
		max = max || NAME_LIMIT;
		return newRule({
			/* 可以根据校验修改提示信息 */
			validator(value, { configs, rule }) {
				// 返回字符串长度，汉字计数为2
				const strLength = str => {
					let length = 0;
					for (let i = 0; i < str.length; i++) {
						str.charCodeAt(i) > 255 ? (length += 2) : length++;
					}
					return length;
				};
				const len = value ? strLength(value) : 0;
				if (len > max) {
					return `请输入${label}名称，长度不超过${max}字符(中文算作2字符)!`;
				}

				if (xU.isInput(min) && len < min) {
					return `请输入${label}名称，长度不短于${max}字符(中文算作2字符)!`;
				}
				return "";
			}
		});
	},
	apiPath: () => {
		return newRule({
			name: "",
			trigger: [EVENT_TYPE.blur],
			/* 可以根据校验修改提示信息 */
			validator(path) {
				if (path[0] !== "/") {
					return $t("请输入合法路径").label;
				} else {
					return "";
				}
			}
		});
	}
};

export { FormRules as FormRules };
