import {
	Modal,
	Collapse,
	Row,
	Col,
	Input,
	message,
	Button,
	Icon
} from "ant-design-vue";

import axios from "axios";

import { fetchInterfaceColList } from "../../../../../reducer/modules/interfaceCol";

const { TextArea } = Input;
const Panel = Collapse.Panel;

@connect(
	state => ({
		interfaceColList: state.interfaceCol.interfaceColList
	}),
	{
		fetchInterfaceColList
	}
)
@withRouter
export default class AddColModal extends Component {
	static propTypes = {
		visible: PropTypes.bool,
		interfaceColList: PropTypes.array,
		fetchInterfaceColList: PropTypes.func,
		match: PropTypes.object,
		onOk: PropTypes.func,
		onCancel: PropTypes.func,
		caseName: PropTypes.string
	};

	state = {
		visible: false,
		addColName: "",
		addColDesc: "",
		id: 0,
		caseName: ""
	};

	constructor(props) {
		super(props);
	}

	UNSAFE_componentWillMount() {
		this.props.fetchInterfaceColList(this.$route.params.id);
		this.setState({ caseName: this.props.caseName });
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ id: nextProps.interfaceColList[0]._id });
		this.setState({ caseName: nextProps.caseName });
	}

	addCol = async () => {
		const { addColName: name, addColDesc: desc } = this.state;
		const project_id = this.$route.params.id;
		const res = await axios.post("/api/col/add_col", {
			name,
			desc,
			project_id
		});
		if (!res.data.errcode) {
			message.success("添加集合成功");
			await this.props.fetchInterfaceColList(project_id);

			this.setState({ id: res.data.data._id });
		} else {
			message.error(res.data.errmsg);
		}
	};

	select = id => {
		this.setState({ id });
	};

	render() {
		const { interfaceColList = [] } = this.props;
		const { id } = this.state;
		return (
			<aModal
				class="add-col-modal"
				title="添加到集合"
				visible={this.props.visible}
				onOk={() => this.props.onOk(id, this.state.caseName)}
				onCancel={this.props.onCancel}>
				<aRow gutter={6} class="modal-input">
					<aCol span="5">
						<div class="label">接口用例名：</div>
					</aCol>
					<aCol span="15">
						<aInput
							placeholder="请输入接口用例名称"
							value={this.state.caseName}
							onChange={e => this.setState({ caseName: e.target.value })}
						/>
					</aCol>
				</aRow>
				<p>请选择添加到的集合：</p>
				<ul class="col-list">
					{interfaceColList.length ? (
						interfaceColList.map(col => (
							<li
								key={col._id}
								class={`col-item ${col._id === id ? "selected" : ""}`}
								onClick={() => this.select(col._id)}>
								<xIcon icon="folder-open" style={{ marginRight: 6 }} />
								{col.name}
							</li>
						))
					) : (
						<span>暂无集合，请添加！</span>
					)}
				</ul>
				<aCollapse>
					<Panel header="添加新集合">
						<aRow gutter={6} class="modal-input">
							<aCol span="5">
								<div class="label">集合名：</div>
							</aCol>
							<aCol span="15">
								<aInput
									placeholder="请输入集合名称"
									value={this.state.addColName}
									onChange={e => this.setState({ addColName: e.target.value })}
								/>
							</aCol>
						</aRow>
						<aRow gutter={6} class="modal-input">
							<aCol span="5">
								<div class="label">简介：</div>
							</aCol>
							<aCol span="15">
								<TextArea
									rows={3}
									placeholder="请输入集合描述"
									value={this.state.addColDesc}
									onChange={e => this.setState({ addColDesc: e.target.value })}
								/>
							</aCol>
						</aRow>
						<aRow type="flex" justify="end">
							<aButton
								style={{ float: "right" }}
								type="primary"
								onClick={this.addCol}>
								添 加
							</aButton>
						</aRow>
					</Panel>
				</aCollapse>
			</aModal>
		);
	}
}
