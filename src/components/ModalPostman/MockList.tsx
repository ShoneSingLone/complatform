import React, { Component } from "react";

import { Row, Input } from "ant-design-vue";
import constants from "@/utils/variable";
const wordList = constants.MOCK_SOURCE;
const Search = Input.Search;

class MockList extends Component {
	static propTypes = {
		click: PropTypes.func,
		clickValue: PropTypes.string
	};

	constructor(props) {
		super(props);
		this.state = {
			filter: "",
			list: []
		};
	}

	componentDidMount() {
		this.setState({
			list: wordList
		});
	}

	onFilter = e => {
		const list = wordList.filter(item => {
			return item.mock.indexOf(e.target.value) !== -1;
		});
		this.setState({
			filter: e.target.value,
			list: list
		});
	};

	render() {
		const { list, filter } = this.state;
		const { click, clickValue } = this.props;
		return (
			<div class="modal-postman-form-mock">
				<aSearch
					onChange={this.onFilter}
					value={filter}
					placeholder="搜索mock数据"
					class="mock-search"
				/>
				{list.map((item, index) => {
					return (
						<aRow
							key={index}
							type="flex"
							align="middle"
							class={"row " + (item.mock === clickValue ? "checked" : "")}
							onClick={() => click(item.mock)}>
							<span>{item.mock}</span>
						</aRow>
					);
				})}
			</div>
		);
	}
}

export default MockList;
