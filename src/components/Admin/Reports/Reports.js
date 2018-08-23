import React, { Component, Fragment } from "react";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import axios from "axios";
import Loading from "../../Loading/Loading";
import RenderTable from "../../RenderTable/RenderTable";
import Modal from "../../Modal/Modal";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Logo from "./logo.png";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
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
							name: ele._id.sub_name,
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
	componentDidMount() {
		source = CancelToken.source();
	}
	componentWillUnmount() {
		source.cancel("Operation cancelled by user");
	}
	getBranch = branch => {
		let fullBranch = "";
		this.list.forEach(element => {
			if (element.sub_code === branch) {
				fullBranch = element.name;
				return;
			}
		});
		return fullBranch;
	};
	generatePdf = () => {
		let rows = [];
		this.state.data.forEach(element => {
			let tempObj = {
				table: {
					headerRows: 0,
					widths: ["20%", "40%", "40%"],
					body: []
				}
			};
			let columns = {
				margin: [0, 30, 0, 10],
				columns: [
					{
						text: { bold: true, text: "Semester : " + element.sem }
					},
					{
						text: {
							bold: true,
							text: "Subject Code : " + element.code
						}
					},
					{
						text: {
							bold: true,
							text: "Subject Name : " + element.name
						}
					}
				]
			};
			tempObj.table.body.push([
				{
					text: {
						alignment: "center",
						text: "Sl. No"
					}
				},
				{
					text: {
						alignment: "center",
						text: "USN"
					}
				},
				{
					text: {
						alignment: "center",
						text: "Booklet Code"
					}
				}
			]);
			element.applicants.forEach((applicant, index) => {
				tempObj.table.body.push([
					{
						text: {
							alignment: "center",
							text: index + 1
						}
					},
					{
						text: {
							alignment: "center",
							text: applicant.usn
						}
					},
					{
						text: {
							alignment: "center",
							text: applicant.booklet_code.booklet_code
						}
					}
				]);
			});
			rows.push(columns, tempObj);
		});
		let docDefinition = {
			footer: function(currentPage, pageCount) {
				return {
					columns: [
						{
							margin: [30, 10, 30, 0],
							alignment: "left",
							text: {
								color: "#777",
								bold: true,
								text: "Powered by Finite Loop"
							}
						},
						{
							margin: [0, 10, 30, 0],
							alignment: "right",
							text: {
								color: "#777",
								bold: true,
								text:
									"page " +
									currentPage.toString() +
									" / " +
									pageCount
							}
						}
					]
				};
			},
			content: [
				{
					image: Logo,
					width: 120,
					height: 90,
					style: "icentered"
				},
				{
					columns: [
						{
							width: "100%",
							margin: [0, 10, 0, 5],
							alignment: "center",
							text: {
								bold: true,
								fontSize: 16,
								text:
									"Branch : " +
									this.getBranch(this.state.branch)
							}
						}
					]
				},
				...[...rows]
			],
			styles: {
				icentered: {
					alignment: "center"
				}
			}
		};
		pdfMake.createPdf(docDefinition).print();
	};
	render() {
		return (
			<Loading loading={this.state.loading}>
				<div className="padd-25-50">
					<div className="half">
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
					{!this.state.loading &&
						!!this.state.branch &&
						!!this.state.data.length && (
							<div className="downloads">
								<div
									className="full fake-link"
									onClick={this.generatePdf}
								>
									Download this document
								</div>
							</div>
						)}
				</div>
			</Loading>
		);
	}
}
export default Reports;
