import { diff } from "jsondiffpatch";
import { xU } from "@/ventose/ui";
import { stateApp } from "@/state/app";
import { defineComponent, toRaw, toRefs } from "vue";
import { FormRules } from "@/utils/common.FormRules";

export function makeKeyValueObj(i: any) {
	return { key: i.name, value: i.value };
}
export function makeNameValueObj(i: any) {
	return { name: i.key, value: i.value };
}
export function orderAsc(a, b) {
	return a - b < 0 ? -1 : 1;
}

/* 只能处理全量的upsert，因为没有保留_id这样的信息，方便diff的时候做判断 */
export const InputKeyValue = defineComponent({
	props: [
		"modelValue",
		/* fnCheck 提供额外的校验方法，满足基本的校验之后，由外部规则决定是否通过 */
		"genItem",
		/* fnCheck 提供额外的校验方法，满足基本的校验之后，由外部规则决定是否通过 */
		"fnCheck"
	],
	emits: ["update:modelValue"],
	setup() {
		return { stateApp };
	},
	data() {
		return { privateItems: {}, isLoading: true };
	},
	watch: {
		modelValue: {
			deep: true,
			handler() {
				const diffContent = toRaw(diff(this.modelValue, this.oldItems));
				if (diffContent) {
					this.setPrivateItems();
				}
			}
		},
		formData() {
			this.isLoading = true;
			this.checkFormDataDebounce();
		}
	},
	mounted() {},
	computed: {
		formData() {
			const formData = xU.reduce(
				this.privateItems,
				(formData, privateTag, prop) => {
					formData[prop] = {
						key: privateTag.keyConfigs.value,
						value: privateTag.valueConfigs.value
					};
					return formData;
				},
				{}
			);
			return formData;
		}
	},
	methods: {
		setPrivateItems() {
			const { modelValue } = this;
			this.oldItems = modelValue;
			const vm = this;
			if (xU.isArrayFill(modelValue)) {
				let index = 1;
				vm.privateItems = xU.reduce(
					modelValue,
					(_items, tag) => {
						_items[index] = vm.genItem({
							...tag,
							index
						});
						++index;
						return _items;
					},
					{}
				);
			} else {
				vm.privateItems = { 0: vm.genItem({ index: 0 }) };
			}
		},
		checkFormDataDebounce: xU.debounce(function () {
			if (this.isFormDataOk()) {
				const keys = Object.keys(this.formData).map(Number).sort(orderAsc);
				const value = xU.reduce(
					keys,
					(_value, prop) => {
						const item = this.formData[prop];
						if (xU.isInput(item.key)) {
							_value.push(item);
						}
						return _value;
					},
					[]
				);
				this.$emit("update:modelValue", value);
			}
			this.isLoading = false;
		}, 1000),
		isFormDataOk() {
			const res = xU.map(this.formData, ({ key }, prop) => {
				if (
					xU.some(this.formData, ({ key: _key }, _index) => {
						if (_index == prop) {
							return false;
						} else {
							return _key === key;
						}
					})
				) {
					this.privateItems[prop].keyConfigs.itemTips = {
						type: "error",
						msg: `${key} 与已有标识重复`
					};
					return;

					FormRules.FAIL;
				} else {
					if (this.fnCheck) {
						const isFail = this.fnCheck(this.privateItems[prop]);
						if (isFail == FormRules.FAIL) {
							return;

							FormRules.FAIL;
						}
					}
					this.privateItems[prop].keyConfigs.itemTips = {
						type: "",
						msg: ""
					};
					return;

					FormRules.SUCCESS;
				}
			});
			return !xU.some(res, i => i === FormRules.FAIL);
		},
		deleteItem(index) {
			const keys = Object.keys(this.privateItems);
			if (keys.length === 1) {
				const prop = keys[0];
				this.privateItems[prop].keyConfigs.value = "";
				this.privateItems[prop].valueConfigs.value = "";
			} else {
				delete this.privateItems[index];
			}
		},
		addItem() {
			const keys = Object.keys(this.privateItems).map(Number).sort(orderAsc);
			const nextIndex = Number(xU.last(keys)) + 1;
			this.privateItems[nextIndex] = this.genItem({ index: nextIndex });
		}
	},
	render() {
		const vm = this;
		return (
			<>
				<div class="ml10 mr10">
					{xU.map(
						this.privateItems,
						({ valueConfigs, keyConfigs, _id }, index) => {
							return (
								<div class="flex mt10 baseline">
									<xItem
										configs={keyConfigs}
										v-model={keyConfigs.value}
										key={`${this._.uid}_key_${index}`}
									/>
									<xGap l="10" />
									<span class="flex middle">
										<xItem
											configs={valueConfigs}
											v-model={valueConfigs.value}
											key={`${this._.uid}_value_${index}`}
										/>
										<xGap l="10" />
										<xIcon
											v-xloading={this.isLoading}
											icon="delete"
											onClick={() => this.deleteItem(index)}
											style="color:red;"
											class="pointer"
										/>
									</span>
								</div>
							);
						}
					)}
				</div>
				<xIcon
					v-xloading={vm.isLoading}
					icon="add"
					style="color:#1890ff;"
					onClick={this.addItem}
					class="pointer mt10 ml10 mb10"
				/>
			</>
		);
	}
});
