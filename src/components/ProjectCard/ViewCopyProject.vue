<template>
	<ElCard class="flex1">
		<ElAlert :message="alertMessage" type="info" />
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
import {
	AllWasWell,
	defItem,
	FormRules,
	pickValueFrom,
	UI,
	validateForm
} from "@ventose/ui";
import {
	xItem_ProjectIcon,
	xItem_ProjectName
} from "../../containers/Group/AddProject/DialogAddProject";

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
	methods: {
		async onOk() {
			const validateResults = await validateForm(this.formItems);
			if (AllWasWell(validateResults)) {
				const { name, icon } = pickValueFrom(this.formItems);
				try {
					await this.propDialogOptions.copyProject({
						newProjectName: name,
						icon
					});
					this.propDialogOptions.closeDialog();
				} catch (error) {
					console.error(error);
					UI.message.error("复制失败");
				}
			} else {
				throw new Error("未通过验证");
			}
		}
	},
	computed: {
		propProjectName() {
			return String(this.propDialogOptions?.projectName || "");
		},
		dialogDefautBtn() {
			return {
				textOk: this.$t("复制").label,
				onCancel: this.propDialogOptions.closeDialog,
				onOk: this.onOk
			};
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
									if (value === vm.propDialogOptions.projectName) {
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
	}
});
</script>
