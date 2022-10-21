<template>
	<aCard>
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
import { xItemUAC } from "ysrc/components/xItemRender/xItemUAC";

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
			formItems: {
				...defItem({
					prop: "newGroupName",
					value: "",
					label: $t("分组名").label,
					placeholder: $t("请输入分组名称").label,
					rules: [FormRules.required()]
				}),
				...defItem({
					isTextarea: true,
					prop: "newGroupDesc",
					value: "",
					label: $t("简介").label,
					placeholder: "请输入分组描述",
					rules: [FormRules.required()]
				}),
				...defItem({
					itemType: xItemUAC,
					prop: "owner_uids",
					value: "",
					label: $t("组长").label,
					placeholder: "请输入分组描述",
					rules: [FormRules.required()]
				})
			}
		};
	},
	mounted() {
		this.options.vm = this;
	}
});
</script>
