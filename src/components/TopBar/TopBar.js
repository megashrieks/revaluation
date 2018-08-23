import React, { Component, Fragment } from "react";
import "./TopBar.css";
import Logo from "./logo.png";
export default class TopBar extends Component {
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
					<button className="option">Logout</button>
				</div>
			</Fragment>
		);
	}
}
