import React, { Fragment } from "react";
import "./Loading.css";
export default props => {
	return (
		<Fragment>
			<div className="loading">
				<div className="loading-cell">
					<div className="lds-ellipsis">
						<div />
						<div />
						<div />
						<div />
					</div>
				</div>
			</div>
			{props.children}
		</Fragment>
	);
};
