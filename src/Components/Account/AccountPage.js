import React, { Component } from "react";
import PropTypes from "prop-types";

/**
 * Presentational component for the 'Account' Page. In the final build, should display user account info. Currently just displays some basic user info to the console.
 * @author Peter Luft <pwluft@lakeheadu.ca>
 */
class Account extends Component {
  static propTypes = {
    userInfo: PropTypes.object.isRequired
  };

  render() {
    //currently just displays some user info passed to this component via props
    console.log(this.props.userInfo);
    return (
      <div>
        <h2>My user account</h2>
      </div>
    );
  }
}

export default Account;
