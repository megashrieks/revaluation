import React, { Component } from "react";
import Loading from '../../Loading/Loading';
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
		name: "",
		USN: "",
		dob: "",
		branch: 0,
		email: "",
		nameerror: false,
		USNerror: false,
		doberror: false,
		emailerror: false,
		brancherror: false
	};
	nameerrormsg = "Enter a valid Name";
	USNerrormsg = "Enter a valid USN";
	emailerrormsg = "Enter a valid email address";
	doberrormsg = "Enter a valid date of birth";
	brancherrormsg = "Select a non-empty value";
	symbolTest = str => {
		return str === "" || /[$-/:-?{-~!"^_`\\#@[\]]/g.test(str);
	};
	USNTest = str => {
		return str === "" || !/^4N[a-zA-Z]\d{2}[a-zA-Z]{2,3}\d{3}$/gi.test(str);
	};
	dobTest = str => {
		return str === "" || !/^\d\d\d\d-\d\d-\d\d$/gi.test(str);
	};
	emailTest = str => {
		return (
			str === "" ||
			!/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/gi.test(
				str
			)
		);
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
			name: "",
			USN: "",
			dob: "",
			branch: 0,
			email: "",
			nameerror: false,
			USNerror: false,
			doberror: false,
			emailerror: false,
			brancherror: false
		});
	};
	submitData = () => {
		let nameTest = this.symbolTest(this.state.name);
		let emailTest = this.emailTest(this.state.email);
		let USNTest = this.USNTest(this.state.USN);
		let dobTest = this.dobTest(this.state.dob);
		let branchTest = this.dropdownTest(this.state.branch);
		let totalError =
			nameTest || emailTest || USNTest || dobTest || branchTest;
		if (totalError)
			this.setState({
				nameerror: nameTest,
				emailerror: emailTest,
				USNerror: USNTest,
				doberror: dobTest,
				brancherror: branchTest
			});
		else {
			source = CancelToken.source();
			this.setState({
				loading: true
			});
			axios
				.post(
					"/api/admin/add_student",
					{
						student_data: {
							name: this.state.name,
							usn: this.state.USN,
							dob: this.state.dob,
							branch: this.state.branch,
							email: this.state.email
						}
					},
					{
						cancelToken: source.token
					}
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
        this.setState({
            [name]: false
        });
	};
	onFinish = msg => {
		this.setState({ snackmsg: msg, snack: true });
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
				<div className="header">User Registration</div>
				<div className="half padd-25">
					<HintedInput
						error={this.state.nameerror}
						errorMsg={this.nameerrormsg}
						value={this.state.name}
						type="text"
						placeholder="name"
						handleChange={(val, check) =>
							this.handleInput("name")(val, check)
						}
						test={this.symbolTest}
					/>
				</div>
				<div className="half padd-25">
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
				<div className="half padd-25">
					<HintedInput
						error={this.state.doberror}
						errorMsg={this.doberrormsg}
						value={this.state.dob}
						type="date"
						placeholder="date of birth"
						inputlabelprops={{ shrink: true }}
						handleChange={(val, check) =>
							this.handleInput("dob")(val, check)
						}
						test={this.dobTest}
					/>
				</div>
				<div className="half padd-25">
					<HintedInput
						error={this.state.emailerror}
						errorMsg={this.emailerrormsg}
						value={this.state.email}
						type="email"
						placeholder="email"
						handleChange={(val, check) =>
							this.handleInput("email")(val, check)
						}
						test={this.emailTest}
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
							<MenuItem value={"COM"}>Computer Science</MenuItem>
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
					<div
						className="marg-5-10"
						style={{
							display: "inline-block"
						}}
					>
						<Button
                            variant="raised"
                            color="primary"
                            onClick={this.submitData}
                            disabled={this.state.loading}>
							Submit
						</Button>
					</div>
					<div
						className="marg-5-10"
						style={{
							display: "inline-block"
						}}
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
						actionRoute="/api/admin/add_students"
						filename="file_input"
						placeholder="Upload user data"
						onFinish={this.onFinish}
					/>
				</div>
			</Loading>
		);
	}
}
