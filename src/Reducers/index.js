import {combineReducers} from 'redux';
import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS
} from "../Actions/index";


const auth = (state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('id_token') ? true : false
}, action) => {
    switch(action.type){
        case LOGIN_REQUEST:
            return {
                ...state,
                isFetching: true,
                isAuthenticated: false,
                user: action.creds
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isAuthenticated: true,
                errorMessage: ''
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.message
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isFetching: true,
                isAuthenticated: false
            }
        default:
            return state
    }
}

const playerControls = (state = {
    activeID: 0,
    playing: false
}, action) => {
    switch (action.type) {
        case 'TOGGLE_PLAY':

            let startPlaying;

            if (action.id !== state.activeID) {
                //check if toggle has been pressed on active sound
                startPlaying = true;
            }
            else {
                startPlaying = !state.playing;
            }
            return {
                ...state,
                playing: startPlaying,
                activeID: action.id
            }
        default:
            return state
    }
}


const sounds = (state = {
    isFetching: false,
    didInvalidate: false,
    items: []
}, action) => {
    switch (action.type) {
        case 'ADD_SOUND':
        //something goes here
        default:
            return state

    }

}


const aphexApp = combineReducers({auth})

export default aphexApp;