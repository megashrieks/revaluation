import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import axios from "axios";
import getToken from "./components/utils/getToken";
axios.interceptors.request.use(config => {
	let token = getToken();
	if (token !== null) config.headers.token = token.token;
	return config;
});
ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById("root")
);
registerServiceWorker();
