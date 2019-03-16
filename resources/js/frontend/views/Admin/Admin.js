import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {
    Container
} from 'reactstrap';
import {
    AppBreadcrumb,
    AppFooter,
    AppHeader,
    AppNavbarBrand,
    AppSidebar,
    AppSidebarMinimizer,
    AppSidebarNav,
    AppSidebarToggler
} from '@coreui/react';
class AdminLayout extends Component {
    render() {
        return (
            <div className="animated fadeIn">
            Home
        </div>
        );
    }
}
export default AdminLayout;
