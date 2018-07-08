import React, { Component } from 'react';
import Loading from '../../Loading/Loading';

class AdminLogin extends Component{
	render() {
		return (
			<Loading loading={true}>
				When not loading
			</Loading>
		);
	}
}
export default AdminLogin;
