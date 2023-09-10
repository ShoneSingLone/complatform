import React, { Component } from "react";

import "./Label.scss";

export default class Label extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inputShow: false,
			inputValue: ""
		};
	}
	static propTypes = {
		onChange: PropTypes.func,
		desc: PropTypes.string,
		cat_name: PropTypes.string
	};
	toggle = () => {
		this.setState({ inputShow: !this.state.inputShow });
	};
	handleChange = event => {
		this.setState({ inputValue: event.target.value });
	};
	componentWillReceiveProps(nextProps) {
		if (this.props.desc === nextProps.desc) {
			this.setState({
				inputShow: false
			});
		}
	}
	render() {
		return (
			<div>
				{this.props.desc && (
					<div class="component-label">
						{!this.state.inputShow ? (
							<div>
								<p>
									{this.props.desc} &nbsp;&nbsp;
									<ElTooltip content="编辑简介">
										<xIcon
											onClick={this.toggle}
											class="interface-delete-icon"
											icon="edit"
										/>
									</ElTooltip>
								</p>
							</div>
						) : (
							<div class="label-input-wrapper">
								<ElInput
									onChange={this.handleChange}
									defaultValue={this.props.desc}
									size="small"
								/>
								<xIcon
									class="interface-delete-icon"
									onClick={() => {
										this.props.onChange(this.state.inputValue);
										this.toggle();
									}}
									icon="check"
								/>
								<xIcon
									class="interface-delete-icon"
									onClick={this.toggle}
									icon="close"
								/>
							</div>
						)}
					</div>
				)}
			</div>
		);
	}
}