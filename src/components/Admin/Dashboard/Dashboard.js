import React, { Component,Fragment } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
class Dashboard extends Component{
    render() {
        return (
            <Fragment>
                <Link className = "card" to="/admin/booklet">
                    Booklet upload
                </Link>
            </Fragment>
        );
    }
}
export default Dashboard;