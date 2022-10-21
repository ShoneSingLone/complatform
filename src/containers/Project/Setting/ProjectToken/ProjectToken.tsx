import React, { Component } from "react";

import "./ProjectToken.scss";
import { getToken, updateToken } from "../../../../reducer/modules/project";

import { Icon, Tooltip, message, Modal } from "ant-design-vue";
import copy from "copy-to-clipboard";
const confirm = Modal.confirm;

@connect(
	state => {
		return {
			token: state.project.token
		};
	},
	{
		getToken,
		updateToken
	}
)
class ProjectToken extends Component {
	static propTypes = {
		projectId: PropTypes.number,
		getToken: PropTypes.func,
		token: PropTypes.string,
		updateToken: PropTypes.func,
		curProjectRole: PropTypes.string
	};

	async componentDidMount() {
		await this.props.getToken(this.props.projectId);
	}

	copyToken = () => {
		copy(this.props.token);
		message.success("已经成功复制到剪切板");
	};

	updateToken = () => {
		let that = this;
		confirm({
			title: "重新生成key",
			content: "重新生成之后，之前的key将无法使用，确认重新生成吗？",
			okText: "确认",
			cancelText: "取消",
			async onOk() {
				await that.props.updateToken(that.props.projectId);
				message.success("更新成功");
			},
			onCancel() {}
		});
	};

	render() {
		return (
			<div class="project-token">
				<h2 class="token-title">工具标识</h2>
				<div class="message">
					每个项目都有唯一的标识token，用户可以使用这个token值来请求项目
					openapi.
				</div>
				<div class="token">
					<span>
						token: <span class="token-message">{this.props.token}</span>
					</span>
					<aTooltip title="复制">
						<aIcon class="token-btn" type="copy" onClick={this.copyToken} />
					</aTooltip>
					{this.props.curProjectRole === "admin" ||
					this.props.curProjectRole === "owner" ? (
						<aTooltip title="刷新">
							<aIcon
								class="token-btn"
								type="reload"
								onClick={this.updateToken}
							/>
						</aTooltip>
					) : null}
				</div>
				<div class="blockquote">
					为确保项目内数据的安全性和私密性，请勿轻易将该token暴露给项目组外用户。
				</div>
				<br />
				<h2 class="token-title">open接口：</h2>
				<p>
					<a
						target="_blank"
						rel="noopener noreferrer"
						href="https://hellosean1025.github.io/yapi/openapi.html">
						详细接口文档
					</a>
				</p>
				<div>
					<ul class="open-api">
						<li>/api/open/run_auto_test [运行自动化测试]</li>
						<li>/api/open/import_data [导入数据]</li>
						<li>/api/interface/add [新增接口]</li>
						<li>/api/interface/save [保存接口]</li>
						<li>/api/interface/up [更新接口]</li>
						<li>/api/interface/get [获取接口]</li>
						<li>/api/interface/list [获取接口列表]</li>
						<li>/api/interface/list_menu [获取接口菜单]</li>
						<li>/api/interface/add_cat [新增接口分类]</li>
						<li>/api/interface/getCatMenu [获取所有分类]</li>
					</ul>
				</div>
			</div>
		);
	}
}

export default ProjectToken;
