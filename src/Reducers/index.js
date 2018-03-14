import { combineReducers } from "redux";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS
} from "../Actions/user";

/**
 * This file encapsulates a series of reducer contants which are then combined together to form a master reducer for the Redux store. Currently, there are three reducers that get connected. Each reducer handles a different part of the state: user, sounds, and controls.
 */

/**
 * user reducer: this handles state functions for everything pertaining to the user and the authentication that accompanies them. Any time an action is dispatched for logging in, logging out, or authenticating the user, this reducer handles the action appropriately. It also sets the state to whatever the auth token in local storage dictates.
 * @author Peter Luft <pwluft@lakeheadu.ca>
 */

const user = (
  state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem("id_token") ? true : false
  },
  action
) => {
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
        errorMessage: ""
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
      return state;
  }
};

/**
 * sounds reducer: describes the state of whatever sound clips have been loaded into the browser. The state includes a 'loadedSounds' array which contains all of the current sounds loaded on the clientside. They can be rendered accordingly by the correct components. It also determines whether an asynchronous request is being made to load more sounds from the server.
 * @author Peter Luft <pwluft@lakeheadu.ca>
 */

const sounds = (
  state = {
    isFetching: false,
    loadedSounds: []
  },
  action
) => {
  switch (action.type) {
    case "RECEIVE_SOUNDS":
      return {
        ...state,
        isFetching: false,
        loadedSounds: state.loadedSounds.concat(action.sounds)
      };
    case "REQUEST_SOUNDS":
      return {
        ...state,
        isFetching: true
      };

    default:
      return state;
  }
};

/**
 * controls reducer: describes all aspects of the user interface on the homepage, and how playing of sound files is handled. It encapsulates the state of what sound is playing, where it is, and what info is associated with that sound.
 * @author Peter Luft <pwluft@lakeheadu.ca>
 */

const controls = (
  state = {
    activeID: null,
    playing: false,
    looping: true,
    mute: false,
    playerInFocus: true,
    activeInfo: {}
  },
  action
) => {
  switch (action.type) {
    case "PLAY_SOUND":
      return {
        ...state,
        playing: true,
        activeID: action.id
      };

    case "PAUSE_SOUND":
      return {
        ...state,
        playing: false,
        activeID: action.id
      };
    case "ADJUST_FOCUS":
      return {
        ...state,
        playerInFocus: action.inFocus
      };

    default:
      return state;
  }
};

//combine all of the reducers and export them for the store to use.
const aphexApp = combineReducers({ controls, sounds, user });

export default aphexApp;
