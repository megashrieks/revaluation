import React, { Component } from "react";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import axios from "axios";
import Loading from "../../Loading/Loading";
const CancelToken = axios.CancelToken;
let source;
class Reports extends Component {
	state = {
		branch: 0,
		list: [],
		loading: false,
		not_selected:true
	};
	changeDropdownState = ({ target: { name, value } }) => {
		let not_selected = (name === "branch" && value === 0)
		this.setState({
			[name]: value,
			not_selected: not_selected
		});
		if (!not_selected) {
			this.getSubjectData();
		}
	};
	getSubjectData = () => {
		this.setState({ loading: true });
		source = CancelToken.source();
		axios
			.post("/api/admin/report", { branch: this.state.branch }, { cancelToken: source.token })
			.then(data => {
				this.setState({loading:false})
				console.log(this.state.branch,data);
			})
			.catch(thrown => {
				if (axios.isCancel(thrown)) {
					console.log(thrown.message);
				}
			});	
	}
	unmounted = false;
	componentWillUnmount() {
		this.unmounted = true;
		console.log("unmounted right now");
		source.cancel("Operation cancelled by user");
	}
	componentDidMount() {
		source = CancelToken.source();
		this.setState({
			loading: true
		});
		axios
			.get(
				"/api/admin/get_branches",
				{
					cancelToken: source.token
				}
			)
			.then(data => {
				this.setState({
					list: data.data,
					loading: false
				});
			})
			.catch(thrown => {
				if (axios.isCancel(thrown)) {
					console.log(thrown.message);
				}
			});
	}
	render() {
		return (
			<Loading loading={this.state.loading}>
				<div className="padd-25-50">
					<div className="quarter marg-5-10">
						<FormControl fullWidth>
							<InputLabel>Branch</InputLabel>
							<Select
								value={this.state.branch}
								onChange={this.changeDropdownState}
								inputProps={{ name: "branch" }}
							>
								<MenuItem value={0}>
									<i>Select Branch</i>
								</MenuItem>
								{this.state.list.map((e, i) => {
									return (
										<MenuItem key={i} value={e}>
											{e}
										</MenuItem>
									);
								})}
							</Select>
						</FormControl>
					</div>
				</div>
			</Loading>
		);
	}
}
export default Reports;
