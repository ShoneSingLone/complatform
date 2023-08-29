import { isFunction, reduce } from "lodash";
import { markRaw, reactive } from "vue";

/**
 *  作为根节点重置数据状态,在setup时
 * 	__resetState 内置方法
 *
 * @export
 * @template T
 * @param {any} scope
 * @param {any} [newDefaultScope=null]
 * @returns {(T & { * 	__resetState?: () => null;})}
 */
export function xScope<T>(
	scope,
	newDefaultScope = null
): T & {
	/* 作为根节点重置数据状态,在setup时 */
	__resetState?: (args?: any) => null;
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

	scope.__resetState = (args?: any) => {
		if (isFunction(newDefaultScope)) {
			scope = xScope(newDefaultScope(args), newDefaultScope);
		}
	};
	return scope;
}
