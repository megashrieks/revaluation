import React, { Component } from "react";
import Loading from "../../Loading/Loading";
import HintedInput from "../../HintedInput/HintedInput";
import { Button } from "@material-ui/core";
import axios from "axios";
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

class StudentLogin extends Component {
	constructor() {
		super();
		// let date = new Date().getDate();
		// date = date < 10 ? "0" + date : date;
		// let month = new Date().getMonth()+1;
		// month = month < 10 ? "0" + month : month;
		// let year = new Date().getFullYear();
		// let final_date = year + "-" + month + "-" + date;
		this.state = {
			loading: false,
			username: "4NM16CS121",
			usernameerror: false,
			passworderror: false,
			password: "1998-06-08"
		};
	}
	checkSymbols = str => {
		return !/4NM\d\d\w{2}\d\d\d/gi.test(str);
	};
	handleInput = key => (val, check) => {
		this.setState({
			[key]: val,
			[key + "error"]: check
		});
	};
	login = e => {
		e.preventDefault();
		this.setState({
			loading: true
		});
		axios
			.post("api/login/", {
				username: this.state.username,
				password: this.state.password,
				admin: false,
				cancelToken: source.token
			})
			.then(data => {
				if (data.error)
					this.setState({
						loading: false
					});
				else
					this.setState({
						loading: false
					});
			})
			.catch(thrown => {
				if (axios.isCancel(thrown)) {
					console.log(thrown.message);
				} else {
				}
			});
	};
	componentWillUnmount() {
		source.cancel("Operation cancelled by user");
	}
	render() {
		return (
			<Loading loading={this.state.loading}>
				<div className="header">Student login</div>
				<form name="admin-login" onSubmit={this.login}>
					<HintedInput
						error={this.state.usernameerror}
						errorMsg={"You need to enter a valid USN"}
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
						type="date"
						placeholder="Birthday"
						inputlabelprops={{
							shrink: true
						}}
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
export default StudentLogin;
