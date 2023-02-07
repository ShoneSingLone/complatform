import {
	$,
	$t,
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
import { API } from "src/api/index";
import { State_App } from "../../../state/State_App";
import { FormRules } from "../../../utils/common.FormRules";
import { ITEM_OPTIONS, ITEM_OPTIONS_VDOM } from "../../../utils/common.options";
import { HTTP_METHOD } from "./../../../utils/variable";
import { Methods_Project, State_Project } from "./State_Project";
import { _$handlePath } from "src/utils/common";
import {
	EnvSelectRender,
	InpterfacePathParams,
	MarkdownRender,
	RequestArgsRender,
	ResponseRender,
	TagSelectRender
} from "./DialogModifyInterface.Helper";
import { Cpt_url } from "../../../router/router";

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
				cancel: {
					preset: "cancel",
					onClick: async () => {
						this.propDialogOptions.closeDialog();
					}
				},
				save: {
					preset: "save",
					onClick: this.submit
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
								return xU.merge({ name: "", desc: "", example: "" }, newValue);
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
					prop: "status",
					label: $t("状态").label,
					value: ITEM_OPTIONS.interfaceStatus[0].value,
					options: ITEM_OPTIONS.interfaceStatus,
					itemType: "Select"
				}),
				...defItem({
					prop: "isProxy",
					value: false,
					label: vm.$t("是否开启转发").label,
					options: ITEM_OPTIONS.trueOrFalse,
					itemType: "Switch"
				}),
				...defItem({
					isShow() {
						return vm.dataXItem.isProxy.value;
					},
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
					itemType: RequestArgsRender
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
					prop: "remark",
					label: vm.$t("备注").label,
					value: { html: "", md: "" },
					itemType: MarkdownRender
				}),
				...defItem({
					prop: "noticed",
					label: vm.$t("消息通知").label,
					labelVNodeRender: VNodeCollection.labelTips(
						<div>{vm.$t("开启消息通知，可在 项目设置 里修改").label}</div>
					),
					checkedChildren: vm.$t("开").label,
					unCheckedChildren: vm.$t("关").label,
					value: true,
					itemType: "Switch"
				}),
				...defItem({
					prop: "api_opened",
					label: vm.$t("开放接口").label,
					labelVNodeRender: VNodeCollection.labelTips(
						<div>{vm.$t("用户可以在 数据导出 时选择只导出公开接口").label}</div>
					),
					checkedChildren: vm.$t("开").label,
					unCheckedChildren: vm.$t("关").label,
					value: false,
					itemType: "Switch"
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
		async setFormDataValues() {
			const { data } = await API.project.fetchInterfaceDetail(
				this.propDialogOptions.interfaceId
			);
			this.detailInfo = this.initState(data);
			xU.doNothing(JSON.stringify(this.detailInfo, null, 2));
			const {
				api_opened,
				catid,
				title,
				path,
				req_params,
				tag,
				status,
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
				desc,
				markdown
			} = this.detailInfo;
			xU(this.detailInfo);
			setValueTo(this.dataXItem, {
				witchEnv,
				catid,
				title,
				apiMethod: method,
				path,
				remark: { md: markdown, html: desc },
				pathParams: req_params,
				tag: String(tag).split(",").filter(xU.isInput),
				status,
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
				},
				api_opened,
				noticed: this.State_App.currProject.switch_notice
			});
		},
		initState(detailInfo) {
			if (detailInfo.req_body_form) {
				detailInfo.req_body_form = detailInfo.req_body_form.map(item => {
					item.type = item.type === "text" ? "text" : "file";
					return item;
				});
			}
			return detailInfo;
		},
		getFormData() {
			const {
				catid,
				title,
				apiMethod,
				path,
				tag,
				status,
				isProxy,
				witchEnv,
				remark,
				requestArgs,
				responseArgs,
				pathParams,
				api_opened,
				noticed
			} = pickValueFrom(this.dataXItem);

			/* 请求 */
			const {
				req_body_type,
				req_body_other,
				req_query,
				req_headers,
				req_body_form
			} = requestArgs;
			/* 响应 */
			const { res_body_type, res_body } = responseArgs;
			/* 备注 */
			const { html: desc, md: markdown } = remark;

			const _formData = {
				id: this.detailInfo._id,
				/* 接口分类 */
				catid,
				title,
				method: apiMethod,
				path,
				isProxy,
				witchEnv,
				req_params: pathParams,
				tag,
				status,
				/* 请求 */
				req_body_type,
				req_body_other,
				req_query,
				req_headers,
				req_body_form,
				req_body_is_json_schema: true,
				/* 响应 */
				res_body_type,
				res_body,
				res_body_is_json_schema: true,
				desc,
				markdown,
				api_opened,
				/* 当前修改是否发送通知邮件 */
				switch_notice: noticed
			};

			let isFile = false;
			let haveContentType = false;

			if (_formData.req_body_type === "form") {
				xU.each(_formData.req_body_form, item => {
					delete item._id;
					if (item.type === "file") {
						isFile = true;
					}
				});

				xU.each(_formData.req_headers, item => {
					delete item._id;
					if (item.name === "Content-Type") {
						item.value = isFile
							? "multipart/form-data"
							: "application/x-www-form-urlencoded";
						haveContentType = true;
					}
				});

				if (haveContentType === false) {
					_formData.req_headers.unshift({
						name: "Content-Type",
						value: isFile
							? "multipart/form-data"
							: "application/x-www-form-urlencoded"
					});
				}
			} else if (_formData.req_body_type === "json") {
				_formData.req_headers
					? xU.each(_formData.req_headers, item => {
							delete item._id;
							if (item.name === "Content-Type") {
								item.value = "application/json";
								haveContentType = true;
							}
					  })
					: [];

				if (haveContentType === false) {
					_formData.req_headers = _formData.req_headers || [];
					_formData.req_headers.unshift({
						name: "Content-Type",
						value: "application/json"
					});
				}
			}

			const itemFill = item => item.name !== "";

			_formData.req_headers = _formData.req_headers
				? _formData.req_headers.filter(itemFill)
				: [];

			_formData.req_body_form = _formData.req_body_form
				? _formData.req_body_form.filter(itemFill)
				: [];
			_formData.req_params = _formData.req_params
				? _formData.req_params.filter(itemFill)
				: [];
			_formData.req_query = xU.filter(_formData.req_query, itemFill).map(i => {
				delete i._id;
				return i;
			});

			if (HTTP_METHOD[_formData.method].request_body !== true) {
				_formData.req_body_form = [];
			}

			if (
				_formData.req_body_is_json_schema &&
				_formData.req_body_other &&
				_formData.req_body_type === "json"
			) {
				if (!_formData.req_body_other) {
					throw new Error(this.$t("请求参数 json-schema 格式有误").label);
				}
			}
			if (
				_formData.res_body_is_json_schema &&
				_formData.res_body &&
				_formData.res_body_type === "json"
			) {
				if (!_formData.res_body) {
					throw new Error(this.$t("返回数据 json-schema 格式有误").label);
				}
			}
			return _formData;
		},
		async submit() {
			const validateResults = await validateForm(this.dataXItem);
			if (AllWasWell(validateResults)) {
				try {
					const formData = this.getFormData();
					const { data } = await API.project.updateInterface(formData);
					if (data) {
						/* 更新 url 左侧树 */
						await (async () => {
							/* 可能修改了分类，影响对应url */
							Cpt_url.value.query.category_id = formData.catid;
							/* 刷新右侧接口树 */
							await Methods_Project.updateInterfaceMenuList();
							/* 设置树展开 */
							Methods_Project.setExpand();

							if (this.propDialogOptions.updateInterfaceInfo) {
								/* 更新详情  */
								await this.propDialogOptions.updateInterfaceInfo();
							}
							/* @ts-ignore */
							setTimeout(() => {
								this.propDialogOptions.closeDialog();
							}, 1000);
						})();
						UI.message.success(this.$t("修改成功").label);
					}
				} catch (error) {
					UI.message.error(this.$t("修改失败").label);
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
							<xItem configs={this.dataXItem.status} />
							<xGap t="10" />
							<div class="flex">
								<xItem configs={this.dataXItem.isProxy} />
								<xItem configs={this.dataXItem.witchEnv} class="flex1" />
							</div>
							{/* 请求参数 */}
							<xGap t="10" />
							{/* {JSON.stringify(this.dataXItem.requestArgs.value, null, 2)} */}
							<xItem configs={this.dataXItem.requestArgs} />
							{/* 响应参数  */}
							<xGap t="10" />
							<xItem configs={this.dataXItem.responseArgs} />
							{/* 备注 */}
							<xLogObject obj={this.dataXItem.remark} hide />
							<xGap t="10" />
							<xItem configs={this.dataXItem.remark} />
							<xGap t="10" />
							<xItem configs={this.dataXItem.api_opened} />
						</xForm>
						<xGap t="10" />
					</div>
				</div>
				<xDialogFooter>
					<xGap f="1" />
					<div style="min-width:120px;">
						<xItem configs={this.dataXItem.noticed} />
					</div>
					<xGap r="10" />
					<xButton configs={this.configsDialogFooter.cancel} />
					<xGap r="10" />
					<xButton configs={this.configsDialogFooter.save} />
				</xDialogFooter>
			</>
		);
	}
});
