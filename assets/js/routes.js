import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Root from './Root';
import * as Pages from './Pages';

export const routes = (
  <Root>
    <Switch>
      <Route exact path="/user/:id" component={Pages.User} />
      <Route component={Pages.Home} />
    </Switch>
  </Root>
);
