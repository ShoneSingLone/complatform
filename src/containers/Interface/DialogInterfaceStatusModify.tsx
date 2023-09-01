import {
	itemsInvalid,
	pickValueFrom,
	defItem,
	xU,
	setValueTo,
	xI
} from "@/ventose/ui";
import { defineComponent } from "vue";
import { API } from "@/api";
import { stateApp } from "@/state/app";
import { ITEM_OPTIONS } from "@/utils/common.options";
import { stateInterface } from "@/state/interface";

export const DialogInterfaceStatusModify = defineComponent({
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
				status: defItem({
					label: xI("状态"),
					value: ITEM_OPTIONS.interfaceStatus[0].value,
					options: ITEM_OPTIONS.interfaceStatus,
					itemType: "Select"
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
				const { status }: any = pickValueFrom(this.dataXItem);
				try {
					await Promise.all(
						xU.map(selected, id => API.project.updateInterface({ id, status }))
					);
					stateInterface._updateInterfaceMenuList();
					this.propOptions.$close();
					xU.message.success(xI("修改_成功", { title: "状态" }));
				} catch (error) {
					xU.message.error(xI("修改_失败", { title: "状态" }));
				}
			}
		}
	},
	render() {
		return (
			<>
				<div class="x-dialog-boddy-wrapper ">
					<xGap t />
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
