import React from "react";
import { Redirect } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import Auth from "../components/Auth";

const AuthPage = ({ path, isAuth }) => {
  if (isAuth) return <Redirect to="/" />;
  return (
    <div>
      <ErrorMessage />
      <Auth path={path} />
    </div>
  );
};
export default AuthPage;
