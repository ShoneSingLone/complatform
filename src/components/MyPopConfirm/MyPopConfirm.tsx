import { Modal, Button } from "ant-design-vue";

// 嵌入到 BrowserRouter 内部，覆盖掉默认的 window.confirm
// http://reacttraining.cn/web/api/BrowserRouter/getUserConfirmation-func
class MyPopConfirm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: true
		};
	}
	static propTypes = {
		msg: PropTypes.string,
		callback: PropTypes.func
	};

	yes = () => {
		this.props.callback(true);
		this.setState({ visible: false });
	};

	no = () => {
		this.props.callback(false);
		this.setState({ visible: false });
	};

	componentWillReceiveProps() {
		this.setState({ visible: true });
	}

	render() {
		if (!this.state.visible) {
			return null;
		}
		return (
			<aModal
				title="你即将离开编辑页面"
				visible={this.state.visible}
				onCancel={this.no}
				footer={[
					<aButton key="back" onClick={this.no}>
						取 消
					</aButton>,
					<aButton key="submit" onClick={this.yes}>
						确 定
					</aButton>
				]}>
				<p>{this.props.msg}</p>
			</aModal>
		);
	}
}

export default MyPopConfirm;
