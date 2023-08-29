import { isFunction, reduce, each } from "lodash";
import { markRaw, reactive } from "vue";
import { isObject } from "jsstore/dist/ts/worker/utils";

type t_scope = {
	/* 作为根节点重置数据状态,在setup时 */
	__resetState?: (args?: any) => void;
};

/**
 *  作为根节点重置数据状态,在setup时
 *    __resetState 内置方法
 *
 * @export
 * @template T
 * @param {any} scope
 * @param {any} [newDefaultScope=null]
 * @returns {(T & { * 	__resetState?: () => void;})}
 */
export function xScope<T>(scope, newDefaultScope = null): T & t_scope {
	const reactiveScope = reactive(
		reduce(
			scope,
			(_scope, val, key): any => {
				if (/^[_|$]/.test(key)) {
					/* _methods $变量 不需要响应 */
					if (typeof val === "object") {
						val = markRaw(val);
					}
				}
				_scope[key] = val;
				return _scope;
			},
			{}
		)
	) as T & t_scope;

	reactiveScope.__resetState = function (args?: any) {
		if (isFunction(newDefaultScope)) {
			const newScope = xScope(
				newDefaultScope.call(this, args),
				newDefaultScope
			);
			each(newScope, (value, prop) => {
				/* 保持对scope响应式对象的引用 */
				this[prop] = value;
			});
		}
	};
	return reactiveScope;
}
