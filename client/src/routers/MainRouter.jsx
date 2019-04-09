import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoutes';
import Dashboard from '../components/Dashboard';
import RegisterForm from '../components/auth/RegisterForm';
import LoginForm from '../components/auth/LoginForm';
import PageNotFound from '../components/NotFound';

const MainRoute = props => {
  const { authed } = props;

  return (
    <Route>
      <Switch>
        <Route exact path="/" component={LoginForm} />
        <Route path="/register" component={RegisterForm} />
        <Route path="/login" component={LoginForm} />
        <PrivateRoute authed={authed} path="/account" component={Dashboard} />
        <Route component={PageNotFound} />
      </Switch>
    </Route>
  );
};

export default MainRoute;
