import React, { Component, Fragment } from "react";
import Loading from "../../Loading/Loading";
import HintedInput from "../../HintedInput/HintedInput";
import { Button, Snackbar } from "@material-ui/core";
import UploadForm from "../../UploadForm/UploadForm";
import Panel from "../../Panel/Panel";
import axios from "axios";
const CancelToken = axios.CancelToken;
let source;
export default class AddStudentSubject extends Component {
	state = {
		USN: "",
		USNerror: false,
		sub_code: "",
		sub_codeerror: false
	};
	USNerrormsg = "Enter a valid USN";
	sub_codeerrormsg = "Enter a valid subject code";
	symbolTest = str => {
		return str === "" || /[$-/:-?{-~!"^_`\\#@[\]]/g.test(str);
	};
	USNTest = str => {
		return str === "" || !/^4N[a-zA-Z]\d{2}[a-zA-Z]{2,3}\d{3}$/gi.test(str);
	};
	dobTest = str => {
		return str === "" || !/^\d\d\d\d-\d\d-\d\d$/gi.test(str);
	};
	handleInput = key => (val, check) => {
		this.setState({
			[key]: val,
			[key + "error"]: check
		});
	};
	resetForm = () => {
		this.setState({
			USN: "",
			USNerror: false,
			sub_code: "",
			sub_codeerror: false
		});
	};
	submitData = () => {
		let sub_codeTest = this.symbolTest(this.state.sub_code);
		let USNTest = this.USNTest(this.state.USN);
		let totalError = sub_codeTest || USNTest;
		if (totalError)
			this.setState({
				sub_codeerror: sub_codeTest,
				USNerror: USNTest
			});
		else {
			source = CancelToken.source();
			this.setState({ loading: true });
			axios
				.post(
					"/api/admin/add_stud_reg_course",
					{
						usn: this.state.USN,
						sub_code: this.state.sub_code
					},
					{ cancelToken: source.token }
				)
				.then(data => {
					this.setState({
						loading: false,
						snack: true,
						snackmsg: data.data
					});
				})
				.catch(thrown => {
					if (axios.isCancel(thrown)) {
						console.log(thrown.message);
					}
				});
		}
	};
	componentDidMount() {
		source = CancelToken.source();
	}
	componentWillUnmount() {
		source.cancel("Operation cancelled by user");
	}
	handleClose = name => () => {
		this.setState({ [name]: false });
	};
	onFinish = msg => {
		this.setState({
			snackmsg: msg,
			snack: true
		});
	};
	render() {
		return (
			<Loading loading={this.state.loading}>
				<Snackbar
					anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
					open={this.state.snack}
					autoHideDuration={3000}
					onClose={this.handleClose("snack")}
					message={<span>{this.state.snackmsg || "Error!"}</span>}
				/>
				<div className="header">Add Student Registered Courses</div>
				<Panel
					title={
						<span className="mini-header black">
							Some Information
						</span>
					}
					content={
						<Fragment>
							<li className="instructions">
								The Format for the Excel Document is as follows
								:
							</li>
							<li className="instructions">
								Column 1 should be filled with USN values.
							</li>
							<li className="instructions">
								Column 2 should be filled with Subject Codes.
							</li>
						</Fragment>
					}
				/>
				<div className="half padd-15">
					<HintedInput
						error={this.state.USNerror}
						errorMsg={this.USNerrormsg}
						value={this.state.USN}
						type="text"
						placeholder="usn"
						handleChange={(val, check) =>
							this.handleInput("USN")(val, check)
						}
						test={this.USNTest}
					/>
				</div>
				<div className="half padd-15">
					<HintedInput
						error={this.state.sub_codeerror}
						errorMsg={this.sub_codeerrormsg}
						value={this.state.sub_code}
						type="text"
						placeholder="subject code"
						handleChange={(val, check) =>
							this.handleInput("sub_code")(val, check)
						}
						test={this.symbolTest}
					/>
				</div>
				<div className="half padd-15" style={{ paddingTop: 0 }}>
					<div
						className="marg-5-10"
						style={{ display: "inline-block" }}
					>
						<Button
							variant="raised"
							color="primary"
							onClick={this.submitData}
							disabled={this.state.loading}
						>
							Submit
						</Button>
					</div>
					<div
						className="marg-5-10"
						style={{ display: "inline-block" }}
					>
						<Button
							variant="raised"
							color="secondary"
							onClick={this.resetForm}
						>
							Reset form
						</Button>
					</div>
				</div>
				<div>
					<UploadForm
						actionRoute="/api/admin/add_stud_reg_courses"
						filename="file_input"
						placeholder="Upload student subjects"
						onFinish={this.onFinish}
					/>
				</div>
			</Loading>
		);
	}
}
