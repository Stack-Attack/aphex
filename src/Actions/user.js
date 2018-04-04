import * as types from '../Constants/UserActionTypes';
import {clearLoadedSounds} from "./sounds";

/*
    Actions for the user reducer. A container will dispatch one of these actions upon the user
    interacting with the app. The sounds reducer will receive one of these actions and adjust the
    Redux state accordingly.
 */

/**
 * called when user logins in with a pair of credentials. Posts the credential data, and if it's authenticated on the server, returns a JWT
 * @author Peter Luft <pwluft@lakeheadu.ca>
 */

const authEndpoint = 'https://syro.dannykivi.com/authentication';
const createUserEndpoint = 'https://syro.dannykivi.com/users';

// POST /authenticate

export const loginUser = creds => dispatch => {
    console.log("Logging in...");
    let config = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "email": creds.email,
            "password": creds.password
        })
    };
    dispatch(requestLogin());

    return fetch(authEndpoint, config)
        .then(response => response.json().then(user => ({user, response})))
        .then(({user, response}) => {
            console.log(user);
            console.log(response);
            if (!response.ok) {
                //there was a problem
                dispatch(failureLogin(user.message));
                return Promise.reject(user);
            } else {
                localStorage.setItem("id_token", user.accessToken);
                dispatch(receiveLogin(user));
            }
        })
        .catch(err => console.log("Error: ", err));
};

/**
 * called when a user signs up with a set of credentials
 * @author Peter Luft <pwluft@lakeheadu.ca>
 */

export const signUpUser = creds => dispatch => {


    let config = {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'email': creds.email,
            'password': creds.password,
            'picture': creds.url
        })
    };

    dispatch(requestCreateUser());
    return fetch(createUserEndpoint, config)
        .then(response => response.json().then(user => ({user, response})))
        .then(({user, response}) => {

            if (!response.ok) {
                //there was a problem signing up
                dispatch(failureCreateUser(user.message));
                return Promise.reject(user);
            } else {
                console.log("Successfully signed up");
                dispatch(receiveCreateUser());
                delete creds.url;
                dispatch(loginUser(creds));
            }
        })
        .catch(err => console.log("Error: ", err));
};
/**
 * called when a user clicks the 'logout' button on the navbar
 * @author Peter Luft <pwluft@lakeheadu.ca>
 */

export const logoutUser = () => dispatch => {
    dispatch(requestLogout());
    localStorage.removeItem("id_token");
    dispatch(receiveLogout());
};


//actions for logging user in
export const requestLogin = () => ({
    type: types.REQUEST_LOGIN
});
export const receiveLogin = user => ({
    type: types.RECEIVE_LOGIN,
    id_token: user.id_token,
    user: user
});
export const failureLogin = message => ({
    type: types.FAILURE_LOGIN,
    message
});

//actions for creating user
export const requestCreateUser = () => ({
    type: types.REQUEST_CREATE_USER
});
export const receiveCreateUser = () => ({
    type: types.RECEIVE_CREATE_USER
});
export const failureCreateUser = message => ({
    type: types.FAILURE_CREATE_USER,
    message
});


//actions for logging user out
export const requestLogout = () => ({
    type: types.REQUEST_LOGOUT
});
export const receiveLogout = () => ({
    type: types.RECEIVE_LOGOUT
});

