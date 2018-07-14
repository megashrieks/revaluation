import React, { Component, Fragment } from "react";
import "./UploadForm.css";
import axios from "axios";
const CancelToken = axios.CancelToken;
let source = CancelToken.source();
class UploadForm extends Component {
	state = {
		filename: "",
		file: null,
		filePath: "",
		uploading: false
	};
	componentDidMount() {
		source = CancelToken.source();
	}
	componentWillUnmount() {
		source.cancel("Operation cancelled by user");
	}
	changeData = ({ target: { value, files } }) => {
		if (files.length !== 0)
			this.setState({
				filename: files[0].name,
				file: files[0],
				filePath: value
			});
		else
			this.setState({
				filename: "",
				file: null,
				filePath: ""
			});
	};
	submit = e => {
		this.setState({ uploading: true });
		if (!!this.state.filename) {
			let formdata = new FormData();
			formdata.append(this.props.filename, this.state.file);
			let config = {
				headers: {
					"content-type": "multipart/form-data"
				},
				cancelToken: source.token
			};
			axios
				.post(this.props.actionRoute, formdata, config)
				.then(data => {
					let msg = "";
					if (!!data.data.error) msg = data.data.error;
					else msg = data.data;
					this.props.onFinish(msg);
					this.setState({
						filename: "",
						file: null,
						filePath: "",
						uploading: false
					});
				})
				.catch(thrown => {
					if (axios.isCancel(thrown)) {
						console.log(thrown.message);
					}
				});
		}
	};
	render() {
		return (
			<Fragment>
				<div
					className={
						"upload-wrapper" +
						(this.state.uploading ? " disabled" : "")
					}
				>
					<form onSubmit={e => e.preventDefault()}>
						<label
							className={
								"custom-file" +
								(!!this.state.filename ? " active" : "")
							}
							htmlFor="fileme"
						>
							<span className="ocher">
								<h4 className="fake-header">
									{!!!this.state.filename
										? this.props.placeholder
										: this.state.filename}
								</h4>
							</span>
							<input
								onChange={this.changeData}
								type="file"
								id="fileme"
								value={this.state.filePath}
								disabled={this.state.uploading}
							/>
						</label>
						{!!this.state.filename && (
							<button
								className="submit-file"
								type="submit"
								onClick={this.submit}
							>
								<i className="fa fa-check" />
							</button>
						)}
					</form>
				</div>
			</Fragment>
		);
	}
}
export default UploadForm;
