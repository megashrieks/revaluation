import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
class Dashboard extends Component {
	render() {
		return (
			<Fragment>
				<Link className="card" to="/admin/booklet">
					Booklet upload
				</Link>
				<Link className="card" to="/admin/reports">
					Reports
				</Link>
				<Link className="card" to="/admin/userreg">
					User Registration
				</Link>
				<Link className="card" to="/admin/studentsub">
					Add student subject
				</Link>
			</Fragment>
		);
	}
}
export default Dashboard;
