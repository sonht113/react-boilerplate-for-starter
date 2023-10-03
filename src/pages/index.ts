import { lazy } from 'react';

const Home = lazy(() => import('@/pages/home'));

const Users = lazy(() => import('@/pages/users'));

const Todos = lazy(() => import('@/pages/todos'));

export { Home, Users, Todos };
