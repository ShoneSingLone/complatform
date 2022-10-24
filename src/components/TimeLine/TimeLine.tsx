import { showDiffMsg } from "@/utils/diff-view";
import variable from "@/utils/variable";
import { ErrMsg } from "@/components/ErrMsg/ErrMsg";
import "jsondiffpatch/dist/formatters-styles/annotated.css";
import "jsondiffpatch/dist/formatters-styles/html.css";
import "./TimeLine.scss";

import * as jsondiffpatch from "jsondiffpatch";
const formattersHtml = jsondiffpatch.formatters.html;
import { defineComponent } from "vue";
import { State_App } from "@/state/State_App";
import { _ } from "@ventose/ui";

const AddDiffView = props => {
	const { title, content, className } = props;

	if (!content) {
		return null;
	}

	return (
		<div class={className}>
			<h3 class="title">{title}</h3>
			<div dangerouslySetInnerHTML={{ __html: content }} />
		</div>
	);
};

export default defineComponent({
	props: [
		"fetchNewsData",
		"fetchMoreNews",
		"setLoading",
		"loading",
		"typeid",
		"curUid",
		"type",
		"fetchInterfaceList"
	],
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
	mounted() {
		this.props.fetchNewsData(this.props.typeid, this.props.type, 1, 10);
		if (this.props.type === "project") {
			this.getApiList();
		}
	},
	methods: {
		getMore() {
			const that = this;
			if (this.State_App.news.curpage <= this.State_App.news.newsData.total) {
				this.setState({ loading: true });
				this.props
					.fetchMoreNews(
						this.props.typeid,
						this.props.type,
						this.State_App.news.curpage + 1,
						10,
						this.curSelectValue
					)
					.then(function () {
						that.setState({ loading: false });
						if (
							that.props.State_App.news.newsData.total ===
							that.State_App.news.curpage
						) {
							that.setState({ bidden: "logbidden" });
						}
					});
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
		},

		async getApiList() {
			let result = await this.props.fetchInterfaceList({
				project_id: this.props.typeid,
				limit: "all"
			});
			this.setState({
				apiList: result.payload.data.data.list
			});
		},

		handleSelectApi(selectValue) {
			this.curSelectValue = selectValue;
			this.props.fetchNewsData(
				this.props.typeid,
				this.props.type,
				1,
				10,
				selectValue
			);
		}
	},
	render() {
		let data = this.State_App.news.newsData
			? this.State_App.news.newsData.list
			: [];
		const curDiffData = this.state.curDiffData;
		let logType = {
			project: "项目",
			group: "分组",
			interface: "接口",
			interface_col: "接口集",
			user: "用户",
			other: "其他"
		};

		const children = this.state.apiList.map(item => {
			let methodColor =
				variable.METHOD_COLOR[item.method ? item.method.toLowerCase() : "get"];
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

		if (data && data.length) {
			data = data.map((item, i) => {
				let interfaceDiff = false;
				// 去掉了 && item.data.interface_id
				if (item.data && typeof item.data === "object") {
					interfaceDiff = true;
				}
				return (
					<aTimeline.Item
						dot={
							<RouterLink to={`/user/profile/${item.uid}`}>
								<aAvatar src={`/api/user/avatar?uid=${item.uid}`} />
							</RouterLink>
						}
						key={i}>
						<div class="logMesHeade">
							<span class="logoTimeago">{timeago(item.add_time)}</span>
							{/*<span class="logusername"><RouterView to={`/user/profile/${item.uid}`}><xIcon icon="user" />{item.username}</RouterView></span>*/}
							<span class="logtype">{logType[item.type]}动态</span>
							<span class="logtime">{_.dateFormat(item.add_time)}</span>
						</div>
						<span
							class="logcontent"
							dangerouslySetInnerHTML={{ __html: item.content }}
						/>
						<div style={{ padding: "10px 0 0 10px" }}>
							{interfaceDiff && (
								<aButton onClick={() => this.openDiff(item.data)}>
									改动详情
								</aButton>
							)}
						</div>
					</aTimeline.Item>
				);
			});
		} else {
			data = "";
		}
		let pending =
			this.props.State_App.news.newsData.total <=
			this.State_App.news.curpage ? (
				<a class="logbidden">以上为全部内容</a>
			) : (
				<a class="loggetMore" onClick={this.getMore.bind(this)}>
					查看更多
				</a>
			);
		if (this.state.loading) {
			pending = <aSpin />;
		}
		let diffView = showDiffMsg(jsondiffpatch, formattersHtml, curDiffData);

		return (
			<section class="news-timeline">
				<aModel
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
				</aModel>
				{this.props.type === "project" && (
					<aRow class="news-search">
						<aCol span="3">选择查询的 Api：</aCol>
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
								<OptGroup label="api">{children}</OptGroup>
							</aAutoComplete>
						</aCol>
					</aRow>
				)}
				{data ? (
					<aTimeline class="news-content" pending={pending}>
						{data}
					</aTimeline>
				) : (
					<ErrMsg type="noData" />
				)}
			</section>
		);
	}
});
