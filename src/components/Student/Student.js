import React, { Component, Fragment } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";
import { Redirect } from "react-router-dom";
import checkAuth from "../utils/checkAuth";
import RenderTableSelectable from "../RenderTable/RenderTableSelectable";
import IconButton from "@material-ui/core/IconButton";
import Panel from "../Panel/Panel";
import "./Student.css";
import ModalUntriggered from "../Modal/ModalUntriggered";
import { Button } from "@material-ui/core";
import HintedInput from "../HintedInput/HintedInput";
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
		selectedSubjects: [],
		redirect: false,
		pending: false,
		name: "mario gonzales",
		modalDisplayed: false,
		emailerror: false,
		email: ""
	};
	emailerrormsg = "Enter a valid email address";
	tableHeads = ["Sub. code", "Sub. Name"];
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
		this.setState({
			loading: true
		});
		axios
			.get(
				"/api/student/get_student_info",
				{
					cancelToken: source.token
				}
			)
			.then(data => {
				console.log(data);
				if (data.error) {
					this.setState({
						error: true,
						loading: false
					});
					return;
				}
				this.setState({
					name: data.data.name,
					subjects:data.data.opted_subjects,
					loading: false
				});
			})
			.catch(thrown => {
				if (axios.isCancel(thrown)) {
					console.log(thrown.message);
				} else {
					this.setState({
						loading: false,
						error: true
					});
				}
			});
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

	translateSlotData = obj => {
		return [obj.sub_code, obj.sub_name];
	};
	addElementsToSelected = elements => {
		let subjects = [...this.state.subjects];
		let selected = [...this.state.selectedSubjects];
		elements.forEach((e, i) => {
			let index = -1;
			subjects.forEach((ee, i) => {
				if (ee.sub_code === e) {
					index = i;
					return;
				}
			});
			selected.push(subjects[index]);
			subjects.splice(index, 1);
		});
		this.setState({
			subjects: subjects,
			selectedSubjects: selected
		});
	};
	selectedAddAction = elements => {
		return (
			<IconButton onClick={() => this.addElementsToSelected(elements)}>
				<i className="fa fa-check" style={{ fontSize: "19px" }} />
			</IconButton>
		);
	};
	removeElementsFromSelected = elements => {
		let subjects = [...this.state.subjects];
		let selected = [...this.state.selectedSubjects];
		elements.forEach((e, i) => {
			let index = -1;
			selected.forEach((ee, i) => {
				if (ee.sub_code === e) {
					index = i;
					return;
				}
			});
			subjects.push(selected[index]);
			selected.splice(index, 1);
		});
		this.setState({
			subjects: subjects,
			selectedSubjects: selected
		});
	};
	selectedRemoveAction = elements => {
		return (
			<IconButton
				onClick={() => this.removeElementsFromSelected(elements)}
			>
				<i className="fa fa-trash" style={{ fontSize: "19px" }} />
			</IconButton>
		);
	};
	toggleModal = () => {
		this.setState(prevState => {
			console.log(prevState.modalDisplayed);
			return { modalDisplayed: !prevState.modalDisplayed };
		});
	};
	handleOk = () => {
		let emailStatus = !this.checkEmail(this.state.email);
		if (!emailStatus)
			this.setState({
				emailerror: true
			});
		else {
			//send the subjects and the email address to server
		}
		return emailStatus;
	};
	handleInput = key => (val, check) => {
		this.setState({
			[key]: val,
			[key + "error"]: check
		});
	};
	checkEmail = str => {
		return str === "" || !/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/gi.test(
			str
		);
	};
	render() {
		let routeChanger = this.state.redirect ? <Redirect to="/" /> : null;
		return (
			<Fragment>
				{routeChanger}
				{this.state.modalDisplayed && (
					<ModalUntriggered
						content={
							<div className="bill">
								Please check the following details and enter
								your email address to receive the bill
								<div
									style={{
										padding: "10px",
										boxSizing: "border-box",
										width: "100%",
										margin: "0 auto"
									}}
								>
									<HintedInput
										error={this.state.emailerror}
										errorMsg={this.emailerrormsg}
										value={this.state.email}
										type="email"
										placeholder="email"
										handleChange={(val, check) =>
											this.handleInput("email")(
												val,
												check
											)
										}
										test={this.checkEmail}
									/>
								</div>
								<Panel
									open={true}
									title="See details"
									content={
										<Fragment>
											{this.state.selectedSubjects.map(
												(element, index) => {
													return <div className="cell-full" key={"cell" + index}>
															<div className="sm-text">
																{
																	element.sub_code
																}
															</div>
															<div className="sm-text">
																{
																	element.sub_name
																}
															</div>
														</div>;
												}
											)}
										</Fragment>
									}
								/>
								<div className="total">
									<div className="info">
										<div className="half item">
											Total no. of subjects selected :{" "}
										</div>
										<div className="half value">
											{this.state.selectedSubjects.length}
										</div>
									</div>
									<div className="info">
										<div className="half item">Cost :</div>
										<div className="half value">
											1000 x no of subjects selected
										</div>
									</div>
									<div className="info">
										<div className="half item">Total :</div>
										<div className="half value">
											{1000 *
												this.state.selectedSubjects
													.length}{" "}
											<i className="fa fa-rupee-sign" />
										</div>
									</div>
								</div>
							</div>
						}
						title="Select Confirmation"
						handleOk={this.handleOk}
						sendStatus={this.toggleModal}
						cancel={true}
					/>
				)}
				<Loading loading={this.state.pending} conditional={true}>
					<Loading loading={this.state.loading}>
						<div className="fluid-container">
							<div className="header">
								Welcome {this.state.name}
							</div>
							<Panel
								title={
									<span className="mini-header fake-link black">
										Some Information
									</span>
								}
								content={
									<Fragment>
										<li className="instructions">
											Select the required subjects from
											the left panel.
										</li>
										<li className="instructions">
											check the button that appears on top
											to add it to the subjects to be
											selected
										</li>
										<li className="instructions">
											After the subjects are selected
											click on the submit button
										</li>
										<li className="instructions">
											enter your email address in the
											required field to receive the bill
											in your email.
										</li>
									</Fragment>
								}
							/>
							<div className="selected">
								<div className="left-options">
									<RenderTableSelectable
										heads={this.tableHeads}
										translate={this.translateSlotData}
										data={this.state.subjects}
										title={"Available subjects"}
										selectedAction={this.selectedAddAction}
										emptyString="No subjects available"
										selectionId="sub_code"
										titleStyle={{
											background: "rgb(224, 251, 234)",
											color: "rgb(0, 185, 40)"
										}}
									/>
								</div>
								<div className="right-options">
									<RenderTableSelectable
										heads={this.tableHeads}
										translate={this.translateSlotData}
										data={this.state.selectedSubjects}
										title={"Selected subjects"}
										selectedAction={
											this.selectedRemoveAction
										}
										emptyString="No subjects selected"
										selectionId="sub_code"
										titleStyle={{
											background: "rgb(251, 224, 234)",
											color: "rgb(225, 0, 80)"
										}}
									/>
								</div>
							</div>

							<div className="info right">
								<div className="value">
									<Button
										color="primary"
										variant="raised"
										onClick={this.toggleModal}
										disabled={
											!!!this.state.selectedSubjects
												.length
										}
									>
										Submit
									</Button>
								</div>
							</div>
						</div>
					</Loading>
				</Loading>
			</Fragment>
		);
	}
}
