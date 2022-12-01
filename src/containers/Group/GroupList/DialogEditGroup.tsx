import { defineComponent } from "vue";
import {
	_,
	defItem,
	State_UI,
	FormRules,
	pickValueFrom,
	VNodeCollection,
	UI,
	components
} from "@ventose/ui";
import { Methods_App, State_App } from "../../../state/State_App";
import { Alert } from "ant-design-vue";
import { API } from "../../../api";
import { Cpt_url } from "../../../router/router";

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
		propDialogOptions: {
			type: Object,
			default() {
				return { __elId: false };
			}
		}
	},
	computed: {
		row() {
			return this.propDialogOptions?.row || {};
		},
		vDomFormItems() {
			return _.map(this.formItems, (item, prop) => {
				return (
					<>
						<xGap t="10" />
						<xItem configs={item} />
					</>
				);
			});
		},
		vDomDeleteConfirmAuth() {
			return (
				<div>
					<Alert
						message={
							$t(
								"警告：此操作非常危险,会删除该分组下面所有项目和接口，并且无法恢复!"
							).label
						}
						type="warning"
					/>
					<div style={{ marginTop: "16px" }}>
						<xItem configs={this.formDelete.authText} />
					</div>
				</div>
			);
		},
		vDomDeleteGroup() {
			/* 只有超级管理员能删除分组 */
			if (State_App.user.role === "admin") {
				return (
					<aCard class="mt20">
						<Alert
							type="warning"
							message={$t("删除分组").label}
							description={
								<div>
									<div className="card-danger-content">
										<p>分组一旦删除，将无法恢复数据，请慎重操作！</p>
										<p>只有超级管理员有权限删除分组。</p>
									</div>
									<div class="flex end">
										<xButton
											configs={{
												onClick: this.showDeleteGroupConfirm,
												preset: "delete"
											}}
										/>
									</div>
								</div>
							}
							show-icon
						/>
					</aCard>
				);
			}
			return null;
		}
	},
	render() {
		/* {JSON.stringify(pickValueFrom(this.formItems))} */
		return (
			<div class="padding20">
				<aCard>
					<xForm
						class="flex vertical"
						labelStyle={{
							"min-width": "170px",
							width: "unset"
						}}>
						{this.vDomFormItems}
					</xForm>
				</aCard>
				{this.vDomDeleteGroup}
			</div>
		);
	},
	data() {
		const vm = this;
		return {
			formDelete: {
				...defItem({
					value: "",
					prop: "authText",
					placeholder: $t("请输入分组名称确认此操作").label,
					allowClear: true
				})
			},
			formItems: {
				...defItem({
					prop: "currGroupName",
					value: "",
					label: $t("分组名").label,
					placeholder: $t("请输入分组名称").label,
					rules: [FormRules.required()]
				}),
				...defItem({
					isTextarea: true,
					prop: "currGroupDesc",
					value: "",
					label: $t("简介").label,
					placeholder: "请输入分组描述",
					rules: [FormRules.required()]
				}),
				...defItem({
					itemType: "Switch",
					prop: "custom_field1_enable",
					value: false,
					label: $t("启用接口自定义字段").label,
					placeholder: "请输入分组描述",
					rules: [FormRules.required()]
				}),
				...defItem({
					prop: "custom_field1_name",
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
			UI.dialog.confirm({
				title: "确认删除 " + vm.State_App.currGroup.group_name + " 分组吗？",
				content: vm.vDomDeleteConfirmAuth,
				onOk() {
					return new Promise(async (resolve, reject) => {
						const { authText } = pickValueFrom(vm.formDelete);
						if (authText !== vm.State_App.currGroup.group_name) {
							UI.message.error("分组名称有误");
							return reject();
						} else {
							await vm.deleteGroup();
							vm.propDialogOptions?.close();
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
			const firstGroup = _.first(this.State_App.groupList);
			this.Cpt_url.go("/group", { group_id: firstGroup._id });
		}
	},
	mounted() {
		this.init();
		this.propDialogOptions.vm = this;
	}
});
