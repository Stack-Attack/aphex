export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'


export const requestLogin = (creds) => ({
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
})


export const receiveLogin = (user) => ({
    type: LOGIN_SUCCESS,
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

export const requestLogout = () => ({
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
})

export const receiveLogout = () => ({
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
})

export function loginUser(creds) {

    let config = {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: 'username=${creds.username}&password=${creds.password'
    }

    return dispatch => {
        dispatch(requestLogin(creds));

        return fetch('our api endpoint', config)
            .then(response =>
                response.json().then(user => ({user, response})))
            .then(({user, response}) => {
                if (!response.ok) {
                    //there was a problem
                    dispatch(loginError(user.message));
                    return Promise.reject(user);
                }
                else {
                    localStorage.setItem('id_token', user.id_token);
                    localStorage.setItem('id_token', user.access_token);
                    dispatch(receiveLogin(user));
                }
            }).catch(err => console.log("Error: ", err));

    }
}

export function logoutUser() {
    return dispatch => {
        dispatch(requestLogout());
        localStorage.removeItem('id_token');
        localStorage.removeItem('access_token');
        dispatch(receiveLogout());
    }
}


export const togglePlay = (id) => ({
    type: 'TOGGLE_PLAY',
    id
})

export const addSong = (id) => ({
    type: 'ADD_SOUND',
    id
})





