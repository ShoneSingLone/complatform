import {
	itemsInvalid,
	AllWasWell,
	pickValueFrom,
	UI,
	defItem,
	xU,
	setValueTo
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

export const DialogPostman = defineComponent({
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
		return { State_App };
	},
	data() {
		const vm = this;
		return {
			api: defItem({
				value: "",
				itemType: "Select",
				options: ITEM_OPTIONS.httpMethod,
				rules: [FormRules.required()],
				once() {
					this.value = xU.first(this.options).value;
				},
				style: { width: "120px" }
			}),
			dataXItem: {
				catid: defItem({
					value: "",
					itemType: "Select",
					label: vm.$t("接口分类").label,
					placeholder: "分类名称",
					options: [],
					rules: [FormRules.required()],
					once() {
						this.options = State_ProjectInterface.allCategory;
						/* 默认在点击的分类下添加新接口 */
						if (vm.propOptions.categoryId) {
							this.value = vm.propOptions.categoryId;
						} else {
							this.value = xU.first(this.options).value;
						}
					}
				}),
				title: defItem({
					value: "",
					label: vm.$t("接口名称").label,
					placeholder: vm.$t("接口名称").label,
					rules: [
						FormRules.required(),
						FormRules.nameLength({ label: vm.$t("接口").label })
					]
				}),
				path: defItem({
					value: "/",
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
		this.propOptions.vm = this;
	},
	methods: {
		async onOk() {
			if (!(await itemsInvalid())) {
				const { catid, title, path } = pickValueFrom(this.dataXItem);
				const { projectId, $close } = this.propOptions;
				try {
					const { data } = await API.project.addInterface({
						project_id: projectId,
						catid,
						title,
						path,
						method: this.apiMethod.value
					});
					if (data) {
						Methods_ProjectInterface.updateInterfaceMenuList();
						Cpt_url.value.go("/project/interface/detail", {
							...Cpt_url.value.query,
							interface_id: data._id
						});

						UI.message.success("添加接口成功");
						$close();
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
				<div class="x-dialog-boddy-wrapper">
					<xGap t="10" />
					<ElAlert
						title={this.$t("注： 详细的接口数据可以在编辑页面中添加").label}
						type="info"
						closable
						class="width100"
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
						onCancel: this.propOptions.$close,
						onOk: this.onOk
					}}
				/>
			</>
		);
	}
});
