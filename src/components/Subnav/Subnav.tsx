import "./Subnav.scss";

class Subnav extends Component {
	constructor(props) {
		super(props);
	}

	static propTypes = {
		data: PropTypes.array,
		default: PropTypes.string
	};

	render() {
		return (
			<div class="m-subnav">
				<ElMenu
					onClick={this.handleClick}
					selectedKeys={[this.props.default]}
					mode="horizontal"
					class="x-dialog-boddy-wrapper m-subnav-menu">
					{this.props.data.map((item, index) => {
						// 若导航标题为两个字，则自动在中间加个空格
						if (item.name.length === 2) {
							item.name = item.name[0] + " " + item.name[1];
						}
						return (
							<ElMenuItem class="item" key={item.name.replace(" ", "")}>
								<a to={item.path}>{this.props.data[index].name}</a>
							</ElMenuItem>
						);
					})}
				</ElMenu>
			</div>
		);
	}
}

export default Subnav;
