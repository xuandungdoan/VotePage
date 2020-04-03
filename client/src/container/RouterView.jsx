import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AuthPage from "../pages/AuthPage";
import TestPage from "../pages/test";
import HomePage from "../pages/HomePage";
import { getCurrentPoll } from "../store/actions";
import PollPage from "../pages/PollPage";
import CreatePollPage from "../pages/CreatePollPage";
const RouterViews = ({ auth, getCurrentPoll }) => (
  <main>
    <Switch>
      <Route exact path="/" render={props => <HomePage {...props} />} />
      <Route
        exact
        path="/login"
        render={() => <AuthPage path="login" isAuth={auth.isAuth} />}
      />
      <Route
        exact
        path="/register"
        render={() => <AuthPage path="register" isAuth={auth.isAuth} />}
      />
      <Route exact path="/test" render={() => <TestPage />} />
      <Route
        exact
        path="/poll/:id"
        render={props => (
          <PollPage getPoll={ids => getCurrentPoll(ids)} {...props} />
        )}
      />
      <Route
        exact
        path="/new"
        render={() => <CreatePollPage isAuth={auth.isAuth} />}
      />
    </Switch>
  </main>
);

export default withRouter(
  connect(store => ({ auth: store.auth }), { getCurrentPoll })(RouterViews)
);
