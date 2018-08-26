import React, { Component, Fragment } from "react";
import {
	Route,
	Switch,
	withRouter,
	Redirect,
	NavLink as Link
} from "react-router-dom";
import "./Admin.css";
import Reports from "./Reports/Reports";
import BookletUpload from "./BookletUpload/BookletUpload";
import axios from "axios";
import checkAuth from "../utils/checkAuth";
import Loading from "../Loading/Loading";
import UserRegistration from "./UserRegistration/UserRegistration";
import AddStudentSubject from "./AddStudentSubject/AddStudentSubject";
import AddSubject from "./AddSubject/AddSubject";
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
			// loading: true
		});
		checkAuth(source)
			.then(data => {
				if (data.data.admin === false) {
					this.setState({
						redirect: true,
						loading: false
					});
				} else
					this.setState({
						redirect: false,
						loading: false
					});
			})
			.catch(thrown => {
				if (axios.isCancel(thrown)) {
					console.log(thrown.message);
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
		let routeChanger = this.state.redirect ? (
			<Redirect to="/notfound" />
		) : null;
		return (
			<Fragment>
				{routeChanger}
				<Loading loading={this.state.loading}>
					{!this.state.loading && (
						<div className="container">
							<div className="sidebar">
								<Link
									to={this.props.match.url + "/reports"}
									className="option-sidebar"
								>
									Reports
								</Link>
								<Link
									to={this.props.match.url + "/booklet"}
									className="option-sidebar"
								>
									Booklet Upload
								</Link>
								<Link
									to={this.props.match.url + "/userreg"}
									className="option-sidebar"
								>
									User Registration
								</Link>
								<Link
									to={this.props.match.url + "/studentsub"}
									className="option-sidebar"
								>
									Add Student Subject
								</Link>
								<Link
									to={this.props.match.url + "/subject"}
									className="option-sidebar"
								>
									Add Subject
								</Link>
							</div>
							<div className="content">
								<Switch>
									<Route
										path={this.props.match.url + "/reports"}
										component={Reports}
									/>
									<Route
										path={this.props.match.url + "/booklet"}
										component={BookletUpload}
									/>
									<Route
										path={this.props.match.url + "/userreg"}
										component={UserRegistration}
									/>
									<Route
										path={
											this.props.match.url + "/studentsub"
										}
										component={AddStudentSubject}
									/>
									<Route
										path={this.props.match.url + "/subject"}
										component={AddSubject}
									/>
									<Route
										path={this.props.match.url}
										component={() => {
											return (
												<div className="centered">
													Select a function from the
													sidebar to continue...
												</div>
											);
										}}
									/>
								</Switch>
							</div>
						</div>
					)}
				</Loading>
			</Fragment>
		);
	}
}
export default withRouter(Admin);
