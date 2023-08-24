<template>
	<ElCard class="flex1">
		<xForm
			class="flex vertical"
			:label-style="{ 'min-width': '120px', width: 'unset' }">
			<template v-for="(item, prop) in formItems" :key="prop">
				<xGap t="10" />
				<xItem :configs="item" />
			</template>
		</xForm>
	</ElCard>
	<xDialogFooter :configs="dialogDefautBtn" />
</template>

<script lang="jsx">
import { defineComponent } from "vue";
import { xU, defItem, stateUI } from "@/ventose/ui";
import { FormRules } from "@/utils/common.FormRules";
import { ItemUAC } from "@/components/ItemRender/ItemUAC";

const { xI } = stateUI;

export default defineComponent({
	props: {
		/* Dialog 默认传入参数 */
		propOptions: {
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
				member_uids: defItem({
					value: [],
					itemType: ItemUAC,
					label: xI("用户名"),
					rules: [FormRules.required()]
				}),
				role: defItem({
					value: "dev",
					itemType: "Select",
					label: xI("权限"),
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
	computed: {
		dialogDefautBtn() {
			return {
				onCancel: this.propOptions.$close,
				onOk: () => {
					this.propOptions.onOk({
						formItems: this.formItems,
						$close: this.propOptions.$close
					});
				}
			};
		}
	}
});
</script>
