import React, { Component } from "react";
import Loading from "../../Loading/Loading";
import HintedInput from "../../HintedInput/HintedInput";
import { Button } from "@material-ui/core";
import axios from "axios";
import setToken from "../../utils/setToken";
import { withRouter } from "react-router-dom";
const CancelToken = axios.CancelToken;
let source = CancelToken.source();

class StudentLogin extends Component {
	constructor() {
		super();
		this.state = {
			loading: false,
			username: "4NM16CS121",
			usernameerror: false,
			passworderror: false,
			password: "1998-06-08",
			autherror: false
		};
	}
	errorinfo = "You need to enter a valid USN";
	authmsg = "username or password is incorrect";
	checkSymbols = str => {
		return !/^4N[a-zA-Z]\d{2}[a-zA-Z]{2,3}\d{3}$/gi.test(str);
	};
	handleInput = key => (val, check) => {
		this.setState({
			[key]: val,
			autherror: false,
			[key + "error"]: check
		});
	};
	login = e => {
		e.preventDefault();
		this.setState({
			loading: true
		});
		axios
			.post(
				"/api/auth/login/",
				{
					username: this.state.username,
					password: this.state.password,
					admin: false
				},
				{
					cancelToken: source.token
				}
			)
			.then(data => {
				if (data.data.error) {
					this.setState({
						loading: false,
						autherror: true
					});
				} else {
					setToken(data.data);
					this.setState({ loading: false });
					this.props.history.push("/");
				}
			})
			.catch(thrown => {
				if (axios.isCancel(thrown)) {
					console.log(thrown.message);
				} else {
					this.setState({
						loading: false,
						autherror: true
					});
				}
			});
	};
	componentDidMount() {
		source = CancelToken.source();
		localStorage.removeItem("auth");
	}
	componentWillUnmount() {
		source.cancel("Operation cancelled by user");
	}
	render() {
		return (
			<Loading loading={this.state.loading}>
				<div className="header">Student login</div>
				<form name="admin-login" onSubmit={this.login}>
					<HintedInput
						error={this.state.autherror || this.state.usernameerror}
						errorMsg={
							this.state.autherror ? this.authmsg : this.errorinfo
						}
						value={this.state.username}
						type="text"
						placeholder="username"
						handleChange={(val, check) =>
							this.handleInput("username")(val, check)
						}
						test={this.checkSymbols}
					/>
					<HintedInput
						value={this.state.password}
						type="date"
						placeholder="Birthday"
						inputlabelprops={{ shrink: true }}
						handleChange={(val, __) =>
							this.handleInput("password")(val)
						}
					/>
					<Button
						variant="raised"
						style={{ float: "right" }}
						color="primary"
						type="submit"
					>
						Submit
					</Button>
				</form>
			</Loading>
		);
	}
}
export default withRouter(StudentLogin);
