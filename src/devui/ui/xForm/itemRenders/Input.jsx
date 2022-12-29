import {resolveComponent} from "vue";
import {ReadonlyItem} from "./Readonly"

/**
 * @Description
 * @date 2021-11-09
 * @param {any} {property isPassword 密码输入框 isTextarea
 * @param {any} slots}
 * @returns {any}
 */
export default (args) => {
	const { property, slots, listeners } = args;
	/* 只读模式下的 */
	if(property.readonly){
		return <ReadonlyItem value={property.value}/>
	}

	let component = resolveComponent("aInput");
	if (property.isPassword) {
		component = resolveComponent("aInputPassword");
	} else if (property.isNumber) {
		component = resolveComponent("aInputNumber");
	} else if (property.isTextarea) {
		component = resolveComponent("aTextarea");
		property.autoSize = property.autoSize || {
			minRows: 4,
			maxRows: 6
		};
	} else if (property.isSearch) {
		component = resolveComponent("aInputSearch");
	}
	// property.disabled=true;
	return <component {...property} {...listeners} v-slots={slots} />;
};
