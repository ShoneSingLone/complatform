<template>
	<aCard>
		<aAlert :message="alertMessage" type="info" />
		<xForm
			class="flex vertical"
			:label-style="{ 'min-width': '120px', width: 'unset' }">
			<template v-for="(item, prop) in formItems" :key="prop">
				<xGap t="10" />
				<xItem :configs="item" />
			</template>
		</xForm>
	</aCard>
</template>

<script lang="jsx">
import { defineComponent } from "vue";
import { _, defItem, State_UI, FormRules } from "@ventose/ui";
import optionsXItem from "@/utils/common.options.xIcon";

const { $t } = State_UI;

export default defineComponent({
	props: {
		/* Dialog 默认传入参数 */
		options: {
			type: Object,
			default() {
				return { __elId: false };
			}
		}
	},
	data() {
		const vm = this;
		return {
			alertMessage: `该操作将会复制 ${this.options.projectName} 下的所有接口集合，但不包括测试集合中的接口`,
			formItems: {
				...defItem({
					value: this.options.projectName,
					prop: "projectName",
					label: $t("项目名称").label,
					rules: [
						FormRules.required(),
						FormRules.custom({
							validator(value, { configs, rule }) {
								if (value === vm.options.projectName) {
									rule.msg = "不能与原项目名相同";
									return FormRules.FAIL;
								} else {
									return FormRules.SUCCESS;
								}
							}
						})
					]
				}),
				...defItem({
					value: "privateNet",
					prop: "role",
					itemType: "Select",
					label: $t("图标").label,
					rules: [FormRules.required()],
					options: _.map(optionsXItem, value => {
						return {
							label: <span><xIcon icon={value} /><span class="ml10">{value}</span></span>,
							value
						};
					})
				})
			}
		};
	},
	mounted() {
		this.options.vm = this;
	}
});
</script>
