import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getPolls, getUserPolls, getCurrentPoll } from "../store/actions";

class Polls extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { getPolls } = this.props;
    getPolls();
  }
  handleClick = id => {
    const { getCurrentPoll } = this.props;
    getCurrentPoll(id);
  }
  render() {
    const { auth, getPolls, getUserPolls } = this.props;
    const polls = this.props.polls.map(poll => (
      <li onClick={() => this.handleClick(poll._id)} key={poll._id}>
        {poll.question}
      </li>
    ));
    return (
      <Fragment>
        {auth.isAuth && (
          <div>
            <button onClick={getPolls}>All polls</button>
            <button onClick={getUserPolls}>User polls</button>
          </div>
        )}
        <ul>{polls}</ul>
      </Fragment>
    );
  }
}
export default connect(store => ({ auth: store.auth, polls: store.polls }), {
  getPolls,
  getUserPolls,
  getCurrentPoll
})(Polls);