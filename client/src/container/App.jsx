import React, { Fragment } from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import { setCurrentUser, addError, setToken } from "../store/actions";
import decode from "jwt-decode";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./NavBar";
import RouterView from "./RouterView";

if (localStorage.jwtToken) {
  setToken(localStorage.jwtToken);
  try {
    store.dispatch(setCurrentUser(decode(localStorage.jwtToken)));
  } catch (error) {
    store.dispatch(addError(error));
    setCurrentUser({});
  }
}
const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <RouterView />
      </Fragment>
    </Router>
  </Provider>
);
export default App;
