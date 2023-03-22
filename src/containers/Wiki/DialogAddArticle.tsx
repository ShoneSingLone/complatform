import {
	validateForm,
	AllWasWell,
	pickValueFrom,
	UI,
	defItem,
	xU,
	setValueTo,
	$t
} from "@ventose/ui";
import { defineComponent, markRaw } from "vue";
import { API } from "@/api";
import { State_App } from "@/state/State_App";
import {
	Methods_ProjectInterface,
	State_ProjectInterface
} from "@/containers/Project/Interface/State_ProjectInterface";
import { FormRules } from "@/utils/common.FormRules";
import { ITEM_OPTIONS } from "@/utils/common.options";
import { Cpt_url } from "@/router/router";
import { Methods_Wiki } from "./State_Wiki";
import { ARTICLE } from "@/utils/variable";

export const DialogAddArticle = defineComponent({
	props: {
		/* Dialog 默认传入参数 */
		propDialogOptions: {
			type: Object,
			default() {
				return { __elId: false };
			}
		}
	},
	setup() {
		return { State_App };
	},
	data() {
		const vm = this;
		return {
			dataXItem: {
				...defItem({
					prop: "type",
					value: ARTICLE,
					label: $t("类型").label,
					itemType: "RadioGroup",
					options: ITEM_OPTIONS.wikiType,
					onAfterValueEmit() {
						const label =
							this.value === "folder"
								? $t("文件夹名称").label
								: $t("文档名称").label;
						vm.dataXItem.title._$updateUI({
							label,
							placeholder: label
						});
					}
				}),
				...defItem({
					value: "",
					prop: "title",
					label: $t("文档名称").label,
					placeholder: $t("文档名称").label,
					rules: [FormRules.required()]
				})
			}
		};
	},
	computed: {
		pid() {
			const _id = this.propDialogOptions.parentDoc?._id;
			return _id || 0;
		}
	},
	mounted() {
		this.propDialogOptions.vm = this;
	},
	methods: {
		async onOk() {
			const validateResults = await validateForm(this.dataXItem);
			if (AllWasWell(validateResults)) {
				const { title, type } = pickValueFrom(this.dataXItem);
				const params = {
					title,
					type,
					p_id: this.pid
				};
				try {
					const { data } = await API.wiki.action({
						action: "upsertOne",
						data: params
					});

					if (data) {
						UI.message.success("添加接口成功");
						Methods_Wiki.updateWikiMenuList();
						Methods_Wiki.setCurrentWiki(data.msg._id);
						this.propDialogOptions.closeDialog();
					}
				} catch (error) {
					UI.message.error("添加失败");
				}
			}
		}
	},
	render() {
		return (
			<>
				<div class="g-row flex1 height100">
					<xGap t="10" />
					<aAlert
						message={this.$t("保存标题后再编辑文档内容").label}
						type="info"
						closable
						className="width100"
					/>
					<xForm
						class="flex vertical"
						labelStyle={{ "min-width": "120px", width: "unset" }}>
						{xU.map(this.dataXItem, (configs, prop) => {
							return (
								<>
									<xGap t="10" />
									<xItem configs={configs} />
								</>
							);
						})}
					</xForm>
					<xGap t="10" />
				</div>
				<xDialogFooter
					configs={{
						onCancel: this.propDialogOptions.closeDialog,
						onOk: this.onOk
					}}
				/>
			</>
		);
	}
});
