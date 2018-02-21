//get current user (me) from token in localstorage
export const ME_FROM_TOKEN = 'ME_FROM_TOKEN';
export const ME_FROM_TOKEN_SUCCESS = 'ME_FROM_TOKEN_SUCCESS';
export const ME_FROM_TOKEN_FAILURE = 'ME_FROM_TOKEN_FAILURE';
export const RESET_TOKEN = 'RESET_TOKEN';

//sign up user
export const SIGNUP_REQUEST = 'SIGNUP_USER_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_USER_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_USER_FAILURE';
export const RESET_USER = 'RESET_USER';

//sign in user
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

//validate email, if success, then load user and login
export const VALIDATE_EMAIL_REQUEST = 'VALIDATE_EMAIL_REQUEST';
export const VALIDATE_EMAIL_SUCCESS = 'VALIDATE_EMAIL_SUCCESS';
export const VALIDATE_EMAIL_FAILURE = 'VALIDATE_EMAIL_FAILURE';

//called when email is updated in profile to update main user's email
export const UPDATE_USER_EMAIL = 'UPDATE_USER_EMAIL';

//logout user
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';



export const LOGIN_ENDPOINT = '';
export const SIGNUP_ENDPOINT = '';

//Actions for the User Reducer

export const requestLogin = (creds) => ({
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
})
export const requestLogout = () => ({
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
})
export const requestSignup = () => ({
    type: SIGNUP_REQUEST,
    isFetching: true
})


export const receiveLogin = (user) => ({
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token
})
export const receiveLogout = () => ({
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
})
export const receiveSignup = (user) => ({
    type: SIGNUP_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token
})


export const loginError = (message) => ({
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
})
export const signupError = (message) => ({
    type: SIGNUP_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
})

export const loginUser = (creds) => dispatch => {
    let config = {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: 'username=${creds.username}&password=${creds.password}'
    }

    dispatch(requestLogin(creds));

    return fetch(LOGIN_ENDPOINT, config)
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


export const signUpUser = (creds) => dispatch => {
    //TODO: finish this action
    let config = {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: 'email=${creds.email}username=${creds.username}&password=${creds.password}'
    }

    dispatch(requestSignup(creds));

    return fetch(SIGNUP_ENDPOINT, config)
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

export const logoutUser = () => dispatch => {
    dispatch(requestLogout());
    localStorage.removeItem('id_token');
    localStorage.removeItem('access_token');
    dispatch(receiveLogout());
}