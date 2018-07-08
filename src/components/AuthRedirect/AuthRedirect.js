import React, { Component,Fragment } from "react";
import { Redirect } from 'react-router-dom';
import getToken from '../utils/getToken';
import axios from '../../_axios';

class AuthRedirect extends Component {
    state = {
        auth: 2,
        admin: false
    };
    componentDidMount() {
        let token = getToken();
        console.log(token)
        if (token !== null) {
            axios.get('/api/auth/check_auth')
            .then(data => {
                this.setState({
                    auth: 1,
                    admin: data.data.data.admin
                })
            })
            .catch(err => {
                console.log(err)
                this.setState({ auth: 0 })
            })
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
