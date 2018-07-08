import React, { Component} from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import AuthRedirect from './components/AuthRedirect/AuthRedirect';
import Login from './components/Login/Login';
class App extends Component {
	render() {
		return <div className="App">
				<Switch>
				<Route path="/login" component={(props) => <Login {...props}/>} />
				<Route
					path="/admin"
					component={() => {
						return "admin";
					}}
				/>
				<Route
					path="/student"
					component={() => {
						return "student";
					}}
				/>
					<Route path="/" component={() => <AuthRedirect />} />
				</Switch>
			</div>;
	}
}

export default App;
