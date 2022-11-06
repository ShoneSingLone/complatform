import { Route, Switch, Redirect, matchPath } from "react-router-dom";
import { Subnav } from "../../components/index";
import { setCurrGroup } from "../../reducer/modules/group";
import { setBreadcrumb } from "../../reducer/modules/user";
import { getProject } from "../../reducer/modules/project";
import Interface from "./Interface/Interface.js";
import Activity from "./Activity/Activity.js";
import Setting from "./Setting/Setting.js";
import Loading from "../../components/Loading/Loading";
import ProjectMember from "./Setting/ProjectMember/ProjectMember.js";
import ProjectData from "./Setting/ProjectData/ProjectData.js";
const plugin = require("client/plugin.js");
@connect(
	state => {
		return {
			curProject: state.project.currProject,
			currGroup: state.group.currGroup
		};
	},
	{
		getProject,
		setCurrGroup,
		setBreadcrumb
	}
)
export default class Project extends Component {
	static propTypes = {
		match: PropTypes.object,
		curProject: PropTypes.object,
		getProject: PropTypes.func,
		location: PropTypes.object,
		setCurrGroup: PropTypes.func,
		setBreadcrumb: PropTypes.func,
		currGroup: PropTypes.object
	};

	constructor(props) {
		super(props);
	}

	async UNSAFE_componentWillMount() {
		await this.props.getProject(this.$route.params.id);
		await Methods_App.setCurrGroup(this.props.curProject.group_id);

		this.props.setBreadcrumb([
			{
				name: this.props.currGroup.group_name,
				href: "/group/" + this.props.currGroup._id
			},
			{
				name: this.props.curProject.name
			}
		]);
	}

	async componentWillReceiveProps(nextProps) {
		const currProjectId = this.$route.params.id;
		const nextProjectId = nextProps.match.params.id;
		if (currProjectId !== nextProjectId) {
			await this.props.getProject(nextProjectId);
			await Methods_App.setCurrGroup(this.props.curProject.group_id);
			this.props.setBreadcrumb([
				{
					name: this.props.currGroup.group_name,
					href: "/group/" + this.props.currGroup._id
				},
				{
					name: this.props.curProject.name
				}
			]);
		}
	}

	render() {
		const { match, location } = this.props;
		let routers = {
			interface: {
				name: "接口",
				path: "/project/:id/interface/:action",
				component: Interface
			},
			activity: {
				name: "动态",
				path: "/project/:id/activity",
				component: Activity
			},
			data: {
				name: "数据管理",
				path: "/project/:id/data",
				component: ProjectData
			},
			members: {
				name: "成员管理",
				path: "/project/:id/members",
				component: ProjectMember
			},
			setting: {
				name: "设置",
				path: "/project/:id/setting",
				component: Setting
			}
		};

		plugin.emitHook("sub_nav", routers);

		let key, defaultName;
		for (key in routers) {
			if (
				matchPath(location.pathname, {
					path: routers[key].path
				}) !== null
			) {
				defaultName = routers[key].name;
				break;
			}
		}

		let subnavData = [];
		Object.keys(routers).forEach(key => {
			let item = routers[key];
			let value = {};
			if (key === "interface") {
				value = {
					name: item.name,
					path: `/project/${match.params.id}/interface/api`
				};
			} else {
				value = {
					name: item.name,
					path: item.path.replace(/\:id/gi, match.params.id)
				};
			}
			subnavData.push(value);
		});

		if (this.props.currGroup.type === "private") {
			subnavData = subnavData.filter(item => {
				return item.name != "成员管理";
			});
		}

		if (
			this.props.curProject == null ||
			Object.keys(this.props.curProject).length === 0
		) {
			return <Loading visible />;
		}

		return (
			<div>
				<Subnav default={defaultName} data={subnavData} />
				<Switch>
					<Redirect
						exact
						from="/project/:id"
						to={`/project/${match.params.id}/interface/api`}
					/>
					{/* <Route path={routers.activity.path} component={Activity} />
          
          <Route path={routers.setting.path} component={Setting} />
          {this.props.currGroup.type !== 'private' ?
            <Route path={routers.members.path} component={routers.members.component}/>
            : null
          }

          <Route path={routers.data.path} component={ProjectData} /> */}
					{Object.keys(routers).map(key => {
						let item = routers[key];

						return key === "members" ? (
							this.props.currGroup.type !== "private" ? (
								<Route path={item.path} component={item.component} key={key} />
							) : null
						) : (
							<Route path={item.path} component={item.component} key={key} />
						);
					})}
				</Switch>
			</div>
		);
	}
}
