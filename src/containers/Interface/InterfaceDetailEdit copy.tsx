import {
	xI,
	pickValueFrom,
	setValueTo,
	itemsInvalid,
	xU,
	xScope
} from "@/ventose/ui";
import { computed, defineComponent, watch } from "vue";
import { API } from "@/api";
import { HTTP_METHOD } from "@/utils/variable";
import { stateInterface } from "@/state/interface";
import { _$handlePath } from "@/utils/common";
import { cptRouter } from "@/router/router";
import {
	getBasepath,
	getCatid,
	getTitle,
	getApiMethod,
	getPath,
	getApiOpened,
	getIsProxy,
	getNoticed,
	getPathParams,
	getRemark,
	getRequestArgs,
	getResponseArgs,
	getStatus,
	getTag,
	getWitchEnv
} from "./DialogModifyInterface.Helper";
import { stateApp } from "@/state/app";

/* 

{
	props: ["info"],
	setup() {
		var state = {};
		type t_vm = typeof state;
		state = xScope<t_vm>(state);

		return function () {
			return <h1>Edit</h1>;
		};
	}
}
*/

export const InterfaceDetailEdit = defineComponent({
	props: {
		info: {
			type: Object,
			required: true
		},
		categoryId: {
			type: String,
			required: true
		}
	},
	emits: ["update"],
	setup(props, { emit }) {
		var state = {
			reqArgs: "1",
			detailInfo: {},
			activeKey: "1",
			dataXItem: {
				catid: getCatid(props.categoryId),
				title: getTitle(),
				basepath: getBasepath(state),
				apiMethod: getApiMethod(state),
				path: getPath(state),
				pathParams: getPathParams(state),
				tag: getTag(state),
				status: getStatus(state),
				isProxy: getIsProxy(state),
				witchEnv: getWitchEnv(state),
				requestArgs: getRequestArgs(state),
				responseArgs: getResponseArgs(state),
				remark: getRemark(state),
				noticed: getNoticed(state),
				api_opened: getApiOpened(state)
			},
			/*  */
			async _setFormDataValues() {
				await xU.ensureValueDone(() => stateInterface.currInterface);
				const { data } = await API.project.fetchInterfaceDetail(
					stateInterface.currInterface._id
				);
				state.detailInfo = state._initState(data);
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
				} = state.detailInfo;
				xU(state.detailInfo);
				setValueTo(state.dataXItem, {
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
					noticed: stateApp.currProject.switch_notice
				});
			},
			_initState(detailInfo) {
				if (detailInfo.req_body_form) {
					detailInfo.req_body_form = detailInfo.req_body_form.map(item => {
						item.type = item.type === "text" ? "text" : "file";
						return item;
					});
				}
				return detailInfo;
			},
			_getFormData() {
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
				}: any = pickValueFrom(state.dataXItem);

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
					id: state.detailInfo._id,
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
				_formData.req_query = xU
					.filter(_formData.req_query, itemFill)
					.map(i => {
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
						throw new Error(xI("请求参数 json-schema 格式有误"));
					}
				}
				if (
					_formData.res_body_is_json_schema &&
					_formData.res_body &&
					_formData.res_body_type === "json"
				) {
					if (!_formData.res_body) {
						throw new Error(xI("返回数据 json-schema 格式有误"));
					}
				}
				return _formData;
			},
			async _submit() {
				emit("update");
				return;
				if (!(await itemsInvalid())) {
					try {
						const formData = this._getFormData();
						const { data } = await API.project.updateInterface(formData);
						if (data) {
							/* 更新 url 左侧树 */
							await (async () => {
								/* 可能修改了分类，影响对应url */
								cptRouter.value.query.category_id = formData.catid;
								/* 刷新右侧接口树 */
								await stateInterface._updateInterfaceMenuList();
								/* 设置树展开 */
								stateInterface._setExpand();

								if (this.propOptions.updateInterfaceInfo) {
									/* 更新详情  */
									await this.propOptions.updateInterfaceInfo();
								}
								/* @ts-ignore */
								setTimeout(() => {
									this.propOptions.$close();
								}, 1000);
							})();
							xU.message.success(xI("修改成功"));
						}
					} catch (error) {
						xU.message.error(xI("修改失败"));
					}
				}
			}
		};

		type t_state = typeof state;
		state = xScope<t_state>(state);

		watch(
			stateApp.currProject,
			(currProject: any) => {
				debugger;
				const { env: envArray, tag: tagArray, cat: category } = currProject;
				state.dataXItem.catid.setOptions(
					xU.map(category, i => ({ ...i, label: i.name, value: i._id }))
				);
				state.dataXItem.witchEnv.setOptions(envArray);
				state.dataXItem.tag.setOptions(tagArray);
			},
			{ immediate: true, deep: true }
		);

		const vDomXItemPathparams = computed(() => {
			if (xU.isArrayFill(state.dataXItem.pathParams.value)) {
				return (
					<>
						<xGap t />
						<xItem configs={state.dataXItem.pathParams} />
					</>
				);
			} else {
				return null;
			}
		});
		const interfaceId = computed(() => {
			return this.propOptions.oldInterface._id;
		});
		const configsDialogFooter = computed(() => {
			return {
				save: {
					preset: "save",
					onClick: this.submit
				}
			};
		});

		return function () {
			const vm = this;
			return (
				<>
					<div class="dialog-modify-interface x-dialog-boddy-wrapper flex1 flex horizon height100 width100 overflow-auto">
						<div class="flex1">
							<xForm labelStyle={{ "min-width": "120px", width: "unset" }}>
								<xGap t />
								<xItem configs={state.dataXItem.catid} />
								<xGap t />
								<xItem configs={state.dataXItem.title} />
								<xGap t />
								<xItem configs={state.dataXItem.basepath} />
								<xGap t />
								<xItem configs={state.dataXItem.path} />
								{/* 接口路径参数 */}
								{vm.vDomXItemPathparams}
								<xGap t />
								<xItem configs={state.dataXItem.tag} />
								<xGap t />
								<xItem configs={state.dataXItem.status} />
								<xGap t />
								<div class="flex">
									<xItem configs={state.dataXItem.isProxy} />
									<xItem configs={state.dataXItem.witchEnv} class="flex1" />
								</div>
								{/* 请求参数 */}
								<xGap t />
								{/* {JSON.stringify(state.dataXItem.requestArgs.value, null, 2)} */}
								<xItem configs={state.dataXItem.requestArgs} />
								{/* 响应参数  */}
								<xGap t />
								<xItem configs={state.dataXItem.responseArgs} />
								{/* 备注 */}
								<xLogObject obj={state.dataXItem.remark} hide />
								<xGap t />
								<xItem configs={state.dataXItem.remark} />
								<xGap t />
								<xItem configs={state.dataXItem.api_opened} />
							</xForm>
							<xGap t />
						</div>
					</div>
					<xDialogFooter>
						<xGap f="1" />
						<div style="min-width:120px;">
							<xItem configs={state.dataXItem.noticed} />
						</div>
						<xGap r="10" />
						<xButton configs={this.configsDialogFooter.cancel} />
						<xGap r="10" />
						<xButton configs={this.configsDialogFooter.save} />
					</xDialogFooter>
				</>
			);
		};
	},
	mounted() {
		this.setFormDataValues();
	}
});
