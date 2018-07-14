import React, { Component } from "react";
import Loading from "../../Loading/Loading";
import HintedInput from "../../HintedInput/HintedInput";
import { Button } from "@material-ui/core";
import axios from "axios";
import setToken from "../../utils/setToken";
import { withRouter } from "react-router-dom";
const CancelToken = axios.CancelToken;
let source = CancelToken.source();

class AdminLogin extends Component {
	state = {
		loading: false,
		username: "",
		autherror: false,
		usernameerror: false,
		passworderror: false,
		password: ""
	};
	errorinfo = "Username can't contain symbols";
	authmsg = "Username or password is incorrect";
	checkSymbols = str => {
		return /[$-/:-?{-~!"^_`\\#@[\]]/g.test(str);
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
					admin: true
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
				if (axios.isCancel(thrown)) console.log(thrown.message);
			});
	};
	componentDidMount() {
		source = CancelToken.source();
	}
	componentWillUnmount() {
		source.cancel("Operation cancelled by user");
	}
	render() {
		return (
			<Loading loading={this.state.loading}>
				<div className="header">Admin login</div>
				<form name="admin-login" onSubmit={this.login}>
					<HintedInput
						error={this.autherror || this.state.usernameerror}
						errorMsg={
							this.state.autherror ? this.authmsg : this.errorinfo
						}
						value={this.state.username}
						type="username"
						placeholder="username"
						handleChange={(val, check) =>
							this.handleInput("username")(val, check)
						}
						test={this.checkSymbols}
					/>
					<HintedInput
						value={this.state.password}
						type="password"
						placeholder="password"
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
export default withRouter(AdminLogin);
