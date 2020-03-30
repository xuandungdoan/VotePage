import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AuthPage from "../pages/AuthPage";
const RouterViews = ({auth232141}) => (
  <main>
    <Switch>
      <Route exact path="/login" render={() => <AuthPage path="login" isAuth ={auth232141.isAuth} />} />
      <Route exact path="/register" render={() => <AuthPage path="register" isAuth ={auth232141.isAuth} />} />
    </Switch>
  </main>
);

export default connect(store => ({ auth232141: store.auth }))(RouterViews);

