import "./View.scss";

import {
	Table,
	Icon,
	Row,
	Col,
	Tooltip,
	message,
	Button
} from "ant-design-vue";

import AceEditor from "client/components/AceEditor/AceEditor";
import { formatTime, safeArray } from "../../../../common.js";
import ErrMsg from "../../../../components/ErrMsg/ErrMsg.js";
import variable from "../../../../constants/variable";
import constants from "@/utils/variable";
import copy from "copy-to-clipboard";
import SchemaTable from "../../../../components/SchemaTable/SchemaTable.js";
import _ from "lodash";
import { reduce } from "underscore";

const column_require = {
	title: "是否必须",
	dataIndex: "required",
	key: "required",
	width: 100,
	sorter: a => {
		if (a.required === "是") {
			return -1;
		}
		return 1;
	},
	render(_, item) {
		if (item.required === "是") {
			return <span style={{ color: "red" }}>{item.required}</span>;
		}
		return <span>{item.required}</span>;
	}
};
//
const HTTP_METHOD = constants.HTTP_METHOD;
@connect(state => {
	return {
		curData: state.inter.curdata,
		custom_field: state.group.field,
		currProject: state.project.currProject
	};
})
class View extends Component {
	constructor(props) {
		super(props);
		this.state = {
			init: true,
			enter: false
		};
	}

	static propTypes = {
		curData: PropTypes.object,
		currProject: PropTypes.object,
		custom_field: PropTypes.object
	};

	req_body_form(req_body_type, req_body_form) {
		if (req_body_type === "form") {
			const body_columns = [
				{
					title: "参数名称",
					dataIndex: "name",
					key: "name",
					width: 140
				},
				{
					title: "参数类型",
					dataIndex: "type",
					key: "type",
					width: 100,
					render: text => {
						text = text || "";
						return text.toLowerCase() === "text" ? (
							<span>
								<i class="query-icon text">T</i>文本
							</span>
						) : (
							<span>
								<xIcon icon="file" class="query-icon" />
								文件
							</span>
						);
					}
				},
				column_require,
				{
					title: "示例",
					dataIndex: "example",
					key: "example",
					width: 80,
					render(_, item) {
						return <p style={{ whiteSpace: "pre-wrap" }}>{item.example}</p>;
					}
				},
				{
					title: "备注",
					dataIndex: "value",
					key: "value",
					render(_, item) {
						return <p style={{ whiteSpace: "pre-wrap" }}>{item.value}</p>;
					}
				}
			];

			const dataSource = [];
			if (req_body_form && req_body_form.length) {
				req_body_form.map((item, i) => {
					dataSource.push({
						key: i,
						name: item.name,
						value: item.desc,
						example: item.example,
						required: item.required == 0 ? "否" : "是",
						type: item.type
					});
				});
			}

			return (
				<div
					style={{ display: dataSource.length ? "" : "none" }}
					class="colBody">
					<Table
						bordered
						size="small"
						pagination={false}
						columns={body_columns}
						dataSource={dataSource}
					/>
				</div>
			);
		}
	}

	res_body(res_body_type, res_body, res_body_is_json_schema) {
		if (res_body_type === "json") {
			if (res_body_is_json_schema) {
				return <SchemaTable dataSource={res_body} />;
			} else {
				return (
					<div class="colBody">
						{/* <div id="vres_body_json" style={{ minHeight: h * 16 + 100 }}></div> */}
						<AceEditor
							data={res_body}
							readOnly={true}
							style={{ minHeight: 600 }}
						/>
					</div>
				);
			}
		} else if (res_body_type === "raw") {
			return (
				<div class="colBody">
					<AceEditor
						data={res_body}
						readOnly={true}
						mode="text"
						style={{ minHeight: 300 }}
					/>
				</div>
			);
		}
	}

	req_body(req_body_type, req_body_other, req_body_is_json_schema) {
		if (req_body_other) {
			if (req_body_is_json_schema && req_body_type === "json") {
				return <SchemaTable dataSource={req_body_other} />;
			} else {
				return (
					<div class="colBody">
						<AceEditor
							data={req_body_other}
							readOnly={true}
							style={{ minHeight: 300 }}
							mode={req_body_type === "json" ? "javascript" : "text"}
						/>
					</div>
				);
			}
		}
	}

