import React, { Component } from "react";
import PropTypes from "prop-types";

/**
 * Presentational component for the Signin/Login page. Will send signin credentials up to the parent component.
 */

class Signin extends Component {
  static propTypes = {
    loginClicked: PropTypes.func.isRequired,
    signupClicked: PropTypes.func.isRequired,
    errorMessage: PropTypes.string
  };

  handleLogin() {
    const username = this.refs.username;
    const password = this.refs.password;

    const creds = {
      username: username.value.trim(),
      password: password.value.trim()
    };

    this.props.loginClicked(creds);
  }

  handleSignup() {
    const email = this.refs.suEmail;
    const username = this.refs.suUsername;
    const password = this.refs.suPassword;
    const confirm = this.refs.suConfirm;

    if (password.value != confirm.value) {
      alert("passwords don't match");
      return;
    }

    const creds = {
      email: email.value.trim(),
      username: username.value.trim(),
      password: password.value.trim()
    };
    this.props.signupClicked(creds);
  }

  render() {
    let errorMessage = null;

    if (this.props.errorMessage) {
      errorMessage = this.props.errorMessage;
    }

    return (
      <div className="center">
        <div className="card">
          <h1>Login</h1>
          <input
            className="form-item"
            placeholder="Username goes here"
            type="text"
            ref="username"
          />
          <input
            className="form-item"
            placeholder="Password goes here"
            type="password"
            ref="password"
          />

          <button onClick={event => this.handleLogin(event)}>Login</button>
        </div>
        <div className="card">
          <h2>Or create an account</h2>

          <input
            className="form-item"
            placeholder="Email"
            type="text"
            ref="suEmail"
          />
          <input
            className="form-item"
            placeholder="Username"
            type="text"
            ref="suUsername"
          />
          <input
            className="form-item"
            placeholder="Password"
            type="password"
            ref="suPassword"
          />
          <input
            className="form-item"
            placeholder="Confirm password"
            type="password"
            ref="suConfirm"
          />

          <button onClick={event => this.handleSignup(event)}>Sign up</button>
          <p>{errorMessage}</p>
        </div>
      </div>
    );
  }
}

export default Signin;
