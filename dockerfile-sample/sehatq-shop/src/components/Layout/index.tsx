import Preloader from 'components/Preloader';
import React, { FC, memo, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import routes from 'routes';
import TopBar from './TopBar';

const Layout: FC = () => (
  <>
    <TopBar userName="" />
    <Switch>
      {routes.map(route => (
        <Route
          key={Array.isArray(route.path) ? route.path[0] : route.path}
          exact={route.exact}
          path={route.path}
          render={() => (
            <Suspense fallback={<Preloader />}>
              <route.component />
            </Suspense>
          )}
        />
      ))}
      <Redirect from="/" to="/quotations/new" exact />
    </Switch>
  </>
);

export default memo(Layout);
