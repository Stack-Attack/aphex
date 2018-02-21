import React, {Component} from 'react';
import '../App/App.css';
import Navbar from '../Components/Navbar.js';
import {Switch, Route, Redirect} from 'react-router-dom';
import Upload from '../Components/Upload/UploadPage.js';
import Signin from '../Components/Login-Signup/Signin.js';
import Signout from '../Components/Login-Signup/Signout.js';
import Account from '../Components/Account/AccountPage.js';
import HomeContainer from '../Containers/HomeContainer';
import {connect} from 'react-redux';
import {loginUser, logoutUser} from "../Actions/index";
import {withRouter} from 'react-router-dom';


//TODO: load sounds from REST API along with other pertinent data

class App extends Component {


    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <Navbar
                        isAuthenticated={this.props.isAuthenticated}
                        logoutClicked={() => this.props.logoutClicked()}
                    />
                </header>
                <main className="App-main-section">
                    <Switch>
                        <Route exact path='/' render={() => (
                            this.props.isAuthenticated ?
                                (<HomeContainer/>) :
                                (<Redirect to='/login'/>))
                        }/>
                        <Route exact path='/login' render={() =>
                            <Signin
                                loginClicked={creds => this.props.loginClicked(creds)}
                                errorMessage={this.props.errorMessage}/>
                        }/>
                        <Route exact path='/upload' render={() => <Upload/>}/>
                        <Route exact path='/account' render={() => <Account/>}/>
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
     //   console.log(creds);
    },

    logoutClicked: () => {
        dispatch(logoutUser())
      //  console.log("dispatching logout");
    }

})


export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(App));
