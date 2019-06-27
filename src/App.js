import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './App.scss';

const browserHistory = createBrowserHistory();
const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

const DefaultLayout = React.lazy(() => import('components/DefaultLayout'));
const Login = React.lazy(() => import('components/Login'));

function App() {
  return (
    <Router history={browserHistory}>
      <React.Suspense fallback={loading()}>
        <Switch>
          <Route exact path="/login" name="Login Page" component={Login} />
          {/* <Route exact path="/login" name="Register" component={Register} /> */}
          {/* <Route exact path="/404" name="Page 404" component={Page404} />
        <Route exact path="/403" name="Page 403" component={Page403} />
        <Route exact path="/500" name="Page 500" component={Page500} /> */}
          <Route path="/" name="Home" component={DefaultLayout} />
        </Switch>
      </React.Suspense>
    </Router>
  );
}

export default App;
