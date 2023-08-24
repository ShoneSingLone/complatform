<template>
	<DemoAndCode
		title="基本用法"
		path="/boundless/demo/xForm/DialogDemoXItem.sfc" />
	<DemoAndCode title="slot" path="/boundless/demo/xForm/xItemSlot.sfc" />
	<DemoAndCode
		title="DatePicker"
		path="/boundless/demo/xForm/xItemDatePicker.sfc" />
	<ElCard>
		{{ valueFromConfigs }}
		<xButton :configs="configsValidBtn" />
		<mkit :md="tips1" />
		<span class="mr10">{{ formData.inputValue }}</span>
		<xItem
			:configs="xForm.search"
			class="flex1"
			v-model="formData.inputValue" />
		<mkit :md="tips2" />

		<div class="flex middle mt10">
			<span class="mr10">{{ xForm.slots.value }}</span>
			<xItem :configs="xForm.slots" class="flex1" />
			<span class="mr10">{{ xForm.slotsAddonBefore.value }}</span>
		</div>
		<div class="flex middle mt10">
			<span class="mr10">{{ xForm.select.value }}</span>
			<xItem :configs="xForm.select" class="flex1" />
		</div>
		<xItem
			:configs="xForm.withLabelProperty"
			class="flex1"
			v-model="formData.inputValue" />
	</ElCard>
	<div class="mt10"></div>
	<ElCard>
		<DemoXFormWithForm :options="{ payload: { row: {} } }" />
	</ElCard>
</template>

<script>
import { h, markRaw } from "vue";
import {
	xI,
	AllWasWell,
	components,
	defItem,
	pickValueFrom,
	xU,
	itemsInvalid,
	VNodeCollection
} from "@ventose/ui";
import { FormRules } from "@/utils/common.FormRules";
import { DemoXFormWithForm } from "./DemoXFormWithForm.tsx";

const { xItem } = components;

export default {
	components: {
		DemoXFormWithForm
	},
	methods: {
		valid() {}
	},
	setup(props) {
		return {
			pickValueFrom
		};
	},
	computed: {
		valueFromConfigs() {
			return JSON.stringify(pickValueFrom(this.xForm));
		}
	},
	data() {
		const vm = this;
		const xForm = {
			slotsAddonBefore: defItem({
				value: [],
				itemType: "Select",
				options: [
					{
						label: xI("类型A"),
						value: "AAA"
					},
					{
						label: xI("类型B"),
						value: "BBB"
					}
				],
				style: { width: "80px" }
			}),
			search: defItem({
				placeholder: "Input",
				clearable: true,
				onAfterEmitItemValue(val) {
					console.log("🚀:", "search configs", this, val);
				}
			}),
			withLabelProperty: defItem({
				label: "withLabelProperty",
				placeholder: "Input",
				clearable: true,
				rules: [FormRules.required()]
			}),
			slots: defItem({
				label: "slots",
				value: "slots的value",
				placeholder: "Input",
				clearable: true,
				once() {
					const vDomSlotsSelector = h(xItem, {
						configs: vm.xForm.slotsAddonBefore
					});
					this.slots = markRaw({
						addonBefore: () => vDomSlotsSelector
					});
				},
				rules: [FormRules.required()]
			}),
			withLabelProperty: defItem({
				labelVNodeRender: VNodeCollection.labelTips(
					h(
						"ul",
						null,
						[
							xI(`只能由英文字母(区分大小写)、数字和特殊字符@.\\_-组成`).label,
							xI(`不能以"op_svc"、"paas_op"或\\开头`).label,
							xI(`不能以\\结尾`).label,
							xI(`不能命名为"admin"、"power_user"或"guest"`).label,
							xI(`长度范围是4到32位`).label
						].map(content => h("li", null, content))
					)
				),
				label: xI("label使用Tips"),
				placeholder: "Input",
				clearable: true,
				rules: [FormRules.required()]
			}),
			select: defItem({
				value: [],
				label: xI("类型"),
				itemType: "Select",
				options: [
					{
						label: xI("类型A"),
						value: "AAA"
					},
					{
						label: xI("类型B"),
						value: "BBB"
					}
				],
				mode: "multiple",
				maxTagCount: 1,
				maxTagTextLength: 10,
				style: { width: "200px" }
			})
		};
		return {
			configsValidBtn: {
				text: "校验",
				async onClick() {
					try {
						if (!(await itemsInvalid())) {
							xU.message.success("校验成功");
						} else {
							xU.message.error("校验失败");
						}
					} catch (error) {
						xU.notification.error(error?.message || "错误");
					}
				}
			},
			formData: {
				inputValue: "v-model"
			},
			xForm,
			tips1: `###
\`\`\`js
<xItem :configs="xForm.search" class="flex1" v-model="formData.inputValue" />
formData: {
	inputValue: "v-model"
},
search:defItem({
	placeholder: "Input",
	clearable: true,
	onAfterEmitItemValue(val) {
		console.log("🚀:", "search configs", this, val);
	}
}),
\`\`\`
`,
			tips2: `### 只使用configs绑定数据
>必须有**value**属性
\`\`\`js
<xItem :configs="xForm.select" class="flex1" />
/* 必须有value属性 */
select:defItem({
	value: [],
	label: xI("类型"),
	itemType: "Select",
	options: [
		{
			label: xI("类型A"),
			value: "AAA"
		},
		{
			label: xI("类型B"),
			value: "BBB"
		}
	],
	mode: "multiple",
	maxTagCount: 1,
	maxTagTextLength: 10,
	style: { width: "200px" }
})
\`\`\`
`
		};
	}
};
</script>

<style></style>
