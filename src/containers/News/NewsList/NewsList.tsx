import { Menu } from "ant-design-vue";
import { fetchNewsData } from "../../../reducer/modules/news.js";

const logList = [
	{
		name: "用户"
	},
	{
		name: "分组"
	},
	{
		name: "接口"
	},
	{
		name: "项目"
	}
];
@connect(
	state => {
		// console.log(state);
		return {
			uid: state.user.uid + "",
			newsData: state.news.newsData
		};
	},
	{
		fetchNewsData
	}
)
class NewsList extends Component {
	static propTypes = {
		fetchNewsData: PropTypes.func,
		setLoading: PropTypes.func,
		uid: PropTypes.string
	};

	constructor(props) {
		super(props);
		this.state = {
			selectedKeys: 0
		};
	}
	getLogData(e) {
		// page,size,logId
		// console.log(e.key);
		this.setState({
			selectedKeys: +e.key
		});
		const that = this;
		this.props.setLoading(true);
		this.props.fetchNewsData(+this.props.uid, 0, 5).then(function () {
			that.props.setLoading(false);
		});
	}
	render() {
		return (
			<div class="logList">
				<h3>日志类型</h3>
				<aMenu
					mode="inline"
					selectedKeys={[`${this.state.selectedKeys}`]}
					onClick={this.getLogData.bind(this)}>
					{logList.map((item, i) => {
						return (
							<aMenuItem key={i} class="log-item">
								{item.name}
							</aMenuItem>
						);
					})}
				</aMenu>
			</div>
		);
	}
}

export default NewsList;
