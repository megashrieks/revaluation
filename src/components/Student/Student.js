import React, { Component, Fragment } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";
import { Redirect } from "react-router-dom";
import checkAuth from "../utils/checkAuth";
const CancelToken = axios.CancelToken;
let source;

export default class Student extends Component {
	state = {
		loading: false,
		error: false,
		subjects: [
			{ sub_code: "abcdef", sub_name: "ghijkl" },
			{ sub_code: "abcaddef", sub_name: "ghijkl" },
			{ sub_code: "afdbcdef", sub_name: "ghijkl" }
		],
		redirect: false,
		pending: false,
		name: "mario gonzales"
	};
	componentDidMount() {
		source = CancelToken.source();
		this.setState({ pending: true });
		checkAuth(source)
			.then(data => {
				if (data.data.admin === true)
					this.setState({
						redirect: true,
						pending: false
					});
				else
					this.setState({
						redirect: false,
						pending: false
					});
			})
			.catch(thrown => {
				if (axios.isCancel(thrown)) {
					console.log(thrown.message);
				} else {
					this.setState({
						redirect: true,
						pending: false
					});
				}
			});
		// this.setState({
		// 	loading: true
		// });
		// axios
		// 	.post(
		// 		"/api/student/get_student_data",
		// 		{},
		// 		{
		// 			cancelToken: source.token
		// 		}
		// 	)
		// 	.then(data => {
		// 		if (data.error) {
		// 			this.setState({
		// 				error: true,
		// 				loading: false
		// 			});
		// 			return;
		// 		}
		// 		this.setState({
		// 			loading: false
		// 		});
		// 	})
		// 	.catch(thrown => {
		// 		if (axios.isCancel(thrown)) {
		// 			console.log(thrown.message);
		// 		} else {
		// 			this.setState({
		// 				loading: false,
		// 				error: true
		// 			});
		// 		}
		// 	});
	}
	constructor() {
		super();
		axios.interceptors.response.use(resp => {
			if (!!resp.data.error && resp.data.error === "auth error") {
				this.setState({
					redirect: true
				});
				return null;
			}
			return resp;
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
				<Loading loading={this.state.pending} conditional={true}>
					<Loading loading={this.state.loading}>
						{this.state.name}
					</Loading>
				</Loading>
			</Fragment>
		);
	}
}
