import React, {Component} from 'react';
import logo from '../Assets/logo.svg';

class Header extends Component {
    render() {
        return (
            <div>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Hello, welcome to Aphex.</h1>
                    <h3>Site under construction, please be patient</h3>
                </header>
                <ul>
                    <li>Home</li>
                    <li>User</li>
                </ul>
            </div>
        )
    }

}

export default Header;