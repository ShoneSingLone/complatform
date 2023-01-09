import { reactive, getCurrentInstance, onMounted } from "vue";
import { xU } from "../ventoseUtils";

export const useScopeStyle = () => {
	const scopeStyle = reactive({});

	function styleObject2String(styleObject) {
		return xU
			.map(
				xU.merge({ width: "120px", "text-align": "right" }, styleObject),
				(value, prop) => `${prop}: ${value}`
			)
			.join(";");
	}

	function updateStyle(vm, styleContent) {
		if (!vm.$styleEle) {
			vm.$styleEle = $(vm.ele);
		}
		vm.$styleEle.html(styleContent);
	}

	function setStyle(styleObject) {
		const instance = getCurrentInstance();
		xU.each(styleObject, (value, prop) => {
			scopeStyle[prop] = value;
		});
		const styleString = updateStyle(
			instance.ctx,
			styleObject2String(scopeStyle)
		);
		debugger;
	}

	return {
		setStyle
	};
};
