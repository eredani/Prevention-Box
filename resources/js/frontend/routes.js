import HomePage from './views/HomePage/HomePage.js';
import About from './views/About/About.js';
import Full from './containers/Home/Home.js';

const routes = [
  { path: '/', exact: true, name: 'Safe Box', component: Full },
  { path: '/home', name: 'Home', component: HomePage },
  { path: '/quiz', name: 'Quiz', component: HomePage },
  { path: '/about', name: 'About', component: About },
  { path: '/parteners', name: 'Parteners', component: HomePage },
  { path: '/contact', name: 'Contact', component: HomePage },
  { path: '/find', name: 'Find a box', component: HomePage }
];

export default routes;
