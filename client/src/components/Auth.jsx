import React, { Component } from "react";
import { connect } from "react-redux";
import { authUser, logOut } from "../store/actions";
import { withRouter } from "react-router-dom";
class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = (e) => {
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
        <form className="form" onSubmit={this.handleSubmit}>
          <label className="form-label" htmlFor="username">
            {" "}
            Username
          </label>
          <input
            className="form-input"
            type="text"
            value={username}
            name="username"
            autoComplete="off"
            onChange={this.handleChange}
          />
          <label className="form-label" htmlFor="password">
            {" "}
            Password
          </label>
          <input
            className="form-input"
            type="text"
            value={password}
            name="password"
            autoComplete="off"
            onChange={this.handleChange}
          />
          <div className="button_center">
            <button className="button" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default withRouter(connect(() => ({}), { authUser, logOut })(Auth));
