import { validateForm, AllWasWell, pickValueFrom, UI } from "@ventose/ui";
import { FormRules } from "@ventose/ui";
import { defItem, _ } from "@ventose/ui";
import { defineComponent } from "vue";
import { API } from "../../../api";
import { Cpt_currProject, State_App } from "../../../state/State_App";

export const DialogAddCategory = defineComponent({
	props: {
		/* Dialog 默认传入参数 */
		options: {
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
		this.options.vm = this;
	},

	methods: {
		async submit() {
			const validateResults = await validateForm(this.dataXItem);
			if (AllWasWell(validateResults)) {
				const { name, desc } = pickValueFrom(this.dataXItem);
				const project_id = Cpt_currProject.value._id;
				try {
					const res = await API.project.addInterfaceCategory({
						project_id,
						name,
						desc
					});
					if (res) {
						return true;
					}
				} catch (error) {
					UI.message.error("添加失败");
				}
			}
		}
	},
	render() {
		return (
			<div class="g-row flex1 height100">
				<div class="g-row m-container">
					<xForm
						class="flex vertical"
						labelStyle={{ "min-width": "120px", width: "unset" }}>
						{_.map(this.dataXItem, (configs, prop) => {
							return (
								<>
									<xGap t="10" />
									<xItem configs={configs} />
								</>
							);
						})}
					</xForm>
				</div>
			</div>
		);
	}
});