	req_query(query) {
		const query_columns = [
			{
				title: "参数名称",
				dataIndex: "name",
				width: 140,
				key: "name"
			},
			column_require,
			{
				title: "示例",
				dataIndex: "example",
				key: "example",
				width: 80,
				render(_, item) {
					return <p style={{ whiteSpace: "pre-wrap" }}>{item.example}</p>;
				}
			},
			{
				title: "备注",
				dataIndex: "value",
				key: "value",
				render(_, item) {
					return <p style={{ whiteSpace: "pre-wrap" }}>{item.value}</p>;
				}
			}
		];

		const dataSource = [];
		if (query && query.length) {
			query.map((item, i) => {
				dataSource.push({
					key: i,
					name: item.name,
					value: item.desc,
					example: item.example,
					required: item.required == 0 ? "否" : "是"
				});
			});
		}

		return (
			<Table
				bordered
				size="small"
				pagination={false}
				columns={query_columns}
				dataSource={dataSource}
			/>
		);
	}

	countEnter(str) {
		let i = 0;
		let c = 0;
		if (!str || !str.indexOf) {
			return 0;
		}
		while (str.indexOf("\n", i) > -1) {
			i = str.indexOf("\n", i) + 2;
			c++;
		}
		return c;
	}

	componentDidMount() {
		if (!this.props.curData.title && this.state.init) {
			this.setState({ init: false });
		}
	}

	enterItem = () => {
		this.setState({
			enter: true
		});
	};

	leaveItem = () => {
		this.setState({
			enter: false
		});
	};

	copyUrl = url => {
		copy(url);
		message.success("已经成功复制到剪切板");
	};

	flagMsg = (mock, strice) => {
		if (mock && strice) {
			return <span>( 全局mock & 严格模式 )</span>;
		} else if (!mock && strice) {
			return <span>( 严格模式 )</span>;
		} else if (mock && !strice) {
			return <span>( 全局mock )</span>;
		} else {
			return;
		}
	};

