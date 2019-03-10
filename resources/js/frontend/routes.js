import Dashboard from './views/Dashboard/Dashboard.js';
import Full from './containers/DefaultLayout/DefaultLayout.js';

const routes = [
  { path: '/', exact: true, name: 'Safe Box', component: Full },
  { path: '/home', name: 'Home', component: Dashboard },
  { path: '/about', name: 'About', component: Dashboard },
  { path: '/parteners', name: 'Parteners', component: Dashboard },
  { path: '/contact', name: 'Contact', component: Dashboard },
  { path: '/find', name: 'Find a box', component: Dashboard }
];

export default routes;
