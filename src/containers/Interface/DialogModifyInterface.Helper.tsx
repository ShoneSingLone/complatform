import { DialogUpsertTags } from "./DialogUpsertTags";
import {
	$,
	xU,
	xI,
	defItem,
	defineComponentProps,
	VNodeCollection,
	pickValueFrom,
	setValueTo
} from "@/ventose/ui";
import { defineComponent, markRaw } from "vue";
import { DialogInterfaceStatusModify } from "./DialogInterfaceStatusModify";
import { DialogInterfaceProxyModify } from "./DialogInterfaceProxyModify";
import {
	DialogUpsertProxyEnv,
	RequestArgsPanel,
	ResponsePanel,
	TuiEditor
} from "@/components";
import { usePrivateItemValue } from "@/ventose/ui";
import { itemBaseProps } from "@/ventose/ui/xForm/common";
import { FormRules } from "@/utils/common.FormRules";
import { ITEM_OPTIONS } from "@/utils/common.options";
import { _$handlePath } from "@/utils/common";
import { stateApp } from "@/state/app";

export const RequestArgsRender = defineComponent({
	props: defineComponentProps(itemBaseProps),
	setup(props) {
		return {
			_itemValue: usePrivateItemValue(props)
		};
	},
	render() {
		return (
			<RequestArgsPanel
				params={this.properties?.value}
				apiMethod={this.properties?.deepWatch?.apiMethod}
				onUpdate:params={this.listeners["onEmitItemValue"]}
			/>
		);
	}
});

export const MarkdownRender = defineComponent({
	props: defineComponentProps(itemBaseProps),
	setup(props) {
		return {
			_itemValue: usePrivateItemValue(props, { md: "", html: "" })
		};
	},
	render(vm) {
		return <TuiEditor v-model={vm._itemValue} />;
	}
});

export const ResponseRender = defineComponent({
	props: defineComponentProps(itemBaseProps),
	setup(props) {
		return {
			_itemValue: usePrivateItemValue(props)
		};
	},
	computed: {
		body: {
			get() {
				return this._itemValue?.res_body || "";
			},
			set(res_body) {
				this._itemValue.res_body = res_body;
			}
		},
		resBodyType: {
			get() {
				return this._itemValue?.res_body_type || "";
			},
			set(res_body_type) {
				this._itemValue.res_body_type = res_body_type;
			}
		},
		/* 如果不转发，可以是固定的json数据 （或者mock 模拟数据） */
		resBackupJson: {
			get() {
				return this._itemValue?.resBackupJson || "";
			},
			set(resBackupJson) {
				this._itemValue.resBackupJson = resBackupJson;
			}
		}
	},
	render(vm) {
		return (
			<ResponsePanel
				v-model:body={vm.body}
				v-model:bodyType={vm.resBodyType}
				v-model:resBackupJson={vm.resBackupJson}
			/>
		);
	}
});

export const getRequestArgs = vm =>
	defItem({
		label: xI("请求参数设置"),
		value: [],
		activeKey: "1",
		deepWatch: { apiMethod: "" },
		itemType: RequestArgsRender
	});
export const getResponseArgs = vm =>
	defItem({
		label: xI("响应参数设置"),
		value: {},
		activeKey: "1",
		apiMethod: "",
		itemType: ResponseRender
	});
export const getRemark = vm =>
	defItem({
		label: xI("备注"),
		value: { html: "", md: "" },
		itemType: MarkdownRender
	});
export const getNoticed = vm =>
	defItem({
		label: xI("消息通知"),
		labelVNodeRender: VNodeCollection.labelTips(
			<div>{xI("开启消息通知，可在 项目设置 里修改")}</div>
		),
		checkedChildren: xI("开"),
		unCheckedChildren: xI("关"),
		value: true,
		itemType: "Switch"
	});
export const getApiOpened = vm =>
	defItem({
		label: xI("开放接口"),
		labelVNodeRender: VNodeCollection.labelTips(
			<div>{xI("用户可以在 数据导出 时选择只导出公开接口")}</div>
		),
		checkedChildren: xI("开"),
		unCheckedChildren: xI("关"),
		value: false,
		itemType: "Switch"
	});

