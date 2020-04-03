import React, { Component } from "react";
import Polls from "../components/Polls";
import ErrMessage from "../components/ErrorMessage";
const HomePage = props => {
  return (
    <div>
      <Polls {...props} />
      <ErrMessage />
    </div>
  );
};
export default HomePage;
