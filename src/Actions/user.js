import * as types from '../Constants/UserActionTypes.js'

/*
    Actions for the user reducer. A container will dispatch one of these actions upon the user
    interacting with the app. The sounds reducer will receive one of these actions and adjust the
    Redux state accordingly.
 */

//called when user logins in with a pair of credentials. Posts the credential data, and if it's authenticated on the server, returns a JWT
export const loginUser = (creds) => dispatch => {
    let config = {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: 'username=${creds.username}&password=${creds.password}'
    }

    dispatch(requestLogin(creds));

    return fetch(types.LOGIN_ENDPOINT, config)
        .then(response => response.json().then(user => ({user, response})))
        .then(({user, response}) => {
            if (!response.ok) {
                //there was a problem
                dispatch(loginError(user.message));
                return Promise.reject(user);
            }
            else {
                localStorage.setItem('id_token', user.id_token);
                //localStorage.setItem('id_token', user.access_token);
                dispatch(receiveLogin(user));
            }
        })
        .catch(err => console.log("Error: ", err));
}

//called when a user signs up with a set of credentials
export const signUpUser = (creds) => dispatch => {
    //TODO: complete signup user action
    let config = {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: 'email=${creds.email}username=${creds.username}&password=${creds.password}'
    }

    dispatch(requestSignup(creds));

    return fetch(types.SIGNUP_ENDPOINT, config)
        .then(response => response.json().then(user => ({user, response})))
        .then(({user, response}) => {
            if(!response.ok){
                //there was a problem signing up
                dispatch(signupError(user.message));
                return Promise.reject(user);
            }
            else{
                localStorage.setItem('id_token', user.id_token);
                dispatch(receiveSignup(user));
            }

        })
        .catch(err => console.log("Error: ", err));
}


//called when a user clicks the 'logout' button on the navbar
export const logoutUser = () => dispatch => {
    dispatch(requestLogout());
    localStorage.removeItem('id_token');
    localStorage.removeItem('access_token');
    dispatch(receiveLogout());
}

//the rest of the below actions are simple actions which simply are received by the user reducer and change the state
export const requestLogin = (creds) => ({
    type: types.LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
})
export const requestLogout = () => ({
    type: types.LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
})
export const requestSignup = () => ({
    type: types.SIGNUP_REQUEST,
    isFetching: true
})
export const receiveLogin = (user) => ({
    type: types.LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token
})
export const receiveLogout = () => ({
    type: types.LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
})
export const receiveSignup = (user) => ({
    type: types.SIGNUP_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token
})
export const loginError = (message) => ({
    type: types.LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
})
export const signupError = (message) => ({
    type: types.SIGNUP_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
})
