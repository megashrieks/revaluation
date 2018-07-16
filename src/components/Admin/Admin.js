import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import "./Admin.css";
import Dashboard from "./Dashboard/Dashboard";
import Reports from "./Reports/Reports";
import BookletUpload from "./BookletUpload/BookletUpload";
class Admin extends Component {
	render() {
		return (
			<div className="container">
				<Switch>
					<Route
						path={this.props.match.url + "/reports"}
						component={() => <Reports/>}
					/>
					<Route
						path={this.props.match.url + "/booklet"}
						component={() => <BookletUpload />}
					/>
					<Route
						path={this.props.match.url}
						component={() => <Dashboard />}
					/>
				</Switch>
			</div>
		);
	}
}
export default withRouter(Admin);
