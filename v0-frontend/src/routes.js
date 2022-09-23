import {lazy} from 'react';

// accounts
const Users = lazy(() => import('./pages/Users'));
const User = lazy(() => import('./pages/Users/User'));

export const routes = [
  {
    path: '/',
    component: Users,
  },
  {
    path: '/users',
    component: Users,
  },
  {
    path: '/users/:id',
    component: User,
  }
];
