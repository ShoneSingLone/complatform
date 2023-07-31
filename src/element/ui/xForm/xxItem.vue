<template>
	<div class="gh-item-wrapper flex middle" :data-form-item-id="cpt_id">
		<label class="gh-item_label" v-if="cpt_label">
			<span v-if="cpt_isRequired" class="gh-item_label-required">*</span>
			<span>{{ cpt_label }}:</span>
		</label>
		<div class="gh-item_controller">
			<!-- 子组件都需要实现 v-model value change  -->
			<component
				:is="componentTag"
				v-model="p_value"
				v-bind="cpt_bindProps"
				v-on="p_listeners" />
			<span v-if="errorTips" class="gh-item_error-msg">{{ errorTips }}</span>
		</div>
	</div>
</template>

<script>
export default async function () {
	const { EVENT_ARRAY } = await _$loadSFC(
		"/assets/components/BussnissComponents/GhItemMixins.vue"
	);

	/* onAfterValueChange */
	return {
		props: ["configs", "value", "ghformitems"],
		provide() {
			const GhItem = this;
			return {
				GhItem: GhItem
			};
		},
		model: {
			prop: "value",
			event: "change"
		},
		created() {
			Vue.GH_FORM_ITEM_MAP = Vue.GH_FORM_ITEM_MAP || new Map();
			Vue.GH_FORM_ITEM_MAP[this.cpt_id] = this;
		},
		beforeDestroy() {
			delete Vue.GH_FORM_ITEM_MAP[this.cpt_id];
		},
		mounted() {
			if (this.configs?.once) {
				this.configs.once.call(this, { configs: this.configs });
			}
			if (this.configs.options) {
				this.$watch("configs.options", this.setProps);
			}
			if (this.configs.style) {
				this.$watch("configs.style", this.setStyle);
			}
			if (this.configs.attrs) {
				this.$watch("configs.attrs", this.setAttrs);
			}
			if (this.configs.multiple) {
				this.$watch("configs.multiple", this.setAttrs);
			}
			if (this.configs.value !== undefined) {
				this.$watch("configs.value", this.emitValueChange);
			}
			if (this.value !== undefined) {
				this.$watch("value", this.emitValueChange);
			}
			this.setStyle();
			this.setProps();
			this.setAttrs();
			this.setListeners();
		},
		computed: {
			p_value: {
				get() {
					const isValueUndefined = this.value === undefined;
					const isModelValueUndefined = this.configs?.value === undefined;
					return (() => {
						if (!isValueUndefined) {
							return this.value;
						}
						if (!isModelValueUndefined) {
							return this.configs.value;
						}
						alert("eigther v-model or configs has value property");
					})();
				},
				set(val) {
					this.emitValueChange(val);
					return;
				}
			},
			cpt_bindProps() {
				return {
					style: this.p_style,
					class: this.cpt_class,
					...this.p_props,
					...this.p_attrs
				};
			},
			cpt_class() {
				return {
					"form-controller": true,
					[this.componentTag]: true
				};
			},
			cpt_id() {
				return `gh_form_id_${this._uid}`;
			},
			cpt_label() {
				return this.configs?.label;
			},
			cpt_isRequired() {
				try {
					return _.some(this.configs.rules, rule => rule.name === "required");
				} catch (error) { }
				return false;
			},
			cpt_rulesByTrigger() {
				return (
					_.reduce(
						this.configs?.rules,
						(rulesByTrigger, rule) => {
							_.each(rule.trigger, triggerName => {
								rulesByTrigger[triggerName] = rulesByTrigger[triggerName] || [];
								rulesByTrigger[triggerName].push(rule);
							});
							return rulesByTrigger;
						},
						{}
					) || {}
				);
			},
			cpt_disabled() {
				const vm = this;
				if (_.isBoolean(vm.configs?.disabled)) {
					return vm.configs.disabled;
				}

				if (_.isFunction(vm.configs?.disabled)) {
					return vm.configs.disabled();
				}
				return false;
			},
			itemType() {
				const itemType = Object.keys(this.configs).find(name => /^GhItem/.test(name));
				if (itemType) {
					return itemType;
					const item = String(itemType).match(/^GhItem(.*)/)[1];
					return `Gh${item}`;
				}
				/*默认是Input*/
				return this.configs.itemType || "input";
			},
			componentTag() {
				const COMPONENT_MAP = {
					select: "gh-select",
					checkboxGroup: "gh-checkbox-group",
					datetime: "gh-datetime",
					time: "gh-time",
					input: "gh-input",
					checkbox: "gh-checkbox",
					textarea: "gh-textarea"
				};

				return COMPONENT_MAP[this.itemType] || this.itemType;
			}
		},
		data() {
			const vm = this;
			vm.emitValueChange = _.debounce(vm.emitValueChange, 32);
			setTimeout(() => {
				/* 前3s（即初始化之后）不校验， */
				vm.p_debounceValidate = _.debounce(vm.validate, 1000);
			}, 1000 * 3);
			return {
				errorTips: "",
				p_style: {},
				p_props: {},
				p_attrs: {},
				p_listeners: {}
			};
		},
		watch: {
			/* attrs */
			cpt_disabled: {
				immediate: true,
				handler() {
					this.setAttrs();
				}
			}
		},
		methods: {
			emitValueChange(val) {
				if (val === this.emitValueChange.val) {
					return;
				} else {
					this.emitValueChange.val = val;
				}
				if (this.configs?.value !== undefined) {
					this.configs.value = val;
				}
				this.$emit("change", val);
				if (this.configs?.onAfterValueChange) {
					this.configs.onAfterValueChange(val);
				}
				const rule = this.cpt_rulesByTrigger["change"];
				if (rule) {
					this.debounceValidate();
				}
			},
			debounceValidate() {
				if (this.p_debounceValidate) {
					/* 表单初始化之后的数据3s内不检查 */
					this.p_debounceValidate();
				}
			},
			async validate() {
				const vm = this;
				if (vm.configs.rules && vm.configs.rules.length > 0) {
					for await (const rule of vm.configs.rules) {
						const msg = await rule.validator({ val: vm.value, vm });
						if (msg) {
							vm.errorTips = msg;
							break;
						} else {
							vm.errorTips = "";
						}
					}
				}
				return vm.errorTips;
			},
			setStyle() {
				this.p_style = (() => {
					return _.merge(
						{
							width: "100%"
						},
						this.configs.style
					);
				})();
			},
			setProps() {
				const vm = this;
				this.p_props = {
					...(vm.configs.props || {}),
					configs: vm.configs
				};
				if (["select", "checkboxGroup"].includes(vm.itemType)) {
					this.p_props.options = vm.configs.options || [];
				}
			},
			setAttrs() {
				const vm = this;
				const clearable =
					vm.configs.clearable === undefined ? true : vm.configs.clearable;
				const disabled = vm.cpt_disabled || false;
				this.p_attrs = {
					...(vm.configs.attrs || {}),
					clearable,
					disabled,
					multiple: !!vm.configs?.multiple,
					placeholder: vm.configs.placeholder || ""
				};
			},
			setListeners() {
				const vm = this;
				const handleListener = (listeners, eventName) => {
					listeners[eventName] = function (value, $event) {
						const rule = vm.cpt_rulesByTrigger[eventName];
						if (rule) {
							vm.debounceValidate();
						}
						vm.$emit(eventName, value);
					};
					return listeners;
				};

				this.p_listeners = EVENT_ARRAY.reduce(handleListener, {});
			}
		}
	};
}
</script>

<style>
.gh-item-wrapper+.gh-item-wrapper {
	margin-top: 24px;
}

.gh-item_label {
	width: 120px;
	text-align: right;
	margin-right: 16px;
}

.gh-item_label-required {
	color: var(--app-danger, #f66f6a);
}

.gh-item_controller {
	flex: 1;
}

.gh-item_controller>[class^="el-"] {
	width: 100%;
}

.gh-item_error-msg {
	height: 20px;
	line-height: 20px;
	margin-top: 4px;
	color: var(--app-danger, #f66f6a);
}
</style>
