import "jsondiffpatch/dist/formatters-styles/annotated.css";
import "jsondiffpatch/dist/formatters-styles/html.css";
import "./TimeLine.scss";
import * as jsondiffpatch from "jsondiffpatch";

import { UI, State_UI, xU, defPagination } from "@ventose/ui";
import { defineComponent } from "vue";
import { State_App, Methods_App } from "../../state/State_App";
import { Cpt_url } from "../../router/router";
import { DialogApiModify } from "./DialogApiModify";
import { LOG_TYPE, METHOD_COLOR } from "../../utils/variable";
import { _$timeAgo } from "../../utils/common";
import { API } from "../../api";
import { diffMessage } from "../../utils/diff-view";
import { dayjs } from "@ventose/ui";

const { $t } = State_UI;

const formattersHtml = jsondiffpatch.formatters.html;

export const TimeLine = defineComponent({
	props: [
		"fetchNewsData",
		"setLoading",
		"loading",
		"typeid",
		"curUid",
		"type",
		"fetchInterfaceList"
	],

	setup() {
		return { State_App };
	},

	data() {
		return {
			newsWillShow: [],
			curSelectValue: "",
			pagination: defPagination(),
			state: {
				bidden: "",
				loading: false,
				apiList: []
			}
		};
	},
	async mounted() {
		if (this.type === "project") {
			await this.getApiList();
		}
		await this.getMore();
	},
	methods: {
		async getMore() {
			this.state.loading = true;
			try {
				const { data } = await API.news.getLogList({
					typeid: this.typeid,
					type: this.type,
					page: this.pagination.page,
					limit: this.pagination.size,
					selectValue: this.curSelectValue
				});
				const { list, total } = data || {};
				if (list && total) {
					this.newsWillShow = list;
					this.pagination.total = total;
				}
			} catch (error) {
			} finally {
				this.state.loading = false;
			}
		},

		handleCancel() {
			this.setState({
				visible: false
			});
		},

		showDiffLogDialog(data) {
			UI.dialog.component({
				title: $t("Api 改动日志(Esc 关闭弹窗)").label,
				component: DialogApiModify,
				maxmin: true,
				fullscreen: true,
				diffView: diffMessage(jsondiffpatch, formattersHtml, data)
			});
		},

		async getApiList() {
			let result = await API.project.fetchInterfaceList({
				project_id: this.typeid,
				limit: "all"
			});
			this.state.apiList = result.records;
		},

		handleSelectApi(selectValue) {
			this.curSelectValue = selectValue;
			Methods_App.fetchNewsData({ id: this.typeid, type: this.type });
		}
	},
	computed: {
		vDomProjectChildren() {
			const children = this.state.apiList.map(item => {
				let methodColor =
					METHOD_COLOR[item.method ? item.method.toLowerCase() : "get"];
				return (
					<Option
						title={item.title}
						value={item._id + ""}
						path={item.path}
						key={item._id}>
						{item.title}{" "}
						<aTag
							style={{
								color: methodColor ? methodColor.color : "#cfefdf",
								backgroundColor: methodColor ? methodColor.bac : "#00a854",
								border: "unset"
							}}>
							{item.method}
						</aTag>
					</Option>
				);
			});

			children.unshift(
				<Option value="" key="all">
					选择全部
				</Option>
			);

			return children;
		},
		vDomSectionProject() {
			if (this.type === "project") {
				return (
					<aRow class="news-search">
						<aCol span="3">{$t("选择查询的 Api").label}：</aCol>
						<aCol span="10">
							<aAutoComplete
								onSelect={this.handleSelectApi}
								style={{ width: "100%" }}
								placeholder="Select Api"
								optionLabelProp="title"
								filterOption={(inputValue, options) => {
									if (options.props.value == "") return true;
									if (
										options.props.path.indexOf(inputValue) !== -1 ||
										options.props.title.indexOf(inputValue) !== -1
									) {
										return true;
									}
									return false;
								}}>
								{/* {children} */}
								<OptGroup label="other">
									<Option value="wiki" path="" title="wiki">
										wiki
									</Option>
								</OptGroup>
								<OptGroup label="api">{this.vDomProjectChildren}</OptGroup>
							</aAutoComplete>
						</aCol>
					</aRow>
				);
			}

			return null;
		},
		vDomSectionRecords() {
			let records = <ErrMsg type="noData" />;
			if (this.newsWillShow.length) {
				const vDomTimeLineItem = xU.map(this.newsWillShow, (newsItem, i) => {
					let interfaceDiff = xU.isPlainObject(newsItem.data);
					const addTime = xU.dateFormat(newsItem.add_time, 1);
					return (
						<aTimelineItem
							dot={
								<aAvatar
									class="pointer"
									src={`/api/user/avatar?uid=${newsItem.uid}`}
									onClick={() =>
										Cpt_url.value.go(`/user/profile/${newsItem.uid}`)
									}
								/>
							}
							key={i}>
							<div class="logMesHeade">
								<span class="logo_$timeAgo">
									{_$timeAgo(newsItem.add_time)}
								</span>
								<span class="logtype">{LOG_TYPE[newsItem.type]}动态</span>
								<span class="logtime">{addTime}</span>
							</div>
							<span class="logcontent" v-html={newsItem.content} />
							<div style={{ padding: "10px 0 0 10px" }}>
								{interfaceDiff && (
									<aButton
										onClick={() => this.showDiffLogDialog(newsItem.data)}>
										改动详情
									</aButton>
								)}
							</div>
						</aTimelineItem>
					);
				});
				records = (
					<aTimeline class="TimeLine_news-content">
						{vDomTimeLineItem}
					</aTimeline>
				);
			}
			return records;
		}
	},
	render() {
		return (
			<>
				<section class="news-timeline flex1">
					{this.vDomSectionProject}
					{this.vDomSectionRecords}
				</section>
				<div class="flex end padding20">
					<xPagination
						pagination={this.pagination}
						onPaginationChange={this.getMore}
					/>
				</div>
			</>
		);
	}
});
