import React, {Component} from 'react';
import logo from '../Assets/logo.svg';
import {Link} from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <div>
                    {/*<img src={logo} className="App-logo" alt="logo"/>*/}
                    <nav>
                        <ul>
                            <a href="#"><Link to='/'>Home</Link></a>
                            <a href="#"><input type="text"></input></a>
                            <a href="#"><Link to='/login'>Login</Link></a>
                            <a href="#"><Link to='/upload'>Upload</Link></a>
                            <a href="#"><Link to='/account'>My Account</Link></a>
                        </ul>
                    </nav>
            </div>
        )
    }

}

export default Header;