export const getWitchEnv = vm =>
	defItem({
		isShow: () => vm.dataXItem.isProxy.value,
		label: xI("转发环境"),
		value: "",
		options: [],
		setOptions(envArray) {
			this._$updateUI({
				options: xU.map(envArray, i => ({
					value: i._id,
					label: `${i.name} ${i.domain}`
				}))
			});
		},
		itemType: EnvSelectRender
	});
export const getIsProxy = vm =>
	defItem({
		value: false,
		label: xI("是否开启转发"),
		options: ITEM_OPTIONS.trueOrFalse,
		itemType: "Switch"
	});
export const getStatus = vm =>
	defItem({
		label: xI("状态"),
		value: ITEM_OPTIONS.interfaceStatus[0].value,
		options: ITEM_OPTIONS.interfaceStatus,
		itemType: "Select"
	});
export const getTag = vm =>
	defItem({
		label: "Tag",
		value: [],
		options: [],
		async setOptions(tagArray) {
			this._$updateUI({
				options: tagArray
			});
		},
		itemType: TagSelectRender
	});
export const getPathParams = vm =>
	defItem({
		label: xI("接口路径参数"),
		value: [],
		itemType: InpterfacePathParams
	});
export const getPath = state =>
	defItem({
		value: "",
		label: xI("接口路径"),
		labelVNodeRender: VNodeCollection.labelTips(
			<ul>
				<li>
					1.接口路径支持路由参数，例如:/api/v1/project
					<b>/{"{projectId}"}</b>。
				</li>
				<li>
					2.Query参数，例如/api/v1/project<b>?projectId=0001</b>。请定义到
					<b>Request设置-&#62;Query</b>
				</li>
			</ul>
		),
		placeholder: "/path",
		rules: [FormRules.required(), FormRules.apiPath()],
		once() {
			const vDomApiMethodsSelector = (
				<xItem configs={state.dataXItem.apiMethod} />
			);
			this.slots = markRaw({
				addonBefore: () => vDomApiMethodsSelector
			});
		},
		onAfterEmitItemValue: xU.debounce(function (newPatnValue) {
			newPatnValue = _$handlePath(newPatnValue);
			let queue = [];
			setValueTo(state.dataXItem, { path: newPatnValue });
			const { pathParams } = pickValueFrom(state.dataXItem);

			let insertParams = name => {
				let findExist = xU.find(pathParams, { name: name });
				if (findExist) {
					queue.push(findExist);
				} else {
					queue.push({ name: name, desc: "" });
				}
			};

			if (newPatnValue && newPatnValue.indexOf(":") !== -1) {
				let paths = newPatnValue.split("/"),
					name,
					i;
				for (i = 1; i < paths.length; i++) {
					if (paths[i][0] === ":") {
						name = paths[i].substr(1);
						insertParams(name);
					}
				}
			}
			if (newPatnValue && newPatnValue.length > 3) {
				newPatnValue.replace(/\{(.+?)\}/g, function (str, match) {
					insertParams(match);
				});
			}

			setValueTo(state.dataXItem, {
				pathParams: xU.map(xU.uniqBy(queue, "name"), newValue => {
					/* @ts-ignore */
					return xU.merge({ name: "", desc: "", example: "" }, newValue);
				})
			});
		}, 800)
	});

export const getApiMethod = state =>
	defItem({
		value: "",
		itemType: "Select",
		options: ITEM_OPTIONS.httpMethod,
		onChange(val) {
			/* 控制body是否可以编辑 */
			state.dataXItem.requestArgs.deepWatch.apiMethod = val;
		},
		rules: [FormRules.required()],
		style: { width: "120px" }
	});
export const getBasepath = vm =>
	defItem({
		value: stateApp.currProject.basepath,
		label: xI("接口基本路径"),
		labelVNodeRender:
			VNodeCollection.labelTips(`接口基本路径，可在 项目设置 里修改`),
		disabled: true
	});
export const getTitle = () =>
	defItem({
		value: "",
		label: xI("接口名称"),
		placeholder: xI("接口名称"),
		rules: [FormRules.required(), FormRules.nameLength({ label: xI("接口") })]
	});

