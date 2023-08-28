import { reduce } from "lodash";
import { markRaw, reactive } from "vue";

export function xScope<T>(
	scope,
	newDefaultScope = null
): T & {
	/* 作为根节点重置数据状态,在setup时 */
	__resetState?: () => null;
} {
	scope = reactive(
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

	scope.__resetState = () => {
		scope = xScope(newDefaultScope(), newDefaultScope);
	};
	return scope;
}
