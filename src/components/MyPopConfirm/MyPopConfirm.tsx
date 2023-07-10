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
					<ElButton key="back" onClick={this.no}>
						取 消
					</ElButton>,
					<ElButton key="submit" onClick={this.yes}>
						确 定
					</ElButton>
				]}>
				<p>{this.props.msg}</p>
			</aModal>
		);
	}
}

export default MyPopConfirm;
