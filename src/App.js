import React, { Component, Fragment } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import AuthRedirect from "./components/AuthRedirect/AuthRedirect";
import Login from "./components/Login/Login";
import Admin from "./components/Admin/Admin";
import Student from "./components/Student/Student";
import TopBar from "./components/TopBar/TopBar";
class App extends Component {
	render() {
		return (
			<div className="App">
				<Switch>
					<Route
						path="/login"
						component={props => <Login {...props} />}
					/>
					<Route
						path="/admin"
						component={() => (
							<Fragment>
								<Admin />
								<TopBar />
							</Fragment>
						)}
					/>
					<Route
						path="/student"
						component={() => (
							<Fragment>
								<Student />
								<TopBar />
							</Fragment>
						)}
					/>
					} />
					<Route path="/" component={() => <AuthRedirect />} />
				</Switch>
			</div>
		);
	}
}

export default App;
