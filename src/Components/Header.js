import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <div>
                <nav>
                    <ul>
                        <Link to='/'>Home</Link>
                        <input type="text"></input>
                        <Link to='/login'>Login</Link>
                        <Link to='/upload'>Upload</Link>
                        <Link to='/account'>My Account</Link>
                    </ul>
                </nav>
            </div>
        )
    }

}

export default Header;