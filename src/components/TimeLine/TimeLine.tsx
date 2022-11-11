import "jsondiffpatch/dist/formatters-styles/annotated.css";
import "jsondiffpatch/dist/formatters-styles/html.css";
import "./TimeLine.scss";
import * as jsondiffpatch from "jsondiffpatch";

import { UI, State_UI, _ } from "@ventose/ui";
import { defineComponent } from "vue";
import { State_App, Methods_App } from "../../state/State_App";
import { Cpt_url } from "../../router/router";
import { ViewApiModify } from "./ViewApiModify";
import { LOG_TYPE, METHOD_COLOR } from "../../utils/variable";
import { _$timeAgo } from "../../utils/common";
import { API } from "../../api";
import { diffMessage } from "../../utils/diff-view";

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
			curSelectValue: "",
			state: {
				bidden: "",
				loading: false,
				apiList: []
			}
		};
	},
	async mounted() {
		await Methods_App.fetchNewsData(this.typeid, this.type, 1, 10);
		if (this.type === "project") {
			this.getApiList();
		}
	},
	methods: {
		async getMore() {
			const that = this;
			if (this.State_App.news.curpage <= this.State_App.news.newsData.total) {
				this.state.loading = true;
				await Methods_App.fetchNewsData(
					this.typeid,
					this.type,
					this.State_App.news.curpage + 1,
					10,
					this.curSelectValue
				);
				this.state.loading = false;
				if (
					that.State_App.news.newsData.total === that.State_App.news.curpage
				) {
					this.state.bidden = "logbidden";
				}
			}
		},

		handleCancel() {
			this.setState({
				visible: false
			});
		},

		openDiff(data) {
			UI.dialog.component({
				title: $t("Api 改动日志(Esc 关闭弹窗)").label,
				hideButtons: true,
				component: ViewApiModify,
				maxmin: true,
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
			this.props.fetchNewsData(this.typeid, this.type, 1, 10, selectValue);
		}
	},
	computed: {
		newsWillShow() {
			return this.State_App.news.newsData
				? this.State_App.news.newsData.list
				: [];
		},
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
		vDomPending() {
			if (this.state.loading) {
				return <aSpin />;
			}

			if (this.State_App.news.newsData.total <= this.State_App.news.curpage) {
				return <a class="logbidden">以上为全部内容</a>;
			}

			return (
				<a class="loggetMore" onClick={this.getMore}>
					查看更多
				</a>
			);
		},
		vDomSectionRecords() {
			let records = <ErrMsg type="noData" />;
			if (this.newsWillShow.length) {
				const vDomTimeLineItem = _.map(this.newsWillShow, (newsItem, i) => {
					let interfaceDiff = _.isPlainObject(newsItem.data);
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
								<span class="logoTimeago">{_$timeAgo(newsItem.add_time)}</span>
								<span class="logtype">{LOG_TYPE[newsItem.type]}动态</span>
								<span class="logtime">{_.dateFormat(newsItem.add_time)}</span>
							</div>
							<span class="logcontent" v-html={newsItem.content} />
							<div style={{ padding: "10px 0 0 10px" }}>
								{interfaceDiff && (
									<aButton onClick={() => this.openDiff(newsItem.data)}>
										改动详情
									</aButton>
								)}
							</div>
						</aTimelineItem>
					);
				});
				records = (
					<aTimeline class="TimeLine_news-content" pending={this.vDomPending}>
						{vDomTimeLineItem}
					</aTimeline>
				);
			}
			return records;
		}
	},
	render() {
		return (
			<section class="news-timeline">
				{this.vDomSectionProject}
				{this.vDomSectionRecords}
			</section>
		);
	}
});
