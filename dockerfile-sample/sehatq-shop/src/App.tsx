import React, { lazy } from 'react';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import { utils } from 'helpers';
import { Preloader } from 'components';
import { Route as IRoute } from 'interfaces';
import { QueryParamProvider } from 'use-query-params';
import dayjs from 'dayjs';
import 'dayjs/locale/id';

const lang = utils.getLang();
dayjs.locale(lang);

const authRoutes: IRoute[] = [
  {
    title: 'Login',
    path: '/login',
    component: lazy(() => import('./pages/Auth/Login')),
    exact: true,
  },
];

const Layout = lazy(() => import('./components/Layout/index'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <ToastContainer />
    <BrowserRouter>
      <QueryParamProvider ReactRouterRoute={Route}>
        <Switch>
          {authRoutes.map(route => (
            <Route
              key={Array.isArray(route.path) ? route.path[0] : route.path}
              exact={route.exact}
              path={route.path}
              render={() => (utils.getToken() && route.isRedirect !== false ? (
                <Redirect to="/" />
              ) : (
                <React.Suspense fallback={<Preloader />}>
                  <route.component />
                </React.Suspense>
              ))}
            />
          ))}
          <Route
            path="/"
            render={() => (!utils.getToken() ? (
              <Redirect to="/login" />
            ) : (
              <React.Suspense fallback={<Preloader />}>
                <Layout />
              </React.Suspense>
            ))}
          />
          <Redirect from="/" to="/quotations" />
        </Switch>
      </QueryParamProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
