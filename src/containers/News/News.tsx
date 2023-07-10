import "./News.scss";

import NewsTimeline from "./NewsTimeline/NewsTimeline";

import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";

import { getMockUrl } from "../../reducer/modules/news.js";
import Subnav from "../../components/Subnav/Subnav.js";

@connect(
	state => {
		return {
			uid: state.user.uid + ""
		};
	},
	{
		getMockUrl: getMockUrl
	}
)
class News extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mockURL: ""
		};
	}
	static propTypes = {
		uid: PropTypes.string,
		getMockUrl: PropTypes.func
	};
	UNSAFE_componentWillMount() {
		//const that = this;
		// this.props.getMockUrl(2724).then(function(data){
		//   const { prd_host, basepath, protocol } = data.payload.data.data;
		//   const mockURL = `${protocol}://${prd_host}${basepath}/{path}`;
		//   that.setState({
		//     mockURL: mockURL
		//   })
		// })
	}
	render() {
		return (
			<div>
				<Subnav
					default={"动态"}
					data={[
						{
							name: "动态",
							path: "/news"
						},
						{
							name: "测试",
							path: "/follow"
						},
						{
							name: "设置",
							path: "/follow"
						}
					]}
				/>
				<div class="x-dialog-boddy-wrapper">
					<section class="news-box m-panel">
						<div class="logHead">
							<Breadcrumb />
							<div class="Mockurl">
								<span>Mock地址：</span>
								<p>{this.state.mockURL}</p>
								<aButton type="primary">下载Mock数据</aButton>
							</div>
						</div>
						<NewsTimeline />
					</section>
				</div>
			</div>
		);
	}
}

export default News;
