import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {
    Container
} from 'reactstrap';
import {
    AppAside,
    AppAsideToggler,
    AppBreadcrumb,
    AppFooter,
    AppHeader,
    AppNavbarBrand,
    AppSidebar,
    AppSidebarMinimizer,
    AppSidebarNav,
    AppSidebarToggler
} from '@coreui/react';
import navigation from '../../_nav.js';
import routes from '../../routes.js';
import logo from '../../assets/img/brand/logo.png'
import head from '../../assets/img/brand/head.png'
import headmini from '../../assets/img/brand/headmini.png'
class DefaultLayout extends Component {
    render() {
        return (
            <div className="app">
                <AppHeader fixed>
                    <AppSidebarToggler className="d-lg-none" display="md" mobile/>
                    <AppSidebarToggler className="d-md-down-none" display="lg"/>
                    <AppNavbarBrand
                        full={{
                        src: head,
                        width: 215,
                        height: 55,
                        alt: 'Safe Box'
                    }}
                        minimized={{
                        src: headmini,
                        width: 50,
                        height: 55,
                        alt: 'BoX'
                    }}/>
                </AppHeader>
                <div className="app-body">
                    <AppSidebar fixed display="lg">
                        <nav className="sidebar-header">

                            <img
                                src={logo}
                                width="200"
                                height="200"
                                style={{
                                padding: "0px,12px,0px,12px"
                            }}alt="Safe Box"/>

                        </nav>
                        <AppSidebarNav navConfig={navigation} {...this.props}/>
                        <AppSidebarMinimizer/>
                    </AppSidebar>
                    <main className="main">
                        <AppBreadcrumb appRoutes={routes}></AppBreadcrumb>
                        <Container fluid>
                            <Switch>
                                {routes.map((route, idx) => {
                                    return route.component
                                        ? (
                                            <Route
                                                key={idx}
                                                path={route.path}
                                                exact={route.exact}
                                                name={route.name}
                                                render={props => (<route.component {...props}/>)}/>
                                        )
                                        : (null);
                                },)}
                                <Redirect from="/" to="/home"/>
                            </Switch>
                        </Container>
                    </main>
                    <AppAside fixed>
                        Aside
                    </AppAside>
                </div>
                <AppFooter>
                    <span>
                        <a href="https://eredani.com">eredani.com </a>
                        &copy; {new Date().getFullYear()}</span>
                </AppFooter>
            </div>
        );
    }
}
export default DefaultLayout;
