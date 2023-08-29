import "jsondiffpatch/dist/formatters-styles/annotated.css";
import "jsondiffpatch/dist/formatters-styles/html.css";
import "./TimeLine.scss";
import * as jsondiffpatch from "jsondiffpatch";

import { defPagination, stateUI, xU, xI } from "@/ventose/ui";
import { defineComponent } from "vue";
import { stateApp } from "@/state/app";
import { DialogShowApiModify } from "./DialogShowApiModify";
import { LOG_TYPE, METHOD_COLOR } from "../../utils/variable";
import { _$timeAgo } from "../../utils/common";
import { API } from "@/api";
import { diffMessage } from "../../utils/diff-view";

const formattersHtml = jsondiffpatch.formatters.html;

export const TimeLine = defineComponent({
	props: ["typeid", "type"],
	setup() {
		return function () {
			return (
				<>
					<section class="mb10 mt10 el-card padding20">
						{this.vDomSectionProject}
						{this.vDomSectionRecords}
					</section>
					<div class="flex end">
						<xPagination
							pagination={this.pagination}
							onPaginationChange={this.getMore}
						/>
					</div>
				</>
			);
		};
	},
	data() {
		return {
			newsWillShow: [],
			curSelectValue: "",
			pagination: defPagination(),
			state: {
				bidden: "",
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
			xU.dialog({
				title: xI("Api 改动日志(Esc 关闭弹窗)"),
				component: DialogShowApiModify,
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
			stateApp._fetchNewsData({ id: this.typeid, type: this.type });
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
						<ElTag
							style={{
								color: methodColor ? methodColor.color : "#cfefdf",
								backgroundColor: methodColor ? methodColor.bac : "#00a854",
								border: "unset"
							}}>
							{item.method}
						</ElTag>
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
					<ElRow class="news-search">
						<ElCol span="3">{xI("选择查询的 Api")}：</ElCol>
						<ElCol span="10">
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
						</ElCol>
					</ElRow>
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
						<ElTimelineItem key={i} timestamp={addTime} placement="top">
							<el-card>
								{{
									header() {
										return (
											<div class="card-header flex middle">
												<div class="logtype">{LOG_TYPE[newsItem.type]}动态</div>
												<span class="logtime ml10">
													{_$timeAgo(newsItem.add_time)}
												</span>
												{interfaceDiff && (
													<xButton
														onClick={() =>
															this.showDiffLogDialog(newsItem.data)
														}>
														改动详情
													</xButton>
												)}
											</div>
										);
									},
									default() {
										return (
											<span class="logcontent" v-html={newsItem.content} />
										);
									}
								}}
							</el-card>
						</ElTimelineItem>
					);
				});
				records = (
					<ElTimeline class="TimeLine_news-content">
						{vDomTimeLineItem}
					</ElTimeline>
				);
			}
			return records;
		}
	}
});