	render() {
		const dataSource = [];
		if (
			this.props.curData.req_headers &&
			this.props.curData.req_headers.length
		) {
			this.props.curData.req_headers.map((item, i) => {
				dataSource.push({
					key: i,
					name: item.name,
					required: item.required == 0 ? "否" : "是",
					value: item.value,
					example: item.example,
					desc: item.desc
				});
			});
		}

		const req_dataSource = [];
		if (this.props.curData.req_params && this.props.curData.req_params.length) {
			this.props.curData.req_params.map((item, i) => {
				req_dataSource.push({
					key: i,
					name: item.name,
					desc: item.desc,
					example: item.example
				});
			});
		}
		const req_path_params_columns = [
			{
				title: "参数名称",
				dataIndex: "name",
				key: "name",
				width: 140
			},
			{
				title: "示例",
				dataIndex: "example",
				key: "example",
				width: 80,
				render(_, item) {
					return <p style={{ whiteSpace: "pre-wrap" }}>{item.example}</p>;
				}
			},
			{
				title: "备注",
				dataIndex: "desc",
				key: "desc",
				render(_, item) {
					return <p style={{ whiteSpace: "pre-wrap" }}>{item.desc}</p>;
				}
			}
		];

		const headers_columns = [
			{
				title: "参数名称",
				dataIndex: "name",
				key: "name",
				width: "200px"
			},
			{
				title: "参数值",
				dataIndex: "value",
				key: "value",
				width: "300px"
			},
			column_require,
			{
				title: "示例",
				dataIndex: "example",
				key: "example",
				width: "80px",
				render(_, item) {
					return <p style={{ whiteSpace: "pre-wrap" }}>{item.example}</p>;
				}
			},
			{
				title: "备注",
				dataIndex: "desc",
				key: "desc",
				render(_, item) {
					return <p style={{ whiteSpace: "pre-wrap" }}>{item.desc}</p>;
				}
			}
		];
		let status = {
			undone: "未完成",
			done: "已完成"
		};

		let showProxyEnv = () => {
			if (!this.props.curData.isProxy) {
				return "未开启转发";
			}
			const envId = this.props.curData.witchEnv;
			if (!envId) {
				return "任意";
			}

			if (envId) {
				const envArray = this.props.currProject.env;
				let env = _.find(envArray, { _id: envId });
				if (env) {
					return `${env.name}=====${env.domain}`;
				}
			} else {
				return "--";
			}
		};

		let bodyShow =
			this.props.curData.req_body_other ||
			(this.props.curData.req_body_type === "form" &&
				this.props.curData.req_body_form &&
				this.props.curData.req_body_form.length);

		let requestShow =
			(dataSource && dataSource.length) ||
			(req_dataSource && req_dataSource.length) ||
			(this.props.curData.req_query && this.props.curData.req_query.length) ||
			bodyShow;

		let methodColor =
			variable.METHOD_COLOR[
				this.props.curData.method
					? this.props.curData.method.toLowerCase()
					: "get"
			];

		// statusColor = statusColor[this.props.curData.status?this.props.curData.status.toLowerCase():"undone"];
		// const aceEditor = <div style={{ display: this.props.curData.req_body_other && (this.props.curData.req_body_type !== "form") ? "block" : "none" }} class="colBody">
		//   <AceEditor data={this.props.curData.req_body_other} readOnly={true} style={{ minHeight: 300 }} mode={this.props.curData.req_body_type === 'json' ? 'javascript' : 'text'} />
		// </div>
		if (!methodColor) {
			methodColor = "get";
		}

		const { tag, up_time, title, uid, username } = this.props.curData;

		const ajaxCode = `/**
*  ${title}
*  ${window.location.href}
*/
async ${_.camelCase(this.props.curData.path)}({params,data}) {
  return ajax({
    method: "${this.props.curData.method}",
    url: \`${this.props.curData.path}\`,
    params:params||{},
    data:data||{}
  });
}`;

		let res = (
			<div class="caseContainer">
				<h2 class="interface-title" style={{ marginTop: 0 }}>
					基本信息
				</h2>
				<div class="panel-view">
					<aRow class="row">
						<aCol span={4} class="colKey">
							接口名称：
						</aCol>
						<aCol span={8} class="colName">
							<span title={title}>{title}</span>
						</aCol>
						<aCol span={4} class="colKey">
							创&ensp;建&ensp;人：
						</aCol>
						<aCol span={8} class="colValue">
							<RouterLink class="user-name" to={"/user/profile/" + uid}>
								<img src={"/api/user/avatar?uid=" + uid} class="user-img" />
								{username}
							</RouterLink>
						</aCol>
					</aRow>
					<aRow class="row">
						<aCol span={4} class="colKey">
							状&emsp;&emsp;态：
						</aCol>
						<aCol span={8} class={"tag-status " + this.props.curData.status}>
							{status[this.props.curData.status]}
						</aCol>
						<aCol span={4} class="colKey">
							更新时间：
						</aCol>
						<aCol span={8}>{formatTime(up_time)}</aCol>
					</aRow>
					{safeArray(tag) && safeArray(tag).length > 0 && (
						<aRow class="row remark">
							<aCol span={4} class="colKey">
								Tag ：
							</aCol>
							<aCol span={18} class="colValue">
								{tag.join(" , ")}
							</aCol>
						</aRow>
					)}
					<aRow class="row">
						<aCol span={4} class="colKey">
							接口路径：
						</aCol>
						<aCol
							span={18}
							class="colValue"
							onMouseEnter={this.enterItem}
							onMouseLeave={this.leaveItem}>
							<span
								style={{
									color: methodColor.color,
									backgroundColor: methodColor.bac
								}}
								class="colValue tag-method">
								{this.props.curData.method}
							</span>
							<span class="colValue">
								{this.props.currProject.basepath}
								{this.props.curData.path}
							</span>
							<aTooltip title="复制路径">
								<aIcon
									type="copy"
									class="interface-url-icon"
									onClick={() =>
										this.copyUrl(
											this.props.currProject.basepath + this.props.curData.path
										)
									}
									style={{
										display: this.state.enter ? "inline-block" : "none"
									}}
								/>
							</aTooltip>
						</aCol>
					</aRow>
					<aRow class="row">
						<aCol span={4} class="colKey">
							开启转发：
						</aCol>
						<aCol span={18} class="colValue">
							<span>{this.props.curData.isProxy ? "开启" : "关闭"}</span>
						</aCol>
					</aRow>
					{/* 转发环境  */}
					{this.props.curData.isProxy ? (
						<aRow class="row">
							<aCol span={4} class="colKey">
								转发环境：
							</aCol>
							<aCol span={18} class="colValue">
								<span>{showProxyEnv()}</span>
							</aCol>
						</aRow>
					) : null}
					{/* 转发环境  */}

					<aRow class="row">
						<aCol span={4} class="colKey">
							Mock地址：
						</aCol>
						<aCol span={18} class="colValue">
							{this.flagMsg(
								this.props.currProject.is_mock_open,
								this.props.currProject.strice
							)}
							<span
								class="href"
								onClick={() =>
									window.open(
										location.protocol +
											"//" +
											location.hostname +
											(location.port !== "" ? ":" + location.port : "") +
											`/mock/${this.props.currProject._id}${this.props.currProject.basepath}${this.props.curData.path}`,
										"_blank"
									)
								}>
								{location.protocol +
									"//" +
									location.hostname +
									(location.port !== "" ? ":" + location.port : "") +
									`/mock/${this.props.currProject._id}${this.props.currProject.basepath}${this.props.curData.path}`}
							</span>
						</aCol>
					</aRow>
					<aRow class="row">
						<aCol span={4} class="colKey">
							ajax代码：
						</aCol>
						<aCol
							span={18}
							class="colValue"
							style={{
								position: "relative"
							}}>
							<aButton
								onClick={() => this.copyUrl(ajaxCode)}
								style={{
									position: "absolute",
									top: 0,
									right: 0,
									zIndex: 1
								}}>
								复制代码
							</aButton>
							<AceEditor
								data={ajaxCode}
								readOnly={true}
								mode="text"
								style={{ minHeight: 180 }}
							/>
						</aCol>
					</aRow>
					{this.props.curData.custom_field_value &&
						this.props.custom_field.enable && (
							<aRow class="row remark">
								<aCol span={4} class="colKey">
									{this.props.custom_field.name}：
								</aCol>
								<aCol span={18} class="colValue">
									{this.props.curData.custom_field_value}
								</aCol>
							</aRow>
						)}
				</div>
				{this.props.curData.desc && <h2 class="interface-title">备注</h2>}
				{this.props.curData.desc && (
					<div
						class="tui-editor-contents"
						style={{ margin: "0px", padding: "0px 20px", float: "none" }}
						dangerouslySetInnerHTML={{ __html: this.props.curData.desc }}
					/>
				)}
				<h2
					class="interface-title"
					style={{ display: requestShow ? "" : "none" }}>
					请求参数
				</h2>
				{req_dataSource.length ? (
					<div class="colHeader">
						<h3 class="col-title">路径参数：</h3>
						<Table
							bordered
							size="small"
							pagination={false}
							columns={req_path_params_columns}
							dataSource={req_dataSource}
						/>
					</div>
				) : (
					""
				)}
				{dataSource.length ? (
					<div class="colHeader">
						<h3 class="col-title">Headers：</h3>
						<Table
							bordered
							size="small"
							pagination={false}
							columns={headers_columns}
							dataSource={dataSource}
						/>
					</div>
				) : (
					""
				)}
				{this.props.curData.req_query && this.props.curData.req_query.length ? (
					<div class="colQuery">
						<h3 class="col-title">Query：</h3>
						{this.req_query(this.props.curData.req_query)}
					</div>
				) : (
					""
				)}

				<div
					style={{
						display:
							this.props.curData.method &&
							HTTP_METHOD[this.props.curData.method.toUpperCase()].request_body
								? ""
								: "none"
					}}>
					<h3 style={{ display: bodyShow ? "" : "none" }} class="col-title">
						Body:
					</h3>
					{this.props.curData.req_body_type === "form"
						? this.req_body_form(
								this.props.curData.req_body_type,
								this.props.curData.req_body_form
						  )
						: this.req_body(
								this.props.curData.req_body_type,
								this.props.curData.req_body_other,
								this.props.curData.req_body_is_json_schema
						  )}
				</div>

				<h2 class="interface-title">返回数据</h2>
				{this.res_body(
					this.props.curData.res_body_type,
					this.props.curData.res_body,
					this.props.curData.res_body_is_json_schema
				)}
			</div>
		);

		if (!this.props.curData.title) {
			if (this.state.init) {
				res = <div />;
			} else {
				res = <ErrMsg type="noData" />;
			}
		}
		return res;
	}
}

export default View;
