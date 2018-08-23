import Home from './client/components/Home';
import About from './client/components/About';
import Contact from './client/components/Contact';


export default [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/about',
    component: About,
    exact: true,
  },
  {
    path: '/contact',
    component: Contact,
    exact: true,
  },
]