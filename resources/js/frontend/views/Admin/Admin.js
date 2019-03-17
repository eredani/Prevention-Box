import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Dashboard from './Dashboard';
import {
    Container
} from 'reactstrap';
class AdminLayout extends Component {
    render() {
        return (
            <div className="animated fadeIn">
                <Dashboard/>
        </div>
        );
    }
}
export default AdminLayout;
