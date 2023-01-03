import {
	$,
	AllWasWell,
	defItem,
	pickValueFrom,
	setValueTo,
	State_UI,
	UI,
	validateForm,
	VNodeCollection,
	xU
} from "@ventose/ui";
import { defineComponent, markRaw } from "vue";
import { API } from "../../../api";
import { State_App } from "../../../state/State_App";
import { FormRules } from "../../../utils/common.FormRules";
import { ITEM_OPTIONS } from "../../../utils/common.options";
import { HTTP_METHOD } from "./../../../utils/variable";
import { State_Project } from "./State_Project";
import { _$handlePath } from "src/utils/common";
import { DialogUpsertTags } from "./DialogUpsertTags";
import { DialogUpsertProxyEnv } from "./DialogUpsertProxyEnv";
import { RequestArgsPanel } from "src/components/RequestArgsPanel";
import { ResponsePanel } from "src/components/ResponsePanel";
import { TuiEditor } from "../../../components/TuiEditor/TuiEditor";

export const DialogModifyInterface = defineComponent({
	props: {
		/* Dialog 默认传入参数 */
		propDialogOptions: {
			type: Object,
			default() {
				return { __elId: false };
			}
		}
	},
	setup() {
		return { State_App, State_Project };
	},
	computed: {
		vDomXItemPathparams() {
			if (xU.isArrayFill(this.dataXItem.pathParams.value)) {
				return (
					<>
						<xGap t="10" />
						<xItem configs={this.dataXItem.pathParams} />
					</>
				);
			} else {
				return null;
			}
		},
		interfaceId() {
			return this.propDialogOptions.oldInterface._id;
		},
		configsDialogFooter() {
			return {
				onCancel: async () => {
					this.propDialogOptions.closeDialog();
				},
				onOk: async () => {
					this.submit();
				}
			};
		}
	},
	data() {
		const vm = this;
		return {
			reqArgs: "1",
			detailInfo: {},
			activeKey: "1",
			dataXItem: {
				...defItem({
					value: "",
					itemType: "Select",
					prop: "catid",
					label: vm.$t("接口分类").label,
					placeholder: "分类名称",
					options: [],
					rules: [FormRules.required()],
					setOptions(allCategory) {
						this.options = allCategory;
						/* 默认在点击的分类下添加新接口 */
						if (vm.propDialogOptions.categoryId) {
							this.value = vm.propDialogOptions.categoryId;
						} else {
							this.value = xU.first(this.options)?.value || "";
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
					value: vm.State_App.currProject.basepath,
					prop: "basepath",
					label: vm.$t("接口基本路径").label,
					labelVNodeRender:
						VNodeCollection.labelTips(`接口基本路径，可在 项目设置 里修改`),
					disabled: true
				}),
				...defItem({
					value: "",
					itemType: "Select",
					prop: "apiMethod",
					options: ITEM_OPTIONS.httpMethod,
					onChange(val) {
						/* 控制body是否可以编辑 */
						vm.dataXItem.requestArgs.deepWatch.apiMethod = val;
					},
					rules: [FormRules.required()],
					style: { width: "120px" }
				}),
				...defItem({
					value: "",
					prop: "path",
					label: vm.$t("接口路径").label,
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
							<xItem configs={vm.dataXItem.apiMethod} />
						);
						this.slots = markRaw({
							addonBefore: () => vDomApiMethodsSelector
						});
					},
					onAfterValueEmit: xU.debounce(function (newPatnValue) {
						newPatnValue = _$handlePath(newPatnValue);
						let queue = [];
						setValueTo(vm.dataXItem, { path: newPatnValue });
						const { pathParams } = pickValueFrom(vm.dataXItem);

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

						setValueTo(vm.dataXItem, {
							pathParams: xU.map(xU.uniqBy(queue, "name"), newValue => {
								/* @ts-ignore */
								return xU.merge(
									{ name: "", desc: "", example: "", _id: "" },
									newValue
								);
							})
						});
					}, 800)
				}),
				...defItem({
					prop: "pathParams",
					label: vm.$t("接口路径参数").label,
					value: [],
					itemType: InpterfacePathParams
				}),
				...defItem({
					prop: "tag",
					label: "Tag",
					value: [],
					options: [],
					async setOptions(tagArray) {
						this.options = tagArray;
					},
					itemType: TagSelectRender
				}),
				...defItem({
					prop: "isProxy",
					value: false,
					label: vm.$t("是否开启转发").label,
					options: ITEM_OPTIONS.trueOrFalse,
					itemType: "Switch"
				}),
				...defItem({
					isShow: () => vm.dataXItem.isProxy.value,
					prop: "witchEnv",
					label: vm.$t("转发环境").label,
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
				}),
				...defItem({
					prop: "requestArgs",
					label: vm.$t("请求参数设置").label,
					value: [],
					activeKey: "1",
					deepWatch: { apiMethod: "" },
					itemType: markRaw(RequestArgsRender)
				}),
				...defItem({
					prop: "responseArgs",
					label: vm.$t("响应参数设置").label,
					value: {},
					activeKey: "1",
					apiMethod: "",
					itemType: ResponseRender
				}),
				...defItem({
					prop: "desc",
					label: vm.$t("备注").label,
					value: {},
					itemType: MarkdownRender
				})
			}
		};
	},
	mounted() {
		this.setFormDataValues();
	},
	watch: {
		"State_App.currProject": {
			immediate: true,
			deep: true,
			handler(currProject) {
				const { env: envArray, tag: tagArray, cat: category } = currProject;
				this.dataXItem.catid.setOptions(
					xU.map(category, i => ({ ...i, label: i.name, value: i._id }))
				);
				this.dataXItem.witchEnv.setOptions(envArray);
				this.dataXItem.tag.setOptions(tagArray);
			}
		}
	},
	methods: {
		setFormDataValues() {
			this.detailInfo = this.initState(this.propDialogOptions.oldInterface);
			console.log(JSON.stringify(this.detailInfo, null, 2));

			const {
				catid,
				title,
				path,
				req_params,
				tag,
				isProxy,
				witchEnv,
				method,
				req_headers,
				req_body_type,
				req_query,
				req_body_form,
				req_body_other,
				req_body_is_json_schema,
				res_body,
				res_body_type,
				res_body_mock,
				res_body_is_json_schema,
				desc
			} = this.detailInfo;

			setValueTo(this.dataXItem, {
				witchEnv,
				catid,
				title,
				apiMethod: method,
				path,
				desc,
				pathParams: req_params,
				tag: String(tag).split(","),
				isProxy,
				requestArgs: {
					req_headers,
					/* body的编辑类型 */
					req_body_type,
					/* query */
					req_query,
					/* req_body_form 的数据 */
					req_body_form,
					/* req_body file raw json 的数据 */
					req_body_other,
					/* body json 使用 schema */
					req_body_is_json_schema
				},
				responseArgs: {
					res_body_is_json_schema,
					res_body,
					res_body_type,
					res_body_mock
				}
			});
		},
		initState(detailInfo) {
			this.startTime = new Date().getTime();
			if (detailInfo.req_query && detailInfo.req_query.length === 0) {
				delete detailInfo.req_query;
			}
			if (detailInfo.req_headers && detailInfo.req_headers.length === 0) {
				delete detailInfo.req_headers;
			}
			if (detailInfo.req_body_form && detailInfo.req_body_form.length === 0) {
				delete detailInfo.req_body_form;
			}
			if (detailInfo.req_params && detailInfo.req_params.length === 0) {
				delete detailInfo.req_params;
			}
			if (detailInfo.req_body_form) {
				detailInfo.req_body_form = detailInfo.req_body_form.map(item => {
					item.type = item.type === "text" ? "text" : "file";
					return item;
				});
			}
			// 设置标签的展开与折叠
			detailInfo["hideTabs"] = {
				req: {
					body: "hide",
					query: "hide",
					headers: "hide"
				}
			};
			detailInfo["hideTabs"]["req"][
				HTTP_METHOD[detailInfo.method].default_tab
			] = "";
			return Object.assign(
				{
					submitStatus: false,
					title: "",
					path: "",
					status: "undone",
					method: "get",
					req_params: [],
					req_query: [
						{
							name: "",
							desc: "",
							required: "1"
						}
					],
					req_headers: [
						{
							name: "",
							value: "",
							required: "1"
						}
					],
					req_body_type: "form",
					req_body_form: [
						{
							name: "",
							type: "text",
							required: "1"
						}
					],
					req_body_other: "",
					res_body_type: "json",
					res_body: "",
					desc: "",
					res_body_mock: "",
					jsonType: "tpl",
					req_radio_type: "req-query",
					custom_field_value: "",
					api_opened: false,
					visible: false
				},
				detailInfo
			);
		},
		async submit() {
			const validateResults = await validateForm(this.dataXItem);
			if (AllWasWell(validateResults)) {
				const { catid, title, path, apiMethod } = pickValueFrom(this.dataXItem);
				const { projectId } = this.propDialogOptions;
				try {
					const res = await API.project.addInterface({
						project_id: projectId,
						catid,
						title,
						path,
						method: apiMethod
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
	render(vm) {
		return (
			<>
				<div class="dialog-modify-interface g-row flex1 flex horizon height100 width100 overflow-auto">
					<div class="flex1">
						<xForm labelStyle={{ "min-width": "120px", width: "unset" }}>
							<xGap t="10" />
							<xGap t="10" />
							<xItem configs={this.dataXItem.catid} />
							<xGap t="10" />
							<xItem configs={this.dataXItem.title} />
							<xGap t="10" />
							<xItem configs={this.dataXItem.basepath} />
							<xGap t="10" />
							<xItem configs={this.dataXItem.path} />
							{/* 接口路径参数 */}
							{this.vDomXItemPathparams}
							<xGap t="10" />
							<xItem configs={this.dataXItem.tag} />
							<xGap t="10" />
							<div class="flex">
								<xItem configs={this.dataXItem.isProxy} />
								<xItem configs={this.dataXItem.witchEnv} class="flex1" />
							</div>
							{/* 请求参数 */}
							<xGap t="10" /> <xItem configs={this.dataXItem.requestArgs} />
							{/* 响应参数  */}
							<xItem configs={this.dataXItem.responseArgs} />
							{/* 备注 */}
							<xItem configs={this.dataXItem.desc} />
						</xForm>
						<xGap t="10" />
					</div>
				</div>
				<xDialogFooter configs={this.configsDialogFooter} />
			</>
		);
	}
});

export const InpterfacePathParams = ({
	properties,
	slots,
	listeners,
	propsWillDeleteFromConfigs
}) => {
	properties.value = properties.value || [];
	const fnUpdate = (prop, val, index) => {
		properties.value[index][prop] = val;
		listeners["onUpdate:value"](properties.value);
	};
	return xU.map(properties.value, (data, index) => {
		const { desc, example, name, _id } = data;
		return (
			<div class="flex middel mt10 width100">
				<aTag class="mr10 flex middle" style="min-width:100px">
					{name}
				</aTag>
				<span class="mr10 flex1">
					<xItem
						configs={{
							placeholder: "参数示例",
							value: example,
							onAfterValueEmit: val => fnUpdate("example", val, index)
						}}
					/>
				</span>
				<span class="flex1">
					<xItem
						configs={{
							placeholder: "备注",
							value: desc,
							onAfterValueEmit: val => fnUpdate("desc", val, index)
						}}
					/>
				</span>
			</div>
		);
	});
};

export async function openProxyEnvDialog() {
	const { _layerKey } = await UI.dialog.component({
		title: State_UI.$t("管理项目接口转发环境").label,
		component: DialogUpsertProxyEnv
	});
	/*弹窗里面的弹窗点击之后不关闭（点不到其他位置）*/
	$(`#layui-layer-shade${_layerKey}`).css("z-index", 1);
}

async function openUpsertTagDialog() {
	const { _layerKey } = await UI.dialog.component({
		title: State_UI.$t("管理项目接口Tags").label,
		component: DialogUpsertTags
	});
	/*弹窗里面的弹窗点击之后不关闭（点不到其他位置）*/
	$(`#layui-layer-shade${_layerKey}`).css("z-index", 1);
}

const EnvSelectRender = ({
	properties,
	slots,
	listeners,
	propsWillDeleteFromConfigs
}) => {
	properties.value = properties.value || [];
	const options = properties.options || [];
	const fnUpdate = val => {
		listeners["onUpdate:value"](val);
	};
	const vDomOptions = xU.map(options, item => {
		return (
			<aSelectOption value={item.value} key={item.value}>
				{item.label}
			</aSelectOption>
		);
	});
	return (
		<div class="flex overflow-auto">
			<aSelect
				placeholder="请选择转发环境"
				onChange={fnUpdate}
				value={properties.value}>
				{vDomOptions}
			</aSelect>
			<xGap l="10" />
			<xButton
				configs={{
					text: State_UI.$t("转发环境设置").label,
					onClick: openProxyEnvDialog
				}}
				class="ml10"
				type="primary"
			/>
		</div>
	);
};
const TagSelectRender = ({
	properties,
	slots,
	listeners,
	propsWillDeleteFromConfigs
}) => {
	properties.value = properties.value || [];
	const options = properties.options || [];
	const fnUpdate = val => {
		listeners["onUpdate:value"](val);
	};

	const vDomOptions = xU.map(options, item => {
		return (
			<aSelectOption value={item.name} key={item.name}>
				<span v-uiPopover={{ content: item.desc }}>{item.name}</span>
			</aSelectOption>
		);
	});
	return (
		<div class="flex overflow-auto">
			<aSelect
				placeholder="请选择 tag"
				onChange={fnUpdate}
				mode="multiple"
				value={properties.value}>
				{vDomOptions}
			</aSelect>
			<xGap l="10" />
			<xButton
				configs={{
					text: State_UI.$t("Tag设置").label,
					onClick: openUpsertTagDialog
				}}
				class="ml10"
				type="primary"
			/>
		</div>
	);
};

const RequestArgsRender = defineComponent({
	props: ["properties", "listeners"],
	render() {
		return (
			<RequestArgsPanel
				params={this.properties?.value}
				apiMethod={this.properties?.deepWatch?.apiMethod}
				onUpdate:params={this.listeners["onUpdate:value"]}
			/>
		);
	}
});
const MarkdownRender = defineComponent({
	props: ["properties", "listeners"],
	render() {
		return (
			<TuiEditor
				md={this.properties?.value}
				onUpdate:md={this.listeners["onUpdate:value"]}
			/>
		);
	}
});

const ResponseRender = ({
	properties,
	slots,
	listeners,
	propsWillDeleteFromConfigs
}) => {
	/* input */
	properties.value = properties.value || {};
	return (
		<ResponsePanel
			params={properties.value}
			onUpdate:params={listeners["onUpdate:value"]}
		/>
	);
};