export const getCatid = categoryId =>
	defItem({
		value: "",
		itemType: "Select",
		label: xI("接口分类"),
		placeholder: "分类名称",
		options: [],
		rules: [FormRules.required()],
		setOptions(allCategory) {
			this.options = allCategory;
			/* 默认在点击的分类下添加新接口 */
			if (categoryId) {
				this.value = categoryId;
			} else {
				this.value = xU.first(this.options)?.value || "";
			}
		}
	});

export async function openProxyEnvDialog() {
	xU.dialog({
		title: xI("管理项目接口转发环境"),
		// offset: [20, 20],
		component: DialogUpsertProxyEnv,
		/*弹窗里面的弹窗点击之后不关闭（点不到其他位置）*/
		keepTop: true
	});
}

export async function openUpsertTagDialog() {
	xU.dialog({
		title: xI("管理项目接口Tags"),
		// offset: [20, 20],
		component: DialogUpsertTags,
		/*弹窗里面的弹窗点击之后不关闭（点不到其他位置）*/
		keepTop: true
	});
}

export const InpterfacePathParams = defineComponent({
	props: ["properties", "slots", "listeners", "propsWillDeleteFromConfigs"],
	methods: {
		fnUpdate(prop, value, index) {
			this.properties.value[index][prop] = value;
			this.listeners["onEmitItemValue"](this.properties.value);
		}
	},
	render(vm) {
		return xU.map(vm.properties.value, (data, index) => {
			return (
				<div class="flex middel mt10 width100">
					<ElTag class="mr10 flex middle" style="min-width:100px">
						{data.name}
					</ElTag>
					<span class="mr10 flex1">
						<ElInput
							value={data.example}
							onEmitItemValue={val => {
								this.fnUpdate("example", val, index);
							}}
						/>
					</span>
					<span class="flex1">
						<ElInput
							value={data.desc}
							onEmitItemValue={val => {
								this.fnUpdate("desc", val, index);
							}}
						/>
					</span>
				</div>
			);
		});
	}
});

export const EnvSelectRender = defineComponent({
	props: defineComponentProps(itemBaseProps),
	setup(props) {
		return {
			_itemValue: usePrivateItemValue(props, "")
		};
	},
	computed: {
		envConfigs() {
			return defItem({
				itemType: "Select",
				placeholder: "请选择转发环境",
				options: this.properties.options,
				style: "width:100px;"
			});
		}
	},
	render() {
		return (
			<div class="flex overflow-auto">
				<xItem
					configs={this.envConfigs}
					v-model={this._itemValue}
					style={{ width: "300px" }}
				/>
				<xGap l="10" />
				<xButton
					configs={{
						text: xI("转发环境设置"),
						onClick: openProxyEnvDialog
					}}
					class="ml10"
					type="primary"
				/>
			</div>
		);
	}
});

export const TagSelectRender = defineComponent({
	props: ["properties", "slots", "listeners", "propsWillDeleteFromConfigs"],
	computed: {
		selected: {
			get() {
				if (xU.isArrayFill(this.properties?.value)) {
					return this.properties?.value;
				} else {
					return [];
				}
			},
			set(val) {
				if (this.properties?.value !== val) {
					this.listeners["onEmitItemValue"](val);
				}
			}
		},

		vDomOptions() {
			const options = this.properties.options || [];
			const vDomOptions = xU.map(options, item => {
				return (
					<aSelectOption value={item.name} key={item.name}>
						<span v-xTips={{ content: item.desc }}>{item.name}</span>
					</aSelectOption>
				);
			});
			return vDomOptions;
		}
	},
	render(vm) {
		return (
			<div class="flex overflow-auto">
				<el-select
					placeholder="请选择 tag"
					mode="multiple"
					v-model:value={vm.selected}>
					{this.vDomOptions}
				</el-select>
				<xGap l="10" />
				<xButton
					configs={{
						text: xI("Tag设置"),
						onClick: openUpsertTagDialog
					}}
					class="ml10"
					type="primary"
				/>
			</div>
		);
	}
});

export function dialogInterfaceStatusModify({ selected }) {
	xU.dialog({
		title: xI("变更状态"),
		component: DialogInterfaceStatusModify,
		payload: {
			selected
		}
	});
}

export function dialogInterfaceProxyModify({ selected }) {
	xU.dialog({
		title: xI("变更代理"),
		component: DialogInterfaceProxyModify,
		payload: {
			selected
		}
	});
}
