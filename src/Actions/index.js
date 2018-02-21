import sounds from '../api/sounds';


export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const LOGIN_ENDPOINT = '';
export const SIGNUP_ENDPOINT = '';


//Actions for the Auth Reducer

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


export const requestSignup = () => ({
    type: SIGNUP_REQUEST,
    isFetching: true
})

export const receiveSignup = () => ({
    type: SIGNUP_SUCCESS,
    isFetching: false
})


export const loginUser = (creds) => dispatch => {
    let config = {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: 'username=${creds.username}&password=${creds.password}'
    }

    dispatch(requestLogin(creds));

    return fetch(LOGIN_ENDPOINT, config)
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

    return fetch(SIGNUP_ENDPOINT, config)
        .then(response => response.json())


}

export const logoutUser = () => dispatch => {
    dispatch(requestLogout());
    localStorage.removeItem('id_token');
    localStorage.removeItem('access_token');
    dispatch(receiveLogout());
}


//Actions for the Controls Reducer

export const playPressed = (id) => (dispatch, getState) => {
    let isPlaying = getState().controls.playing;
    let activeID = getState().controls.activeID;

    if (activeID != id) {
        dispatch(playSound(id));
    }
    else {
        if (!isPlaying) {
            dispatch(playSound(id));
        }
        else {
            dispatch(pauseSound(id));
        }
    }
}

export const playSound = (id) => ({
    type: 'PLAY_SOUND',
    id
})

export const pauseSound = (id) => ({
    type: 'PAUSE_SOUND',
    id
})


export const adjustFocus = (inFocus) => ({
    type: 'ADJUST_FOCUS',
    inFocus
})


//Actions for the Sounds Reducer

export const fetchSounds = () => dispatch => {
    dispatch(requestSounds());

    //TODO: replace this with fetchSounds. it will then dispatch receiveSounds
    sounds.getSounds(sounds => {
        dispatch(receiveSounds(sounds))
    })

    // return fetch('http request with ' + num + 'as parameter')
    //     .then(response => response.json())
    //     .then(json => dispatch(receiveSounds(json)));
}

export const receiveSounds = sounds => ({
    //action for when we receive new sounds from the server.
    //'sounds' should be an array of sound objects from the server
    type: 'RECEIVE_SOUNDS',
    sounds
})

export const requestSounds = (num) => ({
    //request sounds from the server
    type: 'REQUEST_SOUNDS'
})






