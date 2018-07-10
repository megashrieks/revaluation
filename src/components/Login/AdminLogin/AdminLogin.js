import React, { Component } from "react";
import Loading from "../../Loading/Loading";
import HintedInput from "../../HintedInput/HintedInput";
import { Button } from "@material-ui/core";
import axios from "axios";
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

class AdminLogin extends Component {
	state = {
		loading: false,
		username: "",
		usernameerror: false,
		passworderror: false,
		password: ""
	};
	checkSymbols = str => {
		return /[$-/:-?{-~!"^_`\\#@[\]]/g.test(str);
	};
	handleInput = key => (val, check) => {
		this.setState({
			[key]: val,
			[key + "error"]: check
		});
	};
	login = (e) => {
		e.preventDefault();
		this.setState({
			loading: true
		});
		axios.post("api/auth/login/", {
			username: this.state.username,
			password: this.state.password,
			admin: true,
			cancelToken:source.token
		}).then(data => {
			if (data.error)
				this.setState({
					loading: false
				});
			else
			this.setState({
				loading: false
			});
		}).catch(thrown => {
			if (axios.isCancel(thrown)) 
				console.log(thrown.message);
		});
	}
	componentWillUnmount() {
		source.cancel("Operation cancelled by user");
	}
	render() {
		return (
			<Loading loading={this.state.loading}>
				<div className="header">Admin login</div>
				<form
					name="admin-login"
					onSubmit={this.login}>
					<HintedInput
						error={this.state.usernameerror}
						errorMsg={"Username can't contain symbols"}
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
					<Button variant="raised" style={{float:"right"}} color="primary" type="submit">
						Submit
					</Button>
				</form>
			</Loading>
		);
	}
}
export default AdminLogin;
