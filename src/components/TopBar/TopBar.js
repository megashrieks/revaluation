import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import "./TopBar.css";
import Logo from "./logo.png";
class TopBar extends Component {
	render() {
		return (
			<Fragment>
				<div className="top-bar">
					<img
						src={Logo}
						style={{
							width: "auto",
							height: "100%",
							filter: "grayscale(100%)"
						}}
						alt="nitte-logo"
					/>
					<button
						className="option"
						onClick={() => {
							this.props.history.push("/login");
						}}
					>
						Logout
					</button>
				</div>
			</Fragment>
		);
	}
}
export default withRouter(TopBar);
