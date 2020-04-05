import React, { Fragment } from "react";
import { connect } from "react-redux";

const ErrMessage = ({ error }) => (
  <Fragment>
    {error.message && <div className="error">{error.message}</div>}
  </Fragment>
);

export default connect((store) => ({ error: store.error }))(ErrMessage);
