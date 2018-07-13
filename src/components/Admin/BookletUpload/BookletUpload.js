import React, { Component } from "react";
import UploadForm from "../../UploadForm/UploadForm";
import "./BookletUpload.css";
export default class BookletUpload extends Component {
	render() {
		return (
			<div className="uploader">
				<UploadForm
					actionRoute="/api/admin/add_booklet_details"
                    filename="file_input"
					placeholder="Upload booklet data"
				/>
			</div>
		);
	}
}
