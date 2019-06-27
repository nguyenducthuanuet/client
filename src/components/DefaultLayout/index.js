import React, { Suspense, useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import routes from 'routes';
import { userServices } from 'services';

export default () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    userServices.fetchUsers().then(res => setUser(res.results[0]));
  }, []);

  return (
    <div className="black-background">
      Welcome
      {' '}
      {user && user.name && user.name.first}
      <Suspense fallback="Loading...">
        <Switch>
          {routes.map(route =>
            route.component ? (
              <Route
                key={route.name}
                path={route.path}
                exact={route.exact}
                name={route.name}
                render={restProps => <route.component {...restProps} title={route.name} />}
              />
            ) : null,
          )}
          <Redirect from="/" to="/" />
        </Switch>
      </Suspense>
    </div>
  );
};
