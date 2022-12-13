import { validateForm, AllWasWell, pickValueFrom, UI } from "@ventose/ui";
import { defItem, xU, FormRules, setValueTo } from "@ventose/ui";
import { defineComponent } from "vue";
import { API } from "../../../api";
import { State_App } from "../../../state/State_App";
import { Methods_Project } from "./State_Project";

export const DialogUpsertCategory = defineComponent({
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
		return {
			dataXItem: {
				...defItem({
					value: "",
					prop: "name",
					label: "分类名",
					placeholder: "分类名称",
					rules: [FormRules.required("请输入分类名称!")]
				}),
				...defItem({
					value: "",
					prop: "desc",
					label: "备注",
					isTextarea: true,
					showCount: true,
					maxlength: 144
				})
			}
		};
	},
	mounted() {
		this.propDialogOptions.vm = this;
		this.initForm();
	},
	computed: {
		category() {
			if (this.propDialogOptions.category) {
				return this.propDialogOptions.category;
			} else {
				return false;
			}
		}
	},
	methods: {
		initForm() {
			if (this.category) {
				setValueTo(this.dataXItem, this.category);
			}
		},
		async onOk() {
			const validateResults = await validateForm(this.dataXItem);
			if (AllWasWell(validateResults)) {
				const { name, desc } = pickValueFrom(this.dataXItem);
				const project_id = this.State_App.currProject._id;
				try {
					if (this.category) {
						await this.updateOldCategory({ name, desc, project_id });
					} else {
						await this.insertNewCategory({ name, desc, project_id });
					}
					Methods_Project.updateInterfaceMenuList();
					this.propDialogOptions.closeDialog();
				} catch (error) {
					if (this.category) {
						UI.message.error(this.$t("修改_失败", { title: "分类" }).label);
					} else {
						UI.message.error(this.$t("添加_失败", { title: "分类" }).label);
					}
				}
			}
		},
		async insertNewCategory({ name, desc, project_id }) {
			const res = await API.project.addInterfaceCategory({
				project_id,
				name,
				desc
			});
			if (res) {
				UI.message.success(this.$t("添加_成功", { title: "分类" }).label);
			} else {
				throw new Error("");
			}
		},
		async updateOldCategory({ name, desc, project_id }) {
			const res = await API.project.updateInterfaceCategory({
				project_id,
				catid: this.category._id,
				name,
				desc
			});
			if (res) {
				UI.message.success(this.$t("修改_成功", { title: "分类" }).label);
			} else {
				throw new Error("");
			}
		}
	},
	render() {
		return (
			<>
				<div class="g-row flex1 height100 ">
					<xGap t="10" />
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
					<xGap b="38" />
				</div>
				<xDialogFooter configs={{ onCancel: this.propDialogOptions.closeDialog, onOk: this.onOk }} />
			</>
		);
	}
});
