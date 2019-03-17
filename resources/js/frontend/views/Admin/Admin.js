import React, {Component} from 'react';
import Dashboard from './Dashboard';
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
