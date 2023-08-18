//@ts-nocheck
import { computed, defineComponent, isProxy, toRaw } from "vue";
import renders from "./itemRenders";
import { xU } from "../ventoseUtils";
import { diff } from "jsondiffpatch";
import { State_UI } from "../State_UI";
import $ from "jquery";

const DID_NOT_SET_VALUE = "either configs.value or modelValue";
const UNUSE_V_MODEL = "UNUSE_V_MODEL";

const domClass = {
	tipsError: "x-form-item-explain x-form-item-explain-error"
};

/* 记录表单控件 用于 校验  */
const X_ITEM_COLLECTION = {};

const WILL_DELETE = [
	"onValidateForm",
	"_$updateUI",
	"once",
	"itemTips",
	"rules",
	"labelVNodeRender",
	"slots",
	"validate",
	/* value 用updateValue处理，该值会触发render */
	"value"
];

export const EVENT_TYPE = {
	isItemInvalid: "isItemInvalid",
	update: "update",
	change: "change",
	input: "input",
	blur: "blur",
	focus: "focus"
};

export const TIPS_TYPE = {
	success: "success",
	error: "error"
};

/**
 * 校验表单是否！未成功通过校验
 * @export
 * @param {string} [selector=""] 可转换成jQuery对象
 * @1jQuery可用的选择器字符串
 * @2直接用DOM
 * @3Vue组件实例 this.$el 带有$el
 * @returns false为通过校验，没有任何错误提示，否则返回错误项的数组
 */
export async function isItemInvalid(selector?: any) {
	let $wrapper = (function () {
		if (selector) {
			/* jQuery可用的选择器字符串 */
			if (xU.isString(selector)) {
				return $(selector);
			}
			/* 直接用DOM */
			if (selector?.innerHTML) {
				return $(selector);
			}
			/* Vue组件实例 */
			if (selector?.$el) {
				return $(selector.$el);
			}
		} else {
			/* 页面内所有xItem */
			return $(document);
		}
	})();

	if (!$wrapper || $wrapper.length == 0) {
		throw new Error("selector不是可用的dom元素");
	}
	const $target = $wrapper.find(`[id^=xItem_]`);
	const errorArray = [];

	await Promise.all(
		xU.map($target, async dom => {
			try {
				const xItemId = dom.id;
				const vm = X_ITEM_COLLECTION[xItemId];
				const msg = await vm.validate();
				if (msg) {
					errorArray.push([msg, vm]);
				}
			} catch (error) {
				console.error(error);
			}
		})
	);

	if (xU.isArrayFill(errorArray)) {
		return errorArray;
	} else {
		return false;
	}
}

/**
 * 没有错误信息则校验通过
 * @param {*} res
 * @returns
 */
export const AllWasWell = (res: any) => {
	return xU.isArray(res) && res.length === 0;
};

