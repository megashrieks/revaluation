import React, { Component } from 'react';
import BreadcrumbURL from "./BreadcrumbURL/BreadcrumbURL";
import './Admin.css';
class Admin extends Component{
    render() {
        return (<div className="container">
            <BreadcrumbURL />
        </div>)
    }
}
export default Admin;