import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { createPoll } from "../store/actions";

class CreatePoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      options: ["", ""]
    };
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  addAnwser = () => {
    this.setState({ options: [...this.state.options, ""] });
  };
  handleOption = (e, index) => {
    const options = [...this.state.options];
    options[index] = e.target.value;
    this.setState({ options });
  };
  handleSumit = e => {
    e.preventDefault();
    this.props.createPoll(this.state);
  };

  render() {
    const options = this.state.options.map((option, index) => {
      return (
        <Fragment key={index}>
          <label htmlFor="options">Options</label>
          <input
            type="text"
            name="options"
            value={option}
            onChange={e => this.handleOption(e, index)}
          />
        </Fragment>
      );
    });
    return (
      <form onSubmit={this.handleSumit}>
        <label htmlFor="question">Question</label>
        <input
          type="text"
          name="question"
          value={this.state.question}
          onChange={this.handleChange}
        />
        {options}
        <button type="button" onClick={this.addAnwser}>
          Add Answer
        </button>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default connect(() => ({}), { createPoll })(CreatePoll);
