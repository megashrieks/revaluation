import React, { Component, Fragment } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import "./Admin.css";
import Dashboard from "./Dashboard/Dashboard";
import Reports from "./Reports/Reports";
import BookletUpload from "./BookletUpload/BookletUpload";
import axios from "axios";
import checkAuth from "../utils/checkAuth";
import Loading from "../Loading/Loading";
const CancelToken = axios.CancelToken;
let source;
class Admin extends Component {
	constructor() {
		super();
		this.state = {
			redirect: false,
			loading: false
		};
		axios.interceptors.response.use(resp => {
			if (!!resp.data.error && resp.data.error === "auth error") {
				this.setState({ redirect: true });
				return null;
			}
			return resp;
		});
	}
	componentDidMount() {
		source = CancelToken.source();
		this.setState({
			loading: true
		});
		checkAuth(source)
			.then(data => {
				if (data.data.admin === false)
					this.setState({
						redirect: true,
						loading: false
					});
				else
					this.setState({
						redirect: false,
						loading: false
					});
			})
			.catch(thrown => {
				if (axios.isCancel(thrown)) {
					console.log("thrown.message");
				} else {
					this.setState({
						redirect: true,
						loading: false
					});
				}
			});
	}
	componentWillUnmount() {
		source.cancel("Operation cancelled by user");
	}
	render() {
		let routeChanger = this.state.redirect ? <Redirect to="/" /> : null;
		return (
			<Fragment>
				{routeChanger}
				<Loading loading={this.state.loading} conditional={true}>
					<div className="container">
						<Switch>
							<Route
								path={this.props.match.url + "/reports"}
								component={() => <Reports />}
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
				</Loading>
			</Fragment>
		);
	}
}
export default withRouter(Admin);
