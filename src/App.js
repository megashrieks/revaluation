import React, { Component} from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import AuthRedirect from './components/AuthRedirect/AuthRedirect';
class App extends Component {
	render() {
		return (
			<div className="App">
				<Switch>
					<Route
						path="/login"
						component={() => {
							return "login";
						}}
					/>
					<Route
						path="/"
						component={()=><AuthRedirect/>}
					/>
				</Switch>
			</div>
		);
	}
}

export default App;
