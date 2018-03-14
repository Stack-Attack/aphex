import React, { Component } from "react";
import "../App/App.css";
import Navbar from "../Components/Navbar.js";
import { Switch, Route } from "react-router-dom";
import Upload from "../Components/Upload/UploadPage.js";
import Signin from "../Components/Login-Signup/Signin.js";
import Account from "../Components/Account/AccountPage.js";
import HomeContainer from "../Containers/HomeContainer";
import { connect } from "react-redux";
import { loginUser, logoutUser, signUpUser } from "../Actions/user";
import { uploadSound } from "../Actions/sounds";
import { withRouter } from "react-router-dom";

//TODO: load sounds from REST API along with other pertinent data
//TODO: change isAuthenticated back to map the authentication to state

/**
 * Containers/App.js
 * @author Peter Luft <pwluft@lakeheadu.ca>
 * Main container component which encapulates the entire application. This component is loaded from the index.js. From here, all child components take care of each piece of functionality of the frontend.
 *
 * The component first renders a NavBar child component. View this in ./Components/Navbar.js
 *
 * Next, the component checks to see what route has been provided and renders the corresponding component accordingly. Each rendered component can be examined in the ./Components/* directory.
 */
class App extends Component {
  //render the components that make up the application
  render() {
    if (this.props.isAuthenticated) {
      //if the user has signed in and authenticated, direct them to full app
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
              <Route exact path="/" render={() => <HomeContainer />} />
              <Route
                exact
                path="/upload"
                render={() => (
                  <Upload fileUpload={file => this.props.fileUpload(file)} />
                )}
              />
              <Route
                exact
                path="/account"
                render={() => <Account userInfo={this.props.userInfo} />}
              />
            </Switch>
          </main>
        </div>
      );
    } else {
      //user is not signed in and authenticated; direct them to the signin page
      return (
        <div className="App">
          <main className="App-main-section">
            <Signin
              loginClicked={creds => this.props.loginClicked(creds)}
              signupClicked={creds => this.props.signupClicked(creds)}
              errorMessage={this.props.errorMessage}
            />
          </main>
        </div>
      );
    }
  }
}

/**
 * mapStateToProps takes the global redux state, and maps the necessary pieces of state to the props of this component. That way, the global state can be passed down to each child component.
 * @author Peter Luft <pwluft@lakeheadu.ca>
 */

const mapStateToProps = state => ({
  // isAuthenticated: state.user.isAuthenticated,
  isAuthenticated: true, //comment this out to use correct authentication state mapping
  errorMessage: state.user.errorMessage,
  userInfo: state.user.userInfo
});

/**
 * Similarly to mapStateToProps, mapDispatchToProps assigns a series of component methods to actions that Redux will emit onto the state. As a result, state can be directly controlled via this component, so that child components have no knowledge of the state. This keeps things nice and clean.
 * @author Peter Luft <pwluft@lakeheadu.ca>
 */

const mapDispatchToProps = dispatch => ({
  signupClicked: creds => {
    dispatch(signUpUser(creds));
  },

  loginClicked: creds => {
    dispatch(loginUser(creds));
  },

  logoutClicked: () => {
    dispatch(logoutUser());
  },

  fileUpload: file => {
    dispatch(uploadSound(file, localStorage.getItem("id_token")));
  }
});

/**
 * Last part is to connect the above Redux boilerplate to this component, and gets React to render it. Now we have a React component that connects to the Redux state, with a series of child components that will interact with the state via their parent.
 * @author Peter Luft <pwluft@lakeheadu.ca>
 */

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
