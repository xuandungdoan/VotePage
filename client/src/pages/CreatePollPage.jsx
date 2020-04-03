import React from "react";
import { Redirect } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import CreatePoll from "../components/CreatePoll";

const CreatePollPage = ({ isAuth }) => {
  if (!isAuth) return <Redirect to="/login" />;
  return (
    <div>
      <ErrorMessage />
      <CreatePoll />
      <p>this is poll page</p>
    </div>
  );
};

export default CreatePollPage;
