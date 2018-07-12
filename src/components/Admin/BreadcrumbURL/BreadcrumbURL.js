import React, { Component, Fragment } from "react";
import "./BreadcrumbURL.css";
import { Link } from "react-router-dom";
class BreadcrumbURL extends Component {
	state = {
		active: -1
	};
	toggleDropdown = val => {
		this.setState(prev => {
			if (prev.active !== val)
				return {
					active: val
				};
			else
				return {
					active: -1
				};
		});
	};
	render() {
		let url = this.props.url;
		let target = "";
		let crumbs = url.map((e, i) => {
			let current = target;
			target += e.url;
			return (
				<Fragment key={"c" + i}>
					{e.type !== "dropdown" && (
						<Link to={target} className="crumb">
							{e.name}
						</Link>
					)}
					{e.type === "dropdown" && (
						<div
							className={
								"crumb-dropdown" +
								(this.state.active === i ? " active" : "")
							}>
							<span onClick={() => this.toggleDropdown(i)}>
								{e.options[e.active].name}
                                <i className={"icon-dropdown fa fa-angle-" +
                                    (this.state.active === i ? "up" : "down")} />
							</span>
							<div className="crumb-dropdown-items">
								{url[i].options.map((ee, ii) => {
									return (
										<Link
											to={current + ee.url}
											key={"item" + ii}
											className="crumb-dropdown-item">
											{ee.name}
										</Link>
									);
								})}
							</div>
						</div>
					)}
					{i !== url.length - 1 && (
						<div className="seperator">
							<i className="fa fa-angle-right" />
						</div>
					)}
				</Fragment>
			);
		});
		return <div className="breadcrumb-url">You're at {crumbs}</div>;
	}
}
export default BreadcrumbURL;
