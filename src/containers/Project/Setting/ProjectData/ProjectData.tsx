import {
	Upload,
	Icon,
	message,
	Select,
	Tooltip,
	Button,
	Spin,
	Switch,
	Modal,
	Radio,
	Input,
	Checkbox
} from "ant-design-vue";

import "./ProjectData.scss";
import axios from "axios";

import URL from "url";

const Dragger = Upload.Dragger;
import { saveImportData } from "../../../../reducer/modules/interface";
import { fetchUpdateLogData } from "../../../../reducer/modules/news.js";
import { handleSwaggerUrlData } from "../../../../reducer/modules/project";
const Option = Select.Option;
const confirm = Modal.confirm;
const plugin = require("client/plugin.js");
const RadioGroup = Radio.Group;
const importDataModule = {};
const exportDataModule = {};
const HandleImportData = require("common/HandleImportData");
function handleExportRouteParams(url, status, isWiki) {
	if (!url) {
		return;
	}
	let urlObj = URL.parse(url, true),
		query = {};
	query = Object.assign(query, urlObj.query, { status, isWiki });
	return URL.format({
		pathname: urlObj.pathname,
		query
	});
}

// exportDataModule.pdf = {
//   name: 'Pdf',
//   route: '/api/interface/download_crx',
//   desc: '导出项目接口文档为 pdf 文件'
// }
@connect(
	state => {
		return {
			curCatid: -(-state.inter.curdata.catid),
			basePath: state.project.currProject.basepath,
			updateLogList: state.news.updateLogList,
			swaggerUrlData: state.project.swaggerUrlData
		};
	},
	{
		saveImportData,
		fetchUpdateLogData,
		handleSwaggerUrlData
	}
)
class ProjectData extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectCatid: "",
			menuList: [],
			curImportType: "swagger",
			curExportType: null,
			showLoading: false,
			dataSync: "merge",
			exportContent: "all",
			isSwaggerUrl: false,
			swaggerUrl: "",
			isWiki: false
		};
	}
	static propTypes = {
		match: PropTypes.object,
		curCatid: PropTypes.number,
		basePath: PropTypes.string,
		saveImportData: PropTypes.func,
		fetchUpdateLogData: PropTypes.func,
		updateLogList: PropTypes.array,
		handleSwaggerUrlData: PropTypes.func,
		swaggerUrlData: PropTypes.string
	};

	UNSAFE_componentWillMount() {
		axios
			.get(`/api/interface/getCatMenu?project_id=${this.$route.params.id}`)
			.then(data => {
				if (data.data.errcode === 0) {
					let menuList = data.data.data;
					this.setState({
						menuList: menuList,
						selectCatid: menuList[0]._id
					});
				}
			});
		plugin.emitHook("import_data", importDataModule);
		plugin.emitHook("export_data", exportDataModule, this.$route.params.id);
	}

	getDataModule() {
		const dataModule = importDataModule[this.state.curImportType];
		return dataModule || { run() {} };
	}
	selectChange(value) {
		this.setState({
			selectCatid: +value
		});
	}

	uploadChange = info => {
		const status = info.file.status;
		if (status !== "uploading") {
			console.log(info.file, info.fileList);
		}
		if (status === "done") {
			message.success(`${info.file.name} 文件上传成功`);
		} else if (status === "error") {
			message.error(`${info.file.name} 文件上传失败`);
		}
	};

	handleAddInterface = async res => {
		return await HandleImportData(
			res,
			this.$route.params.id,
			this.state.selectCatid,
			this.state.menuList,
			this.props.basePath,
			this.state.dataSync,
			message.error,
			message.success,
			() => this.setState({ showLoading: false })
		);
	};

	// 本地文件上传
	handleFile = info => {
		if (!this.state.curImportType) {
			return message.error("请选择导入数据的方式");
		}
		if (this.state.selectCatid) {
			this.setState({ showLoading: true });
			let reader = new FileReader();
			reader.readAsText(info.file);
			reader.onload = async res => {
				res = await this.getDataModule().run(res.target.result);
				if (this.state.dataSync === "merge") {
					// 开启同步
					this.showConfirm(res);
				} else {
					// 未开启同步
					await this.handleAddInterface(res);
				}
			};
		} else {
			message.error("请选择上传的默认分类");
		}
	};

	showConfirm = async res => {
		let that = this;
		let typeid = this.$route.params.id;
		let apiCollections = res.apis.map(item => {
			return {
				method: item.method,
				path: item.path
			};
		});
		let result = await this.props.fetchUpdateLogData({
			type: "project",
			typeid,
			apis: apiCollections
		});
		let domainData = result.payload.data.data;
		const ref = confirm({
			title: "您确认要进行数据同步????",
			width: 600,
			okType: "danger",
			iconType: "exclamation-circle",
			className: "dataImport-confirm",
			okText: "确认",
			cancelText: "取消",
			content: (
				<div class="postman-dataImport-modal">
					<div class="postman-dataImport-modal-content">
						{domainData.map((item, index) => {
							return (
								<div key={index} class="postman-dataImport-show-diff">
									<span
										class="logcontent"
										dangerouslySetInnerHTML={{ __html: item.content }}
									/>
								</div>
							);
						})}
					</div>
					<p class="info">
						温馨提示： 数据同步后，可能会造成原本的修改数据丢失
					</p>
				</div>
			),
			async onOk() {
				await that.handleAddInterface(res);
			},
			onCancel() {
				that.setState({ showLoading: false, dataSync: "normal" });
				ref.destroy();
			}
		});
	};

	handleImportType = val => {
		this.setState({
			curImportType: val,
			isSwaggerUrl: false
		});
	};

	handleExportType = val => {
		this.setState({
			curExportType: val,
			isWiki: false
		});
	};

	// 处理导入信息同步
	onChange = checked => {
		this.setState({
			dataSync: checked
		});
	};

	// 处理swagger URL 导入
	handleUrlChange = checked => {
		this.setState({
			isSwaggerUrl: checked
		});
	};

	// 记录输入的url
	swaggerUrlInput = url => {
		this.setState({
			swaggerUrl: url
		});
	};

	// url导入上传
	onUrlUpload = async () => {
		if (!this.state.curImportType) {
			return message.error("请选择导入数据的方式");
		}

		if (!this.state.swaggerUrl) {
			return message.error("url 不能为空");
		}
		if (this.state.selectCatid) {
			this.setState({ showLoading: true });
			try {
				// 处理swagger url 导入
				await this.props.handleSwaggerUrlData(this.state.swaggerUrl);
				// let result = json5_parse(this.props.swaggerUrlData)
				let res = await this.getDataModule().run(this.props.swaggerUrlData);
				if (this.state.dataSync === "merge") {
					// merge
					this.showConfirm(res);
				} else {
					// 未开启同步
					await this.handleAddInterface(res);
				}
			} catch (e) {
				this.setState({ showLoading: false });
				message.error(e.message);
			}
		} else {
			message.error("请选择上传的默认分类");
		}
	};

	// 处理导出接口是全部还是公开
	handleChange = e => {
		this.setState({ exportContent: e.target.value });
	};

	//  处理是否开启wiki导出
	handleWikiChange = e => {
		this.setState({
			isWiki: e.target.checked
		});
	};

	/**
	 *
	 *
	 * @returns
	 * @memberof ProjectData
	 */
	render() {
		const uploadMess = {
			name: "interfaceData",
			multiple: true,
			showUploadList: false,
			action: "/api/interface/interUpload",
			customRequest: this.handleFile,
			onChange: this.uploadChange
		};

		let exportHref, curExportType, exportUrl;

		curExportType =
			(this.state.curExportType &&
				exportDataModule[this.state.curExportType]) ||
			{};
		exportUrl = curExportType.route;

		if (exportUrl) {
			exportHref = handleExportRouteParams(
				exportUrl,
				this.state.exportContent,
				this.state.isWiki
			);
		}

		const SwaggerVNode = (() => {
			if (this.state.curImportType === "swagger") {
				return (
					<div class="dataSync">
						<span class="label">
							开启url导入&nbsp;
							<aTooltip title="swagger url 导入">
								<xIcon icon="question-circle-o" />
							</aTooltip>{" "}
							&nbsp;&nbsp;
						</span>

						<Switch
							checked={this.state.isSwaggerUrl}
							onChange={this.handleUrlChange}
						/>
					</div>
				);
			}
			return null;
		})();

		const SwaggerUrlVNode = (() => {
			if (this.state.isSwaggerUrl) {
				return (
					<div class="import-content url-import-content">
						<aInput
							placeholder="http://demo.swagger.io/v2/swagger.json"
							onChange={e => this.swaggerUrlInput(e.target.value)}
						/>
						<aButton
							type="primary"
							class="url-btn"
							onClick={this.onUrlUpload}
							loading={this.state.showLoading}>
							上传
						</aButton>
					</div>
				);
			} else {
				return (
					<div class="import-content">
						<aSpin spinning={this.state.showLoading} tip="上传中...">
							<Dragger {...uploadMess}>
								<p class="ant-upload-drag-icon">
									<xIcon icon="inbox" />
								</p>
								<p class="ant-upload-text">点击或者拖拽文件到上传区域</p>
								<p
									class="ant-upload-hint"
									onClick={e => {
										e.stopPropagation();
									}}
									dangerouslySetInnerHTML={{
										__html: this.state.curImportType
											? this.getDataModule().desc
											: null
									}}
								/>
							</Dragger>
						</aSpin>
					</div>
				);
			}
		})();

		// console.log('inter', this.state.exportContent);
		return (
			<div class="g-row">
				<div class="m-panel">
					<div class="postman-dataImport">
						<div class="dataImportCon">
							<div>
								<h3>
									数据导入&nbsp;
									<a
										target="_blank"
										rel="noopener noreferrer"
										href="https://hellosean1025.github.io/yapi/documents/data.html">
										<aTooltip title="点击查看文档">
											<xIcon icon="question-circle-o" />
										</aTooltip>
									</a>
								</h3>
							</div>
							{/* 20220615121020 */}
							<div class="dataImportTile">
								<Select
									placeholder="请选择导入数据的方式"
									value={this.state.curImportType}
									onChange={this.handleImportType}>
									{Object.keys(importDataModule).map(name => {
										return (
											<Option key={name} value={name}>
												{importDataModule[name].name}
											</Option>
										);
									})}
								</Select>
							</div>
							{/* 20220615121006 */}
							<div class="catidSelect">
								<Select
									value={this.state.selectCatid + ""}
									showSearch
									style={{ width: "100%" }}
									placeholder="请选择数据导入的默认分类"
									optionFilterProp="children"
									onChange={this.selectChange.bind(this)}
									filterOption={(input, option) =>
										option.props.children
											.toLowerCase()
											.indexOf(input.toLowerCase()) >= 0
									}>
									{this.state.menuList.map((item, key) => {
										return (
											<Option key={key} value={item._id + ""}>
												{item.name}
											</Option>
										);
									})}
								</Select>
							</div>
							{/* 20220615121103 */}
							<div class="dataSync">
								<span class="label">
									数据同步&nbsp;
									<aTooltip
										title={
											<div>
												<h3 style={{ color: "white" }}>普通模式</h3>
												<p>不导入已存在的接口</p>
												<br />
												<h3 style={{ color: "white" }}>智能合并</h3>
												<p>
													已存在的接口，将合并返回数据的 response，适用于导入了
													swagger 数据，保留对数据结构的改动
												</p>
												<br />
												<h3 style={{ color: "white" }}>完全覆盖</h3>
												<p>
													不保留旧数据，完全使用新数据，适用于接口定义完全交给后端定义
												</p>
											</div>
										}>
										<xIcon icon="question-circle-o" />
									</aTooltip>{" "}
								</span>
								<Select value={this.state.dataSync} onChange={this.onChange}>
									<Option value="normal">普通模式</Option>
									<Option value="good">智能合并</Option>
									<Option value="merge">完全覆盖</Option>
								</Select>
								{/* <Switch checked={this.state.dataSync} onChange={this.onChange} /> */}
							</div>
							{/* 20220615132731 */}
							{SwaggerVNode}
							{/* 20220615132731 */}
							{/* 20220615121103 */}
							{/* 20220615121006 */}
							{/* 20220615121020 */}
						</div>

						<div
							class="dataImportCon"
							style={{
								marginLeft: "20px",
								display: Object.keys(exportDataModule).length > 0 ? "" : "none"
							}}>
							<div>
								<h3>数据导出</h3>
							</div>
							<div class="dataImportTile">
								<Select
									placeholder="请选择导出数据的方式"
									onChange={this.handleExportType}>
									{Object.keys(exportDataModule).map(name => {
										return (
											<Option key={name} value={name}>
												{exportDataModule[name].name}
											</Option>
										);
									})}
								</Select>
							</div>

							<div class="dataExport">
								<RadioGroup defaultValue="all" onChange={this.handleChange}>
									<Radio value="all">全部接口</Radio>
									<Radio value="open">公开接口</Radio>
								</RadioGroup>
							</div>
							<div class="export-content">
								{this.state.curExportType ? (
									<div>
										<p class="export-desc">{curExportType.desc}</p>
										<a
											target="_blank"
											rel="noopener noreferrer"
											href={exportHref}>
											<aButton
												class="export-button"
												type="primary"
												size="large">
												{" "}
												导出{" "}
											</aButton>
										</a>
										<Checkbox
											checked={this.state.isWiki}
											onChange={this.handleWikiChange}
											class="wiki-btn"
											disabled={this.state.curExportType === "json"}>
											添加wiki&nbsp;
											<aTooltip title="开启后 html 和 markdown 数据导出会带上wiki数据">
												<xIcon icon="question-circle-o" />
											</aTooltip>{" "}
										</Checkbox>
									</div>
								) : (
									<aButton
										disabled
										class="export-button"
										type="primary"
										size="large">
										{" "}
										导出{" "}
									</aButton>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ProjectData;
