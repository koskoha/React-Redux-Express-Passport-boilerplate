import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import PrivateRoute from './AuthRouter';
import RegisterForm from '../components/auth/RegisterForm';
import LoginForm from '../components/auth/LoginForm';
import PageNotFound from '../components/NotFound';
import BaseLayout from '../components/layouts/BaseLayout';

const MainRoute = props => {
  const { authed } = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LoginForm} />
        <Route path="/register" component={RegisterForm} />
        <Route path="/login" component={LoginForm} />
        <PrivateRoute authed={authed} path="/employee" component={BaseLayout} />>
        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default MainRoute;
