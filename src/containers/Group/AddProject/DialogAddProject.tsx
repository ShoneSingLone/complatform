import "./Addproject.scss";
import { defineComponent } from "vue";
import { defItem, pickValueFrom, xU, itemsInvalid, xI } from "@/ventose/ui";
import { API } from "@/api";
import optionsXIcon from "@/utils/common.options.xIcon";
import {
	ADMIN,
	DEV,
	OWNER,
	PRIVATE,
	PROJECT_COLOR,
	PROJECT_ICON,
	PUBLIC
} from "@/utils/variable";
import { stateApp } from "@/state/app";
import { FormRules } from "@/utils/common.FormRules";
import { _$handlePath, _$randomValueAndProp } from "@/utils/common";

export const xItem_ProjectType = (options: any = {}) => {
	const value = options.value || PRIVATE;
	return {
		value,
		itemType: "RadioGroup",
		prop: "project_type",
		label: "权限",
		options: [
			{
				label: (
					<ElTooltip content="只有组长和项目开发者可以索引并查看项目信息">
						<span class="flex middle">
							<xIcon icon="lockStrok" />
							<span>私有</span>
						</span>
					</ElTooltip>
				),
				value: PRIVATE
			},
			{
				label: (
					<ElTooltip content="任何人都可以索引并查看项目信息">
						<span class="flex middle">
							<xIcon icon="unlock" />
							<span>公开</span>
						</span>
					</ElTooltip>
				),
				value: PUBLIC
			}
		]
	};
};
export const xItem_ProjectDesc = (options: any = {}) => {
	const value = options.value || "";
	return {
		value: "",
		prop: "desc",
		label: "描述",
		isTextarea: true,
		placeholder: "描述不超过144字!",
		showCount: true,
		maxlength: 144
	};
};
export const xItem_ProjectGroupId = (options: any = {}, vm) => {
	const value = options.value || "";
	return {
		value,
		prop: "group_id",
		label: "所属分组",
		placeholder: "请选择项目所属的分组",
		itemType: "Select",
		options: xU.map(stateApp.groupList, i => {
			return {
				label: i.group_name,
				value: String(i._id),
				disabled: ![DEV, OWNER, ADMIN].includes(i.role)
			};
		}),
		rules: [FormRules.required("请选择项目所属的分组!")]
	};
};

export const xItem_ProjectBasePath = (options: any = {}) => {
	const value = options.value || "/";
	return {
		value,
		prop: "basepath",
		label: () =>
			defItem.labelWithTips({
				label: "基本路径",
				icon: (
					<xIcon
						icon="question"
						v-xTips={{ content: "接口基本路径，默认是/" }}
					/>
				)
			}),
		placeholder: "接口基本路径，默认是/",
		rules: [FormRules.required("请输入项目基本路径!")]
	};
};

export const xItem_ProjectColor = (options: any = {}) => {
	const [defaultValue] = _$randomValueAndProp(PROJECT_COLOR);
	const value = options.value || defaultValue;
	return {
		value,
		prop: "color",
		itemType: "Select",
		label: xI("icon背景颜色"),
		rules: [FormRules.required()],
		options: xU.map(PROJECT_COLOR, background => {
			return {
				label: (
					<span
						style={{
							background,
							color: "transparent"
						}}>
						_______________
					</span>
				),
				value: background
			};
		}),
		afterControll: ({ privateValue }) => (
			<span
				style={{
					background: privateValue,
					color: "transparent",
					margin: "0 20px"
				}}>
				_______________
			</span>
		)
	};
};
export const xItem_ProjectIcon = (options: any = {}) => {
	const [defaultValue] = _$randomValueAndProp(PROJECT_ICON);
	const value = options.value || defaultValue;
	return {
		value,
		prop: "icon",
		itemType: "Select",
		label: xI("图标"),
		rules: [FormRules.required()],
		options: xU.map(optionsXIcon, value => {
			return {
				label: (
					<span>
						<xIcon icon={value} />
						<span class="ml10">{value}</span>
					</span>
				),
				value
			};
		}),
		afterControll: ({ privateValue }) => {
			return <xIcon icon={privateValue} style="margin:0 20px" />;
		}
	};
};
export const xItem_ProjectName = (options: any = {}) => {
	const value = options.value || "";
	const prop = options.prop || "name";
	const appendRules = options.appendRules;

	const rules = [
		FormRules.required("请输入项目名称"),
		FormRules.nameLength({ label: xI("项目") })
	];

	if (xU.isArray(appendRules)) {
		rules.concat(appendRules);
	}

	return {
		itemType: "Input",
		label: "项目名称",
		prop,
		value,
		rules
	};
};

const formItemLayout = {
	labelCol: {
		lg: { span: 3 },
		xs: { span: 24 },
		sm: { span: 6 }
	},
	wrapperCol: {
		lg: { span: 21 },
		xs: { span: 24 },
		sm: { span: 14 }
	},
	className: "form-item"
};

export const DialogAddProject = defineComponent({
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
			dataXItem: {
				projectGroupId: defItem(
					xItem_ProjectGroupId({ value: vm.propOptions.groupId }, vm)
				),
				projectName: defItem(xItem_ProjectName()),
				projectIcon: defItem(xItem_ProjectIcon()),
				projectColor: defItem(xItem_ProjectColor()),
				projectBasePath: defItem(xItem_ProjectBasePath()),
				projectDesc: defItem(xItem_ProjectDesc()),
				projectType: defItem(xItem_ProjectType())
			},
			state: {
				groupList: []
			}
		};
	},
	mounted() {
		this.init();
	},
	methods: {
		async init() {
			stateApp._setBreadcrumb([{ name: "新建项目" }]);

			if (!stateApp.currGroup._id) {
				await stateApp._fetchGroupList();
			}
			if (stateApp.groupList.length === 0) {
				return null;
			}
		},
		async submit() {
			const vm = this;
			// 确认添加项目
			try {
				if (!(await itemsInvalid())) {
					const formData = pickValueFrom(vm.dataXItem);
					const { data } = await API.project.addProject(formData);
					xU.notification.success("创建成功! ");
					return true;
				} else {
					throw new Error("未通过验证");
				}
			} catch (e) {
				console.error(e);
			}
		},
		_$handlePath(e) {
			let val = e.target.value;
			this.props.form.setFieldsValue({
				basepath: _$handlePath(val)
			});
		}
	},
	render() {
		return (
			<>
				<div class="x-dialog-boddy-wrapper">
					{/* {JSON.stringify(pickValueFrom(this.dataXItem))} */}
					<xForm
						class="flex vertical"
						labelStyle={{ "min-width": "120px", width: "unset" }}>
						{xU.map(this.dataXItem, (configs, prop) => {
							console.log(configs);
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
						onOk: async () => {
							const res = await this.submit();
							if (res) {
								this.propOptions.updateProjectList();
								this.propOptions.$close();
							}
						}
					}}
				/>
			</>
		);
	}
});
