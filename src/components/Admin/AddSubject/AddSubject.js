import React, { Component } from "react";
import Loading from "../../Loading/Loading";
import HintedInput from "../../HintedInput/HintedInput";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import { Button, Snackbar } from "@material-ui/core";
import UploadForm from "../../UploadForm/UploadForm";
import axios from "axios";
const CancelToken = axios.CancelToken;
let source;
export default class UserRegistration extends Component {
	state = {
		branch: 0,
		brancherror: false,
		type: 0,
		typeerror: false,
		sub_code: "",
		sub_codeerror: false,
		sub_name: "",
		sub_nameerror: false,
		sem: 0,
		semerror: false
	};
	brancherrormsg = "Select a non-empty value";
	sub_nameerrormsg = "Enter a valid subject name";
	sub_codeerrormsg = "Enter a valid date of birth";
	typeerrormsg = "Select a non-empty value";
	semerrormsg = "Select a non-empty value";
	symbolTest = str => {
		return str === "" || /[$-/:-?{-~!"^_`\\#@[\]]/g.test(str);
	};
	dropdownTest = val => val === 0;
	handleInput = key => (val, check) => {
		this.setState({
			[key]: val,
			[key + "error"]: check
		});
	};
	changeDropdownState = ({ target: { name, value } }) => {
		this.setState({
			[name]: value,
			[name + "error"]: this.dropdownTest(value)
		});
	};
	resetForm = () => {
		this.setState({
			branch: 0,
			brancherror: false,
			type: 0,
			typeerror: false,
			sub_code: "",
			sub_codeerror: false,
			sub_name: "",
			sub_nameerror: false,
			sem: 0,
			semerror: false
		});
	};
	submitData = () => {
		let sub_codeTest = this.symbolTest(this.state.sub_code);
		let sub_nameTest = this.symbolTest(this.state.sub_name);
		let branchTest = this.dropdownTest(this.state.branch);
		let semTest = this.dropdownTest(this.state.sem);
		let typeTest = this.dropdownTest(this.state.type);
		let totalError = sub_codeTest || sub_nameTest || typeTest || semTest;
		if (totalError)
			this.setState({
				sub_codeerror: sub_codeTest,
				sub_nameerror: sub_nameTest,
				brancherror: branchTest,
				typeerror: typeTest,
				semerror: semTest
			});
		else {
			source = CancelToken.source();
			this.setState({ loading: true });
			axios
				.post(
					"/api/admin/add_subject",
					{
						subject: {
							branch: this.state.branch,
							sub_name: this.state.sub_name,
							sub_code: this.state.sub_code,
							sub_type: this.state.type,
							sem: this.state.sem
						}
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
				<div className="header">Add subject</div>

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
				<div className="half padd-25">
					<FormControl fullWidth error={this.state.brancherror}>
						<InputLabel>Branch</InputLabel>
						<Select
							value={this.state.branch}
							onChange={this.changeDropdownState}
							inputProps={{ name: "branch" }}
						>
							<MenuItem value={0}>
								<i>Select Branch</i>
							</MenuItem>
							<MenuItem value={"BTE"}>Biotechnology</MenuItem>
							<MenuItem value={"CIV"}>Civil</MenuItem>
							<MenuItem value={"CS"}>Computer Science</MenuItem>
							<MenuItem value={"ELC"}>
								Electronics & Communication
							</MenuItem>
							<MenuItem value={"ELE"}>
								Electrical & Electronics
							</MenuItem>
							<MenuItem value={"IFS"}>
								Information Science
							</MenuItem>
							<MenuItem value={"MEC"}>Mechanical</MenuItem>
							<MenuItem value={"MCA"}>MCA</MenuItem>
							<MenuItem value={"FY"}>First Year</MenuItem>
						</Select>
						<FormHelperText>
							{this.state.brancherror && this.brancherrormsg}
						</FormHelperText>
					</FormControl>
				</div>
				<div className="half padd-25">
					<FormControl fullWidth error={this.state.semerror}>
						<InputLabel>Semester</InputLabel>
						<Select
							value={this.state.sem}
							onChange={this.changeDropdownState}
							inputProps={{ name: "sem" }}
						>
							<MenuItem value={0}>
								<i>Select Semester</i>
							</MenuItem>
							<MenuItem value={1}>Semester I</MenuItem>
							<MenuItem value={2}>Semester II</MenuItem>
							<MenuItem value={3}>Semester III</MenuItem>
							<MenuItem value={4}>Semester IV</MenuItem>
							<MenuItem value={5}>Semester V</MenuItem>
							<MenuItem value={6}>Semester VI</MenuItem>
							<MenuItem value={7}>Semester VII</MenuItem>
							<MenuItem value={8}>Semester VIII</MenuItem>
						</Select>
						<FormHelperText>
							{this.state.semerror && this.semerrormsg}
						</FormHelperText>
					</FormControl>
				</div>
				<div className="half padd-25">
					<FormControl fullWidth error={this.state.typeerror}>
						<InputLabel>Course type</InputLabel>
						<Select
							value={this.state.type}
							onChange={this.changeDropdownState}
							inputProps={{ name: "type" }}
						>
							<MenuItem value={0}>
								<i>Select Course type</i>
							</MenuItem>
							<MenuItem value={"T"}>Theory</MenuItem>
							<MenuItem value={"L"}>Lab</MenuItem>
							<MenuItem value={"P"}>Practical</MenuItem>
							<MenuItem value={"LTP"}>LTP</MenuItem>
						</Select>
						<FormHelperText>
							{this.state.typeerror && this.typeerrormsg}
						</FormHelperText>
					</FormControl>
				</div>
				<div className="half padd-25">
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
						actionRoute="/api/admin/add_subjects"
						filename="file_input"
						placeholder="Upload subject data"
						onFinish={this.onFinish}
					/>
				</div>
			</Loading>
		);
	}
}
