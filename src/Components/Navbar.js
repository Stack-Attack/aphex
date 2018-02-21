import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Signout from '../Components/Login-Signup/Signout';
import PropTypes from 'prop-types';

class Navbar extends Component {


    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        logoutClicked: PropTypes.func.isRequired
    }

    render() {

        let content = null;

        if (this.props.isAuthenticated) {
            content = (

                <button onClick={() => this.props.logoutClicked}>
                    Sign Out
                </button>);
        }
        else{
            content = (
                <Link to='/login'>Sign In</Link>
            );
        }

        return (
            <div>
                <nav>
                    <ul>
                        <Link to='/'>Home</Link>

                        <input type="text"></input>

                        <Link to='/upload'>Upload</Link>

                        <Link to='/account'>My Account</Link>

                        {content}
                    </ul>
                </nav>
            </div>
        )
    }

}

export default Navbar;