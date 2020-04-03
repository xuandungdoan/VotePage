import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logOut } from "../store/actions";
const NavBar = ({ auth, logOut }) => (
  <div>
    <ul>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to="login">Login</Link>
      </li>
      <li>
        <Link to="register">register</Link>
      </li>
      <li>
         <Link to='test'>Test</Link>
      </li>
      <li onClick={logOut}>
        logout
      </li>
    </ul>
    {auth.isAuth && (
        <p>Logged in as {auth.user.username}</p>
      )}
  </div>
);

export default connect(store => ({ auth: store.auth }), { logOut })(NavBar);
