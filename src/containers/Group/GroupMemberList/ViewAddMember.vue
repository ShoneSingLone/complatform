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
import { xU, defItem, State_UI, FormRules } from "@ventose/ui";
import { ItemUAC } from "@/components/ItemRender/ItemUAC";

const { $t } = State_UI;

export default defineComponent({
	props: {
		/* Dialog 默认传入参数 */
		propDialogOptions: {
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
					value: [],
					prop: "member_uids",
					itemType: ItemUAC,
					label: $t("用户名").label,
					rules: [FormRules.required()]
				}),
				...defItem({
					value: "dev",
					prop: "role",
					itemType: "Select",
					label: $t("权限").label,
					rules: [FormRules.required()],
					options: [
						{ label: "组长", value: "owner" },
						{ label: "开发者", value: "dev" },
						{ label: "访客", value: "guest" }
					]
				})
			}
		};
	},
	mounted() {
		this.propDialogOptions.vm = this;
	}
});
</script>
