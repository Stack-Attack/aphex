import React, {Component} from 'react';
import './App.css';
import Header from '../Components/Header.js';
import {Switch, Route} from 'react-router-dom';
import Home  from '../Components/Home/HomePage.js';
import Upload from '../Components/Upload/UploadPage.js';
import Login  from '../Components/Login-Signup/Login-Signup.js';
import Account from '../Components/Account/AccountPage.js';


//TODO: load sounds from REST API along with other pertinent data
//TODO: some kind of procedural loading
//TODO: implement redux state

class App extends Component {

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <Header/>
                </header>
                <main className="App-main-section">
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route exact path='/login' component={Login}/>
                        <Route exact path='/upload' component={Upload}/>
                        <Route exact path='/account' component={Account}/>
                    </Switch>
                </main>
            </div>
        );
    }
}
export default App;
