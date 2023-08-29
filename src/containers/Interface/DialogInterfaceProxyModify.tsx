import {
	itemsInvalid,
	pickValueFrom,
	xU,
	defItem,
	setValueTo,
	xI
} from "@/ventose/ui";
import { defineComponent } from "vue";
import { API } from "@/api";
import { stateApp } from "@/state/app";
import { ITEM_OPTIONS } from "@/utils/common.options";
import { EnvSelectRender } from "./DialogModifyInterface.Helper";
import { stateInterface } from "@/state/interface";

export const DialogInterfaceProxyModify = defineComponent({
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
	watch: {
		"stateApp.currProject": {
			immediate: true,
			deep: true,
			handler(currProject) {
				const { env: envArray } = currProject;
				this.dataXItem.witchEnv.setOptions(envArray);
			}
		}
	},
	data(vm) {
		return {
			dataXItem: {
				isProxy: defItem({
					value: false,
					label: xI("是否开启转发"),
					options: ITEM_OPTIONS.trueOrFalse,
					itemType: "Switch"
				}),
				witchEnv: defItem({
					isShow() {
						return vm.dataXItem.isProxy.value;
					},
					label: xI("转发环境"),
					value: "",
					options: [],
					setOptions(envArray) {
						this.options = xU.map(envArray, i => {
							return {
								value: i._id,
								label: `${i.name} ${i.domain}`
							};
						});
					},
					itemType: EnvSelectRender
				})
			}
		};
	},
	mounted() {
		this.propOptions.vm = this;
		this.initForm();
	},
	computed: {
		category() {
			if (this.propOptions.category) {
				return this.propOptions.category;
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
			const { selected } = this.propOptions.payload;
			if (!(await itemsInvalid())) {
				const { isProxy, witchEnv } = pickValueFrom(this.dataXItem);
				try {
					const res = await Promise.all(
						xU.map(selected, id =>
							API.project.updateInterface({ id, witchEnv, isProxy })
						)
					);
					stateInterface._updateInterfaceMenuList();
					this.propOptions.$close();
					xU.message.success(xI("修改_成功", { title: "代理" }));
				} catch (error) {
					xU.message.error(xI("修改_失败", { title: "代理" }));
				}
			}
		}
	},
	render() {
		return (
			<>
				<div class="x-dialog-boddy-wrapper ">
					<xGap t="10" />
					<xForm
						class="flex"
						labelStyle={{ "min-width": "120px", width: "unset" }}>
						<xItem configs={this.dataXItem.isProxy} />
						<xGap t="10" />
						<xItem configs={this.dataXItem.witchEnv} class="flex1" />
					</xForm>
					<xGap b="38" />
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
