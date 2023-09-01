import {
	itemsInvalid,
	pickValueFrom,
	xU,
	defItem,
	setValueTo,
	xI
} from "@/ventose/ui";
import { defineComponent, markRaw } from "vue";
import { API } from "@/api";
import { stateApp } from "@/state/app";
import { stateInterface } from "@/state/interface";
import { FormRules } from "@/utils/common.FormRules";
import { ITEM_OPTIONS } from "@/utils/common.options";
import { cptRouter } from "@/router/router";

export const DialogAddInterface = defineComponent({
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
		const vm = this;
		return {
			apiMethod: defItem({
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
					label: xI("接口分类"),
					placeholder: "分类名称",
					options: [],
					rules: [FormRules.required()],
					once() {
						this.options = stateInterface.allCategory;
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
					label: xI("接口名称"),
					placeholder: xI("接口名称"),
					rules: [
						FormRules.required(),
						FormRules.nameLength({ label: xI("接口") })
					]
				}),
				path: defItem({
					value: "/",
					label: xI("接口路径"),
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
						stateInterface.updateTestcaseMenuList();
						cptRouter.value.go("/interface/detail", {
							...cptRouter.value.query,
							interface_id: data._id
						});

						xU.message.success("添加接口成功");
						$close();
					}
				} catch (error) {
					xU.message.error("添加失败");
				}
			}
		}
	},
	render() {
		return (
			<>
				<div class="x-dialog-boddy-wrapper">
					<xGap t />
					<ElAlert
						title={xI("注： 详细的接口数据可以在编辑页面中添加")}
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
									<xGap t />
									<xItem configs={configs} />
								</>
							);
						})}
					</xForm>
					<xGap t />
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
