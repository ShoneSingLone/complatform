import {
	validateForm,
	AllWasWell,
	pickValueFrom,
	UI,
	defItem,
	xU,
	setValueTo
} from "@ventose/ui";
import { defineComponent, markRaw } from "vue";
import { API } from "../../../api";
import { Cpt_currProject, State_App } from "../../../state/State_App";
import { FormRules } from "../../../utils/common.FormRules";
import { ITEM_OPTIONS } from "../../../utils/common.options";
import { HTTP_METHOD } from "./../../../utils/variable";
import { State_Project } from "./State_Project";
import { VNodeCollection } from "@ventose/ui";
import { _$interfacePathParamsTpl } from "src/utils/common";

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
		return { State_App, State_Project, Cpt_currProject };
	},
	computed: {
		interfaceId() {
			return this.propDialogOptions.oldInterface._id;
		},
		vDomInterfacePathParams() {
			debugger;
			return xU.map(this.detailInfo, _$interfacePathParamsTpl);
		}
	},
	data() {
		const vm = this;
		return {
			activeKey: "1",
			...defItem({
				value: "",
				itemType: "Select",
				prop: "apiMethod",
				options: ITEM_OPTIONS.httpMethod,
				rules: [FormRules.required()],
				once() {
					this.value = xU.first(this.options).value;
				},
				style: { width: "120px" }
			}),
			dataXItem: {}
		};
	},
	mounted() {
		const vm = this;
		this.propDialogOptions.vm = this;
		const detailInfo = this.initState(this.propDialogOptions.oldInterface);
		const { catid, title, path } = detailInfo;

		this.dataXItem = {
			...defItem({
				value: catid,
				itemType: "Select",
				prop: "catid",
				label: vm.$t("接口分类").label,
				placeholder: "分类名称",
				options: [],
				rules: [FormRules.required()],
				once() {
					this.options = vm.State_Project.allCategory;
					/* 默认在点击的分类下添加新接口 */
					if (vm.propDialogOptions.categoryId) {
						this.value = vm.propDialogOptions.categoryId;
					} else {
						this.value = xU.first(this.options)?.value || "";
					}
				}
			}),
			...defItem({
				value: title,
				prop: "title",
				label: vm.$t("接口名称").label,
				placeholder: vm.$t("接口名称").label,
				rules: [
					FormRules.required(),
					FormRules.nameLength({ label: vm.$t("接口").label })
				]
			}),
			...defItem({
				value: vm.Cpt_currProject.basepath,
				prop: "basepath",
				label: vm.$t("接口基本路径").label,
				labelVNodeRender:
					VNodeCollection.labelTips(`接口基本路径，可在 项目设置 里修改`),
				disabled: true
			}),
			...defItem({
				value: path,
				prop: "path",
				label: vm.$t("接口路径").label,
				labelVNodeRender: VNodeCollection.labelTips(
					<div>
						<p>
							1. 支持动态路由,例如:
							{`{DEMOPATH}`}
						</p>
						<p>
							2. 支持 ?controller=xxx 的QueryRouter,非router的Query参数请定义到
							Request设置-&#62;Query
						</p>
					</div>
				),
				placeholder: "/path",
				rules: [FormRules.required(), FormRules.apiPath()],
				once() {
					const vDomApiMethodsSelector = <xItem configs={vm.apiMethod} />;
					this.slots = markRaw({
						addonBefore: () => vDomApiMethodsSelector
					});
				}
			})
		};
	},
	methods: {
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
				const { catid, title, path } = pickValueFrom(this.dataXItem);
				const { projectId } = this.propDialogOptions;
				try {
					const res = await API.project.addInterface({
						project_id: projectId,
						catid,
						title,
						path,
						method: this.apiMethod.value
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
	render() {
		return (
			<div class="dialog-modify-interface g-row flex1 flex horizon height100 width100">
				<a-tabs v-model:activeKey={this.activeKey} tab-position="left" animated>
					<a-tab-pane key="1" tab="基本设置"></a-tab-pane>
					<a-tab-pane key="2" tab="请求参数"></a-tab-pane>
					<a-tab-pane key="3" tab="返回数据"></a-tab-pane>
					<a-tab-pane key="4" tab="备注"></a-tab-pane>
				</a-tabs>
				<div className="flex1">
					<xGap t="10" />
					<xForm
						style={{ display: this.activeKey === "1" ? "block" : "none" }}
						class="flex vertical"
						labelStyle={{ "min-width": "120px", width: "unset" }}>
						<xGap t="10" /> <xItem configs={this.dataXItem.catid} />
						<xGap t="10" /> <xItem configs={this.dataXItem.title} />
						<xGap t="10" /> <xItem configs={this.dataXItem.basepath} />
						<xGap t="10" /> <xItem configs={this.dataXItem.path} />
					</xForm>
					<xGap t="10" />
				</div>
			</div>
		);
	}
});
