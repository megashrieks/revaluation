import React, { Component, Fragment } from "react";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import axios from "axios";
import Loading from "../../Loading/Loading";
import RenderTable from "../../RenderTable/RenderTable";
import Modal from "../../Modal/Modal";
const CancelToken = axios.CancelToken;
let source;
class Reports extends Component {
	state = {
		branch: 0,
		loading: false,
		data: []
	};
	heads = ["sub. code", "sem", "applicants"];
	list = [
		{
			sub_code: "ph",
			name: "Physics"
		},
		{
			sub_code: "cy",
			name: "Chemistry"
		},
		{
			sub_code: "hu",
			name: "Humanities"
		},
		{
			sub_code: "ma",
			name: "Mathematics"
		},
		{
			sub_code: "mca",
			name: "MCA"
		},
		{
			sub_code: "me",
			name: "Mechanical Engg."
		},
		{
			sub_code: "is",
			name: "Information Science"
		},
		{
			sub_code: "ee",
			name: "Electronics and Electricals"
		},
		{
			sub_code: "ec",
			name: "Electronics and Communications"
		},
		{
			sub_code: "cs",
			name: "Computer Science"
		},
		{
			sub_code: "cv",
			name: "Civil Engg."
		},
		{
			sub_code: "bt",
			name: "Bio Technology"
		}
	];
	changeDropdownState = ({ target: { name, value } }) => {
		this.setState({
			[name]: value
		});
		if (value !== 0) {
			this.getSubjectData(value);
		}
	};
	translate = obj => {
		return [
			obj.code,
			obj.sem,
			<Modal
				title={"Applicants details"}
				trigger={
					<div className="fake-link">{obj.applicants.length}</div>
				}
				content={
					<Fragment>
						<div className="list-item">
							<div className="third minor-info">USN</div>
							<div className="third minor-info">Booklet Code</div>
							<div className="third minor-info">Subject Code</div>
						</div>
						{obj.applicants.map((applicant, index) => {
							return (
								<div
									key={"applicant-" + index}
									className="list-item"
								>
									<div className="third minor-info">
										{applicant.usn}
									</div>
									<div className="third minor-info">
										{applicant.booklet_code.booklet_code}
									</div>
									<div className="third minor-info">
										{obj.code}
									</div>
								</div>
							);
						})}
					</Fragment>
				}
			/>
		];
	};
	getSubjectData = branch => {
		this.setState({ loading: true });
		source = CancelToken.source();
		axios
			.post(
				"/api/admin/report",
				{
					branch: branch
				},
				{ cancelToken: source.token }
			)
			.then(data => {
				let d = data.data;
				let details = [];
				d.forEach(element => {
					element.sem_details.forEach(ele => {
						details.push({
							sem: element.sem,
							code: ele._id.sub_code,
							applicants: ele.applicants
						});
					});
				});
				this.setState({
					data: details,
					loading: false
				});
			})
			.catch(thrown => {
				if (axios.isCancel(thrown)) console.log(thrown.message);
			});
	};
	componentWillUnmount() {
		source.cancel("Operation cancelled by user");
	}
	render() {
		return (
			<Loading loading={this.state.loading}>
				<div className="padd-25-50">
					<div className="width-third">
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
								{this.list.map((e, i) => {
									return (
										<MenuItem key={i} value={e.sub_code}>
											{e.name}
										</MenuItem>
									);
								})}
							</Select>
						</FormControl>
					</div>
				</div>
				<div className="report-container padd-25-50">
					{this.state.data.length > 0 ? (
						<RenderTable
							data={this.state.data}
							heads={this.heads}
							translate={this.translate}
							paginationEnabled={true}
						/>
					) : this.state.branch === 0 ? (
						<div className="minor-info">Select a Branch</div>
					) : this.state.loading ? (
						""
					) : (
						<div className="minor-info">No data available</div>
					)}
				</div>
			</Loading>
		);
	}
}
export default Reports;
