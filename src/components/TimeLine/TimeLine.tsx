import { showDiffMsg } from "@/utils/diff-view";
import { ErrMsg } from "@/components/ErrMsg/ErrMsg";
import "jsondiffpatch/dist/formatters-styles/annotated.css";
import "jsondiffpatch/dist/formatters-styles/html.css";
import "./TimeLine.scss";
import * as jsondiffpatch from "jsondiffpatch";

import { defineComponent } from "vue";
import { _ } from "@ventose/ui";
import { State_App, Methods_App } from "../../state/State_App";
import { Cpt_url } from "../../router/router";
import { ViewApiModify } from "./ViewApiModify";
import {
	UI,
	validateForm,
	AllWasWell,
	pickValueFrom,
	State_UI
} from "@ventose/ui";
import row from "ant-design-vue/lib/row";
import { LOG_TYPE, METHOD_COLOR } from "../../utils/variable";
import { _$timeAgo } from "../../utils/common";

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
				visible: false,
				curDiffData: {},
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
				this.setState({ loading: true });
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
			this.setState({
				curDiffData: data,
				visible: true
			});

			UI.dialog.component({
				title: $t("Api 改动日志").label,
				component: ViewApiModify,
				area: ["480px", "360px"],
				onOk: async instance => {
					const validateResults = await validateForm(instance.vm.formItems);
					if (AllWasWell(validateResults)) {
						const { newGroupName, newGroupDesc, owner_uids } = pickValueFrom(
							instance.vm.formItems
						);
						await this.upsert({
							...row,
							group_name: newGroupName,
							group_desc: newGroupDesc,
							owner_uids: owner_uids
						});
						instance.close();
					} else {
						throw new Error("未通过验证");
					}
				}
			});
		},

		async getApiList() {
			let result = await this.props.fetchInterfaceList({
				project_id: this.typeid,
				limit: "all"
			});
			this.setState({
				apiList: result.payload.data.data.list
			});
		},

		handleSelectApi(selectValue) {
			this.curSelectValue = selectValue;
			this.props.fetchNewsData(this.typeid, this.type, 1, 10, selectValue);
		}
	},
	computed: {
		dataWillShow() {
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
			let pending = (
				<a class="loggetMore" onClick={this.getMore}>
					查看更多
				</a>
			);

			if (this.state.loading) {
				pending = <aSpin />;
			} else if (
				this.State_App.news.newsData.total <= this.State_App.news.curpage
			) {
				pending = <a class="logbidden">以上为全部内容</a>;
			}

			return pending;
		},
		vDomSectionRecords() {
			let records = <ErrMsg type="noData" />;
			if (this.dataWillShow.length) {
				const vDomTimeLineItem = _.map(this.dataWillShow, (item, i) => {
					let interfaceDiff = false;
					// 去掉了 && item.data.interface_id
					if (item.data && typeof item.data === "object") {
						interfaceDiff = true;
					}
					return (
						<aTimelineItem
							dot={
								<aAvatar
									class="pointer"
									src={`/api/user/avatar?uid=${item.uid}`}
									onClick={() => Cpt_url.value.go(`/user/profile/${item.uid}`)}
								/>
							}
							key={i}>
							<div class="logMesHeade">
								<span class="logoTimeago">{_$timeAgo(item.add_time)}</span>
								{/*<span class="logusername"><RouterView to={`/user/profile/${item.uid}`}><xIcon icon="user" />{item.username}</RouterView></span>*/}
								<span class="logtype">{LOG_TYPE[item.type]}动态</span>
								<span class="logtime">{_.dateFormat(item.add_time)}</span>
							</div>
							<span class="logcontent" v-html={item.content} />
							<div style={{ padding: "10px 0 0 10px" }}>
								{interfaceDiff && (
									<aButton onClick={() => this.openDiff(item.data)}>
										改动详情
									</aButton>
								)}
							</div>
						</aTimelineItem>
					);
				});
				records = (
					<aTimeline class="news-content" pending={this.vDomPending}>
						{vDomTimeLineItem}
					</aTimeline>
				);
			}
			return records;
		}
	},
	render() {
		let diffView = showDiffMsg(
			jsondiffpatch,
			formattersHtml,
			this.state.curDiffData
		);
		debugger;

		return (
			<section class="news-timeline">
				{/* <aModel
					style={{ minWidth: "800px" }}
					title="Api 改动日志"
					visible={this.state.visible}
					footer={null}
					onCancel={this.handleCancel}>
					<i>注： 绿色代表新增内容，红色代表删除内容</i>
					<div class="project-interface-change-content">
						{diffView.map((item, index) => {
							return (
								<AddDiffView
									class="item-content"
									title={item.title}
									key={index}
									content={item.content}
								/>
							);
						})}
						{diffView.length === 0 && <ErrMsg type="noChange" />}
					</div>
				</aModel> */}
				{this.vDomSectionProject}
				{this.vDomSectionRecords}
			</section>
		);
	}
});
