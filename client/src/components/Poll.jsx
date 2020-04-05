import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { vote } from "../store/actions";
import { Pie } from "react-chartjs-2";

const Poll = ({ vote, poll }) => {
  const options =
    poll.options &&
    poll.options.map((option) => (
      <button
        className="button"
        key={option._id}
        onClick={() => vote(poll._id, { anwser: option.option })}
      >
        {option.option}
      </button>
    ));
  const color = () => {
    return "#" + Math.random().toString(16).slice(2, 8);
  };
  const data = poll.options && {
    labels: poll.options.map((option) => option.option),
    datasets: [
      {
        label: poll.question,
        backgroundColor: poll.options.map((option) => color()),
        borderColor: "#323643",
        data: poll.options.map((option) => option.votes),
      },
    ],
  };
  return (
    <Fragment>
      <h3 className="poll-title">{poll.question}</h3>
      <div>{options}</div>
      {poll.options && <Pie data={data} />}
    </Fragment>
  );
};
export default connect((store) => ({ poll: store.currentPoll }), { vote })(
  Poll
);
