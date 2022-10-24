import "./Activity.scss";

import TimeTree from "@/components/TimeLine/ATimeline";

import { Button } from "ant-design-vue";
@connect(state => {
	return {
		uid: state.user.uid + "",
		curdata: state.inter.curdata,
		currProject: state.project.currProject
	};
})
class Activity extends Component {
	constructor(props) {
		super(props);
	}
	static propTypes = {
		uid: PropTypes.string,
		getMockUrl: PropTypes.func,
		match: PropTypes.object,
		curdata: PropTypes.object,
		currProject: PropTypes.object
	};
	render() {
		let { currProject } = this.props;
		return (
			<div class="g-row">
				<section class="news-box m-panel">
					<div style={{ display: "none" }} class="logHead">
						{/*<Breadcrumb />*/}
						<div class="projectDes">
							<p>高效、易用、可部署的API管理平台</p>
						</div>
						<div class="Mockurl">
							<span>Mock地址：</span>
							<p>
								{location.protocol +
									"//" +
									location.hostname +
									(location.port !== "" ? ":" + location.port : "") +
									`/mock/${currProject._id}${currProject.basepath}/yourPath`}
							</p>
							<aButton type="primary">
								<a
									href={`/api/project/download?project_id=${this.$route.params.id}`}>
									下载Mock数据
								</a>
							</aButton>
						</div>
					</div>
					<TimeTree type={"project"} typeid={+this.$route.params.id} />
				</section>
			</div>
		);
	}
}

export default Activity;
