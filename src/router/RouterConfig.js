import React from 'react';

export const RouterConfig = [
  {
    path: '/home',
    name: 'home',
    component: React.lazy(() => import('@/view/home/Home.view')),
  },
  {
    path: '/loading',
    name: 'loading',
    component: React.lazy(() => import('@/components/pageLoading/PageLoading1.view')),
  },
  {
    path: '/404',
    name: '404',
    component: React.lazy(() => import('@/components/404/404.view')),
  },
];

export default RouterConfig;
