import React, { Component } from "react";

import json5 from "json5";

import { schemaTransformToTable } from "../../../common/schema-transformTo-table.js";
import { xU } from "@/ventose/ui";
import "./index.scss";

const messageMap = {
	desc: "备注",
	default: "实例",
	maximum: "最大值",
	minimum: "最小值",
	maxItems: "最大数量",
	minItems: "最小数量",
	maxLength: "最大长度",
	minLength: "最小长度",
	enum: "枚举",
	enumDesc: "枚举备注",
	uniqueItems: "元素是否都不同",
	itemType: "item 类型",
	format: "format",
	itemFormat: "format",
	mock: "mock"
};

const columns = [
	{
		title: "名称",
		dataIndex: "name",
		key: "name",
		width: 200
	},
	{
		title: "类型",
		dataIndex: "type",
		key: "type",
		width: 100,
		render: (text, item) => {
			// console.log('text',item.sub);
			return text === "array" ? (
				<span>{item.sub ? item.sub.itemType || "" : "array"} []</span>
			) : (
				<span>{text}</span>
			);
		}
	},
	{
		title: "是否必须",
		dataIndex: "required",
		key: "required",
		width: 80,
		render: text => {
			return <div>{text ? "必须" : "非必须"}</div>;
		}
	},
	{
		title: "默认值",
		dataIndex: "default",
		key: "default",
		width: 80,
		render: text => {
			return <div>{xU.isBoolean(text) ? text + "" : text}</div>;
		}
	},
	{
		title: "备注",
		dataIndex: "desc",
		key: "desc",
		render: (text, item) => {
			return xU.isUndefined(item.childrenDesc) ? (
				<span class="table-desc">{text}</span>
			) : (
				<span class="table-desc">{item.childrenDesc}</span>
			);
		}
	},
	{
		title: "其他信息",
		dataIndex: "sub",
		key: "sub",
		width: 180,
		render: (text, record) => {
			let result = text || record;

			return Object.keys(result).map((item, index) => {
				let name = messageMap[item];
				let value = result[item];
				let isShow = !xU.isUndefined(result[item]) && !xU.isUndefined(name);

				return (
					isShow && (
						<p key={index}>
							<span style={{ fontWeight: "700" }}>{name}: </span>
							<span>{value.toString()}</span>
						</p>
					)
				);
			});
		}
	}
];

class SchemaTable extends Component {
	static propTypes = {
		dataSource: PropTypes.string
	};

	constructor(props) {
		super(props);
	}

	render() {
		let product;
		try {
			product = json5.parse(this.props.dataSource);
		} catch (e) {
			product = null;
		}
		if (!product) {
			return null;
		}
		let data = schemaTransformToTable(product);
		data = xU.isArray(data) ? data : [];
		return (
			<Table
				bordered
				size="small"
				pagination={false}
				dataSource={data}
				columns={columns}
			/>
		);
	}
}
export default SchemaTable;
