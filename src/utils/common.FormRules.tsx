import { FormRules, EVENT_TYPE, _, State_UI } from "@ventose/ui";
import { NAME_LIMIT } from "./variable";

FormRules.nameLength = ({ label, max, min }) => {
	max = max || NAME_LIMIT;
	return FormRules.custom({
		msg: "",
		name: "",
		trigger: "",
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
				rule.msg = `请输入${label}名称，长度不超过${max}字符(中文算作2字符)!`;
				return FormRules.FAIL;
			}

			if (_.isInput(min) && len < min) {
				rule.msg = `请输入${label}名称，长度不短于${max}字符(中文算作2字符)!`;
				return FormRules.FAIL;
			}

			return FormRules.SUCCESS;
		}
	});
};

FormRules.apiPath = () => {
	return FormRules.custom({
		msg: State_UI.$t("请输入合法路径").label,
		name: "",
		trigger: [EVENT_TYPE.blur],
		/* 可以根据校验修改提示信息 */
		validator(path) {
			if (path[0] !== "/") {
				return FormRules.FAIL;
			} else {
				return FormRules.SUCCESS;
			}
		}
	});
};

export { FormRules as FormRules };
