import { f as xU, ac as EVENT_TYPE, x as xI } from "./index.js";
function pickValueFrom(configs) {
  return xU.reduce(configs, (target, config, prop) => {
    try {
      target[prop] = JSON.parse(JSON.stringify(config.value));
    } catch (error) {
    }
    return target;
  }, {});
}
const setValueTo = (configs, values) => {
  configs = xU.reduce(values, (configs2, value, prop) => {
    if (value !== void 0) {
      if (configs2[prop]) {
        configs2[prop].value = value;
        if (xU.isFunction(configs2[prop].onChange)) {
          configs2[prop].onChange(value);
        }
      }
    }
    return configs2;
  }, configs);
  return configs;
};
const NAME_LIMIT = 100;
const RegexFn = {
  email: () => /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
  mobile: () => /^1[34578]\d{9}$/
};
const newRule = (options) => {
  options.trigger = options.trigger || [EVENT_TYPE.update, EVENT_TYPE.input, EVENT_TYPE.change, EVENT_TYPE.blur];
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
        await xU.sleep(1e3);
        return "msg";
      }
    });
  },
  required(msg = "", trigger = [EVENT_TYPE.update]) {
    return newRule({
      name: "required",
      async validator(value) {
        msg = msg || xI("\u5FC5\u586B\u9879");
        if (value) {
          if (xU.isArray(value)) {
            if (value.length > 0) {
              return "";
            } else {
              return msg;
            }
          }
          return "";
        }
        if (xU.isBoolean(value))
          return "";
        if (0 === value)
          return "";
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
        return xI("\u8BF7\u8F93\u5165Email");
      }
    });
  },
  stringIsArrayJson: () => {
    return newRule({
      name: "",
      trigger: "",
      validator(value, {
        configs,
        rule
      }) {
        try {
          const valueArray = JSON.parse(value);
          if (xU.isArray(valueArray)) {
            rule.msg = "";
            return "";
          }
        } catch (error) {
        }
        return xI(`\u4EE5\u6570\u7EC4\u7684\u5F62\u5F0F["\u8BED\u8A00","language"]\uFF0C\u6309\u987A\u5E8F\u586B\u5199\u5BF9\u5E94\u56FD\u9645\u5316\u4FE1\u606F\u3002`).label;
      }
    });
  },
  nameLength: ({
    label,
    max,
    min
  }) => {
    max = max || NAME_LIMIT;
    return newRule({
      validator(value, {
        configs,
        rule
      }) {
        const strLength = (str) => {
          let length = 0;
          for (let i = 0; i < str.length; i++) {
            str.charCodeAt(i) > 255 ? length += 2 : length++;
          }
          return length;
        };
        const len = value ? strLength(value) : 0;
        if (len > max) {
          return `\u8BF7\u8F93\u5165${label}\u540D\u79F0\uFF0C\u957F\u5EA6\u4E0D\u8D85\u8FC7${max}\u5B57\u7B26(\u4E2D\u6587\u7B97\u4F5C2\u5B57\u7B26)!`;
        }
        if (xU.isInput(min) && len < min) {
          return `\u8BF7\u8F93\u5165${label}\u540D\u79F0\uFF0C\u957F\u5EA6\u4E0D\u77ED\u4E8E${max}\u5B57\u7B26(\u4E2D\u6587\u7B97\u4F5C2\u5B57\u7B26)!`;
        }
        return "";
      }
    });
  },
  apiPath: () => {
    return newRule({
      name: "",
      trigger: [EVENT_TYPE.blur],
      validator(path) {
        if (path[0] !== "/") {
          return xI("\u8BF7\u8F93\u5165\u5408\u6CD5\u8DEF\u5F84");
        } else {
          return "";
        }
      }
    });
  }
};
export {
  FormRules as F,
  newRule as n,
  pickValueFrom as p,
  setValueTo as s
};
