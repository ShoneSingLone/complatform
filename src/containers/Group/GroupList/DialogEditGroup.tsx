import { defineComponent } from "vue";
import {
	xU,
	defItem,
	State_UI,
	pickValueFrom,
	VNodeCollection,
	UI,
	components
} from "@ventose/ui";
import { FormRules } from "@/utils/common.FormRules";
import { Methods_App, State_App } from "@/state/State_App";

import { API } from "../../../api";
import { Cpt_url } from "../../../router/router";
import { ADMIN } from "@/utils/variable";

const { xItem } = components;

const { $t } = State_UI;

export const DialogEditGroup = defineComponent({
	setup() {
		return {
			State_App,
			Cpt_url
		};
	},
	props: {
		/* Dialog 默认传入参数 */
		propOptions: {
			type: Object,
			default() {
				return { __elId: false };
			}
		}
	},
	computed: {
		row() {
			return this.propOptions?.row || {};
		},
		vDomFormItems() {
			return xU.map(this.formItems, (item, prop) => {
				return (
					<>
						<xGap t="10" />
						<xItem configs={item} />
					</>
				);
			});
		},
		vDomDeleteGroup() {
			const vm = this;
			/* 只有超级管理员能删除分组 */
			if (State_App.user.role === ADMIN) {
				return (
					<ElAlert
						type="warning"
						show-icon
						class="mt20"
						id="admin-delete-group-alert">
						{{
							title() {
								return $t("删除分组").label;
							},
							default() {
								return (
									<div class="flex vertical">
										<div class="card-danger-content">
											<p>分组一旦删除，将无法恢复数据，请慎重操作！</p>
											<p>只有超级管理员有权限删除分组。</p>
										</div>
										<div class="flex end">
											<xButton
												configs={{
													onClick: vm.showDeleteGroupConfirm,
													preset: "delete"
												}}
											/>
										</div>
									</div>
								);
							}
						}}
					</ElAlert>
				);
			}
			return null;
		}
	},
	render() {
		/* {JSON.stringify(pickValueFrom(this.formItems))} */
		return (
			<>
				<div class="padding20 flex1 overflow-auto">
					<xForm
						class="flex vertical mb20"
						labelStyle={{
							"min-width": "170px",
							width: "unset"
						}}>
						{this.vDomFormItems}
					</xForm>
					{this.vDomDeleteGroup}
				</div>
				<xDialogFooter
					configs={{
						onCancel: this.propOptions.$close,
						onOk: () => {
							this.propOptions.onOk({
								formItems: this.formItems,
								$close: this.propOptions.$close
							});
						}
					}}
				/>
			</>
		);
	},
	data() {
		const vm = this;
		return {
			formDelete: {
				authText: defItem({
					value: "",
					placeholder: $t("请输入分组名称确认此操作").label,
					clearable: true
				})
			},
			formItems: {
				currGroupName: defItem({
					value: "",
					label: $t("分组名").label,
					placeholder: $t("请输入分组名称").label,
					rules: [FormRules.required()]
				}),
				currGroupDesc: defItem({
					isTextarea: true,
					value: "",
					label: $t("简介").label,
					placeholder: "请输入分组描述",
					rules: [FormRules.required()]
				}),
				custom_field1_enable: defItem({
					itemType: "Switch",
					value: false,
					label: $t("启用接口自定义字段").label,
					placeholder: "请输入分组描述",
					rules: [FormRules.required()]
				}),
				custom_field1_name: defItem({
					value: "",
					disabled() {
						//@ts-ignore
						return !vm.formItems.custom_field1_enable.value;
					},
					label: $t("接口自定义字段").label,
					labelVNodeRender: VNodeCollection.labelTips(
						<div>{$t("可以在接口中添加 额外字段 数据").label}</div>
					),
					placeholder: $t("额外字段").label,
					rules: [FormRules.required()],
					once() {
						vm.$watch(
							"formItems.custom_field1_enable.value",
							isUse => {
								if (isUse) {
									this.rules = [FormRules.required()];
								} else {
									this.rules = [];
								}
							},
							{
								immediate: true
							}
						);
					}
				})
			}
		};
	},
	methods: {
		init() {
			const { group_desc, group_name, custom_field1 } = this.row;
			const { enable, name } = custom_field1 || {};
			this.formItems.currGroupName.value = group_name;
			this.formItems.currGroupDesc.value = group_desc;
			this.formItems.custom_field1_enable.value = enable;
			this.formItems.custom_field1_name.value = name;
		},
		showDeleteGroupConfirm() {
			const vm = this;
			vm.formDelete.authText.value = "";
			UI.confirm({
				title: "确认删除 " + vm.State_App.currGroup.group_name + " 分组吗？",
				content: () => (
					<>
						<ElAlert
							title={
								$t(
									"警告：此操作非常危险,会删除该分组下面所有项目和接口，并且无法恢复!"
								).label
							}
							type="warning"
						/>
						<div style={{ marginTop: "16px" }}>
							<xItem configs={this.formDelete.authText} />
						</div>
					</>
				),
				onOk() {
					return new Promise(async (resolve, reject) => {
						const { authText } = pickValueFrom(vm.formDelete);
						if (authText !== vm.State_App.currGroup.group_name) {
							UI.message.error("分组名称有误");
							return reject();
						} else {
							await vm.deleteGroup();
							vm.propOptions?.close();
							return resolve("");
						}
					});
				},
				iconType: "delete",
				onCancel() {}
			});
		},
		async deleteGroup() {
			const { currGroup } = this.State_App;
			const res = await API.group.deleteGroup({ id: currGroup._id });
			UI.notification.success("删除成功");
			await Methods_App.fetchGroupList();
			const firstGroup = xU.first(this.State_App.groupList);
			this.Cpt_url.go("/group", { group_id: firstGroup._id });
		}
	},
	mounted() {
		this.init();
		this.propOptions.vm = this;
	}
});
