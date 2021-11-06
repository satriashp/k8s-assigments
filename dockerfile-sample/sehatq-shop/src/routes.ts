import { Route } from 'interfaces';
import { lazy } from 'react';

const routes: Route[] = [
  {
    title: 'Quotations Detail',
    path: '/quotations/detail/:id',
    component: lazy(() => import('./pages/Quotations/Detail')),
    exact: true,
  },
  {
    title: 'Quotations',
    path: '/quotations/:status',
    component: lazy(() => import('./pages/Quotations/Quotations')),
    exact: true,
  },
];

export default routes;
