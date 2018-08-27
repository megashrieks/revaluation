import React, { Component, Fragment } from "react";
import UploadForm from "../../UploadForm/UploadForm";
import "./BookletUpload.css";
import { Snackbar } from "@material-ui/core";
import Panel from "../../Panel/Panel";
export default class BookletUpload extends Component {
	state = { msg: "", snack: false };
	onFinish = msg => {
		this.setState({ msg: msg, snack: true });
	};
	handleClose = name => () => {
		!this.unmounted &&
			this.setState({
				[name]: false
			});
	};
	render() {
		return (
			<Fragment>
				<Snackbar
					anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
					open={this.state.snack}
					autoHideDuration={3000}
					onClose={this.handleClose("snack")}
					message={<span>{this.state.msg || "Error!"}</span>}
				/>
				<div className="header">Add booklet Information</div>
				<Panel
					title={
						<span className="mini-header black">
							Some Information
						</span>
					}
					content={
						<Fragment>
							<li className="instructions">
								The Format for the Excel Document is as follows :
							</li>
							<li className="instructions">
								Column 1 should be filled with USN values.
							</li>
							<li className="instructions">
								Column 2 should be filled with Subject Codes.
							</li>
							<li className="instructions">
								Column 3 should be filled with Booklet Codes.
							</li>
						</Fragment>
					}
				/>
				<div className="uploader">
					<UploadForm
						actionRoute="/api/admin/add_booklet_details"
						filename="file_input"
						placeholder="Upload booklet data"
						onFinish={this.onFinish}
					/>
				</div>
			</Fragment>
		);
	}
}
