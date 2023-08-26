import { reduce } from "lodash";
import { markRaw, reactive } from "vue";

export function xScope<T>(scope): T {
	return reactive(
		reduce(
			scope,
			(_scope, val, key): any => {
				if (/^_/.test(key)) {
					/* methods 不响应 */
					_scope[key] = markRaw(val);
				} else {
					_scope[key] = val;
				}
				return _scope;
			},
			{}
		)
	) as T;
}
