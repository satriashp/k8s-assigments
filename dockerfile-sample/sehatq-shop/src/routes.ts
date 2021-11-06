import { Route } from 'interfaces';
import { lazy } from 'react';

const routes: Route[] = [
  {
    title: 'Quotations',
    path: '/quotations',
    component: lazy(() => import('./pages/Quotations/Quotations')),
    exact: true,
  },
];

export default routes;
