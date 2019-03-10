import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container, Nav, NavItem, NavLink, Badge, DropdownToggle, DropdownMenu } from 'reactstrap';
import {
  AppAside,
  AppAsideToggler,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppHeaderDropdown,
  AppNavbarBrand,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
  AppSidebarToggler,
} from '@coreui/react';
import navigation from '../../_nav.js';

import routes from '../../routes.js';

import logo from '../../assets/img/brand/logo.png'
import head from '../../assets/img/brand/head.png'
import headmini from '../../assets/img/brand/headmini.png'
import sygnet from '../../assets/img/brand/sygnet.svg'
import avatar from '../../assets/img/avatars/6.jpg'

class DefaultLayout extends Component {
  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <AppSidebarToggler className="d-lg-none" display="md" mobile />
          <AppNavbarBrand
            full={{ src: head, width: 215, height: 55, alt: 'Safe Box' }}
            minimized={{ src: headmini, width: 50, height: 55, alt: 'BoX' }}
          />
          <AppSidebarToggler className="d-md-down-none" display="lg" />
          <Nav className="ml-auto" navbar>
            <NavItem className="d-md-down-none">
              <NavLink href="#"><i className="cui-bell icons font-xl d-block"></i><Badge pill color="danger">5</Badge></NavLink>
            </NavItem>
            <NavItem className="d-md-down-none">
              <NavLink href="#"><i className="cui-list icons icons font-xl d-block"></i></NavLink>
            </NavItem>
            <NavItem className="d-md-down-none">
              <NavLink href="#"><i className="cui-location-pin icons icons font-xl d-block"></i></NavLink>
            </NavItem>
            <AppHeaderDropdown>
              <DropdownToggle nav>
                <img src={avatar} className="img-avatar" alt="admin@bootstrapmaster.com" />
              </DropdownToggle>
              <DropdownMenu right style={{ right: 'auto', height: '400px' }}>
                AppHeaderDropdown
              </DropdownMenu>
            </AppHeaderDropdown>
          </Nav>
          <AppAsideToggler className="d-md-down-none" />
          <AppAsideToggler className="d-lg-none" mobile />
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <nav className="sidebar-header">
            
           <img src={logo} width="200" height="200" style={{padding:"0px,12px,0px,12px"}}alt="Safe Box"/>

            </nav>
            <AppSidebarNav navConfig={navigation} {...this.props} /> 
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes}>
            </AppBreadcrumb>
            <Container fluid>
              <Switch>
                {routes.map((route, idx) => {
                    return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                        <route.component {...props} />
                      )} />)
                      : (null);
                  },
                )}
                <Redirect from="/" to="/home" />
              </Switch>
            </Container>
          </main>
          <AppAside fixed>
            Aside
          </AppAside>
        </div>
        <AppFooter>
          <span><a href="https://eredani.com">eredani.com</a> &copy; {new Date().getFullYear()}</span>
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;
