import React, {Component} from 'react';
import logo from '../Assets/logo.svg';
import {Link} from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <div>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Hello, welcome to Aphex.</h1>
                    <h3>Site under construction, please be patient</h3>
                </header>
                <nav>
                    <ul>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/users'>Users</Link></li>
                    </ul>
                </nav>
            </div>
        )
    }

}

export default Header;