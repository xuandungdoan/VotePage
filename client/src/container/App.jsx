import React, { Fragment } from "react";
import api from "../services/api";
import { Provider } from "react-redux";
import { store } from "../store";
import { setCurrentUser, addError, setToken } from "../store/actions";
import decode from "jwt-decode";
import { BrowserRouter as Router } from "react-router-dom";
import Auth from "../components/Auth";
import ErrMessage from "../components/ErrorMessage";
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
