// 测试集合中的环境切换

import React from "react";

import "./index.scss";

const Option = Select.Option;
const Panel = Collapse.Panel;

export default class CaseEnv extends React.Component {
	constructor(props) {
		super(props);
	}

	static propTypes = {
		envList: PropTypes.array,
		currProjectEnvChange: PropTypes.func,
		changeClose: PropTypes.func,
		collapseKey: PropTypes.any,
		envValue: PropTypes.object
	};

	callback = key => {
		this.props.changeClose && this.props.changeClose(key);
	};

	render() {
		return (
			<aCollapse
				style={{
					margin: 0,
					marginBottom: "16px"
				}}
				onChange={this.callback}
				// activeKey={this.state.activeKey}
				activeKey={this.props.collapseKey}>
				<Panel
					header={
						<span>
							{" "}
							选择测试用例环境
							<aTooltip title="默认使用测试用例选择的环境">
								{" "}
								<xIcon icon="question-circle-o" />{" "}
							</aTooltip>
						</span>
					}
					key="1">
					<div class="case-env">
						{this.props.envList.length > 0 && (
							<div>
								{this.props.envList.map(item => {
									return (
										<aRow
											key={item._id}
											type="flex"
											justify="space-around"
											align="middle"
											class="env-item">
											<ElCol span={6} class="label">
												<aTooltip title={item.name}>
													<span class="label-name">{item.name}</span>
												</aTooltip>
											</ElCol>
											<ElCol span={18}>
												<Select
													style={{
														width: "100%"
													}}
													value={this.props.envValue[item._id] || ""}
													defaultValue=""
													onChange={val =>
														this.props.currProjectEnvChange(val, item._id)
													}>
													<Option key="default" value="">
														默认环境
													</Option>

													{item.env.map(key => {
														return (
															<Option value={key.name} key={key._id}>
																{key.name + ": " + key.domain}
															</Option>
														);
													})}
												</Select>
											</ElCol>
										</aRow>
									);
								})}
							</div>
						)}
					</div>
				</Panel>
			</aCollapse>
		);
	}
}
