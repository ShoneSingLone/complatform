import {
	itemsInvalid,
	defItem,
	setValueTo,
	pickValueFrom,
	xU,
	xI
} from "@/ventose/ui";
import { FormRules } from "@/utils/common.FormRules";
import { defineComponent } from "vue";
import { API } from "@/api";
import { stateApp } from "@/state/app";
import { stateInterface } from "@/state/interface";

export const DialogUpsertCategory = defineComponent({
	props: {
		/* Dialog 默认传入参数 */
		propOptions: {
			type: Object,
			default() {
				return { __elId: false };
			}
		}
	},
	setup() {
		return { stateApp };
	},
	data() {
		return {
			dataXItem: {
				name: defItem({
					value: "",
					label: "分类名",
					placeholder: "分类名称",
					rules: [FormRules.required("请输入分类名称!")]
				}),
				desc: defItem({
					value: "",
					label: "备注",
					isTextarea: true,
					showCount: true,
					maxlength: 144
				})
			}
		};
	},
	mounted() {
		this.initForm();
	},
	computed: {
		category() {
			if (this.propOptions.payload.category) {
				return this.propOptions.payload.category;
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
			if (!(await itemsInvalid())) {
				const { name, desc } = pickValueFrom(this.dataXItem);
				const project_id = this.stateApp.currProject._id;
				try {
					if (this.category) {
						await this.updateOldCategory({ name, desc, project_id });
					} else {
						await this.insertNewCategory({ name, desc, project_id });
					}
					stateInterface._updateInterfaceMenuList();
					this.propOptions.$close();
				} catch (error) {
					if (this.category) {
						xU.message.error(xI("修改_失败", { title: "分类" }));
					} else {
						xU.message.error(xI("添加_失败", { title: "分类" }));
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
				xU.message.success(xI("添加_成功", { title: "分类" }));
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
				xU.message.success(xI("修改_成功", { title: "分类" }));
			} else {
				throw new Error("");
			}
		}
	},
	render() {
		return (
			<>
				<div class="x-dialog-boddy-wrapper">
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
				</div>
				<xDialogFooter
					configs={{
						onCancel: this.propOptions.$close,
						onOk: this.onOk
					}}
				/>
			</>
		);
	}
});
