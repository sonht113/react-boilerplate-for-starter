import { cloneDeep } from 'lodash';
import { Link } from 'react-router-dom';

import { HOME_PATH, USER_PATH, TODO_PATH } from './path';
import { TypeNavs, TypeRoutes } from './type-navs';
import { Home, Users, Todos } from '@/pages';
import { capitalizeFirstLetter } from '@/utils';

const navs: TypeNavs[] = [
  {
    key: HOME_PATH,
    label: 'home',
    element: <Home />,
  },
  {
    key: USER_PATH,
    label: 'user',
    element: <Users />,
  },
  {
    key: TODO_PATH,
    label: 'todo',
    element: <Todos />,
  },
];

const getRoutes = (arr: TypeRoutes[], nav: TypeNavs, basePath = '') => {
  if (nav.children) {
    for (const n of nav.children) {
      getRoutes(arr, n, basePath + nav.key);
    }
  }
  if (!nav.element) return;

  arr.push({
    path: basePath + nav.key,
    // element: nav.element && (
    //   <PrivateRoute permission={nav.permission}>{nav.element}</PrivateRoute>
    // ),
    element: nav.element,
  });

  return arr;
};

const addLink = (nav: TypeNavs, path: string) => {
  return nav.children ? (
    capitalizeFirstLetter(nav.label as string)
  ) : (
    <Link to={path}>{capitalizeFirstLetter(nav.label as string)}</Link>
  );
};

const getShowNavigation = (
  nav: TypeNavs,
  basePath = '',
): TypeNavs | undefined => {
  if (!nav.label) return;
  if (nav.children) {
    const arr: TypeNavs[] = [];
    for (const n of nav.children) {
      const formatN = getShowNavigation(n, basePath + nav.key);
      if (formatN) arr.push(formatN);
    }

    nav.children = arr.length > 0 ? arr : undefined;
  }

  return {
    key: basePath + nav.key,
    label: addLink(nav, basePath + nav.key),
    children: nav.children,
    element: nav.element,
  };
};

const menuList: TypeNavs[] = [];
const routeList: TypeRoutes[] = [];
const navList: TypeNavs[] = navs.map((nav) => ({
  key: nav.key,
  label: nav.label,
}));

for (const nav of navs) {
  const nav1 = cloneDeep(nav);
  const n = getShowNavigation(nav1);
  n && menuList.push(n);

  const nav2 = cloneDeep(nav);
  getRoutes(routeList, nav2);
}

export { routeList, menuList, navList };
