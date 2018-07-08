import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import StudentLogin from "./StudentLogin/StudentLogin";
import AdminLogin from "./AdminLogin/AdminLogin";
import "./Login.css";
class Login extends Component {
	render() {
		return (
			<div className="login-component">
				<Switch>
					<Route
						path={this.props.match.url + "/admin"}
						component={() => <AdminLogin />}
					/>
					<Route
						path={this.props.match.url}
						component={() => <StudentLogin />}
					/>
				</Switch>
			</div>
		);
	}
}
export default Login;
