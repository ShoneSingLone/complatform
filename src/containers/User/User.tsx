import "./index.scss";

import { Route } from "react-router-dom";
import List from "./List.js";

import Profile from "./Profile.js";

@connect(state => {
	return {
		curUid: state.user.uid,
		userType: state.user.type,
		role: state.user.role
	};
}, {})
class User extends Component {
	static propTypes = {
		match: PropTypes.object,
		curUid: PropTypes.number,
		userType: PropTypes.string,
		role: PropTypes.string
	};

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<div class="g-doc">
					<aRow class="user-box">
						<Route path={this.props.match.path + "/list"} component={List} />
						<Route
							path={this.props.match.path + "/profile/:uid"}
							component={Profile}
						/>
					</aRow>
				</div>
			</div>
		);
	}
}

export default User;
