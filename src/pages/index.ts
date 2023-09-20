import { lazy } from 'react';

const Home = lazy(() => import('@/pages/home'));

const Users = lazy(() => import('@/pages/users'));

const Posts = lazy(() => import('@/pages/posts'));

export { Home, Users, Posts };
