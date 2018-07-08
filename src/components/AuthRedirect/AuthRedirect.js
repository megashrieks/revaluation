import React, { Component,Fragment } from "react";
import { Redirect } from 'react-router-dom';
import getToken from '../utils/getToken';
import axios from 'axios';
class AuthRedirect extends Component {
    state = {
        auth: 2,
        admin: false
    };
    componentDidMount() {
        let token = getToken();
        console.log(token)
        if (token !== null) {
            axios.post('http://localhost:3000/checkAuth').then(data => {
                if (data.data.error)
                    this.setState({
                        auth: 0
                    });
                else 
                    this.setState({
                        auth: 1,
                        admin:data.data.data.admin
                    })
            });
        } else {
            this.setState({
                auth: 0
            });
        }
    }
    render() {
        let mode;
        switch (this.state.auth) {
            case 0: mode = "Auth failed"; break;
            case 1: if (this.state.admin === true)
                mode = "auth and admin";
            else
                mode = "auth and student";
                break;
            default:
                mode = "Loading..";
        }
        return (
            <Fragment>
                {mode}
            </Fragment>
        );
    }
}
export default AuthRedirect;
