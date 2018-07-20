import React, { Component } from "react";
import Loading from "../../Loading/Loading";
import HintedInput from "../../HintedInput/HintedInput";
import { Button, Snackbar } from "@material-ui/core";
import UploadForm from "../../UploadForm/UploadForm";
import axios from "axios";
const CancelToken = axios.CancelToken;
let source;
export default class AddStudentSubject extends Component {
	state = {
		USN: "",
		USNerror: false,
		sub_code: "",
		sub_codeerror: false,
		sub_name: "",
		sub_nameerror: false
	};
	USNerrormsg = "Enter a valid USN";
	sub_nameerrormsg = "Enter a valid subject name";
	sub_codeerrormsg = "Enter a valid date of birth";
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
			sub_codeerror: false,
			sub_name: "",
			sub_nameerror: false
		});
	};
	submitData = () => {
		let sub_codeTest = this.symbolTest(this.state.sub_code);
		let sub_nameTest = this.symbolTest(this.state.sub_name);
		let USNTest = this.USNTest(this.state.USN);
		let totalError = sub_codeTest || sub_nameTest || USNTest;
		if (totalError)
			this.setState({
				sub_codeerror: sub_codeTest,
				sub_nameerror: sub_nameTest,
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
						sub_name: this.state.sub_name,
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
				<div className="half padd-15">
					<HintedInput
						error={this.state.sub_nameerror}
						errorMsg={this.sub_nameerrormsg}
						value={this.state.sub_name}
						type="text"
						placeholder="subject name"
						handleChange={(val, check) =>
							this.handleInput("sub_name")(val, check)
						}
						test={this.symbolTest}
					/>
				</div>
				<div className="half padd-15">
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
