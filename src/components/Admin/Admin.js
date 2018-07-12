import React, { Component } from "react";
import BreadcrumbURL from "./BreadcrumbURL/BreadcrumbURL";
import { Link, Route, Switch, withRouter } from "react-router-dom";
import "./Admin.css";
import Dashboard from "./Dashboard/Dashboard";
import Reports from "./Reports/Reports";
class Admin extends Component {
	state = {
		url: [
			{
				name: "admin",
				type: "normal",
				url: "/admin"
			},
			{
				active: 0,
				type: "dropdown",
				url: "",
				options: [
					{
						name: "Dashboard",
						url: ""
					},
					{
						name: "Reports",
						url: "/reports"
					},
					{
						name: "add students",
						url: "/add-students"
					}
				]
			}
		]
	};

	pusher = val => {
		let urls = this.state.url;
		urls.push(val);
		this.setState({
			url: urls
		});
	};
	activator = index => {
		let urls = this.state.url;
		if (urls[urls.length - 1].active === index) return;
		urls[urls.length - 1].active = index;
		this.setState({
			url: urls
		});
	};
	render() {
		return (
			<div className="container">
				<BreadcrumbURL url={this.state.url} />
				<Switch>
					<Route
						path={this.props.match.url + "/reports"}
						component={() => {
							this.activator(1);
							return (
								<Reports
									pusher={this.pusher}
									activator={this.activator}
								/>
							);
						}}
					/>
					<Route
						path={this.props.match.url}
						component={() => {
							this.activator(0);
							return <Dashboard />;
						}}
					/>
				</Switch>
			</div>
		);
	}
}
export default withRouter(Admin);
