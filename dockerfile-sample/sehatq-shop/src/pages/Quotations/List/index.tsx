import React, { FC, memo } from 'react';
import { Route, Switch } from 'react-router-dom';
import TableHistory from './components/TableHistory';
import TableNew from './components/TableNew';
import TableOngoing from './components/TableOngoing';
import TableWaiting from './components/TableWaiting';

const List: FC = () => (
  <Switch>
    <Route exact path="/quotations/new">
      <TableNew />
    </Route>
    <Route exact path="/quotations/ongoing">
      <TableOngoing />
    </Route>
    <Route exact path="/quotations/waiting">
      <TableWaiting />
    </Route>
    <Route exact path="/quotations/history">
      <TableHistory />
    </Route>
  </Switch>
);

export default memo(List);
