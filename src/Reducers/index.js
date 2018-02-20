import {combineReducers} from 'redux';
import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS
} from "../Actions/index";


const auth = (state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('id_token') ? true : false
}, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isFetching: true,
                isAuthenticated: false,
                user: action.creds
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isAuthenticated: true,
                errorMessage: ''
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.message
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isFetching: true,
                isAuthenticated: false
            };
        default:
            return state
    }
}

const sounds = (state = {
    isFetching: false,
    loadedSounds: []
}, action) => {
    switch (action.type) {
        case 'RECEIVE_SOUNDS':
            return {
                ...state,
                isFetching: false,
                loadedSounds: state.loadedSounds.concat(action.sounds)
            };
        case 'REQUEST_SOUNDS':
            return {
                ...state,
                isFetching: true
            }

        default:
            return state;

    }

};

const controls = (state = {
    activeID: null,
    playing: false,
    looping: true,
    mute: false,
    playerInFocus: true,
    activeInfo: {}
}, action) => {
    switch (action.type) {

        case 'PLAY_SOUND':
            return {
                ...state,
                playing: true,
                activeID: action.id
            }

        case 'PAUSE_SOUND':
            return {
                ...state,
                playing: false,
                activeID: action.id
            }
        case 'ADJUST_FOCUS':
            return{
                ...state,
                playerInFocus: action.inFocus
            }

        default:
            return state
    }
};


const aphexApp = combineReducers({controls, sounds, auth})

export default aphexApp;