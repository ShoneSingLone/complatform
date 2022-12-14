import { validateForm, AllWasWell, pickValueFrom, UI } from "@ventose/ui";
import { defItem, _, setValueTo } from "@ventose/ui";
import { defineComponent, markRaw } from "vue";
import { API } from "../../../api";
import { Cpt_currProject, State_App } from "../../../state/State_App";
import { State_Interface } from "./State_Interface";
import { FormRules } from "../../../utils/common.FormRules";
import { ITEM_OPTIONS } from "../../../utils/common.options";

export const DialogAddInterface = defineComponent({
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
		const vm = this;
		return {
			...defItem({
				value: "",
				itemType: "Select",
				prop: "apiMethod",
				options: ITEM_OPTIONS.httpMethod,
				rules: [FormRules.required()],
				once() {
					this.value = _.first(this.options).value;
				},
				style: { width: "120px" }
			}),
			dataXItem: {
				...defItem({
					value: "",
					itemType: "Select",
					prop: "catid",
					label: vm.$t("接口分类").label,
					placeholder: "分类名称",
					options: [],
					rules: [FormRules.required()],
					once() {
						this.options = State_Interface.list.map(i => ({
							value: i._id,
							label: i.title
						}));
						if (vm.options.categoryId) {
							this.value = vm.options.categoryId;
						} else {
							this.value = _.first(this.options).value;
						}
					}
				}),
				...defItem({
					value: "",
					prop: "title",
					label: vm.$t("接口名称").label,
					placeholder: vm.$t("接口名称").label,
					rules: [
						FormRules.required(),
						FormRules.nameLength({ label: vm.$t("接口").label })
					]
				}),
				...defItem({
					value: "/",
					prop: "path",
					label: vm.$t("接口路径").label,
					placeholder: "/path",
					rules: [FormRules.required(), FormRules.apiPath()],
					once() {
						const vDomApiMethodsSelector = <xItem configs={vm.apiMethod} />;
						this.slots = markRaw({
							addonBefore: () => vDomApiMethodsSelector
						});
					}
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
				<xGap t="10" />
				<aAlert
					message={this.$t("注： 详细的接口数据可以在编辑页面中添加").label}
					type="info"
					closable
					className="width100"
				/>
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
				<xGap t="10" />
			</div>
		);
	}
});
