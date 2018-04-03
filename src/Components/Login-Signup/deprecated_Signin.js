import React, { Component } from "react";
import PropTypes from "prop-types";

/**
 * Presentational component for the Signin/Login page. Will send signin credentials up to the parent component.
 * @author Peter Luft <pwluft@lakeheadu.ca>
 */

import { Grid } from "semantic-ui-react";


class Signin extends Component {
    static propTypes = {
        loginClicked: PropTypes.func.isRequired,
        signupClicked: PropTypes.func.isRequired,
        errorMessage: PropTypes.string
    };

    handleLogin() {
        const username = this.refs.email;
        const password = this.refs.password;

        const creds = {
            email: username.value.trim(),
            password: password.value.trim()
        };

        this.props.loginClicked(creds);
    }

    handleSignup() {
        const creds = {
            email: email.value.trim(),
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
            <div class="ui grid" style={{height: '100vh'}}>
                <div class="ui two column row">
                    <div class="blue column">
                        <h1>Login</h1>
                        <input
                            className="form-item"
                            placeholder="Email"
                            type="text"
                            ref="email"
                        />
                        <input
                            className="form-item"
                            placeholder="Password"
                            type="password"
                            ref="password"
                        />

                        <button onClick={event => this.handleLogin(event)}>Login</button>
                    </div>
                    <div class="white column">
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
            </div>
        );
    }
}

export default Signin;
