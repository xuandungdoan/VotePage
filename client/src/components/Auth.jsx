import React, { Component } from "react";
import { connect } from "react-redux";
import { authUser, logOut } from "../store/actions";
import { withRouter } from "react-router-dom";
class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const path = this.props.path;
    const { username, password } = this.state;
    this.props.authUser(path || "login", { username, password });
    console.log(username, password);
  };
  render() {
    const { username, password } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username"> Username</label>
          <input
            type="text"
            value={username}
            name="username"
            onChange={this.handleChange}
          />{" "}
          <br />
          <label htmlFor="password"> Password</label>
          <input
            type="text"
            value={password}
            name="password"
            onChange={this.handleChange}
          />{" "}
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
export default withRouter(connect(() => ({}), { authUser, logOut })(Auth));
