import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Signin extends Component {

   static propTypes = {
       loginClicked: PropTypes.func.isRequired,
       errorMessage: PropTypes.string
   }


    handleClick(){
        const username = this.refs.username;
        const password = this.refs.password;

        const creds = {
            username: username.value.trim(),
            password: password.value.trim()
        }

        this.props.loginClicked(creds);
    }

    render() {
        return (
            <div className="center">
                <div className="card">
                    <h1>Login</h1>
                    <input
                        className="form-item"
                        placeholder="Username goes here"
                        type="text"
                        ref='username'
                    />
                    <input
                        className="form-item"
                        placeholder="Password goes here"
                        type="password"
                        ref='password'
                    />

                    <button onClick={(event) => this.handleClick(event)}>
                        Login
                    </button>
                </div>
            </div>
        );
    }


}

export default Signin;