export const xItem = defineComponent({
	name: "XItem",
	props: {
		/* 绑定的值 */
		modelValue: {
			type: [Object, String, Number, Boolean],
			default() {
				return UNUSE_V_MODEL;
			}
		},
		configs: {
			type: Object,
			default() {
				return {};
			}
		}
	},
	emits: ["update:modelValue"],
	setup(props, { attrs, slots, emit, expose }) {
		let Cpt_isShowXItem: any = true;
		let Cpt_isDisabled: any = false;
		let Cpt_label: any = "";

		/*isShow*/
		if (xU.isFunction(props.configs.isShow)) {
			Cpt_isShowXItem = computed(props.configs.isShow);
		} else {
			/* 使用defItem isShow 默认是true */
			Cpt_isShowXItem = computed(() => props.configs.isShow);
		}

		/*disabled*/
		if (xU.isFunction(props.configs.disabled)) {
			Cpt_isDisabled = computed(props.configs.disabled);
		} else if (xU.isBoolean(props.configs.disabled)) {
			Cpt_isDisabled = computed(() => props.configs.disabled);
		}

		/*label*/
		if (xU.isFunction(props.configs.label)) {
			Cpt_label = computed(() => props.configs.label(props.configs));
		} else if (xU.isString(props.configs.label)) {
			Cpt_label = computed(() => props.configs.label);
		}

		/*readonly 在configs中，各个render自行实现*/
		return {
			Cpt_isShowXItem,
			Cpt_isDisabled,
			Cpt_label
		};
	},
	data(vm) {
		const { $props, $attrs } = vm;

		const triggerValidate = xU.debounce((eventType: string) => {
			vm.validate({ eventType });
		}, 500);

		const { listeners, propsWillDeleteFromConfigs } = (() => {
			const { configs } = $props;
			/* 后面的属性覆盖前面的属性 */
			/* propsWillDeleteFromConfigsSet jsx 避免 listener 与 properties 实践名称重复 */
			const propsSet = new Set();

			/* 需要一个事件分发，拦截所有事件，再根据配置信息   */
			const listeners = {
				/* modelValue的主要的触发方式 */
				onEmitItemValue: (val: any) => {
					vm.privateValue = val;
					/* @ts-ignore */
					if (xU.isFunction(listeners.onAfterEmitItemValue)) {
						/* @ts-ignore */
						listeners.onAfterEmitItemValue.call(vm, val);
					}
					/* TODO: rule检测*/
					triggerValidate(EVENT_TYPE.update);
				},
				onValidateForm: () => {
					triggerValidate(EVENT_TYPE.isItemInvalid);
				},
				onChange: () => {
					triggerValidate(EVENT_TYPE.change);
				},
				onInput: () => {
					triggerValidate(EVENT_TYPE.input);
				},
				onBlur: () => {
					triggerValidate(EVENT_TYPE.blur);
				},
				onFocus: () => {
					triggerValidate(EVENT_TYPE.focus);
				}
			};

			function makeEventHandlerSupportMultiple(
				prop: unknown,
				xItemInnerEventHandler: unknown
			) {
				propsSet.add(prop);
				if (
					typeof listeners[prop] === "object" &&
					xU.isArray(listeners[prop].handlerArray)
				) {
					listeners[prop].handlerArray.push(xItemInnerEventHandler);
				} else {
					listeners[prop] = (...args: any) => {
						xU.each(listeners[prop].handlerArray, listener => {
							listener?.apply(configs, args);
						});
					};
					listeners[prop].handlerArray = [xItemInnerEventHandler];
				}
			}

			/* listenners默认都是EventHandler */
			xU.each(listeners, (value, prop) =>
				makeEventHandlerSupportMultiple(prop, value)
			);
			xU.each(configs, (value, prop) => {
				/* FIX: 监听函数单独出来。listener不知道在哪里被覆盖了，inputPassword  被 pop 包裹，childListener被修改了,UI库？？*/
				if (xU.isListener(prop)) {
					makeEventHandlerSupportMultiple(prop, value);
				}
			});
			xU.each($attrs, (value, prop) => {
				/* FIX: 监听函数单独出来。listener不知道在哪里被覆盖了，inputPassword  被 pop 包裹，childListener被修改了,UI库？？*/
				if (xU.isListener(prop)) {
					makeEventHandlerSupportMultiple(prop, value);
				}
			});
			return { listeners, propsWillDeleteFromConfigs: [...propsSet] };
		})();

		return {
			/* 因修改configs属性，触发的UI刷新 */
			rerenderCount: 0,
			/* validateInfo */
			isRequired: false,
			/* validateInfo */
			properties: null,
			itemSlots: {},
			listeners,
			propsWillDeleteFromConfigs,
			isChecking: false,
			itemTips: {
				msg: "",
				type: ""
			}
		};
	},
	computed: {
		privateValue: {
			get() {
				const vm = this;
				/* v-model的优先级更高，如果有，就优先选modelValue */
				if (vm.isUseModelValue) {
					return vm.modelValue;
				} else if (xU.isObjSetAttr(vm.configs)) {
					/* configs.value */
					return vm.configs.value;
				} else {
					throw new Error(DID_NOT_SET_VALUE);
				}
			},
			set(val) {
				const diffRes = diff(this.privateValue, val);
				if (!diffRes) {
					xU("diff xItem value", diffRes);
					return;
				}
				if (this.isUseModelValue) {
					/* 双向绑定 */
					this.$emit("update:modelValue", val);
				} else if (xU.isObjSetAttr(this.configs)) {
					/* configs.value */
					this.configs.value = val;
				} else {
					throw new Error(DID_NOT_SET_VALUE);
				}
			}
		},
		afterControllVNode() {
			if (this.afterControll) {
				return this.afterControll.call(this, this);
			} else {
				return null;
			}
		},
		afterControll() {
			return this.configs?.afterControll || this.$slots.afterControll || false;
		},
		isUseModelValue() {
			return this.modelValue !== UNUSE_V_MODEL;
		},
		CurrentXItem() {
			if (xU.isObject(this.configs.itemType)) {
				if (isProxy(this.configs.itemType)) {
					return toRaw(this.configs.itemType);
				}
				return this.configs.itemType;
			}
			/* String */
			return renders[this.configs.itemType] || renders.Input;
		},
		itemTypeName() {
			if (xU.isString(this.configs.itemType)) {
				return String(this.configs.itemType);
			}
			return "";
		},
		/* 组件唯一标识 */
		xItem_id() {
			return `xItem_${this._.uid}`;
		},
		/* 提示信息的类型及提示信息 */
		itemWrapperClass() {
			return [
				this.configs.itemWrapperClass,
				/*flex 一般与从简在同一行*/
				"x-item-wrapper flex middle",
				this.itemTips.type === TIPS_TYPE.error ? "x-form-item-has-error" : ""
			].join(" ");
		},
		/* VNode */
		tipsVNode() {
			if (this.isChecking) {
				return (
					<div>
						<div data-type="checking">checking...</div>
					</div>
				);
			}

			if (this.configs.tipsVNodeRender) {
				return this.configs.tipsVNodeRender({
					xItem: this,
					configs: this.configs,
					itemTips: this.itemTips
				});
			}

			if (this.itemTips.msg) {
				if (this.itemTips.type === TIPS_TYPE.error) {
					return (
						<div class={domClass.tipsError}>
							<div data-type="error">{this.itemTips.msg}</div>
						</div>
					);
				}
			}
			return null;
		},
		/* 表单label 如果有提供String类型，就显示 */
		labelVNode() {
			const classString = this.isRequired ? "x-form-item-required" : "";

			if (this.configs.labelVNodeRender) {
				return this.configs.labelVNodeRender(this.configs, classString);
			}

			if (!this.Cpt_label) {
				return null;
			}

			return (
				<div class="x-form-item-label">
					<label class={classString}>{this.Cpt_label}</label>
				</div>
			);
		}
		/* VNode */
	},
	watch: {
		$attrs: {
			handler() {
				this.setProperties();
			}
		},
		rerenderCount: {
			handler() {
				this.setProperties();
			}
		},
		configs: {
			handler() {
				this.setProperties();
			}
		},
		"configs.options": {
			handler(value) {
				this.setProperties();
			}
		},
		/* 修改rules Array 要求全量替换 */
		"configs.rules": {
			immediate: true,
			handler(rules) {
				this.updateValidateInfo(rules);
			}
		},
		"configs.slots": {
			immediate: true,
			handler(slots) {
				if (slots) {
					this.updateItemSlots();
				}
			}
		}
	},
	created() {
		const vm = this;
		X_ITEM_COLLECTION[vm.xItem_id] = vm;
		/*[似乎] Vue3 用的是类方法不是实例方法， (用 debounce,未跟实例绑定，不同实例调用同一个方法只会执行最后一个)*/
		(() => {
			vm.forceUpdateUI = xU.debounce(() => vm.rerenderCount++, 64);
		})();

		(() => {
			vm.configs._$updateUI = newConfigs => {
				xU.each(newConfigs, (value, prop) => {
					vm.configs[prop] = value;
				});
				vm.forceUpdateUI();
			};
		})();

		(() => {
			vm.setProperties = xU.debounce(function setProperties(this: any) {
				/* @ts-ignore */
				const __properties = {};
				const pickProps = (originConfigs: any) => {
					xU.each(originConfigs, (item, prop) => {
						/* 用于xForm 控件，以下配置信息跟UI库控件相关，用不上，遂删除 */
						if (WILL_DELETE.includes(prop)) {
							return;
						}
						if (["placeholder"].includes(prop) && xU.isFunction(item)) {
							__properties[prop] = item(this);
							return;
						}
						__properties[prop] = item;
					});
				};
				xU.each([this.configs, this.$attrs], pickProps);
				this.properties = __properties;
			}, 32);
			vm.setProperties();
		})();
	},
	mounted() {
		if (this.configs?.once) {
			this.configs.once.call(this.configs, this);
		}
	},
	beforeUnmount() {
		delete X_ITEM_COLLECTION[this.xItem_id];
	},
	methods: {
		async validate() {
			this.isChecking = true;
			try {
				const vm = this;
				if (xU.isArrayFill(vm.configs?.rules)) {
					for await (const rule of vm.configs.rules) {
						const msg = await rule.validator(vm.privateValue, { vm });
						if (msg) {
							vm.itemTips.msg = msg;
							vm.itemTips.type = TIPS_TYPE.error;
							break;
						} else {
							vm.itemTips.msg = "";
							vm.itemTips.type = "";
						}
					}
				}
				return vm.itemTips.msg;
			} catch (error) {
				console.error(error);
			} finally {
				this.isChecking = false;
			}
		},
		async checkXItem() {},
		updateItemSlots() {
			this.itemSlots = this.configs.slots || {};
		},
		updateValidateInfo(rules: any) {
			/* 修改rules Array 要求全量替换 */
			let isRequired = false;
			if (xU.isArrayFill(rules)) {
				/* 如果有必填项 */
				isRequired = xU.some(rules, { name: "required" });
			}
			if (this.isRequired !== isRequired) {
				this.isRequired = isRequired;
			}
		}
	},
	render() {
		if (xU.isUndefined(this.Cpt_isShowXItem)) {
			throw new Error("未使用defItem定义xItem配置项");
		}
		if (!this.properties) {
			return null;
		}
		if (!this.Cpt_isShowXItem) {
			return null;
		}
		const {
			CurrentXItem,
			properties,
			Cpt_isDisabled,
			propsWillDeleteFromConfigs,
			itemTypeName,
			xItem_id
		} = this;

		return (
			<div id={xItem_id} class={this.itemWrapperClass}>
				{/* label */}
				{this.labelVNode}
				{/* 控件 */}
				<div class="x-form-item-control" data-x-item-type={itemTypeName}>
					<CurrentXItem
						data-current-item-label={properties.label}
						data-current-item-prop={properties.prop}
						data-current-item-type={itemTypeName}
						propsWillDeleteFromConfigs={propsWillDeleteFromConfigs}
						properties={{
							...properties,
							value: this.privateValue,
							disabled: Cpt_isDisabled
						}}
						listeners={this.listeners}
						slots={this.itemSlots}
					/>
					{/* 提示信息 */}
					{this.tipsVNode}
				</div>
				{this.afterControllVNode}
			</div>
		);
	}
});
