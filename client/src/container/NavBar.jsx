import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logOut } from "../store/actions";
import { Fragment } from "react";
const NavBar = ({ auth, logOut }) => (
  <div className="navbar">
    <div className="container">
      <ul className="navbar-container">
        <li>
          <Link className="navbar-brand" to="/">
            Home
          </Link>
        </li>
        {!auth.isAuth && (
          <Fragment>
            <li>
              <Link className="navbar-item" to="/login">
                Login
              </Link>
            </li>
            <li>
              <Link className="navbar-item" to="/register">
                register
              </Link>
            </li>
          </Fragment>
        )}
        {auth.isAuth && (
          <Fragment>
            {" "}
            <li>
              <Link className="navbar-item" to="/new">
                Create Poll
              </Link>
            </li>
            <li>
              <a className="navbar-item" onClick={logOut}>
                Log Out
              </a>
            </li>
          </Fragment>
        )}
      </ul>
      {auth.isAuth && (
        <p className="navbar-user">Logged in as {auth.user.username}</p>
      )}
    </div>
  </div>
);

export default connect((store) => ({ auth: store.auth }), { logOut })(NavBar);
