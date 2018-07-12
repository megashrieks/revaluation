import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import getToken from '../utils/getToken';
import axios from 'axios';
import Loading from '../Loading/Loading';
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
class AuthRedirect extends Component {
    state = {
        auth: 2,
        admin: false
    };
    componentDidMount() {
        let token = getToken();
        if (token !== null) {
            axios.get('/api/auth/check_auth', {}, {
                    cancelToken:source.token
                })
                .then(data => {
                    if (data.data.error) {
                        this.setState({
							auth: 0
                        });
                    }
                    else {
                        this.setState({
							auth: 1,
							admin: data.data.admin
                        });
                    }
                })
                .catch(thrown => {
                    if (axios.isCancel(thrown))
                        console.log(thrown.message);
                    else
                        this.setState({
                            auth: 0
                        });
                })
        } else {
            this.setState({
                auth: 0
            });
        }
    }
    componentWillUnmount() {
        source.cancel("Operation cancelled by user");
    }
    render() {
        let mode;
        switch (this.state.auth) {
            case 0:
                mode = <Redirect to="/login" />;
                break;
            case 1: if (this.state.admin === true)
                mode = <Redirect to = "/admin"/>;
            else
                mode = <Redirect to = "/student"/>;
                break;
            default: break;
        }
        return (
            <Loading loading={this.state.auth === 2}>
                {mode}
            </Loading>
        );
    }
}
export default AuthRedirect;
