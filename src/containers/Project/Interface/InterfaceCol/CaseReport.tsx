import React from "react";

import { Row, Col, Tabs } from "ant-design-vue";
const TabPane = Tabs.TabPane;
function jsonFormat(json) {
	// console.log('json',json)
	if (json && typeof json === "object") {
		return JSON.stringify(json, null, "   ");
	}
	return json;
}

const CaseReport = function (props) {
	let params = jsonFormat(props.data);
	let headers = jsonFormat(props.headers, null, "   ");
	let res_header = jsonFormat(props.res_header, null, "   ");
	let res_body = jsonFormat(props.res_body);
	let httpCode = props.status;
	let validRes;
	if (props.validRes && Array.isArray(props.validRes)) {
		validRes = props.validRes.map((item, index) => {
			return <div key={index}>{item.message}</div>;
		});
	}

	return (
		<div class="report">
			<Tabs defaultActiveKey="request">
				<TabPane class="case-report-pane" tab="Request" key="request">
					<aRow class="case-report">
						<aCol class="case-report-title" span="6">
							Url
						</aCol>
						<aCol span="18">{props.url}</aCol>
					</aRow>
					{props.query ? (
						<aRow class="case-report">
							<aCol class="case-report-title" span="6">
								Query
							</aCol>
							<aCol span="18">{props.query}</aCol>
						</aRow>
					) : null}

					{props.headers ? (
						<aRow class="case-report">
							<aCol class="case-report-title" span="6">
								Headers
							</aCol>
							<aCol span="18">
								<pre>{headers}</pre>
							</aCol>
						</aRow>
					) : null}

					{params ? (
						<aRow class="case-report">
							<aCol class="case-report-title" span="6">
								Body
							</aCol>
							<aCol span="18">
								<pre style={{ whiteSpace: "pre-wrap" }}>{params}</pre>
							</aCol>
						</aRow>
					) : null}
				</TabPane>
				<TabPane class="case-report-pane" tab="Response" key="response">
					<aRow class="case-report">
						<aCol class="case-report-title" span="6">
							HttpCode
						</aCol>
						<aCol span="18">
							<pre>{httpCode}</pre>
						</aCol>
					</aRow>
					{props.res_header ? (
						<aRow class="case-report">
							<aCol class="case-report-title" span="6">
								Headers
							</aCol>
							<aCol span="18">
								<pre>{res_header}</pre>
							</aCol>
						</aRow>
					) : null}
					{props.res_body ? (
						<aRow class="case-report">
							<aCol class="case-report-title" span="6">
								Body
							</aCol>
							<aCol span="18">
								<pre>{res_body}</pre>
							</aCol>
						</aRow>
					) : null}
				</TabPane>
				<TabPane class="case-report-pane" tab="验证结果" key="valid">
					{props.validRes ? (
						<aRow class="case-report">
							<aCol class="case-report-title" span="6">
								验证结果
							</aCol>
							<aCol span="18">
								<pre>{validRes}</pre>
							</aCol>
						</aRow>
					) : null}
				</TabPane>
			</Tabs>
		</div>
	);
};

CaseReport.propTypes = {
	url: PropTypes.string,
	data: PropTypes.any,
	headers: PropTypes.object,
	res_header: PropTypes.object,
	res_body: PropTypes.any,
	query: PropTypes.string,
	validRes: PropTypes.array,
	status: PropTypes.number
};

export default CaseReport;
