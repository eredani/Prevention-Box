import HomePage from './views/HomePage/HomePage.js';
import About from './views/About/About.js';
import Contact from './views/Contact/Contact.js';
import Quiz from './views/Quiz/Quiz.js';
import Full from './containers/Home/Home.js';
import Parteners from './views/Parteners/Parteners.js';
import FindBoxes from './views/Find/FindBoxes.js';
import AdminLayout from './views/Admin/Admin.js';

const routes = [
  { path: '/', exact: true, name: 'Safe Box', component: Full },
  { path: '/admin', exact: true, name: 'Admin', component: AdminLayout },
  { path: '/home', name: 'Home', component: HomePage },
  { path: '/quiz', name: 'Quiz', component: Quiz },
  { path: '/about', name: 'About', component: About },
  { path: '/parteners', name: 'Parteners', component: Parteners },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/find', name: 'Find a box', component: FindBoxes }
];

export default routes;
