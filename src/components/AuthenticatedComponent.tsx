import React from "react";

import { changeMenuItem } from "../reducer/modules/menu";

export function requireAuthentication(Component) {
	return (
		/* @connect(
			state => {
				return {
					isAuthenticated: state.user.isLogin
				};
			},
			{
				changeMenuItem
			}
		) */
		class AuthenticatedComponent extends React.PureComponent {
			constructor(props) {
				super(props);
			}
			static propTypes = {
				isAuthenticated: PropTypes.bool,
				location: PropTypes.object,
				dispatch: PropTypes.func,
				history: PropTypes.object,
				changeMenuItem: PropTypes.func
			};
			UNSAFExU.omponentWillMount() {
				this.checkAuth();
			}
			componentWillReceiveProps() {
				this.checkAuth();
			}
			checkAuth() {
				if (!this.props.isAuthenticated) {
					this.$router.push({ path: "/" });
					this.props.changeMenuItem("/");
				}
			}
			render() {
				return (
					<div>
						{this.props.isAuthenticated ? <Component {...this.props} /> : null}
					</div>
				);
			}
		}
	);
}
