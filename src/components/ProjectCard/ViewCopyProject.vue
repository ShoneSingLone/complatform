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
import {
	xItem_ProjectIcon,
	xItem_ProjectName
} from "../../containers/Group/AddProject/DialogAddProject";

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
	computed: {
		propProjectName() {
			return String(this.options?.projectName || "");
		}
	},
	data() {
		const vm = this;
		return {
			alertMessage: `该操作将会复制 ${this.propProjectName} 下的所有接口集合，但不包括测试集合中的接口`,
			formItems: {
				...defItem(
					xItem_ProjectName({
						value: this.propProjectName,
						appendRules: [
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
					})
				),
				...defItem(xItem_ProjectIcon())
			}
		};
	},
	mounted() {
		this.options.vm = this;
	}
});
</script>
