import React, {Component} from 'react';
import '../App/App.css';
import Header from '../Components/Header.js';
import {Switch, Route} from 'react-router-dom';
import Upload from '../Components/Upload/UploadPage.js';
import Login  from '../Components/Login-Signup/Login-Signup.js';
import Account from '../Components/Account/AccountPage.js';
import HomeContainer from '../Containers/HomeContainer';
import {connect} from 'react-redux';
import {loginUser, logoutUser} from "../Actions/index";





//TODO: load sounds from REST API along with other pertinent data

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <Header/>
                </header>
                <main className="App-main-section">
                    <Switch>
                        <Route exact path='/' component={HomeContainer}/>
                        <Route exact path='/login' component={Login}/>
                        <Route exact path='/upload' component={Upload}/>
                        <Route exact path='/account' component={Account}/>
                    </Switch>
                </main>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    errorMessage: state.auth.errorMessage
})

const mapDispatchToProps = dispatch => ({

    loginClicked: (creds) => {
        dispatch(loginUser(creds));
    },

    logoutClicked: (creds) => {
        dispatch(logoutUser())
    }

})



